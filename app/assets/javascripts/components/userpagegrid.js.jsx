(function(root) {

  root.UserPageGrid = React.createClass({

    mixins: [ReactRouter.History],

    _imageload: function(e) {
      debugger
      $(".loading#" + e.currentTarget.id).addClass("hide");
    },

    render: function() {
      return(
        <div className="userphotos-grid">
        <ul className="userphotos-grid-ul">
          {this.props.photos.map(function (photo) {

            return (
              <div className="square-photo-container">
                <a href={"/#/photos/" + photo.id}>
                <div className="loading" id={photo.id} />
                <img className="square-photo" src={photo.image_url} id={photo.id} onLoad={this._imageload}/>
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
