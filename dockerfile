
FROM node:latest AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .


FROM node:26-alpine AS stage

WORKDIR /app

COPY --from=build /app .

EXPOSE 5000

CMD ["npm", "run", "dev"]
