const signUpForm = document.querySelector(".create-user-form");
const demoButton = document.getElementById("demo-login");
const userField = document.getElementById("userField");
const bioField = document.getElementById("bioField");
const emailField = document.getElementById("emailField");
const passwordField = document.getElementById("passwordField");
const cpField = document.getElementById("cpField");

demoButton.addEventListener("click", e => {
  userField.value = "Tom2020";
  bioField.innerHTML = "I'm just here for the BABE vibes. I heard there was going to be cake.";
  emailField.value = "tomloan@gmail.com";
  passwordField.value = "tomloan2020";
  cpField.value = "tomloan2020";
});

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
    console.error(err);
  }
});
