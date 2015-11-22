ApiUtil = {
  fetchPhotos: function(){
    $.ajax({
      url: "api/photos",
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        ApiActions.receiveAll(data);
      }
    });
  },

  fetchUserPhotos: function(username){
    $.ajax({
      url: "api/photos/",
      type: 'GET',
      dataType: 'json',
      data: {username: username},
      success: function(data) {
        ApiActions.receiveUserPhotos(data);
      }
    });
  },

  createPhoto: function(formData, callback) {
    $.ajax({
      url: '/api/photos',
      type: 'POST',
      processData: false,
      contentType: false,
      dataType: 'json',
      data: formData,
      success: function(photo) {
        PhotoActions.receivePhoto(photo);
        callback && callback();
      }
    });
  },

  fetchLikes: function(photoid){
    $.ajax({
      url: '/api/likes',
      type: 'GET',
      dataType: 'json',
      data: {photo_id: photoid},
      success: function(data) {
        debugger
        ApiActions.receivePhotoLikes(data);
      }
    });
  },

  createLike: function(photoid, currentuserid){
    $.ajax({
      url:'/api/likes',
      type: 'POST',
      dataType: 'json',
      data: {photo_id: photoid, user_id: currentuserid},
      success: function(like) {
        LikeActions.receiveLike(like);
      }
    });
  }

};
