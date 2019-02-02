import { Query } from "./Query";
import { Subscription } from "./Subscription";
import { Mutation } from "./Mutation";
import { User } from "./User";
import { Post } from "./Post";
import { extractFragmentReplacements } from "prisma-binding";

const resolvers = {
  Query,
  Subscription,
  Mutation,
  User,
  Post
};

const fragmentReplacements = extractFragmentReplacements(resolvers);

export { resolvers, fragmentReplacements };
