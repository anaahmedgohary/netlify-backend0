const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const mysql = require("mysql2");
const bodyParser = require("body-parser");


require("dotenv").config();
const db = mysql.createConnection(process.env.DATABASE_URL);
db.connect((err) =>
{
    if (err) throw err;
    console.log("Database Connected");
})

const app = express();

const router = express.Router();

router.get('/', (req, res) =>
{
    res.json({
        'hello': 'hi'
    })
})

router
    .post("/portfoliomessage", (req, res) =>
    {
        let sqlcommand = "INSERT INTO portfoliomsg SET ?";
        let body = req.body;
       // let message = body.message;
        let { name, email, message } = body;
        let post = {
            name: name,
            email: email,
            message: message
        };
        db.query(sqlcommand, post, (err, result) =>
        {
            if (err) { throw err; };
            console.log(result);
            res.send("Message Was Sent Successfully.");
        })
    })





















app
    .use('/.netlify/functions/api', router)
    .use(cors())
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())

module.exports = app;
module.exports.handler = serverless(app);
