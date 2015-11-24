(function(root) {

  root.Comment = React.createClass({

    _handleDelete: function(e) {
      e.preventDefault();
      var commentid = this.props.comment.id;
      if (this.props.source === "newsfeed") {
        ApiUtil.deletePhotoCommentFromNewsfeed(commentid);
      } else if (this.props.source === "userpage") {
        ApiUtil.deletePhotoCommentFromUserpage(commentid, this.props.belongstouser);
      }

    },

    render: function() {
      debugger
      if (this.props.comment.user_id === CurrentUserStore.currentUser().id) {
        return (
          <div className="comments-list">
          <ul className="comment-author-content">
            <li className="comment-author">
              <ReactRouter.Link to={"/"}>
                <span className="comment-user">{this.props.comment.user.username}</span>
              </ReactRouter.Link>
            </li>
            <li className="comment-content">
              {this.props.comment.body}
            </li>
            <li><button onClick={ this._handleDelete }>Delete</button></li>
          </ul>
          </div>
        );
      } else {
        return (
          <div className="comments-list">
          <ul className="comment-author-content">
            <li className="comment-author">
              <ReactRouter.Link to={"/"}>
                <span className="comment-user">{this.props.comment.user_id}</span>
              </ReactRouter.Link>
            </li>
            <li className="comment-content">
              {this.props.comment.body}
            </li>
          </ul>
          </div>
        );
      }
    }

  });

})(this);
