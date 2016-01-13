(function(root){

  root.PhotoComment = React.createClass({

    mixins: [ReactRouter.History],

    getInitialState: function() {
      if (this.props.comments.length > 3) {
        return {
          comments: this.props.comments,
          showComments: this.props.comments.slice( this.props.comments.length - 3, this.props.comments.length),
          showing: 3,
          initial: true
         };
      } else {
        return {
          comments: this.props.comments,
          showComments: this.props.comments,
          showing: "all",
          initial: true
        };
      }
    },

    _showNewComment: function () {
      //when creating/deleting comments/likes
      if (this.state.showing !== "all") {
        this.setState({
          comments: this.props.comments,
          showComments: this.props.comments.slice(
            this.props.comments.length - this.state.showing - 1,
            this.props.comments.length),
          showing: this.state.showing + 1
        });
      } else {
        this.setState({
          comments: this.props.comments,
          showComments: this.props.comments
        });
      }
    },

    _removeComment: function (id) {
      var newComments = this.state.comments.filter( function (comment) {
        return comment.id !== id;
      });
      if (this.state.showing >= newComments.length) {
        this.setState({
          comments: newComments,
          showComments: newComments.slice(
            newComments.length - this.state.showing,
            newComments.length
          ),
          showing: "all"
        });
      } else {
        this.setState({
          comments: newComments,
          showComments: newComments.slice(
            newComments.length - this.state.showing,
            newComments.length
          )
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
          showing: this.state.showing + 3,
          initial: false
        });
      } else {
        this.setState ({
          showComments: this.props.comments,
          showing: "all",
          initial: false
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
      if (this.state.initial && this.state.comments.length > this.state.showing) {
        loadMore = <a className="load-comments" onClick={this._loadMore}>show all {this.state.comments.length} comments</a>;
      } else if (this.state.showing !== "all") {
        loadMore = <a className="load-comments" onClick={this._loadMore}>show more comments</a>;
      } else {
        if (this.state.comments.length < 4) {
          loadMore = <p className="load-comments-all"></p>;
        } else {
          loadMore = <p className="load-comments-all">showing all {this.state.comments.length} comments</p>;
        }
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
                callback={this._removeComment}
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
