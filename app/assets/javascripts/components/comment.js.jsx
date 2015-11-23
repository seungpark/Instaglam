(function(root) {

  root.Comment = React.createClass({

    render: function() {
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

  });

})(this);
// debugger
// return(
//   <div className="comment-container">
//     <ReactRouter.Link to={"/"}>
//       <span className="home-logo">Instaglam</span>
//     </ReactRouter.Link>
//   </div>
// );


// return (
//   <article className="comment flex-container">
//     <Thumbnail user={user} />
//     <p className="comment-body">
//       <Link to={userUrl} className="author-name">{userName}</Link>
//       {comment.body}
//     </p>
//   </article>
// );
