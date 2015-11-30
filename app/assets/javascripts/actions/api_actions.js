ApiActions = {
  receiveFeedPhotos: function(photos){
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

  receivePhotoDetails: function(photo){
    AppDispatcher.dispatch({
      actionType: PhotoConstants.PHOTO_DETAILS_RECEIVED,
      photo: photo
    });
  }

  // receivePhotoLikes: function(likes){
  //   AppDispatcher.dispatch({
  //     actionType: LikeConstants.LIKES_RECEIVED,
  //     likes: likes
  //   });
  // }
};
