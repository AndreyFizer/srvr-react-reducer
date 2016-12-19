const express = require('express');
const morgan = require('morgan');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/react');

app.use(morgan('dev'));
app.use(bodyParser.json({type: '*/*'}));
app.use(express.static(__dirname + '/public'));

router(app);

const port = process.env.PORT || 3033;
const server = http.createServer(app);

server.listen(port);

server.on('listening', function() {
    console.log(' ::: Server successfully started at ' + port + ' :::');
});
