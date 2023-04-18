const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();
const port = 3301;

const db = mysql. createConnection({
    host:"111.1.1.1",
    user:"11",
    password:"",
    database:"server_status",
});

app.use(cors({
    origin:"*",
    credentials:true,
    optionSuccessStatus:200,
}))

app.use(express.urlencoded({extended:true}))

db.connect(function(err){
    if(err) throw err;

    console.log("Connected!");
})

// develop API
app.get("/api/data", (req, res) => {

     res.header("Access-Control-Allow-Origin", "*");
     console.log("get data");
     const sqlQuery = "SELECT * FROM server_status.server_info";
     db.query(sqlQuery, (err, result, fields) =>{
         res.send(result);
         console.log(result[1])
     })
})

app.get("/api/server_info_result", (req, res) => {

    res.header("Access-Control-Allow-Origin", "*");
    console.log("get data");
    const sqlQuery = "SELECT * FROM server_status.server_status_result";
    db.query(sqlQuery, (err, result, fields) =>{
        res.send(result);
        console.log(result[0])
    })
})
app.get("/data", (req, res) => {
    res.send('GET request to the homepage');
})

app.listen(port, () => {
    console.log(`server running on port ${port}`);
})
