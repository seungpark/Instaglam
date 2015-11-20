(function(root){
  root.IndexPhoto = React.createClass({

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
        </ul>
      )

    }

  });
})(this);

//instead of <a> user <Link>
