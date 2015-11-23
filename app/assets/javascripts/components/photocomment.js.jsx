(function(root){

  root.PhotoComment = React.createClass({

    mixins: [ReactRouter.History],

    getInitialState: function() {
      return { comments: this.props.comments };
    },

    // _commentsChanged: function() {
    //   this.setState({ comments: CommentStore.all() });
    // },
    //
    // componentWillMount: function() {
    //   CommentStore.addChangeListener(this._commentsChanged);
    //   var photoid = this.props.photo.id;
    //   ApiUtil.fetchPhotoComments(photoid);
    // },
    //
    // componentWillUnmount: function(){
    //   CommentStore.removeChangeListener(this._commentsChanged);
    // },
    //
    // componentWillReceiveProps: function(newProps){
    //   CommentStore.addChangeListener(this._commentsChanged);
    //   var photoid = this.props.photo.id;
    //   ApiUtil.fetchPhotoComments(photoid);
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
