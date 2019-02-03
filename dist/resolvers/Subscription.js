"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Subscription = undefined;

var _authenticate = require("../utils/authenticate");

var Subscription = {
  post: {
    subscribe: function subscribe(parent, agrs, _ref, info) {
      var prisma = _ref.prisma;

      return prisma.subscription.post({
        where: {
          node: { published: true }
        }
      }, info);
    }
  },
  comment: {
    subscribe: function subscribe(parent, _ref2, _ref3, info) {
      var postId = _ref2.postId;
      var prisma = _ref3.prisma;

      return prisma.subscription.comment({
        where: {
          node: {
            post: { id: postId }
          }
        }
      }, info);
    }
  },
  myPost: {
    subscribe: function subscribe(parent, agrs, _ref4, info) {
      var request = _ref4.request,
          prisma = _ref4.prisma;

      var userId = (0, _authenticate.getUserId)(request);
      return prisma.subscription.post({
        where: {
          node: {
            author: {
              id: userId
            }
          }
        }
      }, info);
    }
  }
};

exports.Subscription = Subscription;