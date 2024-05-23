import mysql from "mysql";

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "zoo_website"
})

con.connect(function (err) {
    if( err){
        console.log("connection error")
    } else {
        console.log("connectioned")
    }
})
export default con;