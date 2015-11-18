(function(root){
  root.NewsFeedItem = React.createClass({

    render: function() {
      debugger;
      return (
        <ul className="newsfeed-item" key={this.props.photo.id}>
          <li className="photo-title">{this.props.photo.title}</li>
          <li className="photo-caption">{this.props.photo.caption}</li>
          <li className="photo-user">
            <a href="#">{this.props.photo.username}</a>
          </li>
        </ul>
      )

    }

  });
})(this);

//instead of <a> user <Link>
