FROM node:18-alpine

WORKDIR /user/src/app

COPY . .


RUN npm install

RUN npm run build

USER node 

EXPOSE 3000

CMD ["npm","run","start:prod"]