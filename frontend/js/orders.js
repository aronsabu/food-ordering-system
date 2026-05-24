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

async function loadOrders() {

  const token =
    localStorage.getItem("token");

  const response =
    await fetch(
      "http://localhost:5000/api/orders",
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
            Amount:
            Rs. ${order.total_amount}
          </p>

          <p>
            Status:
            ${order.status}
          </p>

        </div>

      </div>
    `;
  });
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

loadOrders();