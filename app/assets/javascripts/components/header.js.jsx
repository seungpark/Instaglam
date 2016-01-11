(function(root) {
  root.Header = React.createClass ({

    mixins: [ReactRouter.History],

    render: function(){
      return (
        <div className="header-shell">
          <ul className="header-main">
            <div className="header-logo">
              <ReactRouter.Link to={"/"}>
                <span className="home-logo" onClick={window.scrollTo(0,0)} >Instaglam</span>
              </ReactRouter.Link>
            </div>
              <Search/>
              <HeaderUser/>
          </ul>
        </div>
      );
    }
  });
})(this);
