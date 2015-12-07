(function(root){

  root.TagPage = React.createClass({

    getInitialState: function() {
      return({
        photos: PhotoStore.all(),
        tagid: parseInt(this.props.location.pathname.slice(6)),
        tagname: "",
        view: "grid"
      });
    },

    _photosChanged: function() {
      this.setState({
        photos: PhotoStore.all(),
        tagname: PhotoStore.all()[0].tags.find(function(tag) {
          if (tag.id === this.state.tagid) {
            return tag;
          }
        }.bind(this)).name
      });
    },


    _changeToGrid: function() {
      if (this.state.view === "list") {
        this.setState({ view: "grid" });
        document.getElementsByClassName("active-icon")[0].setAttribute("class", "list-icon");
        document.getElementsByClassName("grid-icon")[0].setAttribute("class", "active-icon");
      }
    },

    _changeToList: function() {
      if (this.state.view === "grid") {
        this.setState({ view: "list" });
        document.getElementsByClassName("active-icon")[0].setAttribute("class", "grid-icon");
        document.getElementsByClassName("list-icon")[0].setAttribute("class", "active-icon");
      }
    },

    componentWillMount: function() {
      window.scrollTo(0,0);
      PhotoStore.addChangeListener(this._photosChanged);
      ApiUtil.fetchPhotosForTag(this.state.tagid);
    },

    componentWillUnmount: function() {
      PhotoStore.removeChangeListener(this._photosChanged);
    },

    componentWillReceiveProps: function(newProps) {
      this.setState({tagid: parseInt(newProps.location.pathname.slice(6)) });
      ApiUtil.fetchPhotosForTag(parseInt(newProps.location.pathname.slice(6)));
      window.scrollTo(0,0);
    },

    render: function() {
      if (this.state.view === "grid") {
        return(
          <div className="tagpage">
            <div className="tagpage-grid">
              <div className="tagpage-header">
                <h1 className="tagpage-header">{"#" + this.state.tagname}</h1>
                <div className="viewing-options">
                  <input type="image" className="active-icon" src={assets.gridview_icon} onClick={this._changeToGrid}></input>
                  <input type="image" className="list-icon" src={assets.listview_icon} onClick={this._changeToList}></input>
                </div>
              </div>
              <ul className="tagpage-ul">
                {this.state.photos.map(function (photo) {
                  return (
                    <div className="square-photo-container">
                      <a href={"/#/photos/" + photo.id}>
                      <img className="square-photo" src={photo.image_url} />
                      </a>
                    </div>
                  );
                }.bind(this) )}

              </ul>
            </div>
          </div>
        );
      }else if (this.state.view === "list") {
        return(
          <div className="tagpage">
            <div className="tagpage-list">
                <div className="tagpage-header">
                  <h1 className="tagpage-header">{"#" + this.state.tagname}</h1>
                  <div className="viewing-options">
                    <input type="image" className="active-icon" src={assets.gridview_icon} onClick={this._changeToGrid}></input>
                    <input type="image" className="list-icon" src={assets.listview_icon} onClick={this._changeToList}></input>
                  </div>
                </div>
              <ul className="tagpage-ul">
                {this.state.photos.map(function (photo) {
                  return <IndexPhoto
                    key={photo.id}
                    photo={photo}
                    author={photo.user}
                    comments={photo.comments}
                    likes={photo.likes}
                    user={CurrentUserStore.currentUser()}
                    source={"tagpage"}
                    followedUserIds={this.props.followedUserIds}
                    tags={photo.tags}
                    tagid={parseInt(this.props.location.pathname.slice(6))}
                    />;
                }.bind(this) )}

              </ul>
            </div>
          </div>
        );
      }
    }

  });

})(this);
