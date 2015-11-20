(function(root) {

  root.PhotoForm = React.createClass({

    _changeTitle: function(e) {
      this.setState({ title: e.currentTarget.value });
    },

    getInitialState: function() {
      return {photo_id: null, title: "", caption: "", imageUrl: "", imageFile: null };
    },

    render: function() {
      <div>


      </div>

    }

  });

})(this);
