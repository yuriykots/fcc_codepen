
//Solution 1
var cellsArray = [];
for(var i=0; i<1500; i++){
  cellsArray.push(0);
}
//Solution 2
var cellsArray2 = new Array(1500).fill(0);

//give each sell an id.
//when sell is pressed, update state and rerender board with different color cell.

var App = React.createClass({

    getInitialState: function(){
      return {
        cells: cellsArray
      }
    },

    render: function() {
    return (

      <div>
       {this.state.cells.map(function(cell){
          return <div className="cells"> </div>
        })}
      </div>
    );
  }
});
ReactDOM.render(<App/>, document.getElementById('app'));
