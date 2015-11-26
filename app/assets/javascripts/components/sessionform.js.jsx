(function(root) {

  root.SessionForm = React.createClass({

    mixins: [ReactRouter.History],

    submit: function(e) {
      e.preventDefault();

      var credentials = $(e.currentTarget).serializeJSON();
      SessionsApiUtil.signin(credentials, function () {
        this.history.pushState(null, "/");
      }.bind(this));
    },

    render: function() {
      return (
        <div className="signin-form">
          <Header/>
          <form onSubmit={this.submit}>
          <h1>Sign In!</h1>

          <label>
            Username
            <input type="text" name="username" />
          </label>

          <label>
            Password
            <input type="password" name="password" />
          </label>

          <button>Sign In!</button>

        </form>
        </div>
      )
    }

  });

})(this);
