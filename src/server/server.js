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
// 서버 정보 파싱
app.get("/api/data", (req, res) => {

     res.header("Access-Control-Allow-Origin", "*");
     console.log("get data");
     const sqlQuery = "SELECT * FROM server_status.server_info";
     db.query(sqlQuery, (err, result, fields) =>{
         res.send(result);
     })
})

// 특정 서버 결과 값 파싱
app.get("/api/server_info_result/:category/:year/:week", (req, res) => {
    const category = req.params.category;
    const year = req.params.year;
    const week = req.params.week;

    res.header("Access-Control-Allow-Origin", "*");
    console.log("get data");
    const sqlQuery = "SELECT * FROM server_status.server_status_result where `server_category`='" + category + "' and `Year`='" + year + "' and `Week`='" + week + "'";
    db.query(sqlQuery, (err, result, fields) =>{
        res.send(result);
    })
})

// 모든 서버 결과 값 파싱
app.get("/api/server_info_result", (req, res) => {

    res.header("Access-Control-Allow-Origin", "*");
    console.log("get data");
    const sqlQuery = "SELECT * FROM server_status.server_status_result";
    db.query(sqlQuery, (err, result, fields) =>{
        res.send(result);
    })
})
app.get("/data", (req, res) => {
    res.send('GET request to the homepage');
})

app.listen(port, () => {
    console.log(`server running on port ${port}`);
})
