const prisma = require('../prisma/prisma')

exports.getAllClubs = async (req, res) => {
  try {
    const clubs = await prisma.club.findMany();
    res.status(200).json(clubs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch clubs' });
  }
}

exports.getClubById = async (req, res) => {
  const  id = req.params.id;
  try {
    const club = await prisma.club.findUnique({
      where: {
        id: parseInt(id)
      }
    })

    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }

    res.status(200).json(club);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch club' });
  }

}


// follow club
exports.followClub = async (req, res) => {
  const { userId, clubId } = req.body;

  if(!userId || !clubId) {
    return res.status(400).json({ message: 'Invalid data' });
  }

  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        clubs: {
          connect: { id: clubId }
        }
      }
    });

    await prisma.club.update({
      where: { id: clubId },
      data: {
        followers: {
          connect: { id: userId }
        }
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to follow club' });
  }
}