(function(root) {
  root.PhotoLike = React.createClass ({

    mixins: [ReactRouter.History],

    getInitialState: function() {
      return { likes: [] };
    },

    componentWillMount: function () {
      debugger
      ApiUtil.fetchLikes(this.props.photo.id);
      LikeStore.addChangeListener(this._likesChanged);
      debugger
      //goes to render once before going to ApiUtil.fetchLikes
    },

    _likesChanged: function() {
      this.setState({ likes: LikeStore.all() });
      debugger
    },

    _handleHeartClick: function(e) {
      e.preventDefault();

      ApiUtil.createLike(this.props.photo.id, CurrentUserStore.currentUser().id);
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
