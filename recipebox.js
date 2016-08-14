var loadedRecipes = [{
  name: 'Watermelon saladDDDD',
  ingredients: ['Arugula', 'watermelon', 'feta'],
  id: '1461993924423'
}, {
  name: 'Chop Chop saladdd',
  ingredients: ['Letuce', 'Tomatoes', 'Onion','Feta', 'Cucumber'],
  id: '1461993924425'
}];

var Modal = ReactBootstrap.Modal;
var Accordion = ReactBootstrap.Accordion;
var Panel = ReactBootstrap.Panel;
var Button = ReactBootstrap.Button;
var FormGroup = ReactBootstrap.FormGroup;
var FormControl = ReactBootstrap.FormControl;

var App = React.createClass({
/*
  componentWillMount: function() {
    //localStorage._yurijkots_recipes = JSON.stringify(loadedRecipes);
    var memoryRecipes = localStorage._yurijkots_recipes
    localStorage._yurijkots_recipes ='';
    localStorage._yurijkots_recipes = loadedRecipes;
   // loadedRecipes = localStorage._yurijkots_recipes;
   // if(!memoryRecipes){
     // memoryRecipes = loadedRecipes
   // }

    console.log(memoryRecipes);
    this.setState({
        data: (loadedRecipes)
      });
  },

  */
  componentWillMount: function() {
  //localStorage._yurijkots_recipes = JSON.stringify(loadedRecipes);
  var storedRecipes = localStorage._yurijkots_recipes;
    console.log(storedRecipes);
    if (storedRecipes) {
      this.setState({
        data: JSON.parse(storedRecipes)
      });
    } else {
      console.log("else");
      this.setState({
        data: loadedRecipes
      });
    }
  },

  updateRecipe(){},

  addRecipe(obj){
    var recipes = this.state.data;
    recipes = recipes.concat(obj);
    this.setState({
        data: (recipes)
      });
    localStorage._yurijkots_recipes = JSON.stringify(recipes);
    console.log("local memory  " + localStorage._yurijkots_recipes);
    console.log("recipes" + recipes)
  },

  removeRecipe(){},
  open() {
    this.setState({ showModal: true });
  },

  render: function() {
    console.log(this.state.data)
    return (
      <div className="container">
          <div className="col-lg-8  col-lg-offset-2 app">
           <h1> Recipe Box </h1>
          <RecipeBox data={this.state.data} />
          <Example addRecipe={this.addRecipe}/>
        </div>
       </div>
    );
  }
});

var RecipeBox = React.createClass({

  render() {
    return (
     <div>
     {this.props.data.map(function(recipe) {
          return <div>
    <Recipe name={recipe.name} ingredients={recipe.ingredients} id={recipe.id}/>
            </div>
        })}
     </div>
  )}
});


var Recipe = React.createClass({
    render() {
    return (
     <Accordion>
         <Panel header={this.props.name} eventKey="1">
           {this.props.ingredients.map(function(ingredient){
           return <div>
             {ingredient}
           </div>
           })}
           <br></br>
           </Panel>
     </Accordion>
      );
    }
});

const Example = React.createClass({
  getInitialState() {
    return { showModal: false };
  },

  close() {
    this.setState({ showModal: false });
  },

  open() {
    this.setState({ showModal: true });
  },

  handleChange: function(event) {
    this.setState({recipe: event.target.value});
  },

  handleChange2: function(event) {
    this.setState({ingredients: event.target.value});
    console.log(this.state);
  },

  handleChange3() {
    var recipe = this.state.recipe;
    var ingredients = this.state.ingredients.split(',');
    var id = Date.now();
     this.props.addRecipe({
        name: recipe,
        ingredients: ingredients,
        id: id
        });
  },

 twoFunctions: function() {
   this.handleChange3();
   this.close();

  },

  render() {


    return (
      <div>

      <button className="btn btn-default" onClick={this.open}> Add Recipe </button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Add Recipe</Modal.Title>
          </Modal.Header>
          <Modal.Body>
<form>
    <FormGroup> <FormControl type="text" placeholder="Recipe Name" onChange={this.handleChange}/></FormGroup>
    <FormGroup><FormControl componentClass="textarea" placeholder="Ingredients" onChange={this.handleChange2}/></FormGroup>

</form>



          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.twoFunctions}>Add Recipe</Button>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});



ReactDOM.render(<App/>, document.getElementById('app'));
