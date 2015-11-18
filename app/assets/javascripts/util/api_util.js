ApiUtil = {
  fetchPhotos: function(){
    var result = $.ajax({
      url: "api/photos",
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        ApiActions.receiveAll(data);
      }
    });
  },

  createPhoto: function(data){
    $.post('api/photos', { photo: data }, function(photo) {
      ApiActions.receiveAll([photo]);
    });
  },

};
