var NewsFeed = React.createClass({

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
    return (
      <div className="newsfeed-container">
        <ul className="newsfeed-ul">
          {this.state.photos.map(function (photo) {
            return (
              <ul className="newsfeed-item" key={photo.id} data-photoid={photo.id}>
                <li className="photo-title">{photo.title}</li>
                <li className="photo-caption">{photo.caption}</li>
                <li className="photo-user">{photo.user}</li>
              </ul>
            )
          }.bind(this) )}

        </ul>
      </div>
    );

  }

});
