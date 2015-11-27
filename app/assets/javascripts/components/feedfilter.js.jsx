(function(root){

  root.FeedFilter = React.createClass({

    mixins: [ReactRouter.History],

    _photosChanged: function(){
      this.setState({photos: PhotoStore.all() });
    },


    getInitialState: function(){
      return { photos: PhotoStore.all() };
    },

    componentDidMount: function(){
      PhotoStore.addChangeListener(this._photosChanged);
      ApiUtil.fetchFeedPhotos();
    },

    componentWillUnmount: function(){
      PhotoStore.removeChangeListener(this._photosChanged);
    },

    render: function(){
      debugger
      return(
      <div>
        <NewsFeed photos={this.state.photos} history={this.history} />
      </div>
      );
    }
  });
})(this);
