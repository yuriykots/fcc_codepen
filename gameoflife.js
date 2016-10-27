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
    this.cellClick = this.cellClick.bind(this);
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
  };

  cellClick(){
    console.log("state");
    console.log(this.state);
     console.log("this");
    console.log(this);
  //  var posArray = event.split(","),
   // x = parseInt(posArray[0]),
   // y = parseInt(posArray[1]);
   // console.log(typeof x );
    //let grid = this.state.board;
   // console.log(grid);

   // console.log(event);
	//	var position = event.split(","),
		//			x = parseInt(position[0]),
	//				y = parseInt(position[1]);
	//	let board = {...this.state.board};
//		board.grid[y].cells[x].status = "alive";
	//	this.setState({board: board});
	};



 componentWillMount(){
    let board = this.state.board;
    board.grid = this.generateGrid();
    this.setState ({
      board: board
    });
  };

  testfunction(){
    console.log("test function")
    console.log(this)
  };



//  cellClick(){
 //   console.log("click")
	//	console.log(this)
  //  var posArray = event.split(","),
   // x = parseInt(posArray[0]),
   // y = parseInt(posArray[1]);
   // console.log(typeof x );
    //let grid = this.state.board;
   // console.log(grid);

   // console.log(event);
	//	var position = event.split(","),
		//			x = parseInt(position[0]),
	//				y = parseInt(position[1]);
	//	let board = {...this.state.board};
//		board.grid[y].cells[x].status = "alive";
	//	this.setState({board: board});
//	}



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
      </div>
  );
  }

 // render() {
  //  console.log(this.state.board.grid)
   // let grid = this.state.board.grid.map((row) => {

   //   return <Row cells={row.cells} key={row.id} cellClick={this.cellClick}/>
   // });


//    return (
 //   <div className = "Box" >
  //  {grid}
   // </div>
    //);
 // }






}

class Row extends React.Component {
  render(){
    return (
      <div className="Row">
        {this.props.cells.map((cell) => {
      return <Cell key={cell.id} test={"test"} id={cell.id} status={cell.status} cellClick={this.props.cellClick}/>
    })}

      </div>
    )
  /*
    let cells = this.props.cells.map((cell) => {
      return <Cell key={cell.id} test={"test"} id={cell.id} status={cell.status} cellClick={this.props.cellClick}/>
    })
    //console.log("cells next")
    //console.log(cells)
    return (
    <div className="Row">
        {cells}
    </div>

    )
    */
  }
}



//function Cell (props) {
class Cell extends React.Component {
     render(){
  return (
     // 1. bind(this)
    //  <div className="Cell" onClick={props.cellClick.bind(this, props.id)}> </div>
    // 2. Arrow function
      <div className="Cell" test={"test2"} onClick={() => this.props.cellClick(this.props.id)}> </div>
   //<div className="Cell" test={"test2"} onClick={this.props.cellClick}> </div>

    );
     }
}


ReactDOM.render(<App data={values}/>, document.getElementById('app'));


// function that change cell status
