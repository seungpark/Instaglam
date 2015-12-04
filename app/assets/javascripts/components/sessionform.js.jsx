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
          <div className="signin-landing">
            <div className="signin-form">
              <form className="signin-form" onSubmit={this.submit} ref="form">

                <h1>Sign In!</h1>

                <label className="signin-username">

                  <input type="text" name="username" placeholder="Username" ref="username"/>
                </label>

                <label className="signin-password">
                  
                  <input type="password" name="password" placeholder="Password" ref="password"/>
                </label>

                <button className="signin-button">Sign In!</button>
                <button className="signin-guest" onClick={this._fillGuestInfo}>Guest Account!</button>

              </form>
              <ReactRouter.Link className="signup" to="/signup">Sign Up! </ReactRouter.Link>
              </div>
          </div>
        </div>
      );
    }

  });

})(this);
