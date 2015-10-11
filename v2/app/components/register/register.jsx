var React = require('react');

var Login = React.createClass({

  render: function() {

    return (
      <div className="register">
        <div className="register__caption"/>
        <input className="register__first_name" placeholder="First name"/>
        <input className="register__surname" placeholder="Surname"/>
        <input className="register__user" placeholder="Email"/>
        <input className="register__password" placeholder="Password" type="password"/>
        <div className="register__fill"/>
        <input type="button" className="register__submit" value="Sign up"/>
      </div>
    );
  }
});

module.exports = Login;
