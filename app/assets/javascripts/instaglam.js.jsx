$(function(){
  var root = document.getElementById('content');
  var RouteHandler = ReactRouter.RouteHandler;
  var Router = ReactRouter.Router;
  var Route = ReactRouter.Route;
  var IndexRoute = ReactRouter.IndexRoute;
  var App = React.createClass({
    render: function(){
      debugger;
      return (
          <div>
            <header><h1>Instaglam</h1></header>
            {this.props.children}
          </div>
      );
    }
  });
  React.render(
    <Router>
      <Route path="/" component={App}>
        <IndexRoute component={FeedFilter}/>
      </Route>
    </Router>,
    root
  )
});
