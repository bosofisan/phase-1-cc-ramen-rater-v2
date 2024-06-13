// Constants
const url = 'http://localhost:3000/ramens';
const ramenMenu = document.getElementById('ramen-menu');
const ramenDetail = document.getElementById('ramen-detail');
const newRamenForm= document.getElementById('new-ramen');

//Functions
function displayRamens() {
    fetch(url)
    .then ( res => res.json())
    .then ( ramens => {
        ramens.forEach (ramen => { 
            const img = document.createElement('img');
            img.src = ramen.image;
            img.alt = ramen.name;
            img.addEventListener('click', () => handleClick(ramen));
            ramenMenu.appendChild(img);
        });
    })
    .catch(error => console.error("Error fetching ramens:", error));
}

function handleClick(ramen) {
    const detailImg = document.querySelector('#ramen-detail .detail-image');
    const detailName = document.querySelector('#ramen-detail .name');
    const detailRestaurant = document.querySelector('#ramen-detail .restaurant');
    const detailRating = document.getElementById('rating-display');
    const detailComment = document.getElementById('comment-display');

    detailImg.src = ramen.image;
    detailImg.alt = ramen.name;
    detailName.textContent = ramen.name;
    detailRestaurant.textContent = ramen.restaurant;
    detailRating.textContent = ramen.rating;
    detailComment.textContent = ramen.comment;
}

function addSubmitListener() {
    newRamenForm.addEventListener('submit', event => {
        event.preventDefault();
        const name = document.getElementById('new-name').value;
        const restaurant = document.getElementById('new-restaurant').value
        const image = document.getElementById('new-image').value;
        const rating = document.getElementById('new-rating').value;
        const comment = document.getElementById('new-comment').value;

        const newRamen = { name, restaurant, image, rating, comment };
        addRamenToMenu(newRamen)

        newRamenForm.reset();
    });
}

function addRamenToMenu(ramen) {
    const img = document.createElement('img');
    img.src = ramen.image;
    img.alt = ramen.name;
    img.addEventListener('click', () => handleClick(ramen));
    ramenMenu.appendChild(img);
}

//Main Function
function main() {
    displayRamens();
    addSubmitListener();
}

document.addEventListener('DOMContentLoaded', main);