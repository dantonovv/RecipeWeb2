const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;


let recipes = [{name:"4 сыра",instructions:"Взять тесто, сыр и томатную пасту",ingredients:"4 Сыра, тесто, томатная паста"},{name:"Маргарита",instructions:"Сыр, тесто, томатная паста",ingredients:"Сыра, тесто, томатная паста"},{name:"Мясная",instructions:"Взять мясо, сыр, тесто",ingredients:"Мясо, тесто, томантная паста"}];

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/recipe', (req, res) => {
    const recipe = req.body;


    console.log(recipe);
    recipes.push(recipe);

    res.send('Recipe is added to the database');
});

app.get('/recipes', (req, res) => {
    res.json(recipes);
});

app.get('/recipe/:name', (req, res) => {
    
    const name = req.params.name;


    for (let recipe of recipes) {
        if (recipe.name === name) {
            res.json(recipe);
            return;
        }
    }

 
    res.status(404).send('Recipe not found');
})

app.delete('/recipe/:name', (req, res) => {

    const name = req.params.name;

 
    recipes = recipes.filter(i => {
        return (i.name != name);
    });
    console.log("Test for deletion");
    console.log(recipes);
    res.send('Recipe is deleted');
})

app.post('/recipe/:name', (req, res) => {

    const name = req.params.name;
    const newRecipe = req.body;


    for (let i = 0; i < recipes.length; i++) {
        let recipe = recipes[i]
        if(recipe.name === name) {
            recipes[i] = newRecipe;
        }
    }

    res.send('Recipe is edited');
});

app.listen(port, () => console.log(`Pizza Recipe app listening on port ${port}!`));
