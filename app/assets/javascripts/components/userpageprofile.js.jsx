(function(root) {

  root.UserPageProfile = React.createClass ({

    mixins: [ReactRouter.History],

    getInitialState: function() {
      return { pageuser: this.props.pageuser };
    },

    componentWillReceiveProps: function(newProps) {
      this.setState({ pageuser: newProps.pageuser });
    },

    render: function() {
      var posts;
      if (this.state.pageuser && this.state.pageuser.photos.length === 1) {
        posts = " post";
      } else {
        posts = " posts";
      }
      if (this.state.pageuser && this.state.pageuser.id === CurrentUserStore.currentUser().id) {
        return (
          <div className="userpage-profile">
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
              </ul>
            </div>
          </div>
        );

      } else if (this.state.pageuser) {
        return (
          <div className="userpage-profile">
            <div className="userpage-avatar">
              <img src={this.state.pageuser.avatar_url}/>
            </div>
            <div className="userpage-user-info">
              <div className="username-and-edit">
                <h1 className="userpage-username">
                  {this.state.pageuser.username}
                </h1>
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
