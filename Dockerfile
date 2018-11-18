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
ENV PORT=3000
ENV REACT_APP_KEYAPI="909976969961-r4v6ls5qbgjvslotg7trcb066vig4cb8.apps.googleusercontent.com"
EXPOSE 3000
CMD [ "node", "/home/client/server.js" ]
