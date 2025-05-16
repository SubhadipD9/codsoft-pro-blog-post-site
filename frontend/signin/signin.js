const form = document.querySelector(".signin-form");

const API_URL = CONFIG.API_URL;

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const errorSection = document.querySelector(".error-message");

  try {
    const response = await axios.post(`${API_URL}/api/user/signin`, {
      email,
      password,
    });

    const { data, status } = response;

    if (status === 200) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      alert("You are logged in");

      document.querySelector(".container").style.display = "none";
      document.querySelector(".result-div").style.display = "block";
    }
  } catch (err) {
    console.error("Sign-in error:", err);
    if (err.response && err.response.data) {
      errorSection.textContent =
        err.response.data.message || "Invalid credentials";
    } else {
      errorSection.textContent =
        "An unexpected error occurred. Please try again.";
    }
  }
});
