const prisma = require('../prisma/prisma')

exports.createEvent = async (req, res) => {
  const { name, description, date, location } = req.body;
  const clubId = req.id;
  try {

    const club = await prisma.club.findUnique({
      where: {
        id: clubId
      },

      select: {
        id: true
      }
    })

    if(!club) {
      return res.status(401).json({message: "Unauthorized"});
    }

    const event = await prisma.event.create({
      data: {
        name,
        date,
        location,
        description,
        club: {
          connect: {
            id: clubId
          }
        }
      }
    });
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create event' });
    console.log(err)
    console.log(err.message)
  }
}

exports.getAllEvents = async (req, res) => {
  try {
    const events = await prisma.event.findMany();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch events' });
  }
}

exports.getEventById = async (req, res) => {
  const id = req.params.id;
  try {
    const event = await prisma.event.findUnique({
      where: {
        id: parseInt(id)
      }
    })

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch event' });
  }
}