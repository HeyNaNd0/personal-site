/**
 * Single source of truth for the site's content.
 * Edit this file to update experience, projects, skills, or links —
 * the page, the search-engine metadata (JSON-LD), and the social preview all read from here.
 *
 * Honesty rule for this file: only list skills and certifications that are earned.
 */

export const SITE = {
  url: "https://ericops.cloud",
  name: "Eric Fernandez",
  title: "Eric Fernandez — Kubernetes & Cloud Infrastructure Engineer (AKS)",
  description:
    "Eric Fernandez is an AKS Escalation Engineer at Microsoft in Austin, TX — Tier-3 troubleshooting for production Kubernetes, previously GKE and Anthos at Google.",
  role: "Cloud Infrastructure Engineer",
  location: { city: "Austin", region: "TX", country: "US" },
  ogImage: "/og.png",
  ogImageAlt: "Eric Fernandez — Cloud Infrastructure Engineer · Kubernetes · AKS",
};

export const LINKS = {
  email: "eric.fernandez4@gmail.com",
  linkedin: "https://www.linkedin.com/in/heyfern",
  github: "https://github.com/HeyNaNd0",
  medium: "https://medium.com/@0H_b0yy",
};

export const HERO = {
  eyebrow: "Cloud Infrastructure Engineer",
  lede: "8 years in infrastructure — 5 on production Kubernetes at Google and Microsoft. Building reliable, observable, and secure systems.",
};

export const ABOUT = {
  heading: "I don't close tickets. I close problems.",
  columns: [
    [
      "I'm a Cloud Infrastructure Engineer based in Austin, TX. Currently at Microsoft as an AKS Escalation Engineer, I serve as the Tier 3 escalation point for enterprise customers running production Kubernetes workloads on Azure.",
      "Before Microsoft, I cut my teeth at Google across two roles — first in the IT Residency Program, which included a rotation with an SRE team, then as a Technical Solutions Engineer advising teams on GKE and Anthos adoption. I also supported Meta's global corporate network operations.",
    ],
    [
      "My focus is on diagnosing complex, multi-layer infrastructure failures under pressure and turning those findings into lasting operational improvements — better runbooks, smarter monitoring, tighter automation.",
      "I'm a U.S. Navy veteran (Aviation Ordnanceman, Petty Officer 2nd Class) with a B.S. in Information Technology from the University of Central Florida. I hold the Azure Fundamentals (AZ-900) certification.",
    ],
  ],
};

/** Earned skills only. Also published to search engines as `knowsAbout`. */
export const SKILLS = [
  "AKS",
  "GKE",
  "Anthos",
  "Kubernetes",
  "Azure",
  "Python",
  "Bash",
  "Linux",
  "RBAC",
  "Networking",
  "KQL",
  "GitHub Actions",
];

export const EDUCATION = {
  school: "University of Central Florida",
  degree: "B.S. Information Technology",
};

export type Job = {
  company: string;
  title: string;
  period: string;
  location: string;
  bullets: string[];
};

/** Newest first. The first entry is treated as the current role. */
export const EXPERIENCE: Job[] = [
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
      "Built Bash/Azure CLI automation for multi-step triage workflows including kubelet log retrieval and node pool diagnostics.",
    ],
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
      "Delivered Kubernetes best-practices training to 30+ internal engineering stakeholders.",
    ],
  },
  {
    company: "Meta (Facebook)",
    title: "Enterprise Support Technician",
    period: "2020 – 2021",
    location: "Austin, TX (Remote)",
    bullets: [
      "Network operations support across VPN, DNS, DHCP, and data center connectivity for a global workforce.",
      "Root cause analysis on outages with post-incident documentation reducing repeat incidents.",
      "Managed identity and access provisioning for 500+ internal users with zero security incidents.",
    ],
  },
  {
    company: "Google",
    title: "IT Resident · incl. SRE rotation",
    period: "2018 – 2020",
    location: "Mountain View & Sunnyvale, CA",
    bullets: [
      "Google IT Residency Program, including a 3-month rotation with an SRE team covering monitoring, backup, and redundancy for production infrastructure.",
    ],
  },
];

export type Project = {
  title: string;
  description: string;
  tags: string[];
  link: string;
};

export const PROJECTS: Project[] = [
  {
    title: "AKS AI Agent",
    description:
      "AI-powered AKS monitoring agent using Claude API with Helm chart, PVC persistence, health probes, and GitHub Actions CI/CD. Published technical write-up on Medium.",
    tags: ["Kubernetes", "Claude API", "Helm", "GitHub Actions", "Python"],
    link: "https://github.com/HeyNaNd0/aks-ai-agent",
  },
  {
    title: "LLM InferenceOps on AKS",
    description:
      "Deployed TinyLlama on AKS with full observability stack (Prometheus/Grafana), demonstrating GPU workload orchestration and inference monitoring.",
    tags: ["AKS", "LLM", "Prometheus", "Grafana", "GPU"],
    link: "https://github.com/HeyNaNd0",
  },
  {
    title: "ARO SME Roadmap Dashboard",
    description:
      "Interactive React/Vite progress tracker for a self-directed 26-week Azure Red Hat OpenShift specialization program.",
    tags: ["React", "Vite", "Azure", "OpenShift"],
    link: "https://heynand0.github.io/aro-sme-roadmap",
  },
];

export const CONTACT = {
  heading: "Let's connect",
  blurb:
    "Open to conversations about Kubernetes, cloud infrastructure, SRE, and opportunities where I can make an impact.",
};

export const NAV = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];
