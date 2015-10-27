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

  console.log(req.body.id);
  client.get(req.body.id, function(err, reply) {
    //the user already has some unread notifs
    if(reply !== null) {

      var obj = JSON.parse(reply);
      //console.log(obj);
      obj.push(req.body.notifs[0]);
      client.set(req.body.id, JSON.stringify(obj), redis.print);

    } else {
      var arr = [];
      arr.push(req.body.notifs[0]);
      client.set(req.body.id, JSON.stringify(arr), redis.print);
    }
  });

  console.log(req.body.notifs);

  res.send('ok');
});

app.get('/:id/notifs', function(req, res) {
  client.get(req.params.id, function(err, reply) {
    res.json(reply);
    client.del(req.params.id, function(err, reply) {
      console.log(reply);
    });
  });
});


app.listen(3000);
