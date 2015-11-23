(function(root) {
  root.PhotoLike = React.createClass ({

    mixins: [ReactRouter.History],
    me: function () {
      return CurrentUserStore.currentUser();
    },

    getInitialState: function() {
      return { likes: this.props.photo.likes, liked: false };
    },

    componentWillMount: function () {
      debugger
      LikeStore.addChangeListener(this._likedChanged)
    },

    _likedChanged: function() {var liked = this.props.photo.likes.find(function (like) {
      if (like.user_id === this.me().id) {
        return true;
      }
    }.bind(this));

    this.setState({ liked: !!liked });
    },

    _handleHeartClick: function(e) {
      e.preventDefault();
        debugger
      if (this.state.liked) {
        //if photo is liked
        ApiUtil.deleteLike(this.props.photo.id, this.me().id);
      } else {
        ApiUtil.createLike(this.props.photo.id, this.me().id);
      }
      this.setState({ liked: !this.state.liked });
    },

    render: function() {
      if (this.state.liked) {
        return (
          <div className="like-container">
            <div className="heart-image" onClick={this._handleHeartClick}>
              <img className="heart-liked" />LIKED
            </div>
            <div className="like-count">{this.state.likes.length}</div>
          </div>
        )
      } else
      return(
        <div className="like-container">
          <div className="heart-image" onClick={this._handleHeartClick}>
            <img className="heart-unliked" />NOT LIKED
          </div>
          <div className="like-count">{this.state.likes.length}</div>
        </div>
      );
    }

  });
})(this);
