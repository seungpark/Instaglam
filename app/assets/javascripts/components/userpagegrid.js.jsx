(function(root) {

  root.UserPageGrid = React.createClass({

    mixins: [ReactRouter.History],

    render: function() {
      return(
        <div className="userphotos-grid">
        <ul className="userphotos-grid-ul">
          {this.props.photos.map(function (photo) {

            return (
              <div className="square-photo">
                <a href={"/#/photos/" + photo.id}>
                <img src={photo.image_url} />
                </a>
              </div>
            );
          }.bind(this))}
        </ul>
        </div>
      );
    }

  });
})(this);
