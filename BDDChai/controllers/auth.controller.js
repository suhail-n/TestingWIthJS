function AuthController() {
  let roles;
  const setRoles = role => {
    roles = role;
  };
  const isAuthorized = neededRole => {
    return roles.includes(neededRole);
  };

  const isAuthorizedAsync = (neededRole, cb) => {
    setTimeout(() => cb(roles.includes(neededRole)), 3000);
  };

  const isAuthorizedPromise = (neededRole, cb) => {
    return new Promise(resolve => {
      setTimeout(_ => resolve(roles.includes(neededRole)), 1000);
    });
  };

  return { isAuthorized, isAuthorizedAsync, setRoles, isAuthorizedPromise };
}

module.exports = AuthController();
