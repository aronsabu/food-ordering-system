async function registerUser() {

  const name =
    document.getElementById("name").value;

  const email =
    document.getElementById("email").value;

  const password =
    document.getElementById("password").value;

  const response = await fetch(
    "http://15.206.116.214:5000/api/auth/register",
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json"
      },

      body: JSON.stringify({
        name,
        email,
        password
      })
    }
  );

  const data =
    await response.json();

  alert(data.message);

  if (response.ok) {
    window.location =
      "login.html";
  }
}