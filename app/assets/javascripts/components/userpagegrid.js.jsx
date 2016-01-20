(function(root) {

  root.UserPageGrid = React.createClass({

    mixins: [ReactRouter.History],

    _imageload: function(e) {
      $('#' + e.currentTarget.id + '.loading').addClass("hide");
    },

    _hoverImage: function(e) {
      $('#' + e.currentTarget.id + '.hovering').removeClass('hide');
      $('#' + e.currentTarget.id + '.stats').removeClass('hide');
    },

    _unhoverImage: function(e) {
      $('#' + e.currentTarget.id + '.hovering').addClass('hide');
      $('#' + e.currentTarget.id + '.stats').addClass('hide');
    },

    render: function() {
      return(
        <div className="userphotos-grid">
        <ul className="userphotos-grid-ul">
          {this.props.photos.map(function (photo) {

            return (
              <div className="square-photo-container" id={photo.id} onMouseOver={this._hoverImage} onMouseOut={this._unhoverImage}>
                <a href={"/#/photos/" + photo.id}>
                <div className="loading" id={photo.id} />
                <div className="hovering hide" id={photo.id}/>
                <div className="stats hide" id={photo.id}>
                  <img src={assets.transparentHeart}/> {photo.likes.length}
                  <img src={assets.comment} className="comment-icon"/> {photo.comments.length}
                </div>
                <img className="square-photo" src={photo.image_url} id={photo.id} onLoad={this._imageload} />
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
