var loadedRecipes = [{
  name: 'Watermelon salad',
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
var ButtonToolbar = ReactBootstrap.ButtonToolbar;

var App = React.createClass({

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

updateRecipe(obj){
  console.log(this.state.data);
  var recipes = this.state.data;
   console.log("next console is recipes before map")
   console.log(recipes)
    recipes.map(function(recipe){
        if (recipe.id === obj.id){
          recipe.name = obj.name;
          recipe.ingredients = obj.ingredients;
       };
      });

  this.setState({
    data: (recipes)
  });
  localStorage._yurijkots_recipes = JSON.stringify(recipes);
 // localStorage._yurijkots_recipes = JSON.stringify(recipes);

  console.log("next console is recipes after map")
  console.log(recipes)

},

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

  deleteRecipe(id){
    console.log("Id of delete recipe is =  " + id)
    var recipes = this.state.data;
    var recipes2 = []
    recipes.map(function(recipe){
      if (recipe.id !== id){
        recipes2.push(recipe);
      }
    })
    console.log(recipes2);

    this.setState({
      data: (recipes2)
    });
    localStorage._yurijkots_recipes = JSON.stringify(recipes);
  },

  open() {
    this.setState({ showModal: true });
  },

  render: function() {
    console.log(this.state.data)
    return (
      <div className="container">
          <div className="col-lg-8  col-lg-offset-2 app">
           <h2> Your Recipes</h2>
          <RecipeBox deleteRecipe={this.deleteRecipe} updateRecipe={this.updateRecipe}  data={this.state.data} />
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
    <Recipe name={recipe.name} deleteRecipe={this.props.deleteRecipe} updateRecipe={this.props.updateRecipe}  ingredients={recipe.ingredients} id={recipe.id}/>
            </div>
        }.bind(this))}
     </div>
  )}
});


var Recipe = React.createClass({

  getInitialState() {
    return {showModal: false,
            ingredients: this.props.ingredients,
            recipe: this.props.name
           };
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
  },

  deleteButton: function(){
    this.close();
    var id = this.props.id;
    this.props.deleteRecipe(id);

  },

  handleSave: function(){
    this.close();
    var recipeName = this.state.recipe;
    console.log("ingredients next")
    console.log(this.state.ingredients)
    var ingredients = this.state.ingredients
    console.log("type of ingredients is ... ")
    if (typeof ingredients !== "object" ){
      ingredients = this.state.ingredients.split(',');
    }
    console.log(typeof ingredients)
    var id = this.props.id;

        this.props.updateRecipe({
          name: recipeName,
          ingredients: ingredients,
          id: id
        });
  },

render() {
  return (
   <div>
        <Panel class="recipe-panel" collapsible header={this.props.name}>
           {this.props.ingredients.map(function(ingredient){
           return <div>
             {ingredient}
           </div>
           })}
           <br></br>
           <ButtonToolbar>
               <Button onClick={this.open}>Edit</Button>
               <Button onClick={this.deleteButton}> Delete </Button>
           </ButtonToolbar>
        </Panel>


  <Modal show={this.state.showModal} onHide={this.close}>
    <Modal.Header closeButton>
        <Modal.Title>Add Recipe</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <form>
            <FormGroup> <FormControl type="text" value={this.state.recipe} onChange={this.handleChange}/></FormGroup>
            <FormGroup><FormControl componentClass="textarea" value={this.state.ingredients} onChange={this.handleChange2}/></FormGroup>
        </form>
    </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleSave}>Save</Button>

            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>


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
