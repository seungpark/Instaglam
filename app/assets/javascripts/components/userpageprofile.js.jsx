(function(root) {

  root.UserPageProfile = React.createClass ({

    mixins: [ReactRouter.History],

    render: function() {
      debugger
      var posts;
      if (this.props.pageuser && this.props.pageuser.photos.length === 1) {
        posts = " post";
      } else {
        posts = " posts";
      }
      if (this.props.pageuser && this.props.pageuser.id === CurrentUserStore.currentUser().id) {
        return (
          <div className="userpage-profile">
            <div className="userpage-avatar">
              <img src={this.props.pageuser.avatar_url}/>
            </div>
            <div className="userpage-username">
              {this.props.pageuser.username}
            </div>
            <div className="userpage-edit-button">
              <ReactRouter.Link to={"/editprofile"}>{"Edit Profile"}
              </ReactRouter.Link>
            </div>
            <div className="userpage-name">
              {this.props.pageuser.name}
            </div>
            <div className="userpage-bio">
              {this.props.pageuser.bio}
            </div>
            <div className="userpage-photo-count">
              {this.props.pageuser.photos.length + posts}
            </div>
          </div>
        );

      } else if (this.props.pageuser) {
        return (
          <div className="userpage-profile">
            <div className="userpage-avatar">
              <img src={this.props.pageuser.avatar_url}/>
            </div>
            <div className="userpage-username">
              {this.props.pageuser.username}
            </div>
            <div className="userpage-name">
              {this.props.pageuser.name}
            </div>
            <div className="userpage-bio">
              {this.props.pageuser.bio}
            </div>
            <div className="userpage-photo-count">
              {this.props.pageuser.photos.length + posts}
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
