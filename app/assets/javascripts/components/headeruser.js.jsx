(function(root) {
  root.HeaderUser = React.createClass({

    mixins: [ReactRouter.History],

    getInitialState: function () {
      return {
        currentUser: CurrentUserStore.currentUser()
      };
    },

    componentDidMount: function () {
      CurrentUserStore.addChangeHandler(this._onChange);
    },

    _onChange: function () {
      this.setState({currentUser: CurrentUserStore.currentUser()});
    },

    signout: function () {
      SessionsApiUtil.signout();
    },

    render: function() {
      if (CurrentUserStore.isSignedIn()) {
        var currentUserHomePage = "/" + CurrentUserStore.currentUser().username;
        return (
          <div className="header-user">
          <ul className="header-user-nav">
            <li><ReactRouter.Link to={currentUserHomePage}>{CurrentUserStore.currentUser().username}
            </ReactRouter.Link></li>
            <li><a href="/#/newphoto">Add New Photo</a></li>
            <li><button onClick={ this.signout }>Sign Out!</button></li>
          </ul>

          </div>

        );
      } else {
        return (
          <div className="header-user">
            <ul className="header-user-nav">
              <li><a className="signin-link" href="#/signin">Sign In!</a></li>
            </ul>
          </div>
        );
      }

    },

  });
})(this);
