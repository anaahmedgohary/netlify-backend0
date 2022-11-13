const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const mebattery = require("./routes/mebattey");
const serverless = require("serverless-http");



require("dotenv").config();
const db = mysql.createConnection(process.env.DATABASE_URL);
db.connect((err) =>
{
    if (err) throw err;
    console.log("Database Connected");
});

const app = express();


app
    .use(cors())
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use('/.netlify/functions/api', mebattery)
    
    


module.exports = app;
module.exports.handler = serverless(app);
