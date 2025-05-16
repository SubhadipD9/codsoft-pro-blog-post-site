const postSection = document.querySelector(".blog-post");
const errorSection = document.querySelector(".show-error");

const urlParams = new URLSearchParams(window.location.search);
const slug = urlParams.get("slug");

if (slug) {
  displayPost(slug);
} else {
  errorSection.textContent = "No post ID found in URL.";
}

async function displayPost(slug) {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/blogs/display/${slug}`
    );
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
    contentEl.innerHTML = post.content;
    contentEl.style.fontSize = "16px";
    contentEl.style.lineHeight = "1.6";
    contentEl.style.color = "#333";

    postContainer.appendChild(titleEl);
    postContainer.appendChild(authorEl);
    postContainer.appendChild(contentEl);

    postSection.appendChild(postContainer);
  } catch (error) {
    errorSection.textContent =
      "Failed to load the blog post. Please try again.";
    console.error("Fetch error:", error);
  }
}
