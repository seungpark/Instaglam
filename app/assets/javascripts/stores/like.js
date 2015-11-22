(function (root) {

  var _likes = [];
  var CHANGE_EVENT = "LIKESTORE CHANGED";

  root.LikeStore = $.extend({}, EventEmitter.prototype, {

    all: function() {
      return _likes.slice(0);
    },

    addChangeListener: function(callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },

    _addLike: function(newLike) {
      _likes.unshift(newLike);
    },

    _resetLikes: function(likes) {
      _likes = likes;
    },

    dispatcherID: AppDispatcher.register(function(payload){
      switch(payload.actionType){
        case LikeConstants.LIKES_RECEIVED:
          LikeStore._resetLikes(payload.likes);
          LikeStore.emit(CHANGE_EVENT);
          break;
        case LikeConstants.LIKE_RECEIVED:
          LikeStore._addLike(payload.like);
          LikeStore.emit(CHANGE_EVENT);
          break;
      }
    })
  });

})(this);
