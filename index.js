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

            const priceElement = document.createElement("p");
            priceElement.textContent = property.price;
            propertyElement.appendChild(priceElement);

            const locationElement = document.createElement("p");
            locationElement.textContent = property.location;
            propertyElement.appendChild(locationElement);

            const descriptionElement = document.createElement("p");
            descriptionElement.textContent = property.description;
            propertyElement.appendChild(descriptionElement);

            propertyList.appendChild(propertyElement);
        });
    })
    .catch(error => console.error(error));

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


//
//   const contactForm = document.getElementById("contact-form");

//   contactForm.addEventListener("submit", async (event) => {
//     event.preventDefault(); // prevent the form from submitting

//     const name = document.getElementById("name-input").value;
//     const email = document.getElementById("email-input").value;
//     const message = document.getElementById("message-input").value;

//     try {
//       const response = await fetch("http://localhost:3000/property", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ name, email, message }),
//       });

//       if (response.ok) {
//         alert("Thank you for your message!");
//         contactForm.reset(); // clear the form
//       } else {
//         throw new Error("Something went wrong");
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Failed to send message");
//     }
//   });

const propertyDropdown = document.getElementById('property-dropdown');

fetch('http://localhost:3000/property')
  .then(response => response.json())
  .then(data => {
    data.forEach(property => {
      const option = document.createElement('option');
      option.value = property.id;
      option.text = property.type;
      propertyDropdown.appendChild(option);
    });

      // add an event listener to the dropdown
      propertyDropdown.addEventListener('change', () => {
          // get the selected value
          const selectedValue = propertyDropdown.value;

          // clear the options of propertyDropdown
          propertyDropdown.innerHTML = '';

          // add the selected option back, but selected
          data.property.forEach(property => {
              const option = document.createElement('option');
              option.value = property.id;
              option.text = property.type;
              if (property.id === selectedValue) {
                  option.selected = true;
              }
              propertyDropdown.appendChild(option);
          });
      });

        // handle form submit
        const form = document.querySelector('form');
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const name = document.getElementById('name-input').value;
            const email = document.getElementById('email-input').value;
            const message = document.getElementById('message-input').value;
            //const propertyId = document.getElementById('property').value;

        
        fetch('http://localhost:3000/response', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, message})
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
    });
    })
    .catch(error => console.error(error));
