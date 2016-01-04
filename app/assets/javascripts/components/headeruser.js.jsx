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

    _expand: function () {
      $(".header-user-nav").toggleClass("hide");
    },

    render: function() {
      if (CurrentUserStore.isSignedIn()) {
        var currentUserUsername = CurrentUserStore.currentUser().username;
        return (
          <div className="header-user group" >
            <img className="menu-button" src={assets.menu_icon} onClick={ this._expand }/>
            <div className="header-user-nav">
              <a href={"/#/" + currentUserUsername}>{currentUserUsername}</a>
              <a href="/#/newphoto">Add New Photo</a>
              <button onClick={ this.signout }>Sign Out!</button>
            </div>
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

    }

  });
})(this);
