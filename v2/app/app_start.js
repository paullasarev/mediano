var App = require('./app.jsx');
var FakeAuth = require('./components/auth/fake_auth.js');

var app = new App(new FakeAuth());

app.start();
