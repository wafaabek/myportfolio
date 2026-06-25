'use client';

import { useState, useEffect, useRef } from 'react';

const ROLES = [
  'Full Stack Engineer',
  'Automation Specialist',
  'AI / ML Developer',
  'Product Builder',
];

/*const SKILLS = ['React', 'Next.js', 'Django', 'Python', 'AI / ML', 'REST APIs', 'PostgreSQL'];*/

const W1 = 'Wafaa';
const W2 = 'Bekkhoucha';

// ─── Animated Name ────────────────────────────────────────────────────────────
const AnimatedName = ({ startDelay = 400 }: { startDelay?: number }) => {
  const [chars1, setChars1] = useState<boolean[]>(Array(W1.length).fill(false));
  const [chars2, setChars2] = useState<boolean[]>(Array(W2.length).fill(false));
  const [line1In, setLine1In] = useState(false);
  const [line2In, setLine2In] = useState(false);
  const [showCursor, setShowCursor] = useState(false);
  const [underlineIn, setUnderlineIn] = useState(false);

  useEffect(() => {

    const timers: ReturnType<typeof setTimeout>[] = [];

    timers.push(setTimeout(() => setLine1In(true), startDelay));
    timers.push(setTimeout(() => setLine2In(true), startDelay + 140));

    W1.split('').forEach((_, i) => {
      timers.push(
        setTimeout(() => {
          setChars1((prev) => { const n = [...prev]; n[i] = true; return n; });
        }, startDelay + 120 + i * 60)
      );
    });

    W2.split('').forEach((_, i) => {
      timers.push(
        setTimeout(() => {
          setChars2((prev) => { const n = [...prev]; n[i] = true; return n; });
        }, startDelay + 420 + i * 55)
      );
    });

    const lastChar =
  startDelay + 420 + (W2.length - 1) * 55 + 280;

timers.push(
  setTimeout(() => setShowCursor(true), lastChar)
);

timers.push(
  setTimeout(() => setUnderlineIn(true), lastChar + 80)
);

    return () => timers.forEach(clearTimeout);
  }, [startDelay]);

  const lineStyle = (isIn: boolean): React.CSSProperties => ({
    overflow: 'hidden',
    display: 'block',
  });

  const lineInnerStyle = (isIn: boolean): React.CSSProperties => ({
    display: 'flex',
    transform: isIn ? 'translateY(0)' : 'translateY(110%)',
    transition: 'transform 1s cubic-bezier(0.16,1,0.3,1)',
  });

  const charStyle = (isIn: boolean, italic: boolean): React.CSSProperties => ({
    display: 'inline-block',
    fontFamily: "'DM Serif Display', Georgia, serif",
    fontSize: 'clamp(70px, 10vw, 140px)',
    lineHeight: 0.95,
    letterSpacing: '-0.025em',
    fontWeight: 400,
    fontStyle: italic ? 'italic' : 'normal',
    color: italic ? 'var(--primary)' : '#f0ede8',
    opacity: isIn ? 1 : 0,
    transform: isIn ? 'translateY(0) rotate(0deg)' : 'translateY(18px) rotate(3deg)',
    transition: 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.16,1,0.3,1)',
  });

  const dashLen = 600;

  return (
    <>
   
    <div style={{ marginBottom: 20 }}>
      {/* Line 1 — Wafaa */}
      <span style={lineStyle(line1In)}>
        <span style={lineInnerStyle(line1In)}>
          {W1.split('').map((ch, i) => (
            <span key={i} style={charStyle(chars1[i], false)}>
              {ch}
            </span>
          ))}
        </span>
      </span>

      {/* Line 2 — Bekkhoucha */}
      <span style={lineStyle(line2In)}>
        <span style={lineInnerStyle(line2In)}>
          {W2.split('').map((ch, i) => (
            <span key={i} style={charStyle(chars2[i], true)}>
              {ch}
            </span>
          ))}
          {/* Blinking cursor */}
          <span
            style={{
    display: showCursor ? 'inline-block' : 'none',
    width: 3,
    height: '0.85em',
    background: 'var(--primary)',
    borderRadius: 999,
    marginLeft: 6,
    alignSelf: 'center',
    animation: 'nameCursorBlink 1s step-end infinite',
  }}
          />
        </span>
      </span>

      {/* Hand-drawn underline */}
      <svg
        width="360"
        height="14"
        viewBox="0 0 360 14"
        style={{
  display: 'block',
  marginTop: 12,
  marginInline: 'auto',
}}
      >
        <path
          d="M2,10 C55,4 120,14 190,8 C260,2 310,12 358,7"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={dashLen}
          strokeDashoffset={underlineIn ? 0 : dashLen}
          style={{
            transition: underlineIn
              ? 'stroke-dashoffset 1.1s cubic-bezier(0.16,1,0.3,1)'
              : 'none',
          }}
        />
      </svg>

      <style>{`
        @keyframes nameCursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
    </>

  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const IntroSection = ({ onEnter }: { onEnter: () => void }) => {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [tickerIdx, setTickerIdx] = useState(0);
  const [tickerTransition, setTickerTransition] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const iv = setInterval(() => {
      setTickerIdx((prev) => {
        const next = prev + 1;
        if (next >= ROLES.length) {
          setTimeout(() => {
            setTickerTransition(false);
            setTickerIdx(0);
            setTimeout(() => setTickerTransition(true), 40);
          }, 480);
          return next;
        }
        return next;
      });
    }, 2200);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    type Pt = { x: number; y: number; vx: number; vy: number; r: number };
    const pts: Pt[] = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.3,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 110) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(124,111,255,${0.15 * (1 - d / 110)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(196,184,255,0.45)';
        ctx.fill();
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);


  const fade = (delay: string) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(10px)',
    transition: `opacity 0.7s ease ${delay}, transform 0.7s ease ${delay}`,
  });

  return (
    <>
    <div
      style={{
        position: 'fixed', 
        inset: 0,            // ← change ici
        zIndex: 100,
        cursor: 'default', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#020617' /* slate-950 */,
        overflow: 'hidden',
        opacity: exiting ? 0 : 1,
        transition: 'opacity 0.6s ease',
        padding: '60px 40px',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      {/* Particle canvas */}
      
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.35, pointerEvents: 'none' }}
      />

      {/* Grid accent */}
      <div
        style={{
          position: 'absolute', top: 0, right: 0, width: 300, height: 300,
          opacity: 0.03,
          backgroundImage: 'linear-gradient(#22d3ee /* cyan-400 */ 1px,transparent 1px),linear-gradient(90deg,#22d3ee /* cyan-400 */ 1px,transparent 1px)',
          backgroundSize: '40px 40px', pointerEvents: 'none',
        }}
      />

      <div
  style={{
    position: 'absolute',
    width: 700,
    height: 700,
    borderRadius: '50%',
    background:
      'radial-gradient(circle, rgba(34,211,238,0.18), transparent 70%)',
    filter: 'blur(100px)',
    pointerEvents: 'none',
  }}
/>

      {/* Content */}
      <div
        style={{
          position: 'relative', zIndex: 2,
          display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
          maxWidth: 620, width: '100%',
          cursor: 'default', 
        }}
      >
        {/* Eyebrow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28, ...fade('0.2s') }}>
          <div style={{ width: 32, height: 1, background: 'var(--accent)' }} />
          <span style={{ fontSize: 20, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 500 }}>
            MY Portfolio· 
          </span>
        </div>

        {/* ✦ Animated Name */}
        <AnimatedName startDelay={500} />

        {/* Role ticker */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, height: 28, overflow: 'hidden', marginBottom: 36, ...fade('1.8s') }}>
          <span style={{ fontSize: 13, color: '#6b7280', whiteSpace: 'nowrap' }}> —</span>
          <div
            style={{
              fontSize: 15, color: '#e5e0d8', fontWeight: 500,
              display: 'flex', flexDirection: 'column',
              transform: `translateY(-${tickerIdx * 28}px)`,
              transition: tickerTransition ? 'transform 0.5s cubic-bezier(0.23,1,0.32,1)' : 'none',
            }}
          >
            {[...ROLES, ROLES[0]].map((r, i) => (
              <span key={i} style={{ height: 28, lineHeight: '28px', whiteSpace: 'nowrap' }}>{r}</span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div
  style={{
    width: 220,
    height: 1,
    marginBottom: 50,
    background:
      'linear-gradient(to right, transparent, var(--primary), transparent)',
    boxShadow: '0 0 25px rgba(6,182,212,.25) ',
    ...fade('2s'),
  }}
/>

        {/* Skills 
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 48, ...fade('2.1s') }}>
          {SKILLS.map((s) => (
            <span key={s} style={{ fontSize: 11, letterSpacing: '0.06em', color: '#9ca3af', border: '1px solid #2a2740', borderRadius: 100, padding: '5px 14px', background: '#12111a' }}>
              {s}
            </span>
          ))}
        </div>*/}

        {/* CTA */}
        <div
  style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: 20,
    ...fade('2.3s'),
  }}
>
  <button
    onClick={() => {
      setExiting(true);
      setTimeout(() => {
         onEnter();
        /* router.push('/portfolio') */
      }, 600);
    }}
    onMouseEnter={(e) => {
      const fill = e.currentTarget.querySelector<HTMLElement>('.btn-fill');
      const pill = e.currentTarget.querySelector<HTMLElement>('.btn-pill');
      const label = e.currentTarget.querySelector<HTMLElement>('.btn-label');
      const track = e.currentTarget.querySelector<HTMLElement>('.btn-track');
      if (fill) fill.style.transform = 'scaleX(1)';
      if (pill) pill.style.transform = 'rotate(45deg)';
      if (label) label.style.color = '#e2f8fc';
      if (track) track.style.borderColor = 'rgba(6,182,212,0.7)';
    }}
    onMouseLeave={(e) => {
      const fill = e.currentTarget.querySelector<HTMLElement>('.btn-fill');
      const pill = e.currentTarget.querySelector<HTMLElement>('.btn-pill');
      const label = e.currentTarget.querySelector<HTMLElement>('.btn-label');
      const track = e.currentTarget.querySelector<HTMLElement>('.btn-track');
      if (fill) fill.style.transform = 'scaleX(0)';
      if (pill) pill.style.transform = 'rotate(0deg)';
      if (label) label.style.color = '#cbd5e1';
      if (track) track.style.borderColor = 'rgba(6,182,212,0.35)';
    }}
    style={{ background: 'none', border: 'none', padding: 0, cursor: 'none' }}
  >
    <div
      className="btn-track"
      style={{
        cursor: 'none',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        height: 52,
        padding: '0 10px 0 28px',
        border: '1px solid rgba(6,182,212,0.35)',
        borderRadius: 100,
        overflow: 'hidden',
        transition: 'border-color 0.3s',
      }}
    >
      {/* Liquid fill */}
      <div
        className="btn-fill"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(6,182,212,0.08)',
          borderRadius: 100,
          transform: 'scaleX(0)',
          transformOrigin: 'left',
          transition: 'transform 0.45s cubic-bezier(0.16,1,0.3,1)',
        }}
      />

      {/* Label */}
      <span
        className="btn-label"
        style={{
          position: 'relative',
          zIndex: 1,
          fontSize: 12,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#cbd5e1',
          fontWeight: 500,
          whiteSpace: 'nowrap',
          transition: 'color 0.3s',
        }}
      >
        view portfolio
      </span>

      {/* Arrow pill */}
      <div
        className="btn-pill"
        style={{
          position: 'relative',
          zIndex: 1,
          marginLeft: 14,
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: 'rgba(6,182,212,0.12)',
          border: '1px solid rgba(6,182,212,0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.3s, transform 0.4s cubic-bezier(0.34,1.56,0.64,1)',
        }}
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 13L13 3M13 3H7M13 3v6" />
        </svg>
      </div>
    </div>
  </button>


  
</div>
      </div>

      {/* Corner tag */}
      <span style={{ position: 'absolute', bottom: 36, right: 40, fontSize: 10, letterSpacing: '0.14em', color: '#3a3856', textTransform: 'uppercase' }}>
        Full Stack · AI/ML · Automation
      </span>
    </div>
   </> 
  );
};

export default IntroSection;

/*
  Fonts — add to layout.tsx or globals.css:
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&display=swap"
    rel="stylesheet"
  />
*/