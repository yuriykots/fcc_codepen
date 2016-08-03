

        //1 LEADERBORD-Body
            //LEADERBOARD HEADING with buttons.
            //USER

var App = React.createClass({
   render: function() {
    return (
        <div>
        <Header/>
        <LeaderboardBody/>
        <Footer/>
        </div>
    );
  }
});

var Header = React.createClass({
   render: function() {
    return (
        <h3> Free Code Camp Leader Board </h3>
    );
  }
});

var Footer = React.createClass({
   render: function() {
    return (
        <h1>Footer</h1>
    );
  }
});

var User = React.createClass({
   render: function() {
    return (
        <tr>

         <td >{this.props.index} </td>
        <td > <img src={this.props.img} height="42" width="42"></img>
        <a href={"https://www.freecodecamp.com/"+this.props.username} target="_blank">{this.props.username}</a></td>

         <td >{this.props.alltime}</td>
         <td >{this.props.recent}</td>
        </tr>
    );
  }
});
var BoardHeading = React.createClass({
   render: function() {
    return (
      <div>
            <button onClick={this.props.onChange}> Top Recent </button>
            <button onClick={this.props.onChange2}> Top AllTime </button>
      </div>
    );
  }
});


var LeaderboardBody = React.createClass({

getInitialState: function() {
    return {
      list: []
    };
  },

  getAllTime() {
      this.serverRequest =  $.get("https://fcctop100.herokuapp.com/api/fccusers/top/alltime",  function (result) {
       var sorted = result.sort(function(a, b) {
       if(a.alltime > b.alltime) return -1;
       if(a.alltime < b.alltime) return 1;
       return 0;
       })
         this.setState({
          list: sorted
          });
        console.log(this.state.list);
      }.bind(this));
  },

    getRecent() {
      this.serverRequest =  $.get("https://fcctop100.herokuapp.com/api/fccusers/top/recent",  function (result) {
       var sorted = result.sort(function(a, b) {
       if(a.recent > b.recent) return -1;
       if(a.recent < b.recent) return 1;
       return 0;
       })
         this.setState({
          list: sorted
          });
        console.log(this.state.list);
      }.bind(this));
  },


  componentDidMount: function() {
      this.getAllTime();
  },

  onChange(e) {
        console.log("button is clicked");
        this.getRecent()
     },
  onChange2(e) {
        console.log("button is clicked");
        this.getAllTime()
     },

 render: function() {
    return (
          <div>
            <BoardHeading onChange={this.onChange} onChange2={this.onChange2}/>
         {this.state.list.map(function(user, index) {
             return <div>
   <User username={user.username} index={index+1} alltime={user.alltime} recent={user.recent} img={user.img}/>
            </div>

           </div>
    );
  }
});

var Board = React.createClass({



render: function() {

    return (
          <div>
            <h3> Free Code Camp Leader Board </h3>
           </div>
    );
  }
});


ReactDOM.render(<App/>, document.getElementById('app'));
