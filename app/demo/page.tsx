"use client";

import { useEffect, useRef, useState } from "react";

type CallState = "idle" | "connecting" | "live" | "ended" | "error";

const scenarios = [
  { name: "Standard AC repair", opener: "My AC stopped cooling last night. I need someone tomorrow afternoon.", issue: "AC Repair" },
  { name: "High urgency", opener: "It's 95 degrees and my AC is blowing warm air. I need someone today.", issue: "AC Repair" },
  { name: "Safety escalation", opener: "I smell gas near my furnace and I'm worried.", issue: "Emergency" },
];

export default function Demo() {
  const [state, setState] = useState<CallState>("idle");
  const [scenario, setScenario] = useState(0);
  const [transcript, setTranscript] = useState<{ role: "customer" | "ai"; text: string }[]>([]);
  const [liveText, setLiveText] = useState("");
  const [error, setError] = useState("");
  const [elapsed, setElapsed] = useState(0);
  const [facts, setFacts] = useState({ issue: "Pending", urgency: "Pending", customer: "Pending", address: "Pending", appointment: "Pending" });
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const dcRef = useRef<RTCDataChannel | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (state !== "live") return;
    const id = window.setInterval(() => setElapsed(v => v + 1), 1000);
    return () => window.clearInterval(id);
  }, [state]);

  useEffect(() => () => cleanup(), []);

  function cleanup() {
    streamRef.current?.getTracks().forEach(t => t.stop());
    pcRef.current?.close();
    dcRef.current?.close();
    pcRef.current = null; dcRef.current = null; streamRef.current = null;
  }

  function updateFacts(text: string) {
    const t = text.toLowerCase();
    setFacts(v => ({
      ...v,
      issue: /(ac|air conditioner|cooling|warm air)/i.test(text) ? "AC Repair" : v.issue,
      urgency: /(gas smell|smell gas|fire|smoke|carbon monoxide|sparking)/i.test(text) ? "Emergency" : /(today|95 degrees|no heat|no cooling)/i.test(text) ? "High" : v.urgency,
      address: /(street|st\.|road|rd\.|avenue|ave|blvd|drive|dr\.)/i.test(text) ? text : v.address,
      appointment: /(2:00|tomorrow|appointment|booked|reserve)/i.test(t) ? "Tomorrow · 2:00 PM" : v.appointment,
    }));
  }

  function handleEvent(raw: string) {
    try {
      const e = JSON.parse(raw);
      if (e.type === "conversation.item.input_audio_transcription.completed" && e.transcript) {
        const text = e.transcript.trim();
        if (text) { setTranscript(v => [...v, { role: "customer", text }]); updateFacts(text); setLiveText(""); }
      }
      if (e.type === "response.output_audio_transcript.done" && e.transcript) {
        const text = e.transcript.trim();
        if (text) { setTranscript(v => [...v, { role: "ai", text }]); updateFacts(text); setLiveText(""); }
      }
      if (e.type === "input_audio_buffer.speech_started") setLiveText("Listening…");
      if (e.type === "input_audio_buffer.speech_stopped") setLiveText("Thinking…");
      if (e.type === "error") setError(e.error?.message || "Realtime session error.");
    } catch {}
  }

  async function startCall() {
    setError(""); setTranscript([]); setElapsed(0); setLiveText("Connecting microphone…");
    setFacts({ issue: scenarios[scenario].issue === "Emergency" ? "Emergency" : "Pending", urgency: "Pending", customer: "John Smith", address: "Pending", appointment: "Pending" });
    setState("connecting");
    try {
      const pc = new RTCPeerConnection();
      pcRef.current = pc;
      const audio = new Audio(); audio.autoplay = true; audioRef.current = audio;
      pc.ontrack = e => { audio.srcObject = e.streams[0]; };
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream; pc.addTrack(stream.getAudioTracks()[0], stream);
      const dc = pc.createDataChannel("oai-events"); dcRef.current = dc; dc.onmessage = e => handleEvent(e.data);
      dc.onopen = () => {
        dc.send(JSON.stringify({ type: "response.create", response: { instructions: `Begin the call naturally. Say hello as the Apex Heating & Air front desk and ask how you can help. The customer scenario is: ${scenarios[scenario].opener}` } }));
      };
      const offer = await pc.createOffer(); await pc.setLocalDescription(offer);
      const response = await fetch("/api/realtime/session", { method: "POST", headers: { "Content-Type": "application/sdp" }, body: offer.sdp });
      if (!response.ok) throw new Error((await response.json().catch(() => ({}))).error || "Could not start the realtime voice session.");
      const answer = { type: "answer" as const, sdp: await response.text() };
      await pc.setRemoteDescription(answer);
      setState("live"); setLiveText("Connected — speak naturally");
    } catch (e) {
      cleanup(); setState("error"); setLiveText(""); setError(e instanceof Error ? e.message : "Could not start voice demo.");
    }
  }

  function stopCall() { cleanup(); setState("ended"); setLiveText("Call ended"); }

  function sendScenarioOpener() {
    const dc = dcRef.current;
    if (!dc || dc.readyState !== "open") return;
    dc.send(JSON.stringify({ type: "conversation.item.create", item: { type: "message", role: "user", content: [{ type: "input_text", text: scenarios[scenario].opener }] } }));
    dc.send(JSON.stringify({ type: "response.create" }));
  }

  const minutes = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const seconds = String(elapsed % 60).padStart(2, "0");
  const connected = state === "live";

  return (
    <main style={{ minHeight: "100vh", background: "#070a0f", color: "#f8fafc", fontFamily: "Inter,system-ui,sans-serif" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "30px 28px 55px" }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 42 }}>
          <div><div style={{ fontWeight: 850, fontSize: 22, letterSpacing: "-.055em" }}>SwiftLabor</div><div style={{ color: "#64748b", fontSize: 12, marginTop: 4 }}>AI Front Desk · Live Voice Sandbox</div></div>
          <div style={{ display: "flex", alignItems: "center", gap: 9, border: "1px solid #222c38", borderRadius: 999, padding: "7px 12px" }}><span style={{ width: 7, height: 7, borderRadius: 99, background: connected ? "#4ade80" : "#64748b" }} /><span style={{ color: "#9aa5b4", fontSize: 10, letterSpacing: ".08em" }}>{connected ? "LIVE VOICE" : "VOICE SANDBOX"}</span></div>
        </header>

        <section style={{ textAlign: "center", marginBottom: 32 }}><div style={{ color: "#60a5fa", fontSize: 10, fontWeight: 800, letterSpacing: ".16em" }}>SWIFTLABOR AI EMPLOYEE</div><h1 style={{ fontSize: 46, lineHeight: 1.04, letterSpacing: "-.06em", margin: "11px 0" }}>Talk to the front desk.<br />It talks back.</h1><p style={{ color: "#7f8b9d", maxWidth: 620, margin: "0 auto", lineHeight: 1.6 }}>A real browser voice session. Speak normally, interrupt naturally, change the scenario — the employee handles the conversation in real time.</p></section>

        <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>{scenarios.map((s,i)=><button key={s.name} onClick={() => { if (connected) return; setScenario(i); }} style={{ border: i===scenario?"1px solid #64748b":"1px solid #222c38", background:i===scenario?"#151c26":"#0c1118", color:i===scenario?"#fff":"#8995a5", borderRadius:9, padding:"9px 12px", cursor:connected?"default":"pointer", fontSize:11 }}>{s.name}</button>)}</div>

        <section style={{ display: "grid", gridTemplateColumns: "1.25fr .75fr", gap: 16 }}>
          <div style={{ border: "1px solid #202936", borderRadius: 20, background: "radial-gradient(circle at 50% 0%,#111a27,#0b0f15 45%)", minHeight: 540, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 30, boxShadow: "0 30px 100px rgba(0,0,0,.35)" }}>
            <div style={{ color: "#64748b", fontSize: 9, letterSpacing: ".14em" }}>{connected ? "CALL IN PROGRESS" : state === "connecting" ? "INITIALIZING" : "APEX HEATING & AIR"}</div>
            <div style={{ margin: "28px 0 16px", width: 145, height: 145, borderRadius: 999, border: `1px solid ${connected?"#3b82f6":"#263241"}`, display: "grid", placeItems: "center", boxShadow: connected?"0 0 0 14px rgba(59,130,246,.06),0 0 80px rgba(59,130,246,.16)":"none", transition:"all .4s" }}><div style={{ width: 104, height: 104, borderRadius: 999, background: connected?"#15243a":"#111720", display:"grid", placeItems:"center", fontSize:38 }}>◉</div></div>
            <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-.04em" }}>{connected ? "AI Front Desk" : "Ready to talk"}</div>
            <div style={{ color: "#6f7b8c", fontSize: 12, marginTop: 6 }}>{connected ? `${minutes}:${seconds} · microphone active` : "Your microphone becomes the phone"}</div>
            <div style={{ height: 24, marginTop: 18, color: "#60a5fa", fontSize: 12 }}>{liveText}</div>
            <div style={{ display:"flex", gap:9, marginTop:20 }}>{!connected && state !== "connecting" ? <button onClick={startCall} style={{ border:0, background:"#fff", color:"#111827", borderRadius:10, padding:"13px 20px", fontWeight:800, cursor:"pointer" }}>Start voice call</button> : connected ? <button onClick={stopCall} style={{ border:0, background:"#ef4444", color:"#fff", borderRadius:10, padding:"13px 20px", fontWeight:800, cursor:"pointer" }}>End call</button> : <button disabled style={{ border:0, background:"#334155", color:"#cbd5e1", borderRadius:10, padding:"13px 20px", fontWeight:800 }}>Connecting…</button>}{connected && <button onClick={sendScenarioOpener} style={{ border:"1px solid #344153", background:"#101721", color:"#dbe4ef", borderRadius:10, padding:"13px 15px", cursor:"pointer" }}>Inject scenario</button>}</div>
            {error && <div style={{ marginTop:18, maxWidth:500, border:"1px solid #5b252b", background:"#1d1013", color:"#fca5a5", borderRadius:10, padding:12, fontSize:11, lineHeight:1.5 }}>{error}</div>}
          </div>

          <aside style={{ border:"1px solid #202936", borderRadius:20, background:"#0c1118", padding:20, display:"flex", flexDirection:"column" }}>
            <div style={{ color:"#5f6b7a", fontSize:9, letterSpacing:".13em" }}>LIVE EMPLOYEE STATE</div>
            <div style={{ display:"grid", gap:9, marginTop:15 }}>{[["Intent",facts.issue],["Urgency",facts.urgency],["Customer",facts.customer],["Address",facts.address],["Appointment",facts.appointment]].map(([k,v])=><div key={k} style={{ padding:"11px 12px", background:"#080c12", borderRadius:9, display:"flex", justifyContent:"space-between", gap:10 }}><span style={{ color:"#697587", fontSize:10 }}>{k}</span><strong style={{ color:v==="Emergency"?"#fca5a5":"#dbe4ef", fontSize:10, textAlign:"right" }}>{v}</strong></div>)}</div>
            <div style={{ marginTop:20, color:"#5f6b7a", fontSize:9, letterSpacing:".13em" }}>TRANSCRIPT</div>
            <div style={{ marginTop:10, flex:1, minHeight:180, maxHeight:240, overflowY:"auto" }}>{transcript.length===0?<div style={{ color:"#4b5563", fontSize:11, lineHeight:1.6 }}>Conversation transcript will appear here as the voice session runs.</div>:transcript.map((m,i)=><div key={i} style={{ marginBottom:11 }}><div style={{ color:m.role==="ai"?"#60a5fa":"#a78bfa", fontSize:8, fontWeight:800, letterSpacing:".08em" }}>{m.role==="ai"?"SWIFTLABOR AI":"CUSTOMER"}</div><div style={{ color:"#cbd5e1", fontSize:11, lineHeight:1.5, marginTop:3 }}>{m.text}</div></div>)}</div>
          </aside>
        </section>

        <section style={{ marginTop:16, display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:9 }}>{[["VOICE","Realtime speech-to-speech"],["BRAIN","HVAC-specific instructions"],["WORKFLOW","Qualification + booking logic"],["NEXT","Calendar + phone integration"]].map(([k,v])=><div key={k} style={{ border:"1px solid #202936", borderRadius:11, background:"#0c1118", padding:14 }}><div style={{ color:"#5f6b7a", fontSize:8, letterSpacing:".1em" }}>{k}</div><div style={{ color:"#cbd5e1", fontSize:10, fontWeight:700, marginTop:6 }}>{v}</div></div>)}</section>

        <div style={{ textAlign:"center", color:"#4b5563", fontSize:9, marginTop:22 }}>Voice sandbox · production phone numbers, calendar and CRM are separate integrations.</div>
      </div>
      <audio ref={audioRef} autoPlay />
    </main>
  );
}
