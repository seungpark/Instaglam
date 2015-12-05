(function(root){

  root.TagPage = React.createClass({

    getInitialState: function() {
      return({
        photos: PhotoStore.all(),
        tagid: parseInt(this.props.location.pathname.slice(6))
      });
    },

    _photosChanged: function() {
      window.scrollTo(0,0);
      this.setState({ photos: PhotoStore.all() });
    },

    componentWillMount: function() {
      PhotoStore.addChangeListener(this._photosChanged);
      ApiUtil.fetchPhotosForTag(this.state.tagid);
    },

    componentWillUnmount: function() {
      PhotoStore.removeChangeListener(this._photosChanged);
    },

    componentWillReceiveProps: function(newProps) {
      this.setState({tagid: parseInt(newProps.location.pathname.slice(6)) });
      ApiUtil.fetchPhotosForTag(parseInt(newProps.location.pathname.slice(6)));
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
                source={"tagpage"}
                followedUserIds={this.props.followedUserIds}
                tags={photo.tags}
                tagid={parseInt(this.props.location.pathname.slice(6))}
                />;
            }.bind(this) )}

          </ul>
        </div>
      );

    }

  });

})(this);
