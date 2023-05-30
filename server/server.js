const express = require("express");
const cors = require("cors");
const path = require("path");
const mysql = require("mysql");
const app = express();
const port = 3306;

const db = mysql. createConnection({
    host:"192.168.0.105",
    user:"cdma",
    password:"",
    database:"server_status",
    dateStrings: 'date',
});

app.use(cors({
    origin:"*",
    credentials:true,
    optionSuccessStatus:200,
}))

app.use(express.urlencoded({extended:true}))

app.use(express.static(path.join(__dirname, '../build')));


db.connect(function(err){
    if(err) throw err;

    console.log("Connected!");
})


// develop API
// 서버 정보 파싱
app.get("/api/data", (req, res) => {

     res.header("Access-Control-Allow-Origin", "*");
     const sqlQuery = "SELECT * FROM server_status.server_info";
     db.query(sqlQuery, (err, result, fields) =>{
        if(err !== null)
            console.log(err);
         res.send(result);
     })
})

// 특정 서버 결과 값 파싱
app.get("/api/server_info_result/:category/:year/:week", (req, res) => {
    const category = req.params.category;
    const year = req.params.year;
    const week = req.params.week;

    res.header("Access-Control-Allow-Origin", "*");
    const sqlQuery = "SELECT * FROM server_status.server_status_result where `server_category`='" + category + "' and `Year`='" + year + "' and `Week`='" + week + "'";
    db.query(sqlQuery, (err, result, fields) =>{
        if(err !== null)
            console.log(err);
        res.send(result);
    })
})

// 특정 서버의 최근 결과 값 파싱
app.get("/api/server_info_result/:category/", (req, res) => {
    const category = req.params.category;
    const year = req.params.year;
    const week = req.params.week;

    res.header("Access-Control-Allow-Origin", "*");
    const sqlQuery =    "select a.*, b.server_name from server_status.server_status_result a " +
                        `left join server_status.server_info b on (a.IP = b.IP ) where a.\`server_category\`= '${category}'` + 
                        "and a.Week = (SELECT MAX(Week) from server_status.server_status_result)" + 
                        "and a.Year = (SELECT MAX(Year) from server_status.server_status_result);"
    db.query(sqlQuery, (err, result, fields) =>{
        if(err !== null)
            console.log(err);
        res.send(result);
    })
})

// 모든 서버의 최근 결과 값 파싱
app.get("/api/server_info_result", (req, res) => {

    res.header("Access-Control-Allow-Origin", "*");
    const sqlQuery =    "select a.*, b.server_name from server_status.server_status_result a " +
                        "left join server_status.server_info b on (a.IP = b.IP ) " +
                        "where a.Week = (SELECT MAX(Week) from server_status.server_status_result) " + 
                        "and a.Year = (SELECT MAX(Year) from server_status.server_status_result);"
    db.query(sqlQuery, (err, result, fields) =>{
        if(err !== null)
            console.log(err);
        res.send(result);
    })
})

// 특정 IP의 최근 결과 값 파싱
app.get("/api/server_info_result/:IP", (req, res) => {
    const ip = req.params.IP;

    res.header("Access-Control-Allow-Origin", "*");
    const sqlQuery =    "select a.*, b.server_name from server_status.server_status_result a " +
                        `left join server_status.server_info b on (a.IP = b.IP ) where a.\`IP\`= '${ip}'` + 
                        "and a.Week = (SELECT MAX(Week) from server_status.server_status_result)" + 
                        "and a.Year = (SELECT MAX(Year) from server_status.server_status_result);"
    db.query(sqlQuery, (err, result, fields) =>{
        if(err !== null)
            console.log(err);
        res.send(result);
    })
})

// 가장최근에 업데이트 한 시간 가져옴
app.get("/api/LastUpdate", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const sqlQuery =    "select MAX(server_status_result.Update_Time) as t from server_status.server_status_result;"

    db.query(sqlQuery, (err, result, fields) =>{
        if(err !== null)
            console.log(err);
        res.send(result);
    })
})

app.get("/data", (req, res) => {
    res.send('GET request to the homepage');
})


app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'index.html'));
})


app.listen(port, () => {
    console.log(`server running on port ${port}`);
})


