"use client";

import { useEffect, useState } from "react";

type ChatMessage = {
  id: string;
  userEmail: string;
  message: string;
  createdAt: string;
};

export default function AdminChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/admin/messages");
        if (!res.ok) return;
        const data = await res.json();
        setMessages(data.messages ?? []);
      } catch (e) {
        console.error(e);
      }
    };
    load();
  }, []);

  const send = async () => {
    if (!input.trim()) return;
    const res = await fetch("/api/admin/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input })
    });
    if (res.ok) {
      const data = await res.json();
      setMessages(data.messages ?? []);
      setInput("");
    }
  };

  return (
    <div
      style={{
        background: "rgba(10,12,20,0.95)",
        borderRadius: 16,
        padding: 16,
        border: "1px solid rgba(120,120,150,0.4)",
        display: "flex",
        flexDirection: "column",
        height: 320
      }}
    >
      <div style={{ flex: 1, overflowY: "auto", fontSize: 13, marginBottom: 12, paddingRight: 4 }}>
        {messages.map((m) => (
          <div key={m.id} style={{ marginBottom: 8 }}>
            <div style={{ opacity: 0.7 }}>{m.userEmail}</div>
            <div>{m.message}</div>
            <div style={{ opacity: 0.5, fontSize: 11 }}>{new Date(m.createdAt).toLocaleString()}</div>
          </div>
        ))}
        {messages.length === 0 && <div style={{ opacity: 0.6 }}>No messages yet. Start the conversation.</div>}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          style={{
            flex: 1,
            background: "#050509",
            borderRadius: 999,
            border: "1px solid rgba(120,120,150,0.6)",
            padding: "6px 12px",
            color: "white"
          }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Message admins…"
        />
        <button
          onClick={send}
          style={{
            borderRadius: 999,
            border: "none",
            padding: "6px 14px",
            background: "linear-gradient(135deg, #8ab4ff, #7bdcb5)",
            color: "#050509",
            fontWeight: 600,
            fontSize: 13
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
