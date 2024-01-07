FROM node:lts-alpine

WORKDIR /var/code
COPY package.json /var/code/
RUN npm install --production
COPY . /var/code
EXPOSE 5000
ENTRYPOINT [ "node", "src/server.js" ]
