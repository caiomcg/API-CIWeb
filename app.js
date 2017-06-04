const express  = require("express");
const parser   = require("body-parser");
const index    = require("./routes/index");
const problems = require("./routes/problemroutes");
const logger   = require("morgan");
const db = require("./db");

const app = express();

app.use(logger("dev"));
app.use(parser.json());

app.use("/", index);
app.use("/problems", problems);


const PORT = process.env.PORT || 8080; //Ready for Heroku integration

//Add problems with query
db.sequelize.sync().then(function () {
    app.listen(PORT, function () {
        console.log("Server is running at: localhost:" + PORT);
    });
}).catch(function () {
    console.error('Unable to connect to the database:', err);
});
