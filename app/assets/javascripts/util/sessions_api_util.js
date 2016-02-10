var SessionsApiUtil = {

  signin: function(credentials, success, failure) {
    $.ajax({
      url: '/api/session',
      type: 'POST',
      dataType: 'json',
      data: credentials,
      success: function (currentUser) {
        CurrentUserActions.receiveCurrentUser(currentUser);
        success && success();
      },
      error: function (jqXHR, textStatus, errorThrown) {
        failure && failure();
      }
    });
  },

  fetchCurrentUser: function () {
    $.ajax({
      url: '/api/session',
      type: 'GET',
      dataType: 'json',
      success: function (currentUser) {
        CurrentUserActions.receiveCurrentUser(currentUser);
      }
    });
  },

  signout: function() {
    $.ajax({
      url: 'api/session',
      type: 'DELETE',
      dataType: 'json',
      success:function () {
        CurrentUserActions.receiveCurrentUser({});
      }
    });
  }

};
