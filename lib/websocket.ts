import { SyncEvent } from '@/types';

class WebSocketService {
  private static instance: WebSocketService;
  private socket: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private listeners: ((event: SyncEvent) => void)[] = [];
  private userId: string | null = null;

  private constructor() {}

  static getInstance(): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  connect(userId: string) {
    this.userId = userId;
    if (this.socket?.readyState === WebSocket.OPEN) return;

    // Only connect if a WebSocket URL is explicitly provided
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL;
    if (!wsUrl) return;
    
    this.socket = new WebSocket(wsUrl);

    this.socket.onopen = () => {
      this.reconnectAttempts = 0;
    };

    this.socket.onmessage = (event) => {
      try {
        const syncEvent: SyncEvent = JSON.parse(event.data);
        this.listeners.forEach(listener => listener(syncEvent));
      } catch (err) {
        // Silently ignore malformed messages
      }
    };

    this.socket.onclose = () => {
      if (this.userId) {
        this.attemptReconnect(this.userId);
      }
    };

    this.socket.onerror = () => {
      // Quiet error logging to avoid UI clutter
    };
  }

  private attemptReconnect(userId: string) {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) return;
    
    this.reconnectAttempts++;
    const delay = Math.min(1000 * 2 ** this.reconnectAttempts, 10000);
    
    
    setTimeout(() => this.connect(userId), delay);
  }

  subscribe(listener: (event: SyncEvent) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  send(event: SyncEvent) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(event));
    } else {
      console.warn('⚠️ WebSocket not connected, message not sent');
    }
  }

  disconnect() {
    this.userId = null;
    this.socket?.close();
    this.socket = null;
  }
}

export const wsService = WebSocketService.getInstance();
