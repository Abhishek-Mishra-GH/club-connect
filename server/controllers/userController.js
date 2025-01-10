const prisma = require('../prisma/prisma')

exports.getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
}

exports.getUserById = async (req, res) => {
  const id  = req.params.id
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        following: true,
      }
    })

    if (!user) {
      return res.status(404).json({ message: 'User not found'})
    }
    
    res.status(200).json({user, isClub: false})
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user' })
  }
}