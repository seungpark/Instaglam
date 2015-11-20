(function(root) {

  root.UserPageIndex = React.createClass({

    render: function() {
      return(
        <div className="userphotos-index">
        <ul className="userphotos-index-ul">
          {this.props.photos.reverse().map(function (photo) {
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
