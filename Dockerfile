FROM node
WORKDIR /usr/src/app
COPY bin /usr/src/app
COPY package.json /usr/src/app
RUN npm i
CMD "node" "index.js"
