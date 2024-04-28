// Constants
const BASE_URL = 'http://localhost:3000/ramens';
const ramenMenu = document.getElementById('ramen-menu');
const ramenDetail = document.getElementById('ramen-detail');
const newRamenForm = document.getElementById('new-ramen');

// Callbacks
const handleClick = (ramen) => {
    const ramenId = ramen.target.dataset.id;
    fetch(`${BASE_URL}/${ramenId}`)
        .then(response => response.json())
        .then(ramen => {
            // Clear the content of the ramenDetail div
            ramenDetail.innerHTML = '';

            // Create and append h2 element for ramen name
            const h2 = document.createElement('h2');
            h2.textContent = ramen.name;
            ramenDetail.appendChild(h2);

            // Create and append paragraph element for ramen rating
            const ratingParagraph = document.createElement('p');
            ratingParagraph.textContent = `Rating: ${ramen.rating}`;
            ramenDetail.appendChild(ratingParagraph);

            // Create and append paragraph element for ramen comment
            const commentParagraph = document.createElement('p');
            commentParagraph.textContent = `Comment: ${ramen.comment}`;
            ramenDetail.appendChild(commentParagraph);
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
        });
};

const addSubmitListener = () => {
    newRamenForm.addEventListener('submit', event => {
        event.preventDefault();
        const formData = new FormData(newRamenForm);
        const newRamen = {
            name: formData.get('name'),
            image: formData.get('image'),
            rating: formData.get('rating'),
            comment: formData.get('comment')
        };
        fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newRamen)
        })
        .then(response => response.json())
        .then(ramen => {
            const ramenId = ramen.id;
            const existingImage = ramenMenu.querySelector(`img[data-id="${ramenId}"]`);
            if (!existingImage) {
                const ramenImage = document.createElement('img');
                ramenImage.src = ramen.image;
                ramenImage.dataset.id = ramenId;
                ramenMenu.appendChild(ramenImage);
            }
            newRamenForm.reset();
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
        });
    });
};

const displayRamens = () => {
    fetch(BASE_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            data.forEach(ramen => {
                const ramenId = ramen.id;
                const existingImage = ramenMenu.querySelector(`img[data-id="${ramenId}"]`);
                if (!existingImage) {
                    const ramenImage = document.createElement('img');
                    ramenImage.src = ramen.image;
                    ramenImage.dataset.id = ramenId;
                    ramenImage.addEventListener('click', handleClick);
                    ramenMenu.appendChild(ramenImage);
                }
            });
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
        });
};

const main = () => {
    displayRamens();
    addSubmitListener();
};

main();

// Export functions for testing
export {
    displayRamens,
    addSubmitListener,
    handleClick,
    main,
};
