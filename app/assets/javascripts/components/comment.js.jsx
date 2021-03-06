(function(root) {

  root.Comment = React.createClass({

    _handleDelete: function(e) {
      e.preventDefault();
      ApiUtil.deleteComment(this.props.comment.id, this.props.photo.id, this.props.callback);
      // if (this.props.source === "newsfeed") {
      //   ApiUtil.deletePhotoCommentFromNewsfeed(commentid, this.props.followedUserIds);
      // } else if (this.props.source === "userpage") {
      //   ApiUtil.deletePhotoCommentFromUserpage(commentid, this.props.photoauthor);
      // } else if (this.props.source === "photopage") {
      //   ApiUtil.deletePhotoCommentFromPhotoPage(commentid, this.props.photo.id);
      // } else if (this.props.source === "tagpage") {
      //   ApiUtil.deletePhotoCommentFromTagPage(commentid, this.props.tagid);
      // }

    },

    render: function() {
      if (
        this.props.photo.user_id === CurrentUserStore.currentUser().id ||
        this.props.comment.user.id === CurrentUserStore.currentUser().id) {
        return (
          <ul className="comment-content">
            <li className="comment-author">
              <a href={"#/" + this.props.author.username}>
                {this.props.author.username}
              </a>
            </li>
            <li className="comment-body">
              {this.props.comment.body}
            </li>
            <li><button onClick={ this._handleDelete }>X</button></li>
          </ul>
        );
      } else {
        return (
          <ul className="comment-content">
            <li className="comment-author">
              <ReactRouter.Link to={"/"+ this.props.author.username}>
                <span className="comment-user">{this.props.author.username}</span>
              </ReactRouter.Link>
            </li>
            <li className="comment-body">
              {this.props.comment.body}
            </li>
          </ul>
        );
      }
    }

  });

})(this);
