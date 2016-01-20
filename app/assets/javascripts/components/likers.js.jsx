(function (root) {

  Likers = React.createClass ({

    componentDidMount: function() {
      $("#content").not(".likers-list user").on("click", this._closeModal);
    },

    _closeModal: function (e) {
      if (e.target.classList[0] !== "likers-list" &&
        e.target.parentElement.classList[0] !== "likers-list"
      ) {
        e.preventDefault();
        this.props.callback();
      }
    },

    componentWillUnmount: function() {
      $("#content").off("click", this._closeModal);
    },

    render: function () {
      return (
        <div className="likers-list" id="likers-list" >
          <h3 className="likers-list heading"> Likes </h3>
          {this.props.likes.map (function (like) {
            var avatar = like.user.avatar;
            if (avatar === "missingavatar.png") {
              avatar = assets.missing_avatar;
            }
            return (
              <li><a href={"#/" + like.user.username} className="likers-list user">
                <img src={avatar} className="likers-list avatar"/>
                {like.user.username}
              </a></li>
            );
          })}
        </div>
      );
    }

  });

})(this);
