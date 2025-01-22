require("dotenv").config(); //import process.env
import express from "express";
import configViewEngine from "./config/viewEngine";
import webRouters from "./routes/web";
import connect from "./config/connectDatabase";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express(); //khai bao app
const port = process.env.PORT || 8888; //trong truong hop PORT kh chay thi thuc hien cai con lai
const hostname = process.env.HOST_NAME;

//fix middleware cors
app.use(cors({ credentials: true, origin: true }));

//use cors
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", process.env.URL_REACT);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

//config req.body
app.use(express.json({ limit: "50mb" })); //for json
app.use(express.urlencoded({ limit: "50mb", extended: true })); //for form data

//config cookie parser
app.use(cookieParser());

//template engine
configViewEngine(app);

//test connection
connect();

//route
app.use("/", webRouters);

app.use((req, res) => res.send("404 not found"));

app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`);
});
