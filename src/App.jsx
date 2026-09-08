import React, { useEffect, useState } from "react";

// ============================================================
// PERSONAL / SOCIAL CONFIGURATION
// ============================================================

const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/radha-gohil",
  github: "https://github.com/radha-gohil",
  leetcode: "https://leetcode.com/u/radhagohil999",
  email: "radhagohil999@gmail.com",
  phone: "+91 9016920249",

  // Keep the latest resume inside:
  // public/Radha_Gohil_Resume.pdf
  resume: "/Radha_Gohil_Resume.pdf",
};

// ============================================================
// SVG ICONS
// ============================================================

const renderIcon = (name, size = 20, style = {}) => {
  const common = {
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style,
  };

  const icons = {
    linkedin: (
      <svg {...common}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),

    github: (
      <svg {...common}>
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    ),

    leetcode: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        style={style}
      >
        <path d="M16.102 17.93l-2.69 2.607c-.466.451-1.111.696-1.744.696a2.285 2.285 0 0 1-1.744-.696l-7.308-7.086a2.443 2.443 0 0 1 0-3.488l3.493-3.385c.29-.28.795-.285 1.09-.01a.727.727 0 0 1 .01 1.052L3.882 10.95a1.002 1.002 0 0 0 0 1.432l7.308 7.086c.195.19.46.29.712.29.252 0 .517-.1.712-.29l2.69-2.607c.29-.281.796-.285 1.091-.01a.727.727 0 0 1 .01 1.052zM21.135 12.502c.29.28.29.735 0 1.015l-4.148 4.022a.727.727 0 0 1-1.091.01.768.768 0 0 1 0-1.053l4.148-4.022c.29-.281.29-.736 0-1.016l-7.308-7.086c-.195-.19-.46-.29-.712-.29-.252 0-.517.1-.712.29l-3.493 3.386a.768.768 0 0 1-1.09-.01.727.727 0 0 1-.01-1.052l3.492-3.385a2.443 2.443 0 0 1 3.488 0l7.308 7.086a2.443 2.443 0 0 1 0 3.488z" />
      </svg>
    ),

    mail: (
      <svg {...common}>
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),

    phone: (
      <svg {...common}>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),

    file: (
      <svg {...common}>
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
        <path d="M10 9H8" />
        <path d="M16 13H8" />
        <path d="M16 17H8" />
      </svg>
    ),

    download: (
      <svg {...common}>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),

    external: (
      <svg {...common}>
        <path d="M15 3h6v6" />
        <path d="M10 14 21 3" />
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      </svg>
    ),

    arrow: (
      <svg {...common}>
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    ),

    code: (
      <svg {...common}>
        <path d="m18 16 4-4-4-4" />
        <path d="m6 8-4 4 4 4" />
        <path d="m14.5 4-5 16" />
      </svg>
    ),

    brain: (
      <svg {...common}>
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-3.12 3.008 3.008 0 0 1-1.54-5.26 2.5 2.5 0 0 1 0-3.74A2.5 2.5 0 0 1 9.5 2Z" />
        <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-3.12 3.008 3.008 0 0 0 1.54-5.26 2.5 2.5 0 0 0 0-3.74A2.5 2.5 0 0 0 14.5 2Z" />
      </svg>
    ),

    chart: (
      <svg {...common}>
        <path d="M3 3v18h18" />
        <path d="M18 17V9" />
        <path d="M13 17V5" />
        <path d="M8 17v-3" />
      </svg>
    ),

    database: (
      <svg {...common}>
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v6c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
        <path d="M3 11v6c0 1.66 4.03 3 9 3s9-1.34 9-3v-6" />
      </svg>
    ),

    terminal: (
      <svg {...common}>
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" x2="20" y1="19" y2="19" />
      </svg>
    ),

    users: (
      <svg {...common}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),

    award: (
      <svg {...common}>
        <circle cx="12" cy="8" r="7" />
        <path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.12" />
      </svg>
    ),

    trophy: (
      <svg {...common}>
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 1 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17" />
        <path d="M14 14.66V17" />
        <path d="M12 2a6 6 0 0 1 6 6c0 3.31-2 6-6 6S6 11.31 6 8a6 6 0 0 1 6-6Z" />
      </svg>
    ),

    map: (
      <svg {...common}>
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),

    sparkles: (
      <svg {...common}>
        <path d="m12 3-1.9 4.1L6 9l4.1 1.9L12 15l1.9-4.1L18 9l-4.1-1.9Z" />
        <path d="M5 3v4" />
        <path d="M3 5h4" />
        <path d="M19 17v4" />
        <path d="M17 19h4" />
      </svg>
    ),

    check: (
      <svg {...common}>
        <path d="m20 6-11 11-5-5" />
      </svg>
    ),
  };

  return icons[name] || null;
};

// ============================================================
// PROJECTS
// ============================================================

const PROJECTS = [
  {
    title: "RAG-Based Placement Preparation Assistant",
    category: "Generative AI",
    description:
      "An intelligent placement preparation assistant that analyzes resumes, identifies skill gaps, retrieves relevant learning resources, and generates personalized interview preparation plans using LLMs.",
    bullets: [
      "Analyzes candidate resumes and detects missing skills relevant to target roles.",
      "Uses FAISS vector search and HuggingFace embeddings for semantic resource retrieval.",
      "Generates personalized interview preparation plans through LLM-powered workflows.",
    ],
    tech: [
      "Python",
      "LangChain",
      "FAISS",
      "HuggingFace",
      "Groq API",
      "Streamlit",
      "NLP",
      "RAG",
    ],
    impact: "RAG + LLM Workflow",
    github: SOCIAL_LINKS.github,
  },

  {
    title: "Stock Market Website (TradeSync)",
    category: "Deep Learning",
    description:
      "A full-stack AI-powered stock market platform combining interactive dashboards, market intelligence, automated trading workflows, and predictive modeling.",
    bullets: [
      "Built an interactive dashboard and graphical interface for an automated trading workflow.",
      "Integrated Gemini API capabilities with market-data processing and intelligent analysis.",
      "Achieved approximately 94% average directional accuracy across ten stocks using AI-based predictive modeling.",
    ],
    tech: [
      "Python",
      "Django",
      "React",
      "Tailwind CSS",
      "HTML",
      "Firebase",
      "Gemini API",
      "Deep Learning",
    ],
    impact: "≈94% Directional Accuracy",
    github: SOCIAL_LINKS.github,
  },

  {
    title: "Multiple Face Attendance System",
    category: "Computer Vision",
    description:
      "A real-time multi-face attendance system designed to detect and recognize multiple students simultaneously in classroom environments.",
    bullets: [
      "Recognizes approximately 30–35 faces simultaneously in real-time classroom scenarios.",
      "Uses computer vision techniques for automated attendance and multi-person recognition.",
      "Provides an interface for viewing attendance results and system output.",
    ],
    tech: [
      "Python",
      "OpenCV",
      "YOLO",
      "Face Recognition",
      "Streamlit",
      "Deep Learning",
    ],
    impact: "30–35 Faces Simultaneously",
    github: SOCIAL_LINKS.github,
  },
];

// ============================================================
// EXPERIENCE
// ============================================================

const EXPERIENCE = [
  {
    date: "01/2025 - 03/2025",
    role: "Data Analytics & Machine Learning Intern",
    company: "Edunet Foundation",
    bullets: [
      "Built interactive dashboards using SAP Analytics Cloud and Power BI with KPI indicators, trend analysis, category comparisons, and distribution analysis.",
      "Applied supervised and unsupervised machine learning techniques to data analysis tasks.",
      "Contributed to GlobalGrad, a portfolio website integrating analytics-driven insights.",
    ],
    tech: [
      "Power BI",
      "SAP Analytics Cloud",
      "Machine Learning",
      "Data Analytics",
    ],
  },

  {
    date: "07/2024 - 08/2024",
    role: "Data Science Intern",
    company: "EVOSTRA VENTURES PVT LTD",
    bullets: [
      "Performed web scraping on a car-listing website using Python to collect structured automotive data.",
      "Collected attributes including brand, model, price, mileage, and fuel type.",
      "Cleaned, processed, and analyzed scraped data using Pandas and NumPy and performed exploratory data analysis.",
    ],
    tech: ["Python", "Pandas", "NumPy", "Web Scraping", "EDA"],
  },

  {
    date: "06/2024 - 08/2024",
    role: "Data Science Intern",
    company: "IBM Skillbuild",
    bullets: [
      "Built a binary machine-learning classifier using NASA Near-Earth Object data.",
      "Achieved approximately 95% classification accuracy for hazardous-object identification.",
      "Developed a Streamlit interface for statistical insights and model predictions.",
    ],
    tech: ["Python", "Machine Learning", "NASA NEO", "Streamlit"],
  },
];

// ============================================================
// SKILLS
// ============================================================

const SKILLS_CATEGORIES = [
  {
    title: "Data Science & Machine Learning",
    icon: "brain",
    skills: [
      "Machine Learning",
      "Deep Learning",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "EDA",
      "Data Preprocessing",
      "Predictive Modeling",
    ],
  },

  {
    title: "Generative & Agentic AI",
    icon: "sparkles",
    skills: [
      "Generative AI",
      "Agentic AI",
      "RAG",
      "NLP",
      "LangChain",
      "FAISS",
      "LLMs",
      "HuggingFace",
    ],
  },

  {
    title: "Analytics & Business Intelligence",
    icon: "chart",
    skills: [
      "Power BI",
      "Tableau",
      "SAP Analytics Cloud",
      "Pentaho",
      "Data Visualization",
      "Dashboard Design",
    ],
  },

  {
    title: "Backend & Database",
    icon: "database",
    skills: [
      "FastAPI",
      "Django",
      "Streamlit",
      "PostgreSQL",
      "SQL",
      "REST APIs",
    ],
  },

  {
    title: "Programming & Web",
    icon: "code",
    skills: [
      "Python",
      "SQL",
      "HTML5",
      "CSS3",
      "React",
      "Tailwind CSS",
    ],
  },

  {
    title: "DevOps & Developer Tools",
    icon: "terminal",
    skills: [
      "Docker",
      "Kubernetes",
      "Git",
      "GitHub",
      "Kaggle",
      "VS Code",
      "Firebase",
    ],
  },
];

// ============================================================
// TECH STRIP
// ============================================================

const TECH_STACK = [
  "PYTHON",
  "MACHINE LEARNING",
  "GENERATIVE AI",
  "RAG",
  "LANGCHAIN",
  "FASTAPI",
  "POSTGRESQL",
  "POWER BI",
  "DOCKER",
  "GIT",
];

// ============================================================
// APPLICATION
// ============================================================

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const [neoVal, setNeoVal] = useState(0);
  const [tradeVal, setTradeVal] = useState(0);
  const [facesVal, setFacesVal] = useState(0);

  // ============================================================
  // HEADER SCROLL + ACTIVE SECTION
  // ============================================================

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      setIsScrolled(scrollPosition > 50);

      const sections = [
        "hero",
        "about",
        "projects",
        "experience",
        "skills",
        "education",
        "contact",
      ];

      let currentSection = "hero";

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);

        if (element) {
          const top = element.offsetTop - 140;
          const height = element.offsetHeight;

          if (
            scrollPosition >= top &&
            scrollPosition < top + height
          ) {
            currentSection = sectionId;
          }
        }
      }

      setActiveSection(currentSection);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // ============================================================
  // HERO NUMBER ANIMATION
  // ============================================================

  useEffect(() => {
    const animate = (start, end, duration, setter) => {
      let startTimestamp = null;

      const step = (timestamp) => {
        if (!startTimestamp) {
          startTimestamp = timestamp;
        }

        const progress = Math.min(
          (timestamp - startTimestamp) / duration,
          1
        );

        setter(Math.floor(progress * (end - start) + start));

        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };

      window.requestAnimationFrame(step);
    };

    const timer1 = setTimeout(
      () => animate(0, 95, 1800, setNeoVal),
      250
    );

    const timer2 = setTimeout(
      () => animate(0, 94, 2000, setTradeVal),
      500
    );

    const timer3 = setTimeout(
      () => animate(0, 35, 1700, setFacesVal),
      750
    );

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  // ============================================================
  // SCROLL REVEAL
  // ============================================================

  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
      }
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // ============================================================
  // SMOOTH NAVIGATION
  // ============================================================

  const handleNavLinkClick = (event, targetId) => {
    event.preventDefault();

    setIsMenuOpen(false);

    const targetElement = document.getElementById(targetId);

    if (!targetElement) {
      return;
    }

    const headerOffset = 82;

    const elementPosition =
      targetElement.getBoundingClientRect().top;

    const offsetPosition =
      elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  // ============================================================
  // JSX
  // ============================================================

  return (
    <>
      <div className="page-grid"></div>
      <div className="bg-glow bg-glow-1"></div>
      <div className="bg-glow bg-glow-2"></div>

      {/* ========================================================
          HEADER
      ======================================================== */}

      <header
        id="main-header"
        className={isScrolled ? "scrolled" : ""}
      >
        <div className="container navbar">
          <a
            href="#hero"
            className="logo"
            onClick={(event) =>
              handleNavLinkClick(event, "hero")
            }
          >
            RG<span>.AI</span>
          </a>

          <nav
            className={`nav-links ${
              isMenuOpen ? "open" : ""
            }`}
          >
            {[
              "Home",
              "About",
              "Projects",
              "Experience",
              "Skills",
              "Education",
              "Contact",
            ].map((label) => {
              const id =
                label === "Home"
                  ? "hero"
                  : label.toLowerCase();

              return (
                <a
                  key={id}
                  href={`#${id}`}
                  className={
                    activeSection === id ? "active" : ""
                  }
                  onClick={(event) =>
                    handleNavLinkClick(event, id)
                  }
                >
                  {label}
                </a>
              );
            })}
          </nav>

          <a
            href={SOCIAL_LINKS.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="navbar-resume"
          >
            Resume
            {renderIcon("external", 14)}
          </a>

          <button
            className={`mobile-menu-toggle ${
              isMenuOpen ? "active" : ""
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <main>
        {/* ======================================================
            HERO
        ====================================================== */}

        <section id="hero">
          <div className="container hero-grid">
            <div className="hero-content">
              <div className="availability">
                <span className="availability-dot"></span>
                Open to Data Science & AI Opportunities
              </div>

              <div className="hero-eyebrow">
                DATA SCIENCE • ARTIFICIAL INTELLIGENCE
              </div>

              <h1>
                Hi, I'm{" "}
                <span className="text-gradient">
                  Radha Gohil
                </span>
              </h1>

              <h2 className="hero-role">
                Data Science & AI Enthusiast
              </h2>

              <p className="subtitle">
                I build intelligent systems using Machine
                Learning, Generative AI, RAG, Agentic AI,
                analytics, and full-stack technologies to
                transform data into practical solutions.
              </p>

              <div className="hero-specialties">
                <span>Machine Learning</span>
                <span>Generative AI</span>
                <span>RAG</span>
                <span>Agentic AI</span>
                <span>Data Analytics</span>
              </div>

              <div className="location-line">
                {renderIcon("map", 17)}

                <span>
                  Chennai, Tamil Nadu • Surat, Gujarat
                  (Hometown) • Open to Relocation
                </span>
              </div>

              <div className="hero-cta">
                <a
                  href="#projects"
                  className="btn-primary"
                  onClick={(event) =>
                    handleNavLinkClick(event, "projects")
                  }
                >
                  View Projects
                  {renderIcon("arrow", 17)}
                </a>

                <a
                  href={SOCIAL_LINKS.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  {renderIcon("file", 17)}
                  View Resume
                </a>

                <a
                  href={SOCIAL_LINKS.resume}
                  download
                  className="btn-icon"
                  title="Download Resume"
                  aria-label="Download Resume"
                >
                  {renderIcon("download", 18)}
                </a>
              </div>

              <div className="hero-socials">
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  {renderIcon("linkedin", 18)}
                  LinkedIn
                </a>

                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  {renderIcon("github", 18)}
                  GitHub
                </a>

                <a
                  href={SOCIAL_LINKS.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LeetCode"
                >
                  {renderIcon("leetcode", 18)}
                  LeetCode
                </a>
              </div>
            </div>

            <div className="hero-visuals">
              <div className="avatar-orbit"></div>

              <div className="telemetry-card telemetry-1">
                <span className="metric-val">
                  {neoVal}%
                </span>

                <span className="metric-label">
                  NEO Classifier Accuracy
                </span>
              </div>

              <div className="avatar-container">
                <img
                  src="/RR.png"
                  alt="Radha Gohil"
                />
              </div>

              <div className="telemetry-card telemetry-2">
                <span className="metric-val">
                  {tradeVal}%
                </span>

                <span className="metric-label">
                  TradeSync Accuracy
                </span>
              </div>

              <div className="telemetry-card telemetry-3">
                <span className="metric-val">
                  {facesVal}+
                </span>

                <span className="metric-label">
                  Concurrent Face Tracking
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================
            TECH STACK STRIP
        ====================================================== */}

        <section className="tech-marquee">
          <div className="tech-track">
            {TECH_STACK.map((tech, index) => (
              <div
                className="tech-marquee-item"
                key={`first-${index}`}
              >
                <span></span>
                {tech}
              </div>
            ))}

            {TECH_STACK.map((tech, index) => (
              <div
                className="tech-marquee-item"
                key={`second-${index}`}
                aria-hidden="true"
              >
                <span></span>
                {tech}
              </div>
            ))}
          </div>
        </section>

        {/* ======================================================
            ABOUT
        ====================================================== */}

        <section
          id="about"
          className="section-padding section-alt"
        >
          <div className="container">
            <div className="section-header reveal">
              <span className="section-label">
                ABOUT ME
              </span>

              <h2>
                Engineering with{" "}
                <span className="text-gradient">
                  Data & Intelligence
                </span>
              </h2>

              <p>
                Combining data science, artificial
                intelligence, analytics, and software
                development to build practical systems.
              </p>
            </div>

            <div className="about-layout">
              <div className="about-text card reveal">
                <p>
                  I am currently pursuing a Master of
                  Technology in Artificial Intelligence and
                  Data Science at Vellore Institute of
                  Technology, Chennai.
                </p>

                <p>
                  My experience spans machine learning, data
                  analytics, web scraping, business
                  intelligence, computer vision, Generative
                  AI, RAG, and dashboard development.
                </p>

                <p>
                  Through internships and projects, I have
                  worked with tools including Python,
                  Pandas, NumPy, Power BI, SAP Analytics
                  Cloud, Django, Streamlit, PostgreSQL,
                  LangChain, FAISS, Docker, and Kubernetes.
                </p>

                <p>
                  I enjoy converting complex datasets and
                  intelligent models into solutions that
                  are understandable, usable, and capable
                  of solving real-world problems.
                </p>
              </div>

              <div className="about-stats reveal">
                <div className="stat-card">
                  <span className="stat-number">3</span>

                  <div>
                    <strong>Internship Experiences</strong>
                    <p>
                      Data Science, ML & Analytics
                    </p>
                  </div>
                </div>

                <div className="stat-card">
                  <span className="stat-number">3+</span>

                  <div>
                    <strong>Core Projects</strong>
                    <p>
                      AI, ML, RAG & Computer Vision
                    </p>
                  </div>
                </div>

                <div className="stat-card">
                  <span className="stat-number">8.62</span>

                  <div>
                    <strong>Current VIT GPA</strong>
                    <p>
                      M.Tech AI & Data Science
                    </p>
                  </div>
                </div>

                <div className="stat-card">
                  <span className="stat-number">AI</span>

                  <div>
                    <strong>Primary Focus</strong>
                    <p>
                      Intelligent Data Systems
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================
            PROJECTS
        ====================================================== */}

        <section
          id="projects"
          className="section-padding"
        >
          <div className="container">
            <div className="section-header reveal">
              <span className="section-label">
                FEATURED WORK
              </span>

              <h2>
                AI & Data Science{" "}
                <span className="text-gradient">
                  Projects
                </span>
              </h2>

              <p>
                Selected projects demonstrating Generative
                AI, predictive modeling, computer vision,
                and full-stack development.
              </p>
            </div>

            <div className="projects-grid">
              {PROJECTS.map((project, index) => (
                <article
                  className="project-card card reveal"
                  key={project.title}
                  style={{
                    transitionDelay: `${index * 90}ms`,
                  }}
                >
                  <div>
                    <div className="project-top">
                      <span className="project-category">
                        {project.category}
                      </span>

                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-github"
                        aria-label="GitHub Profile"
                      >
                        {renderIcon("github", 20)}
                      </a>
                    </div>

                    <div className="project-impact">
                      <span className="impact-dot"></span>
                      {project.impact}
                    </div>

                    <h3>{project.title}</h3>

                    <p className="project-description">
                      {project.description}
                    </p>

                    <ul className="project-bullets">
                      {project.bullets.map(
                        (bullet, bulletIndex) => (
                          <li key={bulletIndex}>
                            <span className="check-icon">
                              {renderIcon("check", 14)}
                            </span>

                            <span>{bullet}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  <div>
                    <div className="project-tech">
                      {project.tech.map((tech) => (
                        <span key={tech}>{tech}</span>
                      ))}
                    </div>

                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      Explore GitHub
                      {renderIcon("external", 14)}
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ======================================================
            EXPERIENCE
        ====================================================== */}

        <section
          id="experience"
          className="section-padding section-alt"
        >
          <div className="container">
            <div className="section-header centered reveal">
              <span className="section-label">
                EXPERIENCE
              </span>

              <h2>
                Professional{" "}
                <span className="text-gradient">
                  Journey
                </span>
              </h2>

              <p>
                Practical experience across data science,
                analytics, machine learning, and
                visualization.
              </p>
            </div>

            <div className="experience-list">
              {EXPERIENCE.map((experience, index) => (
                <article
                  className="experience-card reveal"
                  key={`${experience.company}-${experience.date}`}
                  style={{
                    transitionDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="experience-marker">
                    <span></span>
                  </div>

                  <div className="experience-date">
                    {experience.date}
                  </div>

                  <div className="experience-content card">
                    <span className="experience-index">
                      0{index + 1}
                    </span>

                    <h3>{experience.role}</h3>

                    <h4>{experience.company}</h4>

                    <ul>
                      {experience.bullets.map(
                        (bullet, bulletIndex) => (
                          <li key={bulletIndex}>
                            {bullet}
                          </li>
                        )
                      )}
                    </ul>

                    <div className="experience-tech">
                      {experience.tech.map((tech) => (
                        <span key={tech}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ======================================================
            SKILLS
        ====================================================== */}

        <section
          id="skills"
          className="section-padding"
        >
          <div className="container">
            <div className="section-header reveal">
              <span className="section-label">
                TECHNICAL EXPERTISE
              </span>

              <h2>
                Skills &{" "}
                <span className="text-gradient">
                  Technologies
                </span>
              </h2>

              <p>
                Technologies I use across machine learning,
                analytics, AI systems, backend development,
                databases, and deployment.
              </p>
            </div>

            <div className="skills-grid">
              {SKILLS_CATEGORIES.map(
                (category, index) => (
                  <article
                    className="skill-card card reveal"
                    key={category.title}
                    style={{
                      transitionDelay: `${
                        (index % 3) * 70
                      }ms`,
                    }}
                  >
                    <div className="skill-heading">
                      <div className="skill-icon">
                        {renderIcon(
                          category.icon,
                          21
                        )}
                      </div>

                      <h3>{category.title}</h3>
                    </div>

                    <div className="skill-tags">
                      {category.skills.map((skill) => (
                        <span key={skill}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </article>
                )
              )}
            </div>
          </div>
        </section>

        {/* ======================================================
            EDUCATION
        ====================================================== */}

        <section
          id="education"
          className="section-padding section-alt"
        >
          <div className="container">
            <div className="section-header reveal">
              <span className="section-label">
                CREDENTIALS
              </span>

              <h2>
                Education &{" "}
                <span className="text-gradient">
                  Achievements
                </span>
              </h2>
            </div>

            <div className="education-layout">
              <div className="education-column">
                <div className="education-card card reveal">
                  <div className="education-year">
                    2025 — Present
                  </div>

                  <h3>
                    Master of Technology in Artificial
                    Intelligence and Data Science
                  </h3>

                  <p>
                    Vellore Institute of Technology,
                    Chennai, Tamil Nadu
                  </p>

                  <div className="education-grade">
                    GPA • 8.62
                  </div>
                </div>

                <div className="education-card card reveal">
                  <div className="education-year">
                    2022 — 2025
                  </div>

                  <h3>
                    Bachelor of Technology in Computer
                    Engineering
                  </h3>

                  <p>
                    Sarvajanik College of Engineering and
                    Technology, Surat, Gujarat
                  </p>

                  <div className="education-grade">
                    CGPA • 8.96
                  </div>
                </div>

                <div className="education-card card reveal">
                  <div className="education-year">
                    2019 — 2022
                  </div>

                  <h3>
                    Diploma in Computer Engineering
                  </h3>

                  <p>
                    Government Polytechnic For Girls,
                    Surat, Gujarat
                  </p>

                  <div className="education-grade">
                    CGPA • 8.35
                  </div>
                </div>
              </div>

              <div className="achievements-card card reveal">
                <div className="achievements-heading">
                  <span>
                    {renderIcon("trophy", 22)}
                  </span>

                  <h3>
                    Certifications & Awards
                  </h3>
                </div>

                <div className="achievement">
                  <div className="achievement-icon">
                    {renderIcon("award", 19)}
                  </div>

                  <div>
                    <h4>
                      NPTEL Certification
                    </h4>

                    <p>
                      Database Management Systems
                    </p>
                  </div>
                </div>

                <div className="achievement">
                  <div className="achievement-icon">
                    {renderIcon("trophy", 19)}
                  </div>

                  <div>
                    <h4>
                      3rd Place — New Vibrant Hackathon
                    </h4>

                    <p>
                      IoT-Based Smart Garbage Collection
                      System
                    </p>
                  </div>
                </div>

                <div className="achievement">
                  <div className="achievement-icon">
                    {renderIcon("trophy", 19)}
                  </div>

                  <div>
                    <h4>
                      2nd Prize — Updates 2023 Techfest
                    </h4>

                    <p>
                      Runner-up in technology event
                      competition
                    </p>
                  </div>
                </div>

                <div className="achievement">
                  <div className="achievement-icon">
                    {renderIcon("users", 19)}
                  </div>

                  <div>
                    <h4>
                      Updates 2023 Techfest
                    </h4>

                    <p>
                      Volunteer and event contributor
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================
            CONTACT
        ====================================================== */}

        <section
          id="contact"
          className="section-padding"
        >
          <div className="container">
            <div className="contact-banner reveal">
              <div className="contact-banner-content">
                <span className="section-label">
                  LET'S CONNECT
                </span>

                <h2>
                  Interested in building something{" "}
                  <span className="text-gradient">
                    intelligent?
                  </span>
                </h2>

                <p>
                  I'm open to opportunities in Data
                  Science, Machine Learning, Artificial
                  Intelligence, Generative AI, analytics,
                  and related technology roles.
                </p>

                <a
                  href={`mailto:${SOCIAL_LINKS.email}`}
                  className="btn-primary"
                >
                  {renderIcon("mail", 17)}
                  Send an Email
                </a>
              </div>
            </div>

            <div className="contact-grid">
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card card reveal"
              >
                <div className="contact-icon">
                  {renderIcon("linkedin", 23)}
                </div>

                <div>
                  <h3>LinkedIn</h3>
                  <p>radha-gohil</p>
                  <span>
                    Connect professionally
                  </span>
                </div>
              </a>

              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card card reveal"
              >
                <div className="contact-icon">
                  {renderIcon("github", 23)}
                </div>

                <div>
                  <h3>GitHub</h3>
                  <p>radha-gohil</p>
                  <span>
                    Explore my development work
                  </span>
                </div>
              </a>

              <a
                href={SOCIAL_LINKS.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card card reveal"
              >
                <div className="contact-icon">
                  {renderIcon("leetcode", 23)}
                </div>

                <div>
                  <h3>LeetCode</h3>
                  <p>radhagohil999</p>
                  <span>
                    Coding & problem solving
                  </span>
                </div>
              </a>

              <a
                href={`mailto:${SOCIAL_LINKS.email}`}
                className="contact-card card reveal"
              >
                <div className="contact-icon">
                  {renderIcon("mail", 23)}
                </div>

                <div>
                  <h3>Email</h3>
                  <p>
                    {SOCIAL_LINKS.email}
                  </p>
                  <span>
                    Send me a message
                  </span>
                </div>
              </a>

              <a
                href={`tel:${SOCIAL_LINKS.phone.replace(
                  /\s/g,
                  ""
                )}`}
                className="contact-card card reveal"
              >
                <div className="contact-icon">
                  {renderIcon("phone", 23)}
                </div>

                <div>
                  <h3>Phone</h3>
                  <p>{SOCIAL_LINKS.phone}</p>
                  <span>
                    Professional contact
                  </span>
                </div>
              </a>

              <a
                href={SOCIAL_LINKS.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card card reveal"
              >
                <div className="contact-icon">
                  {renderIcon("file", 23)}
                </div>

                <div>
                  <h3>Resume</h3>
                  <p>Latest CV</p>
                  <span>
                    View my updated resume
                  </span>
                </div>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ========================================================
          FOOTER
      ======================================================== */}

      <footer>
        <div className="container footer-content">
          <div>
            <a
              href="#hero"
              className="footer-logo"
              onClick={(event) =>
                handleNavLinkClick(event, "hero")
              }
            >
              RG<span>.AI</span>
            </a>

            <p>
              Data Science • Artificial Intelligence •
              Analytics
            </p>
          </div>

          <div className="footer-center">
            © 2026 Radha Gohil
          </div>

          <div className="footer-socials">
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              {renderIcon("linkedin", 18)}
            </a>

            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              {renderIcon("github", 18)}
            </a>

            <a
              href={SOCIAL_LINKS.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LeetCode"
            >
              {renderIcon("leetcode", 18)}
            </a>

            <a
              href={`mailto:${SOCIAL_LINKS.email}`}
              aria-label="Email"
            >
              {renderIcon("mail", 18)}
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}