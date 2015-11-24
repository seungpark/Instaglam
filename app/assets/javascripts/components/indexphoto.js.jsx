(function(root){
  root.IndexPhoto = React.createClass({

    mixins: [ReactRouter.History],

    render: function() {
      return (
        <ul className="photo-item" key={this.props.photo.id}>
          <li className="photo-user">
            <ReactRouter.Link to={"/" + this.props.photo.username}>{this.props.photo.username}
            </ReactRouter.Link>
          </li>
          <li className="photo-title">{this.props.photo.title}</li>
          <img className="photograph" src={this.props.photo.image_url}/>
          <li className="photo-caption">{this.props.photo.caption}</li>
          <li className="photo-like"> <PhotoLike
              photo={this.props.photo}
              key={this.props.photo.id}
              likes={this.props.photo.likes}
              user={CurrentUserStore.currentUser()}
            /> </li>
          <li className="photo-comments">
            <PhotoComment
              photo={this.props.photo}
              key={this.props.photo.id}
              comments={this.props.photo.comments}
              user={CurrentUserStore.currentUser()}
              source={this.props.source}
              belongstouser={this.props.belongstouser}
           /> </li>
           <li className="submit-comment">
            <CommentForm
              photo={this.props.photo}
              key={this.props.photo.id}
              user={CurrentUserStore.currentUser()}
              source={this.props.source}
          /> </li>
        </ul>
      )

    }

  });
})(this);

//instead of <a> user <Link>
