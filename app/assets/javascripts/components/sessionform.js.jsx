(function(root) {

  root.SessionForm = React.createClass({

    mixins: [ReactRouter.History],

    submit: function(e) {
      if (typeof e !== "undefined") {
        e.preventDefault();
      }

      var credentials = $(React.findDOMNode(this.refs.form)).serializeJSON();
      SessionsApiUtil.signin(credentials, function () {
        this.history.pushState(null, "/");
      }.bind(this));
    },

    _fillGuestInfo: function(e){
      e.preventDefault();
      React.findDOMNode(this.refs.username).value = "guest";
      React.findDOMNode(this.refs.password).value = "hello123";
      this.submit();
    },

    render: function() {
      return (
        <div className="signin-page">
          <Header/>
          <form className="signin-form" onSubmit={this.submit} ref="form">
          <h1>Sign In!</h1>

          <label className="signin-username">
            Username
            <input type="text" name="username" ref="username"/>
          </label>

          <label className="signin-password">
            Password
            <input type="password" name="password" ref="password"/>
          </label>

          <button className="signin-button">Sign In!</button>
          <button className="signin-guest" onClick={this._fillGuestInfo}>Guest Account!</button>

        </form>
        </div>
      )
    }

  });

})(this);
