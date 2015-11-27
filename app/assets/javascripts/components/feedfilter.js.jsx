(function(root){

  root.FeedFilter = React.createClass({

    mixins: [ReactRouter.History],

    _photosChanged: function(){
      this.setState({photos: PhotoStore.all() });
    },


    getInitialState: function(){
      return { photos: PhotoStore.all() };
    },

    componentWillReceiveProps: function(newProps) {
      this.setState({ photos: PhotoStore.all() });
    },

    componentWillMount: function(){
      debugger
      PhotoStore.addChangeListener(this._photosChanged);
      if (CurrentUserStore.currentUser() &&
          CurrentUserStore.currentUser().following_users) {
        var followedUserIds = CurrentUserStore.currentUser().following_users
                  .map(function (following_user) {
                    return following_user.id;
                  });
        ApiUtil.fetchPhotosForFeed(followedUserIds);
      }
    },

    componentWillUnmount: function(){
      PhotoStore.removeChangeListener(this._photosChanged);
    },

    render: function(){
      return(
      <div>
        <NewsFeed photos={this.state.photos} history={this.history} />
      </div>
      );
    }
  });
})(this);
