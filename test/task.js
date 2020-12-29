let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");

//Assertion Style
chai.should();
chai.use(chaiHttp);
describe("tasks api", () => {
  //testing get route
  //true wla case
  describe("get  /api/test", () => {
    it("it should get all the tasks", (done) => {
      chai
        .request(server)
        .get("/api/tasks")
        .end((err, res) => {
          res.should.have.status(200); //assertions
          res.body.should.be.a("array"); //assertions
          res.body.length.should.be.eq(3);
          done();
        });
    });
    //false wala case
    it("it should get all the tasks", (done) => {
      chai
        .request(server)
        .get("/api/task")
        .end((err, res) => {
          res.should.have.status(404);

          done();
        });
    });
  });
  //test get route by id
  //true wala case
  describe("get  /api/test/id", () => {
    it("it should get one task", (done) => {
      const taskid = 1;
      chai
        .request(server)
        .get("/api/tasks/" + taskid)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.a.property("id");
          res.body.should.have.a.property("name");
          res.body.should.have.a.property("completed");
          res.body.should.have.a.property("id").eq(1);
          done();
        });
    });

    it("it should get all the tasks", (done) => {
      const id = 5;
      chai
        .request(server)

        .get("/api/tasks/" + id)
        .end((err, res) => {
          res.should.have.status(404);
          res.text.should.be.eq(
            "The task with the provided ID does not exist."
          );
          done();
        });
    });
  });

  //testing post route

  describe("post  /api/tasks/", () => {
    it("add new task", (done) => {
      const task = {
        name: "yash",
        completed: false,
      };
      chai
        .request(server)
        .post("/api/tasks/")
        .send(task)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have.a.property("id");
          res.body.should.have.a.property("name");
          res.body.should.have.a.property("completed");
          res.body.should.have.a.property("id").eq(4);
          done();
        });
    });

    it("it should getnot post  tasks", (done) => {
      chai
        .request(server)

        .post("/api/tasks/")
        .end((err, res) => {
          res.should.have.status(400);
          res.text.should.be.eq("The name should be at least 3 chars long!");
          done();
        });
    });
  });

  //test put route
  //test patch route
  //test delete route
});
