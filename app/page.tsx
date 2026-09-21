import Link from "next/link";
import "./marketing.css";

const ArrowUpRight = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <path d="M5 15 15 5M7 5h8v8" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowRight = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Check = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <path d="m5 10 3 3 7-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function Logo() {
  return (
    <Link className="site-brand" href="/" aria-label="SwiftLabor home">
      <span className="site-brand-mark">S</span>
      <span className="site-brand-word">
        SwiftLabor<span>.ai</span>
      </span>
    </Link>
  );
}

function WorkflowLine({ label, detail, status = "ready", last = false }: { label: string; detail: string; status?: string; last?: boolean }) {
  return (
    <div className="wf-row">
      <div className="wf-node">
        <span className={`wf-dot ${status}`} />
        {!last && <span className="wf-line" />}
      </div>
      <div className="wf-copy">
        <strong>{label}</strong>
        <span>{detail}</span>
      </div>
      <span className={`wf-status ${status}`}>{status === "done" ? "complete" : status === "active" ? "running" : "ready"}</span>
    </div>
  );
}

export default function Home() {
  return (
    <main className="site">
      <header className="site-header">
        <div className="site-header-inner">
          <Logo />
          <nav className="site-nav" aria-label="Main navigation">
            <a href="#workflows">Workflows</a>
            <a href="#approach">Approach</a>
            <a href="#fit">Where it fits</a>
            <a href="#contact">Contact</a>
          </nav>
          <a className="site-header-cta" href="#contact">
            Talk to us <ArrowUpRight />
          </a>
        </div>
      </header>

      <section className="hero" aria-labelledby="hero-heading">
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="eyebrow-dot" /> DIGITAL WORKERS FOR OPERATIONS
            </div>
            <h1 id="hero-heading">
              The work <em>between</em> the work is where teams lose time.
            </h1>
            <p className="hero-lede">
              SwiftLabor builds purpose-built digital workers for repetitive business processes — the calls,
              documents, research, follow-ups and handoffs that quietly consume good people&apos;s days.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#workflows">
                Explore the workflows <ArrowRight />
              </a>
              <Link className="button button-ghost" href="/demo">
                View live demo
              </Link>
            </div>
            <div className="hero-note">
              <span className="mini-lock">
                <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M6.5 8V6.2a3.5 3.5 0 1 1 7 0V8M5 8h10v8H5z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>
              </span>
              Built around your systems. Deployed around your process.
            </div>
          </div>

          <div className="hero-visual" aria-label="Example digital worker workflow">
            <div className="visual-glow visual-glow-a" />
            <div className="visual-glow visual-glow-b" />
            <div className="ops-window">
              <div className="ops-topbar">
                <div className="ops-dots"><i/><i/><i/></div>
                <div className="ops-label">SWIFTLABOR / WORKFLOW</div>
                <div className="ops-live"><span/> LIVE</div>
              </div>
              <div className="ops-body">
                <div className="ops-heading">
                  <div>
                    <span className="muted-cap">CURRENT JOB</span>
                    <h2>Service inquiry → booked job</h2>
                  </div>
                  <span className="ops-pulse">running</span>
                </div>
                <div className="workflow">
                  <WorkflowLine label="Inbound call" detail="Customer requests AC repair" status="done" />
                  <WorkflowLine label="AI qualification" detail="Issue, urgency, address captured" status="done" />
                  <WorkflowLine label="Availability check" detail="Next opening found in calendar" status="active" />
                  <WorkflowLine label="Appointment booking" detail="Customer confirmation queued" status="ready" />
                  <WorkflowLine label="Team handoff" detail="Structured summary sent to dispatch" status="ready" last />
                </div>
                <div className="ops-footer">
                  <div><span className="footer-key">WORKER</span><b>Service Coordinator</b></div>
                  <div><span className="footer-key">MODE</span><b>Autonomous</b></div>
                  <div><span className="footer-key">NEXT</span><b>Book slot</b></div>
                </div>
              </div>
            </div>
            <div className="floating-card floating-card-top">
              <span className="fc-kicker">12:41 PM</span>
              <strong>Qualified job</strong>
              <span>Residential · High urgency</span>
            </div>
            <div className="floating-card floating-card-bottom">
              <span className="fc-icon">↗</span>
              <div><strong>Clean handoff</strong><span>Dispatch receives structured context</span></div>
            </div>
          </div>
        </div>
        <div className="hero-stripe">
          <span>Current focus</span>
          <strong>HVAC service operations</strong>
          <i />
          <span>Also exploring</span>
          <strong>Freight & sales operations</strong>
        </div>
      </section>

      <section className="manifesto section-rule" id="approach">
        <div className="section-kicker">01 / THE POINT</div>
        <div className="manifesto-grid">
          <h2>Not another AI assistant.</h2>
          <div>
            <p className="large-copy">
              Most “AI automation” stops at generating an answer. We care about what happens after the answer:
              the record gets updated, the appointment gets booked, the follow-up gets sent, the exception gets
              surfaced, and the next person gets exactly what they need.
            </p>
            <div className="principle-row">
              <div className="principle">
                <span>01</span><b>One workflow</b><p>We start with a job that already exists.</p>
              </div>
              <div className="principle">
                <span>02</span><b>Clear output</b><p>Every action has a defined handoff.</p>
              </div>
              <div className="principle">
                <span>03</span><b>Observable</b><p>You can see what the worker did.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="workflows section-rule" id="workflows">
        <div className="section-kicker">02 / WORKFLOWS</div>
        <div className="workflows-heading">
          <div>
            <h2>Give the repetitive work a job description.</h2>
          </div>
          <p>We design digital workers around a business process, not a generic chatbot prompt.</p>
        </div>

        <article className="workflow-feature">
          <div className="feature-copy">
            <span className="feature-number">01</span>
            <span className="feature-tag">HVAC / SERVICE OPERATIONS</span>
            <h3>Recover the calls your team can&apos;t answer.</h3>
            <p>
              A service coordinator that can answer inbound calls, qualify the job, collect the right details,
              help schedule the next step, and leave a clean record for the team.
            </p>
            <div className="feature-points">
              <span><Check /> Inbound call handling</span>
              <span><Check /> Job qualification</span>
              <span><Check /> After-hours coverage</span>
              <span><Check /> Structured handoff</span>
            </div>
            <Link href="/demo" className="text-link">See the working prototype <ArrowRight /></Link>
          </div>
          <div className="feature-panel">
            <div className="panel-head"><span>LIVE WORKER VIEW</span><span>PROTOTYPE</span></div>
            <div className="call-card">
              <div className="call-top">
                <span className="call-ring">◉</span>
                <div><strong>AI Service Coordinator</strong><span>Listening · 00:42</span></div>
              </div>
              <div className="call-message customer">
                <span>CUSTOMER</span>
                <p>“My AC is blowing warm air and I&apos;d like someone today.”</p>
              </div>
              <div className="call-message agent">
                <span>WORKER</span>
                <p>“I can help with that. I&apos;ll get a few details and check the earliest available appointment.”</p>
              </div>
              <div className="call-status-grid">
                <div><span>JOB</span><b>AC repair</b></div>
                <div><span>URGENCY</span><b>High</b></div>
                <div><span>PROPERTY</span><b>Residential</b></div>
                <div><span>HANDOFF</span><b>Dispatch-ready</b></div>
              </div>
            </div>
          </div>
        </article>

        <article className="workflow-feature reverse">
          <div className="feature-copy">
            <span className="feature-number">02</span>
            <span className="feature-tag">FREIGHT / SALES OPERATIONS</span>
            <h3>Turn account research into a decision-ready brief.</h3>
            <p>
              Scout maps the public evidence around a target account — company context, relevant people,
              signals and ICP fit — and turns it into something a rep can use before the first conversation.
            </p>
            <div className="feature-points">
              <span><Check /> Company intelligence</span>
              <span><Check /> Decision-maker mapping</span>
              <span><Check /> ICP qualification</span>
              <span><Check /> Evidence-backed output</span>
            </div>
            <a href="#contact" className="text-link">Discuss a sales workflow <ArrowRight /></a>
          </div>
          <div className="feature-panel scout-panel">
            <div className="panel-head"><span>SCOUT / ACCOUNT BRIEF</span><span>EXAMPLE</span></div>
            <div className="intel-card">
              <div className="intel-head">
                <div className="account-mark">R</div>
                <div><span>Target account</span><strong>Regional Freight Co.</strong></div>
                <span className="fit-badge">ICP FIT</span>
              </div>
              <div className="intel-lines">
                <div><span>Business signal</span><b>Expanding carrier network</b></div>
                <div><span>Commercial owner</span><b>VP Sales</b></div>
                <div><span>Research gap</span><b>Manual pre-call prep</b></div>
              </div>
              <div className="intel-quote">
                <span>OPENING ANGLE</span>
                <p>“Your reps shouldn&apos;t spend the first hour researching the account they&apos;re calling.”</p>
              </div>
            </div>
          </div>
        </article>
      </section>

      <section className="fit section-rule" id="fit">
        <div className="section-kicker">03 / WHERE IT FITS</div>
        <div className="fit-grid">
          <div className="fit-intro">
            <h2>Good candidates are easy to recognize.</h2>
            <p>
              The strongest workflows have high repetition, clear inputs, a predictable handoff, and a team
              that is already spending time doing the job manually.
            </p>
          </div>
          <div className="fit-list">
            {[
              ["Calls & intake", "Missed calls, qualification, scheduling, routing"],
              ["Research & qualification", "Account mapping, people discovery, signal checking"],
              ["Documents & data", "Extraction, validation, updates between systems"],
              ["Follow-up & handoffs", "Reminders, status changes, internal summaries"],
            ].map(([title, desc], index) => (
              <div className="fit-item" key={title}>
                <span>0{index + 1}</span>
                <div><strong>{title}</strong><p>{desc}</p></div>
                <ArrowUpRight />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="build section-rule">
        <div className="section-kicker">04 / HOW WE BUILD</div>
        <div className="build-heading">
          <h2>Designed like operations. Built like software.</h2>
          <p>No black-box magic. We map the workflow, define the guardrails, connect the systems, then make the worker observable.</p>
        </div>
        <div className="build-steps">
          <div className="build-step"><span>01</span><strong>Map</strong><p>Inputs, decisions, exceptions and handoffs.</p></div>
          <div className="build-step"><span>02</span><strong>Design</strong><p>Worker behavior, tools, permissions and fallbacks.</p></div>
          <div className="build-step"><span>03</span><strong>Connect</strong><p>Calendar, CRM, email, phone, data and internal systems.</p></div>
          <div className="build-step"><span>04</span><strong>Observe</strong><p>Logs, outcomes and human review where it matters.</p></div>
        </div>
      </section>

      <section className="contact section-rule" id="contact">
        <div className="contact-card">
          <div>
            <span className="section-kicker">05 / START WITH A PROCESS</span>
            <h2>Tell us what your team does every day that it shouldn&apos;t have to.</h2>
            <p>We&apos;ll look at the workflow first. The technology comes second.</p>
          </div>
          <div className="contact-actions">
            <a className="button button-primary" href="https://www.linkedin.com/in/raza-hussain-niazi-727993206" target="_blank" rel="noreferrer">
              Start on LinkedIn <ArrowUpRight />
            </a>
            <Link className="button button-ghost dark" href="/demo">
              View the live prototype
            </Link>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-inner">
          <div>
            <Logo />
            <p>Purpose-built digital workers for repetitive business operations.</p>
          </div>
          <div className="footer-links">
            <a href="#workflows">Workflows</a>
            <a href="#approach">Approach</a>
            <Link href="/demo">Live demo</Link>
            <a href="https://www.linkedin.com/in/raza-hussain-niazi-727993206" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
          <div className="footer-meta">© 2026 SwiftLabor.ai</div>
        </div>
      </footer>
    </main>
  );
}
