(function(root) {
  root.PhotoForm = React.createClass({

    mixins: [ReactRouter.History],

    getInitialState: function() {
      return { title: "", caption: "", imageUrl: "", imageFile: null, tags: "", uploading: false, uploaded: false};
    },

    render: function() {
      var image;
      if (this.state.uploaded) {
        image = assets.uploaded_image;
        return (
          <div className="photo-form group">
            <h2>New Photo</h2>
            <img src={image}/>
            <h4>Photo Uploaded!</h4>
            <ReactRouter.Link to={"/" + CurrentUserStore.currentUser().username}>
              Check Your Page!
            </ReactRouter.Link>
          </div>
        );

      } else if (this.state.uploading) {
        image = assets.uploading_image;
        return (
          <div className="photo-form group">
            <h2>New Photo</h2>
            <h3>Please wait...</h3>
            <img src={image}/>
          </div>
        );

      } else {
        return (
          <div className="photo-form group">
            <h2>New Photo</h2>
            <form onSubmit={this.handleSubmit}>
              <label>Title
                <input type="text" onChange={this.changeTitle} value={this.state.title} />
              </label>
              <label>Caption
                <input type="text" onChange={this.changeCaption} value={this.state.caption} />
              </label>
              <label>Tags
                <input type="text" onChange={this.changeTags} />
              </label>
                <input type="file" onChange={this.changeFile} />
              <button>Submit</button>
            </form>
            <img className="preview-image" src={this.state.imageUrl} />
          </div>
        );
      }

    },

    changeTitle: function(e) {
      e.preventDefault();
      this.setState({ title: e.currentTarget.value });
    },

    changeCaption: function(e) {
      e.preventDefault();
      this.setState({ caption: e.currentTarget.value });
    },

    changeTags: function(e){
      e.preventDefault();
      this.setState({ tags: e.currentTarget.value });
    },

    changeFile: function(e) {
      var reader = new FileReader();
      var file = e.currentTarget.files[0];
      var that = this;

      reader.onloadend = function() {
        that.setState({ imageUrl: reader.result, imageFile: file });
      };

      if (file) {
        reader.readAsDataURL(file);
      } else {
        this.setState({ imageUrl: "", imageFile: null });
      }
    },

    handleSubmit: function(e) {
      e.preventDefault();
      this.setState({uploading: true});

      var title = this.state.title;
      var caption = this.state.caption;
      var userid = CurrentUserStore.currentUser().id;
      var file = this.state.imageFile;
      var tags = this.state.tags.split(/[ ,#]+/);

      var formData = new FormData();
      formData.append("photo[title]", title);
      formData.append("photo[caption]", caption);
      formData.append("photo[user_id]", userid);
      formData.append("photo[image]", file);
      formData.append("photo[tags]", tags);

      ApiUtil.createPhoto(formData, this.resetForm);
    },

    resetForm: function() {
      this.setState({ title: "", caption: "", imageUrl: "", imageFile: null, tags: "", uploading: false, uploaded: true });
    }
  });
})(this);
