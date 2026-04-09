import { useState, useEffect, useRef } from "react";

const NAV_ITEMS = ["About", "Experience", "Projects", "Blog", "Contact"];

const EXPERIENCE = [
  {
    company: "Microsoft",
    title: "AKS Escalation Engineer",
    period: "2022 – Present",
    location: "Austin, TX (Remote)",
    bullets: [
      "Tier 3 escalation point for AKS production incidents across control plane, networking, node pools, and workload scheduling for enterprise customers.",
      "Designed autoscaling strategies (HPA, VPA, cluster autoscaler) reducing scheduling failures ~30% under variable production load.",
      "Led zero-downtime AKS version upgrades with 100% success rate — zero customer-impacting incidents.",
      "Built monitoring pipelines using Azure Monitor, Log Analytics, and KQL, reducing MTTD ~40%.",
      "Authored 20+ runbooks improving team response speed 25% for high-frequency incident types.",
      "Built Bash/Azure CLI automation for multi-step triage workflows including kubelet log retrieval and node pool diagnostics."
    ]
  },
  {
    company: "Google",
    title: "Technical Solutions Engineer — Kubernetes · GKE · Anthos",
    period: "2021 – 2022",
    location: "Austin, TX",
    bullets: [
      "Advised 10+ engineering teams on Kubernetes adoption: workload design, resource limits, namespace strategy, multi-cluster topology.",
      "Designed and validated GKE/Anthos reference architectures for enterprise hybrid and multi-cloud deployments.",
      "Managed large-scale clusters supporting 5,000+ pods with CPU/memory benchmarks and QoS class standards.",
      "Delivered Kubernetes best-practices training to 30+ internal engineering stakeholders."
    ]
  },
  {
    company: "Meta (Facebook)",
    title: "Enterprise Support Technician",
    period: "2020 – 2021",
    location: "Austin, TX (Remote)",
    bullets: [
      "Network operations support across VPN, DNS, DHCP, and data center connectivity for a global workforce.",
      "Root cause analysis on outages with post-incident documentation reducing repeat incidents.",
      "Managed identity and access provisioning for 500+ internal users with zero security incidents."
    ]
  },
  {
    company: "Google",
    title: "Site Reliability Engineer (Rotation)",
    period: "2018 – 2019",
    location: "Mountain View & Sunnyvale, CA",
    bullets: [
      "Embedded within Google's SRE organization supporting monitoring, backup, and redundancy for large-scale infrastructure.",
      "Developed Python automation scripts reducing manual toil for recurring maintenance procedures.",
      "Participated in incident response and on-call rotations under senior SRE guidance."
    ]
  }
];

const PROJECTS = [
  {
    title: "AKS AI Agent",
    description: "AI-powered AKS monitoring agent using Claude API with Helm chart, PVC persistence, health probes, and GitHub Actions CI/CD. Published technical write-up on Medium.",
    tags: ["Kubernetes", "Claude API", "Helm", "GitHub Actions", "Python"],
    link: "https://github.com/HeyNaNd0/aks-ai-agent"
  },
  {
    title: "LLM InferenceOps on AKS",
    description: "Deployed TinyLlama on AKS with full observability stack (Prometheus/Grafana), demonstrating GPU workload orchestration and inference monitoring.",
    tags: ["AKS", "LLM", "Prometheus", "Grafana", "GPU"],
    link: "https://github.com/HeyNaNd0"
  },
  {
    title: "ARO SME Roadmap Dashboard",
    description: "Interactive React/Vite progress tracker for a self-directed 26-week Azure Red Hat OpenShift specialization program.",
    tags: ["React", "Vite", "Azure", "OpenShift"],
    link: "https://heynand0.github.io/aro-sme-roadmap"
  }
];

const BLOG_POSTS = [
  {
    title: "Building an AI-Powered AKS Monitoring Agent with Claude",
    date: "2025",
    excerpt: "How I built an autonomous Kubernetes monitoring agent that uses Claude to diagnose cluster issues in real time.",
    tags: ["AKS", "AI", "Claude"],
    link: "https://medium.com/@0H_b0yy/im-an-aks-support-engineer-i-built-an-ai-monitoring-agent-to-see-what-my-customers-see-dfef7fa23971"
  },
  {
    title: "Coming Soon: UDR Egress Patterns in AKS",
    date: "2026",
    excerpt: "A deep dive into User Defined Route-based egress, service tags, and tracing node pool networking components through Azure CLI.",
    tags: ["AKS", "Networking", "Azure"],
    link: null
  }
];

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function useInView() {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, isVisible];
}

function FadeIn({ children, delay = 0 }) {
  const [ref, isVisible] = useInView();
  return (
    <div ref={ref} style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(24px)", transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s` }}>
      {children}
    </div>
  );
}

function Navbar({ activeSection }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: scrolled ? "rgba(252,252,250,0.95)" : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none", borderBottom: scrolled ? "1px solid #e8e5e0" : "1px solid transparent", transition: "all 0.3s ease" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button onClick={() => scrollTo("hero")} style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 22, color: "#1a1a1a", background: "none", border: "none", cursor: "pointer", letterSpacing: "-0.5px" }}>EF<span style={{ color: "#6b8f71" }}>.</span></button>
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {NAV_ITEMS.map(item => (
            <button key={item} onClick={() => scrollTo(item.toLowerCase())} style={{ fontFamily: "'DM Sans', Helvetica, sans-serif", fontSize: 14, fontWeight: 500, color: activeSection === item.toLowerCase() ? "#6b8f71" : "#555", background: "none", border: "none", cursor: "pointer", letterSpacing: "0.5px", textTransform: "uppercase", transition: "color 0.2s", borderBottom: activeSection === item.toLowerCase() ? "2px solid #6b8f71" : "2px solid transparent", paddingBottom: 2 }}>{item}</button>
          ))}
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(165deg, #fcfcfa 0%, #f5f3ef 50%, #eae7e0 100%)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "10%", right: "5%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(107,143,113,0.08) 0%, transparent 70%)" }} />
      <div style={{ position: "absolute", bottom: "15%", left: "8%", width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(107,143,113,0.05) 0%, transparent 70%)" }} />
      <div style={{ textAlign: "center", padding: "0 24px", maxWidth: 800 }}>
        <FadeIn><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, letterSpacing: "3px", textTransform: "uppercase", color: "#6b8f71", marginBottom: 16 }}>Cloud Infrastructure Engineer</p></FadeIn>
        <FadeIn delay={0.15}><h1 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "clamp(40px, 7vw, 72px)", fontWeight: 400, color: "#1a1a1a", lineHeight: 1.1, margin: "0 0 24px", letterSpacing: "-1.5px" }}>Eric Fernandez</h1></FadeIn>
        <FadeIn delay={0.3}><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: "#666", lineHeight: 1.7, maxWidth: 580, margin: "0 auto 40px" }}>8+ years operating Kubernetes at Google and Microsoft scale. Building reliable, observable, and secure infrastructure.</p></FadeIn>
        <FadeIn delay={0.45}>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => scrollTo("experience")} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, padding: "14px 32px", background: "#1a1a1a", color: "#fcfcfa", borderRadius: 6, border: "none", cursor: "pointer", letterSpacing: "0.5px" }} onMouseEnter={e => e.currentTarget.style.background = "#333"} onMouseLeave={e => e.currentTarget.style.background = "#1a1a1a"}>View Experience</button>
            <button onClick={() => scrollTo("contact")} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, padding: "14px 32px", background: "transparent", color: "#1a1a1a", borderRadius: 6, border: "1.5px solid #ccc", cursor: "pointer", letterSpacing: "0.5px" }} onMouseEnter={e => { e.currentTarget.style.borderColor = "#6b8f71"; e.currentTarget.style.color = "#6b8f71"; }} onMouseLeave={e => { e.currentTarget.style.borderColor = "#ccc"; e.currentTarget.style.color = "#1a1a1a"; }}>Get in Touch</button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" style={{ padding: "120px 24px", maxWidth: 900, margin: "0 auto" }}>
      <FadeIn>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: "#6b8f71", marginBottom: 12 }}>About</p>
        <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 36, fontWeight: 400, color: "#1a1a1a", margin: "0 0 32px", letterSpacing: "-0.5px" }}>I don't close tickets. I close problems.</h2>
      </FadeIn>
      <FadeIn delay={0.1}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
          <div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#444", lineHeight: 1.8, margin: "0 0 16px" }}>I'm a Cloud Infrastructure Engineer based in Austin, TX. Currently at Microsoft as an AKS Escalation Engineer, I serve as the Tier 3 escalation point for enterprise customers running production Kubernetes workloads on Azure.</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#444", lineHeight: 1.8, margin: 0 }}>Before Microsoft, I cut my teeth at Google across two roles — first in an SRE rotation embedded in production infrastructure, then as a Technical Solutions Engineer advising teams on GKE and Anthos adoption. I also supported Meta's global corporate network operations.</p>
          </div>
          <div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#444", lineHeight: 1.8, margin: "0 0 16px" }}>My focus is on diagnosing complex, multi-layer infrastructure failures under pressure and turning those findings into lasting operational improvements — better runbooks, smarter monitoring, tighter automation.</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#444", lineHeight: 1.8, margin: 0 }}>I'm a U.S. Navy veteran (Aviation Ordnanceman, Petty Officer 2nd Class) with a B.S. in Information Technology from the University of Central Florida. I hold Azure Fundamentals and AI Fundamentals certifications, with AZ-104 in progress.</p>
          </div>
        </div>
      </FadeIn>
      <FadeIn delay={0.2}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 40 }}>
          {["AKS", "GKE", "Anthos", "Kubernetes", "Azure", "Python", "Bash", "Prometheus", "Grafana", "Linux", "Helm", "RBAC", "Networking", "KQL", "GitHub Actions"].map(tag => (
            <span key={tag} style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, padding: "6px 14px", background: "#f0ede8", color: "#555", borderRadius: 4 }}>{tag}</span>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}

function Experience() {
  const [expanded, setExpanded] = useState(0);
  return (
    <section id="experience" style={{ padding: "120px 24px", background: "#f8f7f4" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <FadeIn>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: "#6b8f71", marginBottom: 12 }}>Experience</p>
          <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 36, fontWeight: 400, color: "#1a1a1a", margin: "0 0 48px", letterSpacing: "-0.5px" }}>Where I've worked</h2>
        </FadeIn>
        {EXPERIENCE.map((job, i) => (
          <FadeIn key={i} delay={i * 0.08}>
            <div onClick={() => setExpanded(expanded === i ? -1 : i)} style={{ borderTop: "1px solid #ddd", padding: "28px 0", cursor: "pointer", borderBottom: i === EXPERIENCE.length - 1 ? "1px solid #ddd" : "none" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <h3 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 22, fontWeight: 400, color: "#1a1a1a", margin: "0 0 4px" }}>{job.company}</h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#666", margin: 0 }}>{job.title}</p>
                </div>
                <div style={{ textAlign: "right", display: "flex", alignItems: "center", gap: 16 }}>
                  <div>
                    <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: "#888", margin: "0 0 2px" }}>{job.period}</p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#999", margin: 0 }}>{job.location}</p>
                  </div>
                  <span style={{ fontSize: 18, color: "#6b8f71", transition: "transform 0.3s ease", transform: expanded === i ? "rotate(90deg)" : "rotate(0deg)", display: "inline-block" }}>›</span>
                </div>
              </div>
              <div style={{ maxHeight: expanded === i ? 600 : 0, overflow: "hidden", transition: "max-height 0.4s ease" }}>
                <ul style={{ margin: "20px 0 0", padding: "0 0 0 20px", listStyle: "none" }}>
                  {job.bullets.map((b, j) => (
                    <li key={j} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#555", lineHeight: 1.7, marginBottom: 10, position: "relative", paddingLeft: 16 }}>
                      <span style={{ position: "absolute", left: 0, color: "#6b8f71" }}>›</span>{b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" style={{ padding: "120px 24px", maxWidth: 900, margin: "0 auto" }}>
      <FadeIn>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: "#6b8f71", marginBottom: 12 }}>Projects</p>
        <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 36, fontWeight: 400, color: "#1a1a1a", margin: "0 0 48px", letterSpacing: "-0.5px" }}>What I'm building</h2>
      </FadeIn>
      {PROJECTS.map((p, i) => (
        <FadeIn key={i} delay={i * 0.1}>
          <div style={{ padding: 32, background: "#fcfcfa", border: "1px solid #e8e5e0", borderRadius: 8, marginBottom: 24, transition: "all 0.3s ease", cursor: "pointer" }} onClick={() => window.open(p.link, "_blank")} onMouseEnter={e => { e.currentTarget.style.borderColor = "#6b8f71"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.06)"; }} onMouseLeave={e => { e.currentTarget.style.borderColor = "#e8e5e0"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <h3 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 20, fontWeight: 400, color: "#1a1a1a", margin: 0 }}>{p.title}</h3>
              <span style={{ color: "#6b8f71" }}>↗</span>
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#666", lineHeight: 1.7, margin: "0 0 16px" }}>{p.description}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {p.tags.map(t => <span key={t} style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, padding: "4px 10px", background: "#f0ede8", color: "#777", borderRadius: 3 }}>{t}</span>)}
            </div>
          </div>
        </FadeIn>
      ))}
    </section>
  );
}

function Blog() {
  return (
    <section id="blog" style={{ padding: "120px 24px", background: "#f8f7f4" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <FadeIn>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: "#6b8f71", marginBottom: 12 }}>Blog</p>
          <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 36, fontWeight: 400, color: "#1a1a1a", margin: "0 0 48px", letterSpacing: "-0.5px" }}>Writing & notes</h2>
        </FadeIn>
        {BLOG_POSTS.map((post, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <div style={{ borderTop: "1px solid #ddd", padding: "32px 0", borderBottom: i === BLOG_POSTS.length - 1 ? "1px solid #ddd" : "none" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <h3 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 20, fontWeight: 400, color: "#1a1a1a", margin: 0, maxWidth: "80%" }}>{post.title}</h3>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: "#999" }}>{post.date}</span>
              </div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#666", lineHeight: 1.7, margin: "0 0 12px" }}>{post.excerpt}</p>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                {post.tags.map(t => <span key={t} style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, padding: "3px 10px", background: "#eae7e0", color: "#777", borderRadius: 3 }}>{t}</span>)}
                {post.link ? <button onClick={() => window.open(post.link, "_blank")} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#6b8f71", marginLeft: "auto", background: "none", border: "none", cursor: "pointer", fontWeight: 500 }}>Read →</button> : <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#bbb", marginLeft: "auto", fontStyle: "italic" }}>Coming soon</span>}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" style={{ padding: "120px 24px", maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
      <FadeIn>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: "#6b8f71", marginBottom: 12 }}>Contact</p>
        <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 36, fontWeight: 400, color: "#1a1a1a", margin: "0 0 16px", letterSpacing: "-0.5px" }}>Let's connect</h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#666", lineHeight: 1.7, maxWidth: 500, margin: "0 auto 40px" }}>Open to conversations about Kubernetes, cloud infrastructure, SRE, and opportunities where I can make an impact.</p>
      </FadeIn>
      <FadeIn delay={0.1}>
        <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>
          {[
            { label: "Email", href: "mailto:eric.fernandez4@gmail.com", icon: "✉" },
            { label: "LinkedIn", href: "https://linkedin.com/in/heyfern", icon: "in" },
            { label: "GitHub", href: "https://github.com/HeyNaNd0", icon: "<>" }
          ].map(l => (
            <button key={l.label} onClick={() => window.open(l.href, "_blank")} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, padding: "14px 28px", border: "1.5px solid #ddd", borderRadius: 6, color: "#333", background: "none", cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "center", gap: 8 }} onMouseEnter={e => { e.currentTarget.style.borderColor = "#6b8f71"; e.currentTarget.style.color = "#6b8f71"; }} onMouseLeave={e => { e.currentTarget.style.borderColor = "#ddd"; e.currentTarget.style.color = "#333"; }}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 14 }}>{l.icon}</span>{l.label}
            </button>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState("");
  useEffect(() => {
    const observer = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }); }, { threshold: 0.3 });
    document.querySelectorAll("section[id]").forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);
  return (
    <div style={{ background: "#fcfcfa", minHeight: "100vh", color: "#1a1a1a" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500;600;700&family=DM+Serif+Display&display=swap');* { box-sizing: border-box; margin: 0; padding: 0; }html { scroll-behavior: smooth; }body { overflow-x: hidden; }::selection { background: #6b8f71; color: white; }`}</style>
      <Navbar activeSection={activeSection} />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Blog />
      <Contact />
      <footer style={{ padding: "40px 24px", borderTop: "1px solid #e8e5e0", textAlign: "center" }}><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#999" }}>© 2026 Eric Fernandez. Built with purpose. U.S. Navy veteran.</p></footer>
    </div>
  );
}
