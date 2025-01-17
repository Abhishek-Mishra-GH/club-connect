const prisma = require("../prisma/prisma");
const { sendNotification } = require("./notificationService");
const { sendEmail } = require("./emailService");
const { uploadFileToS3 } = require("./s3Service");

const createPost = async (clubId, content, file) => {

  let imageUrl = null;

  if (file) {
    imageUrl = await uploadFileToS3(file.buffer, file.mimetype, clubId);
  }

  // Create a new post
  const post = await prisma.post.create({
    data: {
      clubId,
      content,
      image: imageUrl,
    },
    include: { club: true },
  });

  // Notify followers
  const followers = await prisma.user.findMany({
    where: { following: { some: { id: clubId } } },
  });

  for (const follower of followers) {
    const emailContent = `Hi ${follower.name},\n\nThe club "${post.club.name}" has created a new post. Check it out in the app!`;
    sendEmail(follower.email, `New Post from ${post.club.name}`, emailContent);

    sendNotification({
      userId: follower.id,
      clubId,
      content: `The club "${post.club.name}" has created a new post: "${post.title}".`,
    });
  }

  return post;
};

const getAllPostsByFollowers = async (userId) => {
  // Fetch posts from clubs the user follows
  const posts = await prisma.post.findMany({
    where: {
      club: { followers: { some: { id: userId } } },
    },
    orderBy: { createdAt: "desc" },
    include: { club: true }, 
  });
  return posts;
};

const getAllPosts = async () => {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      club: {
        select: {
          id: true,
          name: true,
          avatar: true,
        }
      }
    }
  });

  return posts;
};

const getAllPostsByClubId = async (clubId) => {
  const posts = await prisma.post.findMany({
    where: {id: clubId},
    orderBy: { createdAt: "desc" },
    include: {
      club: {
        select: {
          id: true,
          name: true,
          avatar: true,
        }
      }
    }
  })

  return posts;
}

module.exports = {
  createPost,
  getAllPostsByFollowers,
  getAllPosts,
  getAllPostsByClubId,
};
