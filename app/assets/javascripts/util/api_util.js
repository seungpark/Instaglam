ApiUtil = {
  fetchPhotosForFeed: function(followingUserIds, pagenum){
    $.ajax({
      url: "api/photos/",
      type: 'GET',
      dataType: 'json',
      data: {user_id: followingUserIds, page:pagenum},
      success: function (data) {
        ApiActions.receiveFeedPhotos(data);
      }
    });
  },

  fetchNextPhotosForFeed: function(followingUserIds, pagenum, success, end) {
    $.ajax({
      url: "api/photos/",
      type: 'GET',
      dataType: 'json',
      data: {user_id: followingUserIds, page:pagenum},
      success: function(data){
        ApiActions.receiveNextFeedPhotos(data);
        if (data.length < 6){
          end && end();
        }
        success && success();
      }
    });
  },

  fetchPhotosForTag: function(tagid, pagenum, end) {
    $.ajax({
      url: "api/photos/",
      type: 'GET',
      dataType: 'json',
      data: {tags: tagid, page: pagenum},
      success: function(data) {
        if (data.length < 6) {
          end && end();
        }
        ApiActions.receieveTagPhotos(data);
      }
    });
  },

  fetchNextPhotosForTagPage: function(tagid, pagenum, success, end){
    $.ajax({
      url: "api/photos/",
      type: 'GET',
      dataType: 'json',
      data: {tags: tagid, page:pagenum},
      success: function(data){
        ApiActions.receiveNextFeedPhotos(data);
        if (data.length < 6){
          end && end();
        }
        success && success();
      }
    });
  },

  fetchTagName: function(tagid, success) {
    $.ajax({
      url: 'api/tags/' + tagid,
      type: 'GET',
      success: function(data) {
        success && success(data.name);
      }
    });
  },

  fetchUserPhotos: function(username, pagenum, end){
    $.ajax({
      url: "api/photos/",
      type: 'GET',
      dataType: 'json',
      data: {username: username, page: pagenum},
      success: function(data) {
        ApiActions.receiveUserPhotos(data);
        if (data.length < 6){
          end && end();
        }
      }
    });
  },

  fetchNextPhotosForUserPage: function(username, pagenum, success, end) {
    $.ajax({
      url: "api/photos/",
      type: 'GET',
      dataType: 'json',
      data: {username: username, page:pagenum},
      success: function(data){
        ApiActions.receiveNextUserPhotos(data);
        if (data.length < 6){
          end && end();
        }
        success && success();
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
        ApiActions.receivePhotoDetails(photo);
        callback && callback();
      }
    });
  },

  deletePhoto: function(photoid, callback) {
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
      success: function(){
        SessionsApiUtil.fetchCurrentUser();
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
      success: function(){
        SessionsApiUtil.fetchCurrentUser();
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

  createLike: function(data, callback, photoid){
    $.ajax({
      url: '/api/likes',
      type: 'POST',
      dataType: 'json',
      data: data,
      success: function(data) {
        callback && callback();
        ApiActions.addLike(data, photoid);
      }
    });
  },

  deleteLike: function(likeid, callback, photoid){
    $.ajax({
      url: '/api/likes/' + likeid,
      type: 'DELETE',
      dataType: 'json',
      success: function() {
        callback && callback();
        ApiActions.deleteLike(likeid, photoid);
      }
    });
  },

  checkLike: function(likeid){
    $.ajax({
      url: 'api/likes/' + likeid,
      type: 'PATCH',
      dataType: 'json',
      data: {checked: true},
      success: function () {
      }
    });
  },

  //
  // createLikeFromNewsfeed: function(data, followedUserIds, callback){
  //   $.ajax({
  //     url:'/api/likes',
  //     type: 'POST',
  //     dataType: 'json',
  //     data: data,
  //     success: function(like) {
  //       ApiUtil.fetchPhotosForFeed(followedUserIds);
  //       callback && callback();
  //       // LikeActions.receiveLike(like);
  //     }
  //   });
  // },
  //
  // createLikeFromUserpage: function(data, username, callback){
  //   $.ajax({
  //     url:'/api/likes',
  //     type: 'POST',
  //     dataType: 'json',
  //     data: data,
  //     success: function(like) {
  //       ApiUtil.fetchUserPhotos(username);
  //       callback && callback();
  //       // LikeActions.receiveLike(like);
  //     }
  //   });
  // },
  //
  // createLikeFromPhotoPage: function(data, photoid, callback){
  //   $.ajax({
  //     url:'/api/likes',
  //     type: 'POST',
  //     dataType:'json',
  //     data: data,
  //     success: function(like) {
  //       ApiUtil.getPhotoDetails(photoid, null);
  //       callback && callback();
  //     }
  //   });
  // },
  //
  // createLikeFromTagPage: function(data, tagid, callback){
  //   $.ajax({
  //     url:'/api/likes',
  //     type: 'POST',
  //     dataType:'json',
  //     data: data,
  //     success: function(like) {
  //       ApiUtil.fetchPhotosForTag(tagid);
  //       callback && callback();
  //     }
  //   });
  // },
  //
  // deleteLikeFromNewsfeed: function(likeid, followedUserIds, callback){
  //   $.ajax({
  //     url:'/api/likes/' + likeid,
  //     type: 'DELETE',
  //     dataType: 'json',
  //     success: function(like) {
  //       ApiUtil.fetchPhotosForFeed(followedUserIds);
  //       callback && callback();
  //       // LikeActions.receiveLike(like);
  //     }
  //   });
  // },
  //
  // deleteLikeFromUserpage: function(likeid, username, callback){
  //   $.ajax({
  //     url:'/api/likes/' + likeid,
  //     type: 'DELETE',
  //     dataType: 'json',
  //     success: function(like) {
  //       ApiUtil.fetchUserPhotos(username);
  //       callback && callback();
  //       // LikeActions.receiveLike(like);
  //     }
  //   });
  // },
  //
  // deleteLikeFromPhotoPage: function(likeid, photoid, callback){
  //   $.ajax({
  //     url:'/api/likes/' + likeid,
  //     type: 'DELETE',
  //     dataType:'json',
  //     success: function(like) {
  //       callback && callback();
  //     }
  //   });
  // },
  //
  // deleteLikeFromTagPage: function(likeid, tagid, callback){
  //   $.ajax({
  //     url:'/api/likes/' + likeid,
  //     type: 'DELETE',
  //     dataType:'json',
  //     success: function(like) {
  //       callback && callback();
  //     }
  //   });
  // },
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

  addComment: function (commentdata, photoid, success) {
    $.ajax({
      url: '/api/comments',
      type: 'POST',
      dataType: 'json',
      data: commentdata,
      success: function(data) {
        ApiActions.addComment(data, photoid);
        success && success();
      }
    });
  },

  deleteComment: function(commentid, photoid, success) {
    $.ajax({
      url: '/api/comments/' + commentid,
      type: 'DELETE',
      dataType: 'json',
      success: function() {
        ApiActions.deleteComment(commentid, photoid);
        success && success(commentid);
      }
    });
  },

  checkComment: function(commentid){
    $.ajax({
      url: 'api/comments/' + commentid,
      type: 'PATCH',
      dataType: 'json',
      data: {checked: true},
      success: function () {
      }
    });
  },
  //
  // createPhotoCommentFromNewsfeed: function(commentdata, followedUserIds){
  //   $.ajax({
  //     url: 'api/comments',
  //     type: 'POST',
  //     dataType: 'json',
  //     data: commentdata,
  //     success: function(data) {
  //       // CommentActions.createPhotoComment(data);
  //       ApiUtil.fetchPhotosForFeed(followedUserIds);
  //     }
  //   });
  // },
  //
  // createPhotoCommentFromUserpage: function(commentdata){
  //   var username = commentdata.user;
  //   $.ajax({
  //     url: 'api/comments',
  //     type: 'POST',
  //     dataType: 'json',
  //     data: commentdata,
  //     success: function(data) {
  //       // CommentActions.createPhotoComment(data);
  //       ApiUtil.fetchUserPhotos(username);
  //     }
  //   });
  // },
  //
  // createPhotoCommentFromPhotoPage: function(data, photoId){
  //   $.ajax({
  //     url: 'api/comments',
  //     type: 'POST',
  //     dataType: 'json',
  //     data: data,
  //     success: function(data) {
  //       // CommentActions.createPhotoComment(data);
  //       ApiUtil.getPhotoDetails(photoId, null);
  //     }
  //   });
  // },
  //
  // createPhotoCommentFromTagPage: function(data, tagid){
  //   $.ajax({
  //     url: 'api/comments',
  //     type: 'POST',
  //     dataType: 'json',
  //     data: data,
  //     success: function(data) {
  //       // CommentActions.createPhotoComment(data);
  //       ApiUtil.fetchPhotosForTag(tagid);
  //     }
  //   });
  // },
  //
  // deletePhotoCommentFromNewsfeed: function(commentid, followedUserIds){
  //   $.ajax({
  //     url: 'api/comments/' + commentid,
  //     type: 'DELETE',
  //     dataType: 'json',
  //     data: {id: commentid},
  //     success: function(data) {
  //       ApiUtil.fetchPhotosForFeed(followedUserIds);
  //     }
  //   });
  // },
  //
  // deletePhotoCommentFromUserpage: function(commentid, username){
  //   $.ajax({
  //     url: 'api/comments/' + commentid,
  //     type: 'DELETE',
  //     dataType: 'json',
  //     data: {id: commentid},
  //     success: function(data) {
  //       ApiUtil.fetchUserPhotos(username);
  //     }
  //   });
  // },
  //
  // deletePhotoCommentFromPhotoPage: function(commentid, photoid){
  //   $.ajax({
  //     url: 'api/comments/' + commentid,
  //     type: 'DELETE',
  //     dataType: 'json',
  //     data: {id: commentid},
  //     success: function(data) {
  //       ApiUtil.getPhotoDetails(photoid);
  //     }
  //   });
  // },
  //
  // deletePhotoCommentFromTagPage: function(commentid, tagid){
  //
  //   $.ajax({
  //     url: 'api/comments/' + commentid,
  //     type: 'DELETE',
  //     dataType: 'json',
  //     data: {id: commentid},
  //     success: function(data) {
  //       ApiUtil.fetchPhotosForTag(tagid);
  //     }
  //   });
  // },

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
  },

  search: function (query, page) {
    $.ajax({
      url: '/api/search',
      type: 'GET',
      dataType: 'json',
      data: {query: query, page: page},
      success: function (results) {
        SearchResultActions.receiveResults(results);
      }
    });
  }

};
