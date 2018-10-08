const Student = require("../Student"),
  Course = require("../Course"),
  chai = require("chai"),
  should = chai.should(),
  expect = chai.expect;

describe("Student", function() {
  const studentName = "John Doe";
  const studentGrade = 5;
  it("should save the info on the student and create an id when created", function() {
    const student = Student.create(studentName, studentGrade);
    student.name.should.exist;
    student.name.should.equal(studentName);
    student.grade.should.equal(studentGrade);
    student.id.should.exist;
  });
  it("should increase the student's grade by 1 when advanceGrade is called", function() {
    const student = Student.create(studentName, studentGrade);
    student.advanceGrade();
    student.grade.should.equal(studentGrade + 1);
  });
});
