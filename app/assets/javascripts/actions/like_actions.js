//OBSOLETE
LikeActions = {
  receiveLike: function(like) {
    AppDispatcher.dispatch({
      actionType: LikeConstants.LIKE_RECEIVED,
      like: like,
    });
  },

  deleteLike: function(like) {
    AppDispatcher.dispatch({
      actionType: LikeConstants.LIKE_DELETED,
      like: like
    });
  }
};
