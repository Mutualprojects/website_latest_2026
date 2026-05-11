import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Member, User } from '@/types';

interface TeamState {
  // UI State
  dragMode: boolean;
  setDragMode: (mode: boolean) => void;
  
  // Modal State
  isModalOpen: boolean;
  editingMember: Member | null;
  openModal: (member?: Member) => void;
  closeModal: () => void;
  
  // Sync State
  syncing: boolean;
  setSyncing: (syncing: boolean) => void;
  syncProgress: { current: number; total: number } | null;
  setSyncProgress: (progress: { current: number; total: number } | null) => void;
  
  // Auth State
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  
  // Undo/Redo State
  history: Member[][];
  historyIndex: number;
  pushHistory: (state: Member[]) => void;
  undo: () => Member[] | null;
  redo: () => Member[] | null;
  clearHistory: () => void;
}

export const useTeamStore = create<TeamState>()(
  persist(
    (set, get) => ({
      // UI
      dragMode: false,
      setDragMode: (mode) => set({ dragMode: mode }),
      
      // Modal
      isModalOpen: false,
      editingMember: null,
      openModal: (member) => set({ isModalOpen: true, editingMember: member || null }),
      closeModal: () => set({ isModalOpen: false, editingMember: null }),
      
      // Sync
      syncing: false,
      setSyncing: (syncing) => set({ syncing }),
      syncProgress: null,
      setSyncProgress: (progress) => set({ syncProgress: progress }),
      
      // Auth
      user: null,
      setUser: (user) => set({ user }),
      logout: () => {
        localStorage.removeItem('hr_token');
        set({ user: null });
      },
      
      // Undo/Redo
      history: [],
      historyIndex: -1,
      pushHistory: (state) => set((prev) => {
        // Only push if different from last state
        const currentState = prev.history[prev.historyIndex];
        if (currentState && JSON.stringify(currentState) === JSON.stringify(state)) {
          return prev;
        }

        const newHistory = prev.history.slice(0, prev.historyIndex + 1);
        newHistory.push(JSON.parse(JSON.stringify(state))); // Deep copy
        const limitedHistory = newHistory.slice(-20); // Limit to 20 steps
        return {
          history: limitedHistory,
          historyIndex: limitedHistory.length - 1,
        };
      }),
      undo: () => {
        const state = get();
        if (state.historyIndex <= 0) return null;
        const newIndex = state.historyIndex - 1;
        set({ historyIndex: newIndex });
        return JSON.parse(JSON.stringify(state.history[newIndex]));
      },
      redo: () => {
        const state = get();
        if (state.historyIndex >= state.history.length - 1) return null;
        const newIndex = state.historyIndex + 1;
        set({ historyIndex: newIndex });
        return JSON.parse(JSON.stringify(state.history[newIndex]));
      },
      clearHistory: () => set({ history: [], historyIndex: -1 }),
    }),
    {
      name: 'team-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        dragMode: state.dragMode,
        user: state.user,
      }),
    }
  )
);
