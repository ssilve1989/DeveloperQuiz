/**
 * Created by steve on 7/22/15.
 */
var gzippo = require('gzippo');
var express = require('express');
//var path = require('path');
var app = express();
var logger = require('morgan');

app.use(logger('dev'));
app.use(gzippo.staticGzip(__dirname + '/dist'));
app.all('/*', function(req, res){
	res.sendFile('/dist/index.html', {root: __dirname});
});
app.listen(process.env.PORT || 8080);



