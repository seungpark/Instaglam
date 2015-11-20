PhotoActions = {
  receivePhoto: function(photo){
    AppDispatcher.dispatch({
      actionType: PhotoConstants.PHOTO_RECEIVED,
      photo: photo
    });
  },

};
