const API_URL = import.meta.env.VITE_API_URL as string | undefined;
const TOKEN_KEY = 'erfa_google_id_token';

export class ApiError extends Error {
  constructor(public code: string, message: string) { super(message); }
}

export function getToken(): string { return sessionStorage.getItem(TOKEN_KEY) ?? ''; }
export function setToken(token: string): void { if (token) sessionStorage.setItem(TOKEN_KEY, token); else sessionStorage.removeItem(TOKEN_KEY); }
export function isConfigured(): boolean { return Boolean(API_URL && import.meta.env.VITE_GOOGLE_CLIENT_ID); }

export async function api<T>(action: string, payload: Record<string, unknown> = {}): Promise<T> {
  if (!API_URL) throw new ApiError('CONFIGURATION_REQUIRED', 'The eRFA API URL is not configured.');
  let response: Response;
  try {
    response = await fetch(API_URL, {
      method: 'POST',
      redirect: 'follow',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ action, payload, idToken: getToken() })
    });
  } catch {
    throw new ApiError('NETWORK_ERROR', 'Unable to reach eRFA. Check your internet connection and try again.');
  }
  if (!response.ok) throw new ApiError('HTTP_ERROR', `eRFA returned HTTP ${response.status}.`);
  const result = await response.json() as { ok: boolean; data?: T; error?: { code: string; message: string } };
  if (!result.ok || result.data === undefined) throw new ApiError(result.error?.code ?? 'SERVER_ERROR', result.error?.message ?? 'The request could not be completed.');
  return result.data;
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error(`Could not read ${file.name}.`));
    reader.onload = () => resolve(String(reader.result).split(',')[1] ?? '');
    reader.readAsDataURL(file);
  });
}
