(function(root) {

  root.CommentForm = React.createClass({

    mixins: [ReactRouter.History],


    getInitialState: function() {
      return {body: ""};
    },

    _changeComment: function(e) {
      this.setState({
        body: e.currentTarget.value
      });
    },

    _clearForm: function() {
      this.setState({ body: "" });
    },

    _handleSubmit: function(e) {
      e.preventDefault();
      //default behavior: makes a get request for the current url
      var data = {
        photo_id: this.props.photo.id,
        user_id: this.props.user.id,
        body: this.state.body,
        user: this.props.photo.user.username
      };
      debugger
      if (this.props.source === "newsfeed") {
        ApiUtil.createPhotoCommentFromNewsfeed(data, this.props.followedUserIds);
      } else if (this.props.source === "userpage") {
        ApiUtil.createPhotoCommentFromUserpage(data);
      } else if (this.props.source === "photopage") {
        ApiUtil.createPhotoCommentFromPhotoPage(data, this.props.photo.id)
      }
      this._clearForm();
    },

    render: function() {
      return (
        <div className="submit-comment-box">
          <form className="comment-form" onSubmit={this._handleSubmit}>
            <input type="text" placeholder="Add a Comment.." onChange={this._changeComment} value={this.state.body} />
            <button>Submit</button>
          </form>
        </div>
      );
    }

  });

})(this);
