var Header = React.createClass ({

  render: function(){
    debugger
    return (
      <div className="header-shell">
        <div className="header">

            <li><ReactRouter.Link to={"/"}>
              <span className="home-logo">Instaglam</span>
            </ReactRouter.Link></li>


        </div>
      </div>
    )
  }
});
