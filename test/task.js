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
    //false wala case
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
  //true wala case
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
    //false route
    it("it should get not post  tasks", (done) => {
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
  //true wala case
  describe("put  /api/tasks/", () => {
    it("update task", (done) => {
      const id = 1;
      const task = {
        name: "verma",
        completed: false,
      };
      chai
        .request(server)
        .put("/api/tasks/" + id)
        .send(task)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have.a.property("id");
          res.body.should.have.a.property("name");
          res.body.should.have.a.property("completed");
          res.body.should.have.a.property("id").eq(1);
          done();
        });
    });
    // false wala case
    it("It should NOT PUT an existing task with a name with less than 3 characters", (done) => {
      const taskId = 1;
      const task = {
        name: "Ta",
        completed: true,
      };
      chai
        .request(server)
        .put("/api/tasks/" + taskId)
        .send(task)
        .end((err, response) => {
          response.should.have.status(400);
          response.text.should.be.eq(
            "The name should be at least 3 chars long!"
          );
          done();
        });
    });
  });

  //test patch route
  describe("PATCH /api/tasks/:id", () => {
    it("It should PATCH an existing task", (done) => {
      const taskId = 1;
      const task = {
        name: "Task 1 patch",
      };
      chai
        .request(server)
        .patch("/api/tasks/" + taskId)
        .send(task)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("id").eq(1);
          response.body.should.have.property("name").eq("Task 1 patch");
          response.body.should.have.property("completed").eq(false);
          done();
        });
    });

    it("It should NOT PATCH an existing task with a name with less than 3 characters", (done) => {
      const taskId = 1;
      const task = {
        name: "Ta",
      };
      chai
        .request(server)
        .patch("/api/tasks/" + taskId)
        .send(task)
        .end((err, response) => {
          response.should.have.status(400);
          response.text.should.be.eq(
            "The name should be at least 3 chars long!"
          );
          done();
        });
    });
  });

  //test delete route
  describe("DELETE /api/tasks/:id", () => {
    it("It should DELETE an existing task", (done) => {
      const taskId = 1;
      chai
        .request(server)
        .delete("/api/tasks/" + taskId)
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });

    it("It should NOT DELETE a task that is not in the database", (done) => {
      const taskId = 145;
      chai
        .request(server)
        .delete("/api/tasks/" + taskId)
        .end((err, response) => {
          response.should.have.status(404);
          response.text.should.be.eq(
            "The task with the provided ID does not exist."
          );
          done();
        });
    });
  });
});
