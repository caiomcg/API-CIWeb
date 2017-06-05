const express  = require("express");
const parser   = require("body-parser");
const logger   = require("morgan");
const cors     = require("cors");
const db = require("./db");
const problems = require("./routes/reportroutes");

const app = express();
const PORT = process.env.PORT || 8080; //Ready for Heroku integration

app.use(logger("dev"));
app.use(parser.json());
app.use(cors());

app.use("/api/reports", problems);

/**
 * Error handler.
 */
app.use(function(err, req, res, next) {
    if (app.get('env') !== 'development')
        delete err.stack;
    res.status(err.status).json({
        'error': {
            'message': err.message,
            'status': err.status,
            'stack': err.stack
        }
    });
});


//Add problems with query
db.sequelize.sync().then(function () {
    app.listen(PORT, function () {
        console.log("Server is running at: localhost:" + PORT);
    });
}).catch(function (err) {
    console.error('Unable to connect to the database:', err);
});
