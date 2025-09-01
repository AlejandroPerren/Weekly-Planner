FROM node:22.19.0-trixie-slim

WORKDIR /app

COPY . .

RUN npm install

RUN npm install -g nodemon ts-node 

EXPOSE 4000

WORKDIR /server/app/server

CMD ["npm", "run", "dev"]