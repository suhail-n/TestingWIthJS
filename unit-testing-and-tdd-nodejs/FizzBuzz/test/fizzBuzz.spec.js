const should = require("chai").should();
const fizzBuzz = require("../fizzBuzz");

// x return 1 when 1 is passed
// x return 2 when 2 is passed
// x return fizz with multiples of 3
// x return buzz with multiples of 5
// x return fizzbuzz with multiples of 3 and 5

describe("FizzBuzz", function() {
  function fizzBuzzCheck(input, expected) {
    fizzBuzz(input).should.equal(expected);
  }
  it("should return 1 when 1 is passed", function() {
    fizzBuzzCheck(1, "1");
  });
  it("should return 2 when 2 is passed", function() {
    fizzBuzzCheck(2, "2");
  });
  it("should return fizz when 3 is passed", function() {
    fizzBuzzCheck(3, "fizz");
  });
  it("should return buzz when 5 is passed", function() {
    fizzBuzzCheck(5, "buzz");
  });
  it("should return fizzbuzz when 15 is passed", function() {
    fizzBuzzCheck(15, "fizzbuzz");
  });
});
