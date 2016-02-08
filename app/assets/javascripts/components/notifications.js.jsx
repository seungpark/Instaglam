(function (root) {

  root.Notifications = React.createClass ({

    mixins: [ReactRouter.History],

    getInitialState: function () {
      allNotifications = CurrentUserStore.currentUser().received_comments.concat(
        CurrentUserStore.currentUser().received_likes
      );
      allNotifications.sort (function (a, b) {
        if (a.created_at > b.created_at) {
           return -1;
        } else if (a.created_at < b.created_at) {
           return 1;
        } else {
           return 0;
        }
      });
      return {
        sortedNotifications: allNotifications
      };
    },

    componentWillMount: function () {
      checkedIdx = this.state.sortedNotifications.findIndex (function(noti) {
        return noti.checked;
      });
      if (checkedIdx === 0) {
        newNoti = [];
        oldNoti = this.state.sortedNotifications;
      } else if (checkedIdx === -1) {
        newNoti = this.state.sortedNotifications;
        oldNoti = [];
      } else {
        newNoti = this.state.sortedNotifications.slice(0, checkedIdx);
        oldNoti = this.state.sortedNotifications.slice(checkedIdx);
      }

      this.setState({
        oldNoti: oldNoti,
        newNoti: newNoti
      });

    },

    componentWillUnmount: function () {
      var newLikes = this.state.newNoti.filter(function (noti) {
        return !noti.body;
      });
      var newComments = this.state.newNoti.filter(function (noti) {
        return noti.body;
      });
      newLikes.forEach (function (like) {
        ApiUtil.checkLike(like.id);
      });
      newComments.forEach (function (comment) {
        ApiUtil.checkComment(comment.id);
      });
      SessionsApiUtil.fetchCurrentUser();
      // api request to patch comments/likes to checked??
    },

    _evaluateAvatar: function (url) {
      if (url === "missingavatar.png") {
        return assets.missing_avatar;
      } else {
        return url;
      }
    },

    render: function () {
      return (
        <div className="notification-container">
          <div className="new-notifications">
            <ul className="notification-list">
            <h1>Newest Notifications</h1>
              {this.state.newNoti.map(function(noti) {
                var type = (noti.body) ? " commented on" : " liked";
                return (
                  <li>
                    <a href={"#/" + noti.user.username}>
                      <img className="avatar" src={this._evaluateAvatar(noti.user.avatar.url)}/>
                      {noti.user.username}
                    </a>
                    {type + " your "}
                    <a href={"#/photos/" + noti.photo.id}> photo
                      <img className="photo" src={noti.photo.image.url}/>
                    </a>
                  </li>
                );
              }.bind(this))}
            </ul>
          </div>
          <div className="old-notifications">
            <ul className="notification-list">
            <h1>Older Notifications</h1>
              {this.state.oldNoti.map(function(noti) {
                var type = (noti.body) ? " commented on" : " liked";
                return (
                  <li>
                    <a href={"#/" + noti.user.username}>
                      <img className="avatar" src={this._evaluateAvatar(noti.user.avatar.url)}/>
                      {noti.user.username}
                    </a>
                    {type + " your "}
                    <a href={"#/photos/" + noti.photo.id}> photo
                      <img className="photo" src={noti.photo.image.url}/>
                    </a>
                  </li>
                );
              }.bind(this))}
            </ul>
          </div>
        </div>
      );
    }

  });

})(this);
