# Express GraphQL MongoDB API

##### Project Info :rocket:
This project is about creating a CRUD API connected with database (MongoDB) like that of a RESTful APIS using GraphQL :kissing_heart:.

###### Dependencies Used.
1. express
2. express-graphql
3. mongoose
4. graphql

###### Dev Dependencies.
1. nodemon

###### Database.
1. MongoDB Compass

### Project Setup.
install project dependencies :point_down:.
```
$ yarn install
```
start server :rocket:.
```
$ yarn dev
```

### GraphQL Route
> http://localhost:3000/graphql

# MUTATIONS
In GraphQL - mutations are the ideal things that are used to make DELETE, UPDATE or CREATE request to the database. Just like in RESTful APIS where you used PUT/GET/DELETE/POST requests to access the database, in GraphQL you use mutations to perform the equivalent actions that you use in RESTful APIS.

Below are the mutations used in this project.
> Mutations used to ADD / UPDATE / DELETE records on Company Model for the MongoDB :point_down:.


```
mutation {
# --- ADD NEW PRODUCTION COMPANY ---
  addProductionCompany(name:"New Cinema") {
    message
  }
# --- UPDATE PRODUCTION COMPANY NAME ( INFO )---
  updateProductionCompanyInfo(oldName:"Neto", newName:"Betty") {
    message
  }
# --- DELETE PRODUCTION COMPANY ---
  deleteProductionCompany(_id: "6108fbe6b64d781cd8bc825d") {
    message
  }
}
```
