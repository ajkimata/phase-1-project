// create an automatic image slider that changes the image displayed on the webpage every 3 seconds.
const images = [
    "https://i.roamcdn.net/prop/brk/listing-medium-600w-watermark/6bc1bf97f778e154ab527c303e0aa2f9/-/prod-property-core-backend-media-brk/5064975/fe1aeab7-ff2d-4022-84d0-f395e78af0c3.JPG",
    "https://i.roamcdn.net/prop/brk/listing-medium-600w-watermark/5f5157d290f6ec40db92695f8d3706c2/-/prod-property-core-backend-media-brk/5064962/54027462-5f1c-4248-9ff5-cfe49da51a5c.JPG",
    "https://i.roamcdn.net/prop/brk/listing-medium-600w-watermark/c8e14abb32721680377329daf7cd3a95/-/prod-property-core-backend-media-brk/5064964/0a41f9cc-c0bc-45d5-a860-8e72ac1725a3.JPG",
    "https://i.roamcdn.net/prop/brk/listing-medium-600w-watermark/e1714b577a85cce453157a14ae970554/-/prod-property-core-backend-media-brk/5064965/7eb79fc5-db58-4541-a982-babb40125b12.JPG"
];

const imageElement = document.querySelector("#banner img");
let currentIndex = 0;

setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length;
    imageElement.src = images[currentIndex];
}, 3000); // change image every 3 seconds

// Get a reference to the property list div
const propertyList = document.getElementById("property-list");

// Fetch the JSON data
fetch("http://localhost:3000/property")
    .then(response => response.json())
    .then(properties => {
        // Iterate through the properties and create HTML elements to display them
        properties.forEach(property => {
            const propertyElement = document.createElement("div");
            propertyElement.classList.add("property");

            const imageElement = document.createElement("img");
            imageElement.src = property.image;
            propertyElement.appendChild(imageElement);

            const titleElement = document.createElement("h3");
            titleElement.textContent = property.title;
            propertyElement.appendChild(titleElement);

            const areaElement = document.createElement("p");
            areaElement.textContent = `Area: ${property.area} sq.ft`;
            propertyElement.appendChild(areaElement);

            const cityElement = document.createElement("p");
            cityElement.textContent = `City: ${property.city}`;
            propertyElement.appendChild(cityElement);

            const bedsElement = document.createElement("p");
            bedsElement.textContent = `Beds: ${property.beds}`;
            propertyElement.appendChild(bedsElement);

            const priceElement = document.createElement("p");
            priceElement.textContent = `Price: $${property.price}`;
            propertyElement.appendChild(priceElement);

            const constructionElement = document.createElement("p");
            constructionElement.textContent = `Construction: ${property.construction}`;
            propertyElement.appendChild(constructionElement);

            const descriptionElement = document.createElement("p");
            descriptionElement.textContent = property.description;
            propertyElement.appendChild(descriptionElement);

            // Add the like button
            const likeButton = document.createElement("button");
            likeButton.innerHTML = '<i class="fa fa-heart-o"></i> Like';
            likeButton.classList.add("like-button");
            likeButton.addEventListener("click", () => {
                likeButton.innerHTML = '<i class="fa fa-heart"></i> Liked';
                likeButton.classList.add("liked");
            });
            propertyElement.appendChild(likeButton);

            // Add the enquire button
            const enquireButton = document.createElement("button");
            enquireButton.textContent = "Enquire";
            enquireButton.classList.add("enquire-button");
            propertyElement.appendChild(enquireButton);

            propertyList.appendChild(propertyElement);
        });
    })
    .catch(error => console.error(error));



//search function
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const searchResults = document.getElementById('search-results');

searchButton.addEventListener('click', () => {
    const city = searchInput.value;

    fetch(`http://localhost:3000/property?city=${city}`)
        .then(response => response.json())
        .then(properties => {
            searchResults.innerHTML = '';

            if (properties.length === 0) {
                searchResults.innerHTML = 'No properties found for this city.';
                return;
            }
            //add new elements to the propertyElement and populate them with data
            properties.forEach(property => {
                const div = document.createElement('div');
                div.innerHTML = `
          <h3>${property.title}</h3>
          <img src="${property.image}" alt="${property.title}">
          <p>Area: ${property.area}</p>
          <p>Address: ${property.address}</p>
          <p>Beds: ${property.beds}</p>
          <p>Parking: ${property.parking}</p>
          <p>Price: ${property.price}</p>
          <p>Construction: ${property.construction}</p>
        `;

                searchResults.appendChild(div);
            });
        })
        .catch(error => console.error(error));
});

// handle form submit
const form = document.querySelector('#contact-form');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const jsonObject = {};
    formData.forEach((value, key) => { jsonObject[key] = value });
    const jsonData = JSON.stringify(jsonObject);

    try {
        const response = await fetch('http://localhost:3000/property', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: jsonData,
        });

        if (response.ok) {
            form.reset();
            alert('Thank you for your message!');
        } else {
            throw new Error(`Server responded with ${response.status}`);
        }
    } catch (error) {
        console.error(error);
        alert('There was an error submitting your message. Please try again later.');
    }
});