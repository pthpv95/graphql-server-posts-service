import { GraphQLServer, PubSub } from "graphql-yoga";
import db from "./db";
import { Query } from "./resolvers/Query";
import { Subscription } from "./resolvers/Subscription";
import { Mutation } from "./resolvers/Mutation";
import prisma from "./prisma";

const pubSub = new PubSub();

const resolvers = {
  Query,
  Subscription,
  Mutation
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: {
    db,
    pubSub,
    prisma
  }
});

// const options = {
//   port: 4000,
//   endpoint: "/graphql",
//   subscriptions: "/subscriptions",
//   playground: "/playground"
// };

server.start(() => {
  console.log(`Server is up and running on port!`);
});
