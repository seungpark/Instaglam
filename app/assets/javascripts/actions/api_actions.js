ApiActions = {
  receiveFeedPhotos: function(photos){
    AppDispatcher.dispatch({
      actionType: PhotoConstants.PHOTOS_RECEIVED,
      photos: photos
    });
  },

  receiveNextFeedPhotos: function(photos) {
    AppDispatcher.dispatch({
      actionType: PhotoConstants.MORE_PHOTOS,
      photos: photos
    });
  },

  receiveUserPhotos: function(photos){
    AppDispatcher.dispatch({
      actionType: PhotoConstants.PHOTOS_RECEIVED,
      photos: photos
    });
  },

  receiveNextUserPhotos: function(photos){
    AppDispatcher.dispatch({
      actionType:PhotoConstants.MORE_PHOTOS,
      photos: photos
    });
  },

  receivePhotoDetails: function(photo){
    AppDispatcher.dispatch({
      actionType: PhotoConstants.PHOTO_DETAILS_RECEIVED,
      photo: photo
    });
  },

  receieveTagPhotos: function(photos){
    AppDispatcher.dispatch({
      actionType: PhotoConstants.PHOTOS_RECEIVED,
      photos: photos
    });
  },

  addLike: function(like, photoid){
    AppDispatcher.dispatch({
      actionType: PhotoConstants.CREATE_LIKE,
      photoid: photoid,
      like: like
    });
  },

  deleteLike: function(likeid, photoid){
    AppDispatcher.dispatch({
      actionType: PhotoConstants.DELETE_LIKE,
      photoid: photoid,
      likeid: likeid
    });
  },

  addComment: function(comment, photoid){
    AppDispatcher.dispatch({
      actionType: PhotoConstants.CREATE_COMMENT,
      photoid: photoid,
      comment: comment
    });
  },

  deleteComment: function(commentid, photoid) {
    AppDispatcher.dispatch({
      actionType: PhotoConstants.DELETE_COMMENT,
      photoid: photoid,
      commentid: commentid
    });
  }

  // receivePhotoLikes: function(likes){
  //   AppDispatcher.dispatch({
  //     actionType: LikeConstants.LIKES_RECEIVED,
  //     likes: likes
  //   });
  // }
};
