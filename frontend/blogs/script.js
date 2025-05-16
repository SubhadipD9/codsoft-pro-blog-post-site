const greeting = document.getElementById("user-greeting");
const signinBtn = document.getElementById("signin-btn");
const signupBtn = document.getElementById("signup-btn");

const errorSection = document.querySelector(".error");
const displaySection = document.querySelector(".display-blogs");

async function displayBlogs() {
  try {
    const response = await axios.get("http://localhost:3000/");
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
      titleEl.href = `../post/index.html?id=${blog._id}`;
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
      readMoreLink.href = `../post/index.html?id=${blog._id}`;
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
    errorSection.textContent = "Failed to load blogs. Please try again.";
    console.error("Fetch error:", error);
  }
}

const token = localStorage.getItem("token");

if (token) {
  signinBtn.style.display = "none";
  signupBtn.style.display = "none";
} else {
  signinBtn.style.display = "block";
  signupBtn.style.display = "block";
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
