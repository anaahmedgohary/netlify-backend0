const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

const cors = require("cors");
const bodyParser = require("body-parser");



require("dotenv").config();
const db = mysql.createConnection(process.env.DATABASE_URL);

db.connect((err) =>
{
    if (err) throw err;
    console.log("Database Connected");
});


router
    .use(cors())
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())

router
    .get('/', (req, res) =>
    {
        res.json({
            'hello': 'hi'
        })
    })
    
    
    .get("/test", (req, res) =>
    {
        let test = { aaa: "wwww", qzq: "zzz" }
        
        res.json(test);
    })

    .get("/savednotes", (req, res) =>
    {
        let sqlCommand = "SELECT * FROM mebattery";

        let query = db.query(sqlCommand, (err, result) =>
        {
            if (err) { throw err };
            console.log(result);
            // res.send(JSON.stringify(result));
            res.send(result)
        })
    })







module.exports = router;    