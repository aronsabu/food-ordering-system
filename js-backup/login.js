async function loginUser() {

  const email =
    document.getElementById("email").value;

  const password =
    document.getElementById("password").value;

  const response =
    await fetch(
      "/api/auth/login",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

  const data =
    await response.json();

  if (response.ok) {

    localStorage.setItem(
      "token",
      data.token
    );

    localStorage.setItem(
      "role",
      data.user.role
    );

    localStorage.setItem(
      "name",
      data.user.name
    );

    alert(
      "Login successful"
    );

    window.location =
      "foods.html";

  } else {

    alert(
      data.message
    );

  }
}