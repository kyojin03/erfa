import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { api, getToken, setToken } from './api';
import type { SessionUser } from './types';

interface AuthContextValue { user: SessionUser | null; loading: boolean; error: string; acceptGoogleCredential: (token: string) => Promise<void>; signOut: () => void }
const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(Boolean(getToken()));
  const [error, setError] = useState('');

  const loadSession = useCallback(async () => {
    setLoading(true); setError('');
    try { setUser((await api<{ user: SessionUser }>('session')).user); }
    catch (caught) { setToken(''); setUser(null); setError(caught instanceof Error ? caught.message : 'Sign-in failed.'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { if (getToken()) void loadSession(); }, [loadSession]);
  const acceptGoogleCredential = useCallback(async (token: string) => { setToken(token); await loadSession(); }, [loadSession]);
  const signOut = useCallback(() => { setToken(''); setUser(null); setError(''); }, []);
  const value = useMemo(() => ({ user, loading, error, acceptGoogleCredential, signOut }), [user, loading, error, acceptGoogleCredential, signOut]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuth must be used inside AuthProvider.');
  return value;
}

