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
        nav.contents().addClass('hidden');
        nav.addClass('hide');
      }
    },

    _newNotifications: function (comments, likes) {
      var cCount = comments.filter( function (comment) {
        return !comment.checked;
      }).length;

      var lCount = likes.filter( function (like) {
        return !like.checked;
      }).length;

      return cCount + lCount;
    },

    render: function() {
      if (CurrentUserStore.isSignedIn()) {
        var currentUser = CurrentUserStore.currentUser();
        var receivedComments = currentUser.received_comments;
        var receivedLikes = currentUser.received_likes;
        var notificationCount = this._newNotifications(receivedComments, receivedLikes);
        var notification = (notificationCount === 1) ? "Notification" : "Notifications";
        return (
          <div className="header-user group" >
            <img className="menu-button" src={assets.menu_icon} onClick={ this._expand }/>
            <div className="header-user-nav hide">
              <a className="hidden" href={"/#/notifications"}> {notificationCount} {notification} </a>
              <a className="hidden" href={"/#/" + currentUser.username}>{currentUser.username}</a>
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
