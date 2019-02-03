"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fragmentReplacements = exports.resolvers = undefined;

var _Query = require("./Query");

var _Subscription = require("./Subscription");

var _Mutation = require("./Mutation");

var _User = require("./User");

var _Post = require("./Post");

var _prismaBinding = require("prisma-binding");

var resolvers = {
  Query: _Query.Query,
  Subscription: _Subscription.Subscription,
  Mutation: _Mutation.Mutation,
  User: _User.User,
  Post: _Post.Post
};

var fragmentReplacements = (0, _prismaBinding.extractFragmentReplacements)(resolvers);

exports.resolvers = resolvers;
exports.fragmentReplacements = fragmentReplacements;