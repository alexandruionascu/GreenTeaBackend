var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();


var redis = require("redis");
var client = redis.createClient();

console.log('GreenTea Server Started!');

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.post('/api/notifs', jsonParser, function(req, res) {
  console.log(req);
  var id = req.id;
  var data = req.data;
  client.set(id, req, redis.print);

});

/*
client.get("missingkey", function(err, reply) {
    // reply is null when the key is missing
    console.log(reply);
});
*/

app.listen(3000);
