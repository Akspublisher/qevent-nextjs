// export async function POST(request) {
//   const body = await request.json();
//   console.log("✅ Received event:", body);

//   // simulate successful creation
//   return Response.json({ message: "Event created successfully", event: body }, { status: 201 });
// }

// export async function POST(request) {
//   try {
//     const body = await request.json();

//     // ✅ Prepare the event object similar to what backend expects
//     const eventData = {
//       id: crypto.randomUUID(), // generate unique ID
//       name: body.name,
//       location: body.location,
//       description: body.description,
//       date: body.date,
//       time: "09:00 AM",
//       artist: "John Doe",
//       price: 500,
//       tags: ["Music"],
//       image: `https://picsum.photos/300/200?random=${Math.floor(Math.random() * 99) + 1}`,
//     };

//     // ✅ Send POST request to Crio backend
//     const response = await fetch("https://qevent-backend.labs.crio.do/events", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(eventData),
//     });

//     if (!response.ok) {
//       console.error("❌ Crio API error:", response.status, await response.text());
//       return Response.json({ error: "Event creation failed" }, { status: 500 });
//     }

//     const data = await response.json();

//     // ✅ Respond back to frontend
//     return Response.json({ message: "Event created successfully", data }, { status: 201 });
//   } catch (error) {
//     console.error("❌ Error:", error);
//     return Response.json({ error: "Something went wrong" }, { status: 500 });
//   }
// }


export async function POST(request) {
  try {
    const body = await request.json();
    console.log("✅ Received body from frontend:", body);

    const eventData = {
      id: crypto.randomUUID(),
      name: body.name,
      location: body.location,
      description: body.description,
      date: body.date,
      time: "09:00 AM",
      artist: "John Doe",
      price: 500,
      tags: ["Music"],
      image: `https://picsum.photos/300/200?random=${Math.floor(Math.random() * 99) + 1}`,
    };

    console.log("🚀 Sending eventData to Crio API:", eventData);

    const response = await fetch("https://qevent-backend.labs.crio.do/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventData),
    });

    console.log("🔍 Crio API response status:", response.status);
    const text = await response.text();
    console.log("🔍 Crio API raw response text:", text);

    if (!response.ok) {
      return Response.json({ error: "Event creation failed", details: text }, { status: 500 });
    }

    return Response.json({ message: "Event created successfully" }, { status: 201 });
  } catch (error) {
    console.error("❌ Error inside /api/createEvent:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}