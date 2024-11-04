require("dotenv").config(); //import process.env
const express = require("express"); //import express
const configViewEngine = require("./config/viewEngine"); //import ham configViewEngine tu thu muc config
const webRouters = require("./routes/web");
const connect = require("./config/connectDatabase");

const app = express(); //khai bao app
const port = process.env.PORT || 8888; //trong truong hop PORT kh chay thi thuc hien cai con lai
const hostname = process.env.HOST_NAME;

//use cors
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", process.env.URL_REACT);

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

//config req.body
app.use(express.json()); //for json
app.use(express.urlencoded({ extended: true })); //for form data

//template engine
configViewEngine(app);

//test connection
connect();

//route
app.use("/", webRouters);

app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`);
});
