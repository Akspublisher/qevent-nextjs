 import Tag from "@/components/Tag";
 
 async function getTags() {
   const res = await fetch("https://qevent-backend.labs.crio.do/tags", {
     cache: "no-store", // ensures fresh data every reload
   }); 
   if (!res.ok) {
    throw new Error("Failed to fetch events");
  }
   return res.json();
 }
console.log("Fetched getTags function", ); 
 async function tagsPage() {
    const tags = await getTags();
    console.log("Tags Data:", tags);


    return (
    
    <>
    {tags.length === 0 ? (
        <p className="text-center text-gray-600">No tags found.</p>
      ) : ( 
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 ">
          {tags.map((tag) => (
            // <Tag key={tag.id} props={tag} />
            <Tag key={tag.id} tag={tag} />
          ))}
        </div>
      )}         
    </>
    )
}
export default tagsPage;