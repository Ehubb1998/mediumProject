const logInForm = document.querySelector(".log-in-form");
logInForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(logInForm);
  const userName = formData.get("userName");
  const password = formData.get("password");
  const body = { userName, password };

  try {
    const res = await fetch("http://localhost:8080/users/token", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw res;
    }
    const {
      token,
      user: { id },
    } = await res.json();

    localStorage.setItem("MEDIUM_ACCESS_TOKEN", token);
    localStorage.setItem("MEDIUM_USER_ID", id);
    window.location.href = "/";
  } catch (err) {
    if (err.status >= 400 && err.status < 600) {
      const errorJSON = await err.json();
      const errorsContainer = document.querySelector(".errors-container");
      let errorsHtml = [
        `
                <div>
                    Something went wrong. Please try again.
                </div>
                `,
      ];
      const { errors } = errorJSON;
      if (errors && Array.isArray(errors)) {
        errorsHtml = errors.map(
          (message) => `
                    <div>
                        ${message}
                    </div>
                    `
        );
      } else {
        alert(
          "Something went wrong. Pleae check your internet connection and try again!"
        );
      }
      errorsContainer.innerHTML = errorsHtml.join("");
    }
  }
});
