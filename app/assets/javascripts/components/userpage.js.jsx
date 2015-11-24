(function(root) {

  root.UserPage = React.createClass({

    mixins: [ReactRouter.History],

    getInitialState: function() {
      return { photos: [], user: null };
    },

    _photosChanged: function() {
      this.setState({ photos: PhotoStore.all() });
    },

    _fetchUserInfo: function(username){
      ApiUtil.fetchUserInfo(username, this._setUserInfo);
    },

    _setUserInfo: function(userinfo){
      this.setState({ user: userinfo });
    },

    componentWillMount: function() {
      PhotoStore.addChangeListener(this._photosChanged);
      ApiUtil.fetchUserPhotos(this.props.params.username);
    },

    componentDidMount: function() {
      this._fetchUserInfo(this.props.params.username);
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
            <UserPageProfile pageuser={this.state.user}/>
          </div>
          <div className="userpage-index">
            <UserPageIndex photos={this.state.photos}/>
          </div>
        </div>
      )
    }

  });
})(this);
