var express = require('express');
var app = express();
var bodyParser = require('body-parser');


var redis = require("redis");
var client = redis.createClient();

console.log('GreenTea Server Started!');
app.use(bodyParser.json());
app.get('/', function (req, res) {
  res.send('Hello World');
});

app.post('/api/notifs', function(req, res) {

  client.get(req.body.id, function(err, reply) {
    //the user already has some unread notifs
    if(reply !== null) {
      client.set(req.body.id, reply.concat(req.body.notifs), redis.print);
    } else {
      client.set(req.body.id, req.body, redis.print);
    }
  });
  console.log(req.body.id);

  res.send('ok');
  //var id = req.id;
  //var data = req.data;


});


app.listen(3000);
