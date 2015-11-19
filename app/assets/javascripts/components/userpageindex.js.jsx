(function(root) {

  root.UserPageIndex = React.createClass({

    render: function() {
    debugger
      return(
        <div className="userpage-photos">
        <ul className="userpage-photos-ul">
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
