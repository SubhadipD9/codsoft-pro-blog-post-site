const form = document.querySelector(".signup-form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const emailInput = document.querySelector("#email");
  const passwordInput = document.querySelector("#password");
  const usernameInput = document.querySelector("#username");

  const email = emailInput.value;
  const password = passwordInput.value;
  const username = usernameInput.value;

  const errorSection = document.querySelector(".error-message");

  if (!email || !password || !username) {
    errorSection.innerHTML = "Required fields are empty";
    return;
  }

  try {
    const response = await axios.post(
      "http://localhost:3000/api/user/signup",
      {
        email,
        password,
        username,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    const { data, status } = response;

    if (status === 201) {
      errorSection.innerHTML = data.message;
      form.style.display = "none";
      document.querySelector(".container").style.display = "none";
      document.querySelector(".result-div").style.display = "block";
    }
  } catch (err) {
    if (err.response) {
      const res = err.response;
      const message =
        res.data?.message || res.data?.error || "An unexpected error occurred";

      errorSection.innerHTML = message;

      passwordInput.value = "";
    } else {
      alert("Some error happened: " + err.message);
      passwordInput.value = "";
    }
  }
});
