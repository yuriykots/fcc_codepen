var App = React.createClass({


render: function() {
  console.log(this.state.data)
  return (
    <div>
    <h1> Hello </h1>
    </div>
  );
}
});


ReactDOM.render(<App/>, document.getElementById('app'));
