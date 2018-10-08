const Student = require("../Student"),
  Course = require("../Course"),
  chai = require("chai"),
  should = chai.should(),
  expect = chai.expect;

describe("Course", function() {
  const courseName = "Introduction to CS",
    courseCode = "CS 101",
    courseDescription = "This course is CS 101";
  let student;

  beforeEach(function() {
    student = Student.create("John Doe", 5);
  });
  it("should save data correctly", function() {
    const course = Course.create(courseName, courseCode, courseDescription);

    course.name.should.exist;
    course.code.should.exist;
    course.description.should.exist;

    // wont work due to reference comparison of objects
    // course.students.should.equal([]);
    // use this instead
    course.students.should.deep.equal([]);
  });
  describe("registerStudent", function() {
    it("should add the student to the students array", function() {
      const course = Course.create(courseName, courseCode, courseDescription);
      course.registerStudent(student);
      course.students.length.should.equal(1);
      course.students[0].id.should.equal(student.id);
    });
  });
  //   ------------- ERRORS -------------
  describe("unregisterStudent", function() {
    it("should throw an error if we try to remove a student", function() {
      const course = Course.create(courseName, courseCode, courseDescription);
      // check for error
      should.Throw(_ => course.unregisterStudent(123), Error);
      //   this also checks for error
      expect(_ => course.unregisterStudent(123)).to.throw();
      //   course.unregisterStudent(123).should.Throw(Error);
    });
  });

  //   ---------- EDGE CASES -----------
  describe("addTimes", function() {
    it("should add the given days/times to the course", function() {
      const course = Course.create(courseName, courseCode, courseDescription);
      const days = ["Monday", "Wednesday", "Friday"],
        times = ["10:00", "14:00"];
      course.addTimes(days, times);
      course.times.length.should.equal(6);
      course.times[2].should.deep.equal({
        day: "Wednesday",
        time: "10:00"
      });
    });
    it("should not add a non-day to the times array", function() {
      const course = Course.create(courseName, courseCode, courseDescription);
      const day = "asfsdafs";
      const time = "10:00";
      //   course.addTimes(day, time);
      should.Throw(_ => course.addTimes(day, time), Error);
      //   expect(_ => course.addTimes(day, time)).to.throw();
    });
  });
});
