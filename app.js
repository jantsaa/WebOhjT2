const express = require("express");
const app = express();
const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host : "localhost",
    user : "root",
    password: "root",
    database : "db"
});

//Muodostetaan yhteys
pool.getConnection()
    .then(conn => {
    
      conn.query("SELECT 1 as val")
        .then((rows) => {
         /* console.log(rows); //[ {val: 1}, meta: ... ]
          //Table must have been created before 
          // " CREATE TABLE myTable (id int, val varchar(255)) "
          return conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);*/
        })
        .then((res) => {
          console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
          conn.end();
        })
        .catch(err => {
          //handle error
          console.log(err); 
          conn.end();
        })
        
    }).catch(err => {
      //not connected
    });

app.get("/", function(req, res){
    res.send("Homepage");
})

/*============================================================================================================
                                                INSERT INTO
==============================================================================================================*/ 
app.get("/insert", function(req, res){
    pool.getConnection()
    .then(conn =>{
        conn.query("INSERT INTO registration(first, last, age) VALUES('Jani', 'Hyvönen', 22);");
        res.send("Data has been sent!")
        conn.end();
    })
    .catch(err =>{
        console.log(err);
        conn.end();
    })
})


/*============================================================================================================
                                                UPDATE
==============================================================================================================*/ 
app.get("/update", function(req, res){
    pool.getConnection()
    .then(conn =>{
        conn.query("UPDATE registration SET first = 'Hessu', last = 'Hopo', age = 30 WHERE id = 1;");
        res.send("Data has been updates!");
        conn.end();
    })
    .catch(err => {
        console.log(err);
        conn.end();
    })
})

/*============================================================================================================
                                                DELETE
==============================================================================================================*/ 
app.get("/delete", function(req, res){
    pool.getConnection()
    .then(conn =>{
        conn.query("DELETE FROM registration WHERE id = 2;");
        res.send("Data has been deleted!");
        conn.end();
    })
    .catch(err => {
        console.log(err);
        conn.end();
    })
})


/*============================================================================================================
                                                QUERY/SELECT
==============================================================================================================*/ 

app.get("/testi", function(req, res){
    pool.getConnection()
    .then(conn => {
    
      conn.query("SELECT * FROM registration;")
        .then((rows) => {
          console.log(rows); //[ {val: 1}, meta: ... ]
          res.send(rows);
          conn.end();
        })
        .catch(err => {
          //handle error
          conn.end();
        })
    }).catch(err => {
      //not connected
    });
})





// Serveri päälle
app.listen(3000, "localhost", function(){
    console.log("Listening to port 3000");
});