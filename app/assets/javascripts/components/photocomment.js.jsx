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
        <div className="comments-container">

        <ul className="photo-comments-list">
          {this.props.comments.map(function (comment) {
            return (
              <li key={comment.id}>
              <Comment
                comment={comment}
                body={comment.body}
                author={comment.author}
                source={this.props.source}
              />
              </li>
            )
          }.bind(this))}
        </ul>
        </div>
      );
    }

  });

})(this);


// <div className="submit-comment">
//   <CommentForm photo={this.props.photo}/>
// </div>
