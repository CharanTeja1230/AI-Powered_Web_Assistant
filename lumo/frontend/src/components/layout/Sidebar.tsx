import React, { useState } from 'react';
import { 
  MessageSquarePlus, 
  Lock, 
  Settings, 
  User as UserIcon, 
  PanelLeftClose, 
  PanelLeftOpen, 
  Sparkles,
  LogOut
} from 'lucide-react';
import { User } from '../../types';

interface SidebarProps {
  user?: User | null;
  onNewChat?: () => void;
  onLogout?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ user, onNewChat, onLogout }) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <aside
      className={`h-screen transition-all duration-300 z-50 flex flex-col justify-between p-4 glass-panel border-r border-white/10 ${
        collapsed ? 'w-[72px]' : 'w-[290px]'
      }`}
    >
      {/* Top Section */}
      <div className="flex flex-col gap-6 items-center w-full">
        {/* Header & Logo */}
        <div className="flex items-center justify-between w-full px-1">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/30 flex-shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            {!collapsed && (
              <span className="font-extrabold text-xl brand-gradient font-['Poppins'] tracking-wide">
                LUMO
              </span>
            )}
          </div>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-purple-500/30 hover:scale-105 transition flex items-center justify-center text-white"
            title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {collapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
          </button>
        </div>

        {/* Action Buttons */}
        <nav className="flex flex-col gap-3 w-full items-center">
          <button
            onClick={onNewChat}
            className={`flex items-center gap-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold transition-all shadow-md shadow-purple-500/30 hover:scale-105 hover:shadow-purple-500/50 ${
              collapsed ? 'w-11 h-11 justify-center' : 'w-full px-4 py-3'
            }`}
            title="New Conversation"
          >
            <MessageSquarePlus className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>New Conversation</span>}
          </button>

          <button
            className={`flex items-center gap-3 rounded-full bg-white/5 hover:bg-purple-500/20 text-white/80 hover:text-white transition-all border border-white/10 ${
              collapsed ? 'w-11 h-11 justify-center' : 'w-full px-4 py-3'
            }`}
            title="Private Conversation"
          >
            <Lock className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>Private Mode</span>}
          </button>
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col gap-3 w-full items-center">
        <button
          className={`flex items-center gap-3 rounded-full bg-white/5 hover:bg-purple-500/20 text-white/80 hover:text-white transition-all border border-white/10 ${
            collapsed ? 'w-11 h-11 justify-center' : 'w-full px-4 py-3'
          }`}
          title="Settings"
        >
          <Settings className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>Settings</span>}
        </button>

        {/* User Profile Avatar */}
        <div
          className={`flex items-center gap-3 rounded-full bg-white/10 border border-white/20 p-2 ${
            collapsed ? 'w-11 h-11 justify-center' : 'w-full px-3 py-2 justify-between'
          }`}
          title={user ? `${user.username} (${user.role})` : 'Guest User'}
        >
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="w-7 h-7 rounded-full bg-purple-500/40 border border-purple-400/50 flex items-center justify-center flex-shrink-0">
              <UserIcon className="w-4 h-4 text-purple-200" />
            </div>
            {!collapsed && (
              <span className="text-xs font-semibold text-white/90 truncate">
                {user ? user.username : 'Guest User'}
              </span>
            )}
          </div>

          {!collapsed && onLogout && (
            <button
              onClick={onLogout}
              className="text-white/60 hover:text-red-400 transition"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
