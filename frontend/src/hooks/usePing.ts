import { useState, useEffect } from 'react';

interface PingResponse {
  message: string;
  timestamp: string;
}

export const usePing = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastPing, setLastPing] = useState<string | null>(null);

  const pingServer = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/ping`);
      const data: PingResponse = await response.json();
      
      setIsConnected(true);
      setLastPing(data.timestamp);
      setError(null);
    } catch (err) {
      setIsConnected(false);
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    pingServer();
    // Set up periodic ping every 30 seconds
    const interval = setInterval(pingServer, 30000);
    return () => clearInterval(interval);
  }, []);

  return { isConnected, loading, error, lastPing };
}; 