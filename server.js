var express = require('express');
var app = express();

app.use(express.static('app'));

var server = app.listen(8443, function () {
  console.log("Node server up and running on port: " + server.address().port);
})
