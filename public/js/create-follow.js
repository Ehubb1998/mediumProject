const followButton = document.querySelector(".follow-button");

followButton.addEventListener("submit", async (e) => {
    const userId = localStorage.getItem("MEDIUM_USER_ID");
    const authorId = window.location.href.split('/')[4]

    const res = await fetch(`/articles/${paramsId}/Follows`, {
        method: "POST",
        body: JSON.stringify({ userId, authorId }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('MEDIUM_ACCESS_TOKEN')}`
        }
    });

});
