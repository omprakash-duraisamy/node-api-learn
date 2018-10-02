const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const constants = require("./tempConstants");

const app = express();
app.use(bodyParser.json({ type: "*/*" }));
app.use(cors());


app.get("/api/someRoute", (req, res) => {
    res.send({ "message": "You have logged in" });
});

app.get("/api/SomeOtherRoute", (req, res) => {
    res.send({ "message": "you have come to some other route" })
})
app.get("/api/getAlbums", (req, res) => {
    res.send(constants.module.albumList);
})
app.post("/api/signin", (req, res) => {
    if (req.body.email == "omprakash@gmail.com" && req.body.password == "123456789") {
        res.send({ "username": "om prakash" });
        return;
    }
    res.status(404);
    res.send({ message: "Invalid username/password" })
})

let dataObj = {
    email:"omprakash@gmail.com",
    password:"123456789"
}
app.listen(3000);