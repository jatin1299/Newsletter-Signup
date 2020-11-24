const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
const firstName = req.body.fname;
const lastName = req.body.lname;
const email = req.body.email;

const data = {
  members: [
    {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName,
      }
    }
  ]
};

const jsonData = JSON.stringify(data);
const options = {
  method: "POST",
  auth: "jatin:38a54999eef55da651080dae9637e50b-us7"
}
const request = https.request('https://us7.api.mailchimp.com/3.0/lists/5efed22190', options, function(response){
if(response.statusCode === 200){
  res.sendFile(__dirname + "/success.html");
}
else{
  res.sendFile(__dirname + "/failure.html");
}
response.on("data", function(data){
  console.log(JSON.parse(data));
})
})

request.write(jsonData);
request.end();
});

app.post("/failure", function(req, res){
  res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){
  console.log("Server running");
});

// API-Key
// 38a54999eef55da651080dae9637e50b-us7

// list-id
// 5efed22190
