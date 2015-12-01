(function(root) {

  root.UserPageProfile = React.createClass ({

    mixins: [ReactRouter.History],

    getInitialState: function() {
      return { pageuser: this.props.pageuser, following: null };
    },

    componentWillReceiveProps: function(newProps) {
      this.setState({ pageuser: newProps.pageuser });
      var followingBoolean;
      if (CurrentUserStore.currentUser() && newProps.pageuser) {
        followingBoolean = CurrentUserStore.currentUser().following_users.find(function (user) {
          if (user.id === newProps.pageuser.id) {
            return true;
          }
        });
      }
      this.setState({ following: followingBoolean });
    },

    _toggleFollow: function () {
      if (this.state.following) {
        var id = CurrentUserStore.currentUser().followings.find(function(following){
          if (following.user_id === this.props.pageuser.id) {
            return true;
          }
        }.bind(this));
        if (id) {
          id = id.id;
        }

        ApiUtil.deleteFollow(id);
      } else {
        ApiUtil.createFollow(
          this.props.pageuser.id,
          CurrentUserStore.currentUser().id
        );
      }

      this.setState({ following: !this.state.following });

    },

    render: function() {
      var posts, followers, following;
      if (this.state.pageuser && this.state.pageuser.photos.length === 1) {
        posts = " post";
      } else {
        posts = " posts";
      }

      if (this.state.pageuser && this.state.pageuser.followers.length === 1) {
        followers = "follower";
      } else {
        followers = "followers";
      }

      if (this.state.following) {
        following = "FOLLOWING";
      } else {
        following = "FOLLOW";
      }


      if (this.state.pageuser && this.state.pageuser.id === CurrentUserStore.currentUser().id) {
        return (
          <div className="userpage-profile group">
            <div className="userpage-avatar">
              <img src={this.state.pageuser.avatar_url}/>
            </div>
            <div className="userpage-user-info">
              <div className="username-and-edit">
                <h1 className="userpage-username">
                  {this.state.pageuser.username}
                </h1>
                <ReactRouter.Link to={"/editprofile"}>{"EDIT PROFILE"}
                </ReactRouter.Link>
              </div>
              <div className="name-and-bio">
                <h2 className="userpage-name">
                  {this.state.pageuser.name}
                </h2>
                <span className="userpage-bio">
                  {this.state.pageuser.bio}
                </span>
              </div>
              <ul className="userpage-stats">
                <li>{this.state.pageuser.photos.length + posts}</li>
                <li>{this.state.pageuser.followers.length + followers}</li>
                <li>{this.state.pageuser.following_users.length + " following"}</li>
              </ul>
            </div>
          </div>
        );

      } else if (this.state.pageuser) {
        return (
          <div className="userpage-profile group">
            <div className="userpage-avatar">
              <img src={this.state.pageuser.avatar_url}/>
            </div>
            <div className="userpage-user-info">
              <div className="username-and-edit">
                <h1 className="userpage-username">
                  {this.state.pageuser.username}
                </h1>
                <button className="userpage-following" onClick={this._toggleFollow}>
                  {following}
                </button>
              </div>
              <div className="name-and-bio">
                <h2 className="userpage-name">
                  {this.state.pageuser.name}
                </h2>
                <span className="userpage-bio">
                  {this.state.pageuser.bio}
                </span>
              </div>
              <ul className="userpage-stats">
                <li>{this.state.pageuser.photos.length + posts}</li>
                <li>{this.state.pageuser.followers.length + followers}</li>
                <li>{this.state.pageuser.following_users.length + " following"}</li>
              </ul>
            </div>
          </div>
        );
      } else {
        return (
          <div/>
        );
      }
    }

  });

})(this);
