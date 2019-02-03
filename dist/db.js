"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var users = [{
  id: "1",
  name: "lee",
  email: "x@gmail.com",
  age: 20
}, {
  id: "2",
  name: "james",
  email: "leo@gmail.com",
  age: 22
}, {
  id: "3",
  name: "HienP",
  email: "leo@gmail.com",
  age: 22
}];

var posts = [{
  id: "1",
  title: "react with graphql",
  body: "xyz",
  published: true,
  author: "1"
}, {
  id: "2",
  title: "react with docker",
  body: "xyz",
  published: false,
  author: "1"
}, {
  id: "3",
  title: "GraphQL 101",
  body: "2312312",
  published: false,
  author: "2"
}];

var comments = [{
  id: "1",
  post: "1",
  content: "cool i like it!",
  author: "3"
}, {
  id: "2",
  post: "2",
  content: "where are you?",
  author: "3"
}];

var db = {
  users: users,
  posts: posts,
  comments: comments
};
exports.default = db;