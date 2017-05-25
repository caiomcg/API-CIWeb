const express  = require("express");
const parser   = require("body-parser");
const _        = require("underscore");
const index    = require("./routes/index");
const problems = require("./routes/problemroutes");
const logger   = require("morgan");

const app = express();

const firebase = require("firebase");

firebase.initializeApp({
    serviceAccount: "./credentials/credential.json",
    databaseURL: "https://NAME.firebaseio.com"
});

app.use(logger("dev"));
app.use(parser.json());

app.use("/", index);
app.use("/problems", problems);

const PORT = process.env.PORT || 8080; //Ready for Heroku integration

//Add problems with query

app.listen(PORT, function () {
    console.log("Server is running at: localhost:" + PORT);
});