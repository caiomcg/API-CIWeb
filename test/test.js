/**
 * Created by caiomcg on 05/06/17.
 */
const server = require("../server");
const chai   = require("chai");
const supertest = require("supertest");
const db        = require("../db");

const request = supertest(server);

var correctUserID = 0;
var badUserID = 0;

db.sequelize.sync().then(function () {}).catch(function (err) {
    console.error('Unable to connect to the database:', err);
});

describe("Reports API", function () {
    describe("POST /api/reports", function() {
        it("Add a report", function(done) {
            request.post("/api/reports").send({
                name: "User",
                email: "user@user.com",
                title: "Test Server",
                message: "Test message",
                state: "open"
            }).expect(200).end(function(err, res) {
                correctUserID = res.body.id;
                badUserID = correctUserID + 10;
                done(err);
            });
        });

        it("Add a report with extra information", function(done) {
            request.post("/api/reports").send({
                name: "User 2",
                email: "user2@user.com",
                title: "Test Server 2",
                message: "Test message 2",
                state: "open",
                extra: "close",
                another: "test"
            }).expect(200).end(function(err, res) {
                done(err);
            });
        });

        it("Try to add a report with missing information", function(done) {
            request.post("/api/reports").send({
                name: "User 3"
            }).expect(400).end(function(err, res) {
                done(err);
            });
        });
    });

    describe("PUT /api/reports/:id", function() {
        it("Update a report", function (done) {
            request.put("/api/reports/" + correctUserID).send({
                name: "UpdatedName"
            }).expect(200).end(function (err, res) {
                done(err);
            });
        });

        it("Update a report with bad info", function (done) {
            request.put("/api/reports/" + correctUserID).send({
                whatever: "UpdatedName"
            }).expect(400).end(function (err, res) {
                done(err);
            });
        });

        it("Update a report with extra info", function (done) {
            request.put("/api/reports/" + correctUserID).send({
                name: "UpdatedNameExtra",
                whatever: "asd"
            }).expect(200).end(function (err, res) {
                done(err);
            });
        });
    });

    describe("GET /api/reports", function() {
        it("Return all reports", function(done) {
            request.get("/api/reports").expect(200).end(function(err, res) {
                done(err);
            });
        });
    });

    describe("GET /api/reports/:id ", function() {
        it("Return an specific report", function(done) {
            request.get("/api/reports/" + correctUserID).expect(200).expect('Content-Type', /json/).expect(function(res) {
                return res.body.id === correctUserID;
            }).end(function(err, res) {
                done(err);
            });
        });

        it("Return 404 on bad report", function(done) {
            request.get("/api/reports/" + badUserID).expect(404).end(function(err, res) {
                done(err);
            });
        });
    });

    describe("DELETE /api/reports/:id", function() {
        it("Remove with valid ID", function(done) {
            request.delete("/api/reports/" + correctUserID).expect(200).end(function(err, res) {
                done(err);
            });
        });

        it("Remove with invalid ID", function(done) {
            request.delete("/api/reports/" + correctUserID).expect(404).end(function(err, res) {
                done(err);
            });
        });
    });
});

const roomEntity = {
    id: "101",
    projector: true,
    seats: 40,
    board: true,
    conditioner: true
};


describe("Rooms API", function () {
    describe("POST /api/rooms", function() {
        it("Add a room", function (done) {
            request.post("/api/rooms").send(roomEntity).expect(200).end(function (err, res) {
                done(err);
            });
        });
        it("Add a room with extra information", function(done) {

            roomEntity.extra = "abc";
            roomEntity.id = "206";

            request.post("/api/rooms").send(
                roomEntity
            ).expect(200).end(function(err, res) {
                done(err);
            });
        });

        it("Try to add a room with missing information", function(done) {
            delete roomEntity.projector;
            roomEntity.id = "300";
            request.post("/api/rooms").send({
                name: "User 3"
            }).expect(400).end(function(err, res) {
                done(err);
            });
        });

        describe("PUT /api/rooms/:id", function() {
            it("Update a room", function (done) {
                request.put("/api/rooms/" + 101).send({
                    seats: 400
                }).expect(200).end(function (err, res) {
                    done(err);
                });
            });

            it("Update a report with bad info", function (done) {
                request.put("/api/rooms/" + 101).send({
                    whatever: "UpdatedName"
                }).expect(400).end(function (err, res) {
                    done(err);
                });
            });

            it("Update a report with extra info", function (done) {
                request.put("/api/rooms/" + 101).send({
                    seats: 2000,
                    whatever: "asd"
                }).expect(200).end(function (err, res) {
                    done(err);
                });
            });
        });
    });

    describe("GET /api/rooms", function() {
        it("Return all rooms", function(done) {
            request.get("/api/rooms").expect(200).end(function(err, res) {
                done(err);
            });
        });
    });

    describe("GET /api/rooms/:id ", function() {
        it("Return an specific room", function(done) {
            request.get("/api/rooms/" + 101).expect(200).expect('Content-Type', /json/).expect(function(res) {
                return res.body.id === 101;
            }).end(function(err, res) {
                done(err);
            });
        });

        it("Return 404 on bad room", function(done) {
            request.get("/api/rooms/" + 3000).expect(404).end(function(err, res) {
                done(err);
            });
        });
    });

    describe("DELETE /api/rooms/:id", function() {
        it("Remove with valid ID", function(done) {
            request.delete("/api/rooms/" + 101).expect(200).end(function(err, res) {
                done(err);
            });
        });

        it("Remove with invalid ID", function(done) {
            request.delete("/api/rooms/" + 101).expect(404).end(function(err, res) {
                done(err);
            });
        });
    });
});
