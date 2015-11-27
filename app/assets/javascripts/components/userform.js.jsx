(function (root) {

  root.UserForm = React.createClass({

    mixins: [ReactRouter.History],

    submit: function(e) {
      e.preventDefault();
      var userinfo = $(React.findDOMNode(this.refs.form)).serializeJSON();
      ApiUtil.createUser(userinfo, function () {
        this.history.pushState(null, "/");
      }.bind(this));
    },

    render: function() {
      return(
        <form className="new-user" onSubmit={this.submit} ref="form">

          <label className="new-user-username">
            Username
            <input type="text" name="username" placeholder="Username" ref="username"/>
          </label>

          <label>
            Password
            <input type="password" name="password" placeholder="Password" ref="password"/>
          </label>

          <label>
            Name
            <input type="text" name="name" placeholder="Name" ref="name"/>
          </label>

          <label>
            Bio
            <input type="text" name="bio" placeholder="Bio" ref="bio"/>
          </label>
          <button className="submit-new-user">Sign Up!</button>
        </form>
      );
    }

  });

})(this);
