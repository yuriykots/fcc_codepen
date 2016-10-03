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
  constructor(props){
    super(props);
    this.state = {
      running: false,
      generations: 0,
      speed:  "medium",
      board: {
        size: "medium",
        height:  props.gridSize.medium.heigh,
        width: props.gridSize.medium.width
      }
    };
  }

generateGrid(board, type) {
  let height = board.height,
			width = board.width,
			grid = [];

	for (let i=0; i<height; i++) {
			grid.push({
				id: "row_" + i,
				cells: []
			});

   for (let p=0; p<width; p++) {
				let status = type === "random" ? this.randomSetUp() : "dead";
				let cell = {
					id: p + "," + i,
					pos: [p, i],
					neighbours: [[p-1, i-1], [p, i-1], [p+1, i-1], [p-1, i], [p+1, i], [p-1, i+1], [p, i+1], [p+1, i+1]],
					status: status
				}
				grid[i].cells.push(cell);
			}
		}
		return grid;
	}


  render() {
    return (
    <h1> Board is in this element. Yahho </h1>
    );
  }
}


ReactDOM.render(<App data={values}/>, document.getElementById('app'));
