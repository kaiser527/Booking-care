const path = require("path"); //import path
const express = require("express"); //import express

const configViewEngine = (app) => {
  //config template engine
  app.set("views", path.join("./src", "views"));
  app.set("view engine", "ejs");
  //config static file
  app.use(express.static(path.join("./src", "public")));
};

module.exports = configViewEngine;
