const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const serverless = require("serverless-http");



require("dotenv").config();
const db = mysql.createConnection(process.env.DATABASE_URL);
db.connect((err) =>
{
    if (err) throw err;
    console.log("Database Connected");
});

const app = express();

const router = express.Router();

router.get('/', (req, res) =>
{
    res.json({
        'hello': 'hi'
    })
});


router
    .use(cors())
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())




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


    .post("/portfoliomessage", (req, res) =>
    {
        let sql = "INSERT INTO portfoliomsg SET ?";
        let body = req.body;
        // let message = body.message;
        // let { name, email } = body;
        let name = body.name;
        let email = body.email;
        let message = body.message;

        let post = { name: `${name}`, email: `${email}`, message: `${message}` };

        // let oldpost = { name: "alex", email: "iou", message: "whyyes" }

        let query = db.query(sql, post, (err, result) =>
        {
            if (err) { throw err; };
            console.log(result);
            res.json(result);
        })

        // await db.execute(`
        //     INSERT INTO portfoliomsg(name, email, message) VALUES(
        //         @name, @email, @message
        //     )
        // `, {
        //     name: body.name,
        //     email: body.email,
        //     message: body.message
        // });

        // res.json(body);
    });









app
    .use(cors())
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use('/.netlify/functions/api', router)
    
    

//module.exports = app;
module.exports.handler = serverless(app);
