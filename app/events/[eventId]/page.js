// "use client";
// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import EventCard from "@/components/EventCard";

// export default function EventPage() {
//   const searchParams = useSearchParams();
//   const idName = searchParams.get("id"); // Read query param
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchEvents() {
//       try {
//         const res = await fetch("https://qevent-backend.labs.crio.do/events");
//         const data = await res.json();

//         //Filter by artist name if present in query params
//         const filteredData = idName
//           ? data.filter(
//               (event) =>
//                 event.id &&
//                 event.id.toLowerCase() === idName.toLowerCase()
//             )
//           : data;

//         setEvents(filteredData);
      
//       } catch (err) {
//         console.error("Error fetching events:", err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchEvents();
//   }, [idName]);

//   return (
//     // <div className="min-h-screen bg-gray-100 px-6 py-10">
//     //   <h1 className="text-3xl font-bold text-center mb-10 text-blue-600">
//     //     {artistName ? `Events by ${artistName}` : "Upcoming Events"}
//     //   </h1>
//     <>

//       {loading ? (
//         <p className="text-center text-gray-600">Loading events...</p>
//       ) : events.length === 0 ? (
//         <p className="text-center text-gray-600">No id found for this artist.</p>
//       ) : (
//         // <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//         <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">

//           {events.map((event) => (
//             <EventCard key={event.id} eventData={event} />
//           ))}
//         </div>
//       )}
//       </>
//     //</div>
//   );
// }

import React from "react";

// Fetch event data by ID
// async function getEvent(eventId) {
//     console.log("Fetching event ID:", eventId);
//     console.log("Fetching URL:", `https://qevent-backend.labs.crio.do/events/${eventId}`);

//   const res = await fetch(`https://qevent-backend.labs.crio.do/events/${eventId}`, {
//   //  const res = await fetch(`https://qevent-backend.labs.crio.do/events/1`, {
//     cache: "no-store",
//   });
//   console.log("Fetch response:", res);

//   if (!res.ok) {
//     throw new Error("Failed to fetch event details");
//   }

//   return res.json();
// }

// async function getEvent(eventId) {
//   console.log("Fetching URL:", `https://qevent-backend.labs.crio.do/events/${eventId}`);

//   console.log("Fetching event:", eventId);
//   const res = await fetch(`https://qevent-backend.labs.crio.do/events/${eventId}`, {
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch event details");
//   }

//   return res.json();
// }

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
