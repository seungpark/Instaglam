(function(root) {

  root.UserPageIndex = React.createClass({

    render: function() {
    debugger
      return(
        <div className="userphotos-index">
        <ul className="userphotos-index-ul">
          {this.props.photos.map(function (photo) {
            return <IndexPhoto
              photo={photo}
              key={photo.id} />
          }.bind(this))}
        </ul>
        </div>
      )
    }

  });
})(this);
