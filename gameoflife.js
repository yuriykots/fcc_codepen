const values = {
  "gridSize" : {
           "small" : {
              "name": "small",
              "height": 30,
              "width": 50
            },
            "medium" : {
              "name": "small",
              "height": 50,
              "width": 70
            },
            "large" : {
              "name": "Large",
              "height": 80,
              "width": 100
            }
   },
  "speeds" :{
              "slow":{
                "speed": 3000,
                "name": "Slow"
              },
               "medium":{
                 "speed": 2000,
                 "name":  "Medium"
                 },
               "fast":{
                 "speed": 1000,
                 "name": "Fast"
              }
  }
}


class App extends React.Component {

  render() {
		return (
           <div>
                <h1> My speed is ... {this.props.data.speeds.slow.name}</h1>
                <GameBoard gridSize={this.props.data.gridSize} speeds={this.props.data.speeds} />
          </div>
		);
	}
}

class GameBoard extends React.Component {



  render() {
    return (
    <h1> Board is in this element. Yahho </h1>
    );
  }
}


ReactDOM.render(<App data={values}/>, document.getElementById('app'));
