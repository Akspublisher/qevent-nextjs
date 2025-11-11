
export const dynamic = "force-dynamic";

import EventCard from "@/components/EventCard";

export default async function EventPage({ searchParams }) {
  const artistName = searchParams?.artist;
  const tagName = searchParams?.tag;
  let events = [];

  try {
    const res = await fetch("https://qevent-backend.labs.crio.do/events", {
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();

      // Filter logic
      let filtered = data;
      if (artistName) {
        filtered = filtered.filter(
          (event) =>
            event.artist &&
            event.artist.toLowerCase() === artistName.toLowerCase()
        );
      }
      if (tagName) {
        filtered = filtered.filter(
          (event) =>
            event.tags &&
            event.tags.some(
              (tag) => tag.toLowerCase() === tagName.toLowerCase()
            )
        );
      }

      events = filtered;
    } else {
      console.error("❌ API error:", res.status);
    }
  } catch (err) {
    console.error("⚠️ Fetch failed:", err);
  }

  return (
    <main className="p-6">
      {events.length === 0 ? (
        <p className="text-center text-gray-600">No events found.</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
          {events.map((event) => (
            <EventCard key={event.id} eventData={event} />
          ))}
        </div>
      )}
    </main>
  );
}
