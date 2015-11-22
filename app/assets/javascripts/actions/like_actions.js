LikeActions = {
  receiveLike: function(like, currentUserId) {
    AppDispatcher.dispatch({
      actionType: LikeConstants.LIKE_RECEIVED,
      like: like,
      currentUserId: currentUserId
    });
  }
}
