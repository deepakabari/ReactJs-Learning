import { createContext, useContext, useState } from "react";
import "./UseContextDemo.css";

// old fashioned way to pass data down the tree
// without useContext, we would have to pass props through every level
// this is called "prop drilling" and can get messy

export function Grandparent() {
  const [familyRecipe] = useState("Secret Cookie Recipe");
  return <Parent recipe={familyRecipe} />;
}

// Parent must accept recipe just to give it to Child
function Parent({ recipe }: { recipe: string }) {
  return <Child recipe={recipe} />;
}

// Child finally gets it!
function Child({ recipe }: { recipe: string }) {
  return <p>I'm baking: {recipe}</p>;
}

// Using useContext to simplify the above code
const RecipeContext = createContext("No Recipe");

function Grandparent1() {
  const [familyRecipe] = useState("Secret Cookie Recipe");

  // Wrap the tree with the Provider and pass the value you want to share.
  return (
    <RecipeContext.Provider value={familyRecipe}>
      <div>
        <h1>Grandparent's House</h1>
        <Parent1 />
      </div>
    </RecipeContext.Provider>
  );
}

function Parent1() {
  return (
    <div>
      <h2>Parent's Room</h2>
      <Child1 />
    </div>
  );
}

function Child1() {
  const recipe = useContext(RecipeContext);

  return <p>I'm baking: {recipe}</p>;
}

export default Grandparent1