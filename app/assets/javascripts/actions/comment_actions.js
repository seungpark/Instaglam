CommentActions = {

  receivePhotoComments: function(comments){
    debugger
    AppDispatcher.dispatch({
      actionType: CommentConstants.COMMENTS_RECEIVED,
      comments: comments
    });
  }

};
