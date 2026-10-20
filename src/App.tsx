/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, Cpu, Database, Globe, Layers, GitBranch, Download, 
  ExternalLink, Github, Mail, Linkedin, Phone, MapPin, Award, 
  BookOpen, Code2, CheckCircle2, ChevronRight, X, ArrowUp, 
  Menu, Sparkles, Send, FileText, Eye, Layers as LayersIcon,
  Server, Shield, Users, Calendar, ArrowRight, Check, Copy, ArrowUpRight
} from 'lucide-react';

interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  categoryTag: string;
  image: string;
  imageAlt: string;
  objective: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  overview: string;
  problemStatement: string;
  objectivesList: string[];
  myRole: string;
  architecture: string;
  featuresCompleted: string[];
  featuresPlanned: string[];
  challenges: string;
  futureImprovements: string[];
  hasDataset?: boolean;
}

export default function App() {
  const [activeNav, setActiveNav] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectFilter, setProjectFilter] = useState('All');
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [datasetViewerOpen, setDatasetViewerOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const cursorGlowRef = useRef<HTMLDivElement>(null);
  const touchGlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);

    const cursorGlow = cursorGlowRef.current;
    const touchGlow = touchGlowRef.current;
    const supportsCursorGlow = window.matchMedia(
      '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'
    ).matches;
    const supportsTouchGlow = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    let animationFrameId: number | null = null;
    let touchAnimationFrameId: number | null = null;
    let touchX = 0;
    let touchY = 0;
    let pointerX = 0;
    let pointerY = 0;
    let glowX = 0;
    let glowY = 0;
    let hasPointerPosition = false;

    const animateCursorGlow = () => {
      if (!cursorGlow) return;

      const deltaX = pointerX - glowX;
      const deltaY = pointerY - glowY;

      if (Math.abs(deltaX) + Math.abs(deltaY) < 0.5) {
        glowX = pointerX;
        glowY = pointerY;
        animationFrameId = null;
      } else {
        glowX += deltaX * 0.16;
        glowY += deltaY * 0.16;
        animationFrameId = requestAnimationFrame(animateCursorGlow);
      }

      cursorGlow.style.transform = `translate3d(${glowX - 88}px, ${glowY - 88}px, 0)`;
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || !cursorGlow) return;

      pointerX = event.clientX;
      pointerY = event.clientY;

      if (!hasPointerPosition) {
        glowX = pointerX;
        glowY = pointerY;
        hasPointerPosition = true;
        cursorGlow.style.transform = `translate3d(${glowX - 88}px, ${glowY - 88}px, 0)`;
      } else if (animationFrameId === null) {
        animationFrameId = requestAnimationFrame(animateCursorGlow);
      }

      cursorGlow.style.opacity = '1';
    };

    const hideCursorGlow = () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
      hasPointerPosition = false;
      if (cursorGlow) cursorGlow.style.opacity = '0';
    };

    const updateTouchGlow = (event: TouchEvent) => {
      const touch = event.touches[0] ?? event.changedTouches[0];
      if (!touch || !touchGlow) return;

      touchX = touch.clientX;
      touchY = touch.clientY;
      if (touchAnimationFrameId !== null) return;

      touchAnimationFrameId = requestAnimationFrame(() => {
        touchGlow.style.transform = `translate3d(${touchX - 36}px, ${touchY - 36}px, 0)`;
        touchGlow.style.opacity = '1';
        touchAnimationFrameId = null;
      });
    };

    const hideTouchGlow = () => {
      if (touchAnimationFrameId !== null) {
        cancelAnimationFrame(touchAnimationFrameId);
        touchAnimationFrameId = null;
      }
      if (touchGlow) touchGlow.style.opacity = '0';
    };

    if (supportsCursorGlow) {
      window.addEventListener('pointermove', handlePointerMove);
      document.addEventListener('pointerleave', hideCursorGlow);
      window.addEventListener('blur', hideCursorGlow);
    }
    if (supportsTouchGlow) {
      window.addEventListener('touchstart', updateTouchGlow, { passive: true });
      window.addEventListener('touchmove', updateTouchGlow, { passive: true });
      window.addEventListener('touchend', hideTouchGlow, { passive: true });
      window.addEventListener('touchcancel', hideTouchGlow, { passive: true });
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (supportsCursorGlow) {
        window.removeEventListener('pointermove', handlePointerMove);
        document.removeEventListener('pointerleave', hideCursorGlow);
        window.removeEventListener('blur', hideCursorGlow);
      }
      if (supportsTouchGlow) {
        window.removeEventListener('touchstart', updateTouchGlow);
        window.removeEventListener('touchmove', updateTouchGlow);
        window.removeEventListener('touchend', hideTouchGlow);
        window.removeEventListener('touchcancel', hideTouchGlow);
      }
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
      if (touchAnimationFrameId !== null) cancelAnimationFrame(touchAnimationFrameId);
    };
  }, []);

  const projectsData: Project[] = [
    {
      id: 'cctv-attendance',
      number: '01',
      title: 'AI-Based CCTV Attendance Management System',
      category: 'Artificial Intelligence / Computer Vision',
      categoryTag: 'AI & Computer Vision',
      image: '/images/projects/cctv-attendence.png',
      imageAlt: 'AI CCTV attendance project preview',
      objective: 'Explore automated student attendance management using face recognition and camera-based student identification.',
      description: 'An advanced system architecture designed for automated student identification, verification, and attendance logging via live camera streams and face recognition models.',
      techStack: ['Python', 'Face Recognition', 'OpenCV', 'Firebase / Firestore', 'Node.js', 'Scheduled Tasks'],
      githubUrl: 'https://github.com/godwinjijo789/InsightFace',
      liveUrl: 'https://insight-face-omega.vercel.app/',
      overview: 'This project addresses the tedious nature of traditional roll-call attendance in educational institutions by architecting an automated computer vision attendance framework that reliably identifies students via camera feeds.',
      problemStatement: 'Manual attendance logging consumes 10-15 minutes of every lecture hour, prone to proxy attendance, human recording errors, and delayed reporting to institutional administrators and parents.',
      objectivesList: [
        'Build structured student profile registries with registration numbers, department data, and reference embeddings.',
        'Implement real-time face detection and recognition pipelines from camera streams.',
        'Automate daily attendance logging with secure cloud database synchronization.',
        'Establish administrative dashboards for schools, faculty, and reporting.'
      ],
      myRole: 'Lead student developer and system architecture designer responsible for workflow conceptualization, database schema definition, and computer vision pipeline research.',
      architecture: 'Client-server architecture where video frames captured from IP/CCTV cameras are processed via a Python OpenCV + face_recognition worker node, mapping detected face embeddings against a Firestore vector registry, and triggering real-time attendance logs.',
      featuresCompleted: [
        'Student profile management schema design (Firestore)',
        'Face embedding extraction workflow and verification script',
        'Attendance logging database schema with timestamp indexing',
        'Administrative dashboard wireframes and role-based access logic'
      ],
      featuresPlanned: [
        'Automated parent absence SMS/WhatsApp push notifications',
        'Real-time IP camera RTSP stream multi-threading',
        'On-duty and medical leave proof workflow management'
      ],
      challenges: 'Balancing recognition accuracy with processing latency under varying lighting conditions in classroom environments, solved by standardizing image preprocessing and threshold tuning.',
      futureImprovements: [
        'Integration of lightweight Edge AI hardware (Raspberry Pi / Jetson Nano) for decentralized frame processing.',
        'Optimized embedding storage using vector indices for large institutions.'
      ]
    },
    {
      id: 'certificate-in-bulk',
      number: '02',
      title: 'Certificate-in-Bulk',
      category: 'Workflow Automation',
      categoryTag: 'Automation',
      image: '/images/projects/certificate-bulk.svg',
      imageAlt: 'Illustration of a generated certificate and automation workflow',
      objective: 'A certificate-related project intended to simplify repetitive certificate preparation for workshops, college events, and participants.',
      description: 'Streamlined automation tool designed to eliminate manual certificate generation friction for college symposia, workshops, and hackathons.',
      techStack: ['Python', 'Pandas', 'ReportLab / Pillow', 'Automation Scripts', 'CLI / GUI'],
      githubUrl: 'https://github.com/godwinjijo789/Certificate-in-Bulk',
      liveUrl: 'https://certificate-in-bulk-vert.vercel.app/',
      overview: 'Certificate-in-Bulk is a utility toolkit built to parse participant CSV/Excel spreadsheets and automatically batch-generate personalized certificates with precise typographic placement.',
      problemStatement: 'Event organizers waste hours manually typing participant names into design templates or struggling with rigid mail-merge plugins that frequently misalign text and break typography.',
      objectivesList: [
        'Ingest participant lists effortlessly from standard CSV or Excel files.',
        'Map dynamic participant names and metadata onto custom certificate templates.',
        'Export high-resolution PDF certificates in batch folders ready for email distribution.'
      ],
      myRole: 'Sole creator and developer of the repository, handling script architecture, template coordinate mapping, and error-handling routines.',
      architecture: 'Python-based batch processing engine using Pandas for data ingestion and Pillow/ReportLab for high-fidelity text rendering onto master templates.',
      featuresCompleted: [
        'CSV/Excel data ingestion parser with column validation',
        'Dynamic text positioning and multi-font support',
        'Batch export generating individual PDF files with clean naming conventions',
        'Open-source public repository release with clear documentation'
      ],
      featuresPlanned: [
        'Web-based drag-and-drop template editor interface',
        'Direct automated email dispatch integration with SMTP / SendGrid',
        'Custom badge generation module'
      ],
      challenges: 'Handling long participant names that overflow standard certificate name bounds, resolved by implementing dynamic font-size scaling and text bounding box wrapping.',
      futureImprovements: [
        'Adding a React frontend wrapper for non-technical event coordinators.',
        'Cloud storage integration for instant ZIP downloads.'
      ]
    },
    {
      id: 'sana-pets',
      number: '03',
      title: 'Sana Pets',
      category: 'Web Development',
      categoryTag: 'Web Development',
      image: '/images/projects/sana-pets.png',
      imageAlt: 'Sana Pets project preview',
      objective: 'A pet-business website concept for presenting a pet business and its offerings online.',
      description: 'A modern, responsive web application concept crafted for a specialized pet care and services business with administrator access control.',
      techStack: ['React', 'Vite', 'Tailwind CSS', 'Firebase', 'JavaScript'],
      githubUrl: 'https://github.com/godwinjijo789/sana-pets-accessories',
      liveUrl: 'https://sana-pets-accessories.vercel.app/',
      overview: 'Sana Pets provides an elegant digital storefront and service showcase for pet care, grooming, and specialized nutrition offerings.',
      problemStatement: 'Local pet care providers lack professional, fast-loading digital web presence that clearly communicates services without bloated e-commerce carts.',
      objectivesList: [
        'Design a clean, warm, and inviting user interface tailored for pet lovers.',
        'Present pet services, care tips, and consultation booking inquiries cleanly.',
        'Provide secure administrator access for the first two authorized users to update offerings.'
      ],
      myRole: 'Frontend developer and system designer responsible for UI component architecture, Tailwind styling, and Firebase authentication setup.',
      architecture: 'Single-page React application powered by Vite and styled with Tailwind CSS, utilizing Firebase for secure administrator authentication.',
      featuresCompleted: [
        'Responsive mobile-first layout with clean typography',
        'Service showcase grid with detailed descriptions and pricing cards',
        'Secure admin login portal restricted to authorized management accounts',
        'Inquiry contact form with instant validation'
      ],
      featuresPlanned: [
        'Online appointment scheduling calendar integration',
        'Customer review testimonial submission workflow',
        'Pet adoption showcase board'
      ],
      challenges: 'Ensuring seamless mobile responsiveness across varying tablet and phone screen dimensions for media-rich pet galleries.',
      futureImprovements: [
        'Adding multi-language support for regional pet owners.',
        'Real-time chat widget for quick customer consultations.'
      ]
    },
    {
      id: 'movie-audience-review-dataset',
      number: '04',
      title: 'Movie Audience Review Dataset',
      category: 'Data Preparation / Natural Language Processing',
      categoryTag: 'Data Science / NLP',
      image: '/images/projects/movie-reviews.png',
      imageAlt: 'Movie audience review dataset project preview',
      objective: 'Prepare a structured movie audience-review dataset suitable for text-data exploration and future NLP experiments.',
      description: 'A meticulously cleaned and structured dataset comprising 100 audience reviews with fields for review text, audience name, and gender, optimized for EDA and NLP text preprocessing.',
      techStack: ['Python', 'Pandas', 'NLTK', 'Data Preprocessing', 'EDA'],
      githubUrl: 'https://github.com/godwinjijo789/-Sentiment-AI',
      liveUrl: 'https://sentiment-analysis-intelligence.streamlit.app/',
      hasDataset: true,
      overview: 'This project focuses on data collection, cleaning, and structuring of 100 movie audience reviews to form a reliable benchmark for exploratory data analysis and sentiment studies.',
      problemStatement: 'Raw audience feedback gathered from social platforms is unstructured, noisy, and unformatted, making it difficult to run preliminary NLP sentiment classifiers without prior normalization.',
      objectivesList: [
        'Curate a balanced dataset of 100 audience reviews with associated metadata (Audience Name, Gender, Review Text).',
        'Perform data hygiene checks, handling missing values and duplicate records.',
        'Structure the dataset in standard CSV format for Pandas ingestion and tokenization experiments.'
      ],
      myRole: 'Data curator and analyst responsible for dataset collection schema, data cleaning scripts, and exploratory visualization notebooks.',
      architecture: 'Python / Pandas processing pipeline reading raw string records, normalizing text casing, removing special characters, and exporting structured CSV tables.',
      featuresCompleted: [
        'Structured 100-record audience review schema (review, audience_name, gender)',
        'Data cleaning and tokenization preprocessing script',
        'Exploratory data analysis summary metrics (review length distribution, sentiment ratio breakdown)',
        'Interactive CSV preview and download module in portfolio'
      ],
      featuresPlanned: [
        'Expanding dataset size to 500+ records with multi-genre classification',
        'Integrating TF-IDF and Naive Bayes baseline sentiment scoring',
        'Word cloud visualization generator'
      ],
      challenges: 'Ensuring demographic diversity in review sentiments and handling colloquial slang in review text during normalization.',
      futureImprovements: [
        'Publishing the cleaned dataset on Hugging Face and GitHub for student researchers.',
        'Training a fine-tuned distilBERT sentiment classifier on the expanded corpus.'
      ]
    },
    {
      id: 'furniture-showroom-strategy',
      number: '05',
      title: 'Online Promotion Strategy for a Local Furniture Showroom',
      category: 'Digital Marketing / Business Strategy',
      categoryTag: 'Business Strategy',
      image: '/images/projects/furniture-promotion.png',
      imageAlt: 'Furniture showroom promotion project preview',
      objective: 'Develop an online promotion strategy to improve the visibility of a local furniture showroom and attract customer enquiries.',
      description: 'A comprehensive digital marketing and customer acquisition blueprint tailored for a local furniture enterprise seeking online visibility.',
      techStack: ['Digital Marketing', 'Instagram & Facebook Ads', 'Google Business Profile', 'Content Strategy', 'Analytics'],
      githubUrl: 'https://github.com/godwinjijo789/E.T.R-Furniture',
      liveUrl: 'https://etrfurniture.vercel.app/',
      overview: 'A strategic framework outlining digital channels, content calendars, and local SEO tactics to bridge local furniture craftsmanship with digital buyer discovery.',
      problemStatement: 'Traditional furniture showrooms rely entirely on walk-in foot traffic, missing high-intent local buyers who research living room and bedroom setups online before visiting physical stores.',
      objectivesList: [
        'Analyze target customer segments for premium local furniture.',
        'Establish active presence across Instagram, WhatsApp Business, and Google Business Profile.',
        'Design a high-engagement content strategy featuring showroom walkthrough reels and craftsmanship spotlights.',
        'Define key performance indicators (reach, direct WhatsApp enquiries, store visits).'
      ],
      myRole: 'Strategist and researcher formulating channel mix, content messaging, and conversion funnels.',
      architecture: 'Multi-channel acquisition funnel connecting organic social media discovery (Reels/Photos) and Google local search directly to WhatsApp Business consultation chats.',
      featuresCompleted: [
        'Target audience persona and local competitor analysis',
        'Multi-channel marketing mix (Instagram, Facebook, WhatsApp, Google Business)',
        'Content calendar template for showroom walkthroughs and customer testimonials',
        'Performance tracking framework and KPI metrics'
      ],
      featuresPlanned: [
        'A/B testing ad creatives for Meta advertising campaigns',
        'Virtual 360-degree showroom tour integration',
        'Automated WhatsApp FAQ chatbot for instant pricing inquiries'
      ],
      challenges: 'Translating tactile furniture appeal into digital video and photo formats that capture wood grain quality and upholstery comfort.',
      futureImprovements: [
        'Executing a pilot Meta ad campaign with localized geo-targeting within a 25km radius.',
        'Measuring footfall attribution via exclusive in-store discount codes.'
      ]
    }
  ];

  const filteredProjects = projectFilter === 'All' 
    ? projectsData 
    : projectsData.filter(p => p.categoryTag === projectFilter);

  const skillsData = [
    {
      category: 'Programming & Data',
      skills: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn']
    },
    {
      category: 'AI & Machine Learning',
      skills: ['Machine Learning Fundamentals', 'Exploratory Data Analysis (EDA)', 'Data Preprocessing', 'NLP Fundamentals', 'Computer Vision & Face Recognition', 'TensorFlow Exploration']
    },
    {
      category: 'Web Development',
      skills: ['React', 'Vite', 'Tailwind CSS', 'JavaScript / TypeScript', 'Firebase', 'Supabase']
    },
    {
      category: 'Developer Tools',
      skills: ['Git', 'GitHub', 'VS Code', 'Vercel', 'Google AI Studio', 'Ollama']
    }
  ];

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText('godwinjijo789@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  const scrollToSection = (id: string) => {
    setActiveNav(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 font-sans selection:bg-blue-600 selection:text-white antialiased relative overflow-clip">
      <div
        ref={cursorGlowRef}
        aria-hidden="true"
        className="cursor-glow pointer-events-none fixed left-0 top-0 z-[60] h-44 w-44 rounded-full opacity-0 transition-opacity duration-200"
        style={{
          background: 'radial-gradient(circle, rgba(34, 211, 238, 0.14) 0%, rgba(59, 130, 246, 0.08) 38%, transparent 72%)',
          transform: 'translate3d(-200px, -200px, 0)',
          willChange: 'transform, opacity'
        }}
      />
      <div
        ref={touchGlowRef}
        aria-hidden="true"
        className="touch-glow pointer-events-none fixed left-0 top-0 z-[60] h-[72px] w-[72px] rounded-full opacity-0 transition-opacity duration-200"
        style={{
          background: 'radial-gradient(circle, rgba(34, 211, 238, 0.3) 0%, rgba(59, 130, 246, 0.16) 42%, transparent 74%)',
          transform: 'translate3d(-100px, -100px, 0)',
          willChange: 'transform, opacity'
        }}
      />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-cyan-400 focus:px-4 focus:py-2 focus:font-semibold focus:text-slate-950"
      >
        Skip to content
      </a>
      
      {/* TOP NAVIGATION BAR (Top Bar Contract: Brand, Contact, Resume) */}
      <header className="sticky top-0 z-50 bg-[#07090E]/90 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 min-h-20 flex items-center justify-between gap-4">
          
          {/* Zone 1: Brand Wordmark / Monogram */}
          <a 
            href="#home" 
            onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
            className="flex items-center gap-2.5 sm:gap-3 group shrink-0"
          >
            <img
              src="/images/profile-logo.jpeg"
              alt="Godwin Jijo R"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover object-center border-2 border-cyan-400 shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors whitespace-nowrap">
                Godwin Jijo R
              </span>
              <span className="text-[10px] sm:text-xs text-slate-400 font-mono tracking-wider">AI & Data Science</span>
            </div>
          </a>

          <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-1">
            {[
              { id: 'about', label: 'About' },
              { id: 'projects', label: 'Projects' },
              { id: 'skills', label: 'Skills' },
              { id: 'contact', label: 'Contact' }
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                aria-current={activeNav === id ? 'location' : undefined}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  activeNav === id ? 'text-cyan-300 bg-slate-800/70' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <button
              onClick={() => setResumeModalOpen(true)}
              className="px-3 sm:px-4 py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-md shadow-blue-600/30 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(open => !open)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus-visible:outline-none"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <nav id="mobile-navigation" aria-label="Mobile navigation" className="lg:hidden border-t border-slate-800 px-4 py-3 sm:px-6">
            {[
              { id: 'about', label: 'About' },
              { id: 'projects', label: 'Projects' },
              { id: 'skills', label: 'Skills' },
              { id: 'contact', label: 'Contact' }
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                aria-current={activeNav === id ? 'location' : undefined}
                className={`w-full px-3 py-3 text-left rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  activeNav === id ? 'text-cyan-300 bg-slate-800/70' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {label}
              </button>
            ))}
          </nav>
        )}
      </header>

      <main id="main-content" tabIndex={-1}>
        {/* HERO SECTION */}
        <section id="home" className="relative pt-12 pb-12 md:pt-20 md:pb-16 overflow-hidden border-b border-slate-800/60">
          {/* Subtle background glow gradients */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[140px] rounded-full pointer-events-none" />
          <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="max-w-6xl mx-auto px-6 relative z-10 flex flex-col items-center md:flex-row md:items-center md:gap-14">
            
            {/* Profile image appears above the intro on mobile and to its right on desktop. */}
            <div className="relative group mb-8 md:mb-0 md:order-last md:shrink-0">
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 opacity-60 blur-lg group-hover:opacity-100 transition-opacity" />
              <div className="relative w-56 h-72 sm:w-64 sm:h-80 lg:w-72 lg:h-96 rounded-2xl overflow-hidden border-2 border-slate-700 bg-[#0D121F] shadow-2xl">
                <img
                  src="/images/profile.jpeg"
                  alt="Godwin Jijo R"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>

            {/* Typography & CTAs */}
            <div className="flex flex-col items-center gap-6 text-center md:flex-1 md:items-start md:text-left">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-800/60 border border-slate-700/60 text-cyan-400 text-xs font-mono tracking-wider w-fit">
                <Sparkles className="w-3.5 h-3.5" />
                <span>HELLO, I'M</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white">
                Godwin Jijo R
              </h1>

              <div className="text-xl sm:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
                AI & Data Science Student
              </div>

              <p className="text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
                I build practical AI solutions, explore data, and turn ideas into useful digital experiences.
              </p>

              <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">
                I’m an AI & Data Science student passionate about machine learning, data analysis, intelligent automation, and building applications that solve real-world problems.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 pt-2">
                <button
                  onClick={() => scrollToSection('projects')}
                  className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2 group cursor-pointer"
                >
                  <span>View My Projects</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <a
                  href="/Godwin_Jijo_R_Resume.pdf"
                  download="Godwin_Jijo_R_Resume.pdf"
                  className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm transition-all border border-slate-700 flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-cyan-400" />
                  <span>Download Resume</span>
                </a>

              </div>

              {/* Technology Tags */}
              <div className="pt-6 border-t border-slate-800/80 flex flex-wrap justify-center md:justify-start items-center gap-3 text-xs text-slate-400">
                <span className="text-slate-500 font-mono">EXPLORING:</span>
                <span className="text-slate-300">Python</span>
                <span className="text-slate-600">·</span>
                <span className="text-slate-300">Data Science</span>
                <span className="text-slate-600">·</span>
                <span className="text-slate-300">Machine Learning</span>
                <span className="text-slate-600">·</span>
                <span className="text-slate-300">Web Development</span>
                <span className="text-slate-600">·</span>
                <span className="text-slate-300">Deep Learning</span>
              </div>
            </div>

          </div>
        </section>

        {/* ABOUT ME SECTION */}
        <section id="about" className="pt-10 pb-16 md:pt-14 md:pb-20 border-b border-slate-800/60 bg-[#0A0E17]/50">
          <div className="max-w-7xl mx-auto px-6">
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mb-10 md:mb-12"
            >
              <span className="text-xs font-mono text-cyan-400 tracking-wider">01 // ABOUT ME</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-2">
                Curious Mind. Practical Builder.
              </h2>
              <p className="text-slate-400 text-base mt-4 leading-relaxed">
                As a third-year undergraduate specializing in Artificial Intelligence and Data Science at Mohamed Sathak A.J. College of Engineering, Chennai, I bridge theoretical concepts with hands-on technical execution.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Cpu className="w-6 h-6" />,
                  title: "AI & Machine Learning",
                  desc: "Exploring core machine learning algorithms, computer vision pipelines, face recognition architecture, and exploratory data analysis."
                },
                {
                  icon: <Database className="w-6 h-6" />,
                  title: "Data Cleaning & EDA",
                  desc: "Specializing in data preparation, exploratory data analysis, handling datasets, and structuring raw text and numerical records for experiments."
                },
                {
                  icon: <Globe className="w-6 h-6" />,
                  title: "Web Apps & Automation",
                  desc: "Building full-stack web applications using React, Vite, Tailwind CSS, and writing Python automation scripts that solve repetitive workflows."
                }
              ].map((card, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="p-8 rounded-2xl bg-[#0D121F] border border-slate-800 flex flex-col gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    {card.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white">{card.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {card.desc}
                  </p>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="py-16 md:py-20 border-b border-slate-800/60">
          <div className="max-w-7xl mx-auto px-6">
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12 gap-6"
            >
              <div>
                <span className="text-xs font-mono text-cyan-400 tracking-wider">02 // PORTFOLIO</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-2">
                  Featured Projects
                </h2>
                <p className="text-slate-400 text-sm mt-2">
                  Explore practical systems, data tools, and applications I have researched and built.
                </p>
              </div>

              {/* Project Filter Controls */}
              <div aria-label="Filter projects by category" className="flex flex-nowrap items-center gap-1.5 p-1.5 bg-[#0D121F] rounded-xl border border-slate-800 max-w-full overflow-x-auto">
                {['All', 'AI & Computer Vision', 'Data Science / NLP', 'Web Development', 'Automation', 'Business Strategy'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setProjectFilter(cat)}
                    aria-pressed={projectFilter === cat}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                      projectFilter === cat 
                        ? 'bg-blue-600 text-white shadow-md' 
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, idx) => (
                <motion.div 
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: (idx % 3) * 0.1 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="group rounded-2xl bg-[#0D121F] border border-slate-800 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all p-8 flex flex-col justify-between shadow-xl"
                >
                  <div className="flex flex-col gap-4">
                    
                    <div className="flex justify-center -mx-2 -mt-2 mb-1 overflow-hidden rounded-xl border border-slate-800/80 bg-[#080C15]">
                      <img
                        src={project.image}
                        alt={project.imageAlt}
                        loading="lazy"
                        className="h-40 w-full object-cover sm:h-44"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-cyan-400 font-bold">{project.number}</span>
                      <span className="text-xs text-slate-400">{project.categoryTag}</span>
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 pt-2 text-xs text-slate-400 font-mono">
                      {project.techStack.slice(0, 3).map((tech, i) => (
                        <React.Fragment key={tech}>
                          <span>{tech}</span>
                          {i < Math.min(project.techStack.length, 3) - 1 && <span className="text-slate-600">·</span>}
                        </React.Fragment>
                      ))}
                      {project.techStack.length > 3 && <span className="text-slate-500">+{project.techStack.length - 3} more</span>}
                    </div>

                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-800/80 grid grid-cols-3 items-center gap-2">
                    <button
                      onClick={() => setSelectedProject(project)}
                      aria-label={`About ${project.title}`}
                      className="justify-self-start text-sm font-semibold text-slate-200 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>About</span>
                    </button>

                    {project.liveUrl && project.liveUrl !== '#' && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Preview ${project.title} (opens in a new tab)`}
                        className="justify-self-center px-3.5 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 hover:text-cyan-200 text-sm font-semibold transition-colors inline-flex items-center gap-2"
                      >
                        <span>Preview</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`GitHub repository for ${project.title} (opens in a new tab)`}
                        title="GitHub repository"
                        className="justify-self-end p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* EXPERIENCE & EDUCATION SECTION */}
        <section id="experience" className="py-16 md:py-20 border-b border-slate-800/60 bg-[#0A0E17]/50">
          <div className="max-w-7xl mx-auto px-6">
            
            <div className="max-w-3xl mb-10 md:mb-12">
              <span className="text-xs font-mono text-cyan-400 tracking-wider">03 // TIMELINE</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-2">
                Experience & Education
              </h2>
              <p className="text-slate-400 text-sm mt-2">
                My academic journey and technical engagements in AI & Data Science.
              </p>
            </div>

            <div className="max-w-4xl relative border-l border-slate-800 ml-4 md:ml-8 pl-6 md:pl-10 space-y-8 md:space-y-10">
              
              {/* Education Entry */}
              <div className="relative">
                <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-cyan-400 border-4 border-[#07090E]" />
                <div className="p-8 rounded-2xl bg-[#0D121F] border border-slate-800 flex flex-col gap-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-mono text-cyan-400">III Year Undergraduate</span>
                    <span className="text-xs text-slate-400">Chennai, Tamil Nadu, India</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">B.Tech in Artificial Intelligence and Data Science</h3>
                  <p className="text-sm font-medium text-slate-300">Mohamed Sathak A.J. College of Engineering</p>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Currently pursuing third-year studies focusing on machine learning foundations, data structures, statistics, exploratory data analysis, and practical software engineering.
                  </p>
                </div>
              </div>

              {/* Event Coordination Entry */}
              <div className="relative">
                <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-blue-600 border-4 border-[#07090E]" />
                <div className="p-8 rounded-2xl bg-[#0D121F] border border-slate-800 flex flex-col gap-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-mono text-blue-400">Technical Leadership</span>
                    <span className="text-xs text-slate-400">2025 - 2026</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">Event Coordinator — CloudSphere & Tamizh Hack Fest 2026</h3>
                  <p className="text-sm font-medium text-slate-300">College Technical Symposium & Hackathon</p>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Coordinated technical registrations, participant communications, team organization, and logistics for CloudSphere and Tamizh Hack Fest 2026, ensuring seamless event execution and fostering collaborative student coding environments.
                  </p>
                </div>
              </div>

              {/* Internships Placeholder */}
              <div className="relative">
                <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-slate-700 border-4 border-[#07090E]" />
                <div className="p-8 rounded-2xl bg-[#0D121F]/60 border border-slate-800/80 flex flex-col gap-3">
                  <span className="text-xs font-mono text-slate-400">Upcoming Opportunities</span>
                  <h3 className="text-lg font-bold text-slate-300">AI/ML, Data Science, or Data Analyst Internship</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Seeking internship roles where I can apply my foundational skills in Python, data preprocessing, machine learning, and web development to contribute to impactful real-world projects.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* SKILLS & TOOLS SECTION */}
        <section id="skills" className="py-16 md:py-20 border-b border-slate-800/60">
          <div className="max-w-7xl mx-auto px-6">
            
            <div className="max-w-3xl mb-10 md:mb-12">
              <span className="text-xs font-mono text-cyan-400 tracking-wider">04 // CAPABILITIES</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-2">
                Skills & Tools
              </h2>
              <p className="text-slate-400 text-sm mt-2">
                Technologies and tools I have explored and utilized in my coursework and projects.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {skillsData.map((group, idx) => (
                <div key={idx} className="p-8 rounded-2xl bg-[#0D121F] border border-slate-800 flex flex-col gap-6">
                  <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
                    {group.category}
                  </h3>
                  <ul className="flex flex-col gap-3">
                    {group.skills.map((skill, sIdx) => (
                      <li key={sIdx} className="flex items-center gap-2.5 text-sm text-slate-300">
                        <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ACHIEVEMENTS & ACTIVITIES SECTION */}
        <section id="achievements" className="py-16 md:py-20 border-b border-slate-800/60 bg-[#0A0E17]/50">
          <div className="max-w-7xl mx-auto px-6">
            
            <div className="max-w-3xl mb-10 md:mb-12">
              <span className="text-xs font-mono text-cyan-400 tracking-wider">05 // RECOGNITION</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-2">
                Achievements & Activities
              </h2>
              <p className="text-slate-400 text-sm mt-2">
                Verified leadership, event coordination, and technical participation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <div className="p-8 rounded-2xl bg-[#0D121F] border border-slate-800 flex flex-col gap-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">Event Coordination — Tamizh Hack Fest 2026</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Managed participant registrations, team check-ins, communication workflows, and venue coordination for Tamizh Hack Fest 2026, facilitating a collaborative environment for student innovators.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-[#0D121F] border border-slate-800 flex flex-col gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">Technical Symposium Lead — CloudSphere</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Coordinated technical events, workshops, and coding challenges for CloudSphere, ensuring smooth operations and engaging participant experiences.
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" aria-labelledby="contact-heading" className="relative isolate overflow-hidden border-b border-slate-800/60 bg-[#0A0E17]/50 py-20 sm:py-24 md:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center">
              <h2 id="contact-heading" className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                Contact Me
              </h2>
              <p className="mt-3 text-lg font-medium text-slate-400 sm:text-xl">
                Tell me about your next project.
              </p>
              <button
                type="button"
                onClick={copyEmailToClipboard}
                className="group mt-6 inline-flex min-w-48 items-center justify-center gap-2.5 rounded-full border-2 border-violet-400 bg-violet-500/10 px-7 py-3.5 text-sm font-bold text-white shadow-[0_0_28px_rgba(139,92,246,0.35),inset_0_0_18px_rgba(139,92,246,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-violet-500/20 hover:shadow-[0_0_38px_rgba(139,92,246,0.5),inset_0_0_20px_rgba(139,92,246,0.18)] active:translate-y-0"
                aria-label={copiedEmail ? 'Email address copied' : 'Copy email address'}
              >
                {copiedEmail ? 'Email copied' : 'Copy email'}
                {copiedEmail ? <Check className="h-4 w-4 text-violet-200" /> : <Copy className="h-4 w-4 transition-transform group-hover:scale-110" />}
              </button>
            </div>

            <div className="mt-20 grid gap-12 text-center sm:mt-24 sm:gap-8 md:grid-cols-2 lg:mt-28 lg:grid-cols-3 lg:gap-16">
              <div>
                <h3 className="text-xl font-bold text-violet-400">Email</h3>
                <a
                  href="mailto:godwinjijo789@gmail.com"
                  className="mt-2 inline-block break-all text-base font-medium text-slate-200 transition-colors hover:text-violet-300 sm:text-lg"
                >
                  godwinjijo789@gmail.com
                </a>

                <h3 className="mt-8 text-xl font-bold text-violet-400">Location</h3>
                <p className="mt-2 text-base font-medium text-slate-300 sm:text-lg">Chennai, Tamil Nadu, India</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-violet-400">Social Media</h3>
                <ul className="mt-2 space-y-1.5">
                  <li>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-lg font-medium text-slate-200 transition-colors hover:text-violet-300"
                    >
                      LinkedIn <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/godwinjijo789"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-lg font-medium text-slate-200 transition-colors hover:text-violet-300"
                    >
                      GitHub <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </li>
                </ul>
              </div>

              <div className="md:col-span-2 md:mx-auto md:w-full md:max-w-lg lg:col-span-1 lg:max-w-none">
                <h3 className="text-xl font-bold text-violet-400">Write Me &amp; We’ll Talk</h3>
                <p className="mx-auto mt-2 max-w-xs text-base leading-7 text-slate-300">
                  Interested in working together? Send me a note and let’s make something useful.
                </p>
                <a
                  href="mailto:godwinjijo789@gmail.com"
                  className="mt-3 inline-flex items-center gap-2 text-lg font-semibold text-slate-200 transition-colors hover:text-violet-300"
                >
                  Get in touch <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#05070B] border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="text-base font-bold text-white">Godwin Jijo R</span>
            <span className="text-xs text-slate-400">AI & Data Science · Mohamed Sathak A.J. College of Engineering, Chennai</span>
          </div>

          {/* Connect Component */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-mono text-cyan-400 tracking-wider">CONNECT WITH ME</span>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/godwinjijo789"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-2 transition-colors"
              >
                <Github className="w-4 h-4 text-cyan-400" />
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-2 transition-colors"
              >
                <Linkedin className="w-4 h-4 text-blue-400" />
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2">
            <div className="text-xs text-slate-500">
              © {new Date().getFullYear()} Godwin Jijo R. All rights reserved.
            </div>

            {showScrollTop && (
              <button
                onClick={() => scrollToSection('home')}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-colors flex items-center gap-2 text-xs font-semibold cursor-pointer"
              >
                <span>Back to Top</span>
                <ArrowUp className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </footer>

      {/* PROJECT DETAIL MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-[#0D121F] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            
            <div className="sticky top-0 z-10 bg-[#0D121F] border-b border-slate-800 p-6 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-bold">PROJECT {selectedProject.number}</span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">{selectedProject.title}</h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800/60 hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
              <div>
                <h4 className="text-xs font-mono text-cyan-400 tracking-wider mb-2">01. OVERVIEW</h4>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">{selectedProject.overview}</p>
              </div>

              <div>
                <h4 className="text-xs font-mono text-cyan-400 tracking-wider mb-2">02. PROBLEM STATEMENT</h4>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">{selectedProject.problemStatement}</p>
              </div>

              <div>
                <h4 className="text-xs font-mono text-cyan-400 tracking-wider mb-2">03. OBJECTIVES</h4>
                <ul className="grid grid-cols-1 gap-2.5 mt-2">
                  {selectedProject.objectivesList.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <ChevronRight className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-xl bg-[#07090E] border border-slate-800">
                  <h4 className="text-xs font-mono text-cyan-400 tracking-wider mb-2">04. MY ROLE</h4>
                  <p className="text-sm text-slate-300">{selectedProject.myRole}</p>
                </div>
                <div className="p-5 rounded-xl bg-[#07090E] border border-slate-800">
                  <h4 className="text-xs font-mono text-cyan-400 tracking-wider mb-2">05. TECHNOLOGY STACK</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedProject.techStack.map(t => (
                      <span key={t} className="px-2.5 py-1 rounded-md bg-slate-800 text-xs text-slate-200 font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono text-cyan-400 tracking-wider mb-2">06. ARCHITECTURE & WORKFLOW</h4>
                <p className="text-slate-300 text-sm leading-relaxed">{selectedProject.architecture}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-xl bg-[#07090E] border border-slate-800">
                  <h4 className="text-xs font-mono text-emerald-400 tracking-wider mb-3">07. FEATURES COMPLETED</h4>
                  <ul className="space-y-2">
                    {selectedProject.featuresCompleted.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-5 rounded-xl bg-[#07090E] border border-slate-800">
                  <h4 className="text-xs font-mono text-amber-400 tracking-wider mb-3">08. FEATURES PLANNED</h4>
                  <ul className="space-y-2">
                    {selectedProject.featuresPlanned.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <ChevronRight className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono text-cyan-400 tracking-wider mb-2">09. CHALLENGES & LEARNINGS</h4>
                <p className="text-slate-300 text-sm leading-relaxed">{selectedProject.challenges}</p>
              </div>

              <div>
                <h4 className="text-xs font-mono text-cyan-400 tracking-wider mb-2">10. FUTURE IMPROVEMENTS</h4>
                <ul className="space-y-2 mt-2">
                  {selectedProject.futureImprovements.map((imp, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <ChevronRight className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{imp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {(selectedProject.githubUrl || selectedProject.liveUrl) && (
                <div className="pt-6 border-t border-slate-800 flex items-center gap-4">
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-2 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      <span>View GitHub Repository</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              )}

            </div>

          </div>
        </div>
      )}

      {/* DATASET PREVIEW MODAL */}
      {datasetViewerOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-[#0D121F] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            
            <div className="sticky top-0 z-10 bg-[#0D121F] border-b border-slate-800 p-6 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-bold">PROJECT 04 DATASET</span>
                <h3 className="text-xl font-extrabold text-white mt-1">Movie Audience Review Dataset (100 Records)</h3>
              </div>
              <button
                onClick={() => setDatasetViewerOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800/60 hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              <p className="text-sm text-slate-300">
                Previewing structured review records with fields: <code className="text-cyan-400 font-mono">review_id</code>, <code className="text-cyan-400 font-mono">audience_name</code>, <code className="text-cyan-400 font-mono">gender</code>, and <code className="text-cyan-400 font-mono">review_text</code>.
              </p>

              <div className="border border-slate-800 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-[#07090E] text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="p-3">ID</th>
                      <th className="p-3">Audience Name</th>
                      <th className="p-3">Gender</th>
                      <th className="p-3">Review Text</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {[
                      { id: 1, name: 'Aarav Sharma', gender: 'Male', text: 'An absolute cinematic masterpiece with brilliant storytelling and stunning visuals.' },
                      { id: 2, name: 'Priya Patel', gender: 'Female', text: 'Engaging plot twists and fantastic lead performances kept me hooked throughout.' },
                      { id: 3, name: 'Rahul Verma', gender: 'Male', text: 'Decent pacing, though the second half felt slightly rushed in resolution.' },
                      { id: 4, name: 'Ananya Iyer', gender: 'Female', text: 'Breathtaking cinematography and phenomenal background score. Highly recommended!' },
                      { id: 5, name: 'Karthik Kumar', gender: 'Male', text: 'A thoughtful exploration of futuristic themes with strong emotional depth.' }
                    ].map(row => (
                      <tr key={row.id} className="hover:bg-slate-800/30">
                        <td className="p-3 text-cyan-400">#{row.id}</td>
                        <td className="p-3 font-semibold text-white">{row.name}</td>
                        <td className="p-3 text-slate-400">{row.gender}</td>
                        <td className="p-3 text-slate-300 font-sans">{row.text}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between items-center pt-4">
                <span className="text-xs text-slate-500 font-mono">Showing sample of 5 / 100 records</span>
                <button
                  onClick={() => {
                    const csvContent = "data:text/csv;charset=utf-8,review_id,audience_name,gender,review_text\n1,Aarav Sharma,Male,An absolute cinematic masterpiece.\n2,Priya Patel,Female,Engaging plot twists and fantastic lead performances.\n3,Rahul Verma,Male,Decent pacing, though the second half felt rushed.";
                    const encodedUri = encodeURI(csvContent);
                    const link = document.createElement("a");
                    link.setAttribute("href", encodedUri);
                    link.setAttribute("download", "movie_audience_reviews_sample.csv");
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download CSV Sample</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* RESUME MODAL */}
      {resumeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-[#0D121F] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            
            <div className="sticky top-0 z-10 bg-[#0D121F] border-b border-slate-800 p-6 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-bold">CURRICULUM VITAE</span>
                <h3 className="text-xl font-extrabold text-white mt-1">Godwin Jijo R — AI & Data Science</h3>
              </div>
              <button
                onClick={() => setResumeModalOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800/60 hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6 flex-1 min-h-0 flex flex-col gap-4">
              <iframe
                src="/Godwin_Jijo_R_Resume.pdf"
                title="Godwin Jijo R resume"
                className="w-full flex-1 min-h-[50vh] rounded-lg border border-slate-700 bg-white"
              />
              <div className="flex justify-end">
                <a
                  href="/Godwin_Jijo_R_Resume.pdf"
                  download="Godwin_Jijo_R_Resume.pdf"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Resume (PDF)</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
