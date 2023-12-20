const home=document. getElementById("home")
home.addEventListener("click",()=>{
    window.location.href="./index.html"
})
document.getElementById("reviewBtn").addEventListener("click",function(){
    var myModal=new bootstrap.Modal(document.getElementById("reviewModal"))
    myModal.show();
})
function submitReview(){
    alert("Thank you for the review");
}
    const searchButton = document.querySelector('#group1 button');
    searchButton.addEventListener('click', function () {
        const searchTerm = document.getElementById('input').value;
        if (searchTerm.trim() !== '') {
          
            display(searchTerm);
        }
    });

function display(searchTerm) {
    const Container = document.getElementById('display');
    Container.innerHTML = ''; 

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
        .then(response => response.json())
        .then(data => {
            const meals = data.meals;
            if (meals) {
                meals.forEach(meal => {
                    const mealItem = create(meal);
                    displayContainer.appendChild(mealItem);
                });
            } else {
                displayContainer.innerHTML = '<p>No results found.</p>';
            }
        })
        .catch(error => console.error("Error fetching meals:", error));
}
function displaymeal(meal) {
    const imgContainer = document.getElementById('img1');
    const wordContainer = document.getElementById('word2');

    imgContainer.innerHTML = `<img id="img" src="${meal.strMealThumb}" alt="food image">`;
    wordContainer.textContent = meal.strMeal;
}

function create(meal) {
    const mealItem = document.createElement('div');
    mealItem.classList.add('meal-item');

    const mealImage = document.createElement('img');
    mealImage.src = meal.strMealThumb;
    mealImage.alt = meal.strMeal;

    const mealTitle = document.createElement('p');
    mealTitle.textContent = meal.strMeal;

    mealItem.appendChild(mealImage);
    mealItem.appendChild(mealTitle);

    return mealItem;
}
function submitReview() {
    const reviewText = document.getElementById('reviewText').value;
    console.log('Submitted review');
    const reviewModal = new bootstrap.Modal(document.getElementById('reviewModal'));
    reviewModal.hide();
}

