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
               <h1> Game of Thrones.  {this.props.data.speeds.slow.name}</h1>
                <Board gridSize={this.props.data.gridSize} speeds={this.props.data.speeds} />
          </div>
		);
	}
}

class Board extends React.Component {
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

 componentWillMount(){
    let board = this.state.board;
    board.grid = this.generateGrid();
    this.setState ({
      board: board
    });
  }

  cellClick(event){
		const position = event.split(","),
					x = parseInt(position[0]),
					y = parseInt(position[1]);
		let board = {...this.state.board};
		board.grid[y].cells[x].status = "alive";
		this.setState({board: board});
	}


 //  <div className="Cell" onClick={() => props.cellClick(props.id)}> </div>
  generateGrid() {
   let height = 30,
		   width = 50,
		   grid = [];

	for (let r=0; r<height; r++) {
			grid.push({
				id: "row_" + r,
				cells: []
			});

   for (let p=0; p<width; p++) {

   let  neigbours = [[p-1, r-1], [p, r-1], [p+1, r-1], [p-1, r], [p+1, r], [p-1, r+1], [p, r+1], [p+1, r+1]];
   let wrappedNeigbours = neigbours.map(function(neigbour) {
                 let r =  neigbour[1];
                 let p = neigbour[0];

                 if (r < 0) {
                   r = height-1
                 } else if ( r > height-1){
                   r = 0
                 };

                  if(p < 0){
                    p = width-1
                  } else if ( p > width-1){
                    p = 0
                  }

                   return [p,r]
              });


	let cell = {
		id: p + "," + r,
		pos: [p, r],
		neighbours: wrappedNeigbours,
		status: "dead"
		}
			grid[r].cells.push(cell);
			}
		}

  return grid;
    conosole.log("next is grid");
    console.log(grid)
	}

  render() {
    console.log(this.state.board.grid)
    let grid = this.state.board.grid.map(function(row) {
      return <Row cells={row.cells} key={row.id}/>
    });

    return (
    <div className = "Box">
    {grid}
    </div>
    );
  }
}

class Row extends React.Component {
  render(){
    let cells = this.props.cells.map(function(cell){
      return <Cell/>
    })
    //console.log("cells next")
    //console.log(cells)
    return (
    <div className="Row">
        {cells}
    </div>
    )
  }
}

function Cell (props) {
    return (
      <div className="Cell" onClick={props.cellCLick}> </div>
    )
}


ReactDOM.render(<App data={values}/>, document.getElementById('app'));


// function that change cell status
