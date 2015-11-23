(function (root) {

  var _comments = [];
  var CHANGE_EVENT = "COMMENTSTORE CHANGED";

  root.CommentStore = $.extend({}, EventEmitter.prototype, {

    mixins: [ReactRouter.History],

    all: function() {
      return _comments.slice(0);
    },

    _addComment: function(comment) {
      _comments.unshift(comment);
    },

    _removeComment: function(comment) {
      _comments.shift(comment);
    },

    _resetComments: function(comments) {
      _comments = comments.reverse();
    },

    addChangeListener: function(callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback){
      this.removeListener(CHANGE_EVENT, callback);
    },

    dispatcherID: AppDispatcher.register(function(payload){
      switch(payload.actionType){
        case CommentConstants.COMMENTS_RECEIVED:
        debugger
          CommentStore._resetComments(payload.comments);
          CommentStore.emit(CHANGE_EVENT);
          break;
        case CommentConstants.COMMENT_RECEIVED:
          CommentStore._addComment(payload.comment);
          CommentStore.emit(CHANGE_EVENT);
          break;
        case LikeConstants.COMMENT_DELETED:
          CommentStore._removeComment(payload.comment);
          CommentStore.emit(CHANGE_EVENT);
          break;
      }
    })

  });

})(this);
