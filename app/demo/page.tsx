"use client";

import { useEffect, useState } from "react";

const steps = [
  ["call", "Incoming call", "John Smith is calling Apex Heating & Air"],
  ["listen", "Conversation started", "AI Front Desk answered and is listening"],
  ["qualify", "Job qualified", "AC repair · Not cooling · Normal urgency"],
  ["customer", "Customer captured", "John Smith · 1428 Oak Street · (214) 555-0182"],
  ["calendar", "Availability checked", "Tomorrow · 2:00 PM is available"],
  ["book", "Appointment booked", "AC repair · Tomorrow · 2:00 PM"],
  ["confirm", "Confirmation prepared", "Customer confirmation is ready to send"],
];

export default function Demo() {
  const [running, setRunning] = useState(false);
  const [index, setIndex] = useState(-1);

  useEffect(() => {
    if (!running) return;
    if (index >= steps.length - 1) { setRunning(false); return; }
    const timer = setTimeout(() => setIndex((v) => v + 1), index < 0 ? 400 : 1100);
    return () => clearTimeout(timer);
  }, [running, index]);

  function start() { setIndex(-1); setRunning(true); }

  return (
    <main style={{ minHeight: "100vh", background: "#080b10", color: "#f9fafb", padding: "38px 6vw", fontFamily: "Inter, system-ui, sans-serif" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 52 }}>
          <div><div style={{ fontWeight: 800, fontSize: 21, letterSpacing: "-.04em" }}>SwiftLabor</div><div style={{ color: "#6b7280", fontSize: 12, marginTop: 4 }}>AI Front Desk · Interactive Demo</div></div>
          <div style={{ border: "1px solid #1f2937", borderRadius: 999, padding: "7px 12px", color: "#9ca3af", fontSize: 12 }}>SIMULATION MODE</div>
        </header>

        <section style={{ display: "grid", gridTemplateColumns: "1.15fr .85fr", gap: 26, alignItems: "stretch" }}>
          <div style={{ border: "1px solid #1f2937", borderRadius: 20, background: "#0d1118", padding: 28 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 26 }}><div><div style={{ color: "#6b7280", fontSize: 12 }}>LIVE CUSTOMER CALL</div><h1 style={{ fontSize: 29, letterSpacing: "-.04em", margin: "8px 0 0" }}>John Smith</h1></div><div style={{ color: "#86efac", fontSize: 13 }}>● Connected</div></div>
            <div style={{ border: "1px solid #1f2937", borderRadius: 14, padding: 20, background: "#090c11", minHeight: 230 }}>
              <div style={{ color: "#6b7280", fontSize: 11, marginBottom: 15 }}>AI CONVERSATION</div>
              <div style={{ marginBottom: 20 }}><span style={{ color: "#60a5fa", fontWeight: 700 }}>AI</span><div style={{ marginTop: 5, lineHeight: 1.6 }}>Thanks for calling Apex Heating & Air. How can I help you today?</div></div>
              <div><span style={{ color: "#a78bfa", fontWeight: 700 }}>JOHN</span><div style={{ marginTop: 5, lineHeight: 1.6 }}>My AC stopped cooling last night. Can someone come tomorrow afternoon?</div></div>
            </div>
            <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
              <button onClick={start} disabled={running} style={{ flex: 1, border: 0, borderRadius: 10, padding: 13, background: "#fff", color: "#111827", fontWeight: 750, cursor: "pointer", opacity: running ? .5 : 1 }}>{running ? "AI is working…" : "▶ Run live simulation"}</button>
              <button onClick={() => { setRunning(false); setIndex(-1); }} style={{ border: "1px solid #374151", borderRadius: 10, padding: "0 17px", background: "transparent", color: "#d1d5db", cursor: "pointer" }}>Reset</button>
            </div>
          </div>

          <div style={{ border: "1px solid #1f2937", borderRadius: 20, background: "#0d1118", padding: 28 }}>
            <div style={{ color: "#6b7280", fontSize: 12 }}>AI EMPLOYEE ACTIVITY</div>
            <h2 style={{ fontSize: 20, margin: "8px 0 24px", letterSpacing: "-.03em" }}>Watch the job happen</h2>
            <div>{steps.map(([key, title, detail], i) => { const done = i <= index; const current = i === index; return <div key={key} style={{ display: "flex", gap: 13, minHeight: 62, opacity: done ? 1 : .28 }}><div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}><div style={{ width: 25, height: 25, borderRadius: 99, display: "grid", placeItems: "center", fontSize: 11, fontWeight: 800, background: done ? "#fff" : "#1f2937", color: done ? "#111827" : "#6b7280" }}>{done ? "✓" : i + 1}</div>{i < steps.length - 1 && <div style={{ width: 1, flex: 1, background: done ? "#374151" : "#1f2937" }} />}</div><div style={{ paddingBottom: 14 }}><div style={{ fontSize: 13, fontWeight: 700 }}>{title} {current && <span style={{ color: "#60a5fa", fontWeight: 500 }}>· processing</span>}</div><div style={{ color: "#6b7280", fontSize: 12, marginTop: 3, lineHeight: 1.5 }}>{detail}</div></div></div> })}</div>
          </div>
        </section>

        <section style={{ marginTop: 26, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
          {[['CUSTOMER','John Smith'],['SERVICE','AC Repair'],['APPOINTMENT',index >= 5 ? 'Tomorrow · 2:00 PM' : 'Pending']].map(([label,value]) => <div key={label} style={{ border: "1px solid #1f2937", borderRadius: 14, background: "#0d1118", padding: 18 }}><div style={{ color: "#6b7280", fontSize: 10, letterSpacing: ".08em" }}>{label}</div><div style={{ marginTop: 7, fontWeight: 700, fontSize: 14 }}>{value}</div></div>)}
        </section>

        <p style={{ textAlign: "center", color: "#4b5563", fontSize: 11, marginTop: 30 }}>Interactive product simulation · Production voice, calendar and messaging integrations can be connected after validation.</p>
      </div>
    </main>
  );
}
