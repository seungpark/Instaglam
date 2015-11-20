var SessionsApiUtil = {

  signin: function(credentials, success) {
    $.ajax({
      url: '/api/session',
      type: 'POST',
      dataType: 'json',
      data: credentials,
      success: function (currentUser) {
        CurrentUserActions.receiveCurrentUser(currentUser);
        success && success();
        console.log("reaching login-success");
      }
    });
    debugger
  }

};
