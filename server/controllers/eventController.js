const prisma = require("../prisma/prisma");
const { uploadFileToS3 } = require("../services/s3Service");

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
  const file = req.file;

  try {
    const club = await prisma.club.findUnique({
      where: {
        id: clubId,
      },

      select: {
        id: true,
      },
    });

    if (!club) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    let imageUrl = null;
    // upload to s3
    if (file) {
      imageUrl = await uploadFileToS3(file.buffer, file.mimetype, clubId);
    }

    const event = await prisma.event.create({
      data: {
        name,
        date,
        location,
        description,
        image: imageUrl || undefined,
        club: {
          connect: {
            id: clubId,
          },
        },
      },
    });

    // fetch followers
    const followers = await prisma.user.findMany({
      where: { following: { some: { id: clubId } } },
    });

    // notify followers
    for (const follower of followers) {
      const emailContent = `Hi ${follower.name},\n\nThe club "${event.club.name}" has announced a new event: "${event.name}".\nDate: ${event.date}\nLocation: ${event.location}\n\nDon't miss it!`;

      sendEmail(
        follower.email,
        `New Event from ${event.club.name}`,
        emailContent
      );
    }

    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: "Failed to create event", msg: err.message });
  }
};

exports.registerForEvent = async (req, res) => {
  const { eventId } = req.body;
  const userId = req.user.id;

  if (!userId || !eventId) {
    return res.status(400).json({ error: "userId and eventId are required" });
  }

  try {
    const existingRegistration = await prisma.registration.findUnique({
      where: {
        userId_eventId: { userId, eventId },
      },
    });

    if (existingRegistration) {
      return res
        .status(400)
        .json({ error: "User is already registered for this event" });
    }

    const registration = await prisma.registration.create({
      data: {
        userId,
        eventId,
      },
    });

    return res.status(201).json({
      message: "User successfully registered for the event.",
      registration,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong!" });
  }
};

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
            city: true,
          },
        },
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
    console.error("Error fetching events:", error);
    return res.status(500).json({ message: "Failed to fetch events." });
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
          },
        },

        club: {
          select: {
            city: true,
          },
        },
      },
    });

    const transformedEvents = transformEvents(events);
    return res.status(200).json(transformedEvents);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Something went wrong!" });
  }
};

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
      return res.status(404).json({ message: "Event not found." });
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
    console.error("Error fetching event:", error);
    res.status(500).json({ message: "Failed to fetch event." });
  }
};


exports.getEventStats = async (req, res) => {
  const eventId = req.params.eventId;

  try {
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: {
        registrations: {
          select: {
            user: {
              select: {
                id: true,
                name: true,
                city: true,
                university: true,
              }
            },
          }
        },
        club: {
          select: {
            category: true,
          }
        }
      }
    })

    const transformedEvent = {
      id: event.id,
      title: event.name,
      location: event.location,
      description: event.description,
      date: event.date,
      time: new Date(event.date).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      image: event.image,
      category: event.club.category,
      registeredUsers: event.registrations.map(reg => {
        return {...reg.user }
      }),
    };

    res.status(200).json(transformedEvent);
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ message: "Failed to fetch event.", error, msg: error.message });
  }
}

exports.deleteEventById = async (req, res) => {
  const eventId = req.params.eventId
  try {
    const deletedEvent = await prisma.event.delete({
      where: {
        id: eventId,
      },
    });
    console.log('deleted');
    res.status(200).json({message: "Event deleted successfully", deletedEvent});
  } catch (error) {
    console.error("Error deleting event:", error); // Log any errors
    res.status(500).json({ message: "Failed to delete event.", error: error.message });
  }
};