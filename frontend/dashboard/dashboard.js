const userBlog = document.querySelector(".user-blog-post");
const displayError = document.querySelector(".show-error");
const createPost = document.querySelector(".create-post");

const token = localStorage.getItem("token");

if (!token) {
  window.location = "../signin/signin.html";
} else {
  showPost();
}

async function showPost() {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/blogs/userPost",
      {
        headers: { authorization: token },
      }
    );

    const post = response.data.userBlogs;
    userBlog.innerHTML = "";

    post.forEach((data) => {
      const postContainer = document.createElement("div");
      postContainer.style.border = "1px solid #ddd";
      postContainer.style.padding = "20px";
      postContainer.style.borderRadius = "8px";
      postContainer.style.backgroundColor = "#fff";
      postContainer.style.maxWidth = "800px";
      postContainer.style.margin = "20px auto";

      const titleEl = document.createElement("h2");
      titleEl.textContent = data.title;
      titleEl.style.fontSize = "28px";
      titleEl.style.marginBottom = "12px";
      titleEl.style.color = "#222";

      const authorEl = document.createElement("p");
      authorEl.textContent = `By: ${data.author}`;
      authorEl.style.color = "#777";
      authorEl.style.marginBottom = "10px";

      const contentEl = document.createElement("div");
      const cleanHTML = DOMPurify.sanitize(data.content);
      contentEl.innerText = cleanHTML;
      contentEl.style.fontSize = "16px";
      contentEl.style.lineHeight = "1.6";
      contentEl.style.color = "#333";

      const buttonGroup = document.createElement("div");
      buttonGroup.style.marginTop = "15px";

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.style.marginRight = "10px";
      editBtn.style.padding = "10px 16px";
      editBtn.style.border = "none";
      editBtn.style.borderRadius = "4px";
      editBtn.style.backgroundColor = "#3F72AF";
      editBtn.style.color = "#fff";
      editBtn.style.cursor = "pointer";
      editBtn.addEventListener("click", () => {
        window.location.href = `edit.html?slug=${data.slug}`;
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.style.padding = "10px 16px";
      deleteBtn.style.border = "none";
      deleteBtn.style.borderRadius = "4px";
      deleteBtn.style.backgroundColor = "#d9534f";
      deleteBtn.style.color = "#fff";
      deleteBtn.style.cursor = "pointer";
      deleteBtn.addEventListener("click", () => deletePost(data._id));

      buttonGroup.appendChild(editBtn);
      buttonGroup.appendChild(deleteBtn);

      postContainer.appendChild(titleEl);
      postContainer.appendChild(authorEl);
      postContainer.appendChild(contentEl);
      postContainer.appendChild(buttonGroup);

      userBlog.appendChild(postContainer);
    });
  } catch (err) {
    console.error("Error fetching posts", err);
    displayError.style.color = "red";
    displayError.style.display = "flex";
    displayError.style.justifyContent = "center";
    displayError.textContent = "Something went wrong while loading posts.";
  }
}

async function deletePost(id) {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/blogs/delete/${id}`,
      {
        headers: { authorization: token },
      }
    );

    const { data, status } = response;

    if (status === 200) {
      alert("Your post deleted successfully");
      showPost();
    }
  } catch (err) {
    alert("Failed to delete todo: " + err.message);
  }
}
const username = localStorage.getItem("username");

window.addEventListener("DOMContentLoaded", () => {
  const greeting = document.getElementById("user-greeting");

  if (username && greeting) {
    greeting.textContent = `👋 Hello, ${username}`;
    greeting.style.display = "inline-block";
  }
});

if (username) {
  document.getElementById("logout-btn").style.display = "inline-block";
  document.getElementById("logout-btn").style.cursor = "pointer";
  document.getElementById("logout-btn").addEventListener("click", () => {
    localStorage.clear();
    location.href = "../signin/signin.html";
  });
}
