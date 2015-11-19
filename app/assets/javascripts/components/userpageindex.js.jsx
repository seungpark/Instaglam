(function(root) {

  root.UserPageIndex = React.createClass({

    render: function() {
      return(
        <div className="userpage-index">
        <ul className="userpage-index-ul">
          {this.props.photos.map(function (photo) {
            return <Photo
              photo={photo}
              key={photo.id} />
          }.bind(this))}
        </ul>
        </div>
      )
    }

  });
})(this);
