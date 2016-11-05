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
    this.clearBoard = this.clearBoard.bind(this);
    //this.createGenerations = this.createGenerations.bind(this);
    this.changeSizeTo = this.changeSizeTo.bind(this);
    this.changeSizeToL = this.changeSizeToL.bind(this);
    this.startGenerations = this.startGenerations.bind(this);
    this.pauseGenerations = this.pauseGenerations.bind(this);
  //  this.generateGrid = this.generateGrid.bind(this);
    this.state = {
      running: false,
      generations: 0,
      speed:  "small",
      board: {
        size: "small",
        height:  30,
        width: 50,
      }
    };
  };

componentWillMount(){
    let board = this.state.board;
    board.grid = this.generateGrid(30, 50);
    //this.createGenerations();
    this.setState ({
      board: board
    });
  };

 changeSizeTo(h, w){
   console.log("changeSizeToM fired")
      let height = h;
      let width = w;
      let board = this.state.board;
      board.height = height;
      board.width = width;
      board.grid = this.generateGrid(height,width);
      this.setState ({
        board: board
      });
 }

   changeSizeToL(){
   console.log("changeSizeToM fired")
      let height = 80;
      let width = 100;
      let board = this.state.board;
      board.height = height;
      board.width = width;
      board.grid = this.generateGrid(height,width);
      this.setState ({
        board: board
      });
 }

 clearBoard(){
   console.log("clear function is fired")
 let board = {...this.state.board};
 board.grid = this.generateGrid(this.state.board.height, this.state.board.width);
 let running = false;
   this.setState({
     board: board,
     running: running
   });
 };


 pauseGenerations(){
   console.log("pause fired")
   if(this.state.running === true){
     let running = false;
     this.setState({
       running: running
     })
   }
 }

 startGenerations(){
   console.log("start fired")
   if(this.state.running === false){
     let running = true;
     setTimeout(function(){this.createOneGeneration()}.bind(this), 2000);
     this.setState({
       running: running
     })
   } else {
     //nothing
   }
 }

/*
 createGenerations(){
  if (this.state.running === false) {
  let running = true;
  setTimeout(function() {this.createGenerations()}.bind(this), 2000);
  this.setState({
    running: running
  });
  } else {
  this.createOneGeneration();
  setTimeout(function() {this.createGenerations()}.bind(this), 2000);
  }


 }
 */
createOneGeneration(){
  if (this.state.running === true) {
           var height = this.state.board.height;
           var width = this.state.board.width;
           let board = this.state.board;
           //create new grid to avoid mutability in js
           let newgrid = this.generateGrid(height, width);

        //check all the cells
           for (var r=0; r< height; r++ ){
              for (var c=0; c<width; c++){
                var count = 0;

        //check status of all neigbours;
                for(var n=0; n<8; n++){
                     var neighbourID = board.grid[r].cells[c].neighbours[n];
                     var row = neighbourID[1];
                     var cell = neighbourID[0];

                    if(board.grid[row].cells[cell].status === "alive"){
                    count++;
                    }
                }

        //update status of the cells based on on amount of neigbours
                var status = board.grid[r].cells[c].status;
                    if (status === "dead" && count === 3) {
                      status = "alive";
                    } else if ((status === "alive") && (count === 3 || count === 2)) {
                      status = "alive";
                    } else {
                     status = "dead";
                    }
                newgrid[r].cells[c].status = status;
              }
           }
         //update grid and state.
           board.grid = newgrid;
          // setTimeout(createGenerations(), 3000);
           this.setState({
             board: board
           });
    setTimeout(function(){this.createOneGeneration()}.bind(this), 2000);

  } else {
    //nothing
  }
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



generateGrid(height, width) {
          let   grid = [];

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
      return <Row cells={row.cells} key={row.id} cellClick={this.cellClick} />
      })}
      <ControlPannel clearBoard={this.clearBoard} startGenerations={this.startGenerations} changeSizeTo={this.changeSizeTo} changeSizeToL={this.changeSizeToL} pauseGenerations={this.pauseGenerations}/>
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
<button className = "Button" onClick={this.props.startGenerations}> Start </button>
<button className = "Button" onClick={this.props.pauseGenerations}> Pause </button>
<button className = "Button" onClick={this.props.clearBoard}> Reset </button>
<button className = "Button" onClick={() =>this.props.changeSizeTo(30,50)}>30x50</button>
<button className = "Button" onClick={() =>this.props.changeSizeTo(50,70)}>50x70</button>
<button className = "Button" onClick={() =>this.props.changeSizeTo(80,100)}>80x100</button>



</div>
    );
  }
}



ReactDOM.render(<App data={values}/>, document.getElementById('app'));
