exports.transformEvents = (events) => {
  return events.map((event) => ({
    id: event.id,
    name: event.name,
    description: event.description,
    date: event.date,
    isPast: new Date(event.date) < new Date(),
    numRegistered: (event.registrations || []).length,
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