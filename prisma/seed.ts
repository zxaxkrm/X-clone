import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {

 await prisma.bookmarks.deleteMany();
  await prisma.like.deleteMany();
  await prisma.follow.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  const users = [];
  for (let i = 1; i <= 5; i++) {
    const user = await prisma.user.create({
      data: {
        id: `user${i}`,
        email: `user${i}@example.com`,
        displayName: `User ${i}`,
        username: `user${i}`,
        bio: `Hi I'm user${i}, Welcome to my profile`,
        location: "USA",
        job: "Developer",
        website: "google.com",
      },
    });

    users.push(user);
  } 
  console.log(`${users.length} users created`);

  const posts = [];
  for (let i = 0; i < users.length; i++) {
    for (let j = 1; j <= 5; j++) {
        const post = await prisma.post.create({
            data: {
                desc: `Post ${j} by ${users[i].displayName}`,
                userId: users[i].id
            }
        });
        posts.push(post); 
    }
    
  }

  console.log('Post Created');

  await prisma.follow.createMany({
    data: [
        {followerId: users[0].id, followingId: users[1].id},
        {followerId: users[0].id, followingId: users[2].id},
        {followerId: users[1].id, followingId: users[3].id},
        {followerId: users[2].id, followingId: users[4].id},
        {followerId: users[3].id, followingId: users[0].id},
    ]
  });
  console.log('follows created');
  
  await prisma.like.createMany({
    data: [
        {userId: users[0].id, postId: posts[0].id},
        {userId: users[1].id, postId: posts[1].id},
        {userId: users[2].id, postId: posts[2].id},
        {userId: users[3].id, postId: posts[3].id},
        {userId: users[4].id, postId: posts[4].id},
    ]
  });

  console.log('Likes created');

 const comments = [];

 for (let i = 0; i < posts.length; i++) {
    const comment = await prisma.post.create({
        data: {
            desc: `Comment on Post ${posts[i].id} by ${users[(i + 1)%5].displayName}`,
            userId: users[(i + 1)%5].id,
            parentPostId: posts[i].id //comment to parent post
        }
    });

    comments.push(comment); 
 }

 console.log('Comment created');

 const reposts = [];
 for (let i = 0; i < posts.length; i++) {
    const repost = await prisma.post.create({
        data: {
            desc:`Repost of Post ${posts[i].id} by ${users[(i + 2)%5].displayName}`,
            userId: users[(i + 2)%5].id, //reposter
            repostId: posts[i].id //repost to original post
        }
    });
    reposts.push(repost);
    
 }

 console.log('Repost Created');
 
 
await prisma.bookmarks.createMany({
    data: [
        {userId: users[0].id, postId: posts[1].id},
        {userId: users[1].id, postId: posts[2].id},
        {userId: users[2].id, postId: posts[3].id},
        {userId: users[3].id, postId: posts[4].id},
        {userId: users[4].id, postId: posts[0].id},

    ]
});
console.log('Bookmark Created');


  
  
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
