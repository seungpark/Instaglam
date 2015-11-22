(function(root) {
  root.Header = React.createClass ({

    mixins: [ReactRouter.History],

    render: function(){
      return (
        <div className="header-shell">
          <div className="header-logo">
            <ReactRouter.Link to={"/"}>
              <span className="home-logo">Instaglam</span>
            </ReactRouter.Link>
          </div>
          <div className="header-user">
            <HeaderUser/>
          </div>
        </div>
      )
    }
  });
})(this);
