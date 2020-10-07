const app = {
  init: () => {
    app.verifyLogin();
    app.logOut();
  },

  verifyLogin: () => {
    const token = localStorage.getItem("MEDIUM_ACCESS_TOKEN");
    if (!token) {
      alert("Sign-Up or Log-in!");
      document.querySelectorAll(".limited").forEach((ele) => {
        ele.classList.add("unauthorized");
      });
    } else {
      alert("Thanks for Signing In!");
    }
  },

  logOut: () => {
    document.getElementById("log-out").addEventListener("click", () => {
      console.log("logging out");
      localStorage.clear();
    });
  },
};

document.addEventListener("DOMContentLoaded", () => app.init());
