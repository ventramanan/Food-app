const home=document. getElementById("home")
home.addEventListener("click",()=>{
    window.location.href="./index.html"
})
$(document).ready(function () {
    function fetchRandomMeal() {
        $.ajax({
            url: 'https://www.themealdb.com/api/json/v1/1/random.php',
            method: 'GET',
            success: function (data) {
                $('#img').attr('src', data.meals[0].strMealThumb);
                $('#word2').text(data.meals[0].strMeal);
                $('#img').on('click', function () {
                    showRecipeModal(data.meals[0]);
                });
                Ingredients(data.meals[0].idMeal);

                localStorage.setItem('randomMeal', JSON.stringify(data.meals[0]));
            },
            error: function (error) {
                console.error('Error fetching random meal:', error);
            }
        });
    }
    function getStoredMeal() {
        var storedMeal = localStorage.getItem('randomMeal');
        if (storedMeal) {
            return JSON.parse(storedMeal);
        }
        return null;
    }
    function showRecipeModal(meal) {
        var modalHtml = `
            <div class="modal" id="recipeModal" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">${meal.strMeal}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="img-fluid mb-2">
                            <h4>Ingredients:</h4>
                            <ul id="ingredientsList"></ul>
                            <p>${meal.strInstructions}</p>
                            
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        $('body').append(modalHtml);
        Ingredients(meal.idMeal);
        $('#recipeModal').modal('show');
        $('#recipeModal').on('hidden.bs.modal', function () {
            $(this).remove();
        });
    }
    function Ingredients(mealId) {
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
            .then(response => response.json())
            .then(data => {
                const mealDetails = data.meals[0];
                displayIngredients(mealDetails);
            })
            .catch(error => console.error("Error fetching meal details:", error));
    }
    function displayIngredients(meal) {
        const ingredientsList = getIngredientsList(meal);
        $('#ingredientsList').html(ingredientsList);
    }
    function getIngredientsList(meal) {
        let ingredientsList = '';
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            if (ingredient && ingredient.trim() !== '' && measure && measure.trim() !== '') {
                ingredientsList += `<li>${measure} ${ingredient}</li>`;
            }
        }
        return ingredientsList;
    }
    fetchRandomMeal();
    var storedMeal = getStoredMeal();
    if (storedMeal) {
        $('#img').attr('src', storedMeal.strMealThumb);
        $('#word2').text(storedMeal.strMeal);
    }
    $(window).on('beforeunload', function () {
        fetchRandomMeal();
    });
});
$(document).ready(function() {    
    function getStoredMeal() {
        var storedMeal = localStorage.getItem('randomMeal');
        if (storedMeal) {
            return JSON.parse(storedMeal);
        }
        return null;
    }
    function showRecipeModal(meal) {
        var modalHtml = `
            <div class="modal" id="recipeModal" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">${meal.strMeal}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="img-fluid mb-2">
                            <p>${meal.strInstructions}</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        $('body').append(modalHtml);
        $('#recipeModal').modal('show');
        $('#recipeModal').on('hidden.bs.modal', function () {
            $(this).remove();
        });
    }
    var storedMeal = getStoredMeal();
    if (storedMeal) {
        $('#img').attr('src', storedMeal.strMealThumb);
        $('#word2').text(storedMeal.strMeal);
    }
    const searchButton = document.querySelector('#group1 button');
    searchButton.addEventListener('click', function () {
        const searchTerm = document.getElementById('input').value;
        if (searchTerm.trim() !== '') {
            DisplayMeals(searchTerm);
        }
    });

    function DisplayMeals(searchTerm) {
        const displayContainer = document.getElementById('display');
        displayContainer.innerHTML = '';

        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
            .then(response => response.json())
            .then(data => {
                const meals = data.meals;
                if (meals) {
                    meals.forEach(meal => {
                        const Item = createMealItem(meal);
                        displayContainer.appendChild(Item);
                    });
                } else {
                    displayContainer.innerHTML = '<p>No results found.</p>';
                }
            })
            .catch(error => console.error("Error fetching meals:", error));
    }

    function displayMeal(meal) {
        const imgContainer = document.getElementById('img1');
        const wordContainer = document.getElementById('word2');

        imgContainer.innerHTML = `<img id="img" src="${meal.strMealThumb}" alt="food image">`;
        wordContainer.textContent = meal.strMeal;
    }

    function createMealItem(meal) {
        const Item = document.createElement('div');
        Item.classList.add('meals');

        const Image = document.createElement('img');
        Image.src = meal.strMealThumb;
        Image.alt = meal.strMeal;

        const mealTitle = document.createElement('p');
        mealTitle.textContent = meal.strMeal;

        Item.appendChild(Image);
        Item.appendChild(mealTitle);

        Item.addEventListener('click', function () {
            const modalId = `mealDetailsModal_${meal.idMeal}`;
            DisplayMealDetails(meal.idMeal, modalId);
        });

        return Item;
    }

    function DisplayMealDetails(mealId, modalId) {
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
            .then(response => response.json())
            .then(data => {
                const mealDetails = data.meals[0];
                showMealDetailsPopup(mealDetails, modalId);
            })
            
    }

    function showMealDetailsPopup(mealDetails, modalId) {
        const modalHtml = `
            <div class="modal" id="${modalId}" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">${mealDetails.strMeal}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <img src="${mealDetails.strMealThumb}" alt="${mealDetails.strMeal}" class="img-fluid mb-2">
                            <h4>Ingredients:</h4>
                            <ul>
                                ${getIngredientsList(mealDetails)}
                            </ul>
                            <h4>YouTube Video:</h4>
                            <iframe width="400" height="315" src="${mealDetails.strYoutube.replace('watch?v=', 'embed/')}" frameborder="0" allowfullscreen></iframe>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        const mealDetailsModal = new bootstrap.Modal(document.getElementById(modalId));
        mealDetailsModal.show();
        $(`#${modalId}`).on('shown.bs.modal', function () {
            console.log('Modal has been shown.');
        });   
    }
    function getIngredientsList(meal) {
        let ingredientsList = '';
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            if (ingredient && ingredient.trim() !== '' && measure && measure.trim() !== '') {
                ingredientsList += `<li>${measure} ${ingredient}</li>`;
            }
        }
        return ingredientsList;
    }
    
});