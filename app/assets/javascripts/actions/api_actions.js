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
      photos: photos.reverse()
    });
  },

  // receivePhotoLikes: function(likes){
  //   AppDispatcher.dispatch({
  //     actionType: LikeConstants.LIKES_RECEIVED,
  //     likes: likes
  //   });
  // }
};
