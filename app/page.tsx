"use client";

import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");

  const sendWish = async () => {
    const res = await fetch("/api/send-wish", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, mobile })
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <main style={{ padding: 40 }}>
      <h2>Send Birthday Wish 🎉</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Mobile (91XXXXXXXXXX)"
        value={mobile}
        onChange={e => setMobile(e.target.value)}
      />
      <br /><br />

      <button onClick={sendWish}>Send Wish</button>
    </main>
  );
}
