(function(root){
  root.IndexPhoto = React.createClass({

    mixins: [ReactRouter.History],

    getInitialState: function() {
      return {age: this._getPhotoAge() };
    },

    _getPhotoAge: function() {
      var createTime = Date.parse(this.props.photo.created_at),
          timeNow = Date.now(),
          secPassed = parseInt((timeNow - createTime) / 1000),
          minPassed = parseInt(secPassed / 60),
          hrPassed = parseInt(minPassed / 60),
          dayPassed = parseInt(hrPassed / 24),
          wkPassed = parseInt(dayPassed / 7);
      if (wkPassed >= 1) {
        return (wkPassed + "w");
      } else if (dayPassed >= 1) {
        return (dayPassed + "d");
      } else if (hrPassed >= 1) {
        return (hrPassed + "h");
      } else if (minPassed >= 1) {
        return (minPassed + "m");
      } else {
        return (secPassed + "s");
      }
    },

    _imageload: function (e) {
      debugger
      $(".loading" + "#" + this.props.photo.id).addClass("hide");
    },

    render: function() {
      return (
        <div className="photo-item" key={this.props.photo.id}>
          <div className="photo-header">
            <div className="photo-user-avatar">
              <img src={this.props.photo.author_avatar_url}/>
            </div>
            <div className="photo-user-link">
              <ReactRouter.Link to={"/" + this.props.photo.user.username}>
                {this.props.photo.user.username}
              </ReactRouter.Link>
            </div>
            <div className="photo-title">
              <a href={"/#/photos/" + this.props.photo.id}> {this.props.photo.title} </a>
            </div>
            <div className="photo-age">{this.state.age}</div>
          </div>
          <div className="photograph-container">
            <a href={"/#/photos/" + this.props.photo.id}>
              <div className="loading" id={this.props.photo.id}>
                <img className="loading" src={assets.loading} />
              </div>
              <img className="photograph" src={this.props.photo.image_url} onLoad={this._imageload}/>
            </a>
          </div>
          <PhotoLike
              photo={this.props.photo}
              key={this.props.photo.id}
              likes={this.props.photo.likes}
              user={CurrentUserStore.currentUser()}
              source={this.props.source}
              followedUserIds={this.props.followedUserIds}
              tagid={this.props.tagid}
            />
          <div className="photo-caption">
            <ReactRouter.Link to={"/" + this.props.photo.user.username}>
              {this.props.photo.user.username}
            </ReactRouter.Link>
            {"    " + this.props.photo.caption}
          </div>
          <PhotoTags
            photo={this.props.photo}
            source={this.props.source}
            followedUserIds={this.props.followedUserIds}
            tags={this.props.tags}
          />
          <div className="photo-comments">
            <PhotoComment
              photo={this.props.photo}
              key={this.props.photo.id}
              comments={this.props.photo.comments}
              user={CurrentUserStore.currentUser()}
              source={this.props.source}
              followedUserIds={this.props.followedUserIds}
              tagid={this.props.tagid}
           /> </div>
           <div className="submit-comment">
            <CommentForm
              photo={this.props.photo}
              key={this.props.photo.id}
              user={CurrentUserStore.currentUser()}
              source={this.props.source}
              followedUserIds={this.props.followedUserIds}
              tagid={this.props.tagid}
          /> </div>
        </div>
      );

    }

  });
})(this);
