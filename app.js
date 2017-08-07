// Where your server and express app are being defined:

var models = require('./models');
var express = require('express');
var app = express();
var morgan = require('morgan');
var nunjucks = require('nunjucks');
//var makesRouter = require('./routes');
var fs = require('fs');
//var path = require('path');
//var mime = require('mime');
var bodyParser = require('body-parser');
//var socketio = require('socket.io');
var router = require('./routes');

// templating boilerplate setup
app.engine('html', nunjucks.render); // how to render html templates
app.set('view engine', 'html'); // what file extension do our templates have
nunjucks.configure('views', { noCache: true }); // where to find the views, caching off

// logging middleware
app.use(morgan('dev'));

// body parsing middleware
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests

// router handling
app.use('/', router);

// make sure you are exporting your db from your models file
models.db.sync({force: true})
.then(function () {
    // make sure to replace the name below with your express app
    app.listen(3000, function () {
        console.log('Server is listening on port 3000!');
    });
})
.catch(console.error);