const uuid = require("uuid");
class Course {
  static create(name, code, description) {
    const course = new Course();
    course.name = name;
    course.code = code;
    course.description = description;

    course.students = [];
    course.times = [];
    return course;
  }

  registerStudent(student) {
    this.students.push(student);
  }

  unregisterStudent(studentId) {
    const me = this;
    if (
      !this.students.some((student, i) => {
        if (student.id === studentId) {
          me.students.splice(i, 1);
          return true;
        }
      })
    ) {
      throw new Error(
        `Student '${studentId}' is not registered for this course`
      );
    }
  }

  addTimes(days, times) {
    const me = this;
    if (!Array.isArray(times)) {
      times = [times];
    }
    if (!Array.isArray(days)) {
      days = [days];
    }
    const validDays = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ];
    days.forEach(day => {
      if (!validDays.includes(day))
        throw new Error(`${day} is not a valid day`);
      times.forEach(time => {
        me.times.push({
          day,
          time
        });
      });
    });
  }

  showSchedule() {
    let scheduleString = "";
    let first = true;
    this.times.forEach(time => {
      if (!first) {
        scheduleString += "\n";
      }
      first = false;
      scheduleString += `${time.day} at ${time.time}`;
    });
    return scheduleString;
  }

  showStudents() {
    let studentString = "";
    let first = true;

    this.students.forEach(student => {
      if (!first) {
        studentString += "\n";
      }
      first = false;
      studentString += student.toString();
    });
    return studentString;
  }
}

module.exports = Course;
