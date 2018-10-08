let chai = require("chai"),
  expect = chai.expect;
chai.should();

function isEven(num) {
  return num % 2 === 0;
}

// --------- NESTING DESCRIBE FUNCTIONS -----------
// we can nest describe functions
describe("Numbered Tests", function() {
  // --------- Basic Mocha and Chai -----------
  describe("isEven", function() {
    it("should return true when number is even", function() {
      isEven(8).should.be.true;
    });
    // --------- 'only' TO ONLY RUN ONE TEST -----------
    // only can be placed on describe as well
    // it.only("should return false when number is odd", function() {
    it("should return false when number is odd", function() {
      isEven(9).should.be.false;
    });
  });

  function add(num1, num2) {
    return num1 + num2;
  }

  // --------- SETUP and TEARDOWN -----------
  describe("add without setup/teardown", function() {
    let num = 5;
    //   this is the setup
    beforeEach(function() {
      num = 5;
    });

    //   afterEach can be used as a teardown
    afterEach(function() {});
    it("should be ten when adding 5 to 5", function() {
      num = add(num, 5);
      num.should.equal(10);
    });
    // --------- Skipping Tests -----------
    // can also add skip to the 'describe' function. Will log as pending
    it.skip("should be twelve when adding 7 to 5", function() {
      add(num, 7).should.equal(12);
    });
  });
});
