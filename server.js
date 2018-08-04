const express = require("express");
const bodyParser = require("body-parser");
let server = express();
const routes = require('./api/routes');
const port = process.env.PORT || 3000;

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use('/', routes);

server = server.listen(port, function () {
    console.log("app running on port.", server.address().port);
});