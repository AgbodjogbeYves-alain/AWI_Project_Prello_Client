const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');
const path = require('path');
const express = require('express');
require('dotenv').config();

if (process.env.NODE_ENV == 'production') {
  const app = express();
  const staticPath = path.join(__dirname, 'public');
  app.use(express.static(staticPath));
  app.all('*', (req, res) => res.sendFile(path.join(staticPath, 'index.html')));
    // Allows you to set port in the project properties.
  app.set('port', process.env.PORT || 3000);
  app.listen(app.get('port'), () => {
    const port = process.env.PORT;
    console.log(process.env.publicPath);
    console.log(`listening on port ${port}`);
  });
} else {
  new WebpackDevServer(webpack(config), {
    contentBase: './public',
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    colors: true,
    noInfo: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
    },
  }).listen(3000, 'localhost', (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(process.env.NODE_ENV);

    console.log('Listening at localhost:3000');
  });
}
