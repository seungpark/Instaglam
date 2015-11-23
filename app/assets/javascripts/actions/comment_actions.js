CommentActions = {

  receivePhotoComments: function(comments){
    AppDispatcher.dispatch({
      actionType: CommentConstants.COMMENTS_RECEIVED,
      comments: comments
    });
  }

};
