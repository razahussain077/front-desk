"use client";

import { useMemo, useState } from "react";

type Message = { role: "customer" | "ai"; text: string };

type Scenario = {
  title: string;
  customer: string;
  prompt: string;
  service: string;
  urgency: "Normal" | "High" | "Emergency";
};

const scenarios: Scenario[] = [
  { title: "AC not cooling", customer: "John Smith", prompt: "My AC stopped cooling last night. Can someone come tomorrow afternoon?", service: "AC Repair", urgency: "Normal" },
  { title: "No cooling in heat", customer: "Maria Lopez", prompt: "It's 95 degrees and my AC is blowing warm air. I need someone today.", service: "AC Repair", urgency: "High" },
  { title: "Gas smell", customer: "Robert King", prompt: "I smell gas near my furnace. What should I do?", service: "Emergency", urgency: "Emergency" },
];

const replies: Record<string, string[]> = {
  "AC Repair": [
    "I'm sorry you're dealing with that. Is the system running but blowing warm air, or is it completely off?",
    "Thanks. I'll get this qualified for an AC technician. What's the service address?",
    "Got it. I have the job details. For this sandbox, I can now check the business schedule and reserve the best matching slot.",
  ],
  Emergency: [
    "Please move to a safe area and avoid operating the furnace or anything that could create a spark. If you believe there is immediate danger, contact emergency services.",
    "I can flag this as an emergency and route it to the on-call team. What is the service address?",
  ],
};

export default function Demo() {
  const [scenario, setScenario] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [phase, setPhase] = useState<"idle" | "live" | "complete">("idle");
  const [turn, setTurn] = useState(0);
  const [recording, setRecording] = useState(false);
  const [showOps, setShowOps] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");

  const active = scenarios[scenario];
  const isEmergency = active.urgency === "Emergency";
  const progress = useMemo(() => {
    if (phase === "complete") return 100;
    if (phase === "live") return Math.min(88, 18 + turn * 18);
    return 0;
  }, [phase, turn]);

  function speak(text: string) {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 1.02;
      window.speechSynthesis.speak(u);
    }
  }

  function start() {
    const first: Message = { role: "customer", text: active.prompt };
    setMessages([first]);
    setInput("");
    setTurn(0);
    setPhase("live");
    setShowOps(false);
    setCustomerName(active.customer);
    setAddress("");
    setTimeout(() => {
      const text = replies[active.service][0];
      setMessages((m) => [...m, { role: "ai", text }]);
      speak(text);
    }, 550);
  }

  function send(text = input) {
    const clean = text.trim();
    if (!clean || phase !== "live") return;
    setMessages((m) => [...m, { role: "customer", text: clean }]);
    setInput("");
    const next = turn + 1;
    setTurn(next);
    setTimeout(() => {
      let response = replies[active.service][Math.min(next, replies[active.service].length - 1)];
      if (/address|street|road|avenue|ave|blvd/i.test(clean)) {
        setAddress(clean);
        response = isEmergency ? "Thank you. I've captured the emergency details and flagged this for immediate on-call review." : "Thanks. I have the address. I'll check the schedule and find the earliest suitable appointment.";
      } else if (next >= 2 && !isEmergency) {
        response = "Perfect. I have enough information to move this job forward. I'll reserve the next suitable technician slot and prepare the customer confirmation.";
      }
      setMessages((m) => [...m, { role: "ai", text: response }]);
      speak(response);
      if (next >= (isEmergency ? 2 : 3)) setPhase("complete");
    }, 650);
  }

  function reset() {
    window.speechSynthesis?.cancel();
    setMessages([]); setInput(""); setPhase("idle"); setTurn(0); setShowOps(false); setRecording(false);
  }

  function simulateCustomerTurn() {
    if (phase !== "live") return;
    const text = turn === 0 ? "It's running but blowing warm air." : turn === 1 ? "1428 Oak Street, Dallas." : "Yes, that works for me.";
    send(text);
  }

  return (
    <main style={{ minHeight: "100vh", background: "#070a0f", color: "#f8fafc", fontFamily: "Inter,system-ui,sans-serif" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "30px 28px 55px" }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 34 }}>
          <div><div style={{ fontWeight: 850, fontSize: 22, letterSpacing: "-.055em" }}>SwiftLabor</div><div style={{ color: "#64748b", fontSize: 12, marginTop: 4 }}>Front Desk · Interactive Sandbox</div></div>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}><span style={{ width: 7, height: 7, borderRadius: 99, background: "#4ade80" }} /><span style={{ color: "#94a3b8", fontSize: 11 }}>SANDBOX ENVIRONMENT</span></div>
        </header>

        <section style={{ marginBottom: 25 }}><div style={{ color: "#60a5fa", fontSize: 11, fontWeight: 800, letterSpacing: ".14em" }}>AI EMPLOYEE / FRONT DESK</div><h1 style={{ fontSize: 44, lineHeight: 1.04, letterSpacing: "-.06em", margin: "10px 0 10px", maxWidth: 720 }}>A front desk that actually does the job.</h1><p style={{ color: "#7f8b9d", maxWidth: 680, lineHeight: 1.6, margin: 0 }}>Talk to the employee, test difficult scenarios, and watch the operational record change. No phone number or external API is required for this sandbox.</p></section>

        <div style={{ display: "flex", gap: 9, marginBottom: 18, flexWrap: "wrap" }}>{scenarios.map((s, i) => <button key={s.title} onClick={() => { setScenario(i); reset(); }} style={{ border: i === scenario ? "1px solid #64748b" : "1px solid #222b38", background: i === scenario ? "#151c26" : "#0c1118", color: i === scenario ? "#fff" : "#8995a5", borderRadius: 9, padding: "9px 12px", cursor: "pointer", fontSize: 12 }}>{s.title}{s.urgency === "Emergency" ? " · urgent" : ""}</button>)}</div>

        <section style={{ display: "grid", gridTemplateColumns: "1.2fr .8fr", gap: 16 }}>
          <div style={{ border: "1px solid #202936", borderRadius: 18, background: "#0c1118", overflow: "hidden" }}>
            <div style={{ padding: "17px 20px", borderBottom: "1px solid #202936", display: "flex", justifyContent: "space-between", alignItems: "center" }}><div><div style={{ color: "#5f6b7a", fontSize: 9, letterSpacing: ".12em" }}>CUSTOMER CONVERSATION</div><div style={{ fontWeight: 750, marginTop: 5 }}>{customerName || active.customer}</div></div><div style={{ color: phase === "idle" ? "#64748b" : "#86efac", fontSize: 11 }}>{phase === "idle" ? "Ready" : phase === "complete" ? "Completed" : "● Live"}</div></div>
            <div style={{ minHeight: 360, maxHeight: 450, overflowY: "auto", padding: 20 }}>
              {messages.length === 0 ? <div style={{ height: 320, display: "grid", placeItems: "center", textAlign: "center", color: "#526071" }}><div><div style={{ fontSize: 35, marginBottom: 10 }}>◉</div><div style={{ fontWeight: 700, color: "#9aa5b4" }}>Ready for a customer</div><div style={{ fontSize: 12, marginTop: 5 }}>Start a scenario or use the suggested customer turns.</div></div></div> : messages.map((m, i) => <div key={i} style={{ display: "flex", justifyContent: m.role === "customer" ? "flex-start" : "flex-end", marginBottom: 13 }}><div style={{ maxWidth: "78%", padding: "11px 13px", borderRadius: 12, background: m.role === "customer" ? "#151c26" : "#eaf2ff", color: m.role === "customer" ? "#e2e8f0" : "#172033", fontSize: 13, lineHeight: 1.55 }}><div style={{ fontSize: 9, fontWeight: 800, letterSpacing: ".08em", color: m.role === "customer" ? "#7dd3fc" : "#3b82f6", marginBottom: 5 }}>{m.role === "customer" ? "CUSTOMER" : "SWIFTLABOR AI"}</div>{m.text}</div></div>)}
            </div>
            <div style={{ padding: 15, borderTop: "1px solid #202936" }}><div style={{ display: "flex", gap: 8 }}><input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} disabled={phase !== "live"} placeholder={phase === "live" ? "Reply as the customer…" : "Start the scenario first"} style={{ flex: 1, background: "#080c12", border: "1px solid #263241", borderRadius: 9, padding: "11px 12px", color: "#fff", outline: "none" }} /><button onClick={() => send()} disabled={phase !== "live" || !input.trim()} style={{ border: 0, borderRadius: 9, padding: "0 15px", background: "#fff", color: "#111827", fontWeight: 750, cursor: "pointer", opacity: phase !== "live" || !input.trim() ? .35 : 1 }}>Send</button></div><div style={{ display: "flex", gap: 8, marginTop: 9 }}><button onClick={start} style={{ border: 0, borderRadius: 8, background: "#2563eb", color: "#fff", padding: "9px 12px", fontSize: 11, fontWeight: 750, cursor: "pointer" }}>{phase === "complete" ? "Run again" : "Start employee"}</button><button onClick={simulateCustomerTurn} disabled={phase !== "live"} style={{ border: "1px solid #2b3746", borderRadius: 8, background: "transparent", color: "#a8b2c1", padding: "9px 12px", fontSize: 11, cursor: "pointer", opacity: phase !== "live" ? .4 : 1 }}>Use suggested customer turn</button><button onClick={() => setRecording((v) => !v)} style={{ marginLeft: "auto", border: "1px solid #2b3746", borderRadius: 8, background: recording ? "#35151a" : "transparent", color: recording ? "#fca5a5" : "#a8b2c1", padding: "9px 12px", fontSize: 11, cursor: "pointer" }}>{recording ? "● Recording" : "Record test"}</button></div></div>
          </div>

          <aside style={{ border: "1px solid #202936", borderRadius: 18, background: "#0c1118", padding: 20 }}>
            <div style={{ color: "#5f6b7a", fontSize: 9, letterSpacing: ".12em" }}>EMPLOYEE STATE</div><h2 style={{ fontSize: 18, margin: "7px 0 18px", letterSpacing: "-.03em" }}>{active.title}</h2>
            <div style={{ height: 4, background: "#1c2632", borderRadius: 99, overflow: "hidden", marginBottom: 18 }}><div style={{ width: `${progress}%`, height: "100%", background: "#60a5fa", transition: "width .4s" }} /></div>
            <div style={{ display: "grid", gap: 9 }}>{[["Intent",active.service],["Urgency",active.urgency],["Customer",customerName || "Pending"],["Address",address || "Pending"],["Appointment",phase === "complete" && !isEmergency ? "Tomorrow · 2:00 PM" : "Pending"],["Status",phase === "complete" ? (isEmergency ? "Escalated" : "Ready to book") : phase === "live" ? "Working" : "Waiting"]].map(([k,v]) => <div key={k} style={{ display: "flex", justifyContent: "space-between", gap: 10, padding: "10px 11px", background: "#080c12", borderRadius: 9 }}><span style={{ color: "#687587", fontSize: 11 }}>{k}</span><strong style={{ fontSize: 11, textAlign: "right", color: v === "Emergency" ? "#fca5a5" : "#dbe4ef" }}>{v}</strong></div>)}</div>
            {phase === "complete" && <button onClick={() => setShowOps((v) => !v)} style={{ width: "100%", marginTop: 15, border: "1px solid #344153", borderRadius: 9, background: "#121923", color: "#fff", padding: 10, fontWeight: 700, cursor: "pointer" }}>{showOps ? "Hide operational record" : "Open operational record →"}</button>}
          </aside>
        </section>

        {showOps && <section style={{ marginTop: 16, border: "1px solid #24303e", borderRadius: 16, background: "#0c1118", padding: 20 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 15 }}><div><div style={{ color: "#5f6b7a", fontSize: 9, letterSpacing: ".12em" }}>OPERATIONS RECORD</div><h2 style={{ margin: "6px 0 0", fontSize: 18 }}>What the employee handed off</h2></div><span style={{ color: isEmergency ? "#fca5a5" : "#86efac", fontSize: 11 }}>{isEmergency ? "Escalation required" : "Job ready"}</span></div><div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 9 }}>{[["CUSTOMER",customerName || active.customer],["SERVICE",active.service],["ADDRESS",address || "1428 Oak Street"],["NEXT ACTION",isEmergency ? "Notify on-call" : "Reserve technician"]].map(([k,v]) => <div key={k} style={{ padding: 14, background: "#080c12", borderRadius: 10 }}><div style={{ color: "#5f6b7a", fontSize: 9, letterSpacing: ".08em" }}>{k}</div><div style={{ marginTop: 6, fontSize: 12, fontWeight: 750 }}>{v}</div></div>)}</div></section>}

        <div style={{ marginTop: 22, padding: "13px 15px", border: "1px solid #1e2935", borderRadius: 10, color: "#657286", fontSize: 10, lineHeight: 1.5 }}>Sandbox mode: this environment is designed to demonstrate the employee workflow without a phone number or paid integrations. Production voice, calendar, messaging and CRM connectors can be swapped in behind the same workflow.</div>
      </div>
    </main>
  );
}
