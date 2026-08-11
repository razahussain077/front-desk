const calls = [
  { name: "John Smith", issue: "AC not cooling", time: "2 min ago", status: "Booked", slot: "Today · 2:00 PM" },
  { name: "Sarah Wilson", issue: "System not turning on", time: "18 min ago", status: "Follow-up", slot: "Needs callback" },
  { name: "Mike Davis", issue: "Annual maintenance", time: "41 min ago", status: "Booked", slot: "Tomorrow · 10:00 AM" },
  { name: "Emily Carter", issue: "AC making noise", time: "1 hr ago", status: "New lead", slot: "Not scheduled" },
];

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", display: "flex" }}>
      <aside style={{ width: 250, background: "#111827", color: "#fff", padding: "28px 18px" }}>
        <div style={{ fontSize: 20, fontWeight: 750, letterSpacing: "-0.03em", padding: "0 12px 36px" }}>SwiftLabor</div>
        <div style={{ color: "#9ca3af", fontSize: 12, fontWeight: 700, padding: "0 12px 10px", textTransform: "uppercase", letterSpacing: ".08em" }}>AI Employee</div>
        {['Overview', 'Calls', 'Leads', 'Appointments'].map((item, i) => (
          <div key={item} style={{ padding: "12px", borderRadius: 9, background: i === 0 ? "#1f2937" : "transparent", color: i === 0 ? "#fff" : "#9ca3af", marginBottom: 4, fontSize: 14, fontWeight: i === 0 ? 650 : 500 }}>{item}</div>
        ))}
        <div style={{ marginTop: 34, borderTop: "1px solid #263244", padding: "24px 12px 0" }}>
          <div style={{ fontSize: 12, color: "#9ca3af" }}>BUSINESS</div>
          <div style={{ marginTop: 8, fontWeight: 650, fontSize: 14 }}>Apex Heating & Air</div>
          <div style={{ marginTop: 4, color: "#6b7280", fontSize: 12 }}>Dallas, TX</div>
        </div>
      </aside>

      <section style={{ flex: 1, padding: "34px 42px", maxWidth: 1400 }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 30 }}>
          <div>
            <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 6 }}>Wednesday, August 12</div>
            <h1 style={{ margin: 0, fontSize: 30, letterSpacing: "-0.04em" }}>Front Desk Overview</h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 13, color: "#374151" }}><span style={{ width: 8, height: 8, borderRadius: 99, background: "#22c55e" }} /> Agent online</div>
        </header>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
          {[['Calls today', '24'], ['Qualified leads', '18'], ['Jobs booked', '11'], ['Appointments', '11']].map(([label, value]) => (
            <div key={label} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: 20 }}>
              <div style={{ fontSize: 13, color: "#6b7280" }}>{label}</div><div style={{ marginTop: 9, fontSize: 28, fontWeight: 750 }}>{value}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, overflow: "hidden" }}>
          <div style={{ padding: "20px 22px", borderBottom: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between" }}>
            <div><h2 style={{ margin: 0, fontSize: 17 }}>Recent conversations</h2><div style={{ color: "#6b7280", fontSize: 13, marginTop: 4 }}>AI-handled customer calls</div></div>
            <button style={{ border: "1px solid #d1d5db", background: "#fff", borderRadius: 8, padding: "8px 12px", fontSize: 13 }}>View all</button>
          </div>
          {calls.map((call) => (
            <div key={call.name} style={{ display: "grid", gridTemplateColumns: "1.2fr 1.5fr 1fr 1fr", gap: 20, alignItems: "center", padding: "17px 22px", borderBottom: "1px solid #f0f1f3" }}>
              <div><div style={{ fontWeight: 650, fontSize: 14 }}>{call.name}</div><div style={{ color: "#9ca3af", fontSize: 12, marginTop: 3 }}>{call.time}</div></div>
              <div style={{ fontSize: 13 }}>{call.issue}</div>
              <div style={{ fontSize: 13, color: "#4b5563" }}>{call.slot}</div>
              <div><span style={{ padding: "5px 9px", borderRadius: 999, background: call.status === "Booked" ? "#ecfdf3" : "#f3f4f6", color: call.status === "Booked" ? "#15803d" : "#4b5563", fontSize: 12, fontWeight: 650 }}>{call.status}</span></div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
