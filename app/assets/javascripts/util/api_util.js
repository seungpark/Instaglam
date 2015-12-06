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

  fetchPhotosForTag: function(tagid) {
    $.ajax({
      url: "api/photos/",
      type: 'GET',
      dataType: 'json',
      data: {tags: tagid},
      success: function(data) {
        ApiActions.receieveTagPhotos(data);
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

  editPhoto: function(photoid, formData, callback) {
    $.ajax({
      url: '/api/photos/' + photoid,
      type: 'PATCH',
      dataType: 'json',
      data: formData,
      success: function(photo) {
        PhotoActions.receivePhoto(photo);
        callback && callback();
      }
    });
  },

  deletePhoto: function(photoid, callback) {
    debugger
    $.ajax({
      url: '/api/photos/' + photoid,
      type: 'DELETE',
      success: function(photo) {
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
    pw = userinfo.password;
    $.ajax({
      url:'/api/users/',
      type: 'POST',
      dataType: 'json',
      data: {userinfo: userinfo},
      success: function(user){
        callback && callback();
        SessionsApiUtil.signin({
          username: user.username,
          password: pw
        });
      }
    });
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

  createLikeFromPhotoPage: function(data, photoid, callback){
    $.ajax({
      url:'/api/likes',
      type: 'POST',
      dataType:'json',
      data: data,
      success: function(like) {
        ApiUtil.getPhotoDetails(photoid, null);
        callback && callback();
      }
    });
  },

  createLikeFromTagPage: function(data, tagid, callback){
    $.ajax({
      url:'/api/likes',
      type: 'POST',
      dataType:'json',
      data: data,
      success: function(like) {
        ApiUtil.fetchPhotosForTag(tagid);
        callback && callback();
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

  deleteLikeFromPhotoPage: function(likeid, photoid, callback){
    $.ajax({
      url:'/api/likes/' + likeid,
      type: 'DELETE',
      dataType:'json',
      success: function(like) {
        callback && callback();
      }
    });
  },

  deleteLikeFromTagPage: function(likeid, tagid, callback){
    $.ajax({
      url:'/api/likes/' + likeid,
      type: 'DELETE',
      dataType:'json',
      success: function(like) {
        callback && callback();
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

  createPhotoCommentFromPhotoPage: function(data, photoId){
    $.ajax({
      url: 'api/comments',
      type: 'POST',
      dataType: 'json',
      data: data,
      success: function(data) {
        // CommentActions.createPhotoComment(data);
        ApiUtil.getPhotoDetails(photoId, null);
      }
    });
  },

  createPhotoCommentFromTagPage: function(data, tagid){
    $.ajax({
      url: 'api/comments',
      type: 'POST',
      dataType: 'json',
      data: data,
      success: function(data) {
        // CommentActions.createPhotoComment(data);
        ApiUtil.fetchPhotosForTag(tagid);
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
  },

  deletePhotoCommentFromPhotoPage: function(commentid, photoid){
    $.ajax({
      url: 'api/comments/' + commentid,
      type: 'DELETE',
      dataType: 'json',
      data: {id: commentid},
      success: function(data) {
        ApiUtil.getPhotoDetails(photoid);
      }
    });
  },

  deletePhotoCommentFromTagPage: function(commentid, tagid){

    $.ajax({
      url: 'api/comments/' + commentid,
      type: 'DELETE',
      dataType: 'json',
      data: {id: commentid},
      success: function(data) {
        ApiUtil.fetchPhotosForTag(tagid);
      }
    });
  },

  getPhotoDetails: function(photoid, callback){
    $.ajax({
      url: 'api/photos/' + photoid,
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        callback && callback(data);
        ApiActions.receivePhotoDetails(data);
      }
    });
  }

};
