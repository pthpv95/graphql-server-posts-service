import { getUserId } from "../utils/authenticate";

const User = {
  email: {
    fragment: "fragment userId on User { id }",
    resolve(parent, args, { request }, info) {
      const userId = getUserId(request, false);

      if (userId && parent.id === userId) {
        return parent.email;
      } else {
        return null;
      }
    }
  },
  posts: {
    fragment: "fragment userId on User {id}",
    resolve(parent, args, { request, prisma }, info) {
      const userId = getUserId(request, false);
      if (userId && parent.id === userId) {
        return prisma.query.posts({
          where: {
            author: { id: parent.id },
            published: true
          }
        });
      }
      return [];
    }
  }
};

export { User };
