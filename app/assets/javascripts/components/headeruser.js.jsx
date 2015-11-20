(function(root) {
  root.Header = React.createClass({

    getInitialState: function () {
      return {
        currentUser: CurrentUserStore.currentUser()
      };
    },

    componentDidMount: function () {
      CurrentUserStore.addChangeHandler(this._onChange)
    },

    _onChange: function () {
      this.setState({currentUser: CurrentUserStore.currentUser()});
    },

    signout: function () {
      SessionsApiUtil.signout();
    },

    render: function() {
      if (CurrentUserStore.isSignedIn()) {
        return (
          <div>
            { this.state.currentUser.username }
            <button onClick={ this.signout }>Sign Out!</button>
          </div>
        );
      } else {
        return (
          <div>
            <a href="#/signin">Sign In!</a>
          </div>
        );
      }

    },

  })
})(this);
