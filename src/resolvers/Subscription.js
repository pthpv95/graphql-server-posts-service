const Subscription = {
  post: {
    subscribe(parent, agrs, { prisma }, info) {
      return prisma.subscription.post(
        {
          where: {
            node: { published: true }
          }
        },
        info
      );
    }
  },
  comment: {
    subscribe(parent, { postId }, { prisma }, info) {
      return prisma.subscription.comment(
        {
          where: {
            node: {
              post: { id: postId }
            }
          }
        },
        info
      );
    }
  }
};

export { Subscription };
