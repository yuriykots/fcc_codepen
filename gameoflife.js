
//Solution 1
var cellsArray = [];
for(var i=0; i<1500; i++){
  cellsArray.push(0);
}

cellsArray[40]=1;
cellsArray[151]=1;
cellsArray[958]=1;
cellsArray[773]=1;
cellsArray[555]=1;
cellsArray[648]=1;
//Solution 2
var cellsArray2 = new Array(1500).fill(0);

//give each sell an id.
//when sell is pressed, update state and rerender board with different color cell.
//id={index} onChange={this.handleClick2(index)}

var CellD = React.createClass({

  handleClick: function() {
      console.log("cell is pressed")
  },

  render: function() {
    return (
    <div className="cells-d" onClick={this.handleClick}> </div>
    );
    }
  });

var CellA = React.createClass({

  handleClick: function() {
      console.log("cell is pressed")
  },

  render: function() {
    return (
    <div className="cells-a" onClick={this.handleClick}></div>
    );
    }
  });

var App = React.createClass({

    getInitialState: function(){
      return {
        cells: cellsArray
      }
    },

   handleClick: function() {
     var cellsArray = this.state.cells;
     cellsArray[1] = 1;
        this.setState({cells: cellsArray});
  },

    handleClick2: function(index) {
      console.log("cell is pressed" + index)
  },

    render: function() {
    return (

      <div>
       {this.state.cells.map(function(cell, index) {
          if (cell === 0){
            return <CellD/>
          }
           if (cell === 1){
            return <CellA/>
          }
        }.bind(this))}
      </div>
    );
  }
});
ReactDOM.render(<App/>, document.getElementById('app'));
