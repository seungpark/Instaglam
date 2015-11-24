(function(root) {
  root.PhotoLike = React.createClass ({

    mixins: [ReactRouter.History],

    getInitialState: function() {
      return {liked: false, likeCount: this.props.likes.length};
    },

    componentWillMount: function () {
      var include = this.props.likes.find (function (like) {
        if (like.user_id === CurrentUserStore.currentUser().id) {
          return true;
        }
      });
      if (include) {
        this.setState({ liked: true });
      }
    },

    _addLike: function(e) {
      var data = {
        photo_id: this.props.photo.id,
        user_id: this.props.user.id
      };
      var callback = function () {
        this.setState({ liked: true, likeCount: this.state.likeCount + 1 });
      }.bind(this);
      if (this.props.source === "newsfeed") {
        ApiUtil.createLikeFromNewsfeed(data, callback);
      } else if (this.props.source === "userpage") {
        ApiUtil.createLikeFromUserpage(data, this.props.belongstouser, callback);
      }
    },


    _deleteLike: function(e) {
      var data = {
        photo_id: this.props.photo.id,
        user_id: this.props.user.id
      };
      var likeid = this.props.likes.find( function(like) {
        if(like.user_id === CurrentUserStore.currentUser().id) {
          return true;
        }
      }).id;
      var callback = function () {
        this.setState({ liked: false, likeCount: this.state.likeCount - 1 });
      }.bind(this);
      if (this.props.source === "newsfeed") {
        ApiUtil.deleteLikeFromNewsfeed(data, likeid, callback);
      } else if (this.props.source === "userpage") {
        ApiUtil.deleteLikeFromUserpage(data, likeid, this.props.belongstouser, callback);
      }

    },


    render: function() {
      if (this.state.liked) {
        return (
          <div className="like-container">
            <div className="heart-image" onClick={this._deleteLike}>
              <img className="heart-liked" />FILLED-HEART
            </div>
            <div className="like-count">{this.state.likeCount}</div>
          </div>
        )
      } else
      return(
        <div className="like-container">
          <div className="heart-image" onClick={this._addLike}>
            <img className="heart-unliked" />EMPTY-HEART
          </div>
          <div className="like-count">{this.state.likeCount}</div>
        </div>
      );
    }

  });
})(this);
