const greeting = document.getElementById("user-greeting");
const signinBtn = document.getElementById("signin-btn");
const signupBtn = document.getElementById("signup-btn");

const API_URL = CONFIG.API_URL;

const errorSection = document.querySelector(".error");
const displaySection = document.querySelector(".display-blogs");

async function displayBlogs() {
  try {
    const response = await axios.get(`${API_URL}/`);
    const data = response.data.allPost;

    displaySection.innerHTML = "";

    data.forEach((blog) => {
      const newDiv = document.createElement("div");
      newDiv.classList.add("forBlogs");
      newDiv.style.border = "1px solid #ddd";
      newDiv.style.padding = "16px";
      newDiv.style.marginBottom = "20px";
      newDiv.style.borderRadius = "8px";
      newDiv.style.backgroundColor = "#fff";

      const titleEl = document.createElement("a");
      titleEl.href = `../post/index.html?slug=${blog.slug}`;
      titleEl.textContent = blog.title;
      titleEl.style.fontSize = "24px";
      titleEl.style.textDecoration = "none";
      titleEl.style.color = "#000";
      titleEl.style.display = "block";

      const previewEl = document.createElement("p");
      previewEl.textContent =
        blog.content.length > 150
          ? blog.content.substring(0, 150) + "..."
          : blog.content;
      previewEl.style.marginTop = "10px";

      const authorEl = document.createElement("p");
      authorEl.textContent = `Author: ${blog.author}`;
      authorEl.style.fontSize = "14px";
      authorEl.style.color = "#666";
      authorEl.style.marginTop = "10px";

      const readMoreLink = document.createElement("a");
      readMoreLink.href = `../post/index.html?slug=${blog.slug}`;
      readMoreLink.textContent = "Read more →";
      readMoreLink.style.color = "#3F72AF";
      readMoreLink.style.textDecoration = "none";
      readMoreLink.style.fontWeight = "bold";
      readMoreLink.style.display = "inline-block";
      readMoreLink.style.marginTop = "10px";

      newDiv.appendChild(titleEl);
      newDiv.appendChild(previewEl);
      newDiv.appendChild(authorEl);
      newDiv.appendChild(readMoreLink);

      displaySection.appendChild(newDiv);
    });
  } catch (error) {
    if (error.response.status === 403) {
      alert("Session expired. Please signin again");
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      window.location.href = "../signin/signin.html";
    } else {
      errorSection.textContent = "Failed to load blogs. Please try again.";
    }
  }
}

const dashboardBtn = document.getElementById("dashboard");

function isTokenExpired(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  } catch (e) {
    return true;
  }
}

const token = localStorage.getItem("token");
if (token && isTokenExpired(token)) {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  // window.location.href = "../signin/signin.html";
}

if (token) {
  signinBtn.style.display = "none";
  signupBtn.style.display = "none";
  dashboardBtn.style.display = "block";
} else {
  signinBtn.style.display = "block";
  signupBtn.style.display = "block";
  dashboardBtn.style.display = "none";
}

window.addEventListener("DOMContentLoaded", () => {
  const username = localStorage.getItem("username");
  const greeting = document.getElementById("user-greeting");

  if (username && greeting) {
    greeting.textContent = `👋 Hello, ${username}`;
    greeting.style.display = "inline-block";
  }
});

window.onload = displayBlogs;
