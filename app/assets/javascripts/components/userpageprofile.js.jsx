(function(root) {

  root.UserPageProfile = React.createClass ({

    mixins: [ReactRouter.History],

    render: function() {
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
            <div className="username-and-edit">
              <h1 className="userpage-username">
                {this.props.pageuser.username}
              </h1>
              <ReactRouter.Link to={"/editprofile"}>{"Edit Profile"}
              </ReactRouter.Link>
            </div>
            <div className="name-and-bio">
              <h2 className="userpage-name">
                {this.props.pageuser.name}
              </h2>
              <span className="userpage-bio">
                {this.props.pageuser.bio}
              </span>
            </div>
            <ul className="userpage-stats">
              <li>{this.props.pageuser.photos.length + posts}</li>
            </ul>
          </div>
        );

      } else if (this.props.pageuser) {
        return (
          <div className="userpage-profile">
            <div className="userpage-avatar">
              <img src={this.props.pageuser.avatar_url}/>
            </div>
            <div className="username-and-edit">
              <h1 className="userpage-username">
                {this.props.pageuser.username}
              </h1>
            </div>
            <div className="name-and-bio">
              <h2 className="userpage-name">
                {this.props.pageuser.name}
              </h2>
              <span className="userpage-bio">
                {this.props.pageuser.bio}
              </span>
            </div>
            <ul className="userpage-stats">
              <li>{this.props.pageuser.photos.length + posts}</li>
            </ul>
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
