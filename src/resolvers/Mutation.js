import bycrypt from "bcryptjs";
import { getUserId, generateToken } from "../utils/authenticate";
import hashPassword from "../utils/hashPassword";

const Mutation = {
  async login(parent, { data }, { prisma }, info) {
    const user = await prisma.query.user({ where: { email: data.email } });

    if (!user) throw new Error("User not found");

    const isMatchedPassword = await bycrypt.compare(
      data.password,
      user.password
    );

    if (!isMatchedPassword) {
      throw new Error("Wrong password");
    }
    return {
      user,
      token: generateToken({ userId: user.id })
    };
  },
  async createUser(parent, { data }, { prisma }, info) {
    const hashedPassword = await hashPassword(data.password);

    const user = await prisma.mutation.createUser({
      data: {
        ...data,
        password: hashedPassword
      }
    });

    const token = generateToken({ userId: user.id });

    return {
      user,
      token
    };
  },
  async deleteUser(parent, agrs, { prisma }, info) {
    const userId = getUserId(request);

    return prisma.mutation.deleteUser(
      {
        where: {
          id: userId
        }
      },
      info
    );
  },
  async updateUser(parent, { data }, { prisma, request }, info) {
    const userId = getUserId(request);

    if (typeof data.password === "string") {
      const hashedPassword = await hashPassword(data.password);
      data.password = hashedPassword;
    }

    return prisma.mutation.updateUser(
      {
        data,
        where: {
          id: userId
        }
      },
      info
    );
  },
  createPost(parent, { data }, { prisma, request }, info) {
    const userId = getUserId(request);
    return prisma.mutation.createPost(
      {
        data: {
          ...data,
          author: {
            connect: {
              id: userId
            }
          }
        }
      },
      info
    );
  },
  async updatePost(parent, { id, data }, { prisma, request }, info) {
    const userId = getUserId(request);
    const postExists = await prisma.exists.Post({
      id,
      author: {
        id: userId
      }
    });

    const isPublishedPost = await prisma.exists.Post({
      id,
      published: true
    });

    if (!postExists) throw new Error("Unable to update post");

    if (isPublishedPost && !data.published) {
      await prisma.mutation.deleteManyComments({ where: { post: { id } } });
    }

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
  async deletePost(parent, agrs, { prisma, request }, info) {
    const userId = getUserId(request);
    const postExists = await prisma.exists.Post({
      id: agrs.id,
      author: {
        id: userId
      }
    });

    if (!postExists) throw new Error("Post not found");

    return prisma.mutation.deletePost({ where: { id: agrs.id } }, info);
  },
  async createComment(parent, agrs, { prisma, request }, info) {
    const userId = getUserId(request);
    const postExists = await prisma.exists.Post({
      id: agrs.data.post,
      published: true
    });

    if (!postExists) throw new Error("Post not found");

    return prisma.mutation.createComment(
      {
        data: {
          text: agrs.data.text,
          author: {
            connect: {
              id: userId
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
  async updateComment(parent, { id, data }, { prisma, request }, info) {
    const userId = getUserId(request);

    const commentExists = await prisma.exists.Comment({
      id,
      author: {
        id: userId
      }
    });

    if (!commentExists) throw new Error("Unable to update comment!");

    return prisma.mutation.updateComment(
      {
        data: { text: data.text },
        where: { id }
      },
      info
    );
  },
  async deleteComment(parent, { id }, { prisma, request }, info) {
    const userId = getUserId(request);

    const commentExists = await prisma.exists.Comment({
      id,
      author: {
        id: userId
      }
    });

    if (!commentExists) throw new Error("Unable to delete comment!");

    return prisma.mutation.deleteComment(
      {
        where: { id }
      },
      info
    );
  }
};

export { Mutation };
