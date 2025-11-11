import ArtistCard from "@/components/ArtistCard";

async function getArtists() {
  const res = await fetch("https://qevent-backend.labs.crio.do/artists", {
    cache: "no-store", // ensures fresh data every reload
  });   
  if (!res.ok) {
    throw new Error("Failed to fetch events");
  }

  return res.json();
}




async function artistsPage() {
    const artists = await getArtists();
    
    return (
    <>
    {artists.length === 0 ? (
        <p className="text-center text-gray-600">No artists found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 ">
       {/* //   <div className="flex gap-6 sm:flex-rows-2 md:flex-row-3 lg:flex-rows-4"> */}
          {artists.map((artist) => (
            <ArtistCard key={artist.id} artistData={artist} />
          ))}
        </div>
      )}
   </>
    )
}
export default artistsPage;