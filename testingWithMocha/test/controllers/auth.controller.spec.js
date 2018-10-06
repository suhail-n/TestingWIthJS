const assert = require("assert");
const AuthController = require("../../controllers/auth.controller");

//mocha uses a global describe which holdsevery test inside
//before each over here will run the beforeEach before every test located outside this file
//named functions will be displayed in console if it throws an error
// the description in beforeEach will also be displayed incase an error is thrown.
//Provides visibility when something breaks
beforeEach("Before each globally function running", function globalBefore() {
  console.log("global before each");
  //   throw { error: "error" };
});
describe("AuthController", function() {
  //Hook (beforeEach) used to execute code before each 'it' inside the describe
  //Hook (before) executed once before the test
  beforeEach(function() {
    console.log("before each");
    AuthController.setRoles(["admin"]);
  });
  //   'Only' keyword will only run the tests within the one describe and ignore everything else
  // good when focusing on one test
  describe.only("isAuthorized", function() {
    // an it with just a phrase is displayed as a pending reminder to complete the test
    it("it should keep this as pending");

    // 'Only' keyword says only run this test within the describe
    it.only("should return false if not authorized", function() {
      //   AuthController.setRoles(["admin"]);
      assert.equal(false, AuthController.isAuthorized("user"));
    });
    it("should return true if authorized", function() {
      AuthController.setRoles(["admin", "user"]);
      assert.equal(true, AuthController.isAuthorized("admin"));
    });
  });
  // dont use arrow functions. Mocha suggests not to. It will interfere with memory references
  //   "Skip" keyword skips certain code incase it's breakind and we want to fix it later
  describe.skip("isAuthorizedAsync", function() {
    it("should return false if not authorized", function(done) {
      // changing the default timeout to 5000 ms which is enough time for the async func to complete
      // default 2000 will faill all tests if it has to wait.
      // done() will show the test is ended instead of waiting the full 5000ms timeout
      this.timeout(5000);
      AuthController.isAuthorizedAsync("user", function(isAuth) {
        assert.equal(false, isAuth);
        //done is used for promises to indicate completion
        done();
      });
    });
    it("should return true if authorized", function(done) {
      // we can see if an environment condition is present to determine whether to run tests or not
      if (true) {
        //check for some environmental condition to be true
        //skip can be used like this as well
        this.skip();
      } else {
        this.timeout(5000);
        AuthController.setRoles(["admin", "user"]);
        AuthController.isAuthorizedAsync("admin", function(isAuth) {
          assert.equal(true, isAuth);
          //done is used for promises to indicate completion
          done();
        });
      }
    });
  });
});
