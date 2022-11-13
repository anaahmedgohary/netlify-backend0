const express = require("express");
const mysql = require("mysql2");
const serverless = require("serverless-http");
const cors = require("cors");
const bodyParser = require("body-parser");


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


router.post("/portfoliomessage", (req, res) =>
{
    let sql = "INSERT INTO portfoliomsg SET ?";
    let body = req.body;
    // let message = body.message;
    // let { name, email } = body;
    let name =  body.name;
    let email = body.email;
    let message = body.message;

    let post = {name: `${name}`, email: `${email}`, message: `${message}`};

   // let oldpost = { name: "alex", email: "iou", message: "whyyes" }
        
    let query = db.query(sql, post, (err, result) =>
    {
        if (err) { throw err; };
        console.log(body);
        res.json(req.body.name);
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
    .use('/.netlify/functions/api', router)
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    

//module.exports = app;
module.exports.handler = serverless(app);
