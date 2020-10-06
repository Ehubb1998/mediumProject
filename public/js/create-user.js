const signUpForm = document.querySelector(".create-user-form");

signUpForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(signUpForm);
  const userName = formData.get("userName");
  const email = formData.get("email");
  const password = formData.get("password");
  const bio = formData.get("bio");
  const body = { email, password, userName, bio };
  try {
    const res = await fetch("http://localhost:8080/users", {
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
<<<<<<< HEAD
    console.error(err);
=======
    console.error(err)
>>>>>>> e48d73e452efdd86515b63dde57ff43942b32a17
  }
});