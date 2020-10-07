const articleRouter = require("../../routes/articles");

const createComment = document.querySelector(".create-comment-form");

createComment.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(createComment);
    const comment = formData.get("comment");
    const userId = localStorage.get("MEDIUM_USER_ID")
    articleRouter.findAll()

});
