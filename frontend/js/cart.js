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

async function loadCart() {

  const token =
    localStorage.getItem("token");

  const response =
    await fetch(
      "http://15.206.116.214:5000/api/cart",
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

  const items =
    await response.json();

  const container =
    document.getElementById(
      "cartContainer"
    );

  container.innerHTML = "";

  items.forEach(item => {

    container.innerHTML += `
      <div class="card mb-3">

        <div class="card-body">

          <h5>
            ${item.name}
          </h5>

          <p>
            Quantity:
            ${item.quantity}
          </p>

          <p>
            Price:
            Rs. ${item.price}
          </p>

          <button
            class="btn btn-danger"
            onclick="removeItem(${item.id})">
            Remove
          </button>

        </div>

      </div>
    `;
  });
}

async function removeItem(id) {

  const token =
    localStorage.getItem("token");

  await fetch(
    `http://15.206.116.214:5000/api/cart/${id}`,
    {
      method: "DELETE",

      headers: {
        Authorization:
          `Bearer ${token}`
      }
    }
  );

  loadCart();
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

async function placeOrder() {

  const token =
    localStorage.getItem("token");

  const response =
    await fetch(
      "http://15.206.116.214:5000/api/orders",
      {
        method: "POST",

        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

  const data =
    await response.json();

  alert(
    data.message
  );

  loadCart();
}

loadCart();