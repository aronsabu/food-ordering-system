const API_URL = "http://15.206.116.214:5000/api/foods";

const role =
  localStorage.getItem("role");

const userName =
  localStorage.getItem("name");

document.getElementById(
  "userName"
).textContent =
  `Welcome, ${userName}`;

if (role !== "admin") {
  document.getElementById(
    "adminBtn"
  ).style.display = "none";
}

async function loadFoods() {

  const response =
    await fetch(API_URL);

  const foods =
    await response.json();

  const container =
    document.getElementById(
      "foodContainer"
    );

  container.innerHTML = "";

  foods.forEach((food) => {

    container.innerHTML += `
      <div class="col-md-4">

        <div class="card mb-4">

          <img
            src="${food.image ? food.image.replace('https://food-ordering-media-aron.s3.ap-south-1.amazonaws.com', 'https://d3ljfqy6fys1vp.cloudfront.net') : ''}"
            class="card-img-top"
            style="
              height:220px;
              object-fit:cover;
            "
          >

          <div class="card-body">

            <h5>
              ${food.name}
            </h5>

            <p>
              ${food.description}
            </p>

            <h6>
              Rs. ${food.price}
            </h6>

            <button
              class="btn btn-primary"
              onclick="addToCart(${food.id})"
            >
              Add To Cart
            </button>

          </div>

        </div>

      </div>
    `;
  });
}

async function addToCart(foodId) {

  const token =
    localStorage.getItem(
      "token"
    );

  const response =
    await fetch(
      "http://15.206.116.214:5000/api/cart",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${token}`,
        },

        body: JSON.stringify({
          foodId,
          quantity: 1,
        }),
      }
    );

  const data =
    await response.json();

  alert(
    data.message
  );
}

function logout() {

  localStorage.removeItem(
    "token"
  );

  localStorage.removeItem(
    "role"
  );

  localStorage.removeItem(
    "name"
  );

  window.location =
    "login.html";
}

async function searchFoods() {

  const name =
    document.getElementById(
      "searchInput"
    ).value.trim();

  if (name === "") {
    loadFoods();
    return;
  }

  const response =
    await fetch(
      `http://15.206.116.214:5000/api/foods/search?name=${name}`
    );

  const foods =
    await response.json();

  const container =
    document.getElementById(
      "foodContainer"
    );

  container.innerHTML = "";

  foods.forEach((food) => {

    container.innerHTML += `
      <div class="col-md-4">

        <div class="card mb-4">

          <img
            src="${food.image ? food.image.replace('https://food-ordering-media-aron.s3.ap-south-1.amazonaws.com', 'https://d3ljfqy6fys1vp.cloudfront.net') : ''}"
            class="card-img-top"
            style="
              height:220px;
              object-fit:cover;
            "
          >

          <div class="card-body">

            <h5>${food.name}</h5>

            <p>${food.description}</p>

            <h6>
              Rs. ${food.price}
            </h6>

            <button
              class="btn btn-primary"
              onclick="addToCart(${food.id})"
            >
              Add To Cart
            </button>

          </div>

        </div>

      </div>
    `;
  });

}

document
  .getElementById("searchInput")
  .addEventListener(
    "keypress",
    function(event) {

      if (
        event.key === "Enter"
      ) {
        searchFoods();
      }

    }
  );

function clearSearch() {

  document.getElementById(
    "searchInput"
  ).value = "";

  loadFoods();

}

loadFoods();