






// const content = {
//     init: () => {
//       content.articlesContainer();
//     //   content.articleBox2();
//     //   content.articleBox3();
//     },
// articlesContainer: async () => {
//     try {
//         const userId = localStorage.getItem("MEDIUM_TOKEN_ID")
//         const res = await fetch(`http://localhost:8080/articles/`);
//         const data = await res.json();
//         console.log(data);
//         const articles = data.article;
//         console.log(articles);
//         articles.forEach(article => {
//             if (article.User.id === userId) {
//                 document.querySelector(".teaser").innerHTML = article.body;
//                 document.querySelector(".claps").innerHTML = `Claps: ${article.claps}`;
//                 document
//                     .querySelector(".titleOfTheArticle").innerHTML = article.title
//                     .appendChild(content.followButton());
//                 document
//                     .querySelector(".link")
//                     .setAttribute("href", `http://localhost:8080/articles/${article.id}`);
//             }
//         });


//     } catch (err) {
//       console.error(err);
//     }
// }
// }
// window.addEventListener("DOMContentLoaded", async () => content.init());
