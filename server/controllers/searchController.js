const prisma = require("../prisma/prisma");

exports.search = async (req, res) => {
  const q = req.query.q;
  
  if(!q) {
    return res.status(400).json({ message: "Query is required" });
  }

  try {
    const clubs = await prisma.club.findMany({
      where: {
        name: {
          contains: q,
          mode: 'insensitive'
        },
      },

      select: {
        id: true,
        name: true
      }
    });

    res.json({ clubs });
  } catch (err) {
    res.status(500).json({error: "Internal server error."});
  }
}