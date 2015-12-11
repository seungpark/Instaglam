(function(root) {

  root.UserPage = React.createClass({

    mixins: [ReactRouter.History],

    getInitialState: function() {
      return {
        photos: [],
        user: null,
        view: "grid",
        page: 1,
        load: false,
        end: false
      };
    },

    _morePhotos: function() {
      var newPageNum = this.state.page + 1;

      ApiUtil.fetchNextPhotosForUserPage(
        this.state.user.username,
        newPageNum,
        function () {this.setState({load: true, page: newPageNum});}.bind(this),
        function () {this.setState({end: true});}.bind(this)
      );
    },

    _handleScroll: function () {
      if ((window.innerHeight + window.scrollY  >= document.body.offsetHeight) &&
          this.state.load && !this.state.end) {

        var newPageNum = this.state.page + 1;
        ApiUtil.fetchNextPhotosForUserPage(
          this.state.user.username,
          newPageNum,
          function () {this.setState({page: newPageNum});}.bind(this),
          function () {this.setState({end: true});}.bind(this)
        );

      }
    },

    _photosChanged: function() {
      this.setState({ photos: PhotoStore.all() });
    },

    _fetchUserInfo: function(username){
      ApiUtil.fetchUserInfo(username, this._setUserInfo);
    },

    _setUserInfo: function(userinfo){
      this.setState({ user: userinfo });
      this._changeToGrid();
      window.scrollTo(0,0);
    },

    _changeToGrid: function() {
      if (this.state.view === "list") {
        this.setState({ view: "grid" });
        document.getElementsByClassName("active-icon")[0].setAttribute("class", "list-icon");
        document.getElementsByClassName("grid-icon")[0].setAttribute("class", "active-icon");
      }
    },

    _changeToList: function() {
      if (this.state.view === "grid") {
        this.setState({ view: "list" });
        document.getElementsByClassName("active-icon")[0].setAttribute("class", "grid-icon");
        document.getElementsByClassName("list-icon")[0].setAttribute("class", "active-icon");
      }
    },

    componentWillMount: function() {
      window.addEventListener('scroll', this._handleScroll);
      PhotoStore.addChangeListener(this._photosChanged);
      ApiUtil.fetchUserPhotos(
        this.props.params.username,
        1,
        function () {
          this.setState({end: true});
        }.bind(this)
      );
    },

    componentDidMount: function() {
      this._fetchUserInfo(this.props.params.username);
    },

    componentWillUnmount: function(){
      PhotoStore.removeChangeListener(this._photosChanged);
      window.removeEventListener('scroll', this._handleScroll);
    },

    componentWillReceiveProps: function(newProps) {
      var username = newProps.params.username;
      ApiUtil.fetchUserPhotos(
        username,
        1,
        function () {
          this.setState({end: true});
        }.bind(this)
      );
      ApiUtil.fetchUserInfo(username, this._setUserInfo);
      this.setState({
        page: 1,
        load: false,
        end: false
      });
    },

    // _getNewUser: function(user) {
    //   this.setState({ user: user });
    // },

//need to feed prop to UserPageProfile
//currentUser={CurrentUserStore.currentUser}

    render: function() {
      var showMore;
      if (!this.state.end) {
        showMore = (
            <div className="show-more">
              <button onClick={this._morePhotos}> More Photos! </button>
            </div>
        );
      }
      if (this.state.view === "list") {
        return(
          <div className="userpage">
            <UserPageProfile pageuser={this.state.user}/>
            <div className="viewing-options">
              <input type="image" className="active-icon" src={assets.gridview_icon} onClick={this._changeToGrid}></input>
              <input type="image" className="list-icon" src={assets.listview_icon} onClick={this._changeToList}></input>
            </div>
            <UserPageIndex photos={this.state.photos}/>
            {showMore}
          </div>
        );
      } else if (this.state.view === "grid") {
        return (
          <div className="userpage">
            <UserPageProfile pageuser={this.state.user}/>
            <div className="viewing-options">
              <input type="image" className="active-icon" src={assets.gridview_icon} onClick={this._changeToGrid}></input>
              <input type="image" className="list-icon" src={assets.listview_icon} onClick={this._changeToList}></input>
            </div>
            <UserPageGrid photos={this.state.photos}/>
            {showMore}
          </div>
        );
      }
    }

  });
})(this);
