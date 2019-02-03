"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = undefined;

var _authenticate = require("../utils/authenticate");

var User = {
  email: {
    fragment: "fragment userId on User { id }",
    resolve: function resolve(parent, args, _ref, info) {
      var request = _ref.request;

      var userId = (0, _authenticate.getUserId)(request, false);

      if (userId && parent.id === userId) {
        return parent.email;
      } else {
        return null;
      }
    }
  },
  posts: {
    fragment: "fragment userId on User {id}",
    resolve: function resolve(parent, args, _ref2, info) {
      var request = _ref2.request,
          prisma = _ref2.prisma;

      var userId = (0, _authenticate.getUserId)(request, false);
      if (userId && parent.id === userId) {
        return prisma.query.posts({
          where: {
            author: { id: parent.id },
            published: true
          }
        });
      }
      return [];
    }
  }
};

exports.User = User;