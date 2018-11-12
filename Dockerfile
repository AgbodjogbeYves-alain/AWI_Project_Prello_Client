FROM node:8
LABEL maintainer Yves-alain, othniel.agbodjogbe@gmail.com
RUN mkdir /home/client
WORKDIR /home/client
ADD . .
RUN npm install
# Install webpack to build the app on the server
RUN npm install webpack
# Build the app
RUN npm run build
ENV PORT=2999
EXPOSE 2999
CMD [ "node", "/home/client/server.js" ]