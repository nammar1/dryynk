import { usePing } from '../../hooks/usePing';

export const ConnectionStatus = () => {
  const { isConnected, loading, error, lastPing } = usePing();

  if (loading) {
    return <div className="text-white/70">Checking connection...</div>;
  }

  if (error) {
    return <div className="text-red-400">{error}</div>;
  }

  return (
    <div className={`flex items-center gap-2 ${isConnected ? 'text-emerald-400' : 'text-red-400'} text-sm`}>
      <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-400' : 'bg-red-400'}`} />
      <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
      {lastPing && <span className="text-white/50">Last ping: {new Date(lastPing).toLocaleTimeString()}</span>}
    </div>
  );
}; 