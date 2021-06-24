FROM node:current-slim
WORKDIR /usr/src/app
COPY bin /usr/src/app
COPY package.json /usr/src/app
RUN npm i
CMD "node" "--inspect=0.0.0.0" "index.js"
