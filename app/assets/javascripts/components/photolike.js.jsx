(function(root) {

  root.PhotoLike = React.createClass ({

    mixins: [ReactRouter.History],


    getInitialState: function() {
      return {
        liked: false,
        likeCount: this.props.likes.length,
        likeid: "",
        showLikers: false
      };
    },

    componentWillMount: function () {
      var include = this.props.likes.find (function (like) {
        if (like.user_id === CurrentUserStore.currentUser().id) {
          return true;
        }
      });
      if (include) {
        this.setState({ liked: true, likeid: include.id });
      }

      this.setState({
        likers: this.props.likes.map( function (like) {
          return like.user.username;
        })
       });
    },

    componentWillReceiveProps: function(newProps) {
      debugger
      if (newProps.likes.length > 0) {
        var include = newProps.likes.find (function (like) {
          if (like.user_id === CurrentUserStore.currentUser().id) {
            return true;
          }
        });
        if (include) {
          this.setState({ liked: true, likeid: include.id });
        }
        this.setState({
          likers: newProps.likes.map( function (like) {
            return like.user.username;
          })
         });
      }
    },

    // componentWillReceiveProps: function(newProps) {
    //   debugger
    // },

    _addLike: function(e) {
      e.preventDefault();
      var data = {
        photo_id: this.props.photo.id,
        user_id: CurrentUserStore.currentUser().id
      };
      var callback = function () {
        this.setState({ liked: true, likeCount: this.state.likeCount + 1 });
      }.bind(this);

      ApiUtil.createLike(data, callback, this.props.photo.id);
      //
      // if (this.props.source === "newsfeed") {
      //   ApiUtil.createLikeFromNewsfeed(data, this.props.followedUserIds, callback);
      // } else if (this.props.source === "userpage") {
      //   ApiUtil.createLikeFromUserpage(data, this.props.photo.user.username, callback);
      // } else if (this.props.source === "photopage") {
      //   ApiUtil.createLikeFromPhotoPage(data, this.props.photo.id, callback);
      // } else if (this.props.source === "tagpage") {
      //   ApiUtil.createLikeFromTagPage(data, this.props.tagid, callback);
      // }
    },


    _deleteLike: function(e) {
      e.preventDefault();
      // var data = {
      //   photo_id: this.props.photo.id,
      //   user_id: this.props.user.id
      // };



      var callback = function () {
        this.setState({ liked: false, likeCount: this.state.likeCount - 1 });
      }.bind(this);

      ApiUtil.deleteLike(this.state.likeid, callback, this.props.photo.id);
      //
      // if (this.props.source === "newsfeed") {
      //   ApiUtil.deleteLikeFromNewsfeed(likeid, this.props.followedUserIds, callback);
      // } else if (this.props.source === "userpage") {
      //   ApiUtil.deleteLikeFromUserpage(likeid, this.props.photo.user.username, callback);
      // } else if (this.props.source === "photopage") {
      //   ApiUtil.deleteLikeFromPhotoPage(likeid, this.props.photo.id, callback);
      // } else if (this.props.source === "tagpage") {
      //   ApiUtil.deleteLikeFromTagPage(likeid, this.props.tagid, callback);
      // }

    },

    _showLikers: function (e) {
      e.preventDefault();
      this.setState({showLikers: true});
    },

    _hideLikers: function () {
      this.setState({ showLikers: false });
    },


    render: function() {
      debugger
      var likes = "Likes";
      if (this.state.likeCount === 1) {
        likes = "Like";
      }
      var likers;
      if (this.state.likeCount === 0) {
        likers = "0 likes";
      } else if (this.state.likeCount === 1) {
        likers = <span><a href={"#/" + this.state.likers[0]} className="liker">{this.state.likers[0]}</a> likes this</span>;
      } else if (this.state.likeCount > 1 && this.state.likeCount < 4) {
        likers = this.state.likers.map ( function (liker) {
          return (<a href={"#/" + liker} className="liker">{liker}</a>);
        });
      } else {
        likers = <a onClick={this._showLikers}>{this.state.likeCount} Likes</a>;
      }

      var showLikers;
      var background;
      if (this.state.showLikers) {
        showLikers = <Likers callback={this._hideLikers} likers={this.state.likers}/>;
        background = <div className="background-trans"></div>;
      }

      if (this.state.liked) {
        return (
          <div className="photo-like">
            <div className="heart-image" onClick={this._deleteLike}>
              <img className="heart-liked" src={assets.filledHeart}/>
            </div>
            <div className="like-count">
              {likers}
              {background}
              {showLikers}
            </div>
          </div>
        );
      } else
      return(
        <div className="photo-like">
          <div className="heart-image" onClick={this._addLike}>
            <img className="heart-unliked" src={assets.emptyHeart}/>
          </div>
          <div className="like-count">
            {likers}
            {showLikers}
          </div>
        </div>
      );
    }

  });
})(this);
