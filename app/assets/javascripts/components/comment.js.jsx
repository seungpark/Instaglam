(function(root) {

  root.Comment = React.createClass({

    _handleDelete: function(e) {
      e.preventDefault();
      var commentid = this.props.comment.id;
      if (this.props.source === "newsfeed") {
        ApiUtil.deletePhotoCommentFromNewsfeed(commentid);
      } else if (this.props.source === "userpage") {
        ApiUtil.deletePhotoCommentFromUserpage(commentid, this.props.photoauthor);
      }

    },

    render: function() {
      if (this.props.comment.user.id === CurrentUserStore.currentUser().id) {
        return (
          <ul className="comment-content">
            <li className="comment-author">
              <ReactRouter.Link to={"/" + this.props.author.username}>
                <span className="comment-user">{this.props.author.username}</span>
              </ReactRouter.Link>
            </li>
            <li className="comment-body">
              {this.props.comment.body}
            </li>
            <li><p><button onClick={ this._handleDelete }>X</button></p></li>
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
