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

    // componentWillReceiveProps: function(newProps) {
    //   debugger
    // },

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
        ApiUtil.createLikeFromNewsfeed(data, this.props.followedUserIds, callback);
      } else if (this.props.source === "userpage") {
        ApiUtil.createLikeFromUserpage(data, this.props.photo.user.username, callback);
      } else if (this.props.source === "photopage") {
        ApiUtil.createLikeFromPhotoPage(data, this.props.photo.id, callback);
      } else if (this.props.source === "tagpage") {
        ApiUtil.createLikeFromTagPage(data, this.props.tagid, callback);
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

      var likeid;
      if (like) {likeid = like.id;}

      var callback = function () {
        this.setState({ liked: false, likeCount: this.state.likeCount - 1 });
      }.bind(this);
      if (this.props.source === "newsfeed") {
        ApiUtil.deleteLikeFromNewsfeed(likeid, this.props.followedUserIds, callback);
      } else if (this.props.source === "userpage") {
        ApiUtil.deleteLikeFromUserpage(likeid, this.props.photo.user.username, callback);
      } else if (this.props.source === "photopage") {
        ApiUtil.deleteLikeFromPhotoPage(likeid, this.props.photo.id, callback);
      } else if (this.props.source === "tagpage") {
        ApiUtil.deleteLikeFromTagPage(likeid, this.props.tagid, callback);
      }

    },


    render: function() {
      if (this.state.liked) {
        return (
          <div className="photo-like">
            <div className="heart-image" onClick={this._deleteLike}>
              <img className="heart-liked" src={assets.filledHeart}/>
            </div>
            <div className="like-count">{this.state.likeCount} Likes</div>
          </div>
        )
      } else
      return(
        <div className="photo-like">
          <div className="heart-image" onClick={this._addLike}>
            <img className="heart-unliked" src={assets.emptyHeart}/>
          </div>
          <div className="like-count">{this.state.likeCount} Likes</div>
        </div>
      );
    }

  });
})(this);
