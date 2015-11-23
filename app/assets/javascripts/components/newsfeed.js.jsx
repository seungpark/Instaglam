(function(root){
  root.NewsFeed = React.createClass({

    mixins: [ReactRouter.History],

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
    //
    // <div className="edit-page">
    //   <a href={"/users/" +
    // </div>

    render: function() {
      return (

        <div className="newsfeed">
          <ul className="newsfeed-ul">
            {this.state.photos.map(function (photo) {
              debugger
              return <IndexPhoto
                photo={photo}
                key={photo.id} />
            }.bind(this) )}

          </ul>
        </div>
      );

    }

  });
})(this);
