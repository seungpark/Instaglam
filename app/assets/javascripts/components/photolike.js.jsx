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
      e.preventDefault();
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
        ApiUtil.createLikeFromUserpage(data, this.props.photo.user.username, callback);
      }
    },


    _deleteLike: function(e) {
      e.preventDefault();
      // var data = {
      //   photo_id: this.props.photo.id,
      //   user_id: this.props.user.id
      // };
      var like = this.props.likes.find( function(like) {
        if (like.user_id === CurrentUserStore.currentUser().id) {
          return true;
        }
      });

      if (like) {var likeid = like.id;}

      var callback = function () {
        this.setState({ liked: false, likeCount: this.state.likeCount - 1 });
      }.bind(this);
      if (this.props.source === "newsfeed") {
        ApiUtil.deleteLikeFromNewsfeed(likeid, callback);
      } else if (this.props.source === "userpage") {
        ApiUtil.deleteLikeFromUserpage(likeid, this.props.photo.user.username, callback);
      }

    },


    render: function() {
      if (this.state.liked) {
        return (
          <div className="like-container">
            <div className="heart-image" onClick={this._deleteLike}>
              <img className="heart-liked" src={assets.filledHeart}/>
            </div>
            <div className="like-count">{this.state.likeCount} Likes</div>
          </div>
        )
      } else
      return(
        <div className="like-container">
          <div className="heart-image" onClick={this._addLike}>
            <img className="heart-unliked" src={assets.emptyHeart}/>
          </div>
          <div className="like-count">{this.state.likeCount} Likes</div>
        </div>
      );
    }

  });
})(this);
