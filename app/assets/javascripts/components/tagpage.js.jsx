(function(root){

  root.TagPage = React.createClass({

    getInitialState: function() {
      return({
        photos: PhotoStore.all(),
        tagid: parseInt(this.props.location.pathname.slice(6))
      });
    },

    _photosChanged: function() {
      this.setState({ photos: PhotoStore.all() });
    },

    componentWillMount: function() {
      PhotoStore.addChangeListener(this._photosChanged);
      ApiUtil.fetchPhotosForTag(this.state.tagid);
    },

    componentWillUnmount: function() {
      PhotoStore.removeChangeListener(this._photosChanged);
    },

    render: function() {
      return(
        <div className="newsfeed">
          <ul className="newsfeed-ul">
            {this.state.photos.map(function (photo) {
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
        </div>
      );

    }

  });

})(this);
