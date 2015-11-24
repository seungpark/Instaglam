(function(root) {

  root.UserPageIndex = React.createClass({

    mixins: [ReactRouter.History],

    render: function() {
      return(
        <div className="userphotos-index">
        <ul className="userphotos-index-ul">
          {this.props.photos.map(function (photo) {
            return <IndexPhoto
              photo={photo}
              key={photo.id}
              source={"userpage"}
              />
          }.bind(this))}
        </ul>
        </div>
      )
    }

  });
})(this);
