ApiUtil = {
  fetchPhotosForFeed: function(followingUserIds){
    $.ajax({
      url: "api/photos/",
      type: 'GET',
      dataType: 'json',
      data: {user_id: followingUserIds},
      success: function (data) {
        ApiActions.receiveFeedPhotos(data);
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

  fetchUserInfo: function(username, callback) {
    $.ajax({
      url: '/api/users/',
      type: 'GET',
      dataType: 'json',
      data: {username: username},
      success: function(userdata){
        callback && callback(userdata[0]);
      }
    });
  },

  createUser: function(userinfo, callback) {
    $.ajax({
      url:'/api/users/',
      type: 'POST',
      dataType: 'json',
      data: {userinfo: userinfo},
      success: function(user){
        callback && callback();
      }
    })
  },

  updateUserInfo: function(id, nameAndBio) {
    $.ajax({
      url: '/api/users/' + id,
      type: 'PATCH',
      dataType: 'json',
      data: nameAndBio,
      success: function(userdata){
      }
    });
  },

  updateUserAvatar: function(id, formData) {
    $.ajax({
      url: '/api/users/' + id,
      type: 'PATCH',
      processData: false,
      contentType: false,
      dataType: 'json',
      data: formData,
      success: function(userdata){
      }
    });
  },

  deleteFollow: function(id) {
    $.ajax({
      url: '/api/follows/' + id,
      type: 'DELETE',
      dataType:'json',
      success: function() {
        SessionsApiUtil.fetchCurrentUser();
      }
    });
  },

  createFollow: function(userId, followerId) {
    $.ajax({
      url: '/api/follows/',
      type: 'POST',
      dataType: 'json',
      data: {user_id: userId, follower_id: followerId},
      success: function() {
        SessionsApiUtil.fetchCurrentUser();
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

  createLikeFromNewsfeed: function(data, followedUserIds, callback){
    $.ajax({
      url:'/api/likes',
      type: 'POST',
      dataType: 'json',
      data: data,
      success: function(like) {
        ApiUtil.fetchPhotosForFeed(followedUserIds);
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

  deleteLikeFromNewsfeed: function(likeid, followedUserIds, callback){
    $.ajax({
      url:'/api/likes/' + likeid,
      type: 'DELETE',
      dataType: 'json',
      success: function(like) {
        ApiUtil.fetchPhotosForFeed(followedUserIds);
        callback && callback();
        // LikeActions.receiveLike(like);
      }
    });
  },

  deleteLikeFromUserpage: function(likeid, username, callback){
    $.ajax({
      url:'/api/likes/' + likeid,
      type: 'DELETE',
      dataType: 'json',
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

  createPhotoCommentFromNewsfeed: function(commentdata, followedUserIds){
    $.ajax({
      url: 'api/comments',
      type: 'POST',
      dataType: 'json',
      data: commentdata,
      success: function(data) {
        // CommentActions.createPhotoComment(data);
        ApiUtil.fetchPhotosForFeed(followedUserIds);
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

  deletePhotoCommentFromNewsfeed: function(commentid, followedUserIds){
    $.ajax({
      url: 'api/comments/' + commentid,
      type: 'DELETE',
      dataType: 'json',
      data: {id: commentid},
      success: function(data) {
        ApiUtil.fetchPhotosForFeed(followedUserIds);
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
