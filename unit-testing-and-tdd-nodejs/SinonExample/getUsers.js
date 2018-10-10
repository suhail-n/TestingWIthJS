const request = require("request");
module.exports = function getUsers(cb){
    request.get("http://jsonplaceholder.typicode.com/users/1", function(err, res){
        cb(JSON.parse(res.body));
    });
}   