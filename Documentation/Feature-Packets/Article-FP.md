# **Article Feature Packet**

## **Models**

- Database Info Goes Here -

---

## **Endpoints**

| Backend Endpoints               | Method | Action                                |
| ---------------------- | ------ | ------------------------------------- |
| /api/articles              | GET    | Returns list of all Articles in DB    |
| /api/articles/             | POST   | Post a new Article to DB              |
| /api/articles/:id          | GET    | Lookup Article by ID                  |
| /api/articles/:id/edit     | PUT    | Edit Article Content                  |
| /api/articles/:id/delete   | DELETE | Delete an Entire Article              |
| /api/articles/:id/comments | GET    | Retrieves all Comments for an Article |

| /api/users              | GET    | Returns list of all Users in DB    |
| /api/users/new          | POST   | Post a new user to DB              |
| /api/users/:id          | GET    | Lookup Users by ID                  |
| /api/users/:id/edit     | PUT    | Edit Users Content                  |
| /api/users/:id/delete   | DELETE | Delete a User by id             |
| /api/users/:id/comments | GET    | Retrieves all Comments for Users |

| Frontend Endpoints               | Template                                |
| ---------------------- | ------ | ------------------------------------- |
| /                      | GET    | auth ? logged-in-homepage.pug : splash.pug   |
| /articles/new          | GET    | create-article.pug              |
| /articles/:id          | GET    | display-article.pug              |
| /articles/:id/edit     | GET    | create-article.pug                  |
| /articles/:id/comments | GET    | comments.pug |
| /users/new             | GET    | create-user.pug              |
| /users/:id             | GET    | profile-page.pug                  |
| /users/sign-in         | GET    | sign-in.pug                 |


---

## **Templates**
navigation.pug
homepage.pug (need a route later if we want this feature)
logged-in-homepage.pug
sign-in.pug
create-user.pug
profile-page.pug
create-article.pug
display-article.pug
comments.pug
splash.pug

//bonuses
search-results.pug
display-users-article-list.pug
bookmark-list.pug

## **Templates**

| Template             | Location                                  |
| -------------------- | ----------------------------------------- |
| article-create.pug   | Form for Creating New Article             |
| article-edit.pug     | Edit Form                                 |
| article-carousel.pug | General Article Carousel Div on Main Page |
| article-follows.pug  | Article Carousel of Curated Content       |
| article-top.pug      | Article Carousel of Top Articles          |

---

## **Sketches**

---
