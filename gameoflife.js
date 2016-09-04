//330px
//550px
//Solution 1
var cellsArray = [];
for(var i=0; i<1500; i++){
  cellsArray.push(0);
};
var emptyArray = [];
for(var i=0; i<1500; i++){
  emptyArray.push(0);
};

var length=50;
var heigth=30;

//Solution 2
var cellsArray2 = new Array(1500).fill(0);


var CellD = React.createClass({
  handleClick: function() {
   // console.log("cell is pressed");
     // console.log(this.props.index);
   //   console.log("cell is pressed");
      this.props.updateArrayD(this.props.index)
  },

  render: function() {
    return (
    <div className="cells-d" onClick={this.handleClick}> </div>
    );
    }
  });

var CellA = React.createClass({

  handleClick: function() {
    //  console.log("cell is pressed")
      this.props.updateArrayA(this.props.index)
  },

  render: function() {
    return (
    <div className="cells-a" onClick={this.handleClick}> </div>
    );
    }
  });

var App = React.createClass({

  getInitialState: function(){
      return {
        cells: cellsArray,
        ecells: emptyArray,
      }
  },



resetFunction: function(index) {

const emptyA = new Array(1500).fill(0);
     //console.log("cells array  is " +cellsArrayD)
    this.replaceState({cells: emptyA});
    // console.log("emptyCells" + emptyArray)
    //console.log("state-cells" + this.state.cells)
  },

   updateArrayD: function(index) {
    // console.log("updateArray Function is fired")
     var cellsArrayD = this.state.cells;
     cellsArrayD[index] = 1;
     //cellsArrayD[1499]=1;
     //console.log("cells array  is " +cellsArrayD)
        this.setState({cells: cellsArrayD});
        console.log("updateArrayD   " + this.state.cells)
  },

   updateArrayA: function(index) {
     var cellsArrayA = this.state.cells;
     cellsArrayA[index]=0;

          this.setState({cells: cellsArrayA});

   },


  createGenerations: function(){
     var generateArray = this.state.cells;
     console.log("before map")
     console.log("generateArray  is "  + generateArray)
     var newCellsArray = new Array(1500).fill(0);
     console.log("newCellArray  is "  + newCellsArray)
     generateArray.map(function(cell, index){
          var sum = generateArray[index-length-1]+generateArray[index-length]+generateArray[index-length+1]+generateArray[index-1]+generateArray[index+1]+generateArray[index+length-1]+generateArray[index+length]+generateArray[index+length+1];

///first line
if(index > 0  & index < length-2 ){
         var sum = generateArray[length*(heigth-1)+index-1]+generateArray[length*(heigth-1)+index]+generateArray[length*(heigth-1)+index+1]+generateArray[index-1]+generateArray[index+1]+generateArray[index+length-1]+generateArray[index+length]+generateArray[index+length+1];
     }
//last line
 if(index > length*(heigth-1)  & index < length*heigth-2 ){
         var sum = generateArray[index-length-1]+generateArray[index-length]+generateArray[index-length+1]+generateArray[index-1]+generateArray[index+1]+ generateArray[index-length*(heigth-1)-1]+ generateArray[index-length*(heigth-1)]+ generateArray[index-length*(heigth-1)+1]+generateArray[index+length-1]+generateArray[index+length]+generateArray[index+length+1];
     }


        ///new cell is born
         if(cell === 0 & sum === 3) {
            console.log("assign value 1  for index  " + index)
            newCellsArray[index]=1;
         }

       //cell is alive
         if(cell === 1 ){
           //dies from underpopulation
           if(sum < 2) {
           newCellsArray[index]=0;
              }
           //perfect conditions
           if(sum ===2 || sum === 3){
             newCellsArray[index]=1;
              }
           ///dies from overpopulation
           if(sum > 3 ){
             newCellsArray[index]=0;
           }
        }


})





     console.log("cellsArray " + generateArray)
     console.log("newCellsArray"  + newCellsArray)
     this.setState({cells: newCellsArray});
   },



     render: function() {
    return (

      <div>
       {this.state.cells.map(function(cell, index) {
          if (cell === 0){
            return <CellD updateArrayD={this.updateArrayD} index={index}/>
          }
           if (cell === 1){
            return <CellA updateArrayA={this.updateArrayA} index={index}/>
          }
        }.bind(this))}

        <button onClick={this.createGenerations}> Start </button>
        <button onClick={this.resetFunction}> Reset </button>
      </div>

    );
  }
});
ReactDOM.render(<App/>, document.getElementById('app'));
