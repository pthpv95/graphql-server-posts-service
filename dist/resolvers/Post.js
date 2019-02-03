"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Post = undefined;

var _authenticate = require("../utils/authenticate");

var Post = {
  comments: {
    fragment: "fragment userId on User {id}",
    resolve: function resolve(parent, args, _ref, info) {
      var request = _ref.request,
          prisma = _ref.prisma;

      var userId = (0, _authenticate.getUserId)(request, false);
      if (userId && parent.id === userId) {
        return prisma.query.comments({
          where: {
            author: { id: parent.id }
          }
        });
      }
      return [];
    }
  }
};
exports.Post = Post;