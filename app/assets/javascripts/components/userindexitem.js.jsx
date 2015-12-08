(function(root) {
  root.UserIndexItem = React.createClass({
    render: function() {
      return (
        <li>
        <a className="search-userpage" onClick={this.props.callback} href={ "#/" + this.props.user.username }>
          <img className="search-avatar"src={this.props.user.avatar_url} />
          { this.props.user.username }
          {"- " + this.props.user.name}
        </a>
        </li>
      );
    }
  });
})(this);
