ApiActions = {
  receiveAll: function(photos){
    AppDispatcher.dispatch({
      actionType: PhotoConstants.PHOTOS_RECEIVED,
      photos: photos
    });
  },

  receiveUserPhotos: function(photos){
    AppDispatcher.dispatch({
      actionType: PhotoConstants.PHOTOS_RECEIVED,
      photos: photos
    });
  },

  receivePhotoLikes: function(likes){
    debugger
    AppDispatcher.dispatch({
      actionType: LikeConstants.LIKES_RECEIVED,
      likes: likes
    })
  }
};
