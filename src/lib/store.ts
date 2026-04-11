import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  text: string;
  createdAt: number;
}

export interface HistoryItem {
  id: string;
  toolId: string;
  input: string;
  output: string;
  createdAt: number;
}

interface AppState {
  user: User | null;
  comments: Comment[];
  history: HistoryItem[];
  login: (name: string, email: string) => void;
  signup: (name: string, email: string) => void;
  logout: () => void;
  updateAvatar: (avatarUrl: string) => void;
  addComment: (text: string) => void;
  addHistory: (toolId: string, input: string, output: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      comments: [
        {
          id: '1',
          userId: 'system',
          userName: 'Sarah (Creator)',
          userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
          text: 'This platform is a lifesaver! The viral hook generator completely changed my TikTok strategy.',
          createdAt: Date.now() - 86400000,
        },
        {
          id: '2',
          userId: 'system2',
          userName: 'MikeTech',
          userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
          text: 'The SEO title generator is insanely good. Finally hitting the algorithm right.',
          createdAt: Date.now() - 3600000,
        }
      ],
      history: [],
      
      login: (name, email) => {
        const newUser = {
          id: Math.random().toString(36).substring(7),
          name,
          email,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
        };
        set({ user: newUser });
      },

      signup: (name, email) => {
        const newUser = {
          id: Math.random().toString(36).substring(7),
          name,
          email,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
        };
        set({ user: newUser });
      },
      
      logout: () => set({ user: null }),

      updateAvatar: (avatarUrl) => {
        set((state) => {
          if (!state.user) return state;
          return {
            user: { ...state.user, avatar: avatarUrl }
          };
        });
      },
      
      addComment: (text) => {
        const { user } = get();
        if (!user) return;
        
        const newComment: Comment = {
          id: Math.random().toString(36).substring(7),
          userId: user.id,
          userName: user.name,
          userAvatar: user.avatar,
          text,
          createdAt: Date.now(),
        };
        
        set((state) => ({ comments: [newComment, ...state.comments] }));
      },
      
      addHistory: (toolId, input, output) => {
        const { user } = get();
        if (!user) return; // Only save history if logged in
        
        const newItem: HistoryItem = {
          id: Math.random().toString(36).substring(7),
          toolId,
          input,
          output,
          createdAt: Date.now(),
        };
        
        set((state) => ({ history: [newItem, ...state.history] }));
      }
    }),
    {
      name: 'creator-tools-storage',
    }
  )
);
