import React from 'react';
import { ShieldCheck, Activity, Users, Database, LogOut } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen p-8 max-w-6xl mx-auto flex flex-col gap-8">
      {/* Header */}
      <header className="glass-panel p-6 rounded-3xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-500/30 border border-purple-400 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-purple-300" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">LUMO Admin Control Center</h1>
            <p className="text-xs text-purple-300">Logged in as admin@lumo.ai (Super Admin)</p>
          </div>
        </div>

        <a href="/login.html" className="px-4 py-2 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 text-sm font-bold flex items-center gap-2 hover:bg-red-500/40 transition">
          <LogOut className="w-4 h-4" /> Logout
        </a>
      </header>

      {/* Real-Time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-3xl flex items-center gap-4">
          <Activity className="w-8 h-8 text-cyan-400" />
          <div>
            <div className="text-2xl font-extrabold text-white">99.98%</div>
            <div className="text-xs text-white/60">System Health & Uptime</div>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl flex items-center gap-4">
          <Users className="w-8 h-8 text-purple-400" />
          <div>
            <div className="text-2xl font-extrabold text-white">1,420</div>
            <div className="text-xs text-white/60">Active Platform Users</div>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl flex items-center gap-4">
          <Database className="w-8 h-8 text-blue-400" />
          <div>
            <div className="text-2xl font-extrabold text-white">4 AI Engine Pipelines</div>
            <div className="text-xs text-white/60">Active Load Balancers</div>
          </div>
        </div>
      </div>
    </div>
  );
};
