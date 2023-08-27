const express = require("express")
const ejs = require("ejs");
const bodyParser = require("body-parser");
const app = express();
const path = require("path")
const forms = require("./routes")
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser")
app.use(express.static("client"));

app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/client"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    if(req.cookies.victo_id) {
      res.render("./home.ejs", { isLoggedIn: true });
    } else {
      res.render("./home.ejs", { isLoggedIn: false });
    }
})

app.use("/users", forms);
mongoose
  .connect(
    "mongodb+srv://petparadise:Petparadise@cluster0.zuw8xzo.mongodb.net/test"
  )
  .then((result) => {
    app.listen(8000);
    console.log("server started successfully!");
  })
  .catch((err) => {
    console.log(err);
  });