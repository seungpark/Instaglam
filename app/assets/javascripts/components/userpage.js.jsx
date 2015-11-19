(function(root) {

  root.UserPage = React.createClass({

    getInitialState: function() {
      return {photos: []};
    },

    _photosChanged: function() {
      this.setState({ photos: PhotoStore.all() });
    },

    componentDidMount: function() {
      PhotoStore.addChangeListener(this._photosChanged);
      var username = this.props.params.username;
      ApiUtil.fetchUserPhotos(username);
    },

    render: function() {
      return(
        <div className="userpage-photos-container">
          <UserPageIndex photos={this.state.photos}/>
        </div>
      )
    }

  });
})(this);
