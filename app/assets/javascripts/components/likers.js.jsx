(function (root) {

  Likers = React.createClass ({

    componentDidMount: function() {
      $("#content").not(".likers-list user").on("click", this._closeModal);
    },

    _closeModal: function (e) {
      if (e.target.classList[0] !== "likers-list") {
        e.preventDefault();
        this.props.callback();
      }
    },

    componentWillUnmount: function() {
      $("#content").off("click", this._closeModal);
    },

    render: function () {
      return (
        <div className="likers-list" id="likers-list" style={{opacity: '1'}}>
          <h3 className="likers-list heading"> Likes </h3>
          {this.props.likers.map (function (liker) {
            return (
              <li><a href={"#/" + liker} className="likers-list user">{liker}</a></li>
            );
          })}
        </div>
      );
    }

  });

})(this);
