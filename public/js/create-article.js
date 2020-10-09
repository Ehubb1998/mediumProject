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
        Authorization: `Bearer ${localStorage.getItem("MEDIUM_ACCESS_TOKEN")}`,
      },
    });
    if (!res.ok) {
      throw res;
    }

    window.location.href = "/";
  } catch (err) {
    console.error(err);
  }
});

// Attempting to Get Auto Expand Text Area
document.getElementById("storyTitle").addEventListener(
  "input",
  function (event) {
    if (event.target.tagName.toLowerCase() !== "textarea") {
      console.log("hello");
      return;
    } else {
      console.log("goodbye");
      autoExpand(event.target);
    }
  },
  false
);

const autoExpand = (field) => {
  field.style.height = "inherit";

  var computed = window.getComputedStyle(field);

  var height =
    parseInt(computed.getPropertyValue("border-top-width"), 10) +
    parseInt(computed.getPropertyValue("padding-top"), 10) +
    field.scrollHeight +
    parseInt(computed.getPropertyValue("padding-bottom"), 10) +
    parseInt(computed.getPropertyValue("border-bottom-width"), 10);

  field.style.height = height + "px";
};
