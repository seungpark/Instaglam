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
      CurrentUserStore.addChangeHandler(this._clickListeners);
    },

    _clickListeners: function() {
      if ( CurrentUserStore.currentUser().id ) {

      $(document).click( function(){
        searchinput = $('.search-input');
        usernavclass = $('.header-user-nav')[0].className;

        if (searchinput.val() && (event.target !== searchinput[0])) {
          searchinput.val("");
          SearchResultsStore._reset();
          return;
        }

        if (
          event.target.className !== usernavclass &&
          event.target.className !== 'menu-button' &&
          !usernavclass.includes("hide")
        ) {
          $('.header-user-nav').addClass("hide");
          return;
        }
      });
    } else {
      $(document).unbind('click');
    }

    },

    _ensureSignedIn: function() {
      if (
        !CurrentUserStore.isSignedIn() &&
        (this.props.location.pathname !== "/signin" ||
        this.props.location.pathname !== "/signup")
      ) {
        this.history.pushState(null, "/signin");
      }

      this.setState({ currentUser: CurrentUserStore.currentUser() });
    },


    render: function(){
      if (this.props.location.pathname === "/signup") {
        return (
          <div>
            <UserForm/>
          </div>
        );
      }
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
      <Route path="search" component={Search} />
      <Route path="/photos/:photoid" component={PhotoPage}/>
      <Route path="/photos/:photoid/edit" component={PhotoEdit}/>
      <Route path="/tags/:tagid" component={TagPage}/>
      <Route path="/:username" component={UserPage}/>
    </Route>
  );

  React.render(<Router>{routes}</Router>, root);

});
