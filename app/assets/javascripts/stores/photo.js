(function (root) {

  var _photos = [];
  var CHANGE_EVENT = "PHOTOSTORE CHANGED";
  var _addPhoto = function(newPhoto) {
    _photos.unshift(newPhoto);
  };

  root.PhotoStore = $.extend({}, EventEmitter.prototype, {
    all: function() {
      return _photos.slice(0);
    },

    details: function(){
      return _photos.slice(0)[0];
    },

    resetPhotos: function(photos){
      _photos = photos;
    },

    setPhotoDetails: function(photo){
      _photos = [photo];
    },

    addChangeListener: function(callback){
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback){
      this.removeListener(CHANGE_EVENT, callback);
    },

    dispatcherID: AppDispatcher.register(function(payload){
      switch(payload.actionType){
        case PhotoConstants.PHOTOS_RECEIVED:
          PhotoStore.resetPhotos(payload.photos);
          PhotoStore.emit(CHANGE_EVENT);
          break;
        case PhotoConstants.PHOTO_RECEIVED:
          _addPhoto(payload.photo);
          PhotoStore.emit(CHANGE_EVENT);
          break;
        case PhotoConstants.PHOTO_DETAILS_RECEIVED:
          PhotoStore.setPhotoDetails(payload.photo);
          PhotoStore.emit(CHANGE_EVENT);
          break;
      }
    })
  });
})(this);
