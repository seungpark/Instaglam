(function(root){

  root.PhotoComment = React.createClass({

    mixins: [ReactRouter.History],

    getInitialState: function() {
      return { comments: this.props.photo.comments };
    },

    _commentsChanged: function() {
      this.setState({ comments: CommentStore.all() });
    },

    componentWillMount: function() {
      debugger
      CommentStore.addChangeListener(this._commentsChanged);
      var photoid = this.props.photo.id;
      ApiUtil.fetchPhotoComments(photoid);
    },

    componentWillUnmount: function(){
      CommentStore.removeChangeListener(this._commentsChanged);
    },

    componentWillReceiveProps: function(newProps){
      CommentStore.addChangeListener(this._commentsChanged);
      var photoid = this.props.photo.id;
      ApiUtil.fetchPhotoComments(photoid);
    },


    // _photosChanged: function() {
    //   this.setState({ photos: PhotoStore.all() });
    // },
    //
    // componentWillMount: function() {
    //   PhotoStore.addChangeListener(this._photosChanged);
    //   var username = this.props.params.username;
    //   ApiUtil.fetchUserPhotos(username);
    // },

    render: function() {
      return (
        <div className="comments-container">

        <ul className="photo-comments-list">
          {this.state.comments.map(function (comment) {
            return (
              <div key={comment.id}>
              <li>{comment.user_id}</li>
              <li>{comment.body}</li>
              </div>
            );
          }.bind(this))}
        </ul>


        </div>
      )
    }

  });

})(this);


// <div className="submit-comment">
//   <CommentForm photo={this.props.photo}/>
// </div>
