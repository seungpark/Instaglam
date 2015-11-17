var NewsFeed = React.createClass({

  getInitialState: function () {
    var userId = parseInt(this.props.params.userId);
    var user = this._findUserById(userId) || {} ;
    return { user: user };
  },

  render: function() {
    debugger;

  }

  // _findUserById: function (id) {
  //   var res;
  //    BenchStore.all().forEach(function (bench) {
  //     if (id == bench.id) {
  //       res = bench;
  //     }
  //   }.bind(this));
  //    return res;
  // },
  // componentDidMount: function () {
  //   BenchStore.addChangeListener(this._benchChanged);
  //   ApiUtil.fetchBenches();
  // },
  // _benchChanged: function () {
  //   var benchId = this.props.params.benchId;
  //   var bench = this._findBenchById(benchId);
  //   this.setState({ bench: bench });
  // },
  // render: function () {
  //   var benches = [];
  //   if (this.state.bench) {
  //     benches.push(this.state.bench);
  //   }
  //   var Link = ReactRouter.Link;
  //   var reviewURL = "/benches/" + this.state.bench.id + "/review";
  //
  //   return (
  //       <div>
  //         <Link to="/" >Back to Benches Index</Link>
  //         <Map className="half"
  //           singleBench={true}
  //           benches={benches}
  //           onMapClick={this.handleMapClick}
  //           onMarkerClick={this.handleMarkerClick} />
  //         <Bench bench={this.state.bench} className="half" />
  //         {
  //           this.props.children ||
  //             <Link to={reviewURL}>Leave a Review</Link>
  //         }
  //       </div>
  //     );
  // }
});
