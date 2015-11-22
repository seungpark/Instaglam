(function(root){

  function _getAllPhotos() {
    return PhotoStore.all();
  }


  root.FeedFilter = React.createClass({

    mixins: [ReactRouter.History],

    _photosChanged: function(){
      this.setState({photos: _getAllPhotos()});
    },


    getInitialState: function(){
      return {
        photos: _getAllPhotos(),
      };
    },

    componentDidMount: function(){
      PhotoStore.addChangeListener(this._photosChanged);
      ApiUtil.fetchPhotos();
    },

    componentWillUnmount: function(){
      PhotoStore.removeChangeListener(this._photosChanged);
    },

    render: function(){
      return(
      <div>
        <NewsFeed photos={this.state.photos} history={this.history} />
      </div>
      );
    }
  });
})(this);
