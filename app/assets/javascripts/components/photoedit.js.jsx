(function(root) {

  root.PhotoEdit = React.createClass({

    mixins: [ReactRouter.History],

    getInitialState: function () {
      return ({
        photoid: parseInt(this.props.routeParams.photoid),
        photo: null,
        title: "",
        caption: "",
        tags: "",
        source: "photopage",
        editing: false,
        edited: false,
        deleting: false,
        deleted: false
      });
    },

    _updatePhoto: function() {
      if (PhotoStore.details()) {
        this.setState({
          photo: PhotoStore.details(),
          title: PhotoStore.details().title,
          caption: PhotoStore.details().caption,
          tags: PhotoStore.details().tags.map( function(tag){
            return tag.name;
          }).join(", ")
        });
      }
    },

    componentWillMount: function() {
      PhotoStore.addChangeListener(this._updatePhoto);
      ApiUtil.getPhotoDetails(this.state.photoid, this._updatePhoto);
    },

    componentWillUnmount: function () {
      PhotoStore.removeChangeListener(this._updatePhoto);
    },

    _changeTitle: function (e) {
      e.preventDefault();
      this.setState({ title: e.currentTarget.value });
    },

    _changeCaption: function (e) {
      e.preventDefault();
      this.setState({ caption: e.currentTarget.value });
    },

    _changeTags: function (e) {
      e.preventDefault();
      this.setState({ tags: e.currentTarget.value });
    },

    _submitChanges: function(e) {
      this.setState({editing: true});
      e.preventDefault();
      var form = $(e.currentTarget).serializeJSON();
      form.tags = form.tags.split(", ");

      ApiUtil.editPhoto(this.state.photoid, form, this._resetForm);

    },

    _resetForm: function () {
      this.setState({
        editing: false,
        edited: true,
      });
    },

    _startDelete: function (e) {
      e.preventDefault();
      this.setState({ deleting: true });
    },

    _completeDelete: function () {
      this.setState({deleted: true});
    },

    _deletePhoto: function(e) {
      e.preventDefault();
      ApiUtil.deletePhoto(this.state.photoid, this._completeDelete);
    },

    render: function() {
      if (this.state.photo) {

        if (this.state.photo.user_id !== CurrentUserStore.currentUser().id) {
          return (
            <div className="photo-page">
            <h1>You are not the owner of this photo</h1>
            </div>
          );
        } else if (this.state.deleted) {
          return (
            <div className="photo-page">
              <img className="loading" src={assets.uploaded_image}/>
              PHOTO DELETED!
              <a href={"/#/" + CurrentUserStore.currentUser().username}> Back to Your Site! </a>
            </div>
          );
        }

        var editIcon = "";
        if (this.state.editing){
          editIcon = assets.uploading_image;
        } else if (this.state.edited) {
          editIcon = assets.uploaded_image;
        }

        var deleting = "";
        if (this.state.deleting){
          deleting = <div><button className="delete-button" onClick={this._deletePhoto } > CONFIRM DELETE </button></div>;
        }

        var commentsList = this.state.photo.comments.map( function(comment){
          return({ user: comment.user.username, body: comment.body });
        });

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
            <img className="loading" src={editIcon}/>
              <form className="edit-photo-form" onSubmit={this._submitChanges}>
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
                  <input name = "title" className="photo-title" onChange={this._changeTitle} value={this.state.title} />
                </div>
                <div className="photo-age">{age}</div>
              </div>
              <div className="delete-button">
                <button onClick={this._startDelete}>DELETE</button>
                {deleting}
              </div>
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
                <input name="caption" className="photo-caption" onChange={this._changeCaption} value={this.state.caption} />
              </div>
              <div className="tag-edit">
                <h3>Tags</h3>
                <input name="tags" className="photo-tags" onChange={this._changeTags} value={this.state.tags} />
              </div>
              <div className="photo-comments">
                <PhotoComment
                  photo={this.state.photo}
                  key={this.state.photo.id}
                  comments={this.state.photo.comments}
                  user="edit-button"
                  source={this.state.source}
                  followedUserIds={this.state.followedUserIds}
                /> </div>
                <div className="submit-edits">
                  <button className="submit-button">
                    Submit Changes
                  </button>
                </div>
                </form>
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
