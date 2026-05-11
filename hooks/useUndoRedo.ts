import { useCallback, useEffect } from 'react';
import { useTeamStore } from '@/store/useTeamStore';
import { Member } from '@/types';
import { mutate } from 'swr';
import { API_URL } from '@/lib/api';

export const useUndoRedo = () => {
  const { 
    pushHistory, 
    undo: storeUndo, 
    redo: storeRedo, 
    historyIndex,
    history 
  } = useTeamStore();

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  // Record state to history
  const record = useCallback((members: Member[]) => {
    pushHistory(members);
  }, [pushHistory]);

  // Undo action
  const undo = useCallback(() => {
    const previousState = storeUndo();
    if (previousState) {
      mutate(API_URL, previousState, false);
      return true;
    }
    return false;
  }, [storeUndo]);

  // Redo action
  const redo = useCallback(() => {
    const nextState = storeRedo();
    if (nextState) {
      mutate(API_URL, nextState, false);
      return true;
    }
    return false;
  }, [storeRedo]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isZ = e.key.toLowerCase() === 'z';
      const isY = e.key.toLowerCase() === 'y';
      const modKey = e.ctrlKey || e.metaKey;

      if (modKey && isZ && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if (modKey && (isY || (e.shiftKey && isZ))) {
        e.preventDefault();
        redo();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [undo, redo]);

  return {
    record,
    undo,
    redo,
    canUndo,
    canRedo,
  };
};
