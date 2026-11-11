import express from 'express';
import config from "./db.js";

const app = express()
app.use(express.json())

app.get('/user', async (req,res)=>{
    try {
    const [rows] = await config.query('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

app.get('/user/:id', async (req,res)=>{
    try {
    const [rows] = await config.query('SELECT * FROM users WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});