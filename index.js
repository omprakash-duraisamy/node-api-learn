const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const constants = require("./tempConstants");

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/first_db');

const app = express();
app.use(bodyParser.json({ type: "*/*" }));
app.use(cors());

var personSchema = mongoose.Schema({
   name: String,
   age: Number,
   nationality: String
});
var Person = mongoose.model("fire", personSchema);

app.post('/person', function(req, res){
   var personInfo = req.body; //Get the parsed information
   
   if(!personInfo.name || !personInfo.age || !personInfo.nationality){
      res.send({message: "Sorry, you provided worng info", type: "error"});
   } else {
      var newPerson = new Person({
         name: personInfo.name,
         age: personInfo.age,
         nationality: personInfo.nationality
      });
		
      newPerson.save(function(err, Person){
         if(err)
            res.send({message: "Database error", type: "error"});
         else
            res.send({message: "New person added", type: "success", person: personInfo});
      });
   }
});

app.put('/person/:id', function(req, res){
    var personInfo = req.body; //Get the parsed information
   
   if(!personInfo.name || !personInfo.age || !personInfo.nationality){
      res.send({message: "Sorry, you provided worng info", type: "error"});
   } else {
      Person.findByIdAndUpdate( req.params.id,req.body,function(err, Person){
         if(err)
            res.send({message: "Database error", type: "error"});
         else
            res.send({message: "New person added", type: "success", person: personInfo});
      });
   }
    
});
//app.get("/api/someRoute", (req, res) => {
//    res.send({ "message": "You have logged in" });
//});
//
//app.get("/api/SomeOtherRoute", (req, res) => {
//    res.send({ "message": "you have come to some other route" })
//})
//app.get("/api/getAlbums", (req, res) => {
//    res.send(constants.module.albumList);
//})
//app.post("/api/signin", (req, res) => {
//    if (req.body.email == "omprakash@gmail.com" && req.body.password == "123456789") {
//        res.send({ "username": "om prakash" });
//        return;
//    }
//    res.status(404);
//    res.send({ message: "Invalid username/password" })
//})
//
//let dataObj = {
//    email:"omprakash@gmail.com",
//    password:"123456789"
//}
app.listen(1234);