const createArticle = document.querySelector(".create-article-form");

createArticle.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(createArticle);
  const title = formData.get("title");
  const body = formData.get("body");
  const claps = 0;
  const userId = localStorage.getItem("MEDIUM_USER_ID");
  const data = { title, body, claps, userId };

  try {
    const res = await fetch("http://localhost:8080/articles", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('MEDIUM_ACCESS_TOKEN')}`
      },
    });
    if (!res.ok) {
      throw res;
    }

    window.location.href = "/";
  } catch (err) {
    const res = await err.json()
    console.error(res);
  }
});
