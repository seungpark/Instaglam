ApiActions = {
  receiveAll: function(photos){
    AppDispatcher.dispatch({
      actionType: PhotoConstants.PHOTOS_RECEIVED,
      photos: photos
    });
  }
};
