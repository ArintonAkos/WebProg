FROM node:20-alpine3.16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3001

CMD [ "npm", "run", "start" ]
