import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col justify-between p-6">
        {/* Header */}
        <header className="glass-panel rounded-full px-6 py-3 flex items-center justify-between max-w-6xl mx-auto w-full">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-extrabold brand-gradient font-['Poppins']">LUMO</span>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1">
              By Charan Teja
            </span>
          </div>

          <nav className="flex items-center gap-6 text-sm font-medium text-white/80">
            <a href="/" className="hover:text-white transition">Home</a>
            <a href="/chat/" className="hover:text-white transition">Chat</a>
            <a href="/login.html" className="px-5 py-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold shadow-lg shadow-purple-500/30 hover:scale-105 transition">
              Get Started
            </a>
          </nav>
        </header>

        {/* Hero Section */}
        <main className="max-w-4xl mx-auto text-center py-20">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-purple-400 font-bold text-sm mb-6">
            ✨ LUMO AI Framework v1.0
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold font-['Poppins'] leading-tight mb-6">
            Learning Unified <span className="brand-gradient">Multimodal Oracle</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8 font-normal">
            Experience high-performance, multi-provider AI inference with zero barriers. Streaming LLMs, multimodal vision, and developer REST APIs — powered by LUMO.
          </p>

          <div className="flex items-center justify-center gap-4">
            <a href="/chat/" className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold text-lg shadow-xl shadow-purple-500/40 hover:scale-105 transition">
              Start Chat
            </a>
            <a href="/login.html" className="px-8 py-4 rounded-full glass-panel text-white font-semibold text-lg hover:bg-white/20 transition">
              Member Login
            </a>
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center text-sm text-white/60 py-6">
          <p>© 2026 LUMO (Learning Unified Multimodal Oracle). All Rights Reserved.</p>
          <p className="text-purple-400 font-semibold mt-1">Designed & Developed by Charan Teja</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
