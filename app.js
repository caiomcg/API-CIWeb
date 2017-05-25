const express = require("express");
const parser  = require("body-parser");
const _ = require("underscore");
const index = require("./routes/index");
const problems = require("./routes/problemroutes");
const app = express();

app.use(parser.json());
app.use("/", index);
app.use("/problems", problems);

const PORT = process.env.PORT || 8080; //Ready for Heroku integration

app.get("/problems",function (req, res) {
    console.log("Here " + req.method);
    return res.status(200).send();
});

app.get("/problems/:id", function (req, res) {

});

//Add problems with query

app.listen(PORT, function () {
    console.log("Server is running at: localhost:" + PORT);
});