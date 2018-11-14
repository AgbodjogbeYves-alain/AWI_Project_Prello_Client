var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var path = require('path');
var express = require('express');
require('dotenv').config();
if (process.env.NODE_ENV == 'production') {
    var app = express();
    var staticPath = path.join(__dirname, './public');
    app.use(express.static(staticPath));
    // Allows you to set port in the project properties.
    app.set('port', process.env.PORT || 3000);
    app.listen(app.get('port'), function () {
        const port = process.env.PORT
        console.log(process.env.publicPath)
        console.log('listening on port ' + port);
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
            poll: 1000
        },
    }).listen(3000, 'localhost', function (err, result) {
        if (err) {
            console.log(err);
        }
        console.log(process.env.NODE_ENV)

        console.log('Listening at localhost:3000');
    });
}
