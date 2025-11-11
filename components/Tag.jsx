"use client";
import React from "react";
import { useRouter } from "next/navigation";


//const Tag = (props) => {
  const Tag = ({ tag }) => {
    const router = useRouter();
    // Add a defensive check
  if (!tag) return null;
    console.log("tag", tag,);
       const { id, name } = tag;

 const handleClick1 = () => {
    // Navigate to /events?artist=ArtistName
    router.push(`/events?tag=${encodeURIComponent(name)}`);
    console.log("Navigating to events for tag:", name);
  };

  ``;
  return (
    <div className="bg-gradient-to-r from-orange-400 to-teal-600 text-white rounded-2xl w-fit px-3 py-1 text-center font-bold hover:scale-110 hover:cursor-pointer">
       <button onClick={handleClick1}>
         #{name}
       </button>
        
    </div>
  );  
};

export default Tag;
