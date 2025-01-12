const prisma = require('../prisma/prisma')

exports.getAllClubs = async (req, res) => {

  const userId = req.user.id;

  try {
    const clubs = await prisma.club.findMany({
      include: {
        followers: true
      }
    });
    res.status(200).json(clubs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch clubs' });
  }
}


exports.getClubByIdWithUserFollowing = async (req, res) => {
  const  { id, userid } = req.params;
  try {
    const club = await prisma.club.findUnique({
      where: { id },
      include: {
        followers: true,
        events: true
      },
    })

    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }

    // check if user has followed this club
    const followed = club.followers.some((follower) => follower.id === userid);

    res.status(200).json({ club, isClub: true, followed });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch club' });
  }

}

exports.getClubById = async (req, res) => {
  try {
    const club = await prisma.club.findUnique({
      where: { id },
      include: {
        followers: true,
        events: true
      },
    })

    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }

    res.status(200).json({ club, isClub: true });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch club' });
  }

}

exports.getClubFollowersById = async (req, res) => {
  const id = req.params.id;
  try {
    const club = await prisma.club.findUnique({
      where: { id },
      include: {
        followers: true
      }
    })

    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }

    res.status(200).json(club.followers);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch club followers' });
  }
}


// follow club
exports.followClub = async (req, res) => {
  const { clubId } = req.body;
  const userId = req.user.id;

  if(!userId || !clubId) {
    return res.status(400).json({ message: 'Invalid data' });
  }

  
  console.log(typeof userId, userId)

  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        following: {
          connect: { id: clubId }
        }
      },
      include: {
        following: true,
      }
    });

    res.status(201).json({message: `Followed club with id: ${clubId}`, user });

  } catch (err) {
    res.status(500).json({ message: 'Failed to follow club' , err: err.message});
  }
}

exports.unfollowClub = async (req, res) => {
  const { clubId } = req.body;
  const userId = req.user.id;

  if(!userId || !clubId) {
    return res.status(400).json({ message: 'Invalid data' });
  }

  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        following: {
          disconnect: { id: clubId }
        }
      },
      include: {
        following: true
      }
    });

    res.status(200).json({message: `Unfollowed club with id: ${clubId}`, user});
  } catch (err) {
    res.status(500).json({ message: 'Failed to unfollow club' });
  }
}