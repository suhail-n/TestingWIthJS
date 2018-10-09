const should = require("chai").should();
const expect = require("chai").expect;
const Checkout = require("../checkout");
// x can create an instance of checkout class
// x can add an item price
// x can add an item
// x can calculate the current total
// x can add multiple items and get correct total
// x can add discount rules
// x can apply discount rules to the total
// Exception is thrown for item added without price

describe("Checkout", _ => {
  let checkout;
  beforeEach(function() {
    checkout = new Checkout();
    checkout.addItemPrice("a", 1);
    checkout.addItemPrice("b", 2);
  });
  //   it("can add an item price", function() {
  //     checkout.addItemPrice("chips", 2);
  //   });
  //   it("can add an item", function() {
  //     checkout.addItemPrice("item1", 1);
  //     checkout.addItem("item1");
  //   });
  //   this test is already testing the "can add item price", and "can add an item" so we refactor by removing those
  it("can calculate the current total", function() {
    checkout.addItem("a");
    checkout.calculateTotal().should.be.equal(1);
  });
  it("can add multiple items and get correct total", function() {
    checkout.addItem("a");
    checkout.addItem("b");
    checkout.calculateTotal().should.be.equal(3);
  });
  it("can add discount rules", function() {
    checkout.addDiscount("a", 3, 2);
  });
  it("can apply discount rules to the total", function() {
    checkout.addItem("a");
    checkout.addItem("a");
    checkout.addItem("a");
    checkout.addDiscount("a", 3, 2);
    console.log("Total price: " + checkout.calculateTotal());
    checkout.calculateTotal().should.be.equal(2);
  });
  it("throws an exception when an item is added without price", function() {
    should.Throw(_ => checkout.addItem("d"));
  });
});
