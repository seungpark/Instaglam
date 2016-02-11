(function(root) {
  root.PhotoForm = React.createClass({

    mixins: [ReactRouter.History],

    getInitialState: function() {
      return { title: "", caption: "", imageUrl: "", imageFile: null, tags: "", uploading: false};
    },

    render: function() {
      var image;
      if (this.state.uploading) {
        image = assets.uploading_image;
        return (
          <div className="photo-form group">
            <h2>New Photo</h2>
            <h4>Please wait...</h4>
            <img className="state" src={image}/>
          </div>
        );
      } else {
        return (
          <div className="photo-form group">
            <h2>New Photo</h2>
            <form className="add-photo-form" onSubmit={this.handleSubmit}>

                <input type="text" onChange={this.changeTitle} placeholder="Title" value={this.state.title} />
                <input type="text" onChange={this.changeCaption} placeholder="Caption" value={this.state.caption} />
                <input type="text" onChange={this.changeTags} placeholder="Tags" />
                <input type="file" className="file" onChange={this.changeFile}/>
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
      if (this.state.title.length === 0 || typeof this.state.imageFile === "undefined") {
        if (typeof $("#error")[0] === "undefined") {
          $(".add-photo-form").append("<div id='error'>Title and Image are required</div>");
        }
        return;
      }
      this.setState({uploading: true});

      var title = this.state.title;
      var caption = this.state.caption;
      var userid = CurrentUserStore.currentUser().id;
      var file = this.state.imageFile;
      var tags = this.state.tags.split(/[ ,#]+/);
      tags = _.unique(tags).filter( function (tag) {
        return tag.length > 0;
      });

      var formData = new FormData();
      formData.append("photo[title]", title);
      formData.append("photo[caption]", caption);
      formData.append("photo[user_id]", userid);
      formData.append("photo[image]", file);
      formData.append("photo[tags]", tags);

      ApiUtil.createPhoto(formData, this.redirectUserPage);
    },

    redirectUserPage: function() {
      this.history.pushState(null, "/" + CurrentUserStore.currentUser().username);
    }
  });
})(this);
