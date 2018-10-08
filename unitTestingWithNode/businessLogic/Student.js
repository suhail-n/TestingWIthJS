const uuid = require("uuid");

class Student {
  static create(name, grade) {
    const student = new Student();
    student.name = name;
    student.grade = grade;
    student.id = uuid.v4();
    return student;
  }

  advanceGrade() {
    this.grade++;
  }

  toString() {
    return `${this.id}\t${this.name}`;
  }
}
module.exports = Student;
