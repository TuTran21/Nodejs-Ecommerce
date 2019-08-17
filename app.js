const createError = require("http-errors");
const express = require("express");
const session = require("express-session");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const flash = require("connect-flash");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const adminRouter = require("./routes/admin");
const searchRouter = require("./routes/search");
const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const MongoClient = require("mongodb").MongoClient;

const app = express();

// DB mongoose

// const uri = "mongodb+srv://admin:123@basicnodejs-d6le8.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
const mongoose = require("mongoose");
// const { MONGO_URI = "mongodb://localhost:27017/basic-nodejs" } = process.env;
// const { MONGO_URI = "mongodb+srv://admin:123@basicnodejs-d6le8.mongodb.net/test?retryWrites=true&w=majority" } = process.env;
const MONGO_URI =
  "mongodb+srv://admin:123@basicnodejs-d6le8.mongodb.net/test?retryWrites=true&w=majority";

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    cookie: { maxAge: 60000 },
    secret: "woot",
    resave: false,
    saveUninitialized: false
  })
);
app.use(flash());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/admin", adminRouter);
app.use("/register", registerRouter);

app.use("/login", loginRouter);

app.get("/search", searchRouter);

// app.get("/search", (req, res) => {
//   console.log(req.query);
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

mongoose.connect(MONGO_URI).then(() => {
  console.log("Connected");
});

module.exports = app;
