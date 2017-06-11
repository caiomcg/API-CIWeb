/**
 * Created by caiomcg on 05/06/17.
 */
const express  = require("express");
const parser   = require("body-parser");
const logger   = require("morgan");
const cors     = require("cors");
const reports = require("./routes/reportroutes");
const rooms    = require("./routes/roomroutes");
const reserves = require("./routes/reserveroutes");

const app = express();

if (process.env.NODE_ENV === "dev") {
    app.use(logger("dev"));
}

app.use(parser.json());
app.use(cors());

app.use("/api/reports", reports);
app.use("/api/rooms", rooms);
app.use("/api/reserves", reserves);

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