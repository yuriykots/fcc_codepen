///1. Element Person: image, name, points in 30 days, all points.

///2. Board. Sorted by number. Sorted by most amount of points.

///I need to grab all data and put it in state or props, or separeate element.

//Add two ajax function that will give as two array. Sort them and assign to two different values. Than create react element. And assing one array as a state. Add button that will fire a function that will change state to second array.
//var alltimeArray  = ["fuck","my","life"];
/*var array  = ["one","two","tree"];
var recentArray =  [{"username":"Beky", "alltime":500, "recent":264},
    {"username":"Monika", "alltime":365, "recent": 230},
    {"username":"Fibi", "alltime":150, "recent": 160}
];
var alltimeArray=  [{"username":"John", "alltime":500, "recent":32},
    {"username":"Karla", "alltime":365, "recent": 54},
    {"username":"Casey", "alltime":150, "recent": 80}
];*/
//var recent  = [{username: "Yuriy", alltime: 26, recent 305 }];
//var recent  = [{username: "Yuriy", alltime: 26, recent 305 }];
/*
  $.get("https://fcctop100.herokuapp.com/api/fccusers/top/recent", function(data, status) {
       recent = data.sort(function(a, b) {
       if(a.recent > b.recent) return -1;
       if(a.recent < b.recent) return 1;
       return 0;
       })
     });

  $.get("https://fcctop100.herokuapp.com/api/fccusers/top/recent", function(data, status) {
       alltime = data.sort(function(a, b) {
       if(a.alltime > b.alltime) return -1;
       if(a.alltime < b.alltime) return 1;
       return 0;
       })
     });
hello
*/
var App = React.createClass({

  getData(time) {
		$.ajax({
      url: this.props.url + time,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({scores: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url + time, status, err.toString());
      }.bind(this)
    });
	}


      getInitialState: function() {
            return {
              list: alltimeArray,
            };
      },

   changeList(){
        this.state.list = recentArray;
      },

  changeTitle(title){
    this.setState({title});
    },


      render: function(){
            return (
            <div>
                <Board changeList={this.changeList.bind(this)} changeTitle={this.changeTitle.bind(this)} list={this.state.list}/>
             </div>
            );
       }
});

var Board = React.createClass({

      onChange(e) {
        console.log("button is clicked")
        console.log(this.props)
        this.props.changeTitle("Hello fuck")
        this.props.changeList();
      },

       render: function() {
        //{console.log("button is clicked")}
        return (

          <div>
            <h3> Free Code Camp Leader Board </h3>
            <button onClick={this.onChange} > button </button>
              {this.props.list.map(function(user) {
              return <div>
                <div className ="row">
                  <div className="col-md-3">{user}</div>
                  <div className="col-md-3">{user}</div>
                  <div className="col-md-3">{user}</div>
                </div>
              </div>
              //user.username
              //user.recent
              //user.top
              })
            }
           </div>
        );
      }
});


ReactDOM.render(<App/>, document.getElementById('app'));
