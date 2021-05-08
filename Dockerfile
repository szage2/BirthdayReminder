FROM node
WORKDIR /usr/src/app
COPY bin /usr/src/app
RUN npm install
RUN npm install express --save
CMD "node" "index.js"
