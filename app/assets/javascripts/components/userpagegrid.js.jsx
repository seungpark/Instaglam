(function(root) {

  root.UserPageGrid = React.createClass({

    mixins: [ReactRouter.History],

    _imageload: function(id) {
      $(".loading#" + id).addClass("hide");
    },

    render: function() {
      debugger
      return(
        <div className="userphotos-grid">
        <ul className="userphotos-grid-ul">
          {this.props.photos.map(function (photo) {

            return (
              <div className="square-photo-container">
                <a href={"/#/photos/" + photo.id}>
                <img className="loading" src={assets.uploading_image} id={photo.id}/>
                <img className="square-photo" src={photo.image_url} onLoad={this._imageload(photo.id)}/>
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
