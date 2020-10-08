const content = {
  init: () => {
    content.articleBox1();
    content.articleBox2();
    content.articleBox3();
  },

  articleBox1: async () => {
    try {
      const count = await content.articleCount();
      const id = await content.randomNum(count);
      const res = await fetch(`http://localhost:8080/articles/${id}`);
      const randomArticle = await res.json();
      const main = randomArticle.article;
      const author = await content.getUser(main.userId);
      console.log(author);

      document.querySelector(".artA__main--title").innerHTML = main.title;
      document.querySelector(".artA__main--author").innerHTML = author.userName;
      document
        .querySelector(".artA__main--author")
        .appendChild(content.followButton());

      document
        .querySelector(".artA__main--link")
        .setAttribute("href", `http://localhost:8080/articles/${id}`);
    } catch (err) {
      console.error(err);
    }
  },

  articleBox2: async () => {
    const box = document.querySelector(".content__article--B");
    try {
      const res = await fetch("http://localhost:8080/articles");
      const data = await res.json();
      const articles = data.articles;
      const id = data.id;

      const artUL = document.createElement("ul");
      box.appendChild(artUL);
      articles.forEach((article) => {
        const art = document.createElement("li");
        art.innerText = `${article.title} by ${article.User.userName}`;
        artUL.appendChild(art);
      });
    } catch (err) {
      console.error(err);
    }
  },

  articleBox3: async () => {
    const slots = document.querySelectorAll(".content__articleC--Article");
    slots.forEach(async (slot) => {
      try {
        const count = await content.articleCount();
        const id = await content.randomNum(count);
        const res = await fetch(`http://localhost:8080/articles/${id}`);
        const randomArticle = await res.json();
        const main = randomArticle.article;
        const author = await content.getUser(main.userId);
        slot.innerHTML = JSON.stringify(main.title + " By: " + author.userName);
      } catch (err) {
        console.error(err);
      }
    });
  },

  getUser: async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/users/publicinfo/${id}`);
      const data = await res.json();
      const user = data.user;
      return user;
    } catch (err) {
      console.error(err);
    }
  },

  articleCount: async () => {
    try {
      const res = await fetch("http://localhost:8080/articles");
      const data = await res.json();
      const count = data.articles.length;
      return count;
    } catch (err) {
      console.error(err);
    }
  },

  randomNum: (n) => {
    const num = Math.floor(Math.random() * Math.floor(n));
    if (num === 0) {
      return n;
    } else {
      return num;
    }
  },

  followButton: () => {
    const button = document.createElement("button");
    button.classList.add("followButton");
    button.textContent = "Follow";
    return button;
  },
};

window.addEventListener("DOMContentLoaded", async () => content.init());
