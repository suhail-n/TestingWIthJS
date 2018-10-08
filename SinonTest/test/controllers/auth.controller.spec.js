const assert = require("assert");
const AuthController = require("../../controllers/auth.controller");
const expect = require("chai").expect;
const should = require("chai").should();
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const sinon = require("sinon");

describe("AuthController", function() {
  beforeEach(function() {
    AuthController.setRoles(["admin"]);
  });
  describe("isAuthorized", function() {
    let user = {};
    beforeEach(function() {
      user = {
        roles: ["user"],
        isAuthorized: function(neededRole) {
          return this.roles.includes(neededRole);
        }
      };
      // takes an object and an object method to spy on
      sinon.spy(user, "isAuthorized");
      AuthController.setUser(user);
    });

    it("it should keep this as pending");

    it("should return false if not authorized", function() {
      const auth = AuthController.isAuthorized("admin");
      // using the spy object to check if executed the function once
      user.isAuthorized.calledOnce.should.be.true;
      // logs all the spy object properties
      // console.log(user.isAuthorized);
      expect(auth).to.be.false;
    });
    it("should return true if authorized", function() {
      // AuthController.setRoles(["admin", "user"]);
      const auth = AuthController.isAuthorized("user");
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
      return AuthController.isAuthorizedPromise("admin").should.eventually.be
        .true;
    });
  });

  describe.only("getIndex", function() {
    let user = {};
    beforeEach(function() {
      user = {
        roles: ["user"],
        isAuthorized: function(neededRole) {
          return this.roles.includes(neededRole);
        }
      };
      // takes an object and an object method to spy on
    });

    it("should render index if authorized", function() {
      // stubbing user.isAuthorized to always return true
      let isAuth = sinon.stub(user, "isAuthorized").returns(true);
      // creating a spy to provide the fake function for getIndex()
      let req = { user };
      let res = {
        // spy is removed since we're mocking and can't spy on it twice
        // render: sinon.spy()
        render: function() {}
      };

      // creating a mock of the response
      let mock = sinon.mock(res);
      mock
        .expects("render")
        .once()
        .withExactArgs("index");

      AuthController.getIndex(req, res);
      // checking if our stub function was called
      isAuth.calledOnce.should.be.true;
      // this will print a large object holding properties of the spy like how many times it was executed
      // console.log(res.render);

      // verifies all mock expectations
      mock.verify();
      // can get rid of below because mock was used on response
      // using the spy objects "calledOnce" property to verify getIndex called it once;
      // res.render.calledOnce.should.be.true;
      // tests if the argument passed into the spy object is "index"
      // res.render.firstCall.args[0].should.equal("index");
    });
  });
});
