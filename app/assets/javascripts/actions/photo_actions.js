PhotoActions = {
  receivePhoto: function(photo){
    debugger
    AppDispatcher.dispatch({
      actionType: PhotoConstants.PHOTO_RECEIVED,
      photo: photo
    });
  },

};
