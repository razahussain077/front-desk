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
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    if (!running) return;
    if (index >= steps.length - 1) { setRunning(false); return; }
    const timer = setTimeout(() => setIndex((v) => v + 1), index < 0 ? 500 : 1050);
    return () => clearTimeout(timer);
  }, [running, index]);

  function start() { setShowDashboard(false); setIndex(-1); setRunning(true); }
  const completed = index >= steps.length - 1;

  return (
    <main style={{ minHeight: "100vh", background: "#080b10", color: "#f9fafb", padding: "38px 5vw", fontFamily: "Inter, system-ui, sans-serif" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 44 }}>
          <div><div style={{ fontWeight: 800, fontSize: 22, letterSpacing: "-.05em" }}>SwiftLabor</div><div style={{ color: "#6b7280", fontSize: 12, marginTop: 5 }}>AI Front Desk · Product Demo</div></div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}><div style={{ border: "1px solid #26303d", borderRadius: 999, padding: "7px 12px", color: "#9ca3af", fontSize: 11, letterSpacing: ".06em" }}>SIMULATION MODE</div><div style={{ width: 8, height: 8, borderRadius: 99, background: "#4ade80" }} /></div>
        </header>

        <div style={{ textAlign: "center", marginBottom: 36 }}><div style={{ color: "#60a5fa", fontSize: 12, fontWeight: 700, letterSpacing: ".12em" }}>AI EMPLOYEE · FRONT DESK</div><h1 style={{ fontSize: 46, lineHeight: 1.05, letterSpacing: "-.055em", margin: "12px 0" }}>Turn every inbound call<br />into a booked job.</h1><p style={{ color: "#8b95a5", maxWidth: 620, margin: "0 auto", lineHeight: 1.6 }}>Watch SwiftLabor qualify a customer, capture the job, find availability and prepare the booking — automatically.</p></div>

        <section style={{ display: "grid", gridTemplateColumns: "1.1fr .9fr", gap: 18 }}>
          <div style={{ border: "1px solid #202936", borderRadius: 20, background: "linear-gradient(145deg,#0e131b,#0a0d13)", padding: 26, boxShadow: "0 30px 80px rgba(0,0,0,.25)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}><div><div style={{ color: "#697586", fontSize: 10, letterSpacing: ".12em" }}>INCOMING CUSTOMER</div><h2 style={{ fontSize: 25, margin: "7px 0 0", letterSpacing: "-.04em" }}>John Smith</h2><div style={{ color: "#667085", fontSize: 12, marginTop: 3 }}>(214) 555-0182</div></div><div style={{ color: "#86efac", fontSize: 12 }}>● Connected</div></div>
            <div style={{ border: "1px solid #1d2632", borderRadius: 15, padding: 19, background: "#080b10", minHeight: 218 }}>
              <div style={{ color: "#5f6b7a", fontSize: 10, letterSpacing: ".1em", marginBottom: 18 }}>CALL TRANSCRIPT</div>
              <div style={{ display: "grid", gap: 18 }}><div><span style={{ color: "#60a5fa", fontSize: 11, fontWeight: 800 }}>SWIFTLABOR AI</span><div style={{ marginTop: 5, lineHeight: 1.55, fontSize: 14 }}>Thanks for calling Apex Heating & Air. How can I help you today?</div></div><div><span style={{ color: "#a78bfa", fontSize: 11, fontWeight: 800 }}>JOHN</span><div style={{ marginTop: 5, lineHeight: 1.55, fontSize: 14 }}>My AC stopped cooling last night. Can someone come tomorrow afternoon?</div></div>{completed && <div style={{ borderTop: "1px solid #1d2632", paddingTop: 14 }}><span style={{ color: "#60a5fa", fontSize: 11, fontWeight: 800 }}>SWIFTLABOR AI</span><div style={{ marginTop: 5, lineHeight: 1.55, fontSize: 14 }}>Absolutely. I found a 2:00 PM opening tomorrow and have prepared the appointment.</div></div>}</div>
            </div>
            <div style={{ marginTop: 18, display: "flex", gap: 9 }}><button onClick={start} disabled={running} style={{ flex: 1, border: 0, borderRadius: 10, padding: 13, background: "#fff", color: "#111827", fontWeight: 800, cursor: "pointer", opacity: running ? .5 : 1 }}>{running ? "AI is working…" : completed ? "↻ Run again" : "▶ Run live simulation"}</button><button onClick={() => { setRunning(false); setIndex(-1); setShowDashboard(false); }} style={{ border: "1px solid #354151", borderRadius: 10, padding: "0 17px", background: "transparent", color: "#d1d5db", cursor: "pointer" }}>Reset</button></div>
          </div>

          <div style={{ border: "1px solid #202936", borderRadius: 20, background: "#0d1118", padding: 26 }}>
            <div style={{ color: "#697586", fontSize: 10, letterSpacing: ".12em" }}>AI EMPLOYEE ACTIVITY</div><h2 style={{ fontSize: 19, margin: "8px 0 22px", letterSpacing: "-.03em" }}>Watch the job happen</h2>
            <div>{steps.map(([key,title,detail], i) => { const done=i<=index; const current=i===index; return <div key={key} style={{ display: "flex", gap: 12, minHeight: 61, opacity: done?1:.25 }}><div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}><div style={{ width: 24, height: 24, borderRadius: 99, display: "grid", placeItems: "center", fontSize: 10, fontWeight: 800, background: done?"#fff":"#202936", color: done?"#111827":"#697586" }}>{done?"✓":i+1}</div>{i<steps.length-1&&<div style={{ width: 1, flex: 1, background: done?"#3b4654":"#202936" }}/>}</div><div style={{ paddingBottom: 12 }}><div style={{ fontSize: 12, fontWeight: 750 }}>{title}{current&&<span style={{ color:"#60a5fa", fontWeight:500 }}> · processing</span>}</div><div style={{ color:"#697586", fontSize:11, marginTop:3, lineHeight:1.45 }}>{detail}</div></div></div>})}</div>
          </div>
        </section>

        <section style={{ marginTop: 18, display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>{[["CUSTOMER","John Smith"],["SERVICE","AC Repair"],["URGENCY","Normal"],["APPOINTMENT",completed?"Tomorrow · 2:00 PM":"Pending"]].map(([l,v])=><div key={l} style={{ border:"1px solid #202936", borderRadius:12, background:"#0d1118", padding:"15px 16px" }}><div style={{ color:"#697586", fontSize:9, letterSpacing:".1em" }}>{l}</div><div style={{ marginTop:6, fontWeight:750, fontSize:13 }}>{v}</div></div>)}</section>

        {completed && !showDashboard && <div style={{ marginTop: 18, border: "1px solid #31523d", borderRadius: 15, background: "#0c1510", padding: 19, display: "flex", justifyContent: "space-between", alignItems: "center" }}><div><div style={{ color: "#86efac", fontSize: 11, fontWeight: 800 }}>✓ JOB READY</div><div style={{ fontSize: 14, fontWeight: 700, marginTop: 5 }}>Appointment workflow completed successfully.</div></div><button onClick={() => setShowDashboard(true)} style={{ border: 0, background: "#fff", color: "#111827", borderRadius: 9, padding: "10px 14px", fontWeight: 750, cursor: "pointer" }}>View resulting dashboard →</button></div>}

        {showDashboard && <section style={{ marginTop: 18, border: "1px solid #202936", borderRadius: 18, background: "#0d1118", padding: 24 }}><div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}><div><div style={{ color:"#697586", fontSize:9, letterSpacing:".12em" }}>OPERATIONS DASHBOARD</div><h2 style={{ margin:"6px 0 0", fontSize:20 }}>Appointment created</h2></div><div style={{ color:"#86efac", fontSize:12 }}>● Confirmed</div></div><div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10 }}><div style={{ padding:16, background:"#090c11", borderRadius:11 }}><div style={{ color:"#697586", fontSize:9 }}>CUSTOMER</div><strong style={{ display:"block", marginTop:7 }}>John Smith</strong><span style={{ color:"#697586", fontSize:11 }}>1428 Oak Street</span></div><div style={{ padding:16, background:"#090c11", borderRadius:11 }}><div style={{ color:"#697586", fontSize:9 }}>JOB</div><strong style={{ display:"block", marginTop:7 }}>AC Repair</strong><span style={{ color:"#697586", fontSize:11 }}>Not cooling</span></div><div style={{ padding:16, background:"#090c11", borderRadius:11 }}><div style={{ color:"#697586", fontSize:9 }}>SCHEDULE</div><strong style={{ display:"block", marginTop:7 }}>Tomorrow · 2:00 PM</strong><span style={{ color:"#697586", fontSize:11 }}>Technician slot reserved</span></div></div></section>}

        <p style={{ textAlign:"center", color:"#4b5563", fontSize:10, marginTop:27 }}>Interactive product simulation · Simulation mode is clearly labeled. Production voice, calendar and messaging integrations are separate.</p>
      </div>
    </main>
  );
}
