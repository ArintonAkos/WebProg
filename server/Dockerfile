FROM node:20-alpine3.16

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN mkdir -p /images
RUN chmod -R 777 /images

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
