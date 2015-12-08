(function(root) {
  root.TagIndexItem = React.createClass({
    render: function() {
      return (
        <li>
          <a onClick={this.props.callback} href={ "#/tags/" + this.props.tag.id }>
            { "#" + this.props.tag.name }
          </a>
        </li>
      );
    }
  });
})(this);
