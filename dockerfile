FROM node:22.19.0-trixie-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY server/package*.json ./server/

WORKDIR /app/server
RUN npm install

RUN npm install -g nodemon ts-node ts-node-dev

EXPOSE 4000

CMD ["npm", "run", "dev"]
