(function(root){

  root.TagPage = React.createClass({

    getInitialState: function() {
      return({
        photos: PhotoStore.all(),
        tagid: parseInt(this.props.location.pathname.slice(6)),
        tagname: "",
        view: "grid",
        page: 1,
        load: false,
        end: false
      });
    },

    _morePhotos: function() {
      var newPageNum = this.state.page + 1;

      ApiUtil.fetchNextPhotosForTagPage(
        this.state.tagid,
        newPageNum,
        function () {this.setState({load: true, page: newPageNum});}.bind(this),
        function () {this.setState({end: true});}.bind(this)
      );
    },

    _handleScroll: function () {
      if ((window.innerHeight + window.scrollY  >= document.body.offsetHeight) &&
          this.state.load && !this.state.end) {

        var newPageNum = this.state.page + 1;
        ApiUtil.fetchNextPhotosForTagPage(
          this.state.tagid,
          newPageNum,
          function () {this.setState({page: newPageNum});}.bind(this),
          function () {this.setState({end: true});}.bind(this)
        );

      }
    },

    _photosChanged: function() {
      this.setState({ photos: PhotoStore.all() });
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

    _imageload: function(e) {
      $(".loading-square#" + e.currentTarget.id).addClass("hide");
    },

    componentWillMount: function() {
      window.scrollTo(0,0);
      window.addEventListener('scroll', this._handleScroll);
      PhotoStore.addChangeListener(this._photosChanged);
      ApiUtil.fetchPhotosForTag(
        this.state.tagid,
        1,
        function () {
          this.setState({end: true});
        }.bind(this)
      );
      ApiUtil.fetchTagName(
        this.state.tagid,
        function(name) {
          this.setState({tagname: name});
        }.bind(this)
      );
    },

    componentWillUnmount: function() {
      PhotoStore.removeChangeListener(this._photosChanged);
      window.removeEventListener('scroll', this._handleScroll);
    },

    componentWillReceiveProps: function(newProps) {
      var newId = parseInt(newProps.location.pathname.slice(6));
      ApiUtil.fetchPhotosForTag(
        newId,
        1,
        function () {
          this.setState({end: true});
        }.bind(this)
      );
      ApiUtil.fetchTagName(
        newId,
        function(name) {
          this.setState({tagname: name});
        }.bind(this)
      );
      this.setState({
        tagid: newId,
        page: 1,
        load: false,
        end: false
      });
      window.scrollTo(0,0);
    },

    render: function() {
      var showMore;
      if (!this.state.end) {
        showMore = (
            <div className="show-more">
              <button onClick={this._morePhotos}> More Photos! </button>
            </div>
        );
      }

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
                      <div className="loading-square" id={photo.id} />
                      <a href={"/#/photos/" + photo.id}>
                      <img className="square-photo" src={photo.image_url} onLoad={this._imageload} id={photo.id}/>
                      </a>
                    </div>
                  );
                }.bind(this) )}

              </ul>
            </div>
            {showMore}
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
            {showMore}
          </div>
        );
      }
    }

  });

})(this);
