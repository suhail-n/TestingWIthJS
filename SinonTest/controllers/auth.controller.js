function AuthController() {
  let roles;
  let user;
  const setRoles = role => {
    roles = role;
  };
  // used to test the passing of objects
  const getIndex = (req, res) => {
    if (req.user.isAuthorized("admin")) {
      return res.render("index");
    }
    res.render("error");
  };

  const setUser = inUser => {
    user = inUser;
  };
  const isAuthorized = neededRole => {
    return user.isAuthorized(neededRole);
  };

  const isAuthorizedAsync = (neededRole, cb) => {
    setTimeout(() => cb(roles.includes(neededRole)), 3000);
  };

  const isAuthorizedPromise = (neededRole, cb) => {
    return new Promise(resolve => {
      setTimeout(_ => resolve(roles.includes(neededRole)), 1000);
    });
  };

  return {
    isAuthorized,
    isAuthorizedAsync,
    setRoles,
    isAuthorizedPromise,
    getIndex,
    setUser
  };
}

module.exports = AuthController();
