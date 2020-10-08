const followButton = document.querySelector(".follow-button");

followButton.addEventListener("click", async (e) => {
    const userId = localStorage.getItem("MEDIUM_USER_ID");
    const authorId = window.location.href.split('/')[4]
    console.log(authorId)
    try {

        const res = await fetch(`/users/${authorId}/addFollow`, {
            method: "POST",
            body: JSON.stringify({ userId, authorId }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('MEDIUM_ACCESS_TOKEN')}`
            }
        });
        if (!res.ok) {
            throw res;
        }
        const data = await res.json();

    } catch(e) {
        console.log(e)
    }

});
