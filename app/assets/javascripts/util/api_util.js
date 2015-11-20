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
  }

};
