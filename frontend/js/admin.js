const userName =
  localStorage.getItem("name");

document.getElementById(
  "userName"
).textContent =
  `Welcome, ${userName}`;

async function loadOrders() {

  const token =
    localStorage.getItem("token");

  const response =
    await fetch(
      "http://15.206.116.214:5000/api/orders/admin/all",
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

  const orders =
    await response.json();

  const container =
    document.getElementById(
      "ordersContainer"
    );

  container.innerHTML = "";

  orders.forEach(order => {

    container.innerHTML += `
      <div class="card mb-3">

        <div class="card-body">

          <h5>
            Order #${order.id}
          </h5>

          <p>
            User:
            ${order.user_name}
          </p>

          <p>
            Amount:
            Rs. ${order.total_amount}
          </p>

          <p>
            Status:
            ${order.status}
          </p>

          <button
            class="btn btn-success"
            onclick="
              updateStatus(
                ${order.id},
                'Delivered'
              )
            ">
            Mark Delivered
          </button>

        </div>

      </div>
    `;
  });
}

async function updateStatus(
  id,
  status
) {

  const token =
    localStorage.getItem("token");

  const response =
    await fetch(
      `http://15.206.116.214:5000/api/orders/${id}/status`,
      {
        method: "PUT",

        headers: {
          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${token}`
        },

        body: JSON.stringify({
          status
        })
      }
    );

  const data =
    await response.json();

  alert(data.message);

  loadOrders();
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

async function addFood() {

  const token =
    localStorage.getItem("token");

  const name =
    document.getElementById(
      "foodName"
    ).value;

  const description =
    document.getElementById(
      "foodDescription"
    ).value;

  const price =
    document.getElementById(
      "foodPrice"
    ).value;

  const image =
    document.getElementById(
      "foodImage"
    ).files[0];

  const formData =
    new FormData();

  formData.append(
    "name",
    name
  );

  formData.append(
    "description",
    description
  );

  formData.append(
    "price",
    price
  );

  formData.append(
    "image",
    image
  );

  const response =
    await fetch(
      "http://15.206.116.214:5000/api/foods",
      {
        method: "POST",

        headers: {
          Authorization:
            `Bearer ${token}`
        },

        body: formData
      }
    );

  const data =
    await response.json();

  alert(data.message);

  loadFoods();
}

async function loadFoods() {

  const response =
    await fetch(
      "http://15.206.116.214:5000/api/foods"
    );

  const foods =
    await response.json();

  const container =
    document.getElementById(
      "foodsContainer"
    );

  container.innerHTML = "";

  foods.forEach(food => {

    container.innerHTML += `
      <div class="card mb-3">

        <div class="card-body">

          <h5>
            ${food.name}
          </h5>

          <p>
            Rs. ${food.price}
          </p>

          <button
            class="btn btn-danger"
            onclick="
              deleteFood(
                ${food.id}
              )
            ">
            Delete
          </button>

        </div>

      </div>
    `;
  });
}

async function deleteFood(id) {

  const token =
    localStorage.getItem("token");

  const response =
    await fetch(
      `http://15.206.116.214:5000/api/foods/${id}`,
      {
        method: "DELETE",

        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

  const data =
    await response.json();

  alert(
    data.message ||
    JSON.stringify(data)
  );

  loadFoods();
}

loadOrders();
loadFoods();