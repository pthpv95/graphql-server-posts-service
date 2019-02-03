import { getUserId } from "../utils/authenticate";

const Query = {
  me(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    return prisma.query.user({ where: { id: userId } }, info);
  },
  posts(parent, args, { prisma }, info) {
    const opAgrs = {
      where: {
        published: true
      },
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy
    };
    if (args.query) {
      opAgrs.where = {
        ...opAgrs.where,
        OR: [{ title_contains: args.query }, { body_contains: args.query }]
      };
    }
    return prisma.query.posts(opAgrs, info);
  },
  async myPost(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    const opAgrs = {
      where: {
        author: {
          id: userId
        }
      },
      first: args.first,
      skip: args.skip,
      after: agrs.after
    };

    if (args.query) {
      opAgrs.where.OR = [
        { title_contains: args.query },
        { body_contains: args.query }
      ];
    }

    return prisma.query.posts(opAgrs, info);
  },
  async post(parent, agrs, { prisma, request }, info) {
    const posts = await prisma.query.posts(
      {
        where: {
          id: agrs.id,
          published: true
        }
      },
      info
    );

    if (posts.length === 0) {
      throw new Error("Post not found");
    }

    return posts[0];
  },
  users(parent, args, { prisma }, info) {
    const opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after
    };
    if (args.query) {
      opArgs.where = {
        OR: [{ name_contains: args.query }, { email_contains: args.query }]
      };
    }
    return prisma.query.users(opArgs, info);
  },
  comments(parent, args, { prisma }, info) {
    return prisma.query.comments(null, info);
  }
};

export { Query };
