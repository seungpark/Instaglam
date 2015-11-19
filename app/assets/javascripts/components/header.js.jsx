var Header = React.createClass ({

  render: function(){
    return <div className="header-shell">
            <div className="header">
              <div className="header-nav">
              <ReactRouter.Link to={"/"}>
                <span className="home-logo">Instaglam</span>
              </ReactRouter.Link>
              </div>
            </div>
          </div>;
  }
});
