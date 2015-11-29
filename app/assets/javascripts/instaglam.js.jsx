$(function(){
  var root = document.getElementById('content');
  var RouteHandler = ReactRouter.RouteHandler;
  var Router = ReactRouter.Router;
  var Route = ReactRouter.Route;
  var IndexRoute = ReactRouter.IndexRoute;

  var App = React.createClass({

    mixins: [ReactRouter.History],

    getInitialState: function() {
      if (CurrentUserStore.currentUser()) {
        return { currentUser: CurrentUserStore.currentUser() };
      } else {
        return { currentUser: null };
      }
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
      if (!CurrentUserStore.isSignedIn()) {
        return (
          <div>
            <SessionForm/>
          </div>
        );
      } else {
        return (
            <div>
              <Header/>
              {this.props.children}
            </div>
        );
      }

    }
  });

  // var routes = ();
  // cant put <Route /> in here and feed it to React.render?
  var routes = (
    <Route path="/" component={App}>
      <IndexRoute component={FeedFilter} />
      <Route path="/signup" component={UserForm}/>
      <Route path="signin" component={SessionForm}/>
      <Route path="/newphoto" component={PhotoForm}/>
      <Route path="/editprofile" component={ProfileEdit}/>
      <Route path="/:username" component={UserPage}/>
    </Route>
  );

  React.render(<Router>{routes}</Router>, root);

})
