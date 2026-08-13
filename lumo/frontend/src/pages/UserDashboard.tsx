import React from 'react';
import { User as UserIcon, MessageSquare, Zap, LogOut } from 'lucide-react';

export const UserDashboard: React.FC = () => {
  return (
    <div className="min-h-screen p-8 max-w-6xl mx-auto flex flex-col gap-8">
      {/* Header */}
      <header className="glass-panel p-6 rounded-3xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-500/30 border border-blue-400 flex items-center justify-center">
            <UserIcon className="w-6 h-6 text-blue-300" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">LUMO User Portal</h1>
            <p className="text-xs text-blue-300">Logged in as user1@lumo.ai (Standard Plan)</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a href="/chat/" className="px-5 py-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-bold shadow-lg shadow-purple-500/30 hover:scale-105 transition">
            Go to Chat
          </a>
          <a href="/login.html" className="px-4 py-2 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 text-sm font-bold flex items-center gap-2 hover:bg-red-500/40 transition">
            <LogOut className="w-4 h-4" /> Logout
          </a>
        </div>
      </header>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-3xl flex items-center gap-4">
          <MessageSquare className="w-8 h-8 text-purple-400" />
          <div>
            <div className="text-2xl font-extrabold text-white">48 Conversations</div>
            <div className="text-xs text-white/60">Saved AI Sessions</div>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl flex items-center gap-4">
          <Zap className="w-8 h-8 text-cyan-400" />
          <div>
            <div className="text-2xl font-extrabold text-white">Unlimited Tokens</div>
            <div className="text-xs text-white/60">LUMO Oracle Tier</div>
          </div>
        </div>
      </div>
    </div>
  );
};
