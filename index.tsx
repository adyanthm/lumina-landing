import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Sun, Moon, Download,
  WifiOff, ShieldCheck, Zap,
  Monitor, Film, SlidersHorizontal,
  CheckCircle2, ChevronDown,
  Layers, Lock, ExternalLink, Globe, HardDrive,
  X, Check, PlayCircle
} from 'lucide-react';

// --- Typewriter Component (Cyclic) ---
const Typewriter = ({ texts, delay = 50, pause = 1500, className = "" }: { texts: string[], delay?: number, pause?: number, className?: string }) => {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (index >= texts.length) {
      setIndex(0);
      return;
    }

    if (subIndex === texts[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), pause);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % texts.length);
      return;
    }

    const timeout = setTimeout(() => {
      setText(texts[index].substring(0, subIndex));
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? delay / 2 : delay);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, texts, delay, pause]);

  return (
    <span className={`${className} font-mono inline-block min-h-[1.5em]`}>
      {text}
      <span className="animate-cursor inline-block w-2 h-5 md:h-8 bg-cyan-400 ml-1 align-middle"></span>
    </span>
  );
};

// --- Privacy Modal Component ---
const PrivacyModal = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
    <div className="bg-black border border-zinc-800 w-full max-w-2xl max-h-[80vh] overflow-y-auto relative shadow-[0_0_30px_rgba(34,211,238,0.1)] animate-in fade-in zoom-in duration-200">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-zinc-500 hover:text-cyan-400 transition-colors z-10 bg-black/50 p-1 rounded-full"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="p-8 md:p-12">
        <h2 className="text-3xl font-bold text-white mb-8 tracking-tight border-b border-zinc-900 pb-4">PRIVACY POLICY</h2>

        <div className="space-y-8 text-zinc-400 leading-relaxed font-light text-sm md:text-base">
          <section>
            <h3 className="text-cyan-400 font-bold text-sm uppercase tracking-widest mb-3">1. Zero Data Collection</h3>
            <p>LuminaGrade is architected with a strict "Zero-Knowledge" philosophy. We do not collect, store, transmit, or analyze any personal data, usage metrics, IP addresses, or media files. There is no backend server logging your activity.</p>
          </section>

          <section>
            <h3 className="text-cyan-400 font-bold text-sm uppercase tracking-widest mb-3">2. Local Processing Only</h3>
            <p>All color grading, rendering, and media manipulation occurs exclusively on your local hardware (GPU/CPU). Your images and videos never leave your device. The mathematical algorithms run entirely client-side.</p>
          </section>

          <section>
            <h3 className="text-cyan-400 font-bold text-sm uppercase tracking-widest mb-3">3. Offline Functionality</h3>
            <p>The native desktop application functions completely offline. No internet connection is required for operation, ensuring an air-gapped safe environment for sensitive footage. The web app requires internet only to load the initial interface assets.</p>
          </section>

          <section>
            <h3 className="text-cyan-400 font-bold text-sm uppercase tracking-widest mb-3">4. No Third-Party Trackers</h3>
            <p>Since we collect no data, we share no data. There are no third-party analytics trackers, cookies, or advertising SDKs embedded in our software.</p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-900">
          <button
            onClick={onClose}
            className="w-full py-4 bg-zinc-900 text-zinc-300 font-bold uppercase tracking-wider hover:bg-zinc-800 hover:text-white transition-colors border border-zinc-800 hover:border-zinc-700"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  </div>
);

const Navbar = ({ darkMode, toggleTheme }: { darkMode: boolean, toggleTheme: () => void }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-900 bg-black/90 backdrop-blur-sm">
    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-cyan-500/10 border border-cyan-500/50 flex items-center justify-center rounded-sm">
          <Film className="w-4 h-4 text-cyan-400" />
        </div>
        <span className="font-bold text-lg tracking-tight text-white">LuminaGrade</span>
      </div>

      <div className="flex items-center gap-8">
        <div className="hidden md:flex gap-8 text-sm font-medium text-zinc-500">
          <a href="#comparison" className="hover:text-cyan-400 transition-colors">Compare</a>
          <a href="#features" className="hover:text-cyan-400 transition-colors">Features</a>
          <a href="#faq" className="hover:text-cyan-400 transition-colors">FAQ</a>
        </div>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-none border border-cyan-900/50 bg-cyan-950/10 text-xs font-mono text-cyan-400 mb-8">
      <span className="w-2 h-2 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]"></span>
      <span>V1.0 BETA NOW AVAILABLE</span>
    </div>

    <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 text-white max-w-6xl leading-none">
      CINEMATIC COLOR<br />
      <span className="text-zinc-800">GRADING</span>
    </h1>

    <div className="h-16 md:h-20 mb-6 flex items-center justify-center w-full">
      <Typewriter
        texts={[
          "SUPPORTS 4K VIDEO + IMAGES",
          "ALGORITHM DRIVEN & 100% OFFLINE",
          "FREE. AD-FREE. NO SIGNUPS."
        ]}
        className="text-lg md:text-2xl text-cyan-400 tracking-widest font-bold"
        delay={40}
        pause={2000}
      />
    </div>

    <p className="text-zinc-500 max-w-2xl mb-12 text-sm md:text-lg leading-relaxed">
      Professional grade color density for <span className="text-zinc-200 font-bold">Video & Images</span>. Unlike other tools, we process full video sequences with mathematical precision.
    </p>

    <div className="flex flex-col md:flex-row gap-6 w-full md:w-auto items-center justify-center">
      <a href="https://github.com/adyanthm/lumina-landing/releases/download/production/Lumina.Grade.Setup.0.0.0.exe" download className="group relative flex items-center justify-center gap-3 border border-cyan-500 text-cyan-400 px-8 py-4 text-sm font-bold uppercase tracking-wider overflow-hidden min-w-[240px] hover:text-black transition-colors duration-300">
        <div className="absolute inset-0 bg-cyan-400 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 origin-left ease-out"></div>
        <div className="relative z-10 flex items-center gap-3">
          <Download className="w-5 h-5" />
          <span>Download Beta</span>
        </div>
      </a>

      <a
        href="https://luminagrade.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center gap-3 bg-transparent text-zinc-400 border border-zinc-800 px-8 py-4 text-sm font-bold uppercase tracking-wider hover:border-zinc-200 hover:text-white transition-all min-w-[240px]"
      >
        <Globe className="w-5 h-5" />
        <span>Open Web App</span>
      </a>
    </div>
    <p className="mt-6 text-xs text-zinc-600 font-mono flex items-center gap-2">
      <HardDrive className="w-3 h-3" /> Native app currently available for Windows
    </p>
  </section>
);

const ComparisonSection = () => (
  <section id="comparison" className="py-24 border-y border-zinc-900 bg-zinc-950/30">
    <div className="max-w-5xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-2xl font-bold text-white mb-4">PLATFORM COMPARISON</h2>
        <p className="text-zinc-500">Choose the workflow that fits your needs.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Web App Card */}
        <div className="border border-zinc-800 bg-black/50 p-8 flex flex-col">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-zinc-900 rounded-sm">
              <Globe className="w-6 h-6 text-zinc-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-zinc-200">Web Application</h3>
              <p className="text-xs text-zinc-500 font-mono mt-1">BROWSER BASED</p>
            </div>
          </div>

          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex items-start gap-3 text-sm text-zinc-400">
              <Check className="w-4 h-4 text-zinc-600 mt-0.5" />
              <span>Zero installation required</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-zinc-400">
              <WifiOff className="w-4 h-4 text-orange-500 mt-0.5" />
              <span>Requires internet to load page (Processing is local)</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-zinc-400">
              <Monitor className="w-4 h-4 text-orange-500 mt-0.5" />
              <span>Slower export rendering time</span>
            </li>
          </ul>

          <a href="https://luminagrade.vercel.app" target="_blank" className="w-full py-3 text-center border border-zinc-800 text-zinc-400 text-sm font-medium hover:text-white hover:border-zinc-600 transition-colors">
            LAUNCH WEB APP
          </a>
        </div>

        {/* Native App Card */}
        <div className="relative border border-cyan-500/30 bg-cyan-950/5 p-8 flex flex-col">
          <div className="absolute top-0 right-0 bg-cyan-400 text-black text-xs font-bold px-3 py-1">
            RECOMMENDED
          </div>
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-cyan-900/20 rounded-sm">
              <HardDrive className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Native Desktop</h3>
              <p className="text-xs text-cyan-500 font-mono mt-1">WINDOWS (BETA)</p>
            </div>
          </div>

          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex items-start gap-3 text-sm text-white">
              <Check className="w-4 h-4 text-cyan-400 mt-0.5" />
              <span>Fully Offline Capable</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-white">
              <Zap className="w-4 h-4 text-cyan-400 mt-0.5" />
              <span className="font-bold text-cyan-400">10x - 50x Faster Export Speed</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-white">
              <Check className="w-4 h-4 text-cyan-400 mt-0.5" />
              <span>System-level hardware acceleration</span>
            </li>
          </ul>

          <a href="https://github.com/adyanthm/lumina-landing/releases/download/production/Lumina.Grade.Setup.0.0.0.exe" download className="w-full py-3 text-center block bg-cyan-400 text-black text-sm font-bold hover:bg-cyan-300 transition-colors">
            DOWNLOAD BETA
          </a>
        </div>
      </div>
    </div>
  </section>
);

const DemoPlaceholder = ({ label, src, className = "" }: { label: string, src?: string, className?: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!src) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsPlaying(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [src]);

  const isVideo = src?.endsWith('.mp4');

  return (
    <div
      ref={containerRef}
      className={`w-full bg-zinc-900 border border-zinc-800 flex items-center justify-center relative overflow-hidden group ${className}`}
    >
      {src && isPlaying ? (
        isVideo ? (
          <video
            src={src}
            className="absolute inset-0 w-full h-full object-contain"
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <img
            src={src}
            alt={label}
            className="absolute inset-0 w-full h-full object-contain"
          />
        )
      ) : (
        <>
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <p className="text-zinc-600 font-mono text-sm uppercase tracking-widest flex items-center gap-3">
              <Film className="w-4 h-4" />
              {label}
            </p>
          </div>

          {/* Grid Background */}
          <div className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ backgroundImage: 'linear-gradient(#22d3ee 1px, transparent 1px), linear-gradient(90deg, #22d3ee 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
          </div>
        </>
      )}

      {/* Corners */}
      <div className="absolute top-0 left-0 w-4 h-4 border-l border-t border-cyan-500/50 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-4 h-4 border-r border-t border-cyan-500/50 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 border-l border-b border-cyan-500/50 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-r border-b border-cyan-500/50 pointer-events-none"></div>
    </div>
  );
};

const ValueProps = () => (
  <section className="py-24 bg-black border-y border-zinc-900">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="text-2xl text-white font-bold uppercase tracking-wider">Core Philosophy</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { icon: <ShieldCheck className="w-10 h-10" />, title: "COMPLETELY FREE", desc: "No paywalls. No hidden fees. Just create." },
          { icon: <Lock className="w-10 h-10" />, title: "NO ADS", desc: "Focus on your art. Zero distractions or popups." },
          { icon: <WifiOff className="w-10 h-10" />, title: "100% OFFLINE", desc: "Air-gapped ready. Your data stays on your machine." },
          { icon: <Zap className="w-10 h-10" />, title: "NO SIGNUP", desc: "Download and start grading. No accounts needed." },
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center text-center gap-6 p-10 border-2 border-zinc-800 bg-zinc-950/50 hover:border-cyan-500 hover:shadow-[0_0_20px_rgba(34,211,238,0.1)] transition-all duration-300 group rounded-none">
            <div className="text-zinc-500 group-hover:text-cyan-400 transition-colors transform group-hover:scale-110 duration-300">
              {item.icon}
            </div>
            <div>
              <h3 className="text-xl font-bold text-white tracking-wider mb-2">{item.title}</h3>
              <p className="text-sm text-zinc-400 font-medium leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Features = () => (
  <section id="features" className="py-32 max-w-7xl mx-auto px-6 space-y-32">
    {/* Feature 1 */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div className="space-y-8">
        <div className="text-cyan-400 font-mono text-xs uppercase tracking-widest border-l-2 border-cyan-400 pl-4">
          Precision Engine
        </div>
        <h2 className="text-4xl font-bold text-white leading-tight">
          CINEMATIC<br />FIDELITY
        </h2>
        <p className="text-zinc-400 leading-relaxed">
          Unlock the true potential of your footage. Our proprietary algorithm ensures color accuracy and filmic density without the artifacts common in AI-upscaled workflows.
        </p>
        <ul className="space-y-4 pt-4 font-mono text-sm">
          {['4K Video & Image Support', 'Mathematically Tuned Algorithms', 'Non-Destructive Editing', 'Professional LUT Support'].map((item, i) => (
            <li key={i} className="flex items-center gap-3 text-zinc-300">
              <div className="w-1.5 h-1.5 bg-cyan-400"></div>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <DemoPlaceholder label="Cinematic Grading Demo" src="/pure_quality.mp4" className="aspect-[4/3] shadow-[0_0_30px_rgba(34,211,238,0.1)]" />
    </div>

    {/* Feature 2 */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div className="order-2 lg:order-1">
        <DemoPlaceholder label="Interface Workflow" src="/radical_simplicity.mp4" className="aspect-[4/3] shadow-[0_0_30px_rgba(34,211,238,0.1)]" />
      </div>
      <div className="space-y-8 order-1 lg:order-2">
        <div className="text-cyan-400 font-mono text-xs uppercase tracking-widest border-l-2 border-cyan-400 pl-4">
          Streamlined UI
        </div>
        <h2 className="text-4xl font-bold text-white leading-tight">
          RADICAL<br />SIMPLICITY
        </h2>
        <p className="text-zinc-400 leading-relaxed">
          Professional tools shouldn't require a manual. We've stripped away the clutter to focus on what matters: your image.
        </p>
        <ul className="space-y-4 pt-4 font-mono text-sm">
          {['Zero-Latency Preview', 'Intuitive Parameter Controls', 'Minimalist Dashboard'].map((item, i) => (
            <li key={i} className="flex items-center gap-3 text-zinc-300">
              <div className="w-1.5 h-1.5 bg-cyan-400"></div>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-zinc-900 bg-zinc-950/20 mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 flex items-center justify-between text-left hover:bg-zinc-900/50 transition-colors focus:outline-none"
      >
        <span className="text-sm font-bold text-zinc-300 pr-8 uppercase tracking-wide">{question}</span>
        <ChevronDown className={`w-4 h-4 text-cyan-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="p-6 pt-0 text-sm text-zinc-500 leading-relaxed border-t border-zinc-900/50 mt-2">
          {answer}
        </p>
      </div>
    </div>
  );
};

const FAQ = () => (
  <section id="faq" className="py-24 max-w-3xl mx-auto px-6">
    <h2 className="text-2xl font-bold text-white mb-12 text-center uppercase tracking-widest">System FAQ</h2>
    <div className="space-y-2">
      <FAQItem
        question="Is my data sent to third parties?"
        answer="No. LuminaGrade is engineered with privacy as a priority. All processing is performed locally on your device. Your footage and data never leave your computer."
      />
      <FAQItem
        question="What do you mean by 'fully offline'?"
        answer="We utilize advanced local algorithms for color grading instead of relying on cloud-based AI. This ensures that the application runs independently of an internet connection."
      />
      <FAQItem
        question="Does it work without an internet connection?"
        answer="Yes, the desktop application is fully self-contained. You can download it once and use it anywhere."
      />
      <FAQItem
        question="Why can exporting take time on the Web App?"
        answer="The Web App relies on browser resources. For high-speed rendering, we recommend the Native Desktop App which utilizes 100% of your system's hardware acceleration."
      />
    </div>
  </section>
);

const Footer = ({ onOpenPrivacy }: { onOpenPrivacy: () => void }) => (
  <footer className="py-12 border-t border-zinc-900 bg-black">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex items-center gap-2">
        <Film className="w-5 h-5 text-zinc-600" />
        <span className="font-bold text-zinc-500">LuminaGrade</span>
      </div>
      <div className="flex gap-8 text-xs font-mono text-zinc-600">
        <button onClick={onOpenPrivacy} className="hover:text-cyan-400 transition-colors uppercase">PRIVACY POLICY</button>
      </div>
    </div>
  </footer>
);

const App = () => {
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <div className="min-h-screen bg-black transition-colors duration-300">
      <Navbar darkMode={true} toggleTheme={() => { }} />

      {showPrivacy && <PrivacyModal onClose={() => setShowPrivacy(false)} />}

      <main>
        <Hero />

        {/* Main GIF Placeholder */}
        <div className="max-w-6xl mx-auto px-6 mb-20">
          <DemoPlaceholder label="MAIN WORKFLOW VISUALIZATION" src="/main_working.mp4" className="aspect-video w-full border-zinc-800 shadow-[0_0_50px_rgba(34,211,238,0.05)]" />
        </div>

        <ValueProps />
        <ComparisonSection />
        <Features />
        <FAQ />
      </main>

      <Footer onOpenPrivacy={() => setShowPrivacy(true)} />
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);