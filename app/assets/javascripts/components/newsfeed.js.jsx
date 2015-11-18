(function(root){
  root.NewsFeed = React.createClass({

    getInitialState: function () {
      return {photos: PhotoStore.all()};
      // var userId = parseInt(this.props.params.userId);
      // var user = this._findUserById(userId) || {} ;
      // return { user: user };
    },

    _photosChanged: function () {
      this.setState({ photos: PhotoStore.all() });
    },

    componentDidMount: function() {
      PhotoStore.addChangeListener(this._photosChanged);
      ApiUtil.fetchPhotos();
    },

    render: function() {
      debugger;
      return (
        <div className="newsfeed-container">
          <ul className="newsfeed-ul">
            {this.state.photos.map(function (photo) {
              return <NewsFeedItem
                photo={photo}
                key={photo.id} />
            }.bind(this) )}

          </ul>
        </div>
      );

    }

  });
})(this);
