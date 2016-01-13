(function(root){

  root.FeedFilter = React.createClass({

    mixins: [ReactRouter.History],

    _photosChanged: function(){
      this.setState({
        photos: PhotoStore.all(),
        receivedphotos: true
      });
    },

    _handleScroll: function () {
      if ((window.outerHeight + window.scrollY + 20 >= document.body.offsetHeight) &&
          this.state.load && !this.state.end) {

        var newPageNum = this.state.page + 1;
        ApiUtil.fetchNextPhotosForFeed(
          this.state.followedUserIds,
          newPageNum,
          function () {this.setState({page: newPageNum});}.bind(this),
          function () {this.setState({end: true});}.bind(this)
        );

      }
    },

    fetchMorePhotos: function(e) {
      var newPageNum = this.state.page + 1;

      ApiUtil.fetchNextPhotosForFeed(
        this.state.followedUserIds,
        newPageNum,
        function () {this.setState({load: true, page: newPageNum});}.bind(this),
        function () {this.setState({end: true});}.bind(this)
      );
    },

    getInitialState: function(){
      return {
        photos: PhotoStore.all(),
        followedUserIds: null,
        page: 1,
        load: false,
        end: false,
        receivedphotos: false
      };
    },

    componentWillReceiveProps: function(newProps) {
      this.setState({ photos: PhotoStore.all() });
    },

    componentWillMount: function(){
      PhotoStore.addChangeListener(this._photosChanged);
      window.addEventListener('scroll', this._handleScroll);
      if (CurrentUserStore.currentUser() &&
          CurrentUserStore.currentUser().following_users) {
        var followedUserIds = CurrentUserStore.currentUser().following_users
                  .map(function (following_user) {
                    return following_user.id;
                  });
        this.setState({followedUserIds: followedUserIds });
        ApiUtil.fetchPhotosForFeed(followedUserIds, 1);
      }
    },

    componentWillUnmount: function(){
      PhotoStore.removeChangeListener(this._photosChanged);
      window.removeEventListener('scroll', this._handleScroll);
    },

    render: function(){
      if (this.state.receivedphotos) {
        return(
        <div className="feed-filter">
          <NewsFeed
            photos={this.state.photos}
            history={this.history}
            followedUserIds={this.state.followedUserIds}
            scroll = {this._handleScroll()}
            morephotos = {this.fetchMorePhotos}
            page = {this.state.page}
            load = {this.state.load}
            end = {this.state.end}
          />
        </div>
        );
      } else {
        return (
          <div className="loading-page">
            <div className="loading-page-background"/>
            <img src={assets.loading.gif}/>
            <p>Loading your NewsFeed...</p>
          </div>
        );
      }
    }
  });
})(this);
