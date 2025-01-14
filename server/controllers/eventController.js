const prisma = require('../prisma/prisma')

function transformEvents(events) {
  return events.map((event) => ({
    id: event.id,
    name: event.name,
    description: event.description,
    date: event.date,
    isPast: new Date(event.date) < new Date(),
    numRegistered: event.registrations.length,
    time: new Date(event.date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    location: event.location,
    clubId: event.clubId,
    image: event.image,
    city: event.club.city,
    registered: false,
  }));
}

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

exports.registerForEvent = async (req, res) => {
  const { eventId } = req.body;
  const userId = req.user.id;

  if(!userId || !eventId) {
    return res.status(400).json({ error: 'userId and eventId are required' });
  }

  try {
    const event = await prisma.event.findUnique({
      where: {id: eventId}
    });

    const existingRegistration = await prisma.registration.findUnique({
      where: {
        userId_eventId: { userId, eventId }
      }
    })

    if (existingRegistration) {
      return res.status(400).json({ error: 'User is already registered for this event' });
    }

    const registration = await prisma.registration.create({
      data: {
        userId,
        eventId
      }
    })

    return res.status(201).json({
      message: 'User successfully registered for the event.', registration
    })

  } catch(error) {
    console.log(error);
    return res.status(500).json({ error: 'Something went wrong!' });
  }
}


exports.getAllEvents = async (req, res) => {
  const { userId } = req.query;

  try {
    const events = await prisma.event.findMany({
      include: {
        registrations: {
          select: {
            userId: true,
          },
        },

        club: {
          select: {
            city: true
          }
        }
      },
    });

    // Transform data to match frontend Event interface
    const transformedEvents = events.map((event) => ({
      id: event.id,
      name: event.name,
      description: event.description,
      date: event.date,
      isPast: new Date(event.date) < new Date(),
      numRegistered: event.registrations.length,
      time: new Date(event.date).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      location: event.location,
      clubId: event.clubId,
      image: event.image,
      registered: event.registrations.some((reg) => reg.userId === userId),
      city: event.club.city,
    }));

    return res.status(200).json(transformedEvents);
  } catch (error) {
    console.error('Error fetching events:', error);
    return res.status(500).json({ message: 'Failed to fetch events.' });
  }
};

exports.getAllEventsByClubId = async (req, res) => {
  const clubId = req.params.clubId;

  try {
    const events = await prisma.event.findMany({
      where: {
        clubId: clubId,
      },

      include: {
        registrations: {
          select: {
            userId: true,
          }
        },

        club: {
          select: {
            city: true
          }
        }
      }
    })

    const transformedEvents = transformEvents(events);
    return res.status(200).json(transformedEvents);


  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Something went wrong!" });
  }
  
}

exports.getEventById = async (req, res) => {
  const { eventId, userId } = req.query;

  try {
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: {
        registrations: {
          select: {
            userId: true,
          },
        },
      },
    });

    if (!event) {
      return res.status(404).json({ message: 'Event not found.' });
    }

    const transformedEvent = {
      id: event.id,
      name: event.name,
      description: event.description,
      date: event.date,
      isPast: new Date(event.date) < new Date(),
      numRegistered: event.registrations.length,
      time: new Date(event.date).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      location: event.location,
      clubId: event.clubId,
      image: event.image,
      registered: event.registrations.some((reg) => reg.userId === userId),
    };

    res.status(200).json(transformedEvent);
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ message: 'Failed to fetch event.' });
  }
};
