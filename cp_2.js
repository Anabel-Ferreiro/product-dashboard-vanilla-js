// Step 3: Promise-based fetch using .then() and .catch()
function fetchProductsThen() {
  fetch("https://www.course-api.com/javascript-store-products")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log("Products fetched with .then():");
      data.forEach(function(product) {
        console.log(product.fields.name);
      });
    })
    .catch(function(error) {
      console.log("Fetch error: " + error);
    });
}

// Step 6: Reusable error handler
function handleError(error) {
  console.log("An error occurred: " + error.message);
  const container = document.getElementById("product-container");
  if (container) {
    container.innerHTML = `<div class="error">Error loading products. Please try again later.</div>`;
  }
}

// Step 5: Display first 5 products
function displayProducts(products) {
  const container = document.getElementById("product-container");
  container.innerHTML = "";

  products.slice(0, 5).forEach(function(product) {
    const name = product.fields.name;
    const price = (product.fields.price / 100).toFixed(2);
    const image = product.fields.image && product.fields.image[0] 
  ? product.fields.image[0].url 
  : "https://via.placeholder.com/200";

    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${image}" alt="${name}" />
      <h3>${name}</h3>
      <p>$${price}</p>
    `;
    container.appendChild(card);
  });
}

// Step 4: Async/await fetch using try/catch
async function fetchProductsAsync() {
  try {
    const response = await fetch("https://www.course-api.com/javascript-store-products");
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const data = await response.json();
    displayProducts(data);
  } catch(error) {
    handleError(error);
  }
}

// Step 7: Call both functions
fetchProductsThen();
fetchProductsAsync();