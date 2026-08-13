export interface User {
  id: string;
  email: string;
  username: string;
  role: 'admin' | 'user' | 'guest';
}

export interface Message {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  content: string;
  model?: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  updatedAt: string;
}

export interface AIModel {
  id: string;
  name: string;
  provider: string;
  badge?: string;
}

export type ThemeMode = 'dark' | 'light';
