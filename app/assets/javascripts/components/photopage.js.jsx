(function(root) {

  root.PhotoPage = React.createClass({

    getInitialState: function() {
      return({
        photoId: parseInt(this.props.location.pathname.slice(8)),
        photo: null,
        source: "photopage"
      });
    },

    _getPhotoAge: function() {

    },

    _updatePhoto: function() {
        this.setState({ photo: PhotoStore.details() });
    },

    componentWillMount: function() {
      PhotoStore.addChangeListener(this._updatePhoto);
      ApiUtil.getPhotoDetails(this.state.photoId, this._updatePhoto);
    },

    render: function () {
      if (this.state.photo) {
        var editButton = <div></div>;
        if (this.state.photo.user_id === CurrentUserStore.currentUser().id){
          editButton =
            <div className="edit-button">
              <a href={"/#/photos/" + this.state.photoId + "/edit"}>Edit Photo</a>
            </div>
            ;
        }

        var createTime = Date.parse(this.state.photo.created_at),
            timeNow = Date.now(),
            secPassed = parseInt((timeNow - createTime) / 1000),
            minPassed = parseInt(secPassed / 60),
            hrPassed = parseInt(minPassed / 60),
            dayPassed = parseInt(hrPassed / 24),
            wkPassed = parseInt(dayPassed / 7),
            age = "";
        if (wkPassed >= 1) {
          age = (wkPassed + "w");
        } else if (dayPassed >= 1) {
          age = (dayPassed + "d");
        } else if (hrPassed >= 1) {
          age = (hrPassed + "h");
        } else if (minPassed >= 1) {
          age = (minPassed + "m");
        } else {
          age = (secPassed + "s");
        }

        return (
          <div className="photo-page">
            <div className="photo-item">
              <div className="photo-header">
                <div className="photo-user-avatar">
                  <img src={this.state.photo.author_avatar_url}/>
                </div>
                <div className="photo-user-link">
                  <ReactRouter.Link to={"/" + this.state.photo.user.username}>
                    {this.state.photo.user.username}
                  </ReactRouter.Link>
                </div>
                <div className="photo-title">
                  <a href={"/#/photos/" + this.state.photo.id}> {this.state.photo.title} </a>
                </div>
                <div className="photo-age">{age}</div>
              </div>
              {editButton}
              <div className="photograph-container">
                <a href={"/#/photos/" + this.state.photo.id}>
                  <img className="photograph" src={this.state.photo.image_url}/>
                </a>
              </div>
              <PhotoLike
                  photo={this.state.photo}
                  key={this.state.photo.id}
                  likes={this.state.photo.likes}
                  user={CurrentUserStore.currentUser()}
                  source={this.state.source}
                  followedUserIds={this.state.followedUserIds}
                />
              <div className="photo-caption">
                <ReactRouter.Link to={"/" + this.state.photo.user.username}>
                  {this.state.photo.user.username}
                </ReactRouter.Link>
                {"    " + this.state.photo.caption}
              </div>
              <PhotoTags
                photo={this.state.photo}
                source={this.state.source}
                followedUserIds={this.state.followedUserIds}
                tags={this.state.photo.tags}
              />
              <div className="photo-comments">
                <PhotoComment
                  photo={this.state.photo}
                  key={this.state.photo.id}
                  comments={this.state.photo.comments}
                  user={CurrentUserStore.currentUser()}
                  source={this.state.source}
                  followedUserIds={this.state.followedUserIds}
               /> </div>
               <div className="submit-comment">
                <CommentForm
                  photo={this.state.photo}
                  key={this.state.photo.id}
                  user={CurrentUserStore.currentUser()}
                  source={this.state.source}
                  followedUserIds={this.state.followedUserIds}
              /> </div>
            </div>
          </div>
        );
      } else {
        return (
          <div/>
        );
      }
    }

  });

})(this);
