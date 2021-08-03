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
#---- COMPANY MODEL ----
# --- ADD NEW PRODUCTION COMPANY ---
  addProductionCompany(name:"New Cinema") {
    message
  }
# --- UPDATE PRODUCTION COMPANY NAME ( INFO )---
  updateProductionCompanyInfo(oldName:"Neto", newName:"Betty") {
    message
  }
# --- DELETE PRODUCTION COMPANY ---
  deleteProductionCompany(_id: "610903cfeae8f11fc4dac940") {
    message
  }

#---- COMPANY MODEL ----
# --- ADD NEW MOVIE ---
  addMovie(title:"Stranger Things", prodCompany:"NetFlix") {
    message
  }
# --- DELETE MOVIE ---
  deleteMovie(_id: "61095a76e6716d35ea15ef71") {
    message
  }
# --- UPDATE MOVIE TITLE ---
  updateMovieTitle(_id: "61095a76e6716d35ea15ef71", title: "Netflix") {
    message
  }
# --- UPDATE MOVIE PRODUCTION COMPANY ---
  updateMovieProdCompany(_id: "61095a76e6716d35ea15ef71", prodCompany:"Netflix") {
    message
  }
}
```

# Queries.
In GraphQL - Queries are used to ask/request for data or information. Queries are equivalent to GET request in RESTful APIS.

Below are the queries used in this project.
> Queries used to look for records on Company And Movie Model for the MongoDB :point_down:.

```
{
# --- Get All Production Companies With Their Movies ---
  companies {
    name
    _id
    movies {
      title
    }
  }
# --- Get All Movies ---
  movies {
    _id
    title
    prodCompany
  }
# --- Search Movie Using Movie Title ---
  searchMovie(title:"Blades") {
    _id
    prodCompany
  }
# --- Search Movie Using Movie Production Company And Get All Their Movies---
  searchProdCompany(name:"Netflix") {
    name
    movies {
      title
    }
  }
}
```
Lets Chat Over.

![twiiter](http://i.imgur.com/tXSoThF.png) [AmChrisKE](https://twitter.com/amchriske)
