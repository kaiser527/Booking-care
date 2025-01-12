require("dotenv").config(); //import process.env
import express from "express";
import configViewEngine from "./config/viewEngine";
import webRouters from "./routes/web";
import connect from "./config/connectDatabase";
import { createJWT, verifyToken } from "./middlewares/JWTAction";

const app = express(); //khai bao app
const port = process.env.PORT || 8888; //trong truong hop PORT kh chay thi thuc hien cai con lai
const hostname = process.env.HOST_NAME;

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

//template engine
configViewEngine(app);

//test connection
connect();

//test jwt
createJWT();
let decodedData = verifyToken(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoia2lhbmEiLCJhZGRyZXNzIjoiTW9vbiIsImlhdCI6MTczNjU4Mjg0Mn0.whXl7yMpPzcle-9JfnHCYOMKQ-PrL5fSUNgBhCx_2j8"
);
console.log(decodedData);

//route
app.use("/", webRouters);

app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`);
});
