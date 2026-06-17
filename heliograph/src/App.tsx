import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { SYLLABUS, TRACK_META } from "./lib/syllabus";
import Starfield from "./components/Starfield";
import { Menu, X, Sun } from "lucide-react";

function ProgressBar() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      setP((h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100 || 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      className="fixed left-0 top-0 z-50 h-[3px] bg-gradient-to-r from-accent to-accent2"
      style={{ width: `${p}%` }}
    />
  );
}

function Sidebar({ onNav }: { onNav?: () => void }) {
  return (
    <nav className="flex h-full flex-col gap-1 overflow-y-auto px-3 py-5">
      <Link to="/" onClick={onNav} className="mb-1 flex items-center gap-2 px-2">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent/15 text-accent">
          <Sun size={18} />
        </span>
        <div>
          <div className="text-[17px] font-extrabold leading-none">
            <span className="text-accent">HELIO</span>GRAPH
          </div>
          <div className="text-[10.5px] text-muted">ISRO BAH-2026 · PS-15</div>
        </div>
      </Link>
      <NavLink
        to="/"
        end
        onClick={onNav}
        className={({ isActive }) =>
          `mt-2 rounded-lg px-3 py-1.5 text-[13.5px] ${
            isActive ? "bg-panel2 text-white" : "text-muted hover:bg-panel hover:text-ink"
          }`
        }
      >
        Overview
      </NavLink>
      {SYLLABUS.map((part) => (
        <div key={part.id} className="mt-3">
          <div className="px-2 pb-1 text-[10.5px] font-bold uppercase tracking-wider text-muted/70">
            {part.label}
          </div>
          {part.chapters.map((c) => (
            <NavLink
              key={c.slug}
              to={`/c/${c.slug}`}
              onClick={onNav}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-lg px-3 py-1.5 text-[13.5px] ${
                  isActive ? "bg-panel2 text-white" : "text-muted hover:bg-panel hover:text-ink"
                }`
              }
              style={({ isActive }) =>
                isActive ? { borderLeft: `2px solid ${TRACK_META[c.track].color}` } : undefined
              }
            >
              <span className="w-4 font-mono text-[11px] opacity-50">{c.n}</span>
              <span className="leading-tight">{c.title}</span>
            </NavLink>
          ))}
        </div>
      ))}
      <div className="mt-4 px-2 text-[11px] leading-relaxed text-muted/60">
        An interactive textbook + build blueprint.
        <div className="mt-1">
          {Object.values(TRACK_META).map((m) => (
            <span key={m.label} style={{ color: m.color }} className="mr-1.5">
              ● {m.label}
            </span>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default function App() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    setOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen">
      <Starfield />
      <ProgressBar />

      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-line bg-bg/80 px-4 py-2.5 backdrop-blur lg:hidden">
        <Link to="/" className="font-extrabold">
          <span className="text-accent">HELIO</span>GRAPH
        </Link>
        <button onClick={() => setOpen((v) => !v)} className="text-muted" aria-label="menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <div className="mx-auto flex max-w-[1500px]">
        <aside className="sticky top-0 hidden h-screen w-[290px] shrink-0 border-r border-line bg-bg/60 backdrop-blur lg:block">
          <Sidebar />
        </aside>

        {open && (
          <div className="fixed inset-0 z-30 lg:hidden">
            <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
            <aside className="absolute left-0 top-0 h-full w-[280px] overflow-y-auto border-r border-line bg-bg">
              <Sidebar onNav={() => setOpen(false)} />
            </aside>
          </div>
        )}

        <main className="min-w-0 flex-1 px-5 py-8 sm:px-8 lg:px-14">
          <div className="mx-auto max-w-[900px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
