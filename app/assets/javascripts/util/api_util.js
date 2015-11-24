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

  // fetchLikes: function(photoid){
  //   $.ajax({
  //     url: '/api/likes',
  //     type: 'GET',
  //     dataType: 'json',
  //     data: {photo_id: photoid},
  //     success: function(data) {
  //       ApiActions.receivePhotoLikes(data);
  //     }
  //   });
  // },

  createLikeFromNewsfeed: function(data, callback){
    $.ajax({
      url:'/api/likes',
      type: 'POST',
      dataType: 'json',
      data: data,
      success: function(like) {
        ApiUtil.fetchPhotos();
        callback && callback();
        // LikeActions.receiveLike(like);
      }
    });
  },

  createLikeFromUserpage: function(data, username, callback){
    $.ajax({
      url:'/api/likes',
      type: 'POST',
      dataType: 'json',
      data: data,
      success: function(like) {
        ApiUtil.fetchUserPhotos(username);
        callback && callback();
        // LikeActions.receiveLike(like);
      }
    });
  },

  deleteLikeFromNewsfeed: function(data, likeid, callback){
    $.ajax({
      url:'/api/likes/' + likeid,
      type: 'DELETE',
      dataType: 'json',
      data: data,
      success: function(like) {
        ApiUtil.fetchPhotos();
        callback && callback();
        // LikeActions.receiveLike(like);
      }
    });
  },

  deleteLikeFromUserpage: function(data, likeid, username, callback){
    $.ajax({
      url:'/api/likes/' + likeid,
      type: 'DELETE',
      dataType: 'json',
      data: data,
      success: function(like) {
        ApiUtil.fetchUserPhotos(username);
        callback && callback();
        // LikeActions.receiveLike(like);
      }
    });
  },
  // 
  // deleteLike: function(photoid, currentuserid){
  //   $.ajax({
  //     url:'/api/likes/like',
  //     type: 'DELETE',
  //     dataType: 'json',
  //     data: {photo_id: photoid, user_id: currentuserid},
  //     success: function(like) {
  //       LikeActions.deleteLike(like);
  //     }
  //   });
  // },

  // fetchPhotoComments: function(photoid) {
  //   $.ajax({
  //     url: '/api/comments',
  //     type: 'GET',
  //     dataType: 'json',
  //     data: {photo_id: photoid},
  //     success: function(data) {
  //       CommentActions.receivePhotoComments(data);
  //     }
  //   });
  // },

  createPhotoCommentFromNewsfeed: function(commentdata){
    $.ajax({
      url: 'api/comments',
      type: 'POST',
      dataType: 'json',
      data: commentdata,
      success: function(data) {
        // CommentActions.createPhotoComment(data);
        ApiUtil.fetchPhotos();
      }
    });
  },

  createPhotoCommentFromUserpage: function(commentdata){
    var username = commentdata.user;
    $.ajax({
      url: 'api/comments',
      type: 'POST',
      dataType: 'json',
      data: commentdata,
      success: function(data) {
        // CommentActions.createPhotoComment(data);
        ApiUtil.fetchUserPhotos(username);
      }
    });
  },

  deletePhotoCommentFromNewsfeed: function(commentid){
    $.ajax({
      url: 'api/comments/' + commentid,
      type: 'DELETE',
      dataType: 'json',
      data: {id: commentid},
      success: function(data) {
        ApiUtil.fetchPhotos();
      }
    });
  },

  deletePhotoCommentFromUserpage: function(commentid, username){
    $.ajax({
      url: 'api/comments/' + commentid,
      type: 'DELETE',
      dataType: 'json',
      data: {id: commentid},
      success: function(data) {
        ApiUtil.fetchUserPhotos(username);
      }
    });
  }

};
