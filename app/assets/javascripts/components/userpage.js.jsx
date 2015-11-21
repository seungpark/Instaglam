(function(root) {

  root.UserPage = React.createClass({

    getInitialState: function() {
      return {photos: []};
    },

    _photosChanged: function() {
      this.setState({ photos: PhotoStore.all() });
    },

    componentWillMount: function() {
      PhotoStore.addChangeListener(this._photosChanged);
      var username = this.props.params.username;
      ApiUtil.fetchUserPhotos(username);
    },

    componentWillUnmount: function(){
      PhotoStore.removeChangeListener(this._photosChanged);
    },

    componentWillReceiveProps: function(newProps) {

      PhotoStore.addChangeListener(this._photosChanged);
      var username = newProps.params.username;
      ApiUtil.fetchUserPhotos(username);
    },

//need to feed prop to UserPageProfile
//currentUser={CurrentUserStore.currentUser}

    render: function() {

      return(
        <div className="userpage">
          <div className="userpage-profile-container">
            <UserPageProfile />
          </div>
          <div className="userpage-index">
            <UserPageIndex photos={this.state.photos}/>
          </div>
        </div>
      )
    }

  });
})(this);
