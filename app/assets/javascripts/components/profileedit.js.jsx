(function(root) {

  root.ProfileEdit = React.createClass({

    mixins: [ReactRouter.History],

    getInitialState: function() {
      return {user: CurrentUserStore.currentUser(),
              avatarUrl: CurrentUserStore.currentUser().avatar_url,
              avatarFile: null,
              name: CurrentUserStore.currentUser().name,
              bio: CurrentUserStore.currentUser().bio
      };
    },

    _handleBioSubmit: function(e) {
      e.preventDefault();
      var nameAndBio = $(e.currentTarget).serializeJSON();
      ApiUtil.updateUserInfo(this.state.user.id, nameAndBio);
      this.history.pushState(null, "/" + this.state.user.username);
    },

    _handleAvatarSubmit: function(e) {
      e.preventDefault();
      var file = this.state.avatarFile;
      var formData = new FormData();
      formData.append("user[avatar]", file);

      ApiUtil.updateUserAvatar(this.state.user.id, formData);
      this.history.pushState(null, "/" + this.state.user.username);
    },

    _changeName: function(e) {
      e.preventDefault();
      this.setState({ name: e.currentTarget.value });
    },

    _changeBio: function(e) {
      e.preventDefault();
      this.setState({ bio: e.currentTarget.value });
    },

    _changeFile: function(e) {
      e.preventDefault();
      var reader = new FileReader();
      var file = e.currentTarget.files[0];
      var that = this;

      reader.onloadend = function() {
        that.setState({ avatarUrl: reader.result, avatarFile: file });
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    },

    // componentWillMount: function () {
    //   this.setState({
    //     user: CurrentUserStore.currentUser(),
    //     avatarUrl: CurrentUserStore.currentUser().avatar_url,
    //     avatarFile: null,
    //     name: CurrentUserStore.currentUser().name,
    //     bio: CurrentUserStore.currentUser().bio
    //   });
    // },

    render: function () {
      return (
        <div className="edit-page">
        <div className="profile-edit group">
          <h1>Edit Profile</h1>
          <div className="profile-edit-container">
            <form className="profile-edit-form" onSubmit={this._handleBioSubmit}>
              <label className="username">
                {CurrentUserStore.currentUser().username}
              </label>
              <label>
                Name
                <input type="text" name="name" value={this.state.name} onChange={this._changeName}></input>
              </label>
              <label>
                Bio
                <input type="text" name="bio" value={this.state.bio} onChange={this._changeBio}></input>
              </label>
              <button>Update Profile</button>
            </form>
          </div>
          <div className="avatar-edit-container">
            <form className="avatar-edit-form" onSubmit={this._handleAvatarSubmit}>
              <img className="avatar-edit-image" src={this.state.avatarUrl}/>
              <input type="file" onChange={this._changeFile} />
              <button>Change Avatar</button>
            </form>
          </div>
        </div>
        </div>
      );
    }

  });

})(this);
