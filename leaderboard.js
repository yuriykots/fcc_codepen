///1. Element Person: image, name, points in 30 days, all points.

///2. Board. Sorted by number. Sorted by most amount of points.

///I need to grab all data and put it in state or props, or separeate element.

var App = React.createClass({

  render: function(){
    return (
    <div> <Board source="https://fcctop100.herokuapp.com/api/fccusers/top/recent"/> </div>
    );
  }
});




var Board = React.createClass({
getInitialState: function() {
    return {
      users: [],
    };
},

 componentWillMount() {
    $.get(this.props.source, function(data, status) {
      var sorted = data.sort(function(a, b) {
        if(a.alltime > b.alltime) return -1;
        if(a.alltime <
           b.alltime) return 1;
        return 0;
    })
      this.setState({ users: sorted });
    }.bind(this));
  },

render: function() {
   // {console.log(this.state)}
    return (
      <div>
      {this.state.users.map(function(user) {
          return <div>
            <div className ="row">
              <div className="col-md-3">{user.username}</div>
              <div className="col-md-3">{user.alltime}</div>
              <div className="col-md-3">{user.recent}</div>
            </div>
          </div>
          })
        }
       </div>
    );
  }
});


ReactDOM.render(<App/>, document.getElementById('app'));
