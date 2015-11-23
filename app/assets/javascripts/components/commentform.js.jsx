(function(root) {

  root.CommentForm = React.createClass({

    mixins: [ReactRouter.History],


    getInitialState: function() {
      return {
        photoid: this.props.photo.id,
        userid: CurrentUserStore.currentUser().id,
        comment: ""
      };
    },

    _changeComment: function(e) {
      this.setState({
        comment: e.currentTarget.value
      });
    },

    _handleSubmit: function(e) {
      var photoid = this.state.photoid,
          userid = this.state.userid,
          body = this.state.comment;

      ApiUtil.createPhotoComment(photoid, userid, body);
    },

    render: function() {
      return (
        <div className="submit-comment-box">
          <h3>Submit Comment</h3>
          <form className="comment-form" onSubmit={this._handleSubmit}>
            <input type="text" onChange={this._changeComment} value={this.state.comment} />
            <button>Submit</button>
          </form>
        </div>
      );
    }

  });

})(this);
