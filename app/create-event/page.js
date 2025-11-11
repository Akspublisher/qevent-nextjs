
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CreateEventPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    venue: "",
    description: "",
    datetime: "",
  });
  const [loading, setLoading] = useState(false);

  // Redirect unauthenticated users
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/events");
    }
  }, [status, router]);

  if (status === "loading") return <p>Checking authentication...</p>;
  if (!session) return null;

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle form submission (Milestone 1 + 2)
  const handleEventCreate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const randomImgNum = Math.floor(Math.random() * 99) + 1;

    const newEvent = {
      name: form.name,
      description: form.description,
      venue: form.venue,
      datetime: form.datetime,
       image: `https://qevent-backend.labs.crio.do/images/event${randomImgNum}.jpg`,
    };

    try {
      const res = await fetch("https://qevent-backend.labs.crio.do/events", {
        //const res = await fetch("/api/createEvent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent),
      });

      if (res.status === 201) {
        alert("✅ Event created successfully!");
        router.push("/events"); // ✅ Redirect on success
      } else {
        alert("❌ Event alert creation failed");
      }
    } catch (error) {
      console.error("Event creation error:", error);
      alert("❌ Event creation error failed");
    } finally {
      setLoading(false);
    }
  };

//   const handleEventCreate = async (e) => {
//   e.preventDefault();

//   const newEvent = {
//     name: form.name,
  
//     };

//   try {
//     const res = await fetch("/api/createEvent", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(newEvent),
//     });

//     if (res.ok) {
//       alert("✅ Event created successfully!");
//       router.push("/events"); // redirect to events page
//     } else {
//       alert("❌ Event creation failed.");
//     }
//   } catch (err) {
//     console.error("Error:", err);
//     alert("❌ Event creation failed.");
//   }
// };
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center text-yellow-700 mb-6">
          Create a New Event
        </h1>

        <form onSubmit={handleEventCreate} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Event Name"
            value={form.name}
            onChange={handleChange}
            required
            className="border rounded-lg px-3 py-2"
          />
          <input
            type="text"
            name="venue"
            placeholder="Venue"
            value={form.venue}
            onChange={handleChange}
            required
            className="border rounded-lg px-3 py-2"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            required
            className="border rounded-lg px-3 py-2"
          />
          <input
            type="datetime-local"
            name="datetime"
            value={form.datetime}
            onChange={handleChange}
            required
            className="border rounded-lg px-3 py-2"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? "Creating..." : "Create Event"}
          </button>
        </form>
      </div>
    </div>
  );
}


// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function CreateEventPage() {
//   const [formData, setFormData] = useState({
//     name: "",
//     location: "",
//     description: "",
//     date: "",
//   });

//   const router = useRouter();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleEventCreate = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch("/api/createEvent", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (res.ok) {
//         alert("✅ Event created successfully!");
//         router.push("/events");
//       } else {
//         alert("❌ Event creation failed");
//       }
//     } catch (error) {
//       console.error(error);
//       alert("❌ Event creation failed");
//     }
//   };

//   return (
//     <form onSubmit={handleEventCreate} className="flex flex-col gap-2 p-4">
//       <input name="name" placeholder="Event name" onChange={handleChange} />
//       <input name="location" placeholder="Location" onChange={handleChange} />
//       <textarea name="description" placeholder="Description" onChange={handleChange} />
//       <input type="datetime-local" name="date" onChange={handleChange} />
//       <button type="submit">Create Event</button>
//     </form>
//   );
// }