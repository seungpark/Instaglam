(function(root){
  root.NewsFeed = React.createClass({

    mixins: [ReactRouter.History],

    // getInitialState: function () {
    //   return {photos: PhotoStore.all()};
    //   // var userId = parseInt(this.props.params.userId);
    //   // var user = this._findUserById(userId) || {} ;
    //   // return { user: user };
    // },

    // _photosChanged: function () {
    //   debugger
    //   this.setState({ photos: PhotoStore.all() });
    // },
    //
    componentDidMount: function() {
      window.scrollTo(0,0);
    },

    //
    // componentWillUnmount: function(){
    //   PhotoStore.removeChangeListener(this._photosChanged);
    // },
    //
    // <div className="edit-page">
    //   <a href={"/users/" +
    // </div>

    render: function() {
      var showMore;
      if (!this.props.end) {
        showMore = (
            <div className="show-more">
              <button onClick={this.props.morephotos}> More Photos! </button>
            </div>
        );
      }
      if (this.props.photos.length === 0 ) {
        return (
          <div className="newsfeed">
            <ul className="newsfeed-ul">
            <div className="post-new-photo">
              <a className="new-photo" href="/#/newphoto"/>
            </div>
            <div className="empty-feed">
              <p>Welcome to your Newsfeed!</p>
              <p>Post a Photo by clicking the button above!</p>
              <p>You are not following any users!</p>
              <p>Here are some users you can follow!</p>
              <p><a href="#/seung">seung</a></p>
              <p><a href="#/guest">guest</a></p>
              </div>
            </ul>
          </div>
        );
      } else {
        return (
          <div className="newsfeed">
            <ul className="newsfeed-ul">
            <div className="post-new-photo">
              <a className="new-photo" href="/#/newphoto"/>
            </div>
              {this.props.photos.map(function (photo) {
                return <IndexPhoto
                  key={photo.id}
                  photo={photo}
                  author={photo.user}
                  comments={photo.comments}
                  likes={photo.likes}
                  user={CurrentUserStore.currentUser()}
                  source={"newsfeed"}
                  followedUserIds={this.props.followedUserIds}
                  tags={photo.tags}
                  />;
              }.bind(this) )}

            </ul>
            {showMore}
          </div>
        );
      }

    }

  });
})(this);
