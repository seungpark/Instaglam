(function(root) {

  root.UserPage = React.createClass({

    mixins: [ReactRouter.History],

    getInitialState: function() {
      return { photos: [], user: null, view: "grid"};
    },

    _photosChanged: function() {
      this.setState({ photos: PhotoStore.all() });
    },

    _fetchUserInfo: function(username){
      ApiUtil.fetchUserInfo(username, this._setUserInfo);
    },

    _setUserInfo: function(userinfo){
      this.setState({ user: userinfo });
      window.scrollTo(0,0);
    },

    _changeToGrid: function() {
      if (this.state.view === "list") {
        this.setState({ view: "grid" });
      }
    },

    _changeToList: function() {
      if (this.state.view === "grid") {
        this.setState({ view: "list" });
      }
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
      ApiUtil.fetchUserInfo(username, this._setUserInfo);
    },

    // _getNewUser: function(user) {
    //   this.setState({ user: user });
    // },

//need to feed prop to UserPageProfile
//currentUser={CurrentUserStore.currentUser}

    render: function() {
      if (this.state.view === "list") {
        return(
          <div className="userpage">
            <UserPageProfile pageuser={this.state.user}/>
            <div className="viewing-options">
              <input type="image" src={assets.gridview_icon} onClick={this._changeToGrid}></input>
              <input type="image" src={assets.listview_icon} onClick={this._changeToList}></input>
            </div>
            <UserPageIndex photos={this.state.photos}/>
          </div>
        );
      } else if (this.state.view === "grid") {
        return (
          <div className="userpage">
            <UserPageProfile pageuser={this.state.user}/>
            <div className="viewing-options">
              <input type="image" src={assets.gridview_icon} onClick={this._changeToGrid}></input>
              <input type="image" src={assets.listview_icon} onClick={this._changeToList}></input>
            </div>
            <UserPageGrid photos={this.state.photos}/>
          </div>
        );
      }
    }

  });
})(this);
