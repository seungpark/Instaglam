(function(root){

  root.PhotoComment = React.createClass({

    mixins: [ReactRouter.History],

    getInitialState: function() {
      if (this.props.comments.length > 3) {
        return {
          comments: this.props.comments,
          showComments: this.props.comments.slice( this.props.comments.length - 3, this.props.comments.length),
          showing: 3
         };
      } else {
        return {
          comments: this.props.comments,
          showComments: this.props.comments,
          showing: "all"
        };
      }
    },

    _showNewComment: function () {
      //when creating/deleting comments/likes
      if (this.state.showing !== "all") {
        this.setState({
          comments: this.props.comments,
          showComments: this.props.comments.slice(
            this.state.comments.length - this.state.showing - 1,
            this.state.comments.length),
          showing: this.state.showing + 1
        });
      } else {
        this.setState({
          comments: this.props.comments,
          showComments: this.props.comments
        });
      }

    },

    _loadMore: function (e) {
      e.preventDefault();
      if (this.state.comments.length > this.state.showing + 3) {
        this.setState({
          showComments: this.state.comments.slice(
            this.state.comments.length - this.state.showing - 3,
            this.state.comments.length),
          showing: this.state.showing + 3
        });
      } else {
        this.setState ({
          showComments: this.props.comments,
          showing: "all"
        });
      }
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
      var loadMore;
      if (this.state.showing !== "all") {
        loadMore = <a className="load-comments" onClick={this._loadMore}>load more comments</a>;
      }
      return (
        <div>
        <ul className="photo-comments-list">
          {loadMore}
          {this.state.showComments.map(function (comment) {
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
                user ={this.props.user}
              />
              </li>
            );
          }.bind(this))}
        </ul>
        <div className="submit-comment">
         <CommentForm
           photo={this.props.photo}
           key={this.props.photo.id}
           user={CurrentUserStore.currentUser()}
           source={this.props.source}
           followedUserIds={this.props.followedUserIds}
           callback={this._showNewComment}
       /> </div>
       </div>
      );
    }

  });

})(this);


// <div className="submit-comment">
//   <CommentForm photo={this.props.photo}/>
// </div>
