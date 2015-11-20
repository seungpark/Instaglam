var CurrentUserActions = {

  receiveCurrentUser: function (currentUser) {
    debugger
    AppDispatcher.dispatch({
      actionType: CurrentUserConstants.RECEIVE_CURRENT_USER,
      currentUser: currentUser
    });
  }

};
