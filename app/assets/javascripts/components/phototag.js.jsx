(function(root) {

  root.PhotoTags = React.createClass({

    render: function() {
      return (
        <div className="index-photo-tag-container">
          <h3 className="index-photo-tag-header">Tags</h3>
          <div className="index-photo-tags group">
              {this.props.tags.map(function(tag){
                return <a href={"/#/tags/" + tag.id}>{tag.name}</a>;
              })}
          </div>
        </div>
      );
    }

  });

})(this);
