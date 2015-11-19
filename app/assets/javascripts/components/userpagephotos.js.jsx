(function(root) {

  root.UserPagePhotos = React.createClass({

    render: function() {
      return(
        <div className="userpage-photos-list">
        <ul className="photos-list">
          <li>{Photo}</li>
        </ul>
        </div>
      )
    }

  });
})(this);
