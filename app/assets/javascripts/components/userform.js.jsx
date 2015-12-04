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

        <div className="user-form">
          <form className="new-user" onSubmit={this.submit} ref="form">

            <h1>Sign Up!</h1>

            <label className="new-user-username">
              
              <input type="text" name="username" placeholder="Username*" ref="username"/>
            </label>

            <label>

              <input type="password" name="password" placeholder="Password**" ref="password"/>
            </label>

            <label>

              <input type="text" name="name" placeholder="Name" ref="name"/>
            </label>

            <label>

              <input type="text" name="bio" placeholder="Bio" ref="bio"/>
            </label>
            <button className="submit-new-user">Sign Up!</button>
          </form>
        </div>
      );
    }

  });

})(this);
