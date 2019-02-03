import { getUserId } from "../utils/authenticate";

const Post = {
  // comments: {
  //   fragment: "fragment userId on User {id}",
  //   resolve(parent, args, { request, prisma }, info) {
  //     const userId = getUserId(request, false);
  //     if (userId && parent.id === userId) {
  //       return prisma.query.comments({
  //         where: {
  //           author: { id: parent.id }
  //         }
  //       });
  //     }
  //     return [];
  //   }
  // }
};
export { Post };
