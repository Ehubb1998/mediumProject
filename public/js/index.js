var app = {
  init: () => {
    app.working();
    app.checkAuth();
    app.logOut();
  },

  working: () => {
    console.log("HELLO INDEX");
  },

  checkAuth: async () => {
    try {
      const res = await fetch(
        `/users/${localStorage.getItem("MEDIUM_USER_ID")}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "MEDIUM_ACCESS_TOKEN"
            )}`,
          },
        }
      );

      const data = await res.json();
      const user = data.user.userName;
      if (!res.ok) {
        throw res;
      } else {
        app.authorized(user);
        return;
      }
    } catch (error) {
      console.error(error);
    }

    app.limited();
  },

  limited: () => {
    document.querySelectorAll(".limited").forEach((ele) => {
      ele.className = "unauthorized";
    });
    document.getElementById("start").addEventListener("click", () => {
      document.querySelector(".loginPrompt").classList.remove("unauthorized");
    });
    document.querySelector(".loginPrompt").addEventListener("click", () => {
      document.querySelector(".loginPrompt").classList.add("unauthorized");
    });
  },

  authorized: (data) => {
    document.getElementById("welcome-msg").innerText = `Good Afternoon ${data}`;
    document.querySelectorAll(".login").forEach((ele) => {
      ele.classList.add("unauthorized");
    });
  },

  logOut: () => {
    document.getElementById("log-out").addEventListener("click", () => {
      console.log("logging out");
      localStorage.clear();
    });
  },
};

document.addEventListener("DOMContentLoaded", async () => app.init());
