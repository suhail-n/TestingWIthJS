const assert = require("assert");
const should = require("chai").should();
describe("Basic mocha test", function() {
  it("should deal with objects", function() {
    const obj = {
      name: "John",
      age: 32
    };
    obj.should.have.property("name").equal("John");
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
    obj.should.deep.equal(obj2);
  });
  it("should allow the testing of nulls", function() {
    const isNull = null;
    should.not.exist(isNull);
  });
});
