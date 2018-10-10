const chai = require('chai'),
      sinon = require('sinon'),
      sinonChai = require('sinon-chai'),
      getUsers = require('../getUsers');
const request = require('request');
const should = chai.should();
// add chai assertions to sinon
chai.use(sinonChai);

// x can call getUsers
// x Verify callback is called once
// x Verify correct URL is called
// x verify callback returns correct data


describe('GetUsers Test', function(){
    let spy;
    beforeEach(function(){
        spy = sinon.spy();
        sinon.stub(request, 'get').callsFake(function(url, cb){
            cb({}, {body: '{"users":["user1","user2"]}'});
        });
    });
    afterEach(function(){
        sinon.restore();
    })
    it("calls the callback", function(){
        getUsers(spy);
        spy.should.have.been.called;
    })
    it("should call the correct URL", function(){
        getUsers(spy);
        request.get.should.have.been.calledWith("http://jsonplaceholder.typicode.com/users/1");
    })
    it("should return correct data", function(){
        getUsers(spy);
        spy.should.have.been.calledWith({users:['user1', 'user2']});
    })
});