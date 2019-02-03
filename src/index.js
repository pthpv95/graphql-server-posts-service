import "@babel/polyfill";
import { GraphQLServer } from "graphql-yoga";
import { resolvers, fragmentReplacements } from "./resolvers";
import prisma from "./prisma";

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context(request) {
    return {
      prisma,
      request
    };
  },
  fragmentReplacements
});

// const options = {
//   port: 4000,
//   endpoint: "/graphql",
//   subscriptions: "/subscriptions",
//   playground: "/playground"
// };

server.start({ port: process.env.PORT || 4000 }, () => {
  console.log(`Server is up and running on port!`);
});
