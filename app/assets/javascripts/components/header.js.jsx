(function(root) {
  root.Header = React.createClass ({

    mixins: [ReactRouter.History],

    render: function(){
      return (
        <div className="header-shell">
          <ul className="header-main group">
            <div className="header-logo">
              <ReactRouter.Link to={"/"}>
                <span className="home-logo">Instaglam</span>
              </ReactRouter.Link>
            </div>
              <HeaderUser/>
          </ul>
        </div>
      );
    }
  });
})(this);
