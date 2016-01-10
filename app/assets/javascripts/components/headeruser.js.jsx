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
      var nav = $(".header-user-nav");
      if (nav.hasClass("hide")) {
        nav.contents().removeClass("hidden");
        nav.removeClass('hide');
      } else {
        nav.addClass('hide');
        window.setTimeout(function() {
          nav.contents().addClass('hidden');
        }, 500);
      }
    },

    render: function() {
      if (CurrentUserStore.isSignedIn()) {
        var currentUserUsername = CurrentUserStore.currentUser().username;
        return (
          <div className="header-user group" >
            <img className="menu-button" src={assets.menu_icon} onClick={ this._expand }/>
            <div className="header-user-nav hide">
              <a className="hidden" href={"/#/" + currentUserUsername}>{currentUserUsername}</a>
              <a className="hidden" href="/#/newphoto">Add New Photo</a>
              <button className="hidden" onClick={ this.signout }>Sign Out!</button>
            </div>
          </div>

        );
      } else {
        return (
          <div className="signin">
            <a className="signin-link" href="#/signin">Sign In!</a>
          </div>
        );
      }

    }

  });
})(this);
