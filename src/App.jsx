import React, { useState, useEffect } from 'react';

// --- SOCIAL LINKS CONFIGURATION ---
// Customize your profile and resume URLs here!
const SOCIAL_LINKS = {
  linkedin: "http://www.linkedin.com/in/radha-gohil",
  github: "https://github.com/radha-gohil",
  leetcode: "https://leetcode.com/u/radhagohil999",
  email: "radhagohil999@gmail.com",
  phone: "+91 9016920249",
  resume: "https://drive.google.com/file/d/1vEAqBNxb7vf6E-dKr39NHIC6bcUS4m88/view?usp=sharing" // <-- REPLACE THIS WITH YOUR GOOGLE DRIVE RESUME LINK
};

// --- NATIVE REACT SVG ICONS (NO CDN REQUIRED) ---
const renderIcon = (name, size = 20, style = {}) => {
  const icons = {
    'linkedin': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
    'github': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    ),
    'leetcode': (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} fill="currentColor" style={style}>
        <path d="M16.102 17.93l-2.69 2.607c-.466.451-1.111.696-1.744.696a2.285 2.285 0 0 1-1.744-.696l-7.308-7.086a2.443 2.443 0 0 1 0-3.488l3.493-3.385c.29-.28.795-.285 1.09-.01a.727.727 0 0 1 .01 1.052L3.882 10.95a1.002 1.002 0 0 0 0 1.432l7.308 7.086c.195.19.46.29.712.29.252 0 .517-.1.712-.29l2.69-2.607c.29-.281.796-.285 1.091-.01a.727.727 0 0 1 .01 1.052zM21.135 12.502c.29.28.29.735 0 1.015l-4.148 4.022a.727.727 0 0 1-1.091.01.768.768 0 0 1 0-1.053l4.148-4.022c.29-.281.29-.736 0-1.016l-7.308-7.086c-.195-.19-.46-.29-.712-.29-.252 0-.517.1-.712.29l-3.493 3.386a.768.768 0 0 1-1.09-.01.727.727 0 0 1-.01-1.052l3.492-3.385a2.443 2.443 0 0 1 3.488 0l7.308 7.086a2.443 2.443 0 0 1 0 3.488z" />
      </svg>
    ),
    'mail': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
        <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
    'file-text': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" />
      </svg>
    ),
    'external-link': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
        <path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      </svg>
    ),
    'cpu': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
        <rect width="16" height="16" x="4" y="4" rx="2" /><rect width="6" height="6" x="9" y="9" rx="1" /><path d="M9 1v3" /><path d="M15 1v3" /><path d="M9 20v3" /><path d="M15 20v3" /><path d="M20 9h3" /><path d="M20 15h3" /><path d="M1 9h3" /><path d="M1 15h3" />
      </svg>
    ),
    'arrow-right': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
        <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
      </svg>
    ),
    'award': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
        <circle cx="12" cy="8" r="7" /><path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.12" />
      </svg>
    ),
    'trophy': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" /><path d="M12 2a6 6 0 0 1 6 6c0 3.31-2 6-6 6S6 11.31 6 8a6 6 0 0 1 6-6Z" />
      </svg>
    ),
    'users': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    'code-2': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
        <path d="m18 16 4-4-4-4" /><path d="m6 8-4 4 4 4" /><path d="m14.5 4-5 16" />
      </svg>
    ),
    'brain': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-3.12 3.008 3.008 0 0 1-1.54-5.26 2.5 2.5 0 0 1 0-3.74A2.5 2.5 0 0 1 9.5 2Z" /><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-3.12 3.008 3.008 0 0 0 1.54-5.26 2.5 2.5 0 0 0 0-3.74A2.5 2.5 0 0 0 14.5 2Z" />
      </svg>
    ),
    'globe': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
        <circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" />
      </svg>
    ),
    'bar-chart-3': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
        <path d="M3 3v18h18" /><path d="M18 17V9" /><path d="M13 17V5" /><path d="M8 17v-3" />
      </svg>
    ),
    'terminal': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
        <polyline points="4 17 10 11 4 5" /><line x1="12" x2="20" y1="19" y2="19" />
      </svg>
    ),
    'send': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
        <path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" />
      </svg>
    ),
    'phone': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    'map-pin': (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
      </svg>
    )
  };
  return icons[name] || null;
};

// --- PROJECTS DATA ---
const PROJECTS = [
  {
    title: "RAG-Based Placement Prep Assistant",
    category: "Generative AI",
    github: SOCIAL_LINKS.github,
    description: "An intelligent AI placement assistant that automates resume matching, curriculum guidance, and interview scheduling workflows.",
    bullets: [
      "Analyzes candidate resumes to auto-detect missing skills relevant to industry requirements.",
      "Retrieves tailored learning materials using FAISS-driven semantic vector searches.",
      "Leverages Groq API and LLMs to generate personalized interview prep schedules."
    ],
    tech: ["Python", "LangChain", "FAISS", "Groq API", "Streamlit", "RAG"]
  },
  {
    title: "Stock Market Website (TradeSync)",
    category: "Deep Learning",
    github: SOCIAL_LINKS.github,
    description: "A real-time trading dashboard featuring an AI-driven predictive pricing engine for financial market assets.",
    bullets: [
      "Designed the interactive front-end dashboard and automated transaction logging system.",
      "Integrated Gemini API endpoints for processing real-time sentiment and market news.",
      "Achieved ~94% average directional accuracy across ten distinct equity stocks."
    ],
    tech: ["Python", "Django", "Gemini API", "Tailwind CSS", "Firebase"]
  },
  {
    title: "Multiple Attendance System",
    category: "Computer Vision",
    github: SOCIAL_LINKS.github,
    description: "A real-time facial recognition framework optimized for bulk authentication in structured classroom environments.",
    bullets: [
      "Detects and registers 30–35 faces simultaneously under dynamic lighting conditions.",
      "Features a custom dashboard for generating instant logs, session summaries, and trends.",
      "Utilizes computer vision classifiers integrated with local database checkpoints."
    ],
    tech: ["Python", "OpenCV", "face-recognition", "Streamlit", "SQL"]
  }
];

// --- EXPERIENCE DATA ---
const EXPERIENCE = [
  {
    date: "01/2025 - 03/2025",
    role: "Data Analytics & ML Intern",
    company: "Edunet Foundation",
    bullets: [
      "Built analytical tracking interfaces using SAP Analytics Cloud and Power BI.",
      "Integrated KPI indicators, line trends, and categories comparisons for project tracking.",
      "Contributed to the development of GlobalGrad, a predictive analytics-driven portfolio site."
    ]
  },
  {
    date: "06/2024 - 08/2024",
    role: "Data Science Intern",
    company: "IBM Skillbuild",
    bullets: [
      "Built a binary ML classifier utilizing NASA's Near-Earth Object (NEO) dataset.",
      "Achieved ~95% classification accuracy on test sets identifying hazardous objects.",
      "Created a functional Streamlit interface to visualize statistical insights and model inferences."
    ]
  }
];

// --- SKILLS DATA ---
const SKILLS_CATEGORIES = [
  {
    title: "Programming",
    icon: "code-2",
    skills: ["Python", "SQL", "HTML5", "CSS3"]
  },
  {
    title: "AI & Machine Learning",
    icon: "brain",
    skills: ["Deep Learning", "ML Algorithms", "Generative AI", "Agentic AI", "Computer Vision", "NLP", "RAG"]
  },
  {
    title: "Web Technologies",
    icon: "globe",
    skills: ["Django", "Streamlit", "Tailwind CSS", "REST APIs"]
  },
  {
    title: "Data Analytics & BI",
    icon: "bar-chart-3",
    skills: ["Power BI", "SAP Analytics Cloud", "Pentaho", "Data Visualization"]
  },
  {
    title: "Tools & DevOps",
    icon: "terminal",
    skills: ["Docker", "Kubernetes", "Git & GitHub", "VS Code", "Kaggle", "Firebase"]
  },
  {
    title: "Professional",
    icon: "users",
    skills: ["Problem Solving", "Critical Thinking", "Time Management", "Leadership", "Quick Learner"]
  }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Counters states
  const [neoVal, setNeoVal] = useState(0);
  const [tradeVal, setTradeVal] = useState(0);
  const [facesVal, setFacesVal] = useState(0);

  // Form states
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formLoading, setFormLoading] = useState(false);

  // Scroll spy & scrolled header
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      setIsScrolled(scrollPos > 50);

      const sections = ['hero', 'about', 'projects', 'experience', 'skills', 'education', 'contact'];
      let currentSection = 'hero';

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop - 120;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            currentSection = sectionId;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Telemetry Numbers Counter Animation
  useEffect(() => {
    const animate = (start, end, duration, setValue) => {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        setValue(Math.floor(progress * (end - start) + start));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    };

    const neoTimer = setTimeout(() => animate(0, 95, 2000, setNeoVal), 300);
    const tradeTimer = setTimeout(() => animate(0, 94, 2200, setTradeVal), 600);
    const facesTimer = setTimeout(() => animate(0, 35, 1800, setFacesVal), 900);

    return () => {
      clearTimeout(neoTimer);
      clearTimeout(tradeTimer);
      clearTimeout(facesTimer);
    };
  }, []);

  // Smooth scroll handler
  const handleNavLinkClick = (e, targetId) => {
    e.preventDefault();
    setIsMenuOpen(false);

    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Form submit handler
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      setFormLoading(false);

      if (response.ok) {
        alert(data.message || `Thank you, ${formData.name}! Your message has been sent successfully.`);
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setFormLoading(false);
      alert(`Network error. Since this is hosted locally, mock response: Thank you, ${formData.name}! (Email routing simulation complete).`);
      setFormData({ name: '', email: '', message: '' });
    }
  };

  return (
    <>
      {/* Floating background glow elements */}
      <div className="bg-glow-1"></div>
      <div className="bg-glow-2"></div>

      {/* --- NAVIGATION HEADER --- */}
      <header id="main-header" className={isScrolled ? 'scrolled' : ''}>
        <div className="container navbar">
          <a href="#hero" className="logo" onClick={(e) => handleNavLinkClick(e, 'hero')}>
            RG<span>.AI</span>
          </a>

          <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`} id="nav-links">
            {['Home', 'About', 'Projects', 'Experience', 'Skills', 'Education', 'Contact'].map((label) => {
              const id = label.toLowerCase() === 'home' ? 'hero' : label.toLowerCase();
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  className={`nav-link ${activeSection === id ? 'active' : ''}`}
                  onClick={(e) => handleNavLinkClick(e, id)}
                >
                  {label}
                </a>
              );
            })}
          </nav>

          <a
            href="#contact"
            className="btn-primary"
            style={{ padding: '8px 18px', fontSize: '0.85rem' }}
            onClick={(e) => handleNavLinkClick(e, 'contact')}
          >
            Let's Talk
          </a>

          <button
            className="mobile-menu-toggle"
            id="menu-toggle"
            aria-label="Toggle navigation menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span style={{ transform: isMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none', transition: 'all 0.3s' }}></span>
            <span style={{ opacity: isMenuOpen ? '0' : '1', transition: 'all 0.3s' }}></span>
            <span style={{ transform: isMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none', transition: 'all 0.3s' }}></span>
          </button>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section id="hero">
        <div className="container hero-grid">
          <div className="hero-content">
            <div className="badge-capsule">
              {renderIcon('cpu', 14, { marginRight: '4px', verticalAlign: 'middle', display: 'inline-block' })} DATA SCIENCE & AI
            </div>
            <h1>Hi, I'm <span className="text-gradient">Radha Gohil</span></h1>
            <p className="subtitle">
              Data Science and AI enthusiast with hands-on experience in Python, SQL, Machine Learning, and Power BI. I build intelligent RAG assistants, computer vision systems, and analytics dashboards to solve real-world problems.
            </p>
            <div className="hero-cta">
              <a href="#projects" className="btn-primary" onClick={(e) => handleNavLinkClick(e, 'projects')}>
                View Projects {renderIcon('arrow-right', 16, { marginLeft: '8px', verticalAlign: 'middle', display: 'inline-block' })}
              </a>
              <a href="#contact" className="btn-secondary" onClick={(e) => handleNavLinkClick(e, 'contact')}>
                Get In Touch
              </a>
            </div>
          </div>

          <div className="hero-visuals">
            {/* Floating Telemetry 1 */}
            <div className="telemetry-card telemetry-1">
              <span className="metric-val" id="metric-neo">{neoVal}%</span>
              <span className="metric-label">NASA NEO Classifier</span>
            </div>

            {/* Avatar / Profile Picture */}
            <div className="avatar-container">
              <img src="RR.png" alt="Radha Gohil" />
            </div>

            {/* Floating Telemetry 2 */}
            <div className="telemetry-card telemetry-2">
              <span className="metric-val" id="metric-trade">{tradeVal}%</span>
              <span className="metric-label">TradeSync Model Accuracy</span>
            </div>

            {/* Floating Telemetry 3 */}
            <div className="telemetry-card telemetry-3">
              <span className="metric-val" id="metric-faces">{facesVal}+</span>
              <span className="metric-label">Concurrent Face Tracking</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section id="about" className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <span className="badge-capsule">About Me</span>
            <h2 style={{ marginTop: '10px' }}>Engineering with Data & Intelligence</h2>
          </div>

          <div className="about-content">
            <div className="about-text">
              <p>
                I am a Master of Technology student in Artificial Intelligence and Data Science at the Vellore Institute of Technology. I specialize in designing and deploying custom deep learning systems, statistical predictive pipelines, and automated dashboard interfaces.
              </p>
              <p>
                My experience spans across internship tenures at IBM Skillbuild and Edunet Foundation, where I applied supervised learning algorithms, predictive data analysis, and advanced visualizations using SAP Analytics Cloud and Power BI to solve critical tracking and classification problems.
              </p>
              <p>
                I thrive at the intersection of complex algorithms and clean presentation, ensuring that backend AI insights translate into intuitive, analytics-driven dashboards that deliver real business impact.
              </p>
            </div>

            <div className="about-stats">
              <div className="stat-box">
                <span>Completed Internships</span>
                <span className="stat-num">2</span>
              </div>
              <div className="stat-box">
                <span>Core Projects Done</span>
                <span className="stat-num">3+</span>
              </div>
              <div className="stat-box">
                <span>Current GPA (VIT)</span>
                <span className="stat-num">8.50</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PROJECTS SECTION --- */}
      <section id="projects" className="section-padding">
        <div className="container">
          <div className="section-header">
            <span className="badge-capsule">Portfolio</span>
            <h2 style={{ marginTop: '10px' }}>Featured AI & ML Projects</h2>
            <p>A selection of projects demonstrating LLM applications, Computer Vision systems, and full-stack trading dashboards.</p>
          </div>

          <div className="projects-grid">
            {PROJECTS.map((proj, idx) => (
              <div key={idx} className="card project-card">
                <div>
                  <div className="project-header">
                    <span className="project-badge">{proj.category}</span>
                    <div className="project-icons">
                      <a href={proj.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">
                        {renderIcon('github', 20)}
                      </a>
                      <a href="#contact" onClick={(e) => handleNavLinkClick(e, 'contact')} aria-label="Project Details">
                        {renderIcon('external-link', 20)}
                      </a>
                    </div>
                  </div>

                  <div className="project-body">
                    <h3>{proj.title}</h3>
                    <p>{proj.description}</p>
                    <ul className="project-bullets">
                      {proj.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="project-tech">
                  {proj.tech.map((t, i) => (
                    <span key={i}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- EXPERIENCE SECTION --- */}
      <section id="experience" className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header" style={{ marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }}>
            <span className="badge-capsule">Timeline</span>
            <h2 style={{ marginTop: '10px' }}>Professional Experience</h2>
            <p>My industry internships focusing on machine learning operations and analytics dashboards.</p>
          </div>

          <div className="timeline">
            {EXPERIENCE.map((exp, idx) => (
              <div key={idx} className={`timeline-item ${idx % 2 === 0 ? 'left' : 'right'}`}>
                <div className="timeline-content">
                  <span className="date">{exp.date}</span>
                  <h3 className="role">{exp.role}</h3>
                  <span className="company">{exp.company}</span>
                  <ul className="timeline-bullets" style={{ marginTop: '10px', color: 'var(--color-text-secondary)' }}>
                    {exp.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SKILLS SECTION --- */}
      <section id="skills" className="section-padding">
        <div className="container">
          <div className="section-header">
            <span className="badge-capsule">Expertise</span>
            <h2 style={{ marginTop: '10px' }}>Technical Skills & Abilities</h2>
          </div>

          <div className="skills-grid">
            {SKILLS_CATEGORIES.map((cat, idx) => (
              <div key={idx} className="card skills-card">
                <h3>
                  {renderIcon(cat.icon, 20, { marginRight: '8px', verticalAlign: 'middle', display: 'inline-block' })} {cat.title}
                </h3>
                <div className="skills-list">
                  {cat.skills.map((s, i) => (
                    <span key={i}>{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- EDUCATION & CREDENTIALS --- */}
      <section id="education" className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <span className="badge-capsule">Credentials</span>
            <h2 style={{ marginTop: '10px' }}>Education & Certifications</h2>
          </div>

          <div className="edu-grid">
            {/* Education Timeline */}
            <div className="edu-timeline">
              <div className="edu-item">
                <span className="dates">2025 - Present</span>
                <h3 className="degree">M.Tech in Artificial Intelligence & Data Science</h3>
                <p className="school">Vellore Institute of Technology, Chennai, Tamil Nadu</p>
                <span className="gpa">GPA: 8.50</span>
              </div>

              <div className="edu-item">
                <span className="dates">2022 - 2025</span>
                <h3 className="degree">B.Tech in Computer Engineering</h3>
                <p className="school">Sarvajanik College of Engineering and Technology, Surat, Gujarat</p>
                <span className="gpa">CGPA: 8.96</span>
              </div>

              <div className="edu-item">
                <span className="dates">2019 - 2022</span>
                <h3 className="degree">Diploma in Computer Engineering</h3>
                <p className="school">Government Polytechnic For Girls, Surat, Gujarat</p>
                <span className="gpa">CGPA: 8.35</span>
              </div>
            </div>

            {/* Awards and Certs */}
            <div className="awards-box">
              <h3 style={{ marginBottom: '10px', fontFamily: 'var(--font-heading)', fontSize: '1.5rem' }}>Awards & Badges</h3>

              <div className="award-item">
                <div className="award-icon">{renderIcon('award', 20)}</div>
                <div className="award-content">
                  <h4>3rd Place - New Vibrant Hackathon</h4>
                  <p>IoT Based Smart Garbage Collection System project.</p>
                </div>
              </div>

              <div className="award-item">
                <div className="award-icon">{renderIcon('trophy', 20)}</div>
                <div className="award-content">
                  <h4>2nd Prize - Updates 2023 Techfest</h4>
                  <p>Competed and won runner-up prize in tech event categories.</p>
                </div>
              </div>

              <div className="award-item">
                <div className="award-icon">{renderIcon('award', 20)}</div>
                <div className="award-content">
                  <h4>NPTEL Certification</h4>
                  <p>Database Management Systems (NPTEL National Level exam).</p>
                </div>
              </div>

              <div className="award-item">
                <div className="award-icon">{renderIcon('users', 20)}</div>
                <div className="award-content">
                  <h4>Hackfest Volunteer</h4>
                  <p>Volunteer organizer for the Updates 2023 Techfest event.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="section-padding">
        <div className="container">
          <div className="section-header" style={{ marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }}>
            <span className="badge-capsule">Connection</span>
            <h2 style={{ marginTop: '10px' }}>Get In Touch</h2>
            <p>Have an interesting project or role? Let's connect and discuss how I can help.</p>
          </div>

          <div className="contact-info" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            {/* LinkedIn Card */}
            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="card contact-card">
              <div className="contact-icon">{renderIcon('linkedin', 24)}</div>
              <div className="contact-details">
                <h3>LinkedIn {renderIcon('external-link', 12, { opacity: 0.7, marginLeft: '4px', display: 'inline-block', verticalAlign: 'middle' })}</h3>
                <p className="handle">radha-gohil</p>
                <p className="subtext">Connect professionally</p>
              </div>
            </a>

            {/* GitHub Card */}
            <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="card contact-card">
              <div className="contact-icon">{renderIcon('github', 24)}</div>
              <div className="contact-details">
                <h3>GitHub {renderIcon('external-link', 12, { opacity: 0.7, marginLeft: '4px', display: 'inline-block', verticalAlign: 'middle' })}</h3>
                <p className="handle">radha-gohil</p>
                <p className="subtext">Explore the code</p>
              </div>
            </a>

            {/* LeetCode Card */}
            <a href={SOCIAL_LINKS.leetcode} target="_blank" rel="noopener noreferrer" className="card contact-card">
              <div className="contact-icon">{renderIcon('leetcode', 24)}</div>
              <div className="contact-details">
                <h3>LeetCode {renderIcon('external-link', 12, { opacity: 0.7, marginLeft: '4px', display: 'inline-block', verticalAlign: 'middle' })}</h3>
                <p className="handle">radhagohil999</p>
                <p className="subtext">Solve challenges</p>
              </div>
            </a>

            {/* Email Card */}
            <a href={`mailto:${SOCIAL_LINKS.email}`} className="card contact-card">
              <div className="contact-icon">{renderIcon('mail', 24)}</div>
              <div className="contact-details">
                <h3>Email {renderIcon('external-link', 12, { opacity: 0.7, marginLeft: '4px', display: 'inline-block', verticalAlign: 'middle' })}</h3>
                <p className="handle">{SOCIAL_LINKS.email}</p>
                <p className="subtext">Shoot me a message</p>
              </div>
            </a>

            {/* Resume Card */}
            <a href={SOCIAL_LINKS.resume} target="_blank" rel="noopener noreferrer" className="card contact-card">
              <div className="contact-icon">{renderIcon('file-text', 24)}</div>
              <div className="contact-details">
                <h3>Resume {renderIcon('external-link', 12, { opacity: 0.7, marginLeft: '4px', display: 'inline-block', verticalAlign: 'middle' })}</h3>
                <p className="handle">View CV</p>
                <p className="subtext">Download latest resume PDF</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer>
        <div className="container footer-content">
          <p>&copy; 2026 Radha Gohil.</p>

          <div className="social-links">
            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn Profile">
              {renderIcon('linkedin', 20)}
            </a>
            <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub Profile">
              {renderIcon('github', 20)}
            </a>
            <a href={SOCIAL_LINKS.leetcode} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LeetCode Profile">
              {renderIcon('leetcode', 20)}
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
