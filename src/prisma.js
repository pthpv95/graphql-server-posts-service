import { Prisma } from "prisma-binding";

const prisma = new Prisma({
  typeDefs: "src/generated/prisma.graphql",
  endpoint: "http://localhost:4466"
});

export default prisma

// prisma.query.users(null, "{ id name email posts{id title body}}").then(data => {
//   console.log(data);
//});

// const createPostForUser = async(authorId, data)=>{
//   const userExists = await prisma.exists.User({id: authorId})
//   if(!userExists) throw new Error("User not found")

//   const post = await prisma.mutation.createPost({
//     data:{
//       ...data,
//       author:{
//         connect:{
//           id: authorId
//         }
//       }
//     }
//   }, '{ id author { id name email posts { id title body published } } }')

//   return post.author
// }

// const updatePostForUser = async (postId, data)=>{
//   const postExist = await prisma.exists.Post({id: postId})

//   if(!postExist) throw new Error('Post not found')

//   const post = await prisma.mutation.updatePost({
//     where:{
//       id: postId
//     },
//     data
//   }, '{ author { id name email posts { id title published } } }')

//   return post.author
// }

// updatePostForUser("cjren3mgv00140819yfqhc0r9", {
//   title: 'Update post using prisma',
//   body: 'Prisma 101',
//   published: true
// }).then((user)=>{
//   console.log(user)
// }).catch((error)=>console.log(error))

// createPostForUser("cjrenqob7001z0819ywwljsu1", {
//   title: "AWS service",
//   body: "Docker swarms",
//   published: true
// }).then((user) => console.log(user)).catch((err) => console.log(err))



// prisma.query.comments(null, "{id text author{id name}}").then(data => {
//   console.log(JSON.stringify(data, undefined, 2));
// });

// prisma.mutation
//   .createPost(
//     {
//       data: {
//         title: "my new post mutation from primsa",
//         body: "you can do alot of things with prisma",
//         published: true,
//         author: {
//           connect: {
//             id: "cjremnvgt000x08192bn8hjkp"
//           }
//         }
//       }
//     },
//     "{id title body published}"
//   )
//   .then(data => {
//     console.log(data);
//   });
