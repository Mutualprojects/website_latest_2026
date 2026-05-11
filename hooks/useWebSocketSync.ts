import { useEffect, useRef } from 'react';
import { useTeamStore } from '@/store/useTeamStore';
import { wsService } from '@/lib/websocket';
import { SyncEvent, Member } from '@/types';
import { mutate } from 'swr';
import { API_URL } from '@/lib/api';

export const useWebSocketSync = (localMembers: Member[]) => {
  const { user } = useTeamStore();
  const membersRef = useRef(localMembers);

  useEffect(() => {
    membersRef.current = localMembers;
  }, [localMembers]);

  useEffect(() => {
    if (!user?.id) return;

    wsService.connect(user.id);

    const unsubscribe = wsService.subscribe((event: SyncEvent) => {
      console.log('📡 Received WebSocket Event:', event.type);
      
      switch (event.type) {
        case 'member.created':
        case 'member.reordered':
          mutate(API_URL);
          break;
          
        case 'member.updated':
          mutate(API_URL, (old: Member[] = []) => 
            old.map(m => m.id === event.data.id ? { ...m, ...event.data } as Member : m),
            false
          );
          break;
          
        case 'member.deleted':
          mutate(API_URL, (old: Member[] = []) => 
            old.filter(m => m.id !== event.data.id),
            false
          );
          break;
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user?.id]);

  const broadcast = (event: SyncEvent) => {
    if (user?.id) {
      wsService.send(event);
    }
  };

  return { broadcast };
};
