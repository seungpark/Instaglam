(function(root){
  root.Photo = React.createClass({

    render: function() {
      return (
        <ul className="newsfeed-item" key={this.props.photo.id}>
          <li className="photo-user">
            <ReactRouter.Link to={"/users/" + this.props.photo.username}>{this.props.photo.username}
            </ReactRouter.Link>
          </li>
          <li className="photo-title">{this.props.photo.title}</li>
          <li className="photo-caption">{this.props.photo.caption}</li>
        </ul>
      )

    }

  });
})(this);

//instead of <a> user <Link>
