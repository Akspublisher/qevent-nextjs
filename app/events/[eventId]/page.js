import React from "react";

async function getEvent(eventId) {
  const res = await fetch("https://qevent-backend.labs.crio.do/events", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch events list");
  }

  const events = await res.json();
  const event = events.find((e) => e.id.toString() === eventId);

  if (!event) {
    throw new Error("Event not found");
  }

  return event;
}

// Page Component
export default async function EventDetails({ params }) {
  const { eventId } = params;
  console.log("Event ID from params:", eventId);
  console.log("Fetching event Params for ID:", params);
  const event = await getEvent(eventId);

  const { name, artist, location, description, price, image, tags = [] } = event;

  return (
    // <div>Event Details Page for Event ID: {eventId}</div>   
    <div className="min-h-screen bg-gray-50 px-6 py-10 flex flex-col items-center">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-md overflow-hidden p-6 md:p-10">
        <div className="center">
          <img
            src={image}
            alt={name}
            className="w-full md:w-1/2 h-64 object-cover rounded-lg"
          />

          <div className="flex-1">
            <h1 className="text-3xl font-bold text-yellow-700 mb-2">{name}</h1>
            <p className="text-gray-600">{location}</p>
            <p className="text-orange-600 font-semibold mb-3">{artist}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gradient-to-r from-orange-400 to-teal-600 text-white text-sm px-3 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <p className="text-gray-700 leading-relaxed mb-4">
              {description}
            </p>
            <div className="flex justify-between">
            <p className="text-2xl font-bold text-yellow-600 mb-6">${price}</p>

            <button className="bg-red-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-700 transition">
              Buy Ticket
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
