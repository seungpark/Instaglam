$(function(){
  var root = document.getElementById('content');
  var RouteHandler = ReactRouter.RouteHandler;
  var Router = ReactRouter.Router;
  var Route = ReactRouter.Route;
  var IndexRoute = ReactRouter.IndexRoute;

  var App = React.createClass({

    mixins: [ReactRouter.History],

    getInitialState: function() {
      return { currentUser: null };
    },

    componentWillMount: function() {
      CurrentUserStore.addChangeHandler(this._ensureSignedIn);
      SessionsApiUtil.fetchCurrentUser();
    },

    _ensureSignedIn: function() {
      if (!CurrentUserStore.isSignedIn()) {
        this.history.pushState(null, "/signin");
      }

      this.setState({ currentUser: CurrentUserStore.currentUser() });
    },


    render: function(){
      if (!this.state.currentUser) {
        return (
          <div>
            <SessionForm/>
          </div>
        );
      }

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
        <Route path="signin" component={ SessionForm}/>
        <Route path="/:username" component={UserPage}/>
        <Route path="/postnewphoto" component={PhotoForm}/>
      </Route>
    </Router>,
    root
  )
});
