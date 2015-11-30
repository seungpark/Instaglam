(function(root){

  root.PhotoComment = React.createClass({

    mixins: [ReactRouter.History],

    getInitialState: function() {
      return { comments: this.props.comments };
    },

    // _commentsAdded: function() {
    //   this.setState({ comments: this.props.comments.push(CommentStore.newComment()) });
    // },
    //
    // componentWillMount: function() {
    //   CommentStore.addAdditionListener(this._commentsAdded);
    // },
    //
    // componentWillUnmount: function(){
    //   CommentStore.removeChangeListener(this._commentsChanged);
    // },


    render: function() {
      return (

        <ul className="photo-comments-list">
          {this.props.comments.map(function (comment) {
            return (
              <li key={comment.id}>
              <Comment
                photo={this.props.photo}
                comment={comment}
                body={comment.body}
                author={comment.user}
                source={this.props.source}
                photoauthor={this.props.photo.user.username}
                followedUserIds={this.props.followedUserIds}
                tagid={this.props.tagid}
              />
              </li>
            );
          }.bind(this))}
        </ul>
      );
    }

  });

})(this);


// <div className="submit-comment">
//   <CommentForm photo={this.props.photo}/>
// </div>
