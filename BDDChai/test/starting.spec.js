const assert = require("assert");
const should = require("chai").should();
describe("Basic mocha test", function() {
  it("should deal with objects", function() {
    const obj = {
      name: "John",
      age: 32
    };
    // object has access to should even though it was not imported here
    // should added itself to object property in another file which appended everything to the global
    // can check if object has property name and the name is equal to "John"
    obj.should.have.property("name").equal("John");
    // obj.should.have.property("name").equal("Sam");
  });
  it("should have obj equal to obj2", function() {
    const obj = {
      name: "John",
      age: 32
    };
    const obj2 = {
      name: "John",
      age: 32
    };
    // should also has deep object comparison to check if all values are equal
    obj.should.deep.equal(obj2);
  });
  it("should allow the testing of nulls", function() {
    const isNull = null;
    // this fails because null is not an object so it will not have the object prototype of should
    // isNull.should.not.exist;
    // use the imported "should" to perform the check instead;
    should.not.exist(isNull);
  });
});
