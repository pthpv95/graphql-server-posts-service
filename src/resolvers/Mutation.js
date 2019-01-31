const Mutation = {
  async createUser(parent, { data }, { prisma }, info) {
    const emailTaken = await prisma.exists.User({ email: data.email });
    if (emailTaken) {
      throw new Error("Email has taken");
    }

    return prisma.mutation.createUser(data, info);
  },
  async deleteUser(parent, { id }, { prisma }, info) {
    const userExists = await prisma.exists.User({ id });

    if (!userExists) {
      throw new Error("User not existed");
    }

    return prisma.mutation.deleteUser(
      {
        where: {
          id
        }
      },
      info
    );
  },
  async updateUser(parent, { id, data }, { prisma }, info) {
    return prisma.mutation.updateUser(
      {
        data,
        where: {
          id
        }
      },
      info
    );
  },
  createPost(parent, { data, author }, { prisma }, info) {
    return prisma.mutation.createPost(
      {
        data: {
          ...data,
          author: {
            connect: {
              id: author
            }
          }
        }
      },
      info
    );
  },
  updatePost(parent, { id, data }, { prisma }, info) {
    return prisma.mutation.updatePost(
      {
        data: {
          title: data.title,
          body: data.body,
          published: data.published
        },
        where: { id }
      },
      info
    );
  },
  detelePost(parent, { id }, { prisma }, info) {
    return prisma.mutation.deletePost({ where: { id } }, info);
  },
  createComment(parent, agrs, { prisma }, info) {
    return prisma.mutation.createComment(
      {
        data: {
          text: agrs.data.text,
          author: {
            connect: {
              id: agrs.data.author
            }
          },
          post: {
            connect: {
              id: agrs.data.post
            }
          }
        }
      },
      info
    );
  },
  updateComment(parent, { id, data }, { prisma }, info) {
    return prisma.mutation.updateComment(
      {
        data: { text: data.text },
        where: { id }
      },
      info
    );
  },
  deteleComment(parent, { id }, { prisma }, info) {
    return prisma.mutation.deleteComment(
      {
        where: { id }
      },
      info
    );
  }
};

export { Mutation };
