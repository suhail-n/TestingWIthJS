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
  return { isAuthorized, isAuthorizedAsync, setRoles };
}

module.exports = AuthController();
