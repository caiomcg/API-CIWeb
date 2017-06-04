const express  = require("express");
const parser   = require("body-parser");
const logger   = require("morgan");

const db = require("./db");
const problems = require("./routes/reportroutes");

const app = express();
const PORT = process.env.PORT || 8080; //Ready for Heroku integration

app.use(logger("dev"));
app.use(parser.json());

app.use("/api/reports", problems);

//Add problems with query
db.sequelize.sync().then(function () {
    app.listen(PORT, function () {
        console.log("Server is running at: localhost:" + PORT);
    });
}).catch(function (err) {
    console.error('Unable to connect to the database:', err);
});
