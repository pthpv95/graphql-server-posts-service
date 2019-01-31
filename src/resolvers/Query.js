const Query = {
  posts(parent, args, { prisma }, info) {
    const opAgrs = {};
    if (args.query) {
      opAgrs.where = {
        OR: [{ title_contains: args.query }, { body_contains: args.query }]
      };
    }
    return prisma.query.posts(opAgrs, info);
  },
  async post(parent, agrs, { prisma }, info) {
    const opAgrs = {};
    if (agrs.id) {
      opAgrs.where = {
        id: agrs.id
      };
    }
    const postExist = await prisma.exists.Post({ id: agrs.id });
    if (!postExist) throw new Error("Post not found");

    return prisma.query.post(opAgrs, info);
  },
  users(parent, args, { prisma }, info) {
    const opArgs = {};
    if (args.query) {
      opArgs.where = {
        OR: [{ name_contains: args.query }, { email_contains: args.query }]
      };
    }
    return prisma.query.users(opArgs, info);
  },
  comments(parent, args, ctx, info) {
    return prisma.query.comments(null, info);
  }
};

export { Query };
