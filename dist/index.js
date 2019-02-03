"use strict";

require("@babel/polyfill");

var _graphqlYoga = require("graphql-yoga");

var _resolvers = require("./resolvers");

var _prisma = require("./prisma");

var _prisma2 = _interopRequireDefault(_prisma);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = new _graphqlYoga.GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: _resolvers.resolvers,
  context: function context(request) {
    return {
      prisma: _prisma2.default,
      request: request
    };
  },

  fragmentReplacements: _resolvers.fragmentReplacements
});

// const options = {
//   port: 4000,
//   endpoint: "/graphql",
//   subscriptions: "/subscriptions",
//   playground: "/playground"
// };

server.start({ port: process.env.PORT || 4000 }, function () {
  console.log("Server is up and running on port!");
});