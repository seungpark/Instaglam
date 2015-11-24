(function(root) {
  root.PhotoLike = React.createClass ({

    mixins: [ReactRouter.History],

    componentWillMount: function () {
      this.setState({ liked: true })
    },

    render: function() {
      if (this.state.liked) {
        return (
          <div className="like-container">
            <div className="heart-image" onClick={this._handleHeartClick}>
              <img className="heart-liked" />LIKED
            </div>
            <div className="like-count">{this.state.liked}</div>
          </div>
        )
      } else
      return(
        <div className="like-container">
          <div className="heart-image" onClick={this._handleHeartClick}>
            <img className="heart-unliked" />NOT LIKED
          </div>
          <div className="like-count">{this.state.liked}</div>
        </div>
      );
    }

  });
})(this);
