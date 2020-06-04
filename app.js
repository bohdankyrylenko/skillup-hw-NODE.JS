// Version1.0

const http = require("http");
// node app.js
const server = http.createServer((requesr, response) => {
  let body = [];
  requesr.on("data", (chunk) => {
    body.push(chunk);
  });
  requesr.on("end", () => {
    body = Buffer.concat(body).toString();
    let userName = "Stranger";
    if (body) {
      userName = body.split("=")[1];
    }
    response.setHeader("Content-Type", "text/html");
    response.write(
      `<h1>Hi ${userName}</h1><form method='POST' action='/'><input name='input' type='text'><button type='submit'>Send</button></form>`
    );
    response.end();
  });
});
server.listen(3030);

// Version2.0 (express,body-parser,ejs)

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
// npm install express --save
// npm install body-parser --save
// npm install ejs--save
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", "views");

app.use((req, res, next) => {
  res.setHeader("Content-type", "text/html");
  next();
});

app.use((req, res, next) => {
  const userName = req.body.input || "Unknow";
  res.render("index", {
    userName: userName,
  });
});
app.listen(3040);
