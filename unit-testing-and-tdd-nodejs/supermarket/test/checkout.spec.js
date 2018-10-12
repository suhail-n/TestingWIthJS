const chai = require("chai");
const should = chai.should();
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const Checkout = require("../checkout");
const fs = require("fs");
// x can create an instance of checkout class
// x can add an item price
// x can add an item
// x can calculate the current total
// x can add multiple items and get correct total
// x can add discount rules
// x can apply discount rules to the total
// x Exception is thrown for item added without price

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
  it("should calculate the current total", function() {
    checkout.addItem("a");
    checkout.calculateTotal().should.be.equal(1);
  });
  it("should add multiple items and get correct total", function() {
    checkout.addItem("a");
    checkout.addItem("b");
    checkout.calculateTotal().should.be.equal(3);
  });
  it("should add discount rules", function() {
    checkout.addDiscount("a", 3, 2);
  });
  it("should apply discount rules to the total", function() {
    checkout.addItem("a");
    checkout.addItem("a");
    checkout.addItem("a");
    checkout.addDiscount("a", 3, 2);
    checkout.calculateTotal().should.be.equal(2);
  });
  it("throws an exception when an item is added without price", function() {
    should.Throw(_ => checkout.addItem("d"));
  });
  it("should get item prices from a file", async function(){

    let fileStub;  
    fileStub = sinon.stub(fs, "readFile").callsFake(function(path, encoding, cb){
      cb(undefined, '{"a": "2", "d": "1", "c": "4"}');
    });
    await checkout.updatePrices("./prices.json");
    fileStub.should.have.been.calledOnce;
    console.log("called once");
    let prices = checkout.getPrices();
    prices.should.deep.equal(JSON.parse('{"a":"2","b":2,"d":"1","c":"4"}'));
    sinon.restore();
  });
  if("should throw an error if file does not exist using promise return", function(){
    // return expect(checkout.updatePrices("./prices.jsn")).to.be.rejected;
    return should.Throw( _ => checkout.updatePrices("./prices.jsn"));
  });
  // or do above test like this
  it("should throw an error if file does not exist using async await", async function(){
    await (async _ => {
      try {
          await checkout.updatePrices("./pri.json");
      } catch (err) {
          should.Throw(_ => { throw err });
          // expect(() => { throw err }).to.throw();
          return;
      }
      // do what Chai normally does when no error is thrown
      expect(() => {}).to.throw();
      should.Throw(_ => {}).to.Throw();
   })();
  });
});
