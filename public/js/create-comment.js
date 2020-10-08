
const createComment = document.querySelector(".create-comment-form");

createComment.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(createComment);
    const message = formData.get("message");
    const userId = localStorage.getItem("MEDIUM_USER_ID");

    const paramsId = window.location.href.split('/')[4]

    const res = await fetch(`/articles/${paramsId}/comments`, {
        method: "POST",
        body: JSON.stringify({ message, userId }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('MEDIUM_ACCESS_TOKEN')}`
        }
    });

});
