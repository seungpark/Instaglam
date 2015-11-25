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

    render: function() {
      return (
        <ul className="photo-item" key={this.props.photo.id}>
          <div className="photo-header">
            <li className="photo-user-avatar">
              <img src={this.props.photo.author_avatar_url}/>
            </li>
            <li className="photo-user-link">
              <ReactRouter.Link to={"/" + this.props.photo.user.username}>
                {this.props.photo.user.username}
              </ReactRouter.Link>
            </li>
            <li className="photo-title">{this.props.photo.title}</li>
            <li className="photo-age">{this.state.age}</li>
          </div>
          <div className="photograph-container">
            <img className="photograph" src={this.props.photo.image_url}/>
          </div>
          <li className="photo-caption">{this.props.photo.caption}</li>
          <li className="photo-like"> <PhotoLike
              photo={this.props.photo}
              key={this.props.photo.id}
              likes={this.props.photo.likes}
              user={CurrentUserStore.currentUser()}
              source={this.props.source}
              belongstouser={this.props.belongstouser}
            /> </li>
          <li className="photo-comments">
            <PhotoComment
              photo={this.props.photo}
              key={this.props.photo.id}
              comments={this.props.photo.comments}
              user={CurrentUserStore.currentUser()}
              source={this.props.source}
              belongstouser={this.props.belongstouser}
           /> </li>
           <li className="submit-comment">
            <CommentForm
              photo={this.props.photo}
              key={this.props.photo.id}
              user={CurrentUserStore.currentUser()}
              source={this.props.source}
          /> </li>
        </ul>
      )

    }

  });
})(this);
