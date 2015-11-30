(function(root){

  root.TagPage = React.createClass({

    getInitialState: function() {
      return({
        photos: PhotoStore.all(),
        tagid: parseInt(this.props.location.pathname.slice(6))
      });
    },

    _photosChanged: function() {
      this.setState({ photos: PhotoStore.all() });
    },

    componentWillMount: function() {
      PhotoStore.addChangeListener(this._photosChanged);
      ApiUtil.fetchPhotosForTag(this.state.tagid);
    },

    componentWillUnmount: function() {

    },

    render: function() {
      return(
        <div/>
      )

    }

  });

})(this);
