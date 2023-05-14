const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();
const port = 3306;

const db = mysql. createConnection({
    host:"192.168.0.105",
    user:"cdma",
    password:"dl022548",
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

// 특정 서버의 최근 결과 값 파싱
app.get("/api/server_info_result/:category/", (req, res) => {
    const category = req.params.category;
    const year = req.params.year;
    const week = req.params.week;

    res.header("Access-Control-Allow-Origin", "*");
    console.log("get data");
    const sqlQuery = "SELECT * FROM server_status.server_status_result a join server_status.server_status_result b on (a.IP = b.IP)" + 
    "where a.`server_category`='" + category + "' and a.Week = (SELECT MAX(b.Week) from server_status.server_status_result b) and " + 
    "a.Year = (SELECT MAX(b.Year) from server_status.server_status_result b)" ;
    db.query(sqlQuery, (err, result, fields) =>{
        res.send(result);
    })
})

// 모든 서버의 최근 결과 값 파싱
app.get("/api/server_info_result", (req, res) => {

    res.header("Access-Control-Allow-Origin", "*");
    console.log("get data");
    const sqlQuery = "SELECT * FROM server_status.server_status_result a join server_status.server_status_result b on (a.IP = b.IP)" + 
    "where a.Week = (SELECT MAX(b.Week) from server_status.server_status_result b) and " + 
    "a.Year = (SELECT MAX(b.Year) from server_status.server_status_result b)" ;
    db.query(sqlQuery, (err, result, fields) =>{
        res.send(result);
    })
})

// 특정 IP의 최근 결과 값 파싱
app.get("/api/server_info_result/:IP", (req, res) => {
    const ip = req.params.IP;

    res.header("Access-Control-Allow-Origin", "*");
    console.log("get data");
    const sqlQuery = "SELECT * FROM server_status.server_status_result a join server_status.server_status_result b on (a.IP = b.IP)" + 
    "where a.`IP`='" + ip + "' a.Week = (SELECT MAX(b.Week) from server_status.server_status_result b) and " + 
    "a.Year = (SELECT MAX(b.Year) from server_status.server_status_result b)" ;
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
