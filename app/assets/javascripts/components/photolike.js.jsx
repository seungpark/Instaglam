(function(root) {
  root.PhotoLike = React.createClass ({

    getInitialState: function() {
      return { likes: [] };
    },

    componentWillMount: function () {
      LikeStore.addChangeListener(this._likesChanged);
      ApiUtil.fetchLikes(this.props.photo.id);
    },

    _likesChanged: function() {
      this.setState({ likes: LikeStore.all() });
    },

    _handleHeartClick: function(e) {
      e.preventDefault();

      ApiUtil.receiveLike(this.props.photo.id, currentUserStore.currentUser().id);
    },

    render: function() {
      debugger
      return(
        <div className="like-container">
          <div className="heart-image" onClick={this._handleHeartClick}>
            <img className="heart" />
          </div>
          <div className="like-count">{this.state.likes.length}</div>
        </div>
      );
    }

  });
})(this);
