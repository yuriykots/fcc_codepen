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
//<ControlPannel/>
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
    this.cellClick = this.cellClick.bind(this);
    this.state = {
      running: false,
      generations: 0,
      speed:  "medium",
      board: {
        size: "medium",
        height:  props.gridSize.medium.height,
        width: props.gridSize.medium.width
      }
    };
  };

componentWillMount(){
    let board = this.state.board;
    board.grid = this.generateGrid();
    this.setState ({
      board: board
    });
  };

 cellClick(event){
					var x = parseInt(event[0]),
					y = parseInt(event[1]);
           console.log(y);
	  let board2 = this.state.board;
    console.log(board2);
    if (board2.grid[y].cells[x].status === "dead"){
      board2.grid[y].cells[x].status = "alive";
    }
    else{
      board2.grid[y].cells[x].status = "dead"
    }

    console.log(board2.grid[y].cells[x]);
	  this.setState({
      board: board2
    });
	};

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
        }

  render() {
    return (
      <div className = "Box">
        {this.state.board.grid.map((row) => {
      return <Row cells={row.cells} key={row.id} cellClick={this.cellClick}/>
      })}
      <ControlPannel/>
      </div>
  );
  }
}








class Row extends React.Component {
  render(){
    return (
      <div className="Row">
        {this.props.cells.map((cell) => {
      return <Cell key={cell.id} test={"test"} pos={cell.pos} status={cell.status} cellClick={this.props.cellClick}/>
    })}
      </div>
    )
  }
}



//function Cell (props) {
class Cell extends React.Component {
     render(){
  const className = "Cell";
  const testName = "Cell" + this.props.status;
  //console.log(testName);
  return (
     // 1. bind(this)
    //  <div className="Cell" onClick={props.cellClick.bind(this, props.pos)}> </div>
    // 2. Arrow function
      <div className={testName} test={"test2"} onClick={() => this.props.cellClick(this.props.pos)}> </div>
   //<div className="Cell" test={"test2"} onClick={this.props.cellClick}> </div>
      
    );
     }
}

class ControlPannel extends React.Component {
  render(){
    return(
    <div className = "ControlPanel">
 <button className ="Button"> Start </button>
 <button className ="Button" onClick={console.log("hello")}> Reset </button>

    </div>
    );
  }
}



ReactDOM.render(<App data={values}/>, document.getElementById('app'));
