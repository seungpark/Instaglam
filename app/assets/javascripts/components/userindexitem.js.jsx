(function(root) {
  root.UserIndexItem = React.createClass({
    render: function() {
      return (
        <li>
          <a onClick={this.props.callback} href={ "#/" + this.props.user.username }>
            { this.props.user.username }
          </a>
        </li>
      );
    }
  });
})(this);
