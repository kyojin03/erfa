import { AlertTriangle, CheckCircle2, LoaderCircle, X } from 'lucide-react';
import { type ReactNode } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from './auth';
import { statusLabel } from './format';
import type { RfaStatus } from './types';

export function Spinner({ label = 'Loading' }: { label?: string }) { return <div className="spinner-wrap" role="status"><LoaderCircle className="spin" /><span>{label}…</span></div>; }
export function StatusBadge({ status }: { status: RfaStatus | string }) { return <span className={`status status-${status.toLowerCase()}`}>{statusLabel(status)}</span>; }
export function ErrorNotice({ message }: { message: string }) { return message ? <div className="notice error" role="alert"><AlertTriangle size={18} />{message}</div> : null; }
export function SuccessNotice({ message }: { message: string }) { return message ? <div className="notice success" role="status"><CheckCircle2 size={18} />{message}</div> : null; }

export function Dialog({ title, children, onClose }: { title: string; children: ReactNode; onClose: () => void }) {
  return <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) onClose(); }}>
    <section className="dialog" role="dialog" aria-modal="true" aria-label={title}><header><h2>{title}</h2><button className="icon-button" onClick={onClose} aria-label="Close"><X /></button></header>{children}</section>
  </div>;
}

export function Layout() {
  const { user, signOut } = useAuth();
  if (!user) return null;
  return <div className="app-shell">
    <header className="topbar">
      <Link to="/" className="brand"><img src={`${import.meta.env.BASE_URL}gsc-logo.png`} alt="Good Samaritan Colleges" /><span><b>eRFA</b><small>Electronic Request for Approval</small></span></Link>
      <div className="user-summary"><span><b>{user.FULL_NAME}</b><small>{user.POSITION || user.DEPARTMENT_NAME || user.EMAIL}</small></span><button className="button ghost" onClick={signOut}>Sign out</button></div>
    </header>
    <nav className="main-nav" aria-label="Main navigation">
      <NavLink to="/" end>Dashboard</NavLink><NavLink to="/rfas">My RFAs</NavLink>
      {user.CAN_CREATE_RFA && <NavLink to="/rfa/new">Create RFA</NavLink>}
      {user.CAN_APPROVE_RFA && <NavLink to="/approvals">For My Action</NavLink>}
      {user.IS_ADMIN && <NavLink to="/admin">Administration</NavLink>}
    </nav>
    <main className="page"><Outlet /></main>
    <footer className="site-footer"><span>eRFA · Good Samaritan Colleges</span><span>Approvals are recorded electronically with a complete audit trail.</span></footer>
  </div>;
}

