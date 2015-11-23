(function (root) {

  var _newComment;
  var ADD_COMMENT = "ADD COMMENT";

  root.CommentStore = $.extend({}, EventEmitter.prototype, {

    mixins: [ReactRouter.History],

    newComment: function() {
      return _newComment;
    },

    _addComment: function(comment) {
      _newComment = comment;
    },
    //
    // _removeComment: function(comment) {
    //   _comments.shift(comment);
    // },
    //
    // _resetComments: function(comments) {
    //   _comments = comments.reverse();
    // },

    addAdditionListener: function(callback) {
      this.on(ADD_COMMENT, callback);
    },

    removeChangeListener: function(callback){
      this.removeListener(CHANGE_EVENT, callback);
    },

    dispatcherID: AppDispatcher.register(function(payload){
      switch(payload.actionType){
        case CommentConstants.COMMENT_ADDED:
          CommentStore._addComment(payload.comment)
          CommentStore.emit(ADD_COMMENT);
          break;
        case LikeConstants.COMMENT_DELETED:
          break;
      }
    })

  });

})(this);
