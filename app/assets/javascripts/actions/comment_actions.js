//OBSOLETE NOT CALLED ANYWHERE

CommentActions = {

  createPhotoComment: function(comment){
    AppDispatcher.dispatch({
      actionType: CommentConstants.COMMENT_ADDED,
      comment: comment
    });
  }

};
