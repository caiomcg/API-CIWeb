/**
 * Created by caiomcg on 05/06/17.
 */
const express  = require("express");
const parser   = require("body-parser");
const logger   = require("morgan");
const cors     = require("cors");
const problems = require("./routes/reportroutes");

const app = express();

if (process.env.NODE_ENV == "dev") {
    app.use(logger("dev"));
}
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

module.exports = app;