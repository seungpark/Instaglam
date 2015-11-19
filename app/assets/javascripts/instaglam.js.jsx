$(function(){
  var root = document.getElementById('content');
  var RouteHandler = ReactRouter.RouteHandler;
  var Router = ReactRouter.Router;
  var Route = ReactRouter.Route;
  var IndexRoute = ReactRouter.IndexRoute;
  var App = React.createClass({
    render: function(){
      return (
          <div>
            <Header/>
            {this.props.children}
          </div>
      );
    }
  });

  // var routes = ();
  // cant put <Route /> in here and feed it to React.render?


  React.render(
    <Router>
      <Route path="/" component={App}>
        <IndexRoute component={FeedFilter}/>
        <Route path="/users/:username" component={UserPage}/>
      </Route>
    </Router>,
    root
  )
});
