const postSection = document.querySelector(".blog-post");
const errorSection = document.querySelector(".show-error");

const API_URL = CONFIG.API_URL;

const urlParams = new URLSearchParams(window.location.search);
const slug = urlParams.get("slug");

if (slug) {
  displayPost(slug);
} else {
  errorSection.textContent = "No post ID found in URL.";
}

async function displayPost(slug) {
  try {
    const response = await axios.get(`${API_URL}/api/blogs/display/${slug}`);
    const post = response.data.post;

    postSection.innerHTML = "";

    const postContainer = document.createElement("div");
    postContainer.style.border = "1px solid #ddd";
    postContainer.style.padding = "20px";
    postContainer.style.borderRadius = "8px";
    postContainer.style.backgroundColor = "#fff";
    postContainer.style.maxWidth = "800px";
    postContainer.style.margin = "0 auto";

    const titleEl = document.createElement("h2");
    titleEl.textContent = post.title;
    titleEl.style.fontSize = "28px";
    titleEl.style.marginBottom = "12px";
    titleEl.style.color = "#222";

    const authorEl = document.createElement("p");
    authorEl.textContent = `Author: ${post.author}`;
    authorEl.style.fontSize = "14px";
    authorEl.style.color = "#666";
    authorEl.style.marginBottom = "16px";

    const contentEl = document.createElement("div");
    const cleanHTML = DOMPurify.sanitize(post.content);
    contentEl.innerText = cleanHTML;
    contentEl.style.fontSize = "16px";
    contentEl.style.lineHeight = "1.6";
    contentEl.style.color = "#333";

    postContainer.appendChild(titleEl);
    postContainer.appendChild(authorEl);
    postContainer.appendChild(contentEl);

    postSection.appendChild(postContainer);
  } catch (error) {
    if (error.response.status === 403) {
      alert("Session expired. Please signin again");
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      window.location.href = "../signin/signin.html";
    } else {
      errorSection.textContent =
        "Failed to load the blog post. Please try again.";
    }
  }
}

const username = localStorage.getItem("username");
const signinBtn = document.getElementById("signin-btn");
const signupBtn = document.getElementById("signup-btn");
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
}

window.addEventListener("DOMContentLoaded", () => {
  const greeting = document.getElementById("user-greeting");

  if (username && greeting) {
    greeting.textContent = `👋 Hello, ${username}`;
    greeting.style.display = "inline-block";
    signinBtn.style.display = "none";
    signupBtn.style.display = "none";
    dashboardBtn.style.display = "block";
  } else {
    signinBtn.style.display = "block";
    signupBtn.style.display = "block";
    dashboardBtn.style.display = "none";
  }
});
