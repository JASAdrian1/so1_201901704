FROM node:19-alpine

WORKDIR /appreact

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm","start"]
