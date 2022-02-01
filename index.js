const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const PORT = 3002;
const app = express();

const db = mysql.createPool({
  host: "eu-cdbr-west-02.cleardb.net",
  user: "b4542d322eac77",
  password: "05e863fb",
  database: "heroku_669d7f1fd06383b",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const sqlGet = "SELECT * FROM applications";
  db.query(sqlGet, (err, result) => {
    console.log(result);
    res.send(result);
  });
});

app.post("/api/insert", (req, res) => {
  const userName = req.body.userName;
  const userEmail = req.body.userEmail;
  const userMessage = req.body.userMessage;
  const sqlInsert =
    "INSERT INTO applications (userName, userEmail, userMessage) VALUES (?, ?, ?)";
  db.query(sqlInsert, [userName, userEmail, userMessage], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      return result;
    }
  });
});

app.delete("/api/delete", (req, res) => {
  const userName = req.body.userName;
  const sqlDelete =
    "INSERT INTO applications (userName, userEmail, userMessage) VALUES (?, ?, ?)";
  db.query(sqlDelete, [userName], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      return result;
    }
  });
});

app.listen(process.env.PORT || PORT, () => {
  console.log("server is listening");
});
