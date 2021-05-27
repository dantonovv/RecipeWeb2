
const setEditModal = (recipename) => {

    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", `http://localhost:3000/recipe/${recipename}`, false);
    xhttp.send();

    const recipe = JSON.parse(xhttp.responseText);

    const {
        name,
        instructions,
        ingredients
    } = recipe;

   
    document.getElementById('name').value = name;
    document.getElementById('instructions').value = instructions;
    document.getElementById('ingredients').value = ingredients;


    document.getElementById('editForm').action = `http://localhost:3000/recipe/${recipename}`;
}

const deleteRecipe = (name) => {
    const xhttp = new XMLHttpRequest();

    xhttp.open('DELETE', `http://localhost:3000/recipe/${name}`, false);
    xhttp.send();

    location.reload();
}
const putRecipe = () => {
    const xhttp = new XMLHttpRequest();


    var name = document.getElementById('name').value;
    var instructions = document.getElementById('instructions').value;
    var ingredients = document.getElementById('ingredients').value;

    xhttp.open('PUT', `http://localhost:3000/recipe/${name}`, false);
    xhttp.send({
        name,
        instructions,
        ingredients
    });


    location.reload();
}
 
const loadRecipes = () => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", "http://localhost:3000/recipes", false);
    xhttp.send();

    const recipes = JSON.parse(xhttp.responseText);

    for (let recipe of recipes) {
        const x = `
            <div class="col-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${recipe.name}</h5>

                        <div>Инструкция: ${recipe.instructions}</div>
                        <div>Ингредиенты: ${recipe.ingredients}</div>

                        <hr>

                        <button type="button" class="btn btn-danger" onClick="deleteRecipe('${recipe.name}')">Удалить</button>
                        <button types="button" class="btn btn-primary" data-toggle="modal"
                            data-target="#editRecipeModal" onClick="setEditModal('${recipe.name}')">
                            Изменить
                        </button>
                    </div>
                </div>
            </div>
        `

        document.getElementById('recipes').innerHTML = document.getElementById('recipes').innerHTML + x;
    }
}

loadRecipes();