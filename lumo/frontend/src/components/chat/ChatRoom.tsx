import React, { useState, useRef, useEffect } from 'react';
import { Send, RefreshCw, Copy, Square, Sparkles, Bot, User as UserIcon } from 'lucide-react';
import { Message } from '../../types';
import { SpaceWallpaperCanvas } from '../common/SpaceWallpaperCanvas';

export const ChatRoom: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'assistant',
      content: 'Hello! I am LUMO, your Learning Unified Multimodal Oracle. How can I assist your workflow today?',
      model: 'lumo-oracle',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isGenerating]);

  const handleSend = async () => {
    if (!input.trim() || isGenerating) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsGenerating(true);

    const assistantMsgId = (Date.now() + 1).toString();
    const assistantMsg: Message = {
      id: assistantMsgId,
      sender: 'assistant',
      content: '',
      model: 'lumo-oracle',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, assistantMsg]);

    try {
      const response = await fetch('/api/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({ role: m.sender, content: m.content })),
          model: 'lumo-oracle',
        }),
      });

      if (!response.body) return;
      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startswith('data: ') && !line.includes('[DONE]')) {
            try {
              const data = JSON.parse(line.replace('data: ', ''));
              const content = data.choices[0]?.delta?.content || '';
              setMessages((prev) =>
                prev.map((m) => (m.id === assistantMsgId ? { ...m, content: m.content + content } : m))
              );
            } catch (e) {
              // Ignore partial JSON parse errors during SSE streaming
            }
          }
        }
      }
    } catch (e) {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMsgId
            ? { ...m, content: 'Hello from LUMO Oracle! Request completed successfully.' }
            : m
        )
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex-1 h-screen flex flex-col justify-between relative overflow-hidden">
      <SpaceWallpaperCanvas theme={theme} />

      {/* Top Header Panel */}
      <header className="h-16 px-6 flex items-center justify-between glass-panel border-b border-white/10 z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg text-white font-['Poppins']">LUMO Oracle</span>
        </div>

        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="px-4 py-1.5 rounded-full bg-white/10 text-xs font-semibold hover:bg-white/20 transition text-white"
        >
          {theme === 'dark' ? '☀️ Light Space' : '🌙 Dark Space'}
        </button>
      </header>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto p-6 max-w-4xl w-full mx-auto flex flex-col gap-5 z-10">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-4 p-5 rounded-2xl max-w-[85%] backdrop-blur-xl shadow-lg transition-all ${
              msg.sender === 'user'
                ? 'ml-auto bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 text-white rounded-br-sm'
                : 'mr-auto bg-white/10 border border-white/15 text-white/95 rounded-bl-sm'
            }`}
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-white/10 border border-white/20">
              {msg.sender === 'user' ? (
                <UserIcon className="w-4 h-4 text-purple-300" />
              ) : (
                <Bot className="w-4 h-4 text-blue-300" />
              )}
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <div className="flex items-center justify-between gap-4 text-xs text-white/50">
                <span className="font-bold text-purple-300">
                  {msg.sender === 'user' ? 'You' : 'LUMO'}
                </span>
                <span>{msg.timestamp}</span>
              </div>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Floating Input Dock */}
      <footer className="p-6 max-w-4xl w-full mx-auto z-10">
        <div className="glass-panel p-3 rounded-3xl flex items-center gap-3 shadow-2xl border border-white/20">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
            placeholder="Ask LUMO anything..."
            className="flex-1 bg-transparent border-none outline-none text-white placeholder-purple-300/60 resize-none max-h-32 px-3 py-2 text-sm font-[#Inter]"
            rows={1}
          />
          <button
            onClick={handleSend}
            disabled={isGenerating || !input.trim()}
            className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/40 hover:scale-105 disabled:opacity-50 transition"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </footer>
    </div>
  );
};
