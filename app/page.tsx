"use client";

import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const sendWish = async () => {
    if (!name || !mobile) {
      setMessage("Please enter name and mobile number");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await fetch("/api/send-wish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, mobile })
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Something went wrong");
      } else {
        setMessage("🎉 Wish sent successfully!");
        setName("");
        setMobile("");
      }
    } catch (err) {
      setMessage("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🎂 Birthday Wish Sender</h2>
        <p style={styles.subtitle}>
          Send a beautiful birthday wish with PDF on WhatsApp
        </p>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Name</label>
          <input
            style={styles.input}
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Mobile Number</label>
          <input
            style={styles.input}
            placeholder="7891171378"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>

        <button
          style={{
            ...styles.button,
            opacity: loading ? 0.7 : 1
          }}
          onClick={sendWish}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Wish 🎉"}
        </button>

        {message && (
          <p
            style={{
              marginTop: 16,
              color: message.includes("success") ? "green" : "#d32f2f",
              textAlign: "center",
              fontWeight: 500
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    padding: 16
  },
  card: {
    width: "100%",
    maxWidth: 420,
    background: "#fff",
    borderRadius: 12,
    padding: 24,
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
  },
  title: {
    textAlign: "center",
    marginBottom: 8,
    color: "#333"
  },
  subtitle: {
    textAlign: "center",
    fontSize: 14,
    color: "#666",
    marginBottom: 24
  },
  inputGroup: {
    marginBottom: 16
  },
  label: {
    display: "block",
    marginBottom: 6,
    fontSize: 14,
    fontWeight: 500,
    color: "#333"
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 8,
    border: "1px solid #ccc",
    fontSize: 14,
    outline: "none"
  },
  button: {
    width: "100%",
    padding: "14px",
    background: "#667eea",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontSize: 16,
    fontWeight: 600,
    cursor: "pointer",
    transition: "background 0.3s"
  }
};
