
// import EventCard from "@/components/EventCard";


//     const response = await fetch("https://qevent-backend.labs.crio.do/events");
//     const data = await response.json();

//  async function eventPage() {
//     return <div>
//         {data.map((event) => (
//         <EventCard eventData={event} />
//         ))}
//         </div>;

// }
// export default eventPage; 

"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import EventCard from "@/components/EventCard";

export default function EventPage() {
  const searchParams = useSearchParams();
  const artistName = searchParams.get("artist");
  const tagName = searchParams.get("tag"); // Read query param
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("https://qevent-backend.labs.crio.do/events");
        const data = await res.json();

        // Filter by artist name if present in query params
        // const filteredData = artistName
        //   ? data.filter(
        //       (event) =>
        //         event.artist &&
        //         event.artist.toLowerCase() === artistName.toLowerCase()
        //     )
        //   : data;

        //   // Filter by tag name if present in query params
        // const filteredTag = tagName
        //   ? data.filter(
        //       (event) =>
        //         event.artist &&
        //         event.artist.toLowerCase() === tagName.toLowerCase()
        //     )
        //   : data;

        let filtered = data;

        // 🎤 Filter by artist
        if (artistName) {
          filtered = filtered.filter(
            (event) =>
              event.artist &&
              event.artist.toLowerCase() === artistName.toLowerCase()
          );
        }

        // 🏷️ Filter by tag
        if (tagName) {
          filtered = filtered.filter(
            (event) =>
              event.tags &&
              event.tags.some(
                (tag) => tag.toLowerCase() === tagName.toLowerCase()
              )
          );
        }

        setEvents(filtered);

       // setEvents(filteredData);
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, [artistName, tagName]);

  return (
    // <div className="min-h-screen bg-gray-100 px-6 py-10">
    //   <h1 className="text-3xl font-bold text-center mb-10 text-blue-600">
    //     {artistName ? `Events by ${artistName}` : "Upcoming Events"}
    //   </h1>
    <>

      {loading ? (
        <p className="text-center text-gray-600">Loading events...</p>
      ) : events.length === 0 ? (
        <p className="text-center text-gray-600">No events found for this artist.</p>
      ) : (
        // <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">

          {events.map((event) => (
            <EventCard key={event.id} eventData={event} />
          ))}
        </div>
      )}
      </>
    //</div>
  );
}