var path = require('path');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var login = require('facebook-chat-api');
var PORT = process.env.PORT || 8080
var answeredThread = {};

var urlencodedParser = bodyParser.urlencoded({ extended: false })
var jsonParser = bodyParser.json()

var arrayUser = [];

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html')
  console.log("Show");
})

var stopListening = (api)=>api.listen((err, event) => {
        if(err) return console.error(err);
        api.sendMessage("An hem thích trả lời bạn đâu <Bot>",event.threadID);
});

var checkArray = (email, array)=>{
        for( var i=0;i<array.length; ++i){
          if(email===array[i].email)
            return i+1;
        }
        return array.length+1;
}

app.post('/api',jsonParser,(req,res)=>{
  var emailFb = req.body.Email;
  var passwordFb = req.body.Password;
  login({email : emailFb, password: passwordFb}, (err,api)=>{
    if (err) return res.send(JSON.stringify({checked: false, id: ''}));
    else{
          var id = 0;
          id = checkArray(emailFb,arrayUser);
          console.log(id);
          var user = {
            "email" : emailFb,
            "password" : passwordFb,
            "id" : id
          }
          arrayUser.push(user);
          res.send(JSON.stringify({
            checked: true,
            id: id
          }))
          api.logout((err)=>{
            if(err) return console.log(err);
            else return console.log("Log out");
          });
    }
  })
});

app.get('/api/:id',(req,res)=>{
    var id = Number(req.params.id)-1;
    console.log(arrayUser[id]);
    login({email : arrayUser[id].email, password: arrayUser[id].password}, (err,api)=>{
    if (err) return res.send(JSON.stringify({checked: false, id: ''}));
    else{
        stopListening(api);
        res.send("Bot started");
        app.get('/api/'+(id+1).toString()+'/logout',(req,res)=>{
          api.logout();
          res.send("Bot off");
        })
    }
  })
});

app.listen(PORT, function(err) {
  if(err)
    console.error(err);
  else
    console.info("Listen");
});
