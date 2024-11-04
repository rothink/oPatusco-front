FROM node:16.15.0

RUN npm install -g http-server

WORKDIR /app

RUN npm install -g npm@8.10.0

#RUN npm install -g yarn

EXPOSE 8080
