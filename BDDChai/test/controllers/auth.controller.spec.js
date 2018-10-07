const assert = require("assert");
const AuthController = require("../../controllers/auth.controller");
const expect = require("chai").expect;
//adds itself to object.prototype so every object now will have access to "should" function
//should is a function that needs to be executed to add it to "object.prototype"
const should = require("chai").should();
const chai = require("chai");
// need chaiAsPromised and chai.use to use it as a middleware so we can do AuthController.isAuthorizedPromise("user").should.eventually.be.true
// will allow testing of promise
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

describe("AuthController", function() {
  beforeEach(function() {
    // console.log("before each");
    AuthController.setRoles(["admin"]);
  });
  describe("isAuthorized", function() {
    it("it should keep this as pending");

    it("should return false if not authorized", function() {
      const auth = AuthController.isAuthorized("user");
      //using expect
      expect(auth).to.be.false;
    });
    it("should return true if authorized", function() {
      AuthController.setRoles(["admin", "user"]);
      const auth = AuthController.isAuthorized("admin");
      // auth can now access should from object.prototype
      // more readable
      auth.should.be.true;
    });
  });
  describe("isAuthorizedAsync", function() {
    it("should return false if not authorized", function(done) {
      this.timeout(5000);
      AuthController.isAuthorizedAsync("user", function(isAuth) {
        assert.equal(false, isAuth);
        done();
      });
    });
    it("should return true if authorized", function(done) {
      if (!true) {
        this.skip();
      } else {
        this.timeout(5000);
        AuthController.setRoles(["admin", "user"]);
        AuthController.isAuthorizedAsync("admin", function(isAuth) {
          assert.equal(true, isAuth);
          done();
        });
      }
    });
  });
  describe("isAuthorizedPromise", function() {
    it("should return false if not authorized", function() {
      // we can return the promise instead of executing done()
      // mocha will allow us to return a promise instead of done()
      return AuthController.isAuthorizedPromise("admin").should.eventually.be
        .true;
    });
  });
});
