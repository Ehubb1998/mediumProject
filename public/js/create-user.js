const signUpForm = document.querySelector(".create-user-form");
const demoButton = document.getElementById("demo-login");
const userField = document.getElementById("userField");
const bioField = document.getElementById("bioField");
const emailField = document.getElementById("emailField");
const passwordField = document.getElementById("passwordField");
const cpField = document.getElementById("cpField");

demoButton.addEventListener("click", (e) => {
  userField.value = "Tom2020";
  bioField.innerHTML =
    "I'm just here for the BABE vibes. I heard there was going to be cake.";
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
  const confirmedPassword = formData.get("confirmedPassword");
  const body = { email, password, userName, bio, confirmedPassword };
  // console.log(confirmedPassword);
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
    if (err.status >= 400 && err.status < 600) {
      const errorJSON = await err.json();
      // console.log(errorJSON);
      // const errorsContainer = document.querySelector(".errors-container");
      const signUpHeader = document.querySelector(".new-user-page");
      const errDiv = document.createElement("div");
      const invalidCred = document.createElement("div");
      errDiv.innerHTML = "";
      let errorsHTML = [
        `
                <div>
                    Something went wrong. Please try again.
                </div>
                `,
      ];
      const { errors } = errorJSON;
      if (errors && Array.isArray(errors)) {
        errorsHTML = errors.map((message) => {
          `<li>${message}</li>`
        });
        invalidCred.setAttribute("style", "font-size: 20px");
        console.log("It works in create-user.js");
        console.log(errorsHTML);
        for (let i = 0; i < errorsHTML.length; i++) {
          let errMsg = errorsHTML[i];
          invalidCred.appendChild(errMsg);
        }
        signUpHeader.appendChild(invalidCred);
        
        // errorsHtml = errors.map(
        //   (message) => {`
        //             <li>
        //                 ${message}
        //             </li>
        //             `
        //   });
      }
    }
  }
});

document.querySelector(".signIn_button").addEventListener("click", () => {
  document.querySelector(".loginPage").classList.remove("unauthorized");
});