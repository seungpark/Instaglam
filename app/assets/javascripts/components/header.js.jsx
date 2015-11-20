(function(root) {
  root.Header = React.createClass ({

    render: function(){
      debugger
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
