/**
 * Created by steve on 7/22/15.
 */
require('./newrelic');
var gzippo = require('gzippo');
var express = require('express');
//var path = require('path');
var app = express();
var logger = require('morgan');

app.use(logger('dev'));
app.use(gzippo.staticGzip(__dirname + '/dist'));
//app.use(express.static(path.join(__dirname + 'views')));
app.listen(process.env.PORT || 8080);


