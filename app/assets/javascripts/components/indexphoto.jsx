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
          <img className="photograph" src="https://lh5.googleusercontent.com/-njFXgQhgQE8/AAAAAAAAAAI/AAAAAAAAAAA/dOa_qDVksz0/s0-c-k-no-ns/photo.jpg"/>
          <li className="photo-caption">{this.props.photo.caption}</li>
        </ul>
      )

    }

  });
})(this);

//instead of <a> user <Link>
