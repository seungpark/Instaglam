(function(root) {

  root.UserPageProfile = React.createClass ({

    mixins: [ReactRouter.History],

    render: function() {
      if (this.props.pageuser && this.props.pageuser.id === CurrentUserStore.currentUser().id) {
        return (
          <div className="userpage-profile">
            <div className="userpage-username">
              {this.props.pageuser.username}
            </div>
            <div className="userpage-edit-button">
              <ReactRouter.Link to={"/editprofile"}>{"Edit Profile"}
              </ReactRouter.Link>
            </div>
            <div className="userpage-avatar">
              <img src={this.props.pageuser.avatar_url}/>
            </div>
            <div className="userpage-bio">
              <a href="#">hi</a>
            </div>
          </div>
        );

      } else {
        return (
          <div className="userpage-profile">
            <div className="userpage-avatar">
              <a href="#">hi</a>
            </div>
            <div className="userpage-bio">
              <a href="#">hi</a>
            </div>
          </div>
        );
      }
    }

  });

})(this);
