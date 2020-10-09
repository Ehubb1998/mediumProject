const content = {
  init: () => {
    content.articleBox1A();
    content.articleBox1B();
    content.articleBox2();
    content.articleBox3();
  },

  articleBox1A: async () => {
    try {
      const count = await content.articleCount();
      const id = await content.randomNum(count);
      const res = await fetch(`http://localhost:8080/articles/${id}`);
      const randomArticle = await res.json();
      const main = randomArticle.article;
      const author = await content.getUser(main.userId);

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

  articleBox1B: async () => {
    const slots = document.querySelectorAll(".artA__side--Article");
    slots.forEach(async (slot) => {
      try {
        const count = await content.articleCount();
        const id = await content.randomNum(count);
        const res = await fetch(`http://localhost:8080/articles/${id}`);
        const randomArticle = await res.json();
        const main = randomArticle.article;
        const author = await content.getUser(main.userId);

        const divA = document.createElement("div");
        const divM = document.createElement("div");

        const name = document.createElement("h5");
        name.textContent = author.userName;
        const title = document.createElement("h3");
        title.textContent = main.title;
        const image = document.createElement("img");
        image.setAttribute(
          "src",
          `https://picsum.photos/id/${content.randomNum(100)}/100/100`
        );
        image.setAttribute("alt", "sorry blind people.");

        name.appendChild(content.followButton());
        slot.appendChild(divA);
        slot.appendChild(divM);
        divA.appendChild(name);
        divA.appendChild(title);
        divA.innerHTML += `<a href="http://localhost:8080/articles/${id}">Read More</a>`;
        divM.appendChild(image);
      } catch (err) {
        console.error(err);
      }
    });
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

        const divA = document.createElement("div");
        const divM = document.createElement("div");

        const name = document.createElement("h4");
        name.textContent = author.userName;
        const title = document.createElement("h2");
        title.textContent = main.title;
        const image = document.createElement("img");
        image.setAttribute(
          "src",
          `https://picsum.photos/id/${content.randomNum(100)}/200/133`
        );

        name.appendChild(content.followButton());
        slot.appendChild(divA);
        slot.appendChild(divM);
        divA.appendChild(name);
        divA.appendChild(title);
        divA.innerHTML += `<a href="http://localhost:8080/articles/${id}">Read More</a>`;
        divM.appendChild(image);
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
