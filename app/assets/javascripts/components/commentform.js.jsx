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
      var data = {
        photo_id: this.props.photo.id,
        user_id: this.props.user.id,
        body: this.state.body,
        user: this.props.photo.username
      };

      if (this.props.source === "newsfeed") {
        ApiUtil.createPhotoCommentFromNewsfeed(data);
      } else if (this.props.source === "userpage") {
        ApiUtil.createPhotoCommentFromUserpage(data);
      }
      this._clearForm();
    },

    render: function() {
      return (
        <div className="submit-comment-box">
          <h3>Submit Comment</h3>
          <form className="comment-form" onSubmit={this._handleSubmit}>
            <input type="text" onChange={this._changeComment} value={this.state.body} />
            <button>Submit</button>
          </form>
        </div>
      );
    }

  });

})(this);
