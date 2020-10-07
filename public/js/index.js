const app = {
  init: () => {
    app.checkAuth();
    app.verifyLogin();
    app.logOut();
  },

  checkAuth: async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/users/${localStorage.getItem("MEDIUM_USER_ID")}`,
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
        document.getElementById(
          "welcome-msg"
        ).innerText = `Good Afternoon ${user}`;
      }
    } catch (error) {
      console.error(error);
    }
  },

  verifyLogin: () => {
    const token = localStorage.getItem("MEDIUM_ACCESS_TOKEN");
    if (!token) {
      document.querySelectorAll(".limited").forEach((ele) => {
        ele.classList.add("unauthorized");
      });
    } else {
    }
  },

  logOut: () => {
    document.getElementById("log-out").addEventListener("click", () => {
      console.log("logging out");
      localStorage.clear();
    });
  },
};

window.addEventListener("DOMContentLoaded", async () => app.init());
