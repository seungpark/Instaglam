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

    addPhotos: function(photos){
      _photos = _photos.concat(photos);
    },

    setPhotoDetails: function(photo){
      _photos = [photo];
    },

    addChangeListener: function(callback){
      this.setMaxListeners(0);
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
        case PhotoConstants.MORE_PHOTOS:
          PhotoStore.addPhotos(payload.photos);
          PhotoStore.emit(CHANGE_EVENT);
          break;
        case PhotoConstants.CREATE_LIKE:
          PhotoStore.all().find(
            function (photo) {
              if (photo.id === payload.photoid){
                photo.likes.push(payload.like);
              }
            }
          );
          PhotoStore.emit(CHANGE_EVENT);
          break;
        case PhotoConstants.DELETE_LIKE:
          PhotoStore.all().find(
            function (photo) {
              if (photo.id === payload.photoid){
                photo.likes = photo.likes.filter (function(like) {
                  return like.id !== payload.likeid;
                });
              }
            }
          );
          PhotoStore.emit(CHANGE_EVENT);
          break;
        case PhotoConstants.CREATE_COMMENT:
          PhotoStore.all().find(
            function (photo) {
              if (photo.id === payload.photoid){
                photo.comments.push(payload.comment);
              }
            }
          );
          PhotoStore.emit(CHANGE_EVENT);
          break;
        case PhotoConstants.DELETE_COMMENT:
          PhotoStore.all().find(
            function (photo) {
              if (photo.id === payload.photoid){
                photo.comments = photo.comments.filter (function(comment) {
                  return comment.id !== payload.commentid;
                });
              }
            }
          );
          PhotoStore.emit(CHANGE_EVENT);
          break;
      }
    })
  });
})(this);
