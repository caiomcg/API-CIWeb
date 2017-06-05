const app  = require("./server");
const db      = require("./db");

const PORT = process.env.PORT || 8080; //Ready for Heroku integration

//Add problems with query
db.sequelize.sync().then(function () {
    app.listen(PORT, function () {
        console.log("Server is running at: localhost:" + PORT);
    });
}).catch(function (err) {
    console.error('Unable to connect to the database:', err);
});
