var FilterFeed = React.createClass({

  getInitialState: function () {
    return null;
      // photos: _getAllPhotos(),
      // filterParams: _getFilterParams(),
      // clickedLoc: null,
  },

  render: function(){
    return(
    <div>
      <div className="feed">
        <NewsFeed />
      </div>
    </div>
    );
  }
});
