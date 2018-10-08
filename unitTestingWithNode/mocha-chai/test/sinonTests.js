let chai = require("chai"),
  sinon = require("sinon"),
  expect = chai.expect;
chai.should();

describe.only("Sinon Tests", function() {
  let student, schedule;
  beforeEach(function() {
    student = {
      dropClass: function(classId, cb) {
        if (cb.dropClass) {
          cb.dropClass();
        } else {
          cb();
        }
      },
      addClas: function(schedule) {
        if (!schedule.classIsFull()) {
          return true;
        } else {
          return false;
        }
      }
    };
    schedule = {
      dropClass: function() {
        console.log("class dropped");
      },
      classIsFull: function() {
        return true;
      }
    };
  });

  // ------------ USING SPY --------------
  describe("student.dropClass", function() {
    it("should call the callback", function() {
      let called = false;
      let spy = sinon.spy();
      student.dropClass(1, spy);
      // accessing the spy here to see if it was called
      spy.called.should.be.true;
    });
    // checking to see if our actual callback is called along with spying on it
    it("should call the callback and log to the console", function() {
      function onClassDropped() {
        console.log("onClassDropped was called");
      }
      let spy = sinon.spy(onClassDropped);
      // when spy is called, spy ends up invoking the actual onClassDropped function that it is spying on.
      student.dropClass(1, spy);
      spy.called.should.be.true;
    });

    it("should call the callback even if it is a method of an object", function() {
      // adding the method as a string will allow sinon to find the method and spy on it
      sinon.spy(schedule, "dropClass");
      student.dropClass(1, schedule);
      schedule.dropClass.called.should.be.true;
    });
  });
  // ------------- STUBS --------------------
  describe("Student with stubs", function() {
    it("should call a stubbed method", function() {
      // sinon goes through every method in the object and replaces it with a stub
      // stub has same functionality as the spy
      let stub = sinon.stub(schedule);
      // a stub does not call the inner implementation of the underlying method
      // stubs can control how they function
      student.dropClass(1, stub);
      stub.dropClass.called.should.be.true;
    });
    //--------------- STUBS Control function --------------
    it("should return true when the class is not full", function() {
      let stub = sinon.stub(schedule);
      // control stub to return false for this test as opposed to actually executing the method
      stub.classIsFull.returns(false);

      let returnVal = student.addClas(stub);
      returnVal.should.be.true;
    });
  });
  // ------------ USING MOCKS --------------
  describe("Student with mocks", function() {
    it("mocks schedule", function() {
      let mock = sinon.mock(schedule);
      let expectation = mock.expects("classIsFull").once();
      // pass in schedule since mock has already modified the actual object
      student.addClas(schedule);
      expectation.verify();
    });
  });
});
