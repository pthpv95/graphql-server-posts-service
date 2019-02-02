import { getUserId } from "../utils/authenticate";

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
  },
  myPost: {
    subscribe(parent, agrs, { request, prisma }, info) {
      const userId = getUserId(request);
      return prisma.subscription.post(
        {
          where: {
            node: {
              author: {
                id: userId
              }
            }
          }
        },
        info
      );
    }
  }
};

export { Subscription };
