const button = document.querySelector(".profileTestButton");

button.addEventListener("click", async (e) => {
    try {
        const userId = localStorage.getItem(id)
        const res = await fetch(`http://localhost:8080/${userId}/profile`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
        }
    }),
    } catch {

    }
})
