const prisma = require('../prisma/prisma')

exports.getAllClubs = async (req, res) => {
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


exports.getClubById = async (req, res) => {
  const  id = req.params.id;
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
    await prisma.user.update({
      where: { id: userId },
      data: {
        following: {
          connect: { id: clubId }
        }
      }
    });

    res.status(201).json({message: `Followed club with id: ${clubId}`, clubId, userId});
    // await prisma.club.update({
    //   where: { id: clubId },
    //   data: {
    //     followers: {
    //       connect: { id: userId }
    //     }
    //   }
    // });
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
    await prisma.user.update({
      where: { id: userId },
      data: {
        following: {
          disconnect: { id: clubId }
        }
      }
    });

    res.status(200).json({message: `Unfollowed club with id: ${clubId}`, clubId, userId});
  } catch (err) {
    res.status(500).json({ message: 'Failed to unfollow club' });
  }
}