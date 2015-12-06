(function(root){

  root.TagPage = React.createClass({

    getInitialState: function() {
      return({
        photos: PhotoStore.all(),
        tagid: parseInt(this.props.location.pathname.slice(6)),
        tagname: ""
      });
    },

    _photosChanged: function() {
      this.setState({
        photos: PhotoStore.all(),
        tagname: PhotoStore.all()[0].tags.find(function(tag) {
          if (tag.id === this.state.tagid) {
            return tag;
          }
        }.bind(this)).name
      });
    },

    componentWillMount: function() {
      window.scrollTo(0,0);
      PhotoStore.addChangeListener(this._photosChanged);
      ApiUtil.fetchPhotosForTag(this.state.tagid);
    },

    componentWillUnmount: function() {
      PhotoStore.removeChangeListener(this._photosChanged);
    },

    componentWillReceiveProps: function(newProps) {
      this.setState({tagid: parseInt(newProps.location.pathname.slice(6)) });
      ApiUtil.fetchPhotosForTag(parseInt(newProps.location.pathname.slice(6)));
      window.scrollTo(0,0);
    },

    render: function() {
      return(
        <div className="tagpage">
          <ul className="tagpage-ul">
            <li className="tagpage-header">
              <h1 className="tagpage-header">{"#" + this.state.tagname}</h1>
            </li>
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
