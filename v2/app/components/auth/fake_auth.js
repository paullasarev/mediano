function Auth() {
  this.loggedIn = true;
}

Auth.prototype.isLoggedIn = function () {
  return this.loggedIn;
}

Auth.prototype.setLoggedIn = function(value) {
  this.loggedIn = value;
}

module.exports = Auth;