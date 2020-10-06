const createArticle = document.querySelector(".create-article-form");

createArticle.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(createArticle);
  const title = formData.get("title");
  const body = formData.get("body");

  const data = { title, body };
  try {
    const res = await fetch("http://localhost:8080/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw res;
    }
    window.location.href = "/";
  } catch (err) {
    handleErrors(err);
  }
});
