// APP VERSION 3.0 — rebuilt with ornament ayah numbers, tajweed, focus mode, auto-bookmark, offline PWA
import React, {useState, useEffect, useRef, useCallback, useMemo} from "react";

// ─── Themes ────────────────────────────────────────────────────────────────────
const THEMES=[
  {id: "blue", label: "أزرق", accent: "#0c84e4", dark: "#1F305E", light: "#b2dbfb", accent2: "#0a6bbf"},
  {id: "green", label: "أخضر", accent: "#16a34a", dark: "#14532d", light: "#bbf7d0", accent2: "#15803d"},
  {id: "purple", label: "بنفسجي", accent: "#7c3aed", dark: "#3b0764", light: "#ddd6fe", accent2: "#6d28d9"},
  {id: "teal", label: "زيتي", accent: "#0d9488", dark: "#134e4a", light: "#99f6e4", accent2: "#0f766e"},
  {id: "rose", label: "وردي", accent: "#e11d48", dark: "#881337", light: "#fecdd3", accent2: "#be123c"},
  {id: "amber", label: "ذهبي", accent: "#d97706", dark: "#78350f", light: "#fde68a", accent2: "#b45309"},
  {id: "maroon", label: "بُني داكن", accent: "#9b2335", dark: "#5a0e1a", light: "#ffd6db", accent2: "#7a1c28"},
  {id: "slate", label: "رمادي أنيق", accent: "#475569", dark: "#1e293b", light: "#cbd5e1", accent2: "#334155"},
  {id: "custom", label: "مخصص", accent: "#4f8ef7", dark: "#1a1a2e", light: "#d0e8ff", accent2: "#6fa8dc"},
];


// ─── CSS ───────────────────────────────────────────────────────────────────────
function buildStyles (theme, dark, qfont) {
  return `
  @import url('https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=Aref+Ruqaa:wght@400;700&family=Tajawal:wght@300;400;500;700&family=Scheherazade+New:wght@400;700&family=Reem+Kufi:wght@400;700&display=swap');
  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }

  /* ════════════════════════════════════════════════
     DESIGN TOKENS & ROOT VARIABLES — PREMIUM v10
  ════════════════════════════════════════════════ */
  :root {
    --ac:${theme.accent}; --ac2:${theme.accent2}; --dk:${theme.dark}; --lt:${theme.light};
    --bg:${dark? "#0b0d14":"#f0f2f7"};
    --bg2:${dark? "#0e1019":"#e8eaf2"};
    --card:${dark? "#161922":"#ffffff"};
    --card2:${dark? "#1c2030":"#f6f8fc"};
    --glass:${dark? "rgba(22,25,34,.85)":"rgba(255,255,255,.88)"};
    --item:${dark? "#212638":"#eef0f8"};
    --item2:${dark? "#1a1e2c":"#e4e8f2"};
    --tx:${dark? "#edf0fa":"#0e1225"};
    --txm:${dark? "rgba(200,208,240,.58)":"rgba(12,18,50,.48)"};
    --txs:${dark? "rgba(200,208,240,.32)":"rgba(12,18,50,.28)"};
    --bdr:${dark? "#262c42":"#dde1f0"};
    --bdr2:${dark? "#343c58":"#c8cee4"};
    --ovl:${dark? "rgba(0,0,0,.72)":"rgba(255,255,255,.72)"};
    --scr:${dark? "#3a4a6b":theme.light};
    --ibg:${dark? "#212638":theme.light};
    --navi:${dark? "#1a1e2c":theme.dark};
    --hbg:${dark? "#262c42":"#e8ecf8"};
    --zbg:${dark? "#212638":"#f0f2f7"};
    --tfbg:${dark? "#0b0d14":theme.dark};
    --rbg:${dark? "#1c2030":theme.light};
    --jnbg:${dark? "#212638":"#f0f2f7"};
    --jnc:${dark? theme.light:theme.accent};
    --bkbg:${dark? "#2a1f0a":"#fffbeb"};
    --bkbd:${dark? "#78350f":"#fcd34d"};
    --qfont:${qfont||"'Amiri','Aref Ruqaa',serif"};
    /* Spacing scale */
    --sp-xs:4px; --sp-sm:8px; --sp-md:14px; --sp-lg:20px; --sp-xl:28px;
    /* Border radius — slightly rounder for premium feel */
    --r-sm:9px; --r-md:13px; --r-lg:18px; --r-xl:24px; --r-full:9999px;
    /* Typography */
    --t-xs:clamp(10px,2.8vw,12px); --t-sm:clamp(12px,3.2vw,14px);
    --t-md:clamp(13px,3.6vw,15px); --t-lg:clamp(14px,4vw,17px); --t-xl:clamp(15px,4.5vw,20px);
    /* Shadows — layered for depth */
    --sh-sm:0 1px 3px rgba(0,0,0,${dark? ".3":".07"}),0 1px 8px rgba(0,0,0,${dark? ".18":".04"});
    --sh-md:0 4px 18px rgba(0,0,0,${dark? ".38":".1"}),0 2px 6px rgba(0,0,0,${dark? ".22":".05"});
    --sh-lg:0 12px 48px rgba(0,0,0,${dark? ".5":".14"}),0 4px 14px rgba(0,0,0,${dark? ".3":".07"});
    --sh-ac:0 4px 22px ${theme.accent}48,0 1px 6px ${theme.accent}22;
    --sh-inset:inset 0 1px 0 rgba(255,255,255,${dark? ".06":".8"});
    /* Glow effects */
    --glow-ac:0 0 24px ${theme.accent}33;
    /* Transitions */
    --ease-bounce:cubic-bezier(.34,1.56,.64,1);
    --ease-smooth:cubic-bezier(.22,1,.36,1);
    --ease-spring:cubic-bezier(.175,.885,.32,1.275);
  }

  /* ════════════════════════════════════════════════
     SCROLLBAR & BASE — PREMIUM
  ════════════════════════════════════════════════ */
  ::-webkit-scrollbar{width:5px;height:5px}
  ::-webkit-scrollbar-track{background:transparent}
  ::-webkit-scrollbar-thumb{background:var(--bdr2);border-radius:4px;transition:.2s}
  ::-webkit-scrollbar-thumb:hover{background:var(--ac)99}
  html{-webkit-text-size-adjust:100%;text-size-adjust:100%;scroll-behavior:smooth}
  body{
    font-family:'Tajawal','Segoe UI',Tahoma,sans-serif;
    direction:rtl;background:var(--bg);color:var(--tx);
    transition:background .3s ease,color .3s ease;line-height:1.75;overflow-x:clip;
    font-size:14px;
    -webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;
  }
  a{text-decoration:none}
  button{touch-action:manipulation;-webkit-tap-highlight-color:transparent;cursor:pointer;font-family:inherit}
  input,select,textarea{-webkit-tap-highlight-color:transparent;font-family:inherit}
  *:focus-visible{outline:2px solid var(--ac);outline-offset:2px;border-radius:var(--r-sm)}

  /* ════════════════════════════════════════════════
     ANIMATIONS & KEYFRAMES — EXPANDED
  ════════════════════════════════════════════════ */
  @keyframes fadeInUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeInDown{from{opacity:0;transform:translateY(-20px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes fadeInScale{from{opacity:0;transform:scale(.94)}to{opacity:1;transform:scale(1)}}
  @keyframes fadeOutScale{from{opacity:1;transform:scale(1)}to{opacity:0;transform:scale(.94)}}
  @keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
  @keyframes slideUp{from{transform:translate(-50%,22px);opacity:0}to{transform:translate(-50%,0);opacity:1}}
  @keyframes slideUp2{from{transform:translateY(40px);opacity:0}to{transform:translateY(0);opacity:1}}
  @keyframes slideDown{from{transform:translateX(-50%) translateY(-18px);opacity:0}to{transform:translateX(-50%) translateY(0);opacity:1}}
  @keyframes toastIn{from{transform:translateY(12px);opacity:0}to{transform:translateY(0);opacity:1}}
  @keyframes spin{to{transform:rotate(360deg)}}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:.45}}
  @keyframes bounceIn{0%{transform:scale(.78);opacity:0}55%{transform:scale(1.06)}80%{transform:scale(.98)}100%{transform:scale(1);opacity:1}}
  @keyframes gradientShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
  @keyframes ripple{0%{transform:scale(0);opacity:.6}100%{transform:scale(2.5);opacity:0}}
  @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
  @keyframes glow{0%,100%{box-shadow:var(--sh-ac)}50%{box-shadow:0 0 28px ${theme.accent}66,var(--sh-ac)}}
  @keyframes slideInRight{from{opacity:0;transform:translateX(16px)}to{opacity:1;transform:translateX(0)}}
  @keyframes slideInLeft{from{opacity:0;transform:translateX(-16px)}to{opacity:1;transform:translateX(0)}}
  @keyframes countUp{from{transform:scale(.8);opacity:0}to{transform:scale(1);opacity:1}}
  @keyframes breathe{0%,100%{opacity:.7;transform:scale(.98)}50%{opacity:1;transform:scale(1)}}
  @keyframes shimmerSlide{0%{background-position:-200% 0}100%{background-position:200% 0}}

  .fade-in-up{animation:fadeInUp .45s var(--ease-smooth) both}
  .fade-in{animation:fadeIn .32s ease both}
  .fade-in-scale{animation:fadeInScale .32s var(--ease-smooth) both}
  .fade-in-up-d1{animation-delay:.07s} .fade-in-up-d2{animation-delay:.14s} .fade-in-up-d3{animation-delay:.21s}
  .fade-in-up-d4{animation-delay:.28s} .fade-in-up-d5{animation-delay:.35s}
  .reveal{opacity:0;transform:translateY(22px);transition:opacity .55s var(--ease-smooth),transform .55s var(--ease-smooth)}
  .reveal.visible{opacity:1;transform:none}
  .float-anim{animation:float 3.5s ease-in-out infinite}

  /* ════════════════════════════════════════════════
     HEADER — PREMIUM GLASS
  ════════════════════════════════════════════════ */
  .app-header{
    position:sticky;top:0;z-index:999;
    background:var(--ac);
    border-bottom:1px solid rgba(255,255,255,.12);
    transition:all .35s var(--ease-smooth);
    box-shadow:0 2px 12px rgba(0,0,0,.18);
  }
  body.focus-mode-open .app-header{display:none}
  body.reading-mode .landing{padding-top:0}
  .app-header.scrolled{
    background:${dark? "rgba(11,13,20,.97)":"rgba(255,255,255,.96)"};
    backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);
    border-bottom:1px solid var(--bdr);
    box-shadow:0 1px 0 var(--bdr),0 4px 32px rgba(0,0,0,${dark? ".35":".1"});
  }
  .header-inner{
    max-width:1170px;margin:0 auto;padding:0 14px;
    display:grid;grid-template-columns:auto 1fr auto;
    align-items:center;height:56px;gap:8px;
  }
  .logo{
    justify-self:center;color:#fff;
    font-size:clamp(16px,4vw,20px);font-weight:700;
    font-family:'Aref Ruqaa',serif;word-spacing:4px;
    white-space:nowrap;cursor:pointer;
    transition:all .25s var(--ease-smooth);letter-spacing:.5px;
    text-shadow:0 1px 10px rgba(0,0,0,.25);
  }
  .app-header.scrolled .logo{color:var(--ac);text-shadow:none}
  .logo:hover{opacity:.82;transform:scale(1.02)}
  .header-left,.header-right{display:flex;align-items:center;gap:6px;position:relative}
  .header-left{justify-self:start}
  .header-right{justify-self:end;flex-shrink:0}

  .hdr-btn{
    background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.18);
    border-radius:var(--r-md);padding:7px 11px;
    display:flex;align-items:center;gap:5px;color:#fff;
    font-size:13px;font-family:'Tajawal',sans-serif;
    transition:all .22s var(--ease-smooth);flex-shrink:0;white-space:nowrap;min-height:36px;
    var(--sh-inset);
  }
  .app-header.scrolled .hdr-btn{background:var(--item);color:var(--tx);border-color:var(--bdr)}
  .hdr-btn:hover{background:rgba(255,255,255,.3);transform:translateY(-1px);box-shadow:0 4px 12px rgba(0,0,0,.2)}
  .app-header.scrolled .hdr-btn:hover{background:var(--ac);color:#fff;border-color:var(--ac);box-shadow:var(--sh-ac)}
  .hdr-btn:active{transform:translateY(0) scale(.96)}
  .hdr-btn .ico{font-size:15px;line-height:1}

  @media(max-width:992px){.toggler{display:flex}}
  nav:not(.open):not(.closed){display:none}
  @media(min-width:993px){nav{display:none}}

  .nav-more-wrap{position:relative;flex-shrink:0;display:flex;gap:5px}
  .nav-more-btn{white-space:nowrap;min-width:fit-content}
  .reading-nav-btn{background:var(--ac)!important;color:#fff!important;border-color:var(--ac)!important;font-weight:700}
  .nav-more-panel{
    position:fixed;top:64px;left:8px;z-index:3001;
    background:var(--glass);border:1px solid var(--bdr);border-radius:var(--r-xl);
    padding:14px;width:min(360px,calc(100vw - 16px));
    box-shadow:var(--sh-lg);
    backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);
    display:grid;grid-template-columns:1fr 1fr 1fr;gap:7px;
    max-height:calc(100vh - 76px);overflow-y:auto;
    animation:fadeInScale .18s var(--ease-smooth);
  }
  .nmp-item{
    padding:11px 8px;border:none;border-radius:var(--r-md);
    background:var(--item);color:var(--tx);
    font-family:'Tajawal',sans-serif;font-size:11px;
    cursor:pointer;transition:all .18s var(--ease-smooth);text-align:center;
    display:flex;flex-direction:column;align-items:center;gap:5px;
    box-shadow:var(--sh-sm);border:1px solid var(--bdr);
  }
  .nmp-item:hover{background:var(--ac)18;color:var(--ac);transform:translateY(-2px);box-shadow:var(--sh-md);border-color:var(--ac)33}
  .nmp-item.active{background:linear-gradient(135deg,var(--ac),var(--ac2));color:#fff;font-weight:700;box-shadow:var(--sh-ac);border-color:transparent}
  .nmp-item-icon{font-size:18px;line-height:1}
  .nmp-item-label{font-size:10px;line-height:1.3}

  @media(max-width:992px){
    nav.closed{display:none}
    nav.open{
      position:fixed;top:56px;right:0;left:0;z-index:1200;
      background:${dark? "rgba(8,10,18,.97)":"rgba(16,36,86,.97)"};
      backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);
      max-height:calc(100vh - 56px);overflow-y:auto;
      padding:10px;animation:fadeIn .18s ease;
    }
    nav.open ul{display:grid;grid-template-columns:1fr 1fr;gap:6px;padding:0}
    nav.open ul li button{
      color:#fff;font-size:var(--t-sm);min-height:50px;width:100%;
      text-align:center;padding:10px 8px;border-radius:var(--r-md);
      background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);
      display:flex;align-items:center;justify-content:center;
      font-family:'Tajawal',sans-serif;transition:.15s;
    }
    nav.open ul li button.active{background:var(--ac);color:#fff;font-weight:700;border-color:var(--ac)}
    nav.open ul li button:hover{background:rgba(255,255,255,.15)}
  }

  /* ════════════════════════════════════════════════
     SETTINGS PANEL
  ════════════════════════════════════════════════ */
  .sp-open-btn{display:flex!important;flex-direction:column;align-items:center;gap:1px;padding:5px 9px!important}
  .sp-lbl{font-size:9px;line-height:1;margin-top:1px;font-family:'Tajawal',sans-serif}
  .sp-panel{
    position:fixed;top:62px;right:8px;z-index:5000;
    background:var(--card);border:1px solid var(--bdr);border-radius:var(--r-xl);
    padding:16px;width:min(310px,calc(100vw - 16px));
    box-shadow:var(--sh-lg);
    max-height:calc(100vh - 74px);overflow-y:auto;scrollbar-width:thin;
    animation:fadeInScale .15s cubic-bezier(.22,1,.36,1);
  }
  .sp-panel-title{font-size:var(--t-sm);font-weight:700;color:var(--tx);text-align:center;margin-bottom:14px;padding-bottom:12px;border-bottom:1px solid var(--bdr)}
  .sp-group-label{font-size:11px;color:var(--txm);font-weight:700;margin:12px 0 8px;letter-spacing:.5px;text-transform:uppercase}
  .sp-row2{display:flex;gap:7px;margin-bottom:4px}
  .sp-pill{flex:1;padding:9px 8px;border-radius:var(--r-md);border:1.5px solid var(--bdr);background:var(--item);color:var(--tx);font-size:var(--t-xs);cursor:pointer;transition:.2s;text-align:center}
  .sp-pill.sp-pill-on{background:var(--ac);color:#fff;border-color:var(--ac);box-shadow:var(--sh-ac)}
  .sp-swatches{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:8px}
  .sp-sw{width:28px;height:28px;border-radius:50%;border:3px solid transparent;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#fff;font-size:10px;font-weight:700;transition:.2s;background:var(--sc,var(--ac))}
  .sp-sw.sp-sw-on{border-color:var(--tx);transform:scale(1.2);box-shadow:0 0 0 2px var(--card),0 0 0 4px var(--sc)}
  .sp-color-names{display:flex;flex-wrap:wrap;gap:4px;margin-bottom:6px}
  .sp-cn{padding:3px 10px;border-radius:var(--r-sm);font-size:10px;cursor:pointer;transition:.2s;border:1.5px solid var(--sc,var(--ac));color:var(--sc,var(--ac));background:transparent}
  .sp-cn.sp-cn-on{background:var(--sc,var(--ac));color:#fff}
  .sp-fonts{display:grid;grid-template-columns:1fr 1fr;gap:6px}
  .sp-font{display:flex;flex-direction:column;align-items:center;gap:4px;padding:9px 6px;border-radius:var(--r-md);border:1.5px solid transparent;background:var(--item);cursor:pointer;transition:.2s}
  .sp-font:hover{border-color:var(--ac)44}
  .sp-font.sp-font-on{border-color:var(--ac);background:var(--ac)10}
  .sp-fn{font-size:9px;color:var(--txm)}

  /* ════════════════════════════════════════════════
     MAIN LAYOUT
  ════════════════════════════════════════════════ */
  .landing{
    min-height:calc(100vh - 56px);
    padding:10px 14px;
    background:var(--bg);
  }
  @media(min-width:768px){.landing{padding-bottom:44px}}
  .main-card{max-width:900px;margin:0 auto;width:100%}

  /* ════════════════════════════════════════════════
     HERO SECTION — PREMIUM LUXURY
  ════════════════════════════════════════════════ */
  .hero{
    background:linear-gradient(155deg,${dark? "#081020":"#0a1830"} 0%,${dark? "#142340":"#163560"} 45%,${dark? "#0a1828":"#0e2854"} 100%);
    border-radius:var(--r-xl);padding:38px 24px 30px;
    text-align:center;margin-bottom:18px;
    position:relative;overflow:hidden;
    border:1px solid rgba(255,255,255,.06);
    box-shadow:0 20px 60px rgba(0,0,0,.35),inset 0 1px 0 rgba(255,255,255,.06);
  }
  .hero::before{
    content:'';position:absolute;inset:0;
    background:radial-gradient(ellipse 70% 55% at 50% 0%,rgba(255,255,255,.09),transparent),
               radial-gradient(ellipse 50% 40% at 80% 80%,${theme.accent}18,transparent);
    pointer-events:none;
  }
  .hero::after{
    content:'';position:absolute;bottom:0;left:0;right:0;height:1px;
    background:linear-gradient(90deg,transparent,rgba(255,255,255,.18),transparent);
  }
  .hero-bismillah{
    font-family:'Amiri',serif;font-size:clamp(13px,3.5vw,18px);
    color:rgba(255,255,255,.5);margin-bottom:14px;position:relative;letter-spacing:.5px;
  }
  .hero-ayah{
    font-family:'Amiri',serif;font-size:clamp(20px,5.5vw,30px);
    color:#f0d060;line-height:2.3;margin-bottom:8px;padding:0 8px;position:relative;
    text-shadow:0 2px 16px rgba(240,208,96,.35);
    animation:breathe 4s ease-in-out infinite;
  }
  .hero-ayah-meta{font-size:var(--t-xs);color:rgba(255,255,255,.4);margin-bottom:22px;position:relative}
  .hero-btns{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-bottom:22px;position:relative}
  .hero-btn{
    display:flex;align-items:center;gap:8px;padding:12px 22px;
    border-radius:var(--r-lg);border:none;font-size:var(--t-sm);
    font-weight:600;cursor:pointer;transition:all .28s var(--ease-smooth);
    min-height:46px;white-space:nowrap;position:relative;overflow:hidden;
  }
  .hero-btn::after{
    content:'';position:absolute;inset:0;background:rgba(255,255,255,0);
    transition:background .2s;
  }
  .hero-btn:hover::after{background:rgba(255,255,255,.1)}
  .hero-btn:hover{transform:translateY(-3px);box-shadow:0 10px 28px rgba(0,0,0,.45)}
  .hero-btn:active{transform:translateY(-1px)}
  .hero-btn-primary{background:linear-gradient(135deg,#f0d060,#e8b830);color:#0e2244;font-weight:700;box-shadow:0 4px 18px rgba(240,208,96,.3)}
  .hero-btn-secondary{background:rgba(255,255,255,.1);color:#fff;border:1.5px solid rgba(255,255,255,.25);backdrop-filter:blur(10px)}
  .hero-search{
    display:flex;max-width:520px;margin:0 auto;
    border-radius:var(--r-lg);overflow:hidden;
    box-shadow:0 4px 28px rgba(0,0,0,.4);position:relative;
    border:1px solid rgba(255,255,255,.12);
    transition:box-shadow .25s;
  }
  .hero-search:focus-within{box-shadow:0 4px 28px rgba(0,0,0,.5),0 0 0 3px ${theme.accent}44}
  .hero-search input{
    flex:1;border:none;outline:none;padding:14px 18px;
    background:rgba(255,255,255,.1);color:#fff;
    font-size:var(--t-sm);direction:rtl;
    backdrop-filter:blur(14px);
    transition:background .2s;
  }
  .hero-search input:focus{background:rgba(255,255,255,.15)}
  .hero-search input::placeholder{color:rgba(255,255,255,.4)}
  .hero-search button{
    background:linear-gradient(135deg,#f0d060,#e8b830);color:#0e2244;border:none;
    padding:14px 22px;font-size:15px;cursor:pointer;
    transition:.22s;font-weight:700;flex-shrink:0;
  }
  .hero-search button:hover{background:linear-gradient(135deg,#f5e07a,#f0d060);box-shadow:inset 0 -2px 0 rgba(0,0,0,.12)}

  /* ════════════════════════════════════════════════
     PRAYER + HIJRI WIDGET
  ════════════════════════════════════════════════ */
  .pw-widget{
    background:linear-gradient(135deg,var(--ac),var(--ac2));
    border-radius:var(--r-lg);padding:16px 20px;margin-bottom:16px;
    color:#fff;display:flex;align-items:center;
    justify-content:space-between;flex-wrap:wrap;gap:14px;
    box-shadow:var(--sh-ac);
    border:1px solid rgba(255,255,255,.15);
    position:relative;overflow:hidden;
  }
  .pw-widget::before{
    content:'';position:absolute;top:-40px;right:-40px;
    width:120px;height:120px;border-radius:50%;
    background:rgba(255,255,255,.07);pointer-events:none;
  }
  .pw-hijri{font-size:var(--t-xs);opacity:.8;margin-bottom:4px}
  .pw-prayer-name{font-size:var(--t-md);font-weight:700;margin-bottom:3px}
  .pw-countdown{font-size:clamp(26px,7vw,38px);font-weight:700;letter-spacing:4px;direction:ltr}
  .pw-countdown-label{font-size:9px;opacity:.65;margin-top:2px}
  .pw-prayers-mini{display:flex;gap:12px;flex-wrap:wrap;justify-content:flex-end}
  .pw-p{text-align:center;min-width:44px}
  .pw-p-name{font-size:9px;opacity:.65;margin-bottom:3px}
  .pw-p-time{font-size:var(--t-xs);font-weight:600}
  .pw-p.next-prayer .pw-p-time{color:#f0d060;font-weight:700;font-size:var(--t-sm)}
  .pw-next{display:flex;flex-direction:column;gap:3px}

  /* ════════════════════════════════════════════════
     RESUME READING BANNER
  ════════════════════════════════════════════════ */
  .resume-hero{
    background:${dark? "linear-gradient(135deg,#0a2e18,#0f3d22)":"linear-gradient(135deg,#f0fdf4,#dcfce7)"};
    border:1px solid ${dark? "#166534":"#86efac"};
    border-radius:var(--r-lg);padding:15px 18px;margin-bottom:16px;
    display:flex;align-items:center;gap:14px;
    justify-content:space-between;flex-wrap:wrap;
    box-shadow:${dark? "0 2px 12px rgba(22,101,52,.2)":"0 2px 12px rgba(22,163,74,.1)"};
  }
  .resume-hero-icon{font-size:28px;flex-shrink:0}
  .resume-hero-text{font-size:var(--t-sm);color:${dark? "#86efac":"#166534"};font-weight:700}
  .resume-hero-sub{font-size:var(--t-xs);color:var(--txm);margin-top:2px}
  .resume-hero-btn{
    background:${dark? "#166534":"#16a34a"};color:#fff;border:none;
    border-radius:var(--r-md);padding:9px 18px;
    font-size:var(--t-sm);font-weight:700;cursor:pointer;transition:.2s;
    white-space:nowrap;flex-shrink:0;
  }
  .resume-hero-btn:hover{background:#15803d;transform:translateY(-1px)}

  /* ════════════════════════════════════════════════
     DAILY AYAH CARD
  ════════════════════════════════════════════════ */
  .daily-ayah-card{
    background:${dark? "linear-gradient(135deg,#1e1c08,#2a2710)":"linear-gradient(135deg,#fefce8,#fef9c3)"};
    border:1px solid ${dark? "#a16207":"#fde047"};
    border-radius:var(--r-lg);padding:20px 18px;margin-bottom:16px;
    box-shadow:${dark? "0 2px 12px rgba(161,98,7,.15)":"0 2px 12px rgba(234,179,8,.1)"};
  }
  .daily-ayah-label{
    font-size:var(--t-xs);color:${dark? "#fbbf24":"#a16207"};
    font-weight:700;margin-bottom:12px;
    display:flex;align-items:center;gap:6px;
  }
  .daily-ayah-text{
    font-family:'Amiri',serif;font-size:clamp(18px,5vw,26px);
    line-height:2.5;color:var(--tx);text-align:center;
    margin-bottom:10px;direction:rtl;
  }
  .daily-ayah-meta{font-size:var(--t-xs);color:var(--txm);text-align:center;margin-bottom:14px}
  .daily-ayah-share{display:flex;gap:8px;justify-content:center;flex-wrap:wrap}
  .share-btn{
    background:var(--card);border:1px solid var(--bdr);border-radius:var(--r-full);
    padding:7px 16px;font-size:var(--t-xs);
    color:var(--tx);cursor:pointer;transition:.2s;
    display:flex;align-items:center;gap:5px;
  }
  .share-btn:hover{background:var(--ac);color:#fff;border-color:var(--ac);transform:translateY(-1px)}

  /* ════════════════════════════════════════════════
     QUICK START SHEET
  ════════════════════════════════════════════════ */
  .qs-overlay{position:fixed;inset:0;background:rgba(0,0,0,.65);z-index:8000;display:flex;align-items:flex-end;justify-content:center;animation:fadeIn .2s;backdrop-filter:blur(4px)}
  @media(min-width:600px){.qs-overlay{align-items:center;padding:20px}}
  .qs-sheet{
    background:var(--card);border-radius:var(--r-xl) var(--r-xl) 0 0;
    width:100%;max-width:520px;padding:24px 20px;
    animation:slideUp2 .3s cubic-bezier(.22,1,.36,1);
    border:1px solid var(--bdr);
  }
  @media(min-width:600px){.qs-sheet{border-radius:var(--r-xl)}}
  .qs-handle{width:44px;height:4px;background:var(--bdr2);border-radius:2px;margin:0 auto 20px}
  .qs-title{font-family:'Amiri',serif;font-size:var(--t-xl);color:var(--ac);text-align:center;margin-bottom:18px}
  .qs-tabs{display:flex;gap:7px;margin-bottom:16px;background:var(--item);border-radius:var(--r-md);padding:4px}
  .qs-tab{flex:1;padding:9px;border:none;border-radius:var(--r-sm);background:transparent;font-size:var(--t-sm);color:var(--txm);cursor:pointer;transition:.2s}
  .qs-tab.active{background:var(--card);color:var(--ac);font-weight:700;box-shadow:var(--sh-sm)}
  .qs-select{width:100%;padding:12px 14px;border:1.5px solid var(--bdr);border-radius:var(--r-md);background:var(--item);color:var(--tx);font-size:var(--t-sm);direction:rtl;margin-bottom:14px;outline:none;transition:.2s}
  .qs-select:focus{border-color:var(--ac)}
  .qs-go{width:100%;padding:14px;background:var(--ac);color:#fff;border:none;border-radius:var(--r-lg);font-size:var(--t-md);font-weight:700;cursor:pointer;transition:.2s;box-shadow:var(--sh-ac)}
  .qs-go:hover{filter:brightness(1.1);transform:translateY(-1px)}

  /* ════════════════════════════════════════════════
     SECTION HEADING — REFINED
  ════════════════════════════════════════════════ */
  .sec-heading{position:relative;margin-bottom:18px;text-align:center}
  .sec-heading::before{content:'';position:absolute;top:50%;left:0;width:100%;height:1px;background:linear-gradient(90deg,transparent,var(--ac)66,transparent);z-index:0}
  .sec-heading h2{position:relative;z-index:1;display:inline-block;background:var(--ac);color:#fff;padding:8px 22px;border-radius:var(--r-full);font-family:'Amiri','Aref Ruqaa',serif;font-size:clamp(15px,4.5vw,21px);font-weight:700;word-spacing:4px;box-shadow:var(--sh-ac)}

  /* Universal section page wrapper */
  .section-page{padding:4px 0}
  .section-title-row{display:flex;align-items:center;gap:10px;margin-bottom:18px}
  .section-title-icon{font-size:24px;flex-shrink:0}
  .section-title{font-size:var(--t-xl);font-weight:700;color:var(--tx);margin:0;flex:1}
  .section-subtitle{font-size:var(--t-xs);color:var(--txm);margin-top:2px}

  /* ════════════════════════════════════════════════
     READING CONTROLS — FONT SIZE BAR
  ════════════════════════════════════════════════ */
  .fs-bar{display:flex;align-items:center;gap:8px;margin-bottom:12px;background:var(--card);border-radius:var(--r-lg);padding:8px 14px;flex-wrap:wrap;border:1px solid var(--bdr)}
  .fs-bar span{font-size:var(--t-xs);color:var(--txm);white-space:nowrap}
  .fs-btn{background:var(--ac);color:#fff;border:none;border-radius:var(--r-sm);width:30px;height:30px;font-size:15px;display:flex;align-items:center;justify-content:center;transition:.2s}
  .fs-btn:hover{filter:brightness(1.15);transform:scale(1.05)}
  .fs-val{font-size:var(--t-xs);color:var(--ac);font-weight:700;min-width:30px;text-align:center}

  /* ════════════════════════════════════════════════
     QURAN TEXT
  ════════════════════════════════════════════════ */
  .qr-text{
    direction:rtl;text-align:justify;text-align-last:right;
    word-break:break-word;overflow-wrap:break-word;white-space:normal;
    line-height:2.9;color:var(--tx);padding:8px 0;
    font-family:var(--qfont,'Amiri','Aref Ruqaa',serif);
    font-size:var(--t-lg);font-weight:500;
  }
  .ayah-num{display:inline-flex;align-items:center;justify-content:center;position:relative;vertical-align:middle;width:1.85em;height:1.85em;margin:0 5px 0 2px;cursor:default;user-select:none;flex-shrink:0}
  .ayah-num svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
  .ayah-num span{position:relative;z-index:1;font-size:.58em;font-weight:700;color:${theme.accent};font-family:'Amiri',serif;line-height:1;letter-spacing:0}
  .ayah-unit{display:inline;cursor:pointer;transition:background .15s;border-radius:3px;padding:0 1px}
  .ayah-unit:hover{background:${dark? "rgba(255,255,255,.1)":"rgba(0,0,0,.05)"}}
  .ayah-unit.focus-active{background:${dark? "rgba(255,200,50,.22)":"rgba(255,200,50,.3)"};border-radius:4px;outline:2px solid ${dark? "rgba(255,200,50,.5)":"rgba(200,150,0,.4)"};outline-offset:2px}

  /* Tajweed colors */
  .tj-ghunnah{color:#16a34a} .tj-qalqala{color:#2563eb} .tj-madd{color:#7c3aed}
  .tj-ra{color:#d97706} .tj-lam{color:#dc2626} .tj-ikhfa{color:#0d9488}
  .tj-idgham{color:#9333ea} .tj-iqlab{color:#db2777}
  .tj-legend{display:flex;flex-wrap:wrap;gap:6px;padding:10px 12px;background:var(--item);border-radius:var(--r-lg);margin-bottom:12px;border:1px solid var(--bdr)}
  .tj-legend-item{display:flex;align-items:center;gap:4px;font-size:var(--t-xs);color:var(--tx);white-space:nowrap}
  .tj-dot{width:9px;height:9px;border-radius:50%;flex-shrink:0}

  /* Page background */
  .qr-page-bg{background-image:url('https://www.mp3quran.net/img/quran_bg.jpg');background-size:cover;background-position:center;border-radius:var(--r-lg);padding:22px;position:relative}
  .qr-page-bg::before{content:'';position:absolute;inset:0;background:${dark? "rgba(10,10,20,.83)":"rgba(255,252,240,.88)"};border-radius:var(--r-lg);z-index:0}
  .qr-page-bg .qr-text{position:relative;z-index:1}

  /* ════════════════════════════════════════════════
     FOCUS MODE
  ════════════════════════════════════════════════ */
  .focus-overlay{position:fixed;inset:0;background:${dark? "#0c0e14":"#faf8f0"};z-index:1500;display:flex;flex-direction:column}
  .focus-topbar{
    background:${dark? "rgba(12,14,20,.98)":"rgba(250,248,240,.98)"};
    border-bottom:2px solid var(--ac);padding:10px 16px;
    display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;
    box-shadow:0 2px 16px rgba(0,0,0,.15);flex-shrink:0;
  }
  .focus-title{font-family:'Amiri',serif;font-size:var(--t-lg);color:var(--ac);font-weight:700;flex-shrink:0}
  .focus-controls{display:flex;align-items:center;gap:6px;flex-wrap:wrap}
  .focus-btn{
    background:${dark? "rgba(255,255,255,.08)":"rgba(0,0,0,.06)"};
    color:var(--tx);border:1.5px solid ${dark? "rgba(255,255,255,.15)":"rgba(0,0,0,.1)"};
    border-radius:var(--r-sm);padding:6px 12px;font-size:var(--t-xs);
    transition:.2s;min-height:32px;white-space:nowrap;
  }
  .focus-btn:hover,.focus-btn.active{background:var(--ac);color:#fff;border-color:var(--ac)}
  .focus-exit{background:#e11d48;color:#fff;border:none;border-radius:var(--r-sm);padding:6px 16px;font-size:var(--t-sm);transition:.2s;min-height:32px}
  .focus-exit:hover{background:#be123c}
  .focus-scroll{flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch}
  .focus-content{max-width:800px;margin:0 auto;padding:24px 20px 100px;width:100%}
  .focus-content .qr-text{line-height:3.4}
  .focus-progress{background:${dark? "rgba(12,14,20,.95)":"rgba(250,248,240,.95)"};border-top:1px solid var(--bdr);padding:8px 18px;display:flex;align-items:center;gap:10px;flex-shrink:0}
  .focus-progress-bar{flex:1;height:4px;background:var(--bdr);border-radius:2px;overflow:hidden}
  .focus-progress-fill{height:100%;background:var(--ac);border-radius:2px;transition:width .4s}
  .focus-progress-lbl{font-size:var(--t-xs);color:var(--txm);white-space:nowrap}
  .focus-page-nav{display:flex;align-items:center;justify-content:center;gap:16px;padding:14px 0}
  .fpn-btn{background:var(--ac);color:#fff;border:none;border-radius:50%;width:44px;height:44px;font-size:22px;font-weight:700;cursor:pointer;transition:.18s;flex-shrink:0;display:flex;align-items:center;justify-content:center;box-shadow:var(--sh-ac)}
  .fpn-btn:disabled{opacity:.25;cursor:not-allowed;box-shadow:none}
  @media(max-width:767px){.fpn-btn{display:none!important}}
  .fpn-label{font-size:var(--t-sm);color:var(--txm);min-width:64px;text-align:center}
  .fpn-hint{text-align:center;font-size:10px;color:var(--txm);margin-bottom:8px;opacity:.55}
  .focus-auto-bk-toast{position:fixed;bottom:70px;right:14px;background:var(--ac);color:#fff;border-radius:var(--r-lg);padding:9px 16px;font-size:var(--t-xs);z-index:3000;box-shadow:var(--sh-md);animation:toastIn .3s ease;display:flex;align-items:center;gap:6px}

  .swipe-page-wrap{touch-action:pan-y;user-select:none;min-height:40vh;transition:opacity .18s}
  .swipe-hint{text-align:center;font-size:var(--t-xs);color:var(--txm);padding:4px 0 4px;opacity:.55}
  .nb2-wrap{display:flex;justify-content: space-between;align-items: center;}
  @media(min-width:768px){.swipe-hint{display:none}}

  .resume-bk-banner{background:linear-gradient(135deg,var(--ac),var(--ac2));color:#fff;border-radius:var(--r-lg);padding:12px 16px;margin-bottom:14px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;box-shadow:var(--sh-ac)}
  .resume-bk-banner p{font-size:var(--t-sm);opacity:.95}
  .resume-bk-btn{background:rgba(255,255,255,.18);color:#fff;border:1.5px solid rgba(255,255,255,.4);border-radius:var(--r-md);padding:6px 14px;font-size:var(--t-sm);font-weight:700;transition:.2s;min-height:34px;white-space:nowrap;cursor:pointer}
  .resume-bk-btn:hover{background:rgba(255,255,255,.3)}

  /* ════════════════════════════════════════════════
     TAFSIR POPUP
  ════════════════════════════════════════════════ */
  .tafsir-popup-overlay{
    position:fixed;inset:0;background:rgba(0,0,0,.65);z-index:9999;
    display:flex;align-items:flex-end;justify-content:center;
    animation:fadeIn .2s ease;backdrop-filter:blur(6px);
  }
  @media(min-width:600px){.tafsir-popup-overlay{align-items:center;padding:16px}}
  .tafsir-popup{
    background:var(--card);border-radius:var(--r-xl) var(--r-xl) 0 0;
    width:100%;max-width:720px;max-height:94vh;
    overflow:hidden;display:flex;flex-direction:column;
    animation:slideUp2 .32s cubic-bezier(.22,1,.36,1);
    box-shadow:var(--sh-lg);
  }
  @media(min-width:600px){.tafsir-popup{border-radius:var(--r-xl);max-height:84vh}}
  .tp-drag-handle{width:44px;height:4px;background:var(--bdr2);border-radius:2px;margin:12px auto 0;flex-shrink:0}
  .tp-header{
    background:linear-gradient(135deg,var(--ac),var(--ac2,var(--ac)));
    color:#fff;padding:14px 18px;
    display:flex;justify-content:space-between;align-items:center;
    flex-shrink:0;gap:8px;
  }
  .tp-header-center{display:flex;align-items:center;gap:8px;flex:1;min-width:0;justify-content:center}
  .tp-header h3{font-family:'Amiri',serif;font-size:var(--t-md);font-weight:700;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:center}
  .tp-header-actions{display:flex;gap:6px;align-items:center;flex-shrink:0}
  .tp-close{background:rgba(255,255,255,.18);border:none;color:#fff;border-radius:50%;width:32px;height:32px;font-size:14px;display:flex;align-items:center;justify-content:center;transition:.2s;cursor:pointer}
  .tp-close:hover{background:rgba(255,255,255,.3)}
  .tp-save-btn{background:rgba(255,255,255,.15);border:1.5px solid rgba(255,255,255,.35);color:#fff;border-radius:var(--r-sm);padding:5px 12px;font-size:13px;cursor:pointer;transition:.2s}
  .tp-save-btn.saved{background:rgba(255,255,255,.28)}
  .tp-nav-btn{background:rgba(255,255,255,.15);border:none;color:#fff;border-radius:var(--r-sm);width:30px;height:30px;font-size:17px;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:.2s}
  .tp-nav-btn:hover{background:rgba(255,255,255,.3)}
  .tp-ayah{
    padding:18px 20px;direction:rtl;
    font-family:var(--qfont,'Amiri',serif);
    font-size:clamp(17px,4.5vw,23px);line-height:2.7;
    color:var(--tx);border-bottom:1px solid var(--bdr);
    flex-shrink:0;text-align:justify;
    background:${dark? "linear-gradient(180deg,rgba(255,255,255,.025),transparent)":"linear-gradient(180deg,rgba(0,0,0,.015),transparent)"};
  }
  .tp-ayah-actions{
    display:flex;align-items:center;gap:6px;
    padding:10px 14px;border-bottom:1px solid var(--bdr);
    flex-shrink:0;flex-wrap:wrap;background:var(--item);
  }
  .tp-action-btn{
    background:var(--card);border:1px solid var(--bdr);
    border-radius:var(--r-full);padding:5px 14px;
    font-size:var(--t-xs);color:var(--tx);cursor:pointer;transition:.2s;white-space:nowrap;
  }
  .tp-action-btn:hover{background:var(--ac);color:#fff;border-color:var(--ac)}
  .tp-action-btn-active{background:var(--ac)!important;color:#fff!important;border-color:var(--ac)!important}
  .tp-ayah-ref{margin-right:auto;font-size:var(--t-xs);color:var(--txm);white-space:nowrap}
  .tp-tabs{display:flex;gap:0;flex-shrink:0;background:var(--bg);border-bottom:1px solid var(--bdr);padding:0 14px;overflow-x:auto;scrollbar-width:none}
  .tp-tabs::-webkit-scrollbar{display:none}
  .tp-tab{flex-shrink:0;padding:11px 15px;border:none;background:transparent;font-size:var(--t-xs);color:var(--txm);transition:.2s;cursor:pointer;border-bottom:3px solid transparent;margin-bottom:-1px;white-space:nowrap}
  .tp-tab.active{color:var(--ac);border-bottom-color:var(--ac);font-weight:700}
  .tp-body{padding:18px;overflow-y:auto;flex:1;direction:rtl;line-height:2.1;color:var(--tx)}
  .tp-body strong{color:var(--ac);display:block;margin-bottom:8px;font-family:'Amiri',serif;font-size:var(--t-md)}
  .tp-tafsir-label{display:flex;align-items:center;gap:8px;font-family:'Amiri',serif;font-size:var(--t-md);color:var(--ac);font-weight:700;margin-bottom:14px;padding-bottom:10px;border-bottom:1px solid var(--bdr)}
  .tp-tafsir-label::before{content:'📖';font-size:18px}
  .tp-tafsir-text{font-size:var(--t-sm);line-height:2.5;color:var(--tx);direction:rtl;text-align:justify;background:var(--item);border-radius:var(--r-lg);padding:16px 18px;border:1px solid var(--bdr)}
  .tp-translation{padding:6px 0 10px;border-top:1px solid var(--bdr);margin-top:10px;color:var(--txm);font-size:var(--t-sm);line-height:1.9;direction:ltr;text-align:left}
  .tp-translation strong{color:var(--ac);display:block;margin-bottom:4px;direction:rtl;text-align:right;font-family:'Amiri',serif;font-size:var(--t-md)}
  .tp-audio-wrap{padding:12px 0}
  .tp-audio-wrap audio{width:100%;border-radius:var(--r-lg);margin-top:8px;accent-color:var(--ac)}
  .tp-audio-wrap p{font-size:var(--t-sm);color:var(--txm);margin-bottom:8px}
  .tp-reciter-list{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px}
  .tp-reciter-btn{background:var(--item);border:1.5px solid var(--bdr);border-radius:var(--r-md);padding:10px 8px;font-size:var(--t-xs);color:var(--tx);transition:.2s;text-align:center;cursor:pointer}
  .tp-reciter-btn:hover,.tp-reciter-btn.active{background:var(--ac);color:#fff;border-color:var(--ac)}
  .tr-line{direction:ltr;text-align:left;font-size:var(--t-xs);color:var(--txm);line-height:1.7;padding:2px 4px 4px;display:block}
  .tr-toggle-row{display:flex;gap:7px;flex-wrap:wrap;margin-bottom:10px;align-items:center}
  .tr-badge{font-size:var(--t-xs);background:var(--item);border:1px solid var(--bdr);border-radius:var(--r-full);padding:5px 13px;color:var(--tx);transition:.2s;cursor:pointer;white-space:nowrap}
  .tr-badge.active{background:var(--ac);color:#fff;border-color:var(--ac)}

  /* ════════════════════════════════════════════════
     CARDS & WIDGETS — VERSE OF HOUR, DUA
  ════════════════════════════════════════════════ */
  .voh-card{
    background:linear-gradient(135deg,var(--ac),var(--ac2,var(--ac)));
    border-radius:var(--r-lg);padding:20px 18px;color:#fff;margin-top:12px;text-align:center;
    box-shadow:var(--sh-ac);
  }
  .voh-label{font-size:var(--t-xs);opacity:.8;margin-bottom:12px;font-weight:700;letter-spacing:.5px}
  .voh-text{font-family:'Amiri',serif;font-size:clamp(17px,4.5vw,23px);line-height:2.3;margin-bottom:8px}
  .voh-ref{font-size:var(--t-xs);opacity:.7;margin-bottom:10px}
  .voh-en{font-size:var(--t-xs);opacity:.85;direction:ltr;text-align:left;background:rgba(0,0,0,.15);border-radius:var(--r-md);padding:10px 14px;margin-bottom:12px;line-height:1.7}
  .voh-toggle{background:rgba(255,255,255,.18);border:1.5px solid rgba(255,255,255,.35);color:#fff;border-radius:var(--r-full);padding:5px 16px;font-size:var(--t-xs);cursor:pointer;transition:.2s}
  .voh-toggle:hover{background:rgba(255,255,255,.3)}

  .dua-card{
    background:var(--card2);
    border-radius:var(--r-lg);padding:18px;
    border:1px solid var(--bdr);margin-top:12px;
  }
  .dua-card-label{font-size:var(--t-xs);color:var(--ac);font-weight:700;margin-bottom:10px;display:flex;align-items:center;gap:6px}
  .dua-card-text{font-family:'Amiri',serif;font-size:clamp(15px,4vw,19px);color:var(--tx);line-height:2.4;text-align:center;margin-bottom:8px}
  .dua-card-source{font-size:var(--t-xs);color:var(--ac);text-align:center;margin-bottom:10px;font-weight:600}
  .dua-card-en{font-size:var(--t-xs);color:var(--txm);direction:ltr;text-align:left;line-height:1.7;padding:10px 14px;background:var(--item);border-radius:var(--r-md);margin-bottom:10px;border-right:3px solid var(--ac)}
  .dua-card-actions{display:flex;gap:8px;justify-content:center}
  .dua-card-actions button{background:var(--card);border:1px solid var(--bdr);border-radius:var(--r-full);padding:6px 16px;font-size:var(--t-xs);color:var(--tx);cursor:pointer;transition:.2s}
  .dua-card-actions button:hover{background:var(--ac);color:#fff;border-color:var(--ac)}

  /* ════════════════════════════════════════════════
     MUTASHABIHAT
  ════════════════════════════════════════════════ */
  .mutashabihat-wrap{padding:4px 0}
  .ms-search{display:flex;margin-bottom:14px;border-radius:var(--r-lg);overflow:hidden;border:1px solid var(--bdr);background:var(--card)}
  .ms-search input{flex:1;border:none;outline:none;padding:12px 16px;background:transparent;color:var(--tx);font-size:var(--t-sm);direction:rtl}
  .ms-search button{background:var(--ac);color:#fff;border:none;padding:12px 20px;font-size:var(--t-sm);cursor:pointer;transition:.2s;white-space:nowrap;font-weight:600}
  .ms-search button:hover{filter:brightness(1.1)}
  .ms-result-group{margin-bottom:20px}
  .ms-group-title{font-size:var(--t-sm);color:var(--ac);font-weight:700;margin-bottom:10px;padding:9px 14px;background:var(--ac)12;border-radius:var(--r-md);border-right:3px solid var(--ac)}
  .ms-card{background:var(--card);border-radius:var(--r-lg);padding:14px 16px;margin-bottom:8px;border:1px solid var(--bdr);box-shadow:var(--sh-sm);transition:.2s}
  .ms-card:hover{border-color:var(--ac)44;box-shadow:var(--sh-md)}
  .ms-card-text{font-family:'Amiri',serif;font-size:var(--t-lg);line-height:2.5;color:var(--tx);margin-bottom:6px;direction:rtl}
  .ms-highlight{background:${dark? "rgba(255,200,0,.22)":"rgba(255,200,0,.38)"};border-radius:3px;padding:0 3px}
  .ms-card-meta{font-size:var(--t-xs);color:var(--ac);font-weight:600}
  .ms-empty{text-align:center;padding:40px;color:var(--txm)}

  /* ════════════════════════════════════════════════
     SKELETON
  ════════════════════════════════════════════════ */
  .skeleton{background:linear-gradient(90deg,var(--item) 25%,var(--item2) 50%,var(--item) 75%);background-size:200% 100%;animation:shimmer 1.4s infinite;border-radius:var(--r-sm)}
  .skel-line{height:13px;margin-bottom:9px;border-radius:4px}
  .skel-line.w100{width:100%} .skel-line.w80{width:80%} .skel-line.w60{width:60%}
  .skel-block{width:100%;height:80px;border-radius:var(--r-md);margin-bottom:9px}

  /* ════════════════════════════════════════════════
     BOTTOM NAVIGATION — REFINED
  ════════════════════════════════════════════════ */
  .bottom-nav{
    display:none;position:fixed;bottom:0;left:0;right:0;z-index:1300;
    background:${dark? "rgba(10,12,22,.96)":"rgba(255,255,255,.96)"};
    backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);
    border-top:1px solid var(--bdr);
    padding:4px 0 max(4px,env(safe-area-inset-bottom,4px));
    box-shadow:0 -2px 20px rgba(0,0,0,.12);
  }
  body.focus-mode-open .bottom-nav{display:none!important}
  @media(max-width:767px){.bottom-nav{display:flex}}
  .bn-item{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:6px 3px;cursor:pointer;transition:all .15s;background:none;border:none;min-height:54px;gap:3px;position:relative}
  .bn-item:active{transform:scale(.9)}
  .bn-icon{font-size:21px;line-height:1;transition:.2s}
  .bn-label{font-size:9px;color:var(--txm);transition:.2s;white-space:nowrap}
  .bn-item.active .bn-icon{transform:translateY(-4px);filter:drop-shadow(0 3px 8px ${theme.accent}aa)}
  .bn-item.active .bn-label{color:var(--ac);font-weight:700}
  .bn-item.active::after{content:'';position:absolute;bottom:4px;width:5px;height:5px;border-radius:50%;background:var(--ac)}

  /* ════════════════════════════════════════════════
     FOOTER
  ════════════════════════════════════════════════ */
  .app-footer{
    background:${dark? "#08091280":"#0e1e3d"};
    color:rgba(255,255,255,.7);
    padding:36px 20px max(80px,calc(env(safe-area-inset-bottom,0px) + 80px));
    margin-top:30px;border-top:2px solid var(--ac);
  }
  @media(min-width:768px){.app-footer{padding-bottom:36px}}
  .footer-inner{max-width:900px;margin:0 auto}
  .footer-logo{font-family:'Aref Ruqaa',serif;font-size:clamp(16px,5vw,22px);color:#f0d060;margin-bottom:4px}
  .footer-tagline{font-size:var(--t-xs);color:rgba(255,255,255,.4);margin-bottom:24px}
  .footer-grid{display:grid;grid-template-columns:1fr 1fr;gap:22px 30px;margin-bottom:24px}
  @media(min-width:600px){.footer-grid{grid-template-columns:repeat(3,1fr)}}
  .footer-col h4{font-family:'Amiri',serif;color:#f0d060;font-size:var(--t-md);margin-bottom:10px;border-bottom:1px solid rgba(240,208,96,.18);padding-bottom:7px}
  .footer-col p,.footer-col a{font-size:var(--t-xs);color:rgba(255,255,255,.5);line-height:2.1;display:block;transition:.2s}
  .footer-col a:hover{color:#f0d060;padding-right:4px}
  .footer-divider{border:none;border-top:1px solid rgba(255,255,255,.08);margin:18px 0}
  .footer-bottom{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px}
  .footer-bottom p{font-size:10px;color:rgba(255,255,255,.3)}
  .footer-developer .dev-name{font-size:var(--t-sm);color:#f0d060!important;font-weight:700;margin-bottom:10px!important}
  .footer-developer .dev-links{display:flex;gap:10px;flex-wrap:wrap;margin-top:4px}
  .footer-developer .dev-links a{display:flex;align-items:center;justify-content:center;width:38px;height:38px;border-radius:50%;background:rgba(255,255,255,.07);color:rgba(255,255,255,.65)!important;font-size:16px;border:1px solid rgba(255,255,255,.12);transition:.25s}
  .footer-developer .dev-links a:hover{background:var(--ac);color:#fff!important;border-color:var(--ac);transform:translateY(-3px);box-shadow:var(--sh-ac)}
  .footer-developer .dev-links a:hover{padding-right:0}

  /* ════════════════════════════════════════════════
     NIGHT MODE
  ════════════════════════════════════════════════ */
  .night-mode .qr-text{color:#3d2a1a!important;background:transparent}
  .night-mode .qr-page-bg{background:linear-gradient(135deg,#f5e6c8,#f0ddb5)!important}
  .night-mode .ayah-unit:hover{background:rgba(100,60,20,.1)!important}
  .night-mode{--tx:#3d2a1a;--txm:rgba(61,42,26,.55);--item:#f5e6c8;--item2:#f0ddb5;--card:#faf0dc;--bg:#faf0dc;--bdr:#d4a96a}
  .dark-night-mode .night-mode{--tx:#e8c97a!important;--txm:rgba(232,201,122,.55)!important;--bg:#100d06!important;--card:#1b1710!important;--item:#231e12!important;--bdr:#4a3a18!important}
  .dark-night-mode .night-mode .qr-text{color:#e8c97a!important}
  .dark-night-mode .night-mode .qr-page-bg{background:linear-gradient(135deg,#2a2010,#1e1808)!important}

  /* ════════════════════════════════════════════════
     AUTO-BOOKMARK
  ════════════════════════════════════════════════ */
  .resume-fixed{
    position:fixed;top:0;left:50%;transform:translateX(-50%);
    display:flex;align-items:center;gap:10px;
    background:var(--card);border:1.5px solid var(--ac);border-radius:var(--r-lg);
    padding:11px 16px;z-index:3500;
    box-shadow:var(--sh-lg);
    animation:slideUp .3s cubic-bezier(.22,1,.36,1);
    max-width:calc(100vw - 24px);width:max-content;
  }
  @media(min-width:600px){.resume-fixed{bottom:22px}}
  .rf-icon{font-size:20px;flex-shrink:0}
  .rf-text{display:flex;flex-direction:column;gap:1px;min-width:0}
  .rf-text strong{font-size:var(--t-sm);color:var(--tx);white-space:nowrap}
  .rf-ago{font-size:10px;color:var(--txm)}
  .rf-go{background:var(--ac);color:#fff;border:none;border-radius:var(--r-md);padding:7px 14px;font-size:var(--t-xs);font-weight:700;cursor:pointer;white-space:nowrap;flex-shrink:0}
  .rf-x{background:transparent;border:1.5px solid var(--bdr);color:var(--txm);border-radius:var(--r-sm);padding:6px 9px;font-size:13px;cursor:pointer;flex-shrink:0;line-height:1}
  .autobk-toast{position:fixed;bottom:120px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,.76);color:#fff;border-radius:var(--r-full);padding:7px 20px;font-size:var(--t-xs);z-index:4000;white-space:nowrap;animation:toastIn .3s ease;pointer-events:none}

  .nav-bar{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:14px;flex-wrap:wrap}
  .c-lbl{font-size:var(--t-xs);color:var(--txm);flex:1;text-align:center}

  /* ══════════════════════════════════════
     READING TOOLBAR v4 — Unified single bar
  ══════════════════════════════════════ */
  .rtb4-wrap{margin-bottom:12px;direction:rtl}
  .rtb4-bar{
    display:flex;align-items:center;
    background:var(--card);
    border:1.5px solid var(--bdr);
    border-radius:var(--r-full);
    padding:4px 6px;
    box-shadow:var(--sh-md);
    gap:4px;
    margin-top: 4px;
  }
  /* Side containers */
  .rtb4-side{display:flex;align-items:center;gap:3px;flex-shrink:0}
  .rtb4-side-l{flex-direction:row}

  /* Back button */
  .rtb4-back{
    background:var(--item);color:var(--tx);
    border:1.5px solid var(--bdr);border-radius:var(--r-full);
    width:34px;height:34px;font-size:15px;
    cursor:pointer;transition:.18s;display:flex;align-items:center;justify-content:center;
    flex-shrink:0;font-weight:700;
  }
  .rtb4-back:hover{background:var(--ac);color:#fff;border-color:var(--ac)}

  /* Prev/Next nav buttons */
  .rtb4-nav-btn{
    background:linear-gradient(135deg,var(--ac),var(--ac2));
    color:#fff;border:none;border-radius:var(--r-full);
    width:36px;height:36px;font-size:18px;
    cursor:pointer;transition:.18s;display:flex;align-items:center;justify-content:center;
    box-shadow:0 2px 8px var(--ac)33;flex-shrink:0;font-weight:900;
  }
  .rtb4-nav-btn:hover{transform:scale(1.08);box-shadow:0 4px 14px var(--ac)44}
  .rtb4-nav-btn:active{transform:scale(.93)}
  .rtb4-nav-btn:disabled{opacity:.28;cursor:not-allowed;transform:none;box-shadow:none}

  /* Center clickable label */
  .rtb4-center{
    flex:1;min-width:0;
    display:flex;align-items:center;justify-content:center;gap:6px;
    background:none;border:none;cursor:pointer;
    padding:6px 8px;border-radius:var(--r-lg);transition:.15s;
  }
  .rtb4-center:hover{background:var(--item)}
  .rtb4-label{
    font-family:'Tajawal',sans-serif;font-size:13px;font-weight:800;
    color:var(--tx);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:140px;
  }
  .rtb4-pct{
    font-family:'Tajawal',sans-serif;font-size:10px;font-weight:700;
    color:var(--ac);background:var(--ac)18;border-radius:20px;padding:1px 7px;flex-shrink:0;
  }
  .rtb4-arrow{font-size:14px;color:var(--txm);transition:transform .2s;flex-shrink:0}
  .rtb4-arrow.open{transform:rotate(180deg)}

  /* Font size mini control */
  .rtb4-fs-mini{
    display:flex;align-items:center;gap:2px;
    background:var(--item);border:1px solid var(--bdr);
    border-radius:var(--r-full);padding:3px 6px;flex-shrink:0;
  }
  .rtb4-fs-mini button{
    background:none;border:none;color:var(--ac);
    font-size:15px;font-weight:900;cursor:pointer;
    padding:0 3px;line-height:1;transition:.15s;
  }
  .rtb4-fs-mini button:hover{transform:scale(1.25)}
  .rtb4-fs-mini span{
    font-family:'Tajawal',sans-serif;font-size:11px;
    font-weight:700;color:var(--tx);min-width:22px;text-align:center;
  }

  /* Progress bar */
  .rtb4-progress{
    height:3px;background:var(--bdr);border-radius:3px;
    overflow:hidden;margin-top:4px;
  }
  .rtb4-progress-fill{
    height:100%;background:linear-gradient(90deg,var(--ac),var(--ac2));
    border-radius:3px;transition:width .5s ease;
  }

  /* Expandable panel */
  .rtb4-panel{
    background:var(--card);border:1.5px solid var(--bdr);
    border-radius:var(--r-xl);padding:12px 14px;
    margin-top:6px;animation:fadeInScale .15s ease;
    box-shadow:var(--sh-md);
  }
  .rtb4-panel-row{display:flex;flex-wrap:wrap;gap:7px;direction:rtl}
  .rtb4-pill-btn{
    display:flex;align-items:center;gap:5px;
    background:var(--item);color:var(--txm);
    border:1.5px solid var(--bdr);border-radius:var(--r-full);
    padding:7px 14px;font-family:'Tajawal',sans-serif;
    font-size:12px;font-weight:600;cursor:pointer;transition:.18s;white-space:nowrap;
  }
  .rtb4-pill-btn:hover{border-color:var(--ac);color:var(--ac);background:var(--ac)0f}
  .rtb4-pill-btn.on{background:var(--ac);color:#fff;border-color:var(--ac);box-shadow:0 2px 10px var(--ac)33}

  @media(max-width:400px){
    .rtb4-label{max-width:90px;font-size:12px}
    .rtb4-nav-btn{width:32px;height:32px;font-size:16px}
  }

  /* ══════════════════════════════════════
     READING TOOLBAR v3 — Sleek floating bar
  ══════════════════════════════════════ */
  .rtb-wrap{position:relative;margin-bottom:12px}

  /* Main pill bar — always visible */
  .rtb-bar{
    display:flex;align-items:center;gap:6px;
    background:var(--card);border:1.5px solid var(--bdr);
    border-radius:var(--r-full);padding:5px 8px;
    box-shadow:var(--sh-md);direction:rtl;flex-wrap:nowrap;
    overflow-x:auto;scrollbar-width:none;
  }
  .rtb-bar::-webkit-scrollbar{display:none}

  /* Back button */
  .rtb-back{
    display:flex;align-items:center;gap:5px;
    background:var(--item);color:var(--tx);
    border:1.5px solid var(--bdr);border-radius:var(--r-full);
    padding:7px 14px;font-family:'Tajawal',sans-serif;
    font-size:12px;font-weight:700;cursor:pointer;
    transition:.18s;white-space:nowrap;flex-shrink:0;
  }
  .rtb-back:hover{background:var(--ac);color:#fff;border-color:var(--ac)}

  /* Label chip in the bar */
  .rtb-label-chip{
    display:flex;align-items:center;gap:5px;
    background:linear-gradient(135deg,var(--ac)18,var(--ac2)18);
    border:1.5px solid var(--ac)44;
    border-radius:var(--r-full);padding:6px 14px;
    font-family:'Tajawal',sans-serif;font-size:12px;
    font-weight:800;color:var(--ac);white-space:nowrap;flex-shrink:0;
  }

  /* Divider */
  .rtb-divider{width:1px;height:24px;background:var(--bdr);flex-shrink:0;margin:0 2px}

  /* Icon action buttons */
  .rtb-icon-btn{
    display:flex;align-items:center;justify-content:center;
    background:var(--item);border:1.5px solid transparent;
    border-radius:var(--r-full);width:34px;height:34px;
    font-size:15px;cursor:pointer;transition:.18s;flex-shrink:0;
    position:relative;
  }
  .rtb-icon-btn:hover{background:var(--ac)15;border-color:var(--ac)44;transform:scale(1.08)}
  .rtb-icon-btn.on{background:var(--ac);border-color:var(--ac);box-shadow:0 2px 10px var(--ac)44}
  .rtb-icon-btn.on::after{display:none}

  /* Font size control */
  .rtb-fs-pill{
    display:flex;align-items:center;gap:4px;
    background:var(--item);border:1.5px solid var(--bdr);
    border-radius:var(--r-full);padding:3px 8px;flex-shrink:0;
  }
  .rtb-fs-pill button{
    background:none;border:none;color:var(--ac);font-size:16px;
    cursor:pointer;padding:0 3px;line-height:1;transition:.15s;font-weight:900;
  }
  .rtb-fs-pill button:hover{transform:scale(1.2)}
  .rtb-fs-pill span{
    font-family:'Tajawal',sans-serif;font-size:11px;font-weight:700;
    color:var(--tx);min-width:26px;text-align:center;
  }

  /* Tooltip on hover */
  .rtb-icon-btn[data-tip]:hover::before{
    content:attr(data-tip);
    position:absolute;bottom:calc(100% + 6px);left:50%;transform:translateX(-50%);
    background:rgba(0,0,0,.8);color:#fff;
    font-family:'Tajawal',sans-serif;font-size:10px;
    white-space:nowrap;padding:3px 8px;border-radius:6px;
    pointer-events:none;z-index:100;
  }

  /* Old compat */
  .rtb-btn{
    background:var(--item);color:var(--tx);border:1px solid var(--bdr);
    border-radius:var(--r-md);padding:6px 12px;font-size:var(--t-xs);
    display:inline-flex;align-items:center;gap:5px;transition:.18s;
    min-height:32px;cursor:pointer;white-space:nowrap;
  }
  .rtb-btn:hover,.rtb-btn.active{background:var(--ac);color:#fff;border-color:var(--ac)}
  .rtb-panel{display:flex;flex-direction:column;gap:8px;background:var(--card);border:1px solid var(--bdr);border-radius:var(--r-lg);padding:12px 14px;margin-top:4px;animation:fadeInScale .15s ease;box-shadow:var(--sh-sm)}
  .rtb-row{display:flex;gap:6px;flex-wrap:wrap;align-items:center}
  .rtb-fs{display:flex;align-items:center;gap:6px;background:var(--item);border:1px solid var(--bdr);border-radius:var(--r-md);padding:4px 10px}
  .rtb-fs-val{font-size:var(--t-xs);color:var(--ac);font-weight:700;min-width:32px;text-align:center}
  .rtb-fs-btn{background:var(--ac);color:#fff;border:none;border-radius:var(--r-sm);width:26px;height:26px;font-size:14px;cursor:pointer;display:flex;align-items:center;justify-content:center}
  .rtb-hint{font-size:10px;color:var(--txm);padding:2px 4px}
  .rtb-fixed-gear{position:fixed;top:60px;left:10px;z-index:1200;background:var(--card);border:1.5px solid var(--bdr);border-radius:50%;width:40px;height:40px;display:flex;align-items:center;justify-content:center;font-size:17px;cursor:pointer;box-shadow:0 2px 12px rgba(0,0,0,.18);transition:.2s;backdrop-filter:blur(8px)}
  .rtb-fixed-gear:hover{transform:rotate(60deg);border-color:var(--ac)}
  @media(min-width:768px){.rtb-fixed-gear{top:74px;left:16px;width:44px;height:44px}}

  /* ─── Reader top nav ─── */
  .reader-nav-bar{
    display:flex;align-items:center;justify-content:space-between;
    background:var(--card);border:1px solid var(--bdr);
    border-radius:var(--r-xl);padding:8px 12px;margin-bottom:10px;gap:8px;
  }
  .rnb-label{font-family:'Tajawal',sans-serif;font-size:var(--t-sm);color:var(--txm);font-weight:600;flex:1;text-align:center;}
  .rnb-btn{
    background:var(--ac);color:#fff;border:none;border-radius:var(--r-full);
    padding:7px 14px;font-family:'Tajawal',sans-serif;font-size:var(--t-xs);
    font-weight:700;cursor:pointer;transition:.15s;white-space:nowrap;flex-shrink:0;
  }
  .rnb-btn:hover:not(:disabled){filter:brightness(1.1);transform:translateY(-1px);}
  .rnb-btn:disabled{opacity:.3;cursor:default;transform:none;}

  /* ─── Reader footer nav ─── */
  .reader-footer-nav{
    display:flex;align-items:center;justify-content:space-between;
    padding:10px 14px;margin-top:20px;
    background:var(--card);border:1.5px solid var(--bdr);
    border-radius:var(--r-xl);gap:8px;
    box-shadow:var(--sh-lg);backdrop-filter:blur(12px);
  }
  @media(max-width:767px){
    .reader-footer-nav{
      position:fixed;bottom:-50px;left:0;right:0;
      border-radius:0;border-left:none;border-right:none;border-bottom:none;
      padding:9px 16px;z-index:1100;margin-top:0;
    }
    /* Extra bottom padding on reading pages to prevent content hidden behind footer */
    .pages-wrap,.qr-page-bg{padding-bottom:120px;}
  }
  .rfn-label{
    font-family:'Tajawal',sans-serif;font-size:var(--t-xs);color:var(--txm);
    font-weight:600;flex:1;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
  }
  .rfn-btn{
    background:var(--item);border:1.5px solid var(--bdr);border-radius:var(--r-full);
    padding:8px 16px;font-family:'Tajawal',sans-serif;font-size:var(--t-sm);
    font-weight:700;cursor:pointer;color:var(--tx);transition:.18s;white-space:nowrap;flex-shrink:0;
  }
  .rfn-btn:hover:not(:disabled){background:var(--ac);color:#fff;border-color:var(--ac);transform:translateY(-1px);}
  .rfn-btn:active:not(:disabled){transform:translateY(0);}
  .rfn-btn:disabled{opacity:.28;cursor:default;}

  /* ─── Pages settings panel ─── */
  .pg-settings-btn{
    background:var(--item);border:1.5px solid var(--bdr);border-radius:var(--r-md);
    padding:8px 11px;font-size:15px;cursor:pointer;transition:.15s;flex-shrink:0;
  }
  .pg-settings-btn:hover{border-color:var(--ac);}
  .pg-settings-panel{
    background:var(--card);border:1.5px solid var(--bdr);border-radius:var(--r-xl);
    padding:14px 16px;margin-bottom:12px;display:flex;flex-direction:column;gap:10px;
    animation:fadeInScale .18s ease;box-shadow:var(--sh-sm);
  }
  .pg-settings-row{
    display:flex;align-items:center;gap:10px;flex-wrap:wrap;
    font-family:'Tajawal',sans-serif;font-size:var(--t-sm);color:var(--tx);
  }
  .pg-settings-row button{
    background:var(--item);border:1.5px solid var(--bdr);border-radius:var(--r-md);
    padding:6px 13px;font-family:'Tajawal',sans-serif;font-size:var(--t-xs);
    cursor:pointer;color:var(--tx);transition:.15s;
  }
  .pg-settings-row button:hover{border-color:var(--ac);color:var(--ac);}
  .pg-tog{background:var(--item)!important;color:var(--txm)!important;}
  .pg-tog-on,.pg-saved-btn{background:var(--ac)!important;color:#fff!important;border-color:var(--ac)!important;}
  .pg-save-btn{background:var(--item);}

  /* ─── Tracker weekly chart ─── */
  .tracker-motivation{
    background:linear-gradient(135deg,var(--ac)15,var(--ac2)10);
    border:1px solid var(--ac)40;border-radius:var(--r-xl);
    padding:10px 16px;text-align:center;margin-bottom:14px;
    font-family:'Tajawal',sans-serif;font-size:var(--t-sm);
    color:var(--ac);font-weight:700;
  }
  .twc-wrap{
    background:var(--card);border:1px solid var(--bdr);border-radius:var(--r-xl);
    padding:14px 16px;margin-bottom:14px;
  }
  .twc-title{font-family:'Tajawal',sans-serif;font-size:var(--t-xs);color:var(--txm);margin-bottom:10px;font-weight:700;}
  .twc-bars{display:flex;align-items:flex-end;gap:5px;height:80px;}
  .twc-col{flex:1;display:flex;flex-direction:column;align-items:center;height:100%;gap:2px;}
  .twc-val{font-family:'Tajawal',sans-serif;font-size:9px;color:var(--txm);min-height:12px;line-height:1.3;}
  .twc-bar{width:100%;background:var(--ac)55;border-radius:4px 4px 0 0;min-height:4px;transition:height .4s cubic-bezier(.22,1,.36,1);}
  .twc-today .twc-bar{background:var(--ac)!important;}
  .twc-today .twc-val,.twc-today .twc-day{color:var(--ac);font-weight:700;}
  .twc-day{font-family:'Tajawal',sans-serif;font-size:9px;color:var(--txm);}

  /* ════════════════════════════════════════════════
     FULL PAGE READER  — Professional Mobile UX
  ════════════════════════════════════════════════ */
  /* ── Container ── */
  .fpr-overlay{
    position:fixed;top:0;left:0;right:0;bottom:0;
    width:100vw;height:100vh;
    z-index:2000;
    display:flex;flex-direction:column;
    overflow:hidden;touch-action:none;
    /* Ensure it covers sticky header and bottom nav */
    margin:0;padding:0;
  }
  /* ── Navbar ── */
  .fpr-navbar{
    display:flex;align-items:center;justify-content:space-between;
    padding:0 14px;
    height:52px;flex-shrink:0;
    background:linear-gradient(135deg,#8b0000 0%,#b71c1c 100%);
    border-bottom:1px solid rgba(255,255,255,.12);
    box-shadow:0 2px 12px rgba(0,0,0,.35);
  }
  /* right side — surah name */
  .fpr-nb-surah{
    font-family:'Amiri','Aref Ruqaa',serif;
    font-size:1.08em;color:#fff;font-weight:700;
    max-width:45vw;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
    text-shadow:0 1px 4px rgba(0,0,0,.4);
  }
  /* center — juz label */
  .fpr-nb-juz{
    font-family:'Tajawal',sans-serif;
    font-size:.88em;color:rgba(255,255,255,.9);
    font-weight:600;letter-spacing:.3px;
    display:flex;align-items:center;gap:6px;
  }
  /* left — dots menu btn */
  .fpr-dots-btn{
    background:rgba(0,0,0,.25);
    border:1px solid rgba(255,255,255,.2);
    color:#fff;border-radius:50%;
    width:36px;height:36px;
    display:flex;align-items:center;justify-content:center;
    font-size:18px;cursor:pointer;transition:.15s;
    flex-shrink:0;
  }
  .fpr-dots-btn:active{background:rgba(255,255,255,.2);transform:scale(.92)}
  .fpr-close-btn{
    background:rgba(0,0,0,.2);border:1px solid rgba(255,255,255,.15);
    color:rgba(255,255,255,.8);border-radius:50%;
    width:32px;height:32px;
    display:flex;align-items:center;justify-content:center;
    font-size:14px;cursor:pointer;transition:.15s;flex-shrink:0;margin-right:6px;
  }
  .fpr-close-btn:active{background:rgba(255,255,255,.2)}

  /* ── Page area — fills remaining height ── */
  .fpr-page{
    flex:1;min-height:0;position:relative;
    display:flex;flex-direction:column;
    height:calc(100vh - 52px - 54px);
    overflow:hidden;
  }
  .fpr-text-wrap{
    flex:1;min-height:0;
    padding:14px 20px 8px;
    overflow:hidden;
    display:flex;
    flex-direction:column;
    justify-content:center;
  }
  .fpr-text-wrap::-webkit-scrollbar{display:none}
  .fpr-text{
    font-family:'Amiri','Aref Ruqaa','Traditional Arabic',serif;
    direction:rtl;text-align:justify;text-align-last:right;
    line-height:2.7;word-break:break-word;overflow-wrap:break-word;
    font-weight:500;width:100%;display:block;
    overflow:hidden;
  }
  .fpr-slide-left{animation:fprLeft .2s cubic-bezier(.4,0,.2,1)}
  .fpr-slide-right{animation:fprRight .2s cubic-bezier(.4,0,.2,1)}
  @keyframes fprLeft{from{opacity:.2;transform:translateX(-20px)}to{opacity:1;transform:translateX(0)}}
  @keyframes fprRight{from{opacity:.2;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}

  /* ── Footer nav ── */
  .fpr-footer{
    display:flex;align-items:center;justify-content:space-between;
    padding:0;flex-shrink:0;
    background:linear-gradient(135deg,#8b0000 0%,#b71c1c 100%);
    border-top:1px solid rgba(255,255,255,.12);
    height:54px;
    box-shadow:0 -2px 12px rgba(0,0,0,.3);
  }
  .fpr-foot-btn{
    flex:0 0 auto;
    width:80px;height:54px;
    display:flex;align-items:center;justify-content:center;
    cursor:pointer;transition:.15s;
    font-family:'Tajawal',sans-serif;font-size:.95em;
    font-weight:700;color:#fff;gap:5px;
    border:none;background:transparent;
    opacity:.9;
  }
  .fpr-foot-btn:active{background:rgba(255,255,255,.12)}
  .fpr-foot-btn:disabled{opacity:.3;cursor:default}
  .fpr-foot-center{
    flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;
    cursor:pointer;
  }
  .fpr-foot-pgnum{
    font-family:'Tajawal',sans-serif;font-weight:800;
    font-size:1.05em;color:#fff;letter-spacing:1px;
    line-height:1.2;
  }
  .fpr-foot-pgof{
    font-family:'Tajawal',sans-serif;font-size:.7em;
    color:rgba(255,255,255,.65);letter-spacing:.5px;
  }

  /* ── Dropdown Menu (3 dots) ── */
  .fpr-dropdown{
    position:absolute;top:52px;left:4px;
    z-index:30;
    min-width:230px;
    background:#1e1e1e;
    border-radius:0 0 var(--r-lg) var(--r-lg);
    border:1px solid rgba(255,255,255,.08);
    border-top:none;
    box-shadow:0 8px 32px rgba(0,0,0,.6);
    overflow:hidden;
    animation:fprDDSlide .2s cubic-bezier(.22,1,.36,1);
  }
  @keyframes fprDDSlide{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}
  .fpr-dd-item{
    display:flex;align-items:center;gap:12px;
    padding:13px 16px;
    cursor:pointer;transition:.1s;
    border-bottom:1px solid rgba(255,255,255,.05);
    direction:rtl;
  }
  .fpr-dd-item:last-child{border-bottom:none}
  .fpr-dd-item:hover,.fpr-dd-item:active{background:rgba(255,255,255,.07)}
  .fpr-dd-item.dd-active{background:rgba(180,20,20,.25)}
  .fpr-dd-icon{font-size:17px;flex-shrink:0;width:22px;text-align:center}
  .fpr-dd-label{
    font-family:'Tajawal',sans-serif;font-size:.88em;
    color:rgba(255,255,255,.9);font-weight:500;flex:1;
  }
  .fpr-dd-item.dd-active .fpr-dd-label{color:#f0c040}
  .fpr-dd-sep{height:1px;background:rgba(255,255,255,.07);margin:2px 0}
  /* inline input row inside dropdown */
  .fpr-dd-input-row{
    padding:10px 14px;
    display:flex;gap:8px;align-items:center;
    background:rgba(0,0,0,.3);
    direction:rtl;
  }
  .fpr-dd-input{
    flex:1;padding:8px 10px;border-radius:var(--r-md);
    border:1px solid rgba(255,255,255,.2);
    background:rgba(255,255,255,.07);
    color:#fff;font-size:.85em;outline:none;text-align:center;
    font-family:'Tajawal',sans-serif;
  }
  .fpr-dd-input::placeholder{color:rgba(255,255,255,.3)}
  .fpr-dd-input:focus{border-color:#f0c040}
  .fpr-dd-go{
    background:linear-gradient(135deg,#f0c040,#c8860a);
    color:#1a0500;border:none;border-radius:var(--r-md);
    padding:8px 12px;font-weight:700;font-size:.82em;cursor:pointer;
    white-space:nowrap;font-family:'Tajawal',sans-serif;
  }
  .fpr-dd-section{
    padding:6px 14px 4px;
    font-family:'Tajawal',sans-serif;font-size:.72em;
    color:rgba(255,255,255,.35);letter-spacing:.5px;
    direction:rtl;
  }
  /* fs controls inline in dropdown */
  .fpr-dd-fs{
    display:flex;align-items:center;gap:8px;padding:10px 14px;
    border-bottom:1px solid rgba(255,255,255,.05);direction:rtl;
  }
  .fpr-dd-fs-lbl{font-family:'Tajawal',sans-serif;font-size:.82em;color:rgba(255,255,255,.6);flex:1}
  .fpr-dd-fs-val{font-family:'Tajawal',sans-serif;font-size:.85em;color:#fff;font-weight:700;min-width:34px;text-align:center}
  .fpr-dd-fs-btn{
    background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.15);
    color:#fff;border-radius:50%;width:28px;height:28px;
    display:flex;align-items:center;justify-content:center;
    font-size:15px;cursor:pointer;transition:.12s;
  }
  .fpr-dd-fs-btn:active{background:rgba(255,255,255,.25)}

  /* ── Toast ── */
  .fpr-toast{
    position:absolute;bottom:64px;left:50%;transform:translateX(-50%);
    background:rgba(240,192,60,.97);color:#1a0500;
    border-radius:var(--r-full);padding:8px 22px;
    font-family:'Tajawal',sans-serif;font-size:.85em;font-weight:700;
    z-index:40;pointer-events:none;
    animation:fprToastIn .25s ease;white-space:nowrap;
    box-shadow:0 4px 20px rgba(0,0,0,.5);
  }
  @keyframes fprToastIn{from{opacity:0;transform:translateX(-50%) translateY(10px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}

  /* ── Loading spinner inside reader ── */
  .fpr-loading{
    flex:1;min-height:0;display:flex;align-items:center;justify-content:center;
    font-family:'Amiri',serif;font-size:2.5em;
    color:rgba(240,192,60,.5);
    animation:pulse 1.5s ease-in-out infinite;
  }

    /* ════════════════════════════════════════════════
     AZKAR — PROFESSIONAL CARDS
  ════════════════════════════════════════════════ */
  .azkar-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;padding:4px 0}
  @media(min-width:480px){.azkar-grid{grid-template-columns:repeat(3,1fr)}}
  .azkar-cat-btn{
    background:linear-gradient(135deg,var(--ac),var(--ac2));
    color:#fff;border:none;border-radius:var(--r-lg);
    padding:20px 12px;text-align:center;cursor:pointer;
    font-size:var(--t-sm);font-weight:700;
    box-shadow:var(--sh-ac);transition:.2s;
    display:flex;flex-direction:column;align-items:center;gap:8px;
    border:1px solid rgba(255,255,255,.15);
  }
  .azkar-cat-btn:hover{transform:translateY(-2px);box-shadow:0 8px 24px ${theme.accent}55}
  .azkar-cat-btn:active{transform:scale(.95)}
  .azkar-cat-icon{font-size:28px}
  .zekr-card{
    background:var(--card);border:1px solid var(--bdr);border-radius:var(--r-xl);
    padding:18px;margin-bottom:14px;transition:.2s;
    position:relative;overflow:hidden;box-shadow:var(--sh-sm);
  }
  .zekr-card:hover{border-color:var(--ac)33;box-shadow:var(--sh-md)}
  .zekr-card.done{border-color:var(--ac);background:linear-gradient(135deg,var(--card),var(--ac)08)}
  .zekr-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--ac),var(--ac2));transform-origin:left;transform:scaleX(var(--progress,0));transition:transform .3s ease}
  .zekr-num{position:absolute;top:12px;left:14px;font-size:10px;color:var(--txm);background:var(--item);border-radius:var(--r-full);padding:2px 9px}
  .zekr-text{font-family:'Amiri','Aref Ruqaa',serif;font-size:1.2em;color:var(--tx);line-height:2.3;direction:rtl;text-align:right;margin:22px 0 10px}
  .zekr-bless{font-size:var(--t-xs);color:var(--txm);background:var(--item);border-radius:var(--r-md);padding:8px 12px;margin-bottom:12px;line-height:1.8;direction:rtl}
  .zekr-footer{display:flex;align-items:center;gap:10px;justify-content:space-between}
  .zekr-counter-btn{background:var(--ac);color:#fff;border:none;border-radius:50%;width:52px;height:52px;font-size:24px;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:var(--sh-ac);transition:.15s;flex-shrink:0}
  .zekr-counter-btn:active{transform:scale(.85)}
  .zekr-counter-btn.done{background:#22c55e;box-shadow:0 4px 14px #22c55e55}
  .zekr-count-display{font-size:var(--t-lg);font-weight:700;color:var(--ac);text-align:center;flex:1;display:flex;flex-direction:column;align-items:center}
  .zekr-count-label{font-size:10px;color:var(--txm);font-weight:400;margin-top:1px}
  .zekr-reset{background:transparent;border:1px solid var(--bdr);color:var(--txm);border-radius:var(--r-sm);padding:5px 10px;font-size:11px;cursor:pointer;transition:.15s}
  .zekr-reset:hover{border-color:var(--ac);color:var(--ac)}

  /* ════════════════════════════════════════════════
     SLEEP TIMER
  ════════════════════════════════════════════════ */
  .sleep-timer-wrap{display:flex;align-items:center;gap:8px;flex-wrap:wrap;background:var(--card);border-radius:var(--r-lg);padding:10px 14px;margin-bottom:12px;border:1px solid var(--bdr)}
  .sleep-timer-label{font-size:var(--t-xs);color:var(--txm);white-space:nowrap}
  .sleep-timer-btn{background:var(--item);border:1px solid var(--bdr);color:var(--tx);border-radius:var(--r-sm);padding:5px 11px;font-size:var(--t-xs);cursor:pointer;transition:.15s}
  .sleep-timer-btn:hover,.sleep-timer-btn.active{background:var(--ac);color:#fff;border-color:var(--ac)}
  .sleep-timer-countdown{font-size:var(--t-sm);color:var(--ac);font-weight:700;margin-right:auto}
  .sleep-timer-cancel{background:transparent;border:none;color:var(--txm);font-size:16px;cursor:pointer;opacity:.7}
  .sleep-timer-cancel:hover{opacity:1;color:#ef4444}

  /* ════════════════════════════════════════════════
     MEMORIZATION MODE
  ════════════════════════════════════════════════ */
  .memo-overlay{position:fixed;inset:0;z-index:1500;background:#0a0a14;display:flex;flex-direction:column;overflow:hidden}
  .memo-header{background:linear-gradient(135deg,#1a1040,#2d1b69);padding:14px 18px;display:flex;align-items:center;gap:10px;border-bottom:1px solid rgba(255,255,255,.1);flex-shrink:0}
  .memo-title{font-size:var(--t-md);color:#fff;font-weight:700;flex:1}
  .memo-exit{background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);color:#fff;border-radius:var(--r-md);padding:7px 14px;cursor:pointer;font-size:var(--t-xs)}
  .memo-body{flex:1;overflow-y:auto;padding:22px 18px;-webkit-overflow-scrolling:touch}
  .memo-ayah-row{direction:rtl;text-align:right;font-family:'Amiri','Aref Ruqaa',serif;font-size:1.3em;line-height:2.9;margin-bottom:14px}
  .memo-word{display:inline-block;margin:0 2px;cursor:pointer;transition:.2s;border-radius:4px;padding:0 2px}
  .memo-word.hidden{background:var(--ac);color:transparent;border-radius:6px;user-select:none;min-width:32px}
  .memo-word.hidden:hover,.memo-word.hidden:active{color:rgba(255,255,255,.9)}
  .memo-controls{background:#1a1040;border-top:1px solid rgba(255,255,255,.1);padding:14px 18px;flex-shrink:0;display:flex;gap:8px;flex-wrap:wrap;align-items:center;justify-content:center}
  .memo-ctrl-btn{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.18);color:#fff;border-radius:var(--r-md);padding:8px 16px;font-size:var(--t-xs);cursor:pointer;transition:.15s}
  .memo-ctrl-btn:hover,.memo-ctrl-btn.active{background:var(--ac);border-color:var(--ac)}
  .memo-progress-lbl{font-size:var(--t-xs);color:rgba(255,255,255,.45);text-align:center;width:100%;margin-top:4px}

  /* ════════════════════════════════════════════════
     WORD TOOLTIP
  ════════════════════════════════════════════════ */
  .word-tooltip{
    position:fixed;bottom:80px;left:50%;transform:translateX(-50%);
    background:var(--card);border:1.5px solid var(--ac);border-radius:var(--r-xl);
    padding:14px 20px;z-index:3800;
    box-shadow:var(--sh-lg);
    min-width:200px;max-width:300px;
    animation:slideUp .2s cubic-bezier(.22,1,.36,1);
    text-align:center;direction:rtl;
  }
  .word-tooltip-ar{font-family:'Amiri','Aref Ruqaa',serif;font-size:1.5em;color:var(--tx);margin-bottom:5px}
  .word-tooltip-en{font-size:var(--t-xs);color:var(--txm);margin-bottom:8px;line-height:1.5}
  .word-tooltip-root{font-size:10px;color:var(--ac);background:var(--ac)15;border-radius:var(--r-full);padding:3px 12px;display:inline-block;margin-bottom:4px}
  .word-tooltip-close{position:absolute;top:8px;left:10px;background:none;border:none;color:var(--txm);font-size:14px;cursor:pointer}

  /* ════════════════════════════════════════════════
     QUIZ — PREMIUM GAME UI
  ════════════════════════════════════════════════ */
  .quiz-home{display:flex;flex-direction:column;align-items:center;padding:36px 18px;text-align:center;gap:16px}
  .quiz-home-icon{font-size:56px;animation:bounceIn .5s cubic-bezier(.22,1,.36,1)}
  .quiz-home-title{font-size:22px;font-weight:700;color:var(--tx);margin:0}
  .quiz-home-sub{color:var(--txm);font-size:var(--t-sm);margin:0}
  .quiz-best{background:var(--ac)15;border:1px solid var(--ac)44;color:var(--ac);border-radius:var(--r-full);padding:7px 20px;font-size:13px;font-weight:600}
  .quiz-count-row{display:flex;gap:14px;margin-top:8px}
  .quiz-count-btn{display:flex;flex-direction:column;align-items:center;background:var(--card);border:2px solid var(--bdr);border-radius:var(--r-lg);padding:16px 22px;cursor:pointer;transition:.2s;gap:4px;box-shadow:var(--sh-sm)}
  .quiz-count-btn:hover{border-color:var(--ac);background:var(--ac)10;transform:translateY(-2px);box-shadow:var(--sh-md)}
  .qcb-num{font-size:26px;font-weight:700;color:var(--ac)}
  .qcb-lbl{font-size:11px;color:var(--txm)}
  .quiz-play{padding:18px}
  .quiz-hdr{margin-bottom:18px}
  .quiz-prog-bar{height:5px;background:var(--item);border-radius:3px;overflow:hidden;margin-bottom:10px}
  .quiz-prog-fill{height:100%;background:linear-gradient(90deg,var(--ac),var(--ac2));border-radius:3px;transition:width .5s cubic-bezier(.22,1,.36,1)}
  .quiz-meta{display:flex;gap:12px;align-items:center;justify-content:space-between}
  .quiz-qnum{font-size:var(--t-xs);color:var(--txm)}
  .quiz-score-live{font-size:var(--t-xs);color:#22c55e;font-weight:700}
  .quiz-streak{font-size:var(--t-xs);color:#f59e0b;font-weight:700;animation:pulse 1s infinite}
  .quiz-question{font-size:17px;font-weight:600;color:var(--tx);background:var(--card);border-radius:var(--r-xl);padding:22px 18px;text-align:center;margin-bottom:18px;line-height:1.7;direction:rtl;border:1px solid var(--bdr);box-shadow:var(--sh-sm)}
  .quiz-opts{display:flex;flex-direction:column;gap:10px}
  .quiz-opt{background:var(--card);border:1.5px solid var(--bdr);border-radius:var(--r-lg);padding:15px 18px;font-size:var(--t-md);color:var(--tx);cursor:pointer;text-align:right;direction:rtl;transition:.2s;box-shadow:var(--sh-sm)}
  .quiz-opt:hover:not(.correct):not(.wrong){border-color:var(--ac);background:var(--ac)0a;transform:translateX(-2px)}
  .quiz-opt.correct{background:#22c55e15;border-color:#22c55e;color:#22c55e;font-weight:600}
  .quiz-opt.wrong{background:#ef444415;border-color:#ef4444;color:#ef4444}
  .quiz-result{display:flex;flex-direction:column;align-items:center;padding:44px 18px;gap:18px;text-align:center}
  .quiz-result-circle{width:120px;height:120px;border-radius:50%;background:conic-gradient(var(--ac) calc(var(--pct)*1%),var(--item) 0);display:flex;flex-direction:column;align-items:center;justify-content:center;box-shadow:0 0 0 8px var(--bg),var(--sh-ac)}
  .qrc-score{font-size:30px;font-weight:700;color:var(--tx)}
  .qrc-total{font-size:13px;color:var(--txm)}
  .quiz-grade{font-size:22px;font-weight:700;color:var(--ac)}
  .quiz-pct{font-size:var(--t-sm);color:var(--txm)}
  .quiz-result-btns{display:flex;gap:12px;flex-wrap:wrap;justify-content:center}
  .quiz-restart-btn,.quiz-home-btn{padding:11px 24px;border-radius:var(--r-full);border:2px solid var(--ac);font-size:14px;cursor:pointer;transition:.2s}
  .quiz-restart-btn{background:var(--ac);color:#fff;box-shadow:var(--sh-ac)}
  .quiz-home-btn{background:transparent;color:var(--ac)}
  .quiz-restart-btn:hover,.quiz-home-btn:hover{transform:translateY(-2px)}

  /* ════════════════════════════════════════════════
     DUAS — ELEGANT CARDS
  ════════════════════════════════════════════════ */
  .duas-wrap{padding:16px}
  .duas-title-row{display:flex;align-items:center;gap:10px;margin-bottom:16px}
  .duas-icon{font-size:28px}
  .duas-title{font-size:var(--t-xl);font-weight:700;color:var(--tx);margin:0}
  .duas-cats{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:18px}
  .duas-cat{background:var(--card);border:1.5px solid var(--bdr);border-radius:var(--r-full);padding:8px 16px;font-size:var(--t-xs);color:var(--txm);cursor:pointer;transition:.2s;display:flex;align-items:center;gap:5px}
  .duas-cat:hover{border-color:var(--ac)55;color:var(--tx)}
  .duas-cat.active{border-color:var(--ac);color:var(--ac);background:var(--ac)12;font-weight:600}
  .duas-list{display:flex;flex-direction:column;gap:14px}
  .dua-card{background:var(--card);border-radius:var(--r-xl);padding:18px;border:1px solid var(--bdr);box-shadow:var(--sh-sm);transition:.2s}
  .dua-card:hover{box-shadow:var(--sh-md)}
  .dua-fav-card{border-color:#ef444455;background:linear-gradient(135deg,var(--card),#ef444406)}
  .dua-ar{font-family:var(--qfont,'Amiri',serif);font-size:19px;line-height:2;color:var(--tx);direction:rtl;text-align:right;margin-bottom:10px}
  .dua-ref{font-size:11px;color:var(--ac);margin-bottom:10px;font-weight:600}
  .dua-en{font-size:12px;color:var(--txm);border-top:1px solid var(--bdr);padding-top:10px;margin-bottom:10px;line-height:1.7;direction:ltr;text-align:left}
  .dua-actions{display:flex;gap:8px;justify-content:flex-end}
  .dua-act-btn{background:var(--item);border:1px solid var(--bdr);border-radius:var(--r-sm);padding:6px 12px;font-size:13px;cursor:pointer;transition:.2s}
  .dua-act-btn:hover{border-color:var(--ac);background:var(--ac)10}
  .dua-act-btn.fav-on{border-color:#ef4444;background:#ef444410}
  .dua-act-btn.copied{background:#22c55e15;border-color:#22c55e}

  /* ════════════════════════════════════════════════
     READING GOALS
  ════════════════════════════════════════════════ */
  .goals-wrap{padding:16px}
  .goals-hdr{display:flex;align-items:center;gap:10px;margin-bottom:16px}
  .goals-icon{font-size:28px}
  .goals-title{font-size:var(--t-xl);font-weight:700;color:var(--tx);margin:0;flex:1}
  .goals-edit-btn{background:var(--item);border:1px solid var(--bdr);border-radius:var(--r-full);padding:7px 16px;font-size:12px;color:var(--txm);cursor:pointer;transition:.2s}
  .goals-edit-btn:hover{border-color:var(--ac);color:var(--ac)}
  .goals-streak-banner{background:linear-gradient(90deg,#f59e0b18,#ef444410);border:1px solid #f59e0b44;border-radius:var(--r-lg);padding:12px 18px;font-size:14px;font-weight:700;color:#f59e0b;margin-bottom:16px;text-align:center;box-shadow:0 2px 12px #f59e0b20}
  .goals-editor{background:var(--card);border-radius:var(--r-xl);padding:18px;margin-bottom:18px;border:1px solid var(--bdr);box-shadow:var(--sh-sm)}
  .goals-editor-title{font-size:14px;font-weight:700;color:var(--tx);margin-bottom:14px}
  .goals-ed-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}
  .goals-ed-label{font-size:13px;color:var(--txm)}
  .goals-ed-input{width:72px;background:var(--item);border:1.5px solid var(--bdr);border-radius:var(--r-md);padding:7px 10px;color:var(--tx);font-size:14px;text-align:center;transition:.2s}
  .goals-ed-input:focus{border-color:var(--ac);outline:none}
  .goals-save-btn{width:100%;background:var(--ac);color:#fff;border:none;border-radius:var(--r-lg);padding:12px;font-size:14px;cursor:pointer;margin-top:8px;font-weight:600;box-shadow:var(--sh-ac);transition:.2s}
  .goals-save-btn:hover{filter:brightness(1.1)}
  .goals-cards{display:flex;flex-direction:column;gap:14px}
  .goal-card{background:var(--card);border-radius:var(--r-xl);padding:18px;border:1px solid var(--bdr);transition:.2s;box-shadow:var(--sh-sm)}
  .goal-card:hover{box-shadow:var(--sh-md)}
  .goal-card.goal-done{border-color:#22c55e55;background:linear-gradient(135deg,var(--card),#22c55e06)}
  .goal-card-top{display:flex;align-items:center;gap:14px;margin-bottom:12px}
  .goal-icon{font-size:26px}
  .goal-info{flex:1}
  .goal-label{font-size:12px;color:var(--txm);margin-bottom:3px}
  .goal-nums{font-size:var(--t-sm);color:var(--tx)}
  .goal-cur{font-weight:700;font-size:20px}
  .goal-check{font-size:22px}
  .goal-bar-bg{height:5px;background:var(--item);border-radius:3px;overflow:hidden;margin-bottom:10px}
  .goal-bar-fill{height:100%;border-radius:3px;transition:width .5s cubic-bezier(.22,1,.36,1)}
  .goal-pct-row{display:flex;align-items:center;justify-content:space-between}
  .goal-pct{font-size:11px;color:var(--txm)}
  .goal-btns{display:flex;gap:7px}
  .goal-btn{background:var(--ac);color:#fff;border:none;border-radius:var(--r-md);padding:6px 14px;font-size:12px;cursor:pointer;font-weight:600;transition:.15s}
  .goal-btn:hover{filter:brightness(1.1)}
  .goal-btn-sm{background:var(--item);color:var(--txm);border:1px solid var(--bdr)}
  .goal-btn-sm:hover{border-color:var(--ac);color:var(--ac);background:var(--card)}
  .goals-tip{text-align:center;font-size:12px;color:var(--txm);margin-top:18px;background:var(--card);border-radius:var(--r-lg);padding:12px;border:1px solid var(--bdr)}

  /* ════════════════════════════════════════════════
     TAJWEED GUIDE
  ════════════════════════════════════════════════ */
  .tajweed-wrap{padding:16px}
  .tajweed-hdr-row{display:flex;align-items:center;gap:10px;margin-bottom:8px}
  .tajweed-title{font-size:var(--t-xl);font-weight:700;color:var(--tx);margin:0}
  .tajweed-intro{font-size:var(--t-xs);color:var(--txm);margin-bottom:18px;line-height:1.7}
  .tajweed-cats{display:flex;gap:7px;flex-wrap:wrap;margin-bottom:20px}
  .tj-cat{background:var(--card);border:1.5px solid var(--bdr);border-radius:var(--r-full);padding:8px 14px;font-size:12px;color:var(--txm);cursor:pointer;transition:.2s}
  .tj-cat:hover{border-color:var(--bdr2)}
  .tj-cat.active{font-weight:600}
  .tj-rules-list{display:flex;flex-direction:column;gap:10px}
  .tj-rule{background:var(--card);border-radius:var(--r-lg);border:1px solid var(--bdr);border-right:4px solid var(--tc);overflow:hidden;transition:.2s;box-shadow:var(--sh-sm)}
  .tj-rule:hover{box-shadow:var(--sh-md)}
  .tj-rule-hdr{display:flex;align-items:center;justify-content:space-between;padding:14px 18px;cursor:pointer;user-select:none}
  .tj-rule-left{display:flex;align-items:center;gap:10px}
  .tj-rule-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0}
  .tj-rule-name{font-size:var(--t-md);font-weight:600;color:var(--tx)}
  .tj-arrow{font-size:11px;color:var(--txs);transition:transform .2s}
  .tj-expanded .tj-arrow{transform:rotate(180deg)}
  .tj-rule-body{padding:0 18px 16px;border-top:1px solid var(--bdr)}
  .tj-desc{font-size:13px;color:var(--txm);line-height:1.8;margin:12px 0}
  .tj-example-row{display:flex;align-items:baseline;gap:10px;background:var(--item);border-radius:var(--r-md);padding:10px 14px;margin-bottom:10px}
  .tj-ex-label{font-size:11px;color:var(--txm);flex-shrink:0}
  .tj-ex-text{font-family:var(--qfont,'Amiri',serif);font-size:18px;color:var(--tx);direction:rtl}
  .tj-tip-row{display:flex;gap:8px;align-items:flex-start}
  .tj-tip-icon{font-size:14px}
  .tj-tip{font-size:12px;color:var(--ac);font-weight:600}

  /* ════════════════════════════════════════════════
     SHARE AYAH CARD
  ════════════════════════════════════════════════ */
  .share-overlay{position:fixed;inset:0;z-index:4500;background:rgba(0,0,0,.8);display:flex;align-items:center;justify-content:center;padding:16px;backdrop-filter:blur(8px)}
  .share-modal{background:var(--card);border-radius:var(--r-xl);padding:22px;width:100%;max-width:640px;max-height:90vh;overflow-y:auto;display:flex;flex-direction:column;gap:16px;box-shadow:var(--sh-lg)}
  .share-modal-hdr{display:flex;justify-content:space-between;align-items:center}
  .share-modal-title{font-size:17px;font-weight:700;color:var(--tx)}
  .share-modal-close{background:var(--item);border:none;border-radius:50%;width:34px;height:34px;font-size:16px;cursor:pointer;color:var(--txm);transition:.2s}
  .share-modal-close:hover{background:var(--ac);color:#fff}
  .share-canvas{width:100%;border-radius:var(--r-lg);box-shadow:var(--sh-lg)}
  .share-ctrl-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
  .share-ctrl-label{font-size:12px;color:var(--txm);white-space:nowrap}
  .share-bgs{display:flex;gap:8px;flex-wrap:wrap}
  .share-bg-btn{width:34px;height:34px;border-radius:50%;border:3px solid transparent;cursor:pointer;transition:.2s}
  .share-bg-btn.active{border-color:var(--ac);transform:scale(1.15)}
  .share-fonts{display:flex;gap:7px;flex-wrap:wrap}
  .share-font-btn{background:var(--item);border:1.5px solid transparent;border-radius:var(--r-md);padding:6px 13px;font-size:12px;color:var(--tx);cursor:pointer;transition:.2s}
  .share-font-btn.active{border-color:var(--ac);color:var(--ac);background:var(--ac)10}
  .share-actions{display:flex;gap:8px;flex-wrap:wrap}
  .share-act-btn{flex:1;padding:11px;border:none;border-radius:var(--r-lg);font-size:13px;cursor:pointer;font-weight:600;min-width:100px;transition:.2s}
  .share-act-btn:hover{transform:translateY(-1px)}
  .share-act-dl{background:var(--ac);color:#fff;box-shadow:var(--sh-ac)}
  .share-act-copy{background:var(--item);color:var(--tx);border:1px solid var(--bdr)}
  .share-act-share{background:linear-gradient(135deg,#4f46e5,#7c3aed);color:#fff}

  /* ════════════════════════════════════════════════
     ANALYTICS
  ════════════════════════════════════════════════ */
  /* ══ ANALYTICS ══ */
  .an-wrap{padding:4px 0}
  .an-hdr{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}
  .an-hdr-left{display:flex;align-items:center;gap:12px;direction:rtl}
  .an-hdr-icon{font-size:30px}
  .an-title{font-family:'Tajawal',sans-serif;font-size:var(--t-xl);font-weight:800;color:var(--tx);margin:0}
  .an-sub{font-family:'Tajawal',sans-serif;font-size:11px;color:var(--txm);margin:2px 0 0}
  .an-kpi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:9px;margin-bottom:14px}
  @media(min-width:500px){.an-kpi-grid{grid-template-columns:repeat(6,1fr)}}
  .an-kpi{background:var(--kbg,var(--card));border:1px solid var(--bdr);border-radius:var(--r-xl);padding:14px 6px;display:flex;flex-direction:column;align-items:center;gap:4px;transition:.2s}
  .an-kpi:hover{transform:translateY(-2px);box-shadow:var(--sh-md)}
  .an-kpi-icon{font-size:21px}
  .an-kpi-val{font-size:21px;font-weight:800;color:var(--kc,var(--ac));line-height:1.1}
  .an-kpi-lbl{font-family:'Tajawal',sans-serif;font-size:9px;color:var(--txm);text-align:center;line-height:1.3}
  .an-card{background:var(--card);border:1px solid var(--bdr);border-radius:var(--r-xl);padding:16px;margin-bottom:12px;box-shadow:var(--sh-sm)}
  .an-card-hdr{font-family:'Tajawal',sans-serif;font-size:13px;font-weight:700;color:var(--tx);margin-bottom:12px;direction:rtl}
  .an-week-chart{display:flex;align-items:flex-end;gap:5px;height:110px}
  .an-wc-col{display:flex;flex-direction:column;align-items:center;flex:1;height:100%;gap:3px}
  .an-wc-val{font-family:'Tajawal',sans-serif;font-size:9px;color:var(--txm)}
  .an-wc-bar-wrap{flex:1;width:100%;display:flex;align-items:flex-end}
  .an-wc-bar{width:100%;border-radius:4px 4px 0 0;min-height:3px;transition:height .5s cubic-bezier(.22,1,.36,1)}
  .an-wc-lbl{font-family:'Tajawal',sans-serif;font-size:9px;color:var(--txm)}
  .an-wc-today .an-wc-lbl{color:var(--ac);font-weight:700}
  .an-hm-dows{display:grid;grid-template-columns:repeat(7,1fr);gap:2px;margin-bottom:4px}
  .an-hm-dow{font-family:'Tajawal',sans-serif;font-size:9px;color:var(--txm);text-align:center}
  .an-hm-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:3px}
  .an-hm-cell{aspect-ratio:1;border-radius:3px;cursor:default;transition:.15s}
  .an-hm-cell:hover{transform:scale(1.25);z-index:2}
  .an-hm-empty{background:transparent!important}
  .an-hm-today{outline:2px solid var(--ac);outline-offset:1px}
  .an-hm-legend{display:flex;align-items:center;gap:5px;justify-content:center;margin-top:10px}
  .an-hm-leg-cell{width:12px;height:12px;border-radius:2px}
  .an-hm-leg-lbl{font-family:'Tajawal',sans-serif;font-size:9px;color:var(--txm)}
  .an-empty{text-align:center;padding:20px;color:var(--txm);font-family:'Tajawal',sans-serif;font-size:var(--t-xs)}
  .an-zero-state{text-align:center;padding:36px 16px;background:var(--card);border:1px solid var(--bdr);border-radius:var(--r-xl)}

  /* ════════════════════════════════════════════════
     CUSTOM THEME CREATOR
  ════════════════════════════════════════════════ */
  .ctc-wrap{padding:16px}
  .ctc-hdr{display:flex;align-items:center;gap:10px;margin-bottom:8px}
  .ctc-title{font-size:var(--t-xl);font-weight:700;color:var(--tx);margin:0}
  .ctc-sub{font-size:var(--t-xs);color:var(--txm);margin-bottom:20px;line-height:1.7}
  .ctc-section-label{font-size:11px;font-weight:700;color:var(--txm);text-transform:uppercase;letter-spacing:.6px;margin-bottom:10px;margin-top:18px}
  .ctc-presets{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:4px}
  @media(min-width:480px){.ctc-presets{grid-template-columns:repeat(8,1fr)}}
  .ctc-preset{display:flex;flex-direction:column;align-items:center;gap:6px;background:none;border:none;cursor:pointer;padding:4px;transition:.15s}
  .ctc-preset:hover{transform:translateY(-2px)}
  .ctc-preset-swatch{width:38px;height:38px;border-radius:50%;border:3px solid var(--bdr);transition:.2s;box-shadow:var(--sh-sm)}
  .ctc-preset:hover .ctc-preset-swatch{transform:scale(1.1);border-color:var(--tx)}
  .ctc-preset-name{font-size:10px;color:var(--txm)}
  .ctc-pickers{display:flex;flex-direction:column;gap:12px}
  .ctc-picker-row{display:flex;align-items:center;justify-content:space-between;background:var(--card);border-radius:var(--r-lg);padding:14px 18px;border:1px solid var(--bdr);transition:.2s}
  .ctc-picker-row:hover{border-color:var(--bdr2)}
  .ctc-picker-label{font-size:14px;color:var(--tx)}
  .ctc-picker-wrap{display:flex;align-items:center;gap:10px}
  .ctc-color-input{width:46px;height:46px;border:none;border-radius:50%;cursor:pointer;padding:0;background:none}
  .ctc-hex{font-size:12px;color:var(--txm);font-family:monospace}
  .ctc-preview{background:var(--card);border-radius:var(--r-lg);overflow:hidden;border:1px solid var(--bdr)}
  .ctc-prev-bar{height:5px;width:100%}
  .ctc-prev-body{padding:18px;display:flex;align-items:center;gap:14px}
  .ctc-prev-btn{padding:9px 18px;border-radius:var(--r-md);font-size:13px;border:none;cursor:default}
  .ctc-prev-text{font-size:14px;font-weight:600}
  .ctc-prev-badge{padding:5px 12px;border-radius:var(--r-full);font-size:12px}
  .ctc-apply-btn{width:100%;padding:14px;border:none;border-radius:var(--r-lg);color:#fff;font-size:15px;font-weight:700;cursor:pointer;margin-top:10px;transition:.3s;box-shadow:var(--sh-md)}
  .ctc-apply-btn:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,.3)}
  .ctc-note{font-size:11px;color:var(--txm);text-align:center;margin-top:8px}

  /* ════════════════════════════════════════════════
     NOTIFICATION CENTER
  ════════════════════════════════════════════════ */
  /* ══ NOTIFICATION CENTER ══ */
  .nc-wrap{padding:4px 0}
  .nc-hdr{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:14px;gap:10px;direction:rtl}
  .nc-hdr-title-row{display:flex;align-items:center;gap:8px}
  .nc-title{font-family:'Tajawal',sans-serif;font-size:var(--t-xl);font-weight:800;color:var(--tx);margin:0}
  .nc-badge{background:var(--ac);color:#fff;border-radius:var(--r-full);padding:2px 9px;font-size:11px;font-weight:700}
  .nc-hdr-actions{display:flex;gap:8px;flex-shrink:0}
  .nc-act-btn{font-family:'Tajawal',sans-serif;background:var(--item);border:1.5px solid var(--bdr);border-radius:var(--r-full);padding:6px 14px;font-size:12px;color:var(--txm);cursor:pointer;transition:.2s}
  .nc-act-btn:hover{border-color:var(--ac);color:var(--ac)}
  .nc-act-danger:hover{border-color:#ef4444;color:#ef4444}
  .nc-perm-banner{background:var(--ac)0f;border:1.5px solid var(--ac)33;border-radius:var(--r-xl);padding:14px 16px;margin-bottom:12px;display:flex;align-items:center;gap:12px;direction:rtl}
  .nc-perm-icon{font-size:28px;flex-shrink:0}
  .nc-perm-body{flex:1}
  .nc-perm-title{font-family:'Tajawal',sans-serif;font-weight:700;color:var(--tx);font-size:var(--t-sm);margin-bottom:3px}
  .nc-perm-sub{font-family:'Tajawal',sans-serif;font-size:10px;color:var(--txm);line-height:1.5}
  .nc-perm-btn{font-family:'Tajawal',sans-serif;background:var(--ac);color:#fff;border:none;border-radius:var(--r-full);padding:9px 18px;font-size:var(--t-xs);font-weight:700;cursor:pointer;flex-shrink:0;box-shadow:var(--sh-ac)}
  .nc-status-bar{display:flex;align-items:center;gap:8px;background:rgba(34,197,94,.08);border:1px solid rgba(34,197,94,.25);border-radius:var(--r-lg);padding:8px 14px;margin-bottom:12px;font-family:'Tajawal',sans-serif;font-size:12px;color:#22c55e;direction:rtl}
  .nc-status-dot{width:7px;height:7px;border-radius:50%;background:#22c55e;flex-shrink:0;animation:ncPulse 2s infinite}
  @keyframes ncPulse{0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,.4)}60%{box-shadow:0 0 0 6px transparent}}
  .nc-filters{display:flex;gap:6px;margin-bottom:12px;overflow-x:auto;padding-bottom:2px;scrollbar-width:none}
  .nc-filters::-webkit-scrollbar{display:none}
  .nc-filter{font-family:'Tajawal',sans-serif;white-space:nowrap;background:var(--item);border:1.5px solid transparent;border-radius:var(--r-full);padding:6px 14px;font-size:12px;color:var(--txm);cursor:pointer;transition:.2s;flex-shrink:0}
  .nc-filter.active{border-color:var(--ac);color:var(--ac);background:var(--ac)10;font-weight:600}
  .nc-empty{text-align:center;padding:40px 16px;background:var(--card);border:1px solid var(--bdr);border-radius:var(--r-xl);margin-bottom:10px}
  .nc-empty-icon{font-size:40px;margin-bottom:10px}
  .nc-empty-txt{font-family:'Tajawal',sans-serif;font-size:var(--t-md);font-weight:700;color:var(--tx);margin:0 0 5px}
  .nc-empty-sub{font-family:'Tajawal',sans-serif;font-size:var(--t-xs);color:var(--txm);margin:0}
  .nc-list{display:flex;flex-direction:column;gap:8px}
  .nc-item{background:var(--card);border-radius:var(--r-xl);padding:14px 12px;display:flex;align-items:flex-start;gap:10px;border:1px solid var(--bdr);cursor:pointer;transition:.18s;position:relative;direction:rtl}
  .nc-item:hover{box-shadow:var(--sh-md)}
  .nc-unread{border-color:var(--nc,var(--ac))33;background:color-mix(in srgb,var(--nc,var(--ac)) 4%,var(--card))}
  .nc-item-icon{width:38px;height:38px;border-radius:var(--r-lg);display:flex;align-items:center;justify-content:center;font-size:17px;flex-shrink:0}
  .nc-item-body{flex:1;min-width:0}
  .nc-item-title{font-family:'Tajawal',sans-serif;font-size:14px;font-weight:700;color:var(--tx);margin-bottom:3px}
  .nc-item-desc{font-family:'Tajawal',sans-serif;font-size:12px;color:var(--txm);line-height:1.5}
  .nc-item-meta{display:flex;align-items:center;gap:8px;margin-top:4px}
  .nc-unread-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0;margin-top:6px}
  .nc-del{background:none;border:none;color:var(--txm);cursor:pointer;font-size:13px;padding:2px 5px;border-radius:4px;transition:.15s;flex-shrink:0}
  .nc-del:hover{background:rgba(239,68,68,.1);color:#ef4444}
  .notif-wrap{padding:16px}
  .notif-hdr{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:16px;gap:10px}
  .notif-title-row{display:flex;align-items:center;gap:8px}
  .notif-title{font-size:var(--t-xl);font-weight:700;color:var(--tx);margin:0}
  .notif-badge{background:var(--ac);color:#fff;border-radius:var(--r-full);padding:2px 9px;font-size:11px;font-weight:700}
  .notif-hdr-actions{display:flex;gap:8px;flex-shrink:0}
  .notif-act-btn{background:var(--item);border:1px solid var(--bdr);border-radius:var(--r-full);padding:6px 14px;font-size:12px;color:var(--txm);cursor:pointer;transition:.2s}
  .notif-act-btn:hover{border-color:var(--ac);color:var(--ac)}
  .notif-clear:hover{border-color:#ef444466;color:#ef4444}
  .notif-filters{display:flex;gap:7px;margin-bottom:16px;flex-wrap:wrap}
  .notif-filter{background:var(--item);border:1.5px solid transparent;border-radius:var(--r-full);padding:6px 14px;font-size:12px;color:var(--txm);cursor:pointer;transition:.2s}
  .notif-filter:hover{border-color:var(--bdr2)}
  .notif-filter.active{border-color:var(--ac);color:var(--ac);background:var(--ac)10;font-weight:600}
  .notif-empty{text-align:center;padding:44px 18px;color:var(--txm);display:flex;flex-direction:column;align-items:center;gap:12px}
  .notif-demo-btn{background:var(--ac);color:#fff;border:none;border-radius:var(--r-full);padding:10px 24px;font-size:13px;cursor:pointer;box-shadow:var(--sh-ac);transition:.2s}
  .notif-demo-btn:hover{filter:brightness(1.1)}
  .notif-list{display:flex;flex-direction:column;gap:8px}
  .notif-item{background:var(--card);border-radius:var(--r-xl);padding:14px;display:flex;align-items:flex-start;gap:12px;border:1px solid var(--bdr);cursor:pointer;transition:.2s;position:relative;box-shadow:var(--sh-sm)}
  .notif-item:hover{box-shadow:var(--sh-md)}
  .notif-unread{border-right:3px solid var(--nc,var(--ac));background:var(--nc,var(--ac))05}
  .notif-item-icon{width:40px;height:40px;border-radius:var(--r-lg);display:flex;align-items:center;justify-content:center;font-size:19px;flex-shrink:0}
  .notif-item-body{flex:1;min-width:0}
  .notif-item-title{font-size:14px;font-weight:600;color:var(--tx);margin-bottom:3px}
  .notif-item-desc{font-size:12px;color:var(--txm);line-height:1.5}
  .notif-item-time{font-size:10px;color:var(--txs);margin-top:5px}
  .notif-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0;margin-top:5px}
  .notif-del{background:none;border:none;color:var(--txm);font-size:12px;cursor:pointer;padding:4px;opacity:.4;position:absolute;top:8px;left:8px;transition:.15s}
  .notif-del:hover{opacity:1;color:#ef4444}

  /* ════════════════════════════════════════════════
     TAFSIR COMPARISON
  ════════════════════════════════════════════════ */
  .tcomp-wrap{padding:16px}
  .tcomp-hdr-row{display:flex;align-items:center;gap:10px;margin-bottom:8px}
  .tcomp-title{font-size:var(--t-xl);font-weight:700;color:var(--tx);margin:0}
  .tcomp-sub{font-size:var(--t-xs);color:var(--txm);margin-bottom:20px;line-height:1.7}
  .tcomp-controls{background:var(--card);border-radius:var(--r-xl);padding:18px;border:1px solid var(--bdr);margin-bottom:18px;display:flex;flex-direction:column;gap:14px;box-shadow:var(--sh-sm)}
  .tcomp-ctrl-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
  .tcomp-label{font-size:13px;color:var(--txm);white-space:nowrap}
  .tcomp-input{width:68px;background:var(--item);border:1.5px solid var(--bdr);border-radius:var(--r-md);padding:8px 10px;color:var(--tx);font-size:14px;text-align:center;transition:.2s}
  .tcomp-sel{width:100%;flex:1;text-align:right;direction:rtl;font-family:'Tajawal',sans-serif;font-size:13px}
  .tcomp-input:focus{border-color:var(--ac);outline:none}
  .tcomp-eds{display:flex;gap:8px;flex-wrap:wrap}
  .tcomp-ed-btn{background:var(--item);border:1.5px solid transparent;border-radius:var(--r-full);padding:7px 16px;font-size:12px;color:var(--txm);cursor:pointer;transition:.2s}
  .tcomp-ed-btn:hover{border-color:var(--bdr2)}
  .tcomp-ed-btn.active{border-color:var(--ac);color:var(--ac);background:var(--ac)12;font-weight:600}
  .tcomp-compare-btn{background:var(--ac);color:#fff;border:none;border-radius:var(--r-lg);padding:12px;font-size:14px;font-weight:700;cursor:pointer;transition:.2s;box-shadow:var(--sh-ac)}
  .tcomp-compare-btn:hover{filter:brightness(1.1);transform:translateY(-1px)}
  .tcomp-compare-btn:disabled{opacity:.5;cursor:not-allowed;transform:none}
  .tcomp-ayah-box{background:linear-gradient(135deg,var(--ac)15,var(--ac)05);border:1px solid var(--ac)33;border-radius:var(--r-xl);padding:20px 18px;margin-bottom:18px;text-align:center;box-shadow:var(--sh-sm)}
  .tcomp-ayah-label{font-size:11px;color:var(--ac);font-weight:700;margin-bottom:10px}
  .tcomp-ayah-text{font-family:var(--qfont,'Amiri',serif);font-size:21px;line-height:2.1;color:var(--tx);direction:rtl}
  .tcomp-ayah-ref{font-size:11px;color:var(--txm);margin-top:8px}
  .tcomp-results{display:flex;flex-direction:column;gap:14px}
  @media(min-width:640px){.tcomp-results{display:grid;grid-template-columns:1fr 1fr}}
  .tcomp-result-card{background:var(--card);border-radius:var(--r-xl);padding:16px;border:1px solid var(--bdr);box-shadow:var(--sh-sm)}
  .tcomp-result-hdr{display:flex;align-items:center;gap:7px;margin-bottom:12px;padding-bottom:10px;border-bottom:1px solid var(--bdr)}
  .tcomp-result-name{font-size:14px;font-weight:700;color:var(--tx)}
  .tcomp-result-desc{font-size:11px;color:var(--txm)}
  .tcomp-result-text{font-size:14px;color:var(--tx);line-height:1.9;direction:rtl}
  .tcomp-ltr{direction:ltr;font-size:13px}
  .tcomp-loading{color:var(--txm);font-size:13px}
  .tcomp-hint{text-align:center;padding:36px;color:var(--txm);display:flex;flex-direction:column;align-items:center;gap:12px}

  /* ════════════════════════════════════════════════
     GENERAL UTILITY CLASSES
  ════════════════════════════════════════════════ */
  .card{background:var(--card);border-radius:var(--r-xl);border:1px solid var(--bdr);box-shadow:var(--sh-sm)}
  .btn-primary{background:var(--ac);color:#fff;border:none;border-radius:var(--r-lg);padding:10px 20px;font-size:var(--t-sm);font-weight:600;cursor:pointer;transition:.2s;box-shadow:var(--sh-ac)}
  .btn-primary:hover{filter:brightness(1.1);transform:translateY(-1px)}
  .btn-ghost{background:transparent;border:1.5px solid var(--bdr);border-radius:var(--r-lg);padding:9px 18px;font-size:var(--t-sm);color:var(--tx);cursor:pointer;transition:.2s}
  .btn-ghost:hover{border-color:var(--ac);color:var(--ac)}
  .chip{display:inline-flex;align-items:center;gap:4px;background:var(--item);border:1px solid var(--bdr);border-radius:var(--r-full);padding:4px 12px;font-size:12px;color:var(--txm)}
  .chip.active{background:var(--ac)15;border-color:var(--ac)55;color:var(--ac)}
  .badge{display:inline-flex;align-items:center;justify-content:center;background:var(--ac);color:#fff;border-radius:var(--r-full);padding:2px 8px;font-size:10px;font-weight:700}
  .divider{height:1px;background:var(--bdr);margin:16px 0}
  .loading-spinner{width:32px;height:32px;border:3px solid var(--bdr);border-top-color:var(--ac);border-radius:50%;animation:spin .7s linear infinite}
  .empty-state{text-align:center;padding:40px 18px;color:var(--txm);display:flex;flex-direction:column;align-items:center;gap:12px}
  .empty-state-icon{font-size:44px;opacity:.6}
  .s-result{
    background:var(--card);border:1px solid var(--bdr);border-radius:var(--r-xl);
    padding:16px;margin-bottom:10px;cursor:pointer;transition:.2s;
    font-family:var(--qfont,'Amiri',serif);font-size:var(--t-lg);
    line-height:2.4;direction:rtl;text-align:right;color:var(--tx);
    box-shadow:var(--sh-sm);
  }
  .s-result:hover{border-color:var(--ac)44;box-shadow:var(--sh-md)}
  .s-meta{font-size:var(--t-xs);color:var(--ac);margin-top:8px;font-weight:600;font-family:'Tajawal',sans-serif}
  .search-bar{display:flex;gap:0;margin-bottom:14px;border-radius:var(--r-lg);overflow:hidden;border:1.5px solid var(--bdr);background:var(--card);transition:.2s;box-shadow:var(--sh-sm)}
  .search-bar:focus-within{border-color:var(--ac);box-shadow:0 0 0 3px var(--ac)18}
  .search-bar input{flex:1;border:none;outline:none;padding:13px 16px;background:transparent;color:var(--tx);font-size:var(--t-sm);direction:rtl}
  .search-bar button{background:var(--ac);color:#fff;border:none;padding:13px 20px;font-size:15px;cursor:pointer;transition:.2s;flex-shrink:0}
  .search-bar button:hover{filter:brightness(1.1)}
  .sh-wrap{background:var(--card);border-radius:var(--r-lg);padding:12px 14px;border:1px solid var(--bdr)}
  .sh-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}
  .sh-title{font-size:var(--t-xs);color:var(--txm);font-weight:600}
  .sh-clear{font-size:11px;color:var(--txm);background:none;border:none;cursor:pointer;padding:2px 6px;border-radius:var(--r-sm)}
  .sh-clear:hover{color:#ef4444}
  .sh-chips{display:flex;flex-wrap:wrap;gap:6px}
  .sh-chip{background:var(--item);border:1px solid var(--bdr);border-radius:var(--r-full);padding:4px 12px;font-size:var(--t-xs);color:var(--tx);cursor:pointer;transition:.15s;display:flex;align-items:center;gap:5px}
  .sh-chip:hover{border-color:var(--ac);color:var(--ac)}
  .s-none{text-align:center;padding:32px 18px;color:var(--txm);background:var(--card);border-radius:var(--r-xl);border:1px solid var(--bdr)}
  .offline-toast{position:fixed;top:62px;left:50%;transform:translateX(-50%);background:#ef4444;color:#fff;border-radius:var(--r-full);padding:7px 20px;font-size:var(--t-xs);z-index:9900;box-shadow:var(--sh-md);animation:toastIn .3s ease;white-space:nowrap}
  .sec-err{padding:32px 18px;text-align:center;color:var(--txm);background:var(--card);border-radius:var(--r-xl);border:1px dashed var(--bdr)}

  /* Loading */
  .ld-wrap{display:flex;justify-content:center;padding:32px;gap:8px;align-items:center}
  .ld-dot{width:8px;height:8px;border-radius:50%;background:var(--ac);opacity:.4;animation:pulse 1.2s ease infinite}
  .ld-dot:nth-child(2){animation-delay:.2s}.ld-dot:nth-child(3){animation-delay:.4s}

  /* ════════════════════════════════════════════════
     RESPONSIVE FIXES
  ════════════════════════════════════════════════ */
  @media(min-width:768px){
    .main-card{padding:0 4px}
    .hero{padding:42px 32px 34px}
    .quiz-opts{display:grid;grid-template-columns:1fr 1fr;gap:12px}
    .duas-cats{gap:10px}

  }

    /* ════ ONBOARDING ════ */
  /* ══ ONBOARDING ══ */
  .ob-overlay{position:fixed;inset:0;z-index:9999;background:linear-gradient(165deg,#050d1a 0%,#0c1e38 55%,#0a1628 100%);display:flex;align-items:center;justify-content:center;padding:16px;overflow-y:auto;}
  .ob-overlay::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 90% 55% at 50% -5%,rgba(240,200,70,.1),transparent);pointer-events:none;}
  .ob-inner{position:relative;z-index:1;width:100%;max-width:440px;display:flex;flex-direction:column;align-items:center;}
  .ob-logo{font-family:'Amiri',serif;font-size:3em;color:#f0c060;text-align:center;line-height:1.1;text-shadow:0 0 40px rgba(240,192,60,.45);margin-bottom:4px;}
  .ob-app-name{font-family:'Amiri',serif;font-size:1.4em;color:rgba(255,255,255,.88);text-align:center;margin-bottom:3px;}
  .ob-tagline{font-family:'Tajawal',sans-serif;font-size:11px;color:rgba(255,255,255,.35);text-align:center;margin-bottom:20px;letter-spacing:.3px;}
  .ob-prog-track{width:min(300px,80%);height:3px;background:rgba(255,255,255,.1);border-radius:2px;margin-bottom:22px;overflow:hidden;}
  .ob-prog-fill{height:100%;background:linear-gradient(90deg,#f0c060,#c8860a);border-radius:2px;transition:width .4s cubic-bezier(.4,0,.2,1);}
  .ob-step-hdr{display:flex;align-items:center;gap:12px;direction:rtl;width:100%;margin-bottom:12px;padding:0 2px;}
  .ob-step-icon{font-size:26px;flex-shrink:0;}
  .ob-step-title{font-family:'Tajawal',sans-serif;font-size:var(--t-md);font-weight:700;color:#fff;margin:0 0 2px;}
  .ob-step-sub{font-family:'Tajawal',sans-serif;font-size:10px;color:rgba(255,255,255,.4);margin:0;}
  .ob-card{background:rgba(255,255,255,.055);border:1px solid rgba(255,255,255,.1);border-radius:var(--r-xl);padding:20px 18px;width:100%;margin-bottom:16px;backdrop-filter:blur(24px);min-height:150px;}
  @keyframes obSlideIn{from{opacity:0;transform:translateX(28px)}to{opacity:1;transform:translateX(0)}}
  @keyframes obSlideOut{from{opacity:1;transform:translateX(0)}to{opacity:0;transform:translateX(-28px)}}
  @keyframes obSlideInR{from{opacity:0;transform:translateX(-28px)}to{opacity:1;transform:translateX(0)}}
  @keyframes obSlideOutR{from{opacity:1;transform:translateX(0)}to{opacity:0;transform:translateX(28px)}}
  .ob-card{animation:obSlideIn .28s cubic-bezier(.4,0,.2,1);}
  .ob-exit-l{animation:obSlideOut .25s ease forwards;}
  .ob-exit-r{animation:obSlideOutR .25s ease forwards;}
  .ob-theme-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:9px;}
  @media(min-width:360px){.ob-theme-grid{grid-template-columns:repeat(4,1fr);}}
  .ob-theme-dot{border-radius:var(--r-md);border:2.5px solid transparent;cursor:pointer;transition:.2s;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;padding:10px 4px;position:relative;aspect-ratio:.9;}
  .ob-theme-dot.sel{border-color:rgba(255,255,255,.9);transform:scale(1.07);box-shadow:0 0 18px rgba(255,255,255,.3);}
  .ob-theme-lbl{font-family:'Tajawal',sans-serif;font-size:9px;color:rgba(255,255,255,.8);line-height:1;}
  .ob-check{position:absolute;top:4px;right:4px;font-size:11px;color:#fff;font-weight:900;text-shadow:0 1px 3px rgba(0,0,0,.5);}
  .ob-check-gold{color:#f0c060;}
  .ob-font-list{display:flex;flex-direction:column;gap:8px;}
  .ob-font-btn{width:100%;padding:11px 14px;border-radius:var(--r-lg);border:1.5px solid rgba(255,255,255,.12);background:rgba(255,255,255,.05);color:rgba(255,255,255,.85);cursor:pointer;text-align:right;direction:rtl;transition:.2s;display:flex;align-items:center;gap:10px;position:relative;}
  .ob-font-btn:hover{background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.25);}
  .ob-font-btn.sel{background:rgba(240,192,60,.1);border-color:#f0c060;}
  .ob-font-prev{font-size:1em;flex:1;direction:rtl;color:#fff;line-height:1.5;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
  .ob-font-lbl{font-family:'Tajawal',sans-serif;font-size:10px;color:rgba(255,255,255,.45);flex-shrink:0;}
  .ob-city-wrap{display:flex;flex-direction:column;gap:10px;}
  .ob-city-input{width:100%;padding:13px 14px;border-radius:var(--r-lg);border:1.5px solid rgba(255,255,255,.15);background:rgba(255,255,255,.07);color:#fff;font-family:'Tajawal',sans-serif;font-size:var(--t-sm);direction:rtl;outline:none;box-sizing:border-box;transition:.2s;}
  .ob-city-input::placeholder{color:rgba(255,255,255,.28);}
  .ob-city-input:focus{border-color:#f0c060;background:rgba(255,255,255,.1);}
  .ob-city-tags{display:flex;flex-wrap:wrap;gap:6px;direction:rtl;}
  .ob-city-tag{padding:5px 11px;border-radius:var(--r-full);background:rgba(240,192,60,.1);border:1px solid rgba(240,192,60,.25);color:rgba(240,192,60,.9);font-family:'Tajawal',sans-serif;font-size:11px;cursor:pointer;transition:.15s;}
  .ob-city-tag:hover,.ob-city-tag.sel{background:rgba(240,192,60,.22);border-color:rgba(240,192,60,.6);}
  .ob-city-note{font-family:'Tajawal',sans-serif;font-size:10px;color:rgba(255,255,255,.3);direction:rtl;margin:0;}
  .ob-nav-row{display:flex;align-items:center;justify-content:space-between;width:100%;gap:8px;margin-bottom:8px;}
  .ob-back-btn{font-family:'Tajawal',sans-serif;font-size:var(--t-xs);color:rgba(255,255,255,.45);background:none;border:none;cursor:pointer;padding:8px 2px;transition:.2s;}
  .ob-back-btn:hover{color:rgba(255,255,255,.8);}
  .ob-dots{display:flex;gap:6px;}
  .ob-dot{width:7px;height:7px;border-radius:50%;background:rgba(255,255,255,.18);transition:.32s;}
  .ob-dot.active{background:#f0c060;width:22px;border-radius:3.5px;}
  .ob-dot.done{background:rgba(240,192,60,.45);}
  .ob-next-btn{font-family:'Tajawal',sans-serif;padding:11px 22px;background:linear-gradient(135deg,#f0c060,#c07808);color:#1a0700;font-size:var(--t-sm);font-weight:700;border:none;border-radius:var(--r-xl);cursor:pointer;transition:.2s;box-shadow:0 4px 18px rgba(240,192,60,.38);}
  .ob-next-btn:hover{transform:translateY(-1px);box-shadow:0 6px 26px rgba(240,192,60,.52);}
  .ob-skip{font-family:'Tajawal',sans-serif;font-size:10px;color:rgba(255,255,255,.25);background:none;border:none;cursor:pointer;padding:4px;transition:.2s;}
  .ob-skip:hover{color:rgba(255,255,255,.55);}

  /* ════ SAJDA ════ */
  .sajda-page{padding:4px 0}
  .sajda-hero{
    background:linear-gradient(135deg,var(--ac),var(--ac2));
    border-radius:var(--r-xl);padding:22px 20px;margin-bottom:18px;text-align:center;
    color:#fff;box-shadow:var(--sh-ac);position:relative;overflow:hidden;
  }
  .sajda-hero::before{content:'';position:absolute;top:-30px;right:-30px;width:100px;height:100px;border-radius:50%;background:rgba(255,255,255,.07)}
  .sajda-hero-title{font-family:'Amiri','Aref Ruqaa',serif;font-size:1.6em;margin-bottom:4px;text-shadow:0 2px 8px rgba(0,0,0,.2)}
  .sajda-hero-sub{font-size:var(--t-xs);opacity:.85}
  .sajda-card{
    background:var(--card);border:1px solid var(--bdr);border-radius:var(--r-xl);
    padding:17px 16px;margin-bottom:11px;position:relative;overflow:hidden;
    transition:.2s;box-shadow:var(--sh-sm);
  }
  .sajda-card:hover{border-color:var(--ac)44;box-shadow:var(--sh-md);transform:translateY(-1px)}
  .sajda-card::before{
    content:'';position:absolute;top:0;right:0;width:4px;height:100%;
    background:linear-gradient(to bottom,var(--ac),var(--ac2));
  }
  .sajda-num{
    position:absolute;top:13px;left:14px;
    background:var(--ac);color:#fff;border-radius:50%;
    width:28px;height:28px;display:flex;align-items:center;justify-content:center;
    font-size:11px;font-weight:700;
  }
  .sajda-surah{
    font-size:var(--t-xs);color:var(--ac);
    font-weight:700;margin-bottom:8px;text-align:right;direction:rtl;
  }
  .sajda-text{
    font-family:'Amiri','Aref Ruqaa',serif;font-size:1.1em;color:var(--tx);
    line-height:2.2;direction:rtl;text-align:right;margin-bottom:10px;
    cursor:pointer;transition:.2s;
  }
  .sajda-text:hover{color:var(--ac)}
  .sajda-footer{display:flex;align-items:center;gap:8px;justify-content:space-between}
  .sajda-badge{
    background:linear-gradient(135deg,#16a34a,#15803d);color:#fff;
    border-radius:var(--r-full);padding:4px 14px;
    font-size:10px;font-weight:700;
    display:flex;align-items:center;gap:4px;
  }
  .sajda-ayah-ref{font-size:10px;color:var(--txm)}

  /* ════ HADITH SEARCH ════ */
  .hadith-page{}
  .hadith-search-bar{display:flex;gap:8px;margin-bottom:14px;background:var(--card);border-radius:var(--r-lg);padding:6px;border:1px solid var(--bdr)}
  .hadith-search-inp{
    flex:1;padding:10px 14px;border-radius:var(--r-md);
    border:none;background:transparent;
    color:var(--tx);font-size:var(--t-sm);
    direction:rtl;outline:none;
  }
  .hadith-search-btn{
    background:var(--ac);color:#fff;border:none;border-radius:var(--r-md);
    padding:10px 18px;cursor:pointer;font-size:var(--t-sm);white-space:nowrap;
    font-weight:600;transition:.2s;
  }
  .hadith-search-btn:hover{filter:brightness(1.1)}
  .hadith-tabs{display:flex;gap:6px;margin-bottom:14px;overflow-x:auto;scrollbar-width:none;padding-bottom:2px}
  .hadith-tab{
    background:var(--item);border:1px solid var(--bdr);color:var(--tx);
    border-radius:var(--r-full);padding:6px 14px;cursor:pointer;white-space:nowrap;
    font-size:var(--t-xs);transition:.18s;flex-shrink:0;
  }
  .hadith-tab:hover{border-color:var(--ac)44;color:var(--ac)}
  .hadith-tab.active{background:var(--ac);color:#fff;border-color:var(--ac)}
  .h-result-card{
    background:var(--card);border:1px solid var(--bdr);border-radius:var(--r-xl);
    padding:16px;margin-bottom:11px;box-shadow:var(--sh-sm);transition:.2s;
  }
  .h-result-card:hover{border-color:var(--ac)22;box-shadow:var(--sh-md)}
  .h-result-book{
    font-size:10px;color:var(--ac);
    font-weight:700;margin-bottom:8px;direction:rtl;display:flex;align-items:center;gap:5px;
  }
  .h-result-text{
    font-size:var(--t-sm);color:var(--tx);
    line-height:2;direction:rtl;text-align:right;
  }
  .h-result-text mark{background:var(--ac)18;color:var(--ac);border-radius:3px;padding:1px 3px}
  /* ════ ISLAMIC CALENDAR ════ */
  .ical-page{padding:4px 0;display:flex;flex-direction:column;gap:16px}
  .ical-today-card{background:linear-gradient(135deg,var(--ac),var(--ac2));color:#fff;border-radius:var(--r-xl);padding:30px 22px;text-align:center;box-shadow:var(--sh-ac);position:relative;overflow:hidden}
  .ical-today-card::before{content:'🌙';position:absolute;right:16px;top:10px;font-size:52px;opacity:.12}
  .ical-today-card::after{content:'';position:absolute;bottom:-40px;left:-40px;width:120px;height:120px;border-radius:50%;background:rgba(255,255,255,.06)}
  .ical-today-label{font-size:var(--t-xs);opacity:.8;margin-bottom:8px}
  .ical-today-day{font-size:clamp(52px,14vw,80px);font-weight:700;line-height:1;text-shadow:0 2px 20px rgba(0,0,0,.2)}
  .ical-today-month{font-family:'Amiri',serif;font-size:clamp(18px,5vw,26px);margin:5px 0}
  .ical-today-year{font-size:var(--t-md);opacity:.85}
  .ical-today-greg{font-size:var(--t-xs);opacity:.6;margin-top:8px}
  .ical-converter{background:var(--card);border-radius:var(--r-xl);padding:18px;border:1px solid var(--bdr)}
  .ical-conv-title{font-size:var(--t-sm);color:var(--ac);font-weight:700;margin-bottom:14px}
  .ical-conv-row{display:flex;gap:8px;align-items:center;background:var(--item);border-radius:var(--r-lg);padding:5px}
  .ical-date-input{flex:1;padding:10px 14px;border:none;border-radius:var(--r-md);background:transparent;color:var(--tx);font-size:var(--t-sm);outline:none}
  .ical-conv-btn{background:var(--ac);color:#fff;border:none;border-radius:var(--r-md);padding:10px 20px;font-size:var(--t-sm);font-weight:700;cursor:pointer;white-space:nowrap;transition:.2s;box-shadow:var(--sh-ac)}
  .ical-conv-btn:hover{filter:brightness(1.1)}
  .ical-conv-result{display:flex;align-items:baseline;gap:10px;margin-top:14px;padding:14px;background:var(--item);border-radius:var(--r-lg);justify-content:center;direction:rtl}
  .ical-result-num{font-size:clamp(28px,8vw,40px);font-weight:700;color:var(--ac)}
  .ical-result-month{font-family:'Amiri',serif;font-size:var(--t-xl);color:var(--tx)}
  .ical-result-year{font-size:var(--t-md);color:var(--txm)}
  .ical-months-wrap{background:var(--card);border-radius:var(--r-xl);padding:18px;border:1px solid var(--bdr)}
  .ical-months-title{font-family:'Amiri',serif;font-size:var(--t-lg);color:var(--ac);margin-bottom:14px;font-weight:700}
  .ical-months-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
  @media(min-width:500px){.ical-months-grid{grid-template-columns:repeat(4,1fr)}}
  .ical-month-cell{background:var(--item);border-radius:var(--r-lg);padding:11px 6px;text-align:center;border:1px solid var(--bdr);transition:.2s;cursor:pointer}
  .ical-month-cell:hover{border-color:var(--ac)44;transform:translateY(-1px)}
  .ical-month-cell.current{border-color:var(--ac);background:var(--ac)10}
  .ical-month-num{font-size:10px;color:var(--txm);margin-bottom:3px}
  .ical-month-name{font-family:'Amiri',serif;font-size:var(--t-sm);color:var(--tx);font-weight:700}
  .ical-month-cell.current .ical-month-name{color:var(--ac)}
  .ical-events-wrap{background:var(--card);border-radius:var(--r-xl);padding:18px;border:1px solid var(--bdr)}
  .ical-events-title{font-family:'Amiri',serif;font-size:var(--t-lg);color:var(--ac);margin-bottom:14px;font-weight:700}
  .ical-event-row{display:flex;align-items:center;gap:13px;padding:12px 14px;background:var(--item);border-radius:var(--r-lg);margin-bottom:7px;border:1px solid var(--bdr);border-right:3px solid var(--ac);transition:.2s}
  .ical-event-row:hover{background:var(--card2)}
  .ical-event-emoji{font-size:24px;flex-shrink:0}
  .ical-event-name{font-size:var(--t-sm);color:var(--tx);font-weight:700}
  .ical-event-info{flex:1;display:flex;flex-direction:column;gap:2px}
  .ical-event-date{font-size:var(--t-xs);color:var(--txm);margin-top:2px}

  /* ════ QURAN STATS ════ */
  .qstats-page{padding:4px 0;display:flex;flex-direction:column;gap:18px}
  .qstats-hero{background:linear-gradient(155deg,#0a1628 0%,#163060 50%,var(--ac) 100%);color:#fff;border-radius:var(--r-xl);padding:22px 20px;text-align:center;position:relative;overflow:hidden;box-shadow:var(--sh-lg)}
  .qstats-hero::before{content:'';position:absolute;top:-30px;right:-30px;width:120px;height:120px;border-radius:50%;background:rgba(255,255,255,.06);pointer-events:none}
  .qstats-hero-title{font-family:'Amiri',serif;font-size:var(--t-xl);font-weight:700;color:#f0d060;margin-bottom:4px;text-shadow:0 2px 8px rgba(0,0,0,.2)}
  .qstats-hero-sub{font-size:var(--t-xs);opacity:.8}
  .qstats-section-label{font-size:12px;font-weight:700;color:var(--ac);margin-bottom:10px;display:flex;align-items:center;gap:6px}
  .qstats-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:10px}
  @media(max-width:400px){.qstats-grid{grid-template-columns:repeat(2,1fr)}}
  .qstats-card{background:var(--card);border-radius:var(--r-lg);padding:16px 10px;text-align:center;border:1px solid var(--bdr);transition:.2s;box-shadow:var(--sh-sm)}
  .qstats-card:hover{border-color:var(--ac)44;transform:translateY(-3px);box-shadow:var(--sh-md)}
  .qstats-icon{font-size:28px;margin-bottom:8px}
  .qstats-label{font-size:var(--t-xs);color:var(--txm);margin-bottom:5px;line-height:1.3}
  .qstats-value{font-family:'Amiri',serif;font-size:clamp(16px,5vw,22px);color:var(--ac);font-weight:700;direction:rtl;line-height:1}
  .qstats-sub{font-size:9px;color:var(--txs);margin-top:3px}

  /* ════ 99 NAMES OF ALLAH ════ */
  .asma-page{padding:4px 0;display:flex;flex-direction:column;gap:14px}
  /* Hero banner */
  .asma-hero{
    background:linear-gradient(135deg,#0a1628,#1a3a6e);
    border-radius:16px;padding:20px;text-align:center;color:#fff;
    position:relative;overflow:hidden;
  }
  .asma-hero::before{
    content:'بسم الله';position:absolute;bottom:-10px;left:50%;transform:translateX(-50%);
    font-family:'Amiri',serif;font-size:80px;opacity:.04;white-space:nowrap;
  }
  .asma-hero-title{font-family:'Amiri',serif;font-size:clamp(22px,6vw,30px);color:#f0d060;font-weight:700;margin-bottom:6px}
  .asma-hero-sub{font-family:'Amiri',serif;font-size:var(--t-sm);opacity:.8;direction:rtl;margin-bottom:8px}
  .asma-hero-count{display:inline-block;background:rgba(255,255,255,.15);border-radius:20px;padding:3px 14px;font-family:'Tajawal',sans-serif;font-size:var(--t-xs)}
  /* Grid */
  .asma-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(90px,1fr));gap:7px}
  @media(min-width:480px){.asma-grid{grid-template-columns:repeat(auto-fill,minmax(110px,1fr))}}
  .asma-card{
    background:var(--item);border-radius:12px;padding:10px 6px 8px;
    text-align:center;cursor:pointer;transition:.2s;
    border:2px solid transparent;position:relative;
  }
  .asma-card:hover{border-color:var(--ac);transform:translateY(-2px);box-shadow:0 4px 16px rgba(0,0,0,.12)}
  .asma-card:active{transform:scale(.96)}
  .asma-num{
    position:absolute;top:5px;right:7px;
    font-family:'Tajawal',sans-serif;font-size:9px;color:var(--txm);font-weight:700;
  }
  .asma-arabic{
    font-family:'Amiri',serif;font-size:clamp(15px,4vw,19px);
    color:var(--ac);font-weight:700;direction:rtl;line-height:1.4;
    margin:8px 0 4px;
  }
  .asma-en-sm{font-family:'Tajawal',sans-serif;font-size:9px;color:var(--txm);line-height:1.2}
  /* Modal overlay */
  .asma-overlay{
    position:fixed;inset:0;background:rgba(0,0,0,.65);z-index:8000;
    display:flex;align-items:center;justify-content:center;padding:20px;
    animation:fadeIn .2s ease;backdrop-filter:blur(4px);
  }
  .asma-modal{
    background:linear-gradient(160deg,#0a1628,#1a3a6e);
    color:#fff;border-radius:24px;padding:30px 24px;
    max-width:380px;width:100%;text-align:center;
    position:relative;animation:scaleIn .25s cubic-bezier(.22,1,.36,1);
    box-shadow:0 20px 60px rgba(0,0,0,.5);
  }
  @keyframes scaleIn{from{opacity:0;transform:scale(.88)}to{opacity:1;transform:scale(1)}}
  .asma-modal-close{
    position:absolute;top:12px;left:14px;background:rgba(255,255,255,.15);
    border:none;border-radius:50%;width:30px;height:30px;color:#fff;
    cursor:pointer;font-size:13px;display:flex;align-items:center;justify-content:center;
  }
  .asma-modal-num{font-family:'Tajawal',sans-serif;font-size:11px;opacity:.5;margin-bottom:6px}
  .asma-modal-arabic{
    font-family:'Amiri',serif;font-size:clamp(36px,10vw,52px);
    font-weight:700;color:#f0d060;direction:rtl;line-height:1.2;
    margin-bottom:14px;text-shadow:0 2px 20px rgba(240,208,96,.3);
  }
  .asma-modal-divider{width:60px;height:2px;background:rgba(255,255,255,.2);border-radius:1px;margin:0 auto 14px}
  .asma-modal-en{font-family:'Tajawal',sans-serif;font-size:var(--t-lg);font-weight:700;margin-bottom:8px}
  .asma-modal-meaning{font-family:'Tajawal',sans-serif;font-size:var(--t-sm);opacity:.8;line-height:1.6}
  .asma-modal-nav{display:flex;gap:10px;margin-top:20px;justify-content:center}
  .asma-modal-nav button{
    background:rgba(255,255,255,.15);border:1.5px solid rgba(255,255,255,.25);
    color:#fff;border-radius:10px;padding:7px 18px;font-family:'Tajawal',sans-serif;
    font-size:var(--t-sm);cursor:pointer;transition:.2s;
  }
  .asma-modal-nav button:hover:not(:disabled){background:rgba(255,255,255,.3)}
  .asma-modal-nav button:disabled{opacity:.3;cursor:default}

  /* ════ BOOKMARKS MANAGER ════ */
  .bkm-page{padding:4px 0}
  .bkm-header{background:linear-gradient(135deg,var(--ac),var(--ac2));color:#fff;border-radius:var(--r-xl);padding:20px;margin-bottom:16px;display:flex;align-items:center;gap:16px;box-shadow:var(--sh-ac)}
  .bkm-header-icon{font-size:34px;flex-shrink:0}
  .bkm-header h2{font-family:'Amiri',serif;font-size:var(--t-xl);margin-bottom:3px}
  .bkm-header p{font-size:var(--t-xs);opacity:.8}
  .bkm-empty{text-align:center;padding:44px 20px;color:var(--txm)}
  .bkm-empty p{font-size:var(--t-md);margin-bottom:6px;color:var(--tx)}
  .bkm-empty small{font-size:var(--t-xs)}
  .bkm-section{margin-bottom:16px}
  .bkm-section-title{font-family:'Amiri',serif;font-size:var(--t-lg);color:var(--ac);font-weight:700;margin-bottom:10px;padding-bottom:8px;border-bottom:1px solid var(--bdr)}
  .bkm-card{background:var(--card);border-radius:var(--r-lg);padding:14px 16px;display:flex;align-items:center;gap:14px;margin-bottom:9px;border:1px solid var(--bdr);box-shadow:var(--sh-sm);transition:.2s}
  .bkm-card:hover{border-color:var(--ac)33;box-shadow:var(--sh-md)}
  .bkm-card-icon{font-size:26px;flex-shrink:0}
  .bkm-card-body{flex:1}
  .bkm-card-title{font-size:var(--t-sm);font-weight:700;color:var(--tx)}
  .bkm-card-sub{font-size:var(--t-xs);color:var(--txm);margin-top:2px}
  .bkm-card-actions{display:flex;gap:7px;align-items:center}
  .bkm-goto{background:var(--ac);color:#fff;border:none;border-radius:var(--r-md);padding:7px 14px;font-size:var(--t-xs);font-weight:600;cursor:pointer;transition:.2s;box-shadow:var(--sh-ac)}
  .bkm-goto:hover{filter:brightness(1.1)}
  .bkm-del{background:none;border:1px solid var(--bdr);font-size:15px;cursor:pointer;padding:5px 8px;border-radius:var(--r-sm);transition:.15s;color:var(--txm)}
  .bkm-del:hover{background:#fee2e2;color:#ef4444;border-color:#ef4444}
  .bkm-ayah-card{background:var(--card);border-radius:var(--r-xl);padding:16px;margin-bottom:12px;border:1px solid var(--bdr);border-right:3px solid var(--ac);box-shadow:var(--sh-sm)}
  .bkm-ayah-meta{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;flex-wrap:wrap;gap:5px}
  .bkm-surah-badge{background:var(--ac);color:#fff;border-radius:var(--r-full);padding:3px 12px;font-size:var(--t-xs);font-weight:600}
  .bkm-time{font-size:var(--t-xs);color:var(--txm)}
  .bkm-ayah-text{font-family:'Amiri',serif;font-size:clamp(16px,4.5vw,22px);color:var(--tx);direction:rtl;line-height:2.2;margin-bottom:10px}
  .bkm-note{font-size:var(--t-xs);color:var(--txm);background:var(--item);border-radius:var(--r-md);padding:8px 12px;margin-bottom:10px;border-right:2px solid #f0d060;line-height:1.6}
  .bkm-note-edit textarea{width:100%;border:1.5px solid var(--bdr);border-radius:var(--r-md);padding:10px;font-size:var(--t-sm);background:var(--item);color:var(--tx);resize:none;outline:none;transition:.2s}
  .bkm-note-edit textarea:focus{border-color:var(--ac)}
  .bkm-save-note{background:var(--ac);color:#fff;border:none;border-radius:var(--r-md);padding:7px 16px;font-size:var(--t-xs);font-weight:600;cursor:pointer;transition:.2s}
  .bkm-save-note:hover{filter:brightness(1.1)}
  .bkm-cancel-note{background:var(--item);color:var(--tx);border:1px solid var(--bdr);border-radius:var(--r-md);padding:7px 16px;font-size:var(--t-xs);cursor:pointer;transition:.2s}
  .bkm-ayah-actions{display:flex;gap:7px;flex-wrap:wrap;align-items:center}
  .bkm-note-btn,.bkm-tafsir-btn{background:var(--item);color:var(--tx);border:1px solid var(--bdr);border-radius:var(--r-full);padding:5px 14px;font-size:var(--t-xs);cursor:pointer;transition:.15s}
  .bkm-note-btn:hover{border-color:var(--ac);color:var(--ac)}
  .bkm-tafsir-btn:hover{background:var(--ac);color:#fff;border-color:var(--ac)}

  /* ════ VOCABULARY FLASHCARDS ════ */
  .vocab-page{padding:4px 0;display:flex;flex-direction:column;gap:14px}
  .vocab-header{background:linear-gradient(135deg,var(--ac),var(--ac2));color:#fff;border-radius:var(--r-xl);padding:18px 20px;display:flex;align-items:center;gap:16px;box-shadow:var(--sh-ac)}
  .vocab-header-icon{font-size:30px;flex-shrink:0}
  .vocab-header h2{font-family:'Amiri',serif;font-size:var(--t-xl);margin-bottom:3px}
  .vocab-header p{font-size:var(--t-xs);opacity:.85}
  .vocab-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
  .vocab-stat{background:var(--card);border-radius:var(--r-lg);padding:11px 6px;text-align:center;border:1px solid var(--bdr);box-shadow:var(--sh-sm)}
  .vocab-stat-n{font-size:clamp(18px,5vw,26px);font-weight:700;color:var(--tx);line-height:1;margin-bottom:3px}
  .vocab-stat small{font-size:var(--t-xs);color:var(--txm)}
  .vocab-progress-bar{height:6px;background:var(--bdr);border-radius:3px;overflow:hidden}
  .vocab-mode-row{display:flex;gap:7px;background:var(--card);border-radius:var(--r-lg);padding:5px;border:1px solid var(--bdr)}
  .vocab-mode-btn{flex:1;padding:10px 7px;border:none;border-radius:var(--r-md);background:transparent;color:var(--txm);font-size:var(--t-sm);cursor:pointer;transition:.2s;font-weight:600}
  .vocab-mode-btn.active{background:var(--ac);color:#fff;box-shadow:var(--sh-ac)}
  .vocab-filters{display:flex;gap:6px;flex-wrap:wrap}
  .vocab-filter{background:var(--item);border:1px solid var(--bdr);border-radius:var(--r-full);padding:5px 14px;font-size:var(--t-xs);color:var(--tx);cursor:pointer;transition:.2s}
  .vocab-filter.active{background:var(--ac);color:#fff;border-color:var(--ac)}
  .vocab-card{perspective:1000px;height:190px;cursor:pointer;position:relative;margin:4px 0}
  .vocab-card-inner{width:100%;height:100%;position:relative;transform-style:preserve-3d;transition:transform .55s cubic-bezier(.4,0,.2,1)}
  .vocab-card.flipped .vocab-card-inner{transform:rotateY(180deg)}
  .vocab-card-front,.vocab-card-back{position:absolute;inset:0;backface-visibility:hidden;border-radius:var(--r-xl);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:22px;box-shadow:var(--sh-lg)}
  .vocab-card-front{background:linear-gradient(135deg,var(--ac),var(--ac2));color:#fff}
  .vocab-card-back{background:var(--card);color:var(--tx);transform:rotateY(180deg);border:2px solid var(--ac)}
  .vocab-card-arabic{font-family:'Amiri',serif;font-size:clamp(30px,9vw,46px);font-weight:700;direction:rtl;text-align:center;line-height:1.3;text-shadow:0 2px 12px rgba(0,0,0,.2)}
  .vocab-card-freq{font-size:var(--t-xs);opacity:.7;margin-bottom:8px}
  .vocab-card-hint{font-size:var(--t-xs);opacity:.6;margin-top:10px;animation:pulse 2.5s infinite}
  .vocab-card-meaning{font-size:clamp(16px,4.5vw,22px);font-weight:700;text-align:center;direction:ltr;color:var(--ac)}
  .vocab-card-badge{position:absolute;top:12px;right:12px;font-size:20px}
  .vocab-mark-row{display:flex;gap:10px}
  .vocab-mark{flex:1;padding:13px;border:none;border-radius:var(--r-lg);font-size:var(--t-md);font-weight:700;cursor:pointer;transition:.2s}
  .vocab-mark.correct{background:#dcfce7;color:#166534;border:1px solid #86efac}
  .vocab-mark.correct:hover{background:#22c55e;color:#fff;box-shadow:0 4px 14px rgba(34,197,94,.4)}
  .vocab-mark.wrong{background:#fee2e2;color:#991b1b;border:1px solid #fca5a5}
  .vocab-mark.wrong:hover{background:#ef4444;color:#fff;box-shadow:0 4px 14px rgba(239,68,68,.4)}
  .vocab-quiz-row{display:flex;gap:8px}
  .vocab-quiz-input{flex:1;padding:11px 16px;border:1.5px solid var(--bdr);border-radius:var(--r-lg);background:var(--card);color:var(--tx);font-size:var(--t-sm);outline:none;transition:.2s}
  .vocab-quiz-input:focus{border-color:var(--ac);box-shadow:0 0 0 3px var(--ac)20}
  .vocab-quiz-check{background:var(--ac);color:#fff;border:none;border-radius:var(--r-lg);padding:11px 20px;font-size:var(--t-sm);font-weight:700;cursor:pointer;transition:.2s;box-shadow:var(--sh-ac)}
  .vocab-quiz-result{padding:14px;border-radius:var(--r-lg);font-size:var(--t-sm);font-weight:700;text-align:center}
  .vocab-quiz-result.correct{background:#dcfce7;color:#166534;border:1px solid #86efac}
  .vocab-quiz-result.wrong{background:#fee2e2;color:#991b1b;border:1px solid #fca5a5}
  .vocab-nav{display:flex;align-items:center;justify-content:center;gap:18px}
  .vocab-nav-btn{background:var(--card);border:1px solid var(--bdr);border-radius:50%;width:44px;height:44px;font-size:20px;cursor:pointer;transition:.2s;display:flex;align-items:center;justify-content:center;box-shadow:var(--sh-sm)}
  .vocab-nav-btn:hover{background:var(--ac);color:#fff;border-color:var(--ac);box-shadow:var(--sh-ac)}
  .vocab-nav-pos{font-size:var(--t-sm);color:var(--txm)}
  .vocab-reset{background:none;border:1px solid var(--bdr);border-radius:var(--r-full);padding:7px 18px;font-size:var(--t-xs);color:var(--txm);cursor:pointer;align-self:center;transition:.2s}
  .vocab-reset:hover{border-color:var(--ac);color:var(--ac)}
  .vocab-stat-l{font-size:var(--t-xs);color:var(--txm);margin-top:3px;line-height:1.3}

  /* ════ RECITERS PAGE ════ */
  .rec-page{padding:4px 0;}
  .rec-hero{text-align:center;padding:22px 16px 14px;background:linear-gradient(135deg,var(--ac),var(--ac2,var(--ac)));border-radius:var(--r-xl);margin-bottom:14px;color:#fff;position:relative;overflow:hidden;}
  .rec-hero::before{content:'';position:absolute;inset:0;background:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='30' r='28' fill='none' stroke='white' stroke-width='.3' opacity='.15'/%3E%3C/svg%3E") repeat;opacity:.3;}
  .rec-hero-bismillah{font-size:36px;margin-bottom:6px;position:relative;}
  .rec-hero-title{font-family:'Amiri',serif;font-size:var(--t-xl);font-weight:700;margin:0 0 4px;position:relative;}
  .rec-hero-sub{font-family:'Tajawal',sans-serif;font-size:var(--t-xs);opacity:.82;margin:0;position:relative;}
  .rec-controls{background:var(--card);border:1px solid var(--bdr);border-radius:var(--r-xl);padding:14px 16px;margin-bottom:12px;display:flex;flex-direction:column;gap:10px;}
  .rec-ctrl-row{display:flex;align-items:center;gap:10px;direction:rtl;}
  .rec-ctrl-lbl{font-family:'Tajawal',sans-serif;font-size:var(--t-xs);color:var(--txm);flex-shrink:0;width:56px;}
  .rec-surah-sel{flex:1;padding:8px 10px;border-radius:var(--r-md);border:1px solid var(--bdr);background:var(--item);color:var(--tx);font-family:'Tajawal',sans-serif;font-size:var(--t-xs);direction:rtl;outline:none;}
  .rec-vol-slider{flex:1;accent-color:var(--ac);cursor:pointer;height:4px;}
  .rec-player{background:linear-gradient(135deg,var(--ac),var(--ac2,var(--ac)));border-radius:var(--r-xl);padding:14px 16px;margin-bottom:12px;display:flex;align-items:center;justify-content:space-between;gap:10px;box-shadow:var(--sh-ac);}
  .rec-player-left{display:flex;align-items:center;gap:10px;direction:rtl;flex:1;min-width:0;}
  .rec-player-flag{font-size:26px;flex-shrink:0;}
  .rec-player-meta{display:flex;flex-direction:column;min-width:0;}
  .rec-player-name{font-family:'Tajawal',sans-serif;font-weight:700;color:#fff;font-size:var(--t-sm);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
  .rec-player-surah{font-family:'Amiri',serif;color:rgba(255,255,255,.8);font-size:var(--t-xs);}
  .rec-player-btns{display:flex;align-items:center;gap:6px;flex-shrink:0;}
  .rec-ctrl-btn{background:rgba(255,255,255,.2);border:none;border-radius:50%;width:34px;height:34px;color:#fff;font-size:13px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:.15s;flex-shrink:0;}
  .rec-ctrl-btn:hover{background:rgba(255,255,255,.35);}
  .rec-play-main{width:44px;height:44px;font-size:17px;background:rgba(255,255,255,.92);color:var(--ac);}
  .rec-play-main.rec-pulsing{animation:recPulse 1.4s ease-in-out infinite;}
  @keyframes recPulse{0%,100%{box-shadow:0 0 0 0 rgba(255,255,255,.45)}60%{box-shadow:0 0 0 10px rgba(255,255,255,0)}}
  .rec-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:9px;}
  @media(min-width:480px){.rec-grid{grid-template-columns:repeat(3,1fr);}}
  .rec-card{background:var(--card);border:1.5px solid var(--bdr);border-radius:var(--r-lg);padding:13px 11px;cursor:pointer;transition:all .18s;text-align:center;direction:rtl;}
  .rec-card:hover{border-color:var(--ac);transform:translateY(-2px);box-shadow:var(--sh-sm);}
  .rec-card.rec-active{background:color-mix(in srgb,var(--ac) 10%,var(--card));border-color:var(--ac);box-shadow:0 0 0 2px color-mix(in srgb,var(--ac) 25%,transparent);}
  .rec-card-flag{font-size:22px;margin-bottom:5px;}
  .rec-card-name{font-family:'Tajawal',sans-serif;font-weight:700;font-size:var(--t-xs);color:var(--tx);margin-bottom:5px;line-height:1.35;}
  .rec-card-row{display:flex;justify-content:center;align-items:center;gap:5px;flex-wrap:wrap;}
  .rec-card-country{font-family:'Tajawal',sans-serif;font-size:9px;color:var(--txm);}
  .rec-card-style{font-family:'Tajawal',sans-serif;font-size:9px;background:color-mix(in srgb,var(--ac) 15%,transparent);color:var(--ac);padding:1px 6px;border-radius:var(--r-full);}
  .rec-card-status{margin-top:6px;font-family:'Tajawal',sans-serif;font-size:10px;color:var(--ac);font-weight:700;display:flex;align-items:center;justify-content:center;gap:4px;}
  .rec-waves{letter-spacing:1px;animation:recWave .7s ease-in-out infinite alternate;}
  @keyframes recWave{from{opacity:.3}to{opacity:1}}

  /* ════ READING STREAK ════ */
  .streak-card{background:linear-gradient(135deg,#7c2d12,#c2410c 55%,#f97316);border-radius:var(--r-xl);padding:14px 18px;margin-bottom:14px;display:flex;align-items:center;gap:14px;box-shadow:0 4px 22px rgba(234,88,12,.28);}
  .streak-flames{display:flex;gap:2px;flex-shrink:0;}
  .streak-flame{font-size:17px;opacity:.2;filter:grayscale(1);transition:.4s;}
  .streak-flame.lit{opacity:1;filter:none;}
  .streak-flame.lit:nth-child(1){animation:flamePop .4s .0s ease both}
  .streak-flame.lit:nth-child(2){animation:flamePop .4s .06s ease both}
  .streak-flame.lit:nth-child(3){animation:flamePop .4s .12s ease both}
  .streak-flame.lit:nth-child(4){animation:flamePop .4s .18s ease both}
  .streak-flame.lit:nth-child(5){animation:flamePop .4s .24s ease both}
  .streak-flame.lit:nth-child(6){animation:flamePop .4s .30s ease both}
  .streak-flame.lit:nth-child(7){animation:flamePop .4s .36s ease both}
  @keyframes flamePop{0%{transform:scale(.5)}65%{transform:scale(1.35)}100%{transform:scale(1)}}
  .streak-info{flex:1;direction:rtl;}
  .streak-count{font-family:'Tajawal',sans-serif;font-size:1.75em;font-weight:900;color:#fff;line-height:1;}
  .streak-unit{font-size:.48em;font-weight:500;opacity:.78;}
  .streak-label{font-family:'Tajawal',sans-serif;font-size:var(--t-xs);color:rgba(255,255,255,.72);margin-top:2px;}
  .streak-badge{background:rgba(255,255,255,.18);color:#fff;font-family:'Tajawal',sans-serif;font-size:10px;padding:3px 9px;border-radius:var(--r-full);font-weight:700;flex-shrink:0;}

  /* ════ KHATM TRACKER ════ */
  .khatm-page{padding:4px 0;display:flex;flex-direction:column;gap:16px}
  .khatm-hero{background:linear-gradient(135deg,#0a1628,#163060,var(--ac));border-radius:var(--r-xl);padding:26px 22px;display:flex;align-items:center;gap:20px;color:#fff;position:relative;overflow:hidden;box-shadow:var(--sh-lg)}
  .khatm-hero::before{content:'📖';position:absolute;right:14px;bottom:-6px;font-size:64px;opacity:.08}
  .khatm-hero::after{content:'';position:absolute;top:-40px;left:-40px;width:120px;height:120px;border-radius:50%;background:rgba(255,255,255,.06)}
  .khatm-ring-svg{width:110px;height:110px;flex-shrink:0;filter:drop-shadow(0 4px 12px rgba(0,0,0,.4))}
  .khatm-hero-info h2{font-family:'Amiri',serif;font-size:var(--t-xl);color:#f0d060;margin-bottom:5px;text-shadow:0 2px 8px rgba(0,0,0,.2)}
  .khatm-hero-info p{font-size:var(--t-sm);opacity:.85}
  .khatm-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:8px}
  @media(min-width:400px){.khatm-grid{grid-template-columns:repeat(6,1fr)}}
  @media(min-width:600px){.khatm-grid{grid-template-columns:repeat(10,1fr)}}
  .khatm-juz{position:relative;background:var(--card);border:2px solid var(--bdr);border-radius:var(--r-md);aspect-ratio:1;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;transition:.22s;overflow:hidden;box-shadow:var(--sh-sm)}
  .khatm-juz:hover{border-color:var(--ac);transform:scale(1.08);box-shadow:var(--sh-md)}
  .khatm-juz.done{background:linear-gradient(135deg,var(--ac),var(--ac2));border-color:transparent;color:#fff;box-shadow:var(--sh-ac)}
  .khatm-juz-n{font-size:var(--t-sm);font-weight:700;position:relative;z-index:1}
  .khatm-check{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:18px;opacity:.25}
  .khatm-congrats{background:linear-gradient(135deg,#f0d060,#f5c842);border-radius:var(--r-xl);padding:28px;text-align:center;color:#1a0a00;box-shadow:0 8px 32px rgba(240,208,96,.4)}
  .khatm-congrats h3{font-family:'Amiri',serif;font-size:var(--t-xl);font-weight:700;margin-bottom:8px}
  .khatm-congrats p{font-size:var(--t-sm);margin-bottom:18px;opacity:.8}
  .khatm-finish-btn{background:#1a3060;color:#f0d060;border:none;border-radius:var(--r-lg);padding:13px 28px;font-size:var(--t-md);font-weight:700;cursor:pointer;transition:.2s}
  .khatm-finish-btn:hover{background:#0e1e3d;transform:translateY(-1px)}
  .khatm-history{background:var(--card);border-radius:var(--r-xl);padding:16px;border:1px solid var(--bdr)}
  .khatm-history-title{font-family:'Amiri',serif;font-size:var(--t-lg);color:var(--ac);margin-bottom:12px;font-weight:700;padding-bottom:8px;border-bottom:1px solid var(--bdr)}
  .khatm-history-row{display:flex;justify-content:space-between;align-items:center;padding:9px 14px;background:var(--item);border-radius:var(--r-md);margin-bottom:6px;font-size:var(--t-sm);color:var(--tx);border:1px solid var(--bdr)}

  /* ════ OFFLINE CACHE ════ */
  .offline-page{padding:4px 0;display:flex;flex-direction:column;gap:14px}
  .offline-header{background:linear-gradient(135deg,var(--ac),var(--ac2));color:#fff;border-radius:var(--r-xl);padding:18px 20px;display:flex;align-items:center;gap:16px;box-shadow:var(--sh-ac)}
  .offline-header-icon{font-size:30px;flex-shrink:0}
  .offline-header h2{font-family:'Amiri',serif;font-size:var(--t-xl);margin-bottom:3px}
  .offline-header p{font-size:var(--t-xs);opacity:.85}
  .offline-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:9px}
  .offline-stat{background:var(--card);border-radius:var(--r-lg);padding:13px 8px;text-align:center;border:1px solid var(--bdr);box-shadow:var(--sh-sm)}
  .offline-stat-n{font-size:clamp(20px,6vw,28px);font-weight:700;color:var(--ac);margin-bottom:3px;line-height:1}
  .offline-stat small{font-size:var(--t-xs);color:var(--txm)}
  .offline-tabs{display:flex;gap:6px;margin-bottom:12px;background:var(--card);border-radius:var(--r-lg);padding:5px;border:1px solid var(--bdr)}
  .offline-tab{flex:1;padding:10px;border-radius:var(--r-md);border:none;background:transparent;color:var(--txm);font-size:var(--t-sm);cursor:pointer;transition:.2s;font-weight:600}
  .offline-tab.active{background:var(--ac);color:#fff;box-shadow:var(--sh-ac)}
  .offline-search{display:flex;gap:6px;background:var(--card);border-radius:var(--r-lg);padding:8px 12px;align-items:center;border:1px solid var(--bdr)}
  .offline-search input{flex:1;background:none;border:none;outline:none;font-size:var(--t-sm);color:var(--tx)}
  .offline-search button{background:none;border:none;color:var(--txm);cursor:pointer;font-size:14px;padding:2px 6px;transition:.2s}
  .offline-search button:hover{color:var(--ac)}
  .offline-list{display:flex;flex-direction:column;gap:6px;max-height:480px;overflow-y:auto}
  .offline-row{background:var(--card);border-radius:var(--r-lg);padding:11px 14px;display:flex;align-items:center;gap:12px;border:1px solid var(--bdr);transition:.2s;box-shadow:var(--sh-sm)}
  .offline-row.cached{border-color:var(--ac)44;background:var(--card2)}
  .offline-row-info{flex:1}
  .offline-row-name{font-size:var(--t-sm);font-weight:700;color:var(--tx);display:block}
  .offline-row-sub{font-size:var(--t-xs);color:var(--txm);margin-top:2px}
  .offline-row-action{display:flex;align-items:center;gap:7px}
  .offline-cached-badge{font-size:var(--t-xs);color:#16a34a;font-weight:700;display:flex;align-items:center;gap:3px}
  .offline-dl-btn{background:var(--ac);color:#fff;border:none;border-radius:var(--r-full);padding:7px 14px;font-size:var(--t-xs);font-weight:600;cursor:pointer;white-space:nowrap;transition:.2s;box-shadow:var(--sh-ac)}
  .offline-dl-btn:hover{filter:brightness(1.1)}
  .offline-dl-btn:disabled{opacity:.6;cursor:wait}
  .offline-empty{text-align:center;padding:44px 20px;color:var(--txm)}
  .offline-empty p{font-size:var(--t-md);margin-bottom:6px;color:var(--tx)}
  .offline-empty small{font-size:var(--t-xs)}
  .offline-saved-list{display:flex;flex-direction:column;gap:9px}
  .offline-saved-card{background:var(--card);border-radius:var(--r-xl);padding:14px 16px;display:flex;align-items:center;gap:12px;border:1px solid var(--bdr);border-right:3px solid var(--ac);box-shadow:var(--sh-sm)}
  .offline-saved-info{flex:1}
  .offline-saved-name{font-family:'Amiri',serif;font-size:var(--t-lg);color:var(--tx);font-weight:700}
  .offline-saved-sub{font-size:var(--t-xs);color:var(--txm);margin-top:3px}
  .offline-saved-btns{display:flex;gap:7px;align-items:center}
  .offline-read-btn{background:var(--ac);color:#fff;border:none;border-radius:var(--r-lg);padding:8px 16px;font-size:var(--t-sm);font-weight:700;cursor:pointer;transition:.2s;box-shadow:var(--sh-ac)}
  .offline-read-btn:hover{filter:brightness(1.1)}
  .offline-reader{padding:4px 0}
  .offline-reader-hdr{display:flex;align-items:center;gap:10px;margin-bottom:14px;flex-wrap:wrap}
  .offline-reader-title{font-family:'Amiri',serif;font-size:var(--t-xl);color:var(--ac);font-weight:700;flex:1;text-align:center}
  .offline-badge{background:#1a3060;color:#f0d060;border-radius:var(--r-md);padding:4px 12px;font-size:var(--t-xs);font-weight:700}
  .offline-del-btn{background:none;border:1px solid var(--bdr);font-size:14px;cursor:pointer;padding:5px 8px;border-radius:var(--r-sm);transition:.15s;color:var(--txm)}
  .offline-del-btn:hover{background:#fee2e2;color:#ef4444;border-color:#ef4444}

  /* ════ MISC UI ════ */
  .action-row{display:flex;gap:7px;flex-wrap:wrap;margin-bottom:12px;align-items:center}
  .nav-btn{display:flex;align-items:center;gap:4px;background:var(--ac);color:#fff;border:none;border-radius:var(--r-md);padding:7px 11px;font-size:var(--t-sm);white-space:nowrap;flex-shrink:0;min-height:38px;transition:.2s;box-shadow:var(--sh-ac)}
  .nav-btn:hover{filter:brightness(1.1);transform:translateY(-1px)}
  .nav-btn:hover{background:var(--ac2)} .nav-btn:disabled{opacity:.35;cursor:not-allowed}
  @media(max-width:767px){.nav-btn{display:none!important}}
  @media(max-width:767px){.nav-bar{justify-content:center}}
  .back-btn{background:var(--item);color:var(--tx);border:none;border-radius:7px;padding:6px 12px;font-size:var(--t-sm);font-family:'Tajawal',sans-serif;display:inline-block;transition:.2s;min-height:34px}
  .back-btn:hover{background:var(--ac);color:#fff}
  .save-bk{background:var(--item);color:var(--tx);border:1.5px solid var(--bdr);border-radius:7px;padding:5px 11px;font-size:var(--t-xs);font-family:'Tajawal',sans-serif;display:inline-flex;align-items:center;gap:4px;transition:.2s;min-height:32px;cursor:pointer}
  .save-bk.saved,.save-bk:hover{background:var(--ac);color:#fff;border-color:var(--ac)}
  .bk-dot{width:8px;height:8px;border-radius:50%;background:var(--ac);position:absolute;top:6px;right:6px;display:block}
  .bk-flag{font-size:12px;margin-left:4px}

  /* parts grid */
  .parts-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(80px,1fr));gap:7px}
  .part-btn{position:relative;background:var(--item);border:none;border-radius:8px;padding:12px 6px;font-family:'Tajawal',sans-serif;font-size:var(--t-sm);color:var(--tx);transition:.2s;min-height:46px}
  .part-btn:hover{background:var(--ac);color:#fff}

  /* ════ SURAHS LIST ════ */
  .surahs-list{display:flex;flex-direction:column;gap:7px}
  .surah-row{display:flex;justify-content:space-between;align-items:center;background:var(--card);border-radius:var(--r-lg);padding:13px 16px;cursor:pointer;transition:.2s;border:1px solid var(--bdr);position:relative;box-shadow:var(--sh-sm)}
  .surah-row:hover{border-color:var(--ac)44;background:var(--card2);box-shadow:var(--sh-md);transform:translateX(-2px)}
  .s-side p{font-size:var(--t-xs);color:var(--txm)} .s-side p:first-child{font-size:var(--t-sm);color:var(--tx);font-weight:600}

  /* ════ TASBIH ════ */
  /* ══ TASBIH ══ */
  .tasbih-wrap{padding:4px 0}
  .t-phrase-scroll{display:flex;gap:8px;overflow-x:auto;padding:0 2px 8px;scrollbar-width:none;margin-bottom:14px}
  .t-phrase-scroll::-webkit-scrollbar{display:none}
  .t-phrase{white-space:nowrap;background:var(--card);border:1.5px solid var(--bdr);border-radius:var(--r-full);padding:8px 18px;font-family:'Amiri',serif;font-size:var(--t-sm);color:var(--tx);cursor:pointer;transition:.2s;box-shadow:var(--sh-sm);flex-shrink:0}
  .t-phrase:hover{border-color:var(--ac);color:var(--ac)}
  .t-phrase.active{background:var(--ac);color:#fff;border-color:var(--ac);box-shadow:var(--sh-ac)}
  .tasbih-hero{background:linear-gradient(160deg,var(--dk),var(--ac));border-radius:var(--r-xl);padding:24px 16px 20px;text-align:center;margin-bottom:14px;position:relative;overflow:hidden}
  .tasbih-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 70% 60% at 50% -10%,rgba(255,255,255,.12),transparent);pointer-events:none}
  .t-name{font-family:'Amiri',serif;font-size:1.6em;color:#fff;margin-bottom:4px;position:relative;text-shadow:0 2px 12px rgba(0,0,0,.2)}
  .t-meaning{font-family:'Tajawal',sans-serif;font-size:12px;color:rgba(255,255,255,.65);margin-bottom:16px;position:relative}
  .t-counter-ring{position:relative;width:200px;height:200px;margin:0 auto 14px;display:flex;align-items:center;justify-content:center}
  .t-ring-svg{position:absolute;inset:0;transform:rotate(-90deg)}
  .t-ring-bg{stroke:rgba(255,255,255,.15);fill:none}
  .t-ring-fill{stroke:rgba(255,255,255,.9);fill:none;stroke-linecap:round;transition:stroke-dashoffset .4s cubic-bezier(.22,1,.36,1)}
  .t-count-inner{display:flex;flex-direction:column;align-items:center;gap:2px;position:relative}
  .t-count{font-size:clamp(46px,13vw,70px);font-weight:900;color:#fff;line-height:1;font-variant-numeric:tabular-nums}
  .t-count-label{font-family:'Tajawal',sans-serif;font-size:11px;color:rgba(255,255,255,.6)}
  .t-lap-badge{background:rgba(255,255,255,.18);color:#fff;font-family:'Tajawal',sans-serif;font-size:11px;font-weight:700;padding:3px 10px;border-radius:var(--r-full);margin-top:4px}
  .t-btn-row{display:flex;align-items:center;justify-content:center;gap:16px;margin-bottom:14px}
  .t-btn{background:linear-gradient(135deg,var(--ac),var(--ac2));color:#fff;border:none;border-radius:50%;width:94px;height:94px;font-size:32px;cursor:pointer;transition:.12s;box-shadow:0 8px 32px var(--ac)55;display:inline-flex;align-items:center;justify-content:center;position:relative}
  .t-btn::after{content:'';position:absolute;inset:-4px;border-radius:50%;border:2px solid var(--ac);opacity:.4;animation:tRipple 1.8s ease-in-out infinite}
  @keyframes tRipple{0%,100%{transform:scale(1);opacity:.4}50%{transform:scale(1.12);opacity:0}}
  .t-btn:active{transform:scale(.88)}
  .t-btn-undo{background:var(--item);border:1.5px solid var(--bdr);border-radius:50%;width:46px;height:46px;font-size:18px;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:.15s;color:var(--txm)}
  .t-btn-undo:hover{border-color:var(--ac);color:var(--ac)}
  .t-bottom-row{display:flex;align-items:center;justify-content:space-between;gap:12px;direction:rtl;margin-top:4px}
  .t-info{font-family:'Tajawal',sans-serif;font-size:var(--t-xs);color:var(--txm)}
  .t-reset{background:transparent;border:1.5px solid var(--bdr);color:var(--txm);border-radius:var(--r-full);padding:7px 18px;font-size:var(--t-xs);font-family:'Tajawal',sans-serif;cursor:pointer;transition:.2s}
  .t-reset:hover{border-color:var(--ac);color:var(--ac)}
  .t-sessions{display:flex;gap:5px;flex-wrap:wrap;justify-content:center;margin-top:10px}
  .t-session-dot{width:10px;height:10px;border-radius:50%;background:var(--ac);opacity:.22;transition:.3s}
  .t-session-dot.done{opacity:1}

  /* HT2 HOME TAB */
  .ht2-page{padding:0}
  .ht2-hero{position:relative;overflow:hidden;border-radius:var(--r-xl);padding:36px 24px 28px;text-align:center;margin-bottom:18px;background:linear-gradient(160deg,#0a0e1a 0%,#0f2040 40%,#1a1035 100%)}
  .ht2-hero-glow{position:absolute;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,var(--ac) 0%,transparent 70%);opacity:.15;filter:blur(60px);top:-80px;left:50%;transform:translateX(-50%);pointer-events:none;animation:heroGlow 4s ease-in-out infinite alternate}
  @keyframes heroGlow{from{opacity:.1;transform:translateX(-50%) scale(.9)}to{opacity:.2;transform:translateX(-50%) scale(1.1)}}
  .ht2-hero-pattern{position:absolute;inset:0;opacity:.03;background-image:repeating-linear-gradient(0deg,transparent,transparent 28px,rgba(255,255,255,.8) 28px,rgba(255,255,255,.8) 29px),repeating-linear-gradient(90deg,transparent,transparent 28px,rgba(255,255,255,.8) 28px,rgba(255,255,255,.8) 29px);pointer-events:none}
  .ht2-time{font-family:'Tajawal',sans-serif;font-size:13px;color:rgba(255,255,255,.35);margin-bottom:12px;position:relative;letter-spacing:.5px}
  .ht2-bismillah{font-family:'Amiri',serif;font-size:clamp(22px,5.5vw,32px);color:var(--ac);margin-bottom:10px;position:relative;text-shadow:0 0 40px var(--ac)66;line-height:1.4}
  .ht2-welcome{font-family:'Tajawal',sans-serif;font-size:13px;color:rgba(255,255,255,.4);margin-bottom:18px;position:relative}
  .ht2-ayah-box{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:var(--r-xl);padding:16px 18px;margin-bottom:20px;position:relative;backdrop-filter:blur(10px)}
  .ht2-ayah-text{font-family:'Amiri',serif;font-size:clamp(16px,4vw,21px);color:rgba(255,255,255,.9);line-height:2;direction:rtl;margin-bottom:8px}
  .ht2-ayah-meta{font-family:'Tajawal',sans-serif;font-size:11px;color:var(--ac);opacity:.8}
  .ht2-hero-btns{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-bottom:18px;position:relative}
  .ht2-btn-main,.ht2-btn-sec{display:flex;align-items:center;gap:7px;font-family:'Tajawal',sans-serif;font-size:14px;font-weight:700;border:none;border-radius:var(--r-full);padding:12px 24px;cursor:pointer;transition:.2s}
  .ht2-btn-main{background:linear-gradient(135deg,var(--ac),var(--ac2));color:#fff;box-shadow:0 4px 20px var(--ac)44}
  .ht2-btn-main:hover{transform:translateY(-2px);box-shadow:0 8px 28px var(--ac)55}
  .ht2-btn-sec{background:rgba(255,255,255,.1);color:#fff;border:1.5px solid rgba(255,255,255,.2);backdrop-filter:blur(8px)}
  .ht2-btn-sec:hover{background:rgba(255,255,255,.18);transform:translateY(-2px)}
  .ht2-btn-icon{font-size:16px}
  .ht2-search{display:flex;max-width:440px;margin:0 auto;position:relative;background:rgba(255,255,255,.08);border:1.5px solid rgba(255,255,255,.15);border-radius:var(--r-full);overflow:hidden;backdrop-filter:blur(10px);transition:.2s}
  .ht2-search:focus-within{border-color:var(--ac);box-shadow:0 0 0 3px var(--ac)22}
  .ht2-search input{flex:1;background:transparent;border:none;padding:12px 20px;font-family:'Tajawal',sans-serif;font-size:14px;color:#fff;direction:rtl;outline:none}
  .ht2-search input::placeholder{color:rgba(255,255,255,.35)}
  .ht2-search-btn{background:var(--ac);border:none;padding:0 18px;font-size:17px;cursor:pointer;transition:.15s;color:#fff}
  .ht2-search-btn:hover{filter:brightness(1.12)}
  .ht2-section{margin-bottom:16px}
  .ht2-sec-hdr{display:flex;align-items:center;gap:10px;margin-bottom:12px;direction:rtl}
  .ht2-sec-title{font-family:'Tajawal',sans-serif;font-size:14px;font-weight:800;color:var(--tx);white-space:nowrap}
  .ht2-sec-line{flex:1;height:1px;background:var(--bdr)}
  .ht2-quick{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
  @media(min-width:500px){.ht2-quick{grid-template-columns:repeat(8,1fr)}}
  .ht2-quick-btn{background:var(--card);border:1.5px solid var(--bdr);border-radius:var(--r-xl);padding:14px 6px 11px;display:flex;flex-direction:column;align-items:center;gap:6px;cursor:pointer;transition:.22s;box-shadow:var(--sh-sm);position:relative;overflow:hidden}
  .ht2-quick-btn:hover{border-color:var(--qc);transform:translateY(-3px);box-shadow:0 6px 20px var(--qc)22}
  .ht2-quick-ico-wrap{width:40px;height:40px;border-radius:var(--r-lg);background:var(--qc)18;display:flex;align-items:center;justify-content:center;transition:.22s}
  .ht2-quick-btn:hover .ht2-quick-ico-wrap{background:var(--qc)30;transform:scale(1.08)}
  .ht2-quick-ico{font-size:20px}
  .ht2-quick-lbl{font-family:'Tajawal',sans-serif;font-size:10px;color:var(--txm);white-space:nowrap}
  /* VERSE COUNTER */
  .vc-wrap{background:var(--card);border:1.5px solid var(--bdr);border-radius:var(--r-xl);padding:16px;margin-bottom:14px;direction:rtl}
  .vc-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}
  .vc-title{font-family:'Tajawal',sans-serif;font-size:14px;font-weight:800;color:var(--tx)}
  .vc-goal-lbl{font-family:'Tajawal',sans-serif;font-size:11px;color:var(--txm);background:var(--item);padding:3px 10px;border-radius:var(--r-full)}
  .vc-body{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}
  .vc-count{display:flex;align-items:baseline;gap:5px;transition:transform .15s}
  .vc-count.vc-burst{transform:scale(1.18)}
  .vc-num{font-family:'Tajawal',sans-serif;font-size:48px;font-weight:900;color:var(--ac);line-height:1}
  .vc-unit{font-family:'Tajawal',sans-serif;font-size:14px;color:var(--txm)}
  .vc-bar-wrap{display:flex;align-items:center;gap:10px;margin-bottom:12px}
  .vc-bar{flex:1;height:8px;background:var(--bdr);border-radius:8px;overflow:hidden}
  .vc-bar-fill{height:100%;background:linear-gradient(90deg,var(--ac),var(--ac2));border-radius:8px;transition:width .4s ease}
  .vc-bar-lbl{font-family:'Tajawal',sans-serif;font-size:11px;color:var(--txm);white-space:nowrap}
  .vc-actions{display:flex;gap:8px}
  .vc-btn-add{flex:1;background:linear-gradient(135deg,var(--ac),var(--ac2));color:#fff;border:none;border-radius:var(--r-full);padding:10px 18px;font-family:'Tajawal',sans-serif;font-size:14px;font-weight:700;cursor:pointer;transition:.18s;box-shadow:0 3px 12px var(--ac)33}
  .vc-btn-add:hover{transform:translateY(-2px);box-shadow:0 6px 18px var(--ac)44}
  .vc-btn-add:active{transform:scale(.95)}
  .vc-btn-reset{background:var(--item);color:var(--txm);border:1.5px solid var(--bdr);border-radius:var(--r-full);width:40px;height:40px;font-size:16px;cursor:pointer;transition:.18s}
  .vc-btn-reset:hover{border-color:var(--ac);color:var(--ac)}

  /* WORD BY WORD PANEL */
  .wbw-panel{background:var(--card);border:1.5px solid var(--bdr);border-radius:var(--r-xl);padding:14px;margin-bottom:12px;direction:rtl;animation:fadeInScale .2s ease}
  .wbw-hdr{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}
  .wbw-title{font-family:'Tajawal',sans-serif;font-size:13px;font-weight:700;color:var(--ac)}
  .wbw-close{background:var(--item);border:1px solid var(--bdr);border-radius:50%;width:28px;height:28px;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:11px;color:var(--txm);transition:.15s}
  .wbw-close:hover{background:var(--ac);color:#fff;border-color:var(--ac)}
  .wbw-loading{font-family:'Tajawal',sans-serif;font-size:13px;color:var(--txm);text-align:center;padding:20px}
  .wbw-spin{display:inline-block;animation:spin 1s linear infinite}
  .wbw-empty{font-family:'Tajawal',sans-serif;font-size:13px;color:var(--txm);text-align:center;padding:16px}
  .wbw-words{display:flex;flex-wrap:wrap;gap:8px;justify-content:center}
  .wbw-word{background:var(--item);border:1.5px solid var(--bdr);border-radius:var(--r-lg);padding:10px 12px;text-align:center;min-width:68px;cursor:pointer;transition:.2s;position:relative}
  .wbw-word:hover{border-color:var(--ac);transform:translateY(-2px);box-shadow:0 4px 12px var(--ac)22}
  .wbw-word-sel{border-color:var(--ac)!important;background:var(--ac)0f!important;box-shadow:0 4px 16px var(--ac)28!important}
  .wbw-ar{font-family:'Amiri',serif;font-size:19px;color:var(--tx);margin-bottom:4px;line-height:1.8}
  .wbw-tr{font-family:'Tajawal',sans-serif;font-size:9px;color:var(--txm);line-height:1.4}
  .wbw-meaning{position:absolute;bottom:calc(100% + 6px);left:50%;transform:translateX(-50%);background:rgba(0,0,0,.85);color:#fff;font-family:'Tajawal',sans-serif;font-size:10px;padding:4px 10px;border-radius:8px;white-space:nowrap;z-index:50;pointer-events:none}

  /* LIVE PAGE v3 */
  .live3-page{padding:4px 0}
  .live3-hero{border-radius:var(--r-xl);padding:28px 20px 24px;text-align:center;position:relative;overflow:hidden;background:#0a0a14;margin-bottom:16px}
  .live3-hero-bg{position:absolute;inset:0;background:radial-gradient(ellipse 70% 60% at 50% 0%,var(--lc,#10b981)22,transparent);pointer-events:none}
  .live3-badge-row{display:flex;align-items:center;justify-content:center;gap:6px;margin-bottom:16px;position:relative}
  .live3-dot{width:10px;height:10px;border-radius:50%;background:#6b7280;transition:.3s}
  .live3-dot-live{background:#ef4444;box-shadow:0 0 12px #ef4444;animation:livePulse 1.4s ease-in-out infinite}
  @keyframes livePulse{0%,100%{box-shadow:0 0 0 0 rgba(239,68,68,.5)}60%{box-shadow:0 0 0 8px transparent}}
  .live3-badge-txt{font-family:'Tajawal',sans-serif;font-size:12px;font-weight:700;color:#9ca3af}
  .live3-dot-live+.live3-badge-txt{color:#ef4444}
  .live3-hero-icon{font-size:48px;margin-bottom:10px;position:relative;filter:drop-shadow(0 4px 16px var(--lc,#10b981)55)}
  .live3-hero-name{font-family:'Tajawal',sans-serif;font-size:clamp(18px,5vw,26px);font-weight:800;color:#fff;margin:0 0 4px;position:relative}
  .live3-hero-sub{font-family:'Tajawal',sans-serif;font-size:12px;color:rgba(255,255,255,.5);margin-bottom:20px;position:relative}
  .live3-eq-row{display:flex;align-items:flex-end;justify-content:center;gap:4px;height:40px;margin-bottom:20px;position:relative}
  .live3-eq-bar{width:6px;border-radius:3px;background:var(--lc,#10b981);min-height:4px}
  .live3-controls{display:flex;flex-direction:column;align-items:center;gap:14px;position:relative}
  .live3-play-btn{background:linear-gradient(135deg,var(--lc,#10b981),var(--lc,#10b981)88);border:none;border-radius:50%;width:64px;height:64px;font-size:26px;color:#fff;cursor:pointer;transition:.15s;box-shadow:0 6px 24px var(--lc,#10b981)44;display:flex;align-items:center;justify-content:center}
  .live3-play-btn:hover{transform:scale(1.06)}
  .live3-play-btn:active{transform:scale(.94)}
  .live3-spin{animation:spin 1s linear infinite;display:inline-block}
  .live3-vol-wrap{display:flex;align-items:center;gap:8px;color:rgba(255,255,255,.6);font-size:15px}
  .live3-vol{accent-color:var(--lc,#10b981);width:120px}
  .live3-streams-title{font-family:'Tajawal',sans-serif;font-size:14px;font-weight:700;color:var(--tx);margin-bottom:10px;direction:rtl}
  .live3-streams{display:flex;flex-direction:column;gap:8px;margin-bottom:14px}
  .live3-stream-card{background:var(--card);border:1.5px solid var(--bdr);border-radius:var(--r-xl);padding:14px 16px;display:flex;align-items:center;gap:12px;cursor:pointer;transition:.2s;direction:rtl}
  .live3-stream-card:hover{border-color:var(--sc);box-shadow:0 4px 16px var(--sc)18;transform:translateX(-2px)}
  .live3-stream-active{border-color:var(--sc)!important;background:var(--sc)0a!important;box-shadow:0 4px 20px var(--sc)22!important}
  .live3-stream-icon{font-size:28px;flex-shrink:0}
  .live3-stream-info{flex:1}
  .live3-stream-name{font-family:'Tajawal',sans-serif;font-size:14px;font-weight:700;color:var(--tx)}
  .live3-stream-sub{font-family:'Tajawal',sans-serif;font-size:11px;color:var(--txm);margin-top:2px}
  .live3-stream-eq{display:flex;align-items:flex-end;gap:2px;height:16px;flex-shrink:0}
  .live3-stream-eq span{width:4px;background:var(--sc);border-radius:2px;animation:recWave2 1s ease-in-out infinite}
  .live3-stream-eq span:nth-child(2){animation-delay:.25s;height:60%}
  .live3-stream-eq span:nth-child(3){animation-delay:.5s}
  .live3-tips{display:flex;flex-direction:column;gap:6px}
  .live3-tip{font-family:'Tajawal',sans-serif;font-size:12px;color:var(--txm);direction:rtl;padding:8px 12px;background:var(--item);border-radius:var(--r-md)}
.live3-nav-btn{background:var(--item);border:1.5px solid var(--bdr);color:var(--tx);border-radius:var(--r-full);width:40px;height:40px;font-size:18px;cursor:pointer;transition:.18s;display:flex;align-items:center;justify-content:center;flex-shrink:0}
  .live3-nav-btn:hover{background:var(--ac);color:#fff;border-color:var(--ac)}
  .live3-nav-btn:disabled{opacity:.25;cursor:not-allowed}
  .live3-autonext{background:var(--item);border:1.5px solid var(--bdr);color:var(--txm);border-radius:var(--r-full);padding:6px 16px;font-family:'Tajawal',sans-serif;font-size:12px;font-weight:700;cursor:pointer;transition:.18s;margin-top:8px}
  .live3-autonext.on{background:var(--ac);color:#fff;border-color:var(--ac)}
  .live3-section-title{font-family:'Tajawal',sans-serif;font-size:14px;font-weight:800;color:var(--tx);padding:14px 4px 8px;direction:rtl}
  .live3-surah-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(90px,1fr));gap:6px;margin-bottom:18px}
  .live3-surah-btn{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;background:var(--item);border:1.5px solid var(--bdr);border-radius:var(--r-md);padding:8px 4px;cursor:pointer;transition:.18s;font-family:'Tajawal',sans-serif}
  .live3-surah-btn:hover{border-color:var(--ac);background:var(--ac)10}
  .live3-surah-btn.active{background:var(--ac);border-color:var(--ac);box-shadow:0 2px 10px var(--ac)33}
  .live3-surah-btn.active .live3-surah-num,.live3-surah-btn.active .live3-surah-name{color:#fff}
  .live3-surah-num{font-size:10px;font-weight:700;color:var(--txm)}
  .live3-surah-name{font-size:11px;font-weight:700;color:var(--tx);text-align:center;line-height:1.3}
  .live3-hero-rings{position:absolute;inset:0;pointer-events:none;overflow:hidden}
  .live3-hero-rings::before,.live3-hero-rings::after{content:'';position:absolute;border-radius:50%;border:1px solid var(--lc,#10b981);opacity:.12;top:50%;left:50%;transform:translate(-50%,-50%)}
  .live3-hero-rings::before{width:280px;height:280px}
  .live3-hero-rings::after{width:180px;height:180px;opacity:.18}
  .live3-icon-pulse{animation:iconPulse 2s ease-in-out infinite}
  @keyframes iconPulse{0%,100%{filter:drop-shadow(0 4px 16px var(--lc,#10b981)55)}50%{filter:drop-shadow(0 4px 30px var(--lc,#10b981)99)}}
  .live3-elapsed{font-family:'Tajawal',sans-serif;font-size:11px;color:rgba(255,255,255,.5);background:rgba(255,255,255,.08);border-radius:20px;padding:2px 8px;margin-right:4px}
  .live3-cat-row{display:flex;gap:6px;margin-bottom:12px;overflow-x:auto;scrollbar-width:none;padding-bottom:2px}
  .live3-cat-row::-webkit-scrollbar{display:none}
  .live3-cat-btn{font-family:'Tajawal',sans-serif;white-space:nowrap;background:var(--item);border:1.5px solid transparent;border-radius:var(--r-full);padding:7px 16px;font-size:12px;color:var(--txm);cursor:pointer;transition:.2s;flex-shrink:0}
  .live3-cat-btn.on{border-color:var(--ac);color:var(--ac);background:var(--ac)12;font-weight:700}
  .live3-stream-end{display:flex;flex-direction:column;align-items:flex-end;gap:4px;flex-shrink:0}
  .live3-cat-badge{font-family:'Tajawal',sans-serif;font-size:9px;background:var(--sc)18;color:var(--sc);border-radius:var(--r-full);padding:2px 7px;font-weight:600}
  /* RECITERS PAGE v3 */
  .rec3-page{padding:4px 0}
  .rec3-player-bar{position:sticky;top:0;z-index:40;background:var(--dk);border-bottom:1px solid var(--bdr);padding:10px 14px;display:flex;align-items:center;gap:10px;flex-wrap:wrap;direction:rtl;backdrop-filter:blur(12px);box-shadow:var(--sh-md);margin:-4px -16px 14px;border-radius:0 0 var(--r-xl) var(--r-xl)}
  .rec3-pb-info{display:flex;align-items:center;gap:10px;flex:1;min-width:160px}
  .rec3-pb-avatar{width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,var(--ac),var(--ac2));color:#fff;font-family:'Tajawal',sans-serif;font-size:17px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0}
  .rec3-pb-name{font-family:'Tajawal',sans-serif;font-size:13px;font-weight:700;color:var(--tx)}
  .rec3-pb-meta{font-family:'Tajawal',sans-serif;font-size:10px;color:var(--txm);margin-top:1px}
  .rec3-pb-center{flex:1;min-width:200px}
  .rec3-audio{width:100%;height:36px;border-radius:var(--r-full);accent-color:var(--ac)}
  .rec3-pb-right{display:flex;gap:6px;flex-shrink:0;flex-wrap:wrap}
  .rec3-sel{background:var(--item);border:1.5px solid var(--bdr);border-radius:var(--r-md);padding:5px 10px;font-family:'Tajawal',sans-serif;font-size:11px;color:var(--tx);direction:rtl;cursor:pointer;max-width:130px}
  .rec3-hdr{display:flex;align-items:center;margin-bottom:14px;direction:rtl}
  .rec3-hdr-left{display:flex;align-items:center;gap:12px}
  .rec3-hdr-icon{font-size:30px}
  .rec3-title{font-family:'Tajawal',sans-serif;font-size:var(--t-xl);font-weight:800;color:var(--tx);margin:0}
  .rec3-sub{font-family:'Tajawal',sans-serif;font-size:11px;color:var(--txm);margin:2px 0 0}
  .rec3-search-wrap{position:relative;margin-bottom:10px}
  .rec3-search{width:100%;background:var(--card);border:1.5px solid var(--bdr);border-radius:var(--r-full);padding:10px 40px 10px 16px;font-family:'Tajawal',sans-serif;font-size:14px;color:var(--tx);direction:rtl;outline:none;transition:.2s;box-sizing:border-box}
  .rec3-search:focus{border-color:var(--ac);box-shadow:0 0 0 3px var(--ac)18}
  .rec3-search-icon{position:absolute;left:14px;top:50%;transform:translateY(-50%);font-size:16px;pointer-events:none}
  .rec3-filters{display:flex;gap:6px;margin-bottom:14px;overflow-x:auto;scrollbar-width:none;padding-bottom:2px}
  .rec3-filters::-webkit-scrollbar{display:none}
  .rec3-filt{font-family:'Tajawal',sans-serif;white-space:nowrap;background:var(--item);border:1.5px solid transparent;border-radius:var(--r-full);padding:7px 16px;font-size:12px;color:var(--txm);cursor:pointer;transition:.2s;flex-shrink:0}
  .rec3-filt.on{border-color:var(--ac);color:var(--ac);background:var(--ac)12;font-weight:700}
  .rec3-loading{text-align:center;padding:48px 20px;color:var(--txm)}
  .rec3-loading-dots{display:flex;justify-content:center;gap:6px;margin-bottom:12px}
  .rec3-loading-dots span{width:10px;height:10px;border-radius:50%;background:var(--ac);animation:ldots 1.4s ease-in-out infinite}
  .rec3-loading-dots span:nth-child(2){animation-delay:.2s}
  .rec3-loading-dots span:nth-child(3){animation-delay:.4s}
  @keyframes ldots{0%,80%,100%{transform:scale(.6);opacity:.4}40%{transform:scale(1);opacity:1}}
  .rec3-error{font-family:'Tajawal',sans-serif;text-align:center;padding:20px;background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.2);border-radius:var(--r-xl);color:#ef4444;margin-bottom:14px}
  .rec3-empty{font-family:'Tajawal',sans-serif;text-align:center;padding:40px;color:var(--txm);font-size:var(--t-md)}
  .rec3-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
  @media(min-width:480px){.rec3-grid{grid-template-columns:repeat(4,1fr)}}
  @media(min-width:700px){.rec3-grid{grid-template-columns:repeat(5,1fr)}}
  .rec3-card{background:var(--card);border:1.5px solid var(--bdr);border-radius:var(--r-xl);padding:14px 8px 12px;display:flex;flex-direction:column;align-items:center;gap:6px;cursor:pointer;transition:.22s;position:relative;overflow:hidden;box-shadow:var(--sh-sm)}
  .rec3-card:hover{border-color:var(--ac)88;box-shadow:var(--sh-md);transform:translateY(-3px)}
  .rec3-card-active{border-color:var(--ac)!important;background:var(--ac)0c!important;box-shadow:0 4px 24px var(--ac)28!important}
  .rec3-fav-btn{position:absolute;top:6px;left:6px;background:none;border:none;cursor:pointer;font-size:13px;padding:2px;line-height:1;transition:.15s;opacity:.5}
  .rec3-fav-btn:hover,.rec3-fav-btn.on{opacity:1}
  .rec3-pop-badge{position:absolute;top:6px;right:6px;font-size:10px;line-height:1}
  .rec3-avatar{width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,var(--ac),var(--ac2));color:#fff;font-family:'Tajawal',sans-serif;font-size:22px;font-weight:800;display:flex;align-items:center;justify-content:center;position:relative;margin-bottom:2px}
  .rec3-avatar.pulse{animation:rec3Pulse 1.8s ease-in-out infinite}
  @keyframes rec3Pulse{0%{box-shadow:0 0 0 0 var(--ac)44}70%{box-shadow:0 0 0 10px transparent}100%{box-shadow:0 0 0 0 transparent}}
  .rec3-eq{position:absolute;bottom:2px;left:50%;transform:translateX(-50%);display:flex;align-items:flex-end;gap:2px;height:10px}
  .rec3-eq span{width:3px;border-radius:2px;background:#fff;animation:recWave2 1s ease-in-out infinite}
  .rec3-eq span:nth-child(2){animation-delay:.2s}
  .rec3-eq span:nth-child(3){animation-delay:.4s}
  .rec3-eq span:nth-child(4){animation-delay:.6s}
  .rec3-card-name{font-family:'Tajawal',sans-serif;font-size:12px;font-weight:700;color:var(--tx);text-align:center;line-height:1.4}
  .rec3-card-tags{display:flex;flex-wrap:wrap;gap:3px;justify-content:center}
  .rec3-tag{font-family:'Tajawal',sans-serif;font-size:9px;background:var(--ac)18;color:var(--ac);border-radius:var(--r-full);padding:2px 7px;font-weight:600}
  .rec3-tag-b{background:var(--item);color:var(--txm)}
  /* ══ HOME TAB ══ */

  .home-tab{padding:4px 0}
  /* ════ PRAYER TIMES ════ */
  .prayer-wrap{margin-bottom:16px}
  .prayer-header{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;margin-bottom:14px}
  .prayer-city{font-size:var(--t-sm);color:var(--ac);font-weight:700;display:flex;align-items:center;gap:6px}
  .prayer-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:9px}
  @media(min-width:500px){.prayer-grid{grid-template-columns:repeat(6,1fr)}}
  .prayer-card{background:var(--card);border-radius:var(--r-lg);padding:12px 8px;text-align:center;border:1.5px solid var(--bdr);transition:.25s;box-shadow:var(--sh-sm)}
  .prayer-card.active{border-color:var(--ac);background:var(--ac)10;box-shadow:var(--sh-ac)}
  .prayer-time{font-size:var(--t-md);color:var(--tx);font-weight:700}
  .prayer-name{font-size:var(--t-xs);color:var(--txm);margin-top:4px}
  .prayer-card.active .prayer-time{color:var(--ac)} .prayer-card.active .prayer-name{color:var(--ac);font-weight:600}
  .notif-btn{background:var(--item);border:1.5px solid var(--bdr);border-radius:var(--r-full);padding:7px 16px;font-size:var(--t-xs);color:var(--tx);cursor:pointer;transition:.2s;display:flex;align-items:center;gap:6px}
  .notif-btn.on{background:var(--ac);color:#fff;border-color:var(--ac)}

  /* ════ QIBLA ════ */
  .qibla-wrap{text-align:center;padding:10px 0;max-width:380px;margin:0 auto}
  .qibla-wrap h3{font-family:'Amiri',serif;font-size:var(--t-xl);color:var(--ac);margin-bottom:6px}
  .qibla-sub{font-size:var(--t-xs);color:var(--txm);margin-bottom:20px;line-height:1.6}
  .qibla-err{color:#ef4444;font-size:var(--t-sm);margin-top:14px}
  .qibla-compass-outer{position:relative;width:min(240px,80vw);height:min(240px,80vw);margin:0 auto 16px;border-radius:50%;background:${dark? "#1a1d27":"#f5f7ff"};border:3px solid var(--bdr2);box-shadow:var(--sh-lg)}
  .qibla-n,.qibla-s,.qibla-e,.qibla-w{position:absolute;font-size:13px;font-weight:700;color:var(--txm)}
  .qibla-n{top:6px;left:50%;transform:translateX(-50%)}
  .qibla-s{bottom:6px;left:50%;transform:translateX(-50%)}
  .qibla-e{right:8px;top:50%;transform:translateY(-50%)}
  .qibla-w{left:8px;top:50%;transform:translateY(-50%)}
  .qibla-center{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:14px;height:14px;border-radius:50%;background:var(--ac);z-index:2;box-shadow:0 0 0 4px var(--card),0 0 0 6px var(--ac)44}
  .qibla-deg{font-size:var(--t-xl);font-weight:700;color:var(--ac);margin-bottom:8px}
  .qibla-kaaba{font-size:40px;display:block;margin-bottom:8px}
  .qibla-hint{font-size:var(--t-xs);color:var(--txm)}

  /* ════ ADHAN ════ */
  .adhan-wrap{padding:4px 0}
  .adhan-wrap h3{font-family:'Amiri',serif;font-size:var(--t-xl);color:var(--ac);margin-bottom:14px;text-align:center}
  .adhan-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
  @media(min-width:500px){.adhan-grid{grid-template-columns:repeat(3,1fr)}}
  .adhan-card{background:var(--card);border-radius:var(--r-lg);padding:14px;display:flex;flex-direction:column;align-items:center;gap:8px;cursor:pointer;border:1.5px solid var(--bdr);transition:.2s;box-shadow:var(--sh-sm)}
  .adhan-card:hover{border-color:var(--ac)55;transform:translateY(-2px);box-shadow:var(--sh-md)}
  .adhan-card.playing{border-color:var(--ac);background:var(--ac)10;box-shadow:var(--sh-ac)}
  .adhan-card-info{text-align:center;cursor:pointer;flex:1}
  .adhan-card-name{font-family:'Amiri',serif;font-size:var(--t-md);color:var(--tx);font-weight:600}
  .adhan-card-sub{font-size:var(--t-xs);color:var(--txm);margin-top:3px}
  .adhan-card-btns{display:flex;align-items:center;gap:6px}
  .adhan-play-btn{background:var(--ac);color:#fff;border:none;border-radius:50%;width:42px;height:42px;display:flex;align-items:center;justify-content:center;font-size:16px;transition:.2s;box-shadow:var(--sh-ac);flex-shrink:0}
  .adhan-play-btn:hover{filter:brightness(1.1)}
  .adhan-set-default{background:var(--item);border:1px solid var(--bdr);border-radius:var(--r-sm);padding:5px 10px;font-size:12px;cursor:pointer;transition:.2s;color:var(--txm)}
  .adhan-set-default:hover{background:var(--ac)15;border-color:var(--ac)55;color:var(--ac)}
  .adhan-default-badge{display:inline-flex;align-items:center;gap:3px;background:linear-gradient(135deg,#f59e0b,#d97706);color:#fff;border-radius:var(--r-full);padding:2px 8px;font-size:10px;font-weight:700;margin-top:4px}

  /* ════ MISC ════ */
  .loading{text-align:center;padding:28px;color:var(--ac);font-size:var(--t-md)}
  .err{text-align:center;padding:20px;color:#ef4444;font-size:var(--t-sm);background:var(--card);border-radius:var(--r-lg);border:1px solid #ef444430}
  .qr-heading{text-align:center;font-family:'Amiri',serif;font-size:var(--t-xl);color:var(--ac);margin-bottom:12px;padding:8px 0}
  /* ════ TRACKER ════ */
  /* ═══ READING TRACKER v2 ═══ */
  .tracker-wrap{padding:4px 0;margin:0 auto;display:flex;flex-direction:column;gap:12px}
  /* Hero */
  .tracker-hero{border-radius:var(--r-xl);overflow:hidden;background:linear-gradient(135deg,var(--ac),var(--ac2));padding:20px;position:relative}
  .tracker-hero-bg{position:absolute;inset:0;background:url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='0.04'%3E%3Cpath d='M0 0h20v20H0z'/%3E%3C/g%3E%3C/svg%3E");pointer-events:none}
  .tracker-hero-content{display:flex;align-items:center;gap:16px;position:relative;margin-bottom:16px}
  .tracker-ring-wrap{position:relative;width:80px;height:80px;flex-shrink:0}
  .tracker-ring-svg{width:100%;height:100%}
  .tracker-ring-num{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:'Tajawal',sans-serif;font-size:22px;font-weight:900;color:#fff}
  .tracker-hero-info{flex:1;color:#fff}
  .tracker-hero-label{font-family:'Tajawal',sans-serif;font-size:11px;opacity:.8;margin-bottom:4px}
  .tracker-hero-goal{font-family:'Tajawal',sans-serif;font-size:13px;margin-bottom:4px}
  .tracker-hero-motivate{font-family:'Tajawal',sans-serif;font-size:12px;opacity:.85;font-weight:700}
  /* Log row */
  .tracker-log-row{display:flex;gap:8px;position:relative}
  .tracker-log-btn2{flex:1;background:rgba(255,255,255,.2);color:#fff;border:2px solid rgba(255,255,255,.4);border-radius:var(--r-full);padding:11px;font-family:'Tajawal',sans-serif;font-size:14px;font-weight:800;cursor:pointer;transition:.18s;backdrop-filter:blur(4px)}
  .tracker-log-btn2:hover{background:rgba(255,255,255,.3);border-color:rgba(255,255,255,.7)}
  .tracker-log-btn2:active{transform:scale(.97)}
  .tracker-undo-btn{background:rgba(0,0,0,.15);color:rgba(255,255,255,.8);border:1.5px solid rgba(255,255,255,.2);border-radius:var(--r-full);padding:11px 14px;font-family:'Tajawal',sans-serif;font-size:12px;font-weight:700;cursor:pointer;transition:.18s;white-space:nowrap}
  .tracker-undo-btn:hover{background:rgba(0,0,0,.25)}
  .tracker-undo-btn:disabled{opacity:.35;cursor:not-allowed}
  /* Stats */
  .tracker-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:9px}
  .tracker-stat{background:var(--card);border-radius:var(--r-lg);padding:14px 8px;text-align:center;border:1.5px solid var(--bdr);box-shadow:var(--sh-sm);display:flex;flex-direction:column;align-items:center;gap:4px}
  .tracker-stat-icon{font-size:20px}
  .tracker-stat-num{font-size:clamp(20px,6vw,30px);font-weight:800;color:var(--ac);line-height:1}
  .tracker-stat-lbl{font-size:10px;color:var(--txm);font-family:'Tajawal',sans-serif}
  /* Goal card */
  .tracker-goal-card{background:var(--card);border:1.5px solid var(--bdr);border-radius:var(--r-lg);padding:12px 16px;display:flex;align-items:center;justify-content:space-between;font-family:'Tajawal',sans-serif;font-size:13px;font-weight:700;color:var(--tx)}
  .tracker-goal-ctrl{display:flex;align-items:center;gap:10px;background:var(--item);border-radius:var(--r-full);padding:5px 10px;border:1.5px solid var(--bdr)}
  .tracker-goal-ctrl button{background:none;border:none;color:var(--ac);font-size:18px;font-weight:900;cursor:pointer;padding:0 4px;line-height:1;transition:.15s}
  .tracker-goal-ctrl button:hover{transform:scale(1.2)}
  .tracker-goal-val{font-family:'Tajawal',sans-serif;font-size:12px;font-weight:800;color:var(--tx);min-width:60px;text-align:center}
  /* Calendar header */
  .tracker-cal-header{display:flex;align-items:center;justify-content:space-between;font-family:'Tajawal',sans-serif;font-size:13px;font-weight:700;color:var(--tx)}
  .tracker-cal-legend{display:flex;gap:12px;font-size:11px;color:var(--txm)}
  .tracker-cal-dot{display:inline-block;width:10px;height:10px;border-radius:2px;background:var(--item2);border:1px solid var(--bdr);vertical-align:middle;margin-left:4px}
  .tracker-cal-dot.read{background:var(--ac);border-color:var(--ac)}
  /* Calendar */
  .cal-day{aspect-ratio:1;border-radius:4px;background:var(--item2);transition:.15s;display:flex;align-items:center;justify-content:center;font-size:10px;color:var(--txm);cursor:default;font-family:'Tajawal',sans-serif}
  .cal-day:hover{transform:scale(1.15);z-index:1}
  .cal-day.read,.cal-day.done{background:var(--ac);color:#fff}
  .cal-day.today{outline:2px solid var(--ac);outline-offset:1px;color:var(--ac);font-weight:700}
  .cal-day.today.read{color:#fff}
  .cal-day.empty{background:transparent}
  .tracker-calendar{display:grid;grid-template-columns:repeat(7,1fr);gap:3px}
  @media(max-width:400px){.tracker-stat-num{font-size:18px!important}.tracker-ring-wrap{width:70px;height:70px}}
  .location-note{font-size:var(--t-xs);color:var(--txm);text-align:center;margin-top:8px}
  .night-banner{
    position:sticky;top:0;z-index:500;
    display:flex;align-items:center;gap:10px;
    background:linear-gradient(135deg,#1a1a2e,#16213e);
    border-bottom:1px solid rgba(99,102,241,.3);
    padding:9px 16px;color:#a5b4fc;
    font-family:'Tajawal',sans-serif;font-size:var(--t-xs);
  }
  .nb-icon{font-size:16px;flex-shrink:0;}
  .nb-text{flex:1;}
  .nb-close{background:none;border:none;color:#6366f1;cursor:pointer;font-size:14px;padding:2px 6px;flex-shrink:0;}


  /* ══════════════ MINI TRACKER WIDGET ══════════════ */
  .mtr-widget{
    display:flex;align-items:center;gap:12px;
    background:var(--card);border:1.5px solid var(--bdr);border-radius:var(--r-lg);
    padding:12px 14px;cursor:pointer;transition:.2s;
  }
  .mtr-widget:hover{border-color:var(--ac);box-shadow:0 4px 16px var(--ac)20;transform:translateY(-1px)}
  .mtr-ring-wrap{position:relative;width:60px;height:60px;flex-shrink:0}
  .mtr-ring-svg{width:100%;height:100%}
  .mtr-ring-center{position:absolute;inset:0;display:flex;flex-direction:row;align-items:center;justify-content:center;gap:1px}
  .mtr-ring-num{font-family:'Tajawal',sans-serif;font-size:16px;font-weight:900;color:var(--ac)}
  .mtr-ring-lbl{font-family:'Tajawal',sans-serif;font-size:10px;color:var(--txm);align-self:flex-end;padding-bottom:1px}
  .mtr-info{flex:1;min-width:0}
  .mtr-title{font-family:'Tajawal',sans-serif;font-size:13px;font-weight:800;color:var(--tx);margin-bottom:3px}
  .mtr-sub{font-family:'Tajawal',sans-serif;font-size:11px;color:var(--txm)}
  .mtr-streak{font-family:'Tajawal',sans-serif;font-size:11px;color:var(--ac);font-weight:700;margin-top:2px}
  .mtr-log-btn{
    width:38px;height:38px;border-radius:50%;
    background:linear-gradient(135deg,var(--ac),var(--ac2));
    color:#fff;border:none;font-size:22px;font-weight:900;cursor:pointer;
    flex-shrink:0;display:flex;align-items:center;justify-content:center;
    box-shadow:0 3px 10px var(--ac)44;transition:.18s;
  }
  .mtr-log-btn:hover{transform:scale(1.12);box-shadow:0 4px 14px var(--ac)66}
  .mtr-log-btn:active{transform:scale(.94)}

  /* ══════════════ KHATM PROGRESS BAR ══════════════ */
  .kpb-wrap{
    background:var(--card);border:1.5px solid var(--bdr);border-radius:var(--r-lg);
    padding:12px 14px;cursor:pointer;transition:.2s;
  }
  .kpb-wrap:hover{border-color:var(--ac);transform:translateY(-1px)}
  .kpb-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;font-family:'Tajawal',sans-serif}
  .kpb-label{font-size:13px;font-weight:800;color:var(--tx)}
  .kpb-pct{font-size:12px;font-weight:700;color:var(--ac)}
  .kpb-bar-bg{width:100%;height:10px;background:var(--item2);border-radius:var(--r-full);overflow:visible;position:relative;margin-bottom:6px}
  .kpb-bar-fill{height:100%;background:linear-gradient(90deg,var(--ac),var(--ac2));border-radius:var(--r-full);transition:width .8s cubic-bezier(.22,1,.36,1)}
  .kpb-bar-marker{position:absolute;top:50%;transform:translate(-50%,-50%);width:16px;height:16px;border-radius:50%;background:var(--ac2);border:3px solid var(--card);box-shadow:0 2px 6px rgba(0,0,0,.3)}
  .kpb-footer{display:flex;justify-content:space-between;font-family:'Tajawal',sans-serif;font-size:11px;color:var(--txm)}

  /* ══════════════ SLEEP TIMER ══════════════ */
  .sleep-fab{
    position:fixed;left:16px;bottom:78px;
    width:46px;height:46px;border-radius:50%;
    background:var(--card);border:1.5px solid var(--bdr);
    font-size:20px;cursor:pointer;z-index:1300;
    box-shadow:var(--sh-sm);transition:.2s;
    display:flex;align-items:center;justify-content:center;color:var(--ac);
  }
  .sleep-fab:hover{transform:scale(1.1);border-color:var(--ac);box-shadow:0 4px 16px var(--ac)44}
  @media(min-width:768px){.sleep-fab{bottom:24px}}
  .sleep-panel{
    position:fixed;left:14px;bottom:134px;z-index:1400;
    background:var(--card);border:1.5px solid var(--bdr);border-radius:var(--r-xl);
    padding:16px;width:230px;box-shadow:0 12px 40px rgba(0,0,0,.3);
    font-family:'Tajawal',sans-serif;
  }
  @media(min-width:768px){.sleep-panel{bottom:76px}}
  .sleep-header{display:flex;justify-content:space-between;align-items:center;font-size:14px;font-weight:800;color:var(--tx);margin-bottom:12px}
  .sleep-close{background:none;border:none;color:var(--txm);font-size:16px;cursor:pointer;padding:2px 6px}
  .sleep-presets{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px}
  .sleep-preset{background:var(--item);border:1.5px solid var(--bdr);border-radius:var(--r-full);padding:5px 12px;font-size:12px;font-weight:700;color:var(--tx);cursor:pointer;transition:.15s;font-family:'Tajawal',sans-serif}
  .sleep-preset.active{background:var(--ac);border-color:var(--ac);color:#fff}
  .sleep-preset:hover{border-color:var(--ac);color:var(--ac)}
  .sleep-start-btn{width:100%;background:linear-gradient(135deg,var(--ac),var(--ac2));color:#fff;border:none;border-radius:var(--r-full);padding:10px;font-size:13px;font-weight:800;cursor:pointer;font-family:'Tajawal',sans-serif;transition:.18s}
  .sleep-start-btn:hover{filter:brightness(1.1)}
  .sleep-active{text-align:center;display:flex;flex-direction:column;gap:8px;align-items:center}
  .sleep-countdown{font-size:36px;font-weight:900;color:var(--ac);font-family:'Tajawal',sans-serif}
  .sleep-sub{font-size:12px;color:var(--txm)}
  .sleep-stop-btn{background:rgba(239,68,68,.12);border:1.5px solid rgba(239,68,68,.3);color:#ef4444;border-radius:var(--r-full);padding:8px 18px;font-size:13px;font-weight:700;cursor:pointer;font-family:'Tajawal',sans-serif;transition:.15s}
  .sleep-stop-btn:hover{background:rgba(239,68,68,.22)}

  /* ════ PWA & UTILITIES ════ */
  .pwa-banner{position:fixed;bottom:0;left:0;right:0;background:linear-gradient(135deg,var(--ac),var(--ac2));color:#fff;padding:14px 18px;display:flex;align-items:center;justify-content:space-between;gap:12px;z-index:4000;box-shadow:0 -4px 24px rgba(0,0,0,.3);flex-wrap:wrap}
  .pwa-banner p{font-size:var(--t-sm);flex:1;font-weight:500}
  .pwa-install-btn{background:#fff;color:var(--ac);border:none;border-radius:var(--r-full);padding:8px 18px;font-size:var(--t-sm);font-weight:700;white-space:nowrap;transition:.2s}
  .pwa-install-btn:hover{background:rgba(255,255,255,.9)}
  .pwa-dismiss{background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.35);color:#fff;border-radius:var(--r-full);padding:7px 14px;font-size:var(--t-xs);transition:.2s}
  .pwa-dismiss:hover{background:rgba(255,255,255,.25)}
  #scroll-top{position:fixed;left:14px;bottom:74px;background:var(--ac);color:#fff;font-weight:700;font-size:14px;border-radius:50%;width:42px;height:42px;display:flex;justify-content:center;align-items:center;border:none;z-index:1290;box-shadow:var(--sh-ac);transition:.2s}
  #scroll-top:hover{filter:brightness(1.1);transform:translateY(-2px)}
  @media(min-width:768px){#scroll-top{bottom:20px}}

  /* ══ AUDIO SECTION — redesigned ══ */
  .audio-page{display:flex;flex-direction:column;gap:12px}
  .audio-mode-row{display:flex;gap:8px}
  .audio-mode-btn{
    flex:1;padding:11px 8px;border:2px solid var(--bdr);border-radius:14px;
    background:var(--item);color:var(--tx);font-family:'Tajawal',sans-serif;
    font-size:var(--t-sm);cursor:pointer;transition:.22s;
    display:flex;align-items:center;justify-content:center;gap:8px;min-height:46px;font-weight:600;
  }
  .audio-mode-btn.active{background:var(--ac);color:#fff;border-color:var(--ac);box-shadow:0 4px 14px rgba(0,0,0,.18)}
  /* Player card */
  .audio-player-card{
    background:linear-gradient(150deg,var(--ac) 0%,var(--ac2,#1a3a7e) 100%);
    border-radius:20px;padding:20px 18px 16px;color:#fff;
    display:flex;flex-direction:column;gap:14px;
    box-shadow:0 8px 30px rgba(0,0,0,.22);
  }
  /* Disc + info row */
  .audio-disc-row{display:flex;align-items:center;gap:16px}
  .audio-disc{
    width:68px;height:68px;border-radius:50%;flex-shrink:0;
    background:radial-gradient(circle at 30% 30%,rgba(255,255,255,.25),rgba(0,0,0,.3));
    border:3px solid rgba(255,255,255,.25);
    display:flex;align-items:center;justify-content:center;
    transition:transform .3s;
  }
  .audio-disc.spinning{animation:discSpin 4s linear infinite}
  @keyframes discSpin{to{transform:rotate(360deg)}}
  .audio-disc-icon{font-size:16px;line-height:1}
  .audio-disc-inner{
    width:28px;height:28px;border-radius:50%;
    background:rgba(0,0,0,.4);border:2px solid rgba(255,255,255,.3);
    display:flex;align-items:center;justify-content:center;font-size:13px;
  }
  .audio-now-info{flex:1;min-width:0}
  .audio-surah-name{font-family:'Amiri',serif;font-size:clamp(20px,5.5vw,28px);font-weight:700;line-height:1.25}
  .audio-ayah-text{font-family:var(--qfont,'Amiri',serif);font-size:var(--t-sm);line-height:2;opacity:.88;margin-top:4px;max-height:88px;overflow:hidden}
  .audio-progress-label{font-family:'Tajawal',sans-serif;font-size:var(--t-xs);opacity:.65;margin-top:4px}
  .audio-placeholder{font-family:'Tajawal',sans-serif;font-size:var(--t-sm);opacity:.65;padding:6px 0;line-height:1.6}
  /* EQ bars */
  .audio-eq-row{display:flex;align-items:flex-end;justify-content:center;gap:3px;height:22px}
  .audio-eq-bar{
    width:3px;border-radius:2px;background:rgba(255,255,255,.7);
    animation:eqBounce var(--d,.5s) ease-in-out infinite alternate;
    height:var(--h,8px);
  }
  @keyframes eqBounce{from{height:3px}to{height:var(--h,8px)}}
  .audio-mini-eq{display:flex;align-items:flex-end;gap:2px;height:14px}
  /* Native audio */
  .audio-el{width:100%;border-radius:10px;accent-color:rgba(255,255,255,.9);height:36px;opacity:.85}
  /* Controls */
  .audio-controls{display:flex;justify-content:center;align-items:center;gap:5px}
  .audio-ctrl{
    background:rgba(255,255,255,.18);border:none;color:#fff;
    border-radius:50%;width:44px;height:44px;font-size:15px;
    display:flex;align-items:center;justify-content:center;
    cursor:pointer;transition:.18s;flex-shrink:0;
  }
  .audio-ctrl:hover{background:rgba(255,255,255,.35);transform:scale(1.06)}
  .audio-play-btn{width:56px;height:56px;font-size:20px;background:rgba(255,255,255,.28)}
  .audio-play-btn:hover{background:rgba(255,255,255,.45)}
  .audio-opt-pill{
    background:rgba(255,255,255,.1);border:1.5px solid rgba(255,255,255,.2);
    color:rgba(255,255,255,.7);border-radius:20px;padding:6px 12px;
    font-family:'Tajawal',sans-serif;font-size:var(--t-xs);cursor:pointer;transition:.18s;
  }
  .audio-opt-pill.on{background:rgba(255,255,255,.28);color:#fff;border-color:rgba(255,255,255,.5)}
  /* Search row */
  .audio-search-row{display:flex;gap:6px;background:var(--item);border-radius:10px;padding:4px 8px 4px 4px;border:1.5px solid var(--bdr)}
  .audio-search-row input{flex:1;border:none;background:transparent;font-family:'Tajawal',sans-serif;font-size:var(--t-sm);color:var(--tx);direction:rtl;outline:none;padding:6px 6px}
  .audio-search-row button{background:none;border:none;padding:4px 8px;cursor:pointer;color:var(--txm);font-size:13px;flex-shrink:0}
  /* Surah list */
  .audio-list{display:flex;flex-direction:column;gap:4px;max-height:400px;overflow-y:auto;scrollbar-width:thin}
  .audio-item{
    background:var(--item);border-radius:11px;padding:10px 12px;
    cursor:pointer;transition:.15s;border-right:3px solid transparent;
    display:flex;align-items:center;gap:10px;
  }
  .audio-item:hover{background:var(--hbg);border-right-color:var(--ac)}
  .audio-item.sel{border-right-color:var(--ac);background:var(--rbg)}
  .audio-item-num{font-family:'Tajawal',sans-serif;font-size:10px;color:var(--txm);min-width:22px;text-align:center;flex-shrink:0;font-weight:700}
  .audio-item.sel .audio-item-num{color:var(--ac)}
  .audio-item-body{flex:1;min-width:0}
  .audio-item-name{font-family:'Amiri',serif;font-size:var(--t-md);color:var(--tx);font-weight:600}
  .audio-item.sel .audio-item-name{color:var(--ac)}
  .audio-item-meta{font-family:'Tajawal',sans-serif;font-size:9px;color:var(--txm);margin-top:2px}
  .audio-item-status{flex-shrink:0;width:20px;display:flex;align-items:center;justify-content:center}
  .a-name-row{display:flex;justify-content:space-between;align-items:center;gap:8px;font-family:'Tajawal',sans-serif;font-size:var(--t-sm);color:var(--tx)}
  .a-badge{background:var(--ac);color:#fff;border-radius:4px;padding:2px 6px;font-size:10px;white-space:nowrap;flex-shrink:0}

  /* ══ QIBLA enhanced ══ */

  /* ══ ADHAN ══ */
  .adhan-wrap{padding:4px 0}
  .adhan-wrap h3{font-family:'Amiri',serif;font-size:var(--t-xl);color:var(--ac);margin-bottom:10px}

  /* ══ RADIO ══ */
  .radio-wrap{background:var(--item);border-radius:12px;padding:14px;margin-bottom:10px;display:flex;gap:10px;flex-wrap:wrap;align-items:flex-start}
  .qaree-list{flex:1;min-width:180px;display:flex;flex-direction:column;gap:4px;max-height:260px;overflow-y:auto}
  .q-item{background:var(--card);border-radius:7px;padding:9px 12px;cursor:pointer;transition:.2s;border-right:2px solid transparent;font-family:'Tajawal',sans-serif;font-size:var(--t-sm);color:var(--tx)}
  .q-item:hover,.q-item.sel{border-right-color:var(--ac);background:var(--hbg)}
  .radio-panel{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;padding:10px;flex-shrink:0}
  .r-pulse{width:12px;height:12px;border-radius:50%;background:var(--ac);animation:pulse 1.4s infinite}
  @keyframes pulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.5);opacity:.5}}
  .r-ico{font-size:28px;color:var(--ac)}
  .radio-ctrl{margin-top:10px}

  /* ══ LIVE ══ */
  .live-wrap{background:var(--item);border-radius:12px;padding:14px;text-align:center}
  .video-js{border-radius:10px;overflow:hidden}
  .vjs-default-skin{}

  /* ══ TAFASIR ══ */
  .tafasir-wrap{display:flex;gap:10px;flex-direction:column}
  @media(min-width:600px){.tafasir-wrap{flex-direction:row}}
  .tf-list{flex:1;display:flex;flex-direction:column;gap:5px;max-height:360px;overflow-y:auto}
  .tf-list p{background:var(--item);border-radius:7px;padding:9px 12px;cursor:pointer;transition:.2s;font-family:'Tajawal',sans-serif;font-size:var(--t-sm);color:var(--tx);border-right:2px solid transparent}
  .tf-list p:hover{border-right-color:var(--ac);background:var(--hbg)}
  .tf-panel{flex:2;background:var(--item);border-radius:10px;padding:14px}
  .tf-heading{font-family:'Amiri',serif;font-size:var(--t-xl);color:var(--ac);margin-bottom:10px;text-align:center}

  /* ════ HADITH ════ */
  .h-title{font-family:'Amiri',serif;font-size:var(--t-xl);color:var(--ac);margin-bottom:16px;text-align:center}
  .h-book{background:var(--card);border-radius:var(--r-lg);padding:13px 16px;margin-bottom:8px;cursor:pointer;font-size:var(--t-sm);color:var(--tx);transition:.2s;border:1px solid var(--bdr);box-shadow:var(--sh-sm)}
  .h-book:hover{border-color:var(--ac)44;background:var(--card2);transform:translateX(-2px)}
  .h-sec-list{display:flex;flex-direction:column;gap:5px;padding:8px 0 8px 12px;margin-bottom:8px}
  .h-sec-item{background:var(--card);border-radius:var(--r-md);padding:10px 14px;cursor:pointer;display:flex;justify-content:space-between;align-items:center;font-size:var(--t-sm);color:var(--tx);transition:.2s;border:1px solid var(--bdr)}
  .h-sec-item:hover{border-color:var(--ac)55;color:var(--ac)}
  .h-box{background:var(--card);border-radius:var(--r-xl);padding:16px;margin-bottom:10px;position:relative;border:1px solid var(--bdr);box-shadow:var(--sh-sm)}
  .h-box::before{content:attr(data-num);position:absolute;top:12px;left:12px;background:var(--ac);color:#fff;border-radius:50%;width:24px;height:24px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700}
  .h-text{font-family:'Amiri',serif;font-size:var(--t-md);line-height:2.4;color:var(--tx);direction:rtl}
  .h-grades{margin-top:10px}
  .g-table{width:100%;border-collapse:collapse;font-size:var(--t-xs)}
  .g-table th,.g-table td{padding:6px 10px;border:1px solid var(--bdr);text-align:center;color:var(--txm)}
  .g-table th{background:var(--item);color:var(--tx);font-weight:700}

  /* ════ AZKAR ════ */
  .azkar-wrap{padding:4px 0}
  .az-head{margin-bottom:14px}
  .az-head h2{font-family:'Amiri',serif;font-size:var(--t-xl);color:var(--ac);text-align:center}
  .lbl{display:inline-block;background:var(--ac);color:#fff;border-radius:var(--r-sm);padding:2px 8px;font-size:10px;margin-left:6px;vertical-align:middle}

  /* ════ PAGES ════ */
  .pages-wrap{padding:4px 0}
  .pg-input-row{display:flex;gap:8px;margin-bottom:8px;align-items:center;background:var(--card);border-radius:var(--r-lg);padding:4px 8px;border:1px solid var(--bdr);margin-top: 4px;}
  .pg-input-row input{flex:1;border:none;border-radius:var(--r-md);padding:9px 14px;background:transparent;color:var(--tx);font-size:var(--t-sm);outline:none;direction:rtl}
  .pg-input-row button{background:var(--ac);color:#fff;border:none;border-radius:var(--r-md);padding:6px 14px;font-size:var(--t-sm);font-weight:600;cursor:pointer;transition:.2s;white-space:nowrap}
  .pg-input-row button:hover{filter:brightness(1.1)}
  .pg-name{font-family:'Amiri',serif;font-size:var(--t-xl);color:var(--ac);text-align:center;margin-bottom:12px}

  /* ════ SAJDA ════ */
  .sajda-list{display:flex;flex-direction:column;gap:8px}
  .sajda-item{background:var(--card);border-radius:var(--r-lg);padding:14px 16px;font-family:'Amiri',serif;font-size:var(--t-md);color:var(--tx);line-height:2.2;direction:rtl;border-right:3px solid var(--ac);border:1px solid var(--bdr);border-right-width:3px;box-shadow:var(--sh-sm);transition:.2s;cursor:pointer}
  .sajda-item:hover{border-color:var(--ac)55;box-shadow:var(--sh-md)}

  /* ════ JUZ / PARTS ════ */
  .juz-hdr{font-family:'Amiri',serif;font-size:clamp(14px,4vw,18px);font-weight:700;color:#fff;background:linear-gradient(90deg,var(--ac),var(--ac2));border-radius:var(--r-lg);padding:4px 10px;margin:0 0 10px;display:flex;align-items:center;gap:8px;box-shadow:var(--sh-ac);position:sticky;top:56px;z-index:10}
  .juz-hdr::before{content:'📖';font-size:14px}
  .nav-bar{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:12px;flex-wrap:wrap}
  .c-lbl{font-size:var(--t-xs);color:var(--txm);flex:1;text-align:center}

  /* ════ SURAH SIDE INFO ════ */
  .s-side{display:flex;flex-direction:column;gap:2px}

  /* ════ BOOKMARK BANNER ════ */
  .bk-banner{background:linear-gradient(135deg,var(--ac),var(--ac2));color:#fff;border-radius:var(--r-lg);padding:13px 16px;margin-bottom:14px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-top:0px;box-shadow:var(--sh-ac)}
  .bk-info{display:flex;align-items:center;gap:8px}
  .bk-ico{font-size:22px;flex-shrink:0}
  .bk-btns{display:flex;gap:7px;flex-shrink:0}
  .bk-goto{background:rgba(255,255,255,.22);color:#fff;border:1.5px solid rgba(255,255,255,.45);border-radius:var(--r-full);padding:6px 14px;font-size:var(--t-xs);cursor:pointer;transition:.2s;white-space:nowrap}
  .bk-goto:hover{background:rgba(255,255,255,.35)}
  .bk-clr{background:transparent;color:rgba(255,255,255,.65);border:1px solid rgba(255,255,255,.25);border-radius:var(--r-full);padding:6px 10px;font-size:var(--t-xs);cursor:pointer;transition:.2s}
  .bk-clr:hover{background:rgba(255,50,50,.25);color:#fff}
  .empty{text-align:center;padding:28px;color:var(--txm);font-size:var(--t-sm)}

  /* ══ PRAYER TIMES — full redesign ══ */
  .pt-page{padding:4px 0}
  .pt-loading{display:flex;flex-direction:column;align-items:center;gap:12px;padding:48px 20px;font-family:'Tajawal',sans-serif;color:var(--txm);font-size:var(--t-sm)}
  .pt-loading-spinner{font-size:36px;color:var(--ac)}
  .pt-err-card{background:var(--item);border-radius:14px;padding:28px 20px;text-align:center;font-family:'Tajawal',sans-serif}
  .pt-err-icon{font-size:40px;margin-bottom:10px}
  .pt-err-card p{color:var(--tx);font-size:var(--t-sm);margin-bottom:6px}
  .pt-err-card small{color:var(--txm);font-size:var(--t-xs)}
  .pt-header-card{background:linear-gradient(135deg,var(--ac),var(--ac2));color:#fff;border-radius:16px;padding:18px 20px;margin-bottom:16px;box-shadow:0 4px 20px rgba(0,0,0,.18)}
  .pt-header-top{display:flex;justify-content:space-between;align-items:flex-start;gap:12px}
  .pt-header-title{font-family:'Amiri',serif;font-size:clamp(18px,5vw,24px);font-weight:700;margin-bottom:4px}
  .pt-header-city{font-family:'Tajawal',sans-serif;font-size:var(--t-xs);opacity:.8}
  .pt-header-date{text-align:center;background:rgba(255,255,255,.15);border-radius:10px;padding:8px 12px;min-width:70px;backdrop-filter:blur(6px)}
  .pt-hijri-day{font-family:'Tajawal',sans-serif;font-size:clamp(22px,6vw,30px);font-weight:700;line-height:1}
  .pt-hijri-month{font-family:'Tajawal',sans-serif;font-size:var(--t-xs);opacity:.85;margin-top:2px}
  .pt-hijri-year{font-family:'Tajawal',sans-serif;font-size:var(--t-xs);opacity:.7}
  .pt-cards-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:14px}
  @media(min-width:500px){.pt-cards-grid{grid-template-columns:repeat(3,1fr)}}
  @media(min-width:900px){.pt-cards-grid{grid-template-columns:repeat(6,1fr)}}
  .pt-prayer-card{background:var(--item);border-radius:12px;padding:14px 8px;text-align:center;border:2px solid transparent;transition:.25s;position:relative;overflow:hidden}
  .pt-prayer-card.pt-next{border-color:var(--ac);background:var(--card);box-shadow:0 0 0 3px ${theme.accent}22}
  .pt-prayer-icon{font-size:22px;margin-bottom:6px}
  .pt-prayer-name{font-family:'Tajawal',sans-serif;font-size:var(--t-sm);font-weight:700;color:var(--tx);margin-bottom:4px}
  .pt-prayer-time{font-family:'Tajawal',sans-serif;font-size:var(--t-md);color:var(--ac);font-weight:700}
  .pt-next-badge{position:absolute;top:6px;right:6px;background:var(--ac);color:#fff;border-radius:6px;padding:2px 6px;font-size:9px;font-family:'Tajawal',sans-serif}
  .pt-notif-btn{width:100%;padding:13px;border:none;border-radius:12px;font-family:'Tajawal',sans-serif;font-size:var(--t-sm);font-weight:700;cursor:pointer;transition:.2s;display:flex;align-items:center;justify-content:center;gap:8px;background:var(--item);color:var(--tx);border:2px solid var(--bdr)}
  .pt-notif-btn.active{background:var(--ac);color:#fff;border-color:var(--ac)}
  .pt-notif-btn:hover{background:var(--ac);color:#fff;border-color:var(--ac)}
  /* legacy aliases */
  .pt-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:14px}
  .pt-card{background:var(--item);border-radius:10px;padding:12px 8px;text-align:center}
  .pt-time{font-family:'Tajawal',sans-serif;font-size:var(--t-md);color:var(--tx);font-weight:700}
  .pt-name{font-family:'Tajawal',sans-serif;font-size:var(--t-xs);color:var(--txm);margin-top:4px}
  .pt-loc{font-family:'Tajawal',sans-serif;font-size:var(--t-sm);color:var(--ac);font-weight:700;margin-bottom:10px;text-align:center}
  .pt-note{font-size:var(--t-xs);color:var(--txm);font-family:'Tajawal',sans-serif;margin-top:8px;text-align:center}
  .pt-item{display:flex;justify-content:space-between;padding:8px 12px;background:var(--item);border-radius:7px;margin-bottom:5px;font-family:'Tajawal',sans-serif;font-size:var(--t-sm);color:var(--tx)}

  /* ══ RAMADAN SCHEDULE — full redesign ══ */
  .ramadan-wrap{padding:4px 0}
  .ramadan-hero{background:linear-gradient(160deg,#1a1060,#2d1b69,var(--ac));border-radius:18px;padding:28px 20px;text-align:center;margin-bottom:18px;position:relative;overflow:hidden;box-shadow:0 6px 28px rgba(0,0,0,.25)}
  .ramadan-hero::before{content:'🌙';position:absolute;top:-10px;right:10px;font-size:80px;opacity:.12;transform:rotate(15deg)}
  .ramadan-hero::after{content:'⭐';position:absolute;bottom:-5px;left:20px;font-size:50px;opacity:.1}
  .ramadan-hero-title{font-family:'Amiri',serif;font-size:clamp(24px,7vw,36px);color:#f0d060;font-weight:700;margin-bottom:6px;text-shadow:0 2px 8px rgba(0,0,0,.3)}
  .ramadan-hero-sub{font-family:'Tajawal',sans-serif;font-size:var(--t-sm);color:rgba(255,255,255,.8);margin-bottom:4px}
  .ramadan-day-badge{display:inline-block;background:rgba(240,208,96,.2);border:1.5px solid #f0d060;border-radius:20px;padding:4px 16px;font-family:'Tajawal',sans-serif;font-size:var(--t-sm);color:#f0d060;margin-top:8px}
  .ramadan-countdown-row{display:flex;gap:8px;justify-content:center;margin:16px 0}
  .rc-box{background:rgba(255,255,255,.1);border-radius:12px;padding:14px 10px;text-align:center;flex:1;min-width:56px;max-width:90px;backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.15)}
  .rc-num{font-size:clamp(20px,6vw,34px);font-weight:700;color:#f0d060;font-family:'Tajawal',sans-serif;line-height:1}
  .rc-lbl{font-size:10px;color:rgba(255,255,255,.65);font-family:'Tajawal',sans-serif;margin-top:3px}
  .ramadan-times-row{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px}
  .ramadan-time-card{background:var(--item);border-radius:14px;padding:18px 12px;text-align:center;border:1.5px solid var(--bdr);transition:.2s}
  .ramadan-time-card:hover{border-color:var(--ac);background:var(--card)}
  .rtc-icon{font-size:30px;margin-bottom:6px}
  .rtc-label{font-family:'Tajawal',sans-serif;font-size:var(--t-xs);color:var(--txm);margin-bottom:6px}
  .rtc-time{font-family:'Tajawal',sans-serif;font-size:clamp(20px,6vw,28px);color:var(--ac);font-weight:700}
  .ramadan-location{display:flex;align-items:center;justify-content:center;gap:6px;font-family:'Tajawal',sans-serif;font-size:var(--t-xs);color:var(--txm);margin-bottom:16px;padding:8px;background:var(--item);border-radius:8px}
  .ramadan-table-title{font-family:'Amiri',serif;font-size:var(--t-lg);color:var(--ac);margin-bottom:10px;text-align:center;font-weight:700}
  .ramadan-table-wrap{border-radius:14px;overflow:hidden;border:1.5px solid var(--bdr);box-shadow:0 2px 12px rgba(0,0,0,.08)}
  .ramadan-table-head{
    display:grid;grid-template-columns:44px 1fr 80px 80px;gap:0;
    padding:10px 14px;font-family:'Tajawal',sans-serif;font-size:var(--t-xs);
    color:#fff;background:linear-gradient(135deg,var(--ac),var(--ac2));
    font-weight:700;letter-spacing:.3px;
  }
  .ramadan-days-list{display:flex;flex-direction:column;max-height:440px;overflow-y:auto;background:var(--card)}
  .ramadan-day-row{
    display:grid;grid-template-columns:44px 1fr 80px 80px;gap:0;
    padding:9px 14px;font-family:'Tajawal',sans-serif;font-size:var(--t-xs);
    color:var(--tx);align-items:center;border-bottom:1px solid var(--bdr);
    transition:background .12s;
  }
  .ramadan-day-row:hover{background:var(--item)}
  .ramadan-day-row:last-child{border-bottom:none}
  .ramadan-day-row.today-row{
    background:linear-gradient(90deg,rgba(var(--ac-rgb),.12),rgba(var(--ac-rgb),.04));
    border-right:4px solid var(--ac);color:var(--ac);font-weight:700;
  }
  .rdr-num{
    background:var(--ac);color:#fff;border-radius:50%;
    width:26px;height:26px;display:flex;align-items:center;justify-content:center;
    font-family:'Tajawal',sans-serif;font-size:var(--t-xs);font-weight:700;
  }
  .today-row .rdr-num{background:#fff;color:var(--ac)}
  .rdr-time{font-family:'Tajawal',sans-serif;font-size:var(--t-xs);font-weight:600;text-align:center}
  .rdr-suhoor{color:var(--ac)}
  .rdr-iftar{color:#f0a020}
  .rdr-num{background:var(--ac);color:#fff;border-radius:50%;width:22px;height:22px;display:flex;align-items:center;justify-content:center;font-size:10px;font-family:'Tajawal',sans-serif;font-weight:700;flex-shrink:0}
  .ramadan-err{background:var(--item);border-radius:14px;padding:28px 20px;text-align:center;font-family:'Tajawal',sans-serif;color:var(--txm);font-size:var(--t-sm)}
  /* legacy aliases */
  .ramadan-banner{background:linear-gradient(135deg,var(--ac),var(--ac2));color:#fff;border-radius:14px;padding:20px 16px;text-align:center;margin-bottom:14px}
  .ramadan-countdown{font-size:clamp(28px,8vw,48px);font-weight:700;font-family:'Tajawal',sans-serif;letter-spacing:2px}
  .ramadan-times-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px}

  /* ══════════════ READING TRACKER v3 ══════════════ */
  .tr3-wrap{display:flex;flex-direction:column;gap:13px;padding:4px 0}

  /* ── Hero ── */
  .tr3-hero{
    border-radius:var(--r-xl);background:linear-gradient(145deg,var(--ac) 0%,var(--ac2) 100%);
    padding:20px 18px 16px;position:relative;overflow:hidden;
    box-shadow:0 8px 32px -4px color-mix(in srgb,var(--ac) 40%,transparent);
  }
  .tr3-hero-glow{
    position:absolute;top:-30%;right:-10%;width:220px;height:220px;
    border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,.12) 0%,transparent 70%);
    pointer-events:none;
  }
  .tr3-hero::after{
    content:'﴾ ٱقۡرَأۡ ﴿';position:absolute;bottom:-10px;left:4px;
    font-size:64px;color:rgba(255,255,255,.05);font-family:'Amiri',serif;
    pointer-events:none;white-space:nowrap;
  }
  /* ring + info row */
  .tr3-top-row{display:flex;align-items:center;gap:16px;margin-bottom:14px;position:relative}
  .tr3-ring-area{position:relative;width:90px;height:90px;flex-shrink:0}
  .tr3-ring-svg{width:100%;height:100%;overflow:visible}
  .tr3-ring-inner{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center}
  .tr3-ring-num{font-family:'Tajawal',sans-serif;font-size:26px;font-weight:900;color:#fff;line-height:1}
  .tr3-ring-lbl{font-family:'Tajawal',sans-serif;font-size:10px;color:rgba(255,255,255,.7);margin-top:2px}
  /* info */
  .tr3-hero-info{flex:1;color:#fff;min-width:0}
  .tr3-hero-date{font-family:'Tajawal',sans-serif;font-size:11px;opacity:.75;margin-bottom:5px}
  .tr3-hero-status{font-family:'Tajawal',sans-serif;font-size:13px;margin-bottom:6px;line-height:1.4}
  .tr3-done-badge{background:rgba(134,239,172,.25);border:1px solid rgba(134,239,172,.5);border-radius:20px;padding:3px 10px;font-weight:800;color:#86efac}
  .tr3-motivate{font-family:'Tajawal',sans-serif;font-size:12px;opacity:.9;font-weight:700;margin-bottom:8px}
  .tr3-level-badge{display:inline-flex;align-items:center;gap:5px;border:1px solid;border-radius:20px;padding:3px 10px;font-family:'Tajawal',sans-serif;font-size:11px;font-weight:700;color:#fff;backdrop-filter:blur(4px)}
  /* log row */
  .tr3-log-row{display:flex;align-items:center;gap:8px;margin-bottom:10px;position:relative}
  .tr3-log-btn{flex:1;background:rgba(255,255,255,.18);color:#fff;border:2px solid rgba(255,255,255,.35);border-radius:var(--r-full);padding:12px;font-family:'Tajawal',sans-serif;font-size:15px;font-weight:900;cursor:pointer;transition:.18s;backdrop-filter:blur(4px);letter-spacing:.3px}
  .tr3-log-btn:hover{background:rgba(255,255,255,.28);border-color:rgba(255,255,255,.6);transform:translateY(-1px)}
  .tr3-log-btn:active{transform:scale(.97)}
  .tr3-undo{width:44px;height:44px;background:rgba(0,0,0,.18);color:rgba(255,255,255,.85);border:1.5px solid rgba(255,255,255,.2);border-radius:50%;font-size:16px;cursor:pointer;transition:.18s;flex-shrink:0;display:flex;align-items:center;justify-content:center}
  .tr3-undo:hover{background:rgba(0,0,0,.3)}
  .tr3-undo:disabled{opacity:.3;cursor:not-allowed}
  .tr3-pct{font-family:'Tajawal',sans-serif;font-size:13px;font-weight:800;color:rgba(255,255,255,.8);flex-shrink:0;min-width:38px;text-align:center}
  /* goal row */
  .tr3-goal-row{display:flex;align-items:center;gap:8px;background:rgba(0,0,0,.18);border-radius:var(--r-full);padding:7px 14px;position:relative;color:#fff}
  .tr3-goal-btn{background:rgba(255,255,255,.15);border:1.5px solid rgba(255,255,255,.25);color:#fff;border-radius:50%;width:28px;height:28px;font-size:16px;font-weight:700;cursor:pointer;transition:.15s;display:flex;align-items:center;justify-content:center;flex-shrink:0}
  .tr3-goal-btn:hover{background:rgba(255,255,255,.3);transform:scale(1.1)}
  .tr3-goal-val{font-family:'Tajawal',sans-serif;font-size:13px;font-weight:800;color:#fff;flex:1;text-align:center}

  /* ── Stats strip ── */
  .tr3-stats{display:grid;grid-template-columns:repeat(5,1fr);gap:7px}
  @media(max-width:480px){.tr3-stats{grid-template-columns:repeat(3,1fr)}.tr3-stats .tr3-stat:nth-child(4),.tr3-stats .tr3-stat:nth-child(5){display:none}}
  .tr3-stat{background:var(--card);border:1.5px solid var(--bdr);border-radius:var(--r-lg);padding:11px 6px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:3px;transition:.2s}
  .tr3-stat:hover{border-color:var(--ac);transform:translateY(-2px);box-shadow:0 4px 12px var(--ac)22}
  .tr3-stat-icon{font-size:18px}
  .tr3-stat-val{font-family:'Tajawal',sans-serif;font-size:clamp(16px,5vw,22px);font-weight:900;color:var(--ac);line-height:1}
  .tr3-stat-lbl{font-family:'Tajawal',sans-serif;font-size:9px;color:var(--txm);line-height:1.2;text-align:center}

  /* ── Level card ── */
  .tr3-level-card{background:var(--card);border:1.5px solid var(--bdr);border-radius:var(--r-lg);padding:14px 16px}
  .tr3-level-row{display:flex;align-items:center;gap:8px;margin-bottom:8px;font-family:'Tajawal',sans-serif;font-size:13px;font-weight:700;color:var(--tx)}
  .tr3-level-now{display:flex;align-items:center;gap:5px}
  .tr3-level-pct{margin:0 auto;font-weight:900;color:var(--ac)}
  .tr3-level-next{display:flex;align-items:center;gap:5px;opacity:.6}
  .tr3-level-bar-bg{width:100%;height:10px;background:var(--item2);border-radius:var(--r-full);overflow:hidden;margin-bottom:6px}
  .tr3-level-bar-fill{height:100%;border-radius:var(--r-full);transition:width .8s cubic-bezier(.22,1,.36,1)}
  .tr3-level-tip{font-family:'Tajawal',sans-serif;font-size:11px;color:var(--txm);text-align:center}

  /* ── Tabs ── */
  .tr3-tabs{display:flex;background:var(--item);border-radius:var(--r-md);padding:4px;gap:3px}
  .tr3-tab{flex:1;padding:8px 4px;border:none;background:none;border-radius:var(--r-sm);font-family:'Tajawal',sans-serif;font-size:12px;font-weight:600;color:var(--txm);cursor:pointer;transition:.18s;white-space:nowrap}
  .tr3-tab.active{background:var(--card);color:var(--ac);font-weight:800;box-shadow:var(--sh-sm)}

  /* ── Week card ── */
  .tr3-week-card{background:var(--card);border:1.5px solid var(--bdr);border-radius:var(--r-lg);padding:14px;display:flex;flex-direction:column;gap:12px}
  .tr3-week-summary{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
  .tr3-ws-item{background:var(--item);border-radius:var(--r-md);padding:10px 8px;text-align:center;font-family:'Tajawal',sans-serif;display:flex;flex-direction:column;gap:3px}
  .tr3-ws-item span{font-size:11px;color:var(--txm)}
  .tr3-ws-item strong{font-size:14px;font-weight:800;color:var(--ac)}

  /* ── Calendar card ── */
  .tr3-cal-card{background:var(--card);border:1.5px solid var(--bdr);border-radius:var(--r-lg);padding:14px}
  .tracker-cal-header{display:flex;align-items:center;justify-content:space-between;font-family:'Tajawal',sans-serif;font-size:13px;font-weight:700;color:var(--tx)}
  .tracker-cal-legend{display:flex;gap:12px;font-size:11px;color:var(--txm)}
  .tracker-cal-dot{display:inline-block;width:10px;height:10px;border-radius:2px;background:var(--item2);border:1px solid var(--bdr);vertical-align:middle;margin-left:4px}
  .tracker-cal-dot.read{background:var(--ac);border-color:var(--ac)}
  .cal-day{aspect-ratio:1;border-radius:4px;background:var(--item2);transition:.15s;display:flex;align-items:center;justify-content:center;font-size:10px;color:var(--txm);cursor:default;font-family:'Tajawal',sans-serif}
  .cal-day:hover{transform:scale(1.12);z-index:1}
  .cal-day.read{background:var(--ac);color:#fff}
  .cal-day.today{outline:2px solid var(--ac);outline-offset:2px;font-weight:800}
  .cal-day.today.read{color:#fff}
  .cal-day.empty{background:transparent}
  .tracker-calendar{display:grid;grid-template-columns:repeat(7,1fr);gap:3px}

  /* ── Achievements ── */
  .tr3-ach-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:8px}
  @media(min-width:500px){.tr3-ach-grid{grid-template-columns:repeat(4,1fr)}}
  .tr3-ach-card{background:var(--card);border:2px solid var(--bdr);border-radius:var(--r-lg);padding:14px 10px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:5px;position:relative;transition:.2s;opacity:.55;filter:grayscale(.8)}
  .tr3-ach-card.done{opacity:1;filter:none;border-color:var(--ac);background:linear-gradient(135deg,var(--ac)12,var(--ac2)06)}
  .tr3-ach-card.done:hover{transform:translateY(-3px);box-shadow:0 6px 20px var(--ac)30}
  .tr3-ach-icon{font-size:28px}
  .tr3-ach-name{font-family:'Tajawal',sans-serif;font-size:12px;font-weight:800;color:var(--tx)}
  .tr3-ach-desc{font-family:'Tajawal',sans-serif;font-size:10px;color:var(--txm);line-height:1.3}
  .tr3-ach-check{position:absolute;top:8px;left:8px;width:20px;height:20px;background:var(--ac);border-radius:50%;color:#fff;font-size:11px;font-weight:900;display:flex;align-items:center;justify-content:center}

  /* ── Today tip ── */
  .tr3-today-tips{background:linear-gradient(135deg,var(--ac)18,var(--ac2)08);border:1.5px solid var(--ac)44;border-radius:var(--r-lg);padding:16px}
  .tr3-tip-title{font-family:'Tajawal',sans-serif;font-size:12px;font-weight:800;color:var(--ac);margin-bottom:8px}
  .tr3-today-tips > :last-child{font-family:'Amiri',serif;font-size:16px;color:var(--tx);line-height:1.7;direction:rtl}

  /* ── Confetti ── */
  .tr3-confetti-wrap{position:fixed;inset:0;pointer-events:none;z-index:9999;overflow:hidden}
  .tr3-confetti-dot{position:absolute;top:-20px;border-radius:50%;animation:confettiFall 2.5s ease-in forwards}
  @keyframes confettiFall{0%{transform:translateY(0) rotate(0);opacity:1}100%{transform:translateY(110vh) rotate(720deg);opacity:0}}
  .tr3-confetti-msg{position:absolute;top:30%;left:50%;transform:translateX(-50%);background:var(--card);border:2px solid var(--ac);border-radius:var(--r-xl);padding:16px 28px;font-family:'Tajawal',sans-serif;font-size:18px;font-weight:900;color:var(--ac);box-shadow:0 8px 32px rgba(0,0,0,.3);text-align:center;animation:popIn .4s cubic-bezier(.34,1.56,.64,1)}
  @keyframes popIn{0%{transform:translateX(-50%) scale(0)}100%{transform:translateX(-50%) scale(1)}}

  /* legacy compat */
  .tracker-bar{height:100%;background:linear-gradient(90deg,var(--ac),var(--ac2));border-radius:4px;transition:width .4s}
  .tracker-bar-wrap{width:100%;height:10px;background:var(--bdr);border-radius:4px;overflow:hidden;margin-bottom:4px}
  .tracker-progress-lbl{font-family:'Tajawal',sans-serif;font-size:var(--t-xs);color:var(--txm);text-align:center;margin-top:4px}

  /* ══ RADIO — full redesign ══ */
  .radio-page{padding:4px 0}
  .radio-header{background:linear-gradient(135deg,var(--ac),var(--ac2));color:#fff;border-radius:14px;padding:16px 18px;margin-bottom:14px;display:flex;align-items:center;gap:14px}
  .radio-header-icon{font-size:32px;flex-shrink:0}
  .radio-header-text h2{font-family:'Amiri',serif;font-size:var(--t-xl);font-weight:700;margin-bottom:2px}
  .radio-header-text p{font-family:'Tajawal',sans-serif;font-size:var(--t-xs);opacity:.85}
  .radio-player-card{background:var(--item);border-radius:14px;padding:16px;margin-bottom:14px;display:flex;flex-direction:column;gap:10px}
  .radio-now-playing{display:flex;align-items:center;gap:12px}
  .radio-equalizer{display:flex;align-items:flex-end;gap:3px;height:28px;flex-shrink:0}
  .radio-eq-bar{width:4px;border-radius:2px;background:var(--ac);animation:eqBounce var(--d,0.6s) ease-in-out infinite alternate}
  @keyframes eqBounce{0%{height:6px}100%{height:var(--h,20px)}}
  .radio-station-name{font-family:'Amiri',serif;font-size:var(--t-lg);color:var(--tx);font-weight:700}
  .radio-station-sub{font-family:'Tajawal',sans-serif;font-size:var(--t-xs);color:var(--txm)}
  .radio-audio{width:100%;border-radius:8px;accent-color:var(--ac)}
  .radio-list{display:flex;flex-direction:column;gap:6px}
  .radio-list-item{background:var(--card);border-radius:10px;padding:12px 14px;cursor:pointer;transition:.2s;display:flex;align-items:center;gap:10px;border:1.5px solid transparent}
  .radio-list-item:hover{border-color:var(--ac);background:var(--item)}
  .radio-list-item.sel{border-color:var(--ac);background:var(--item)}
  .radio-list-dot{width:10px;height:10px;border-radius:50%;background:var(--bdr);flex-shrink:0;transition:.2s}
  .radio-list-item.sel .radio-list-dot{background:var(--ac);box-shadow:0 0 0 3px ${theme.accent}33;animation:pulse 1.5s infinite}
  .radio-list-name{font-family:'Tajawal',sans-serif;font-size:var(--t-sm);color:var(--tx);flex:1}

  /* ══ LIVE — full redesign ══ */
  /* ═══════════════ TAFASIR v2 ═══════════════ */
  .tafasir-page{display:flex;flex-direction:column;gap:12px}
  /* Search bar */
  .tafasir-search-wrap{display:flex;gap:8px;align-items:center;background:var(--card);border:1.5px solid var(--bdr);border-radius:var(--r-full);padding:8px 14px;box-shadow:var(--sh-sm)}
  .tafasir-search-wrap input{flex:1;background:none;border:none;outline:none;font-family:'Tajawal',sans-serif;font-size:var(--t-sm);color:var(--tx);direction:rtl}
  .tafasir-search-wrap input::placeholder{color:var(--txm)}
  .tafasir-search-icon{font-size:16px;flex-shrink:0;color:var(--txm)}
  /* Currently playing hero */
  .tafasir-now{
    border-radius:var(--r-xl);overflow:hidden;
    background:linear-gradient(135deg,var(--ac)ee,var(--ac2)cc);
    padding:20px;position:relative;
  }
  .tafasir-now::before{content:'﴿﴾';position:absolute;left:10px;bottom:-8px;font-size:80px;opacity:.08;color:#fff}
  .tafasir-now-label{font-family:'Tajawal',sans-serif;font-size:10px;color:rgba(255,255,255,.7);text-transform:uppercase;letter-spacing:1px;margin-bottom:6px}
  .tafasir-now-title{font-family:'Amiri',serif;font-size:clamp(20px,5vw,26px);font-weight:700;color:#fff;line-height:1.3;direction:rtl}
  .tafasir-now-sub{font-family:'Tajawal',sans-serif;font-size:12px;color:rgba(255,255,255,.75);margin-top:4px}
  .tafasir-now-audio{width:100%;margin-top:14px;accent-color:#fff;border-radius:8px}
  /* Surah grid */
  .tafasir-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(100px,1fr));gap:7px}
  .tafasir-card{
    background:var(--card);border:1.5px solid var(--bdr);border-radius:var(--r-lg);
    padding:10px 8px;cursor:pointer;transition:.18s;text-align:center;
    display:flex;flex-direction:column;align-items:center;gap:4px;
  }
  .tafasir-card:hover{border-color:var(--ac);transform:translateY(-2px);box-shadow:0 4px 12px var(--ac)22}
  .tafasir-card.sel{background:linear-gradient(135deg,var(--ac)22,var(--ac2)11);border-color:var(--ac);box-shadow:0 2px 10px var(--ac)30}
  .tafasir-card-num{width:24px;height:24px;border-radius:50%;background:var(--item);border:1px solid var(--bdr);font-family:'Tajawal',sans-serif;font-size:10px;font-weight:700;color:var(--txm);display:flex;align-items:center;justify-content:center}
  .tafasir-card.sel .tafasir-card-num{background:var(--ac);color:#fff;border-color:var(--ac)}
  .tafasir-card-name{font-family:'Tajawal',sans-serif;font-size:12px;font-weight:700;color:var(--tx);line-height:1.2}
  .tafasir-empty-state{display:flex;flex-direction:column;align-items:center;padding:40px 20px;gap:10px;color:var(--txm);font-family:'Tajawal',sans-serif}
  .tafasir-empty-state-icon{font-size:48px;opacity:.35}
  .tafasir-loading-grid{display:flex;flex-wrap:wrap;gap:7px}
  .tafasir-skeleton{width:100px;height:64px;border-radius:var(--r-lg);background:var(--item);animation:shimmer 1.5s infinite}
  @keyframes shimmer{0%,100%{opacity:.4}50%{opacity:.8}}

  /* ════ SEARCH HISTORY ════ */
  .sh-wrap{background:var(--card);border-radius:var(--r-lg);padding:12px 14px;margin-bottom:12px;border:1px solid var(--bdr)}
  .sh-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}
  .sh-title{font-size:var(--t-xs);color:var(--txm);font-weight:600}
  .sh-clear{background:none;border:none;font-size:var(--t-xs);color:var(--txm);cursor:pointer;padding:3px 8px;border-radius:var(--r-sm);transition:.15s}
  .sh-clear:hover{color:#ef4444;background:#ef444410}
  .sh-chips{display:flex;flex-wrap:wrap;gap:6px}
  .sh-chip{background:var(--item);border:1px solid var(--bdr);border-radius:var(--r-full);padding:5px 14px;font-size:var(--t-xs);color:var(--tx);cursor:pointer;transition:.2s;white-space:nowrap;display:flex;align-items:center;gap:5px}
  .sh-chip:hover{border-color:var(--ac);color:var(--ac)}

  /* ══ SHARE PAGE AS IMAGE ══ */
  .share-page-btn{
    background:linear-gradient(135deg,var(--ac),var(--ac2));
    color:#fff;border:none;border-radius:8px;
    padding:6px 12px;font-family:'Tajawal',sans-serif;
    font-size:var(--t-xs);cursor:pointer;transition:.2s;
    display:inline-flex;align-items:center;gap:6px;
    white-space:nowrap;min-height:32px;
    box-shadow:0 2px 8px rgba(0,0,0,.15);
  }
  .share-page-btn:hover{opacity:.88;transform:translateY(-1px)}
  .share-page-btn:disabled{opacity:.6;cursor:wait}
  .share-section-note{padding:24px;text-align:center;color:var(--txm);font-size:var(--t-sm);background:var(--card);border-radius:var(--r-lg);border:1px dashed var(--bdr)}

  /* ══ FOOTER (column content) ══ */
  .footer-col{}

  /* ══ SURAH INFO BANNER ══ */
  .surah-info-banner{
    background:linear-gradient(135deg,var(--ac) 0%,var(--ac2) 100%);
    color:#fff;border-radius:14px;padding:20px 16px 16px;
    text-align:center;margin-bottom:16px;
    position:relative;overflow:hidden;
    box-shadow:0 4px 20px rgba(0,0,0,.18);
  }
  .surah-info-banner::before{
    content:'';position:absolute;top:-30px;right:-30px;
    width:120px;height:120px;border-radius:50%;
    background:rgba(255,255,255,.07);
  }
  .surah-info-banner::after{
    content:'';position:absolute;bottom:-20px;left:-20px;
    width:80px;height:80px;border-radius:50%;
    background:rgba(255,255,255,.05);
  }
  .sib-arabic{font-family:'Amiri',serif;font-size:clamp(24px,7vw,38px);font-weight:700;margin-bottom:2px;position:relative;z-index:1;text-shadow:0 1px 4px rgba(0,0,0,.2)}
  .sib-english{font-family:'Tajawal',sans-serif;font-size:var(--t-sm);opacity:.85;margin-bottom:10px;position:relative;z-index:1}
  .sib-meta{display:flex;justify-content:center;gap:10px;flex-wrap:wrap;font-family:'Tajawal',sans-serif;font-size:var(--t-xs);margin-bottom:12px;position:relative;z-index:1}
  .sib-meta span{background:rgba(255,255,255,.18);border-radius:20px;padding:3px 10px;backdrop-filter:blur(4px)}
  .sib-bismillah{font-family:'Amiri',serif;font-size:clamp(15px,4.5vw,22px);opacity:.95;letter-spacing:.5px;position:relative;z-index:1;text-shadow:0 1px 3px rgba(0,0,0,.15)}
  .tp-action-btn-active{background:var(--ac)!important;color:#fff!important;border-color:var(--ac)!important}

`;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const NAV=["الرئيسية", "الأجزاء", "السور", "الصفحات", "السجدة", "الاستماع", "الإذاعة", "التفسير", "الحديث", "أذكار", "بحث", "تسبيح", "مواقيت", "القبلة", "الأذان", "متابعة القراءة", "رمضان", "متشابهات", "التقويم الإسلامي", "محفوظاتي", "مفردات القرآن", "ختم القرآن", "حفظ بدون نت", "أسماء الله", "إحصائيات", "أدعية", "تحدي القرآن", "أهداف القراءة", "أحكام التجويد", "تحليلات", "ثيم مخصص", "إشعارات", "مقارنة تفاسير", "القراء"];
const HADITH_BOOKS=["سنن ابو داود", "صحيح البخاري", "سنن ابن ماجه", "موطأ الامام مالك", "صحيح مسلم", "سنن النسايْي", "جامع الترمذي"];
const SELECTED_RADIO_IDS=new Set([31, 70, 75, 78, 80, 9, 91, 4, 110, 111, 15, 18, 3, 34, 69, 64, 128]);
const TASBIH_PHRASES=[
  {ar: "سبحان الله", goal: 33, meaning: "Glory be to Allah"},
  {ar: "الحمد لله", goal: 33, meaning: "Praise be to Allah"},
  {ar: "الله أكبر", goal: 34, meaning: "Allah is the Greatest"},
  {ar: "لا إله إلا الله", goal: 100, meaning: "There is no god but Allah"},
  {ar: "سبحان الله وبحمده", goal: 100, meaning: "Glory & Praise to Allah"},
  {ar: "سبحان الله العظيم", goal: 100, meaning: "Glory to Allah the Almighty"},
  {ar: "استغفر الله", goal: 100, meaning: "I seek forgiveness from Allah"},
  {ar: "اللهم صلِّ على محمد", goal: 100, meaning: "Blessings on the Prophet"},
  {ar: "لا حول ولا قوة إلا بالله", goal: 33, meaning: "No power except with Allah"},
  {ar: "سبحان الله وبحمده سبحان الله العظيم", goal: 33, meaning: "Tasbih Al-Kabeer"},
  {ar: "اللهم اغفر لي وتب عليّ", goal: 70, meaning: "O Allah forgive me"},
  {ar: "حسبي الله ونعم الوكيل", goal: 33, meaning: "Allah is sufficient for me"},
];
const PRAYERS=[
  {key: "Fajr", ar: "الفجر"}, {key: "Sunrise", ar: "الشروق"}, {key: "Dhuhr", ar: "الظهر"},
  {key: "Asr", ar: "العصر"}, {key: "Maghrib", ar: "المغرب"}, {key: "Isha", ar: "العشاء"},
];
// Real Adhan (call to prayer) audio files — NOT Quran recitations
const ADHANS=[
  {id: 1, name: "أذان مكة المكرمة", sub: "المسجد الحرام", url: "https://www.islamcan.com/audio/adhan/azan1.mp3"},
  {id: 2, name: "أذان المدينة المنورة", sub: "المسجد النبوي الشريف", url: "https://www.islamcan.com/audio/adhan/azan2.mp3"},
  {id: 3, name: "أذان مصري كلاسيكي", sub: "مصر — الطريقة التقليدية", url: "https://www.islamcan.com/audio/adhan/azan3.mp3"},
  {id: 4, name: "أذان تركي", sub: "الطراز العثماني", url: "https://www.islamcan.com/audio/adhan/azan4.mp3"},
  {id: 5, name: "أذان الشيخ علي أحمد مولا", sub: "صوت خاشع", url: "https://www.islamcan.com/audio/adhan/azan5.mp3"},
  {id: 6, name: "أذان قصير", sub: "للإشعارات والتنبيهات", url: "https://www.islamcan.com/audio/adhan/azan6.mp3"},
];
const KAABA={lat: 21.4225, lng: 39.8262};
const DAY_NAMES_AR=["أحد", "اثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"];
const MONTH_NAMES_AR=["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];

// ─── LS helper ────────────────────────────────────────────────────────────────
const LS={
  get: (k, d) => {try {const v=localStorage.getItem(k); return v!==null? JSON.parse(v):d;} catch {return d;} },
  set: (k, v) => {try {localStorage.setItem(k, JSON.stringify(v));} catch {} },
};


// ─── Ayah number ornament — ۝ circle with number perfectly centred ──────────
// SVG circle as background so the digit always sits exactly in the middle
// regardless of font rendering differences.
function AyahNum ({n}) {
  return (
    <span className="ayah-num" title={`الآية ${n}`}>
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.8" opacity="0.35" />
        <circle cx="16" cy="16" r="10" fill="currentColor" opacity="0.12" />
      </svg>
      <span>{n}</span>
    </span>
  );
}

// ─── Tajweed colour-coding ────────────────────────────────────────────────────
// Applies standard printed-Quran colours to recognisable Tajweed patterns.
// Works purely on Unicode letter ranges — no external API needed.
const TJ_LEGEND=[
  {cls: "tj-ghunnah", label: "غنة", color: "#16a34a"},
  {cls: "tj-qalqala", label: "قلقلة", color: "#2563eb"},
  {cls: "tj-madd", label: "مد", color: "#7c3aed"},
  {cls: "tj-ra", label: "الراء", color: "#d97706"},
  {cls: "tj-lam", label: "اللام", color: "#dc2626"},
  {cls: "tj-ikhfa", label: "إخفاء", color: "#0d9488"},
  {cls: "tj-idgham", label: "إدغام", color: "#9333ea"},
  {cls: "tj-iqlab", label: "إقلاب", color: "#db2777"},
];

// Classify a single Arabic character/token for Tajweed colouring
function getTajweedClass (char, next) {
  const c=char.codePointAt(0);
  // Qalqalah letters: ق ط ب ج د
  if([0x0642, 0x0637, 0x0628, 0x062C, 0x062F].includes(c)) return "tj-qalqala";
  // Ra ر
  if(c===0x0631) return "tj-ra";
  // Noon/Meem with shadda → ghunnah
  if((c===0x0646||c===0x0645)&&next&&next.codePointAt(0)===0x0651) return "tj-ghunnah";
  // Madd letters (alef, waw, ya with diacritics)
  if([0x0627, 0x0648, 0x064A].includes(c)) return "tj-madd";
  // Lam with shadda
  if(c===0x0644&&next&&next.codePointAt(0)===0x0651) return "tj-lam";
  return null;
}

// Split Arabic text into coloured spans for Tajweed mode
function TajweedText ({text}) {
  const chars=[...text]; // spread handles Unicode surrogates
  const nodes=[];
  let buf=""; let bufCls=null;
  const flush=() => {if(buf) {nodes.push({t: buf, cls: bufCls}); buf=""; bufCls=null;} };
  chars.forEach((ch, i) => {
    const cls=getTajweedClass(ch, chars[i+1]);
    if(cls!==bufCls) {flush(); bufCls=cls;}
    buf+=ch;
  });
  flush();
  return <>{nodes.map((n, i) => n.cls? <span key={i} className={n.cls}>{n.t}</span>:n.t)}</>;
}

function TajweedLegend () {
  return (
    <div className="tj-legend">
      {TJ_LEGEND.map(l => (
        <span key={l.cls} className="tj-legend-item">
          <span className="tj-dot" style={{background: l.color}} />
          {l.label}
        </span>
      ))}
    </div>
  );
}

// ─── Utils ────────────────────────────────────────────────────────────────────
function calcQiblaAngle (lat, lng) {
  const φ1=lat*Math.PI/180, φ2=KAABA.lat*Math.PI/180, Δλ=(KAABA.lng-lng)*Math.PI/180;
  return ((Math.atan2(Math.sin(Δλ)*Math.cos(φ2), Math.cos(φ1)*Math.sin(φ2)-Math.sin(φ1)*Math.cos(φ2)*Math.cos(Δλ))*180/Math.PI)+360)%360;
}
function todayKey () {const d=new Date(); return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;}
function formatTime (t) {if(!t) return "--:--"; return t.substring(0, 5);}

// ─── Shared ───────────────────────────────────────────────────────────────────
// Session-level cache — makes repeat API calls instant (no spinner on revisit)
const _apiCache=new Map();

function useFetch (url, deps=[]) {
  const cached=url? _apiCache.get(url):null;
  const [data, setData]=useState(cached||null);
  const [loading, setLoading]=useState(!cached&&!!url);
  const [error, setError]=useState(null);
  useEffect(() => {
    if(!url) {setData(null); setLoading(false); setError(null); return;}
    const hit=_apiCache.get(url);
    if(hit) {setData(hit); setLoading(false); return;}
    let alive=true;
    setLoading(true); setData(null); setError(null);
    fetch(url).then(r => r.json()).then(d => {
      if(alive) {_apiCache.set(url, d); setData(d); setLoading(false);}
    }).catch(e => {if(alive) {setError(e.message); setLoading(false);} });
    return () => {alive=false;};
    // eslint-disable-next-line
  }, deps); return {data, loading, error};
}

// ─── Error Boundary — catches render crashes in each section ─────────────────
class SectionErrorBoundary extends React.Component {
  constructor (props) {super(props); this.state={hasError: false, error: null};}
  static getDerivedStateFromError (e) {return {hasError: true, error: e};}
  componentDidCatch (e, info) {console.error("Section crash:", e, info);}
  render () {
    if(this.state.hasError) return (
      <div style={{
        padding: "32px 16px", textAlign: "center", fontFamily: "Tajawal",
        color: "var(--txm)", fontSize: "var(--t-sm)"
      }}>
        <div style={{fontSize: 32, marginBottom: 12}}>⚠️</div>
        <div style={{color: "var(--tx)", fontWeight: 700, marginBottom: 8}}>حدث خطأ في هذا القسم</div>
        <div style={{fontSize: 11, opacity: .6, marginBottom: 16}}>{this.state.error?.message||"Unknown error"}</div>
        <button
          style={{background: "var(--ac)", color: "#fff", border: "none", borderRadius: 8, padding: "8px 20px", cursor: "pointer", fontFamily: "Tajawal"}}
          onClick={() => this.setState({hasError: false, error: null})}>
          إعادة المحاولة
        </button>
      </div>
    );
    return this.props.children;
  }
}

const Loading=() => <div className="ld-wrap"><div className="ld-dot" /><div className="ld-dot" /><div className="ld-dot" /></div>;
const Err=({msg}) => <div className="err">خطأ: {msg}</div>;
function NavBar ({label, onPrev, onNext, disablePrev, disableNext, current, total}) {
  const pct=(current&&total)? Math.round((current/total)*100):null;
  return (
    <div className="nb2-wrap">
      <button className="nb2-btn" onClick={onNext} disabled={disableNext}>
        التالي ‹
      </button>
      <div className="nb2-center">
        <span className="nb2-label">{label}</span>
        {pct!==null&&(
          <div className="nb2-progress">
            <div className="nb2-progress-fill" style={{width: pct+'%'}} />
          </div>
        )}
      </div>
      <button className="nb2-btn" onClick={onPrev} disabled={disablePrev}>
        › السابق
      </button>
    </div>
  );
}
function BkBanner ({bk, labelFn, onGoto, onClear}) {
  if(bk==null) return null;
  return (<div className="bk-banner">
    <div className="bk-info"><span className="bk-ico">🔖</span><span>آخر موضع: <strong>{labelFn(bk)}</strong></span></div>
    <div className="bk-btns"><button className="bk-goto" onClick={onGoto}>اذهب إليه</button><button className="bk-clr" onClick={onClear}>حذف</button></div>
  </div>);
}
function SaveBk ({saved, onClick}) {return <button className={`save-bk${saved? " saved":""}`} onClick={onClick}>🔖 {saved? "تم الحفظ ✓":"احفظ موضعي"}</button>;}
function FsBar ({size, setSize}) {
  return (<div className="fs-bar">
    <span>حجم الخط</span>
    <button className="fs-btn" onClick={() => setSize(s => Math.max(12, s-1))}>−</button>
    <span className="fs-val">{size}px</span>
    <button className="fs-btn" onClick={() => setSize(s => Math.min(28, s+1))}>+</button>
    <span style={{opacity: .4, margin: "0 2px"}}>|</span>
    <span style={{fontSize: "var(--t-xs)", color: "var(--txm)", fontFamily: "Tajawal"}}>اضغط على أي آية للتفسير</span>
  </div>);
}

// ─── NEW: Ayah Tafsir Popup ───────────────────────────────────────────────────
// ─── Reciters for ayah audio ─────────────────────────────────────────────────
const AYAH_RECITERS=[
  {id: "ar.alafasy", name: "مشاري العفاسي"},
  {id: "ar.husary", name: "محمود الحصري"},
  {id: "ar.abdulbasitmurattal", name: "عبد الباسط (مرتّل)"},
  {id: "ar.abdulbasitmujawwad", name: "عبد الباسط (مجوّد)"},
  {id: "ar.minshawi", name: "المنشاوي"},
  {id: "ar.muhammadayyoub", name: "محمد أيوب"},
  {id: "ar.shaatree", name: "أبو بكر الشاطري"},
  {id: "ar.mahermuaiqly", name: "ماهر المعيقلي"},
  {id: "ar.sudais", name: "عبد الرحمن السديس"},
  {id: "ar.hanirifai", name: "هاني الرفاعي"},
];

// Global ayah number (1-6236) from surah+ayah
// Offsets = cumulative sum of ayah counts; off[0]=0 means surah 1 starts at ayah 1
function globalAyahNum (sura, aya) {
  const off=[0, 7, 293, 493, 669, 789, 954, 1160, 1235, 1364, 1473, 1596, 1707, 1750, 1802, 1901, 2029, 2140, 2250, 2348, 2483, 2595, 2673, 2791, 2855, 2932, 3159, 3252, 3340, 3409, 3469, 3503, 3533, 3606, 3660, 3705, 3788, 3970, 4058, 4133, 4218, 4272, 4325, 4414, 4473, 4510, 4545, 4583, 4612, 4630, 4675, 4735, 4784, 4846, 4901, 4979, 5075, 5104, 5126, 5150, 5163, 5177, 5188, 5199, 5217, 5229, 5241, 5271, 5323, 5375, 5419, 5447, 5475, 5495, 5551, 5591, 5622, 5672, 5712, 5758, 5800, 5829, 5848, 5884, 5909, 5931, 5948, 5967, 5993, 6023, 6043, 6058, 6079, 6090, 6098, 6106, 6125, 6130, 6138, 6146, 6157, 6168, 6176, 6179, 6188, 6193, 6197, 6204, 6207, 6213, 6216, 6221, 6225, 6230];
  return (off[sura-1]||0)+aya;
}

// ─── Tabbed Ayah Popup: Tafsir / Listen / Translation ─────────────────────────
function TafsirPopup ({ayah, surahNum, ayahNum, onClose}) {
  const [tab, setTab]=useState("tafsir");
  const [reciter, setReciter]=useState("ar.alafasy");
  const [curAyah, setCurAyah]=useState(ayahNum);
  const [copied, setCopied]=useState(false);
  const audioRef=useRef(null);

  const [ayahSaved, setAyahSaved]=useState(false);
  const saveAyahBtn=() => {
    saveAyahBookmark(ayah, surahNum, curAyah, `سورة ${surahNum}`);
    setAyahSaved(true); setTimeout(() => setAyahSaved(false), 2000);
  };
  // Close on Escape key
  useEffect(() => {
    const h=e => {if(e.key==="Escape") onClose();};
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [onClose]);

  // Fetch tafsir + EN translation
  const url=surahNum? `https://api.alquran.cloud/v1/ayah/${surahNum}:${curAyah}/editions/quran-simple,ar.muyassar,en.sahih,fr.hamidullah`:null;
  const {data, loading}=useFetch(url, [surahNum, curAyah]);
  const editions=data?.data||[];
  const original=editions.find(e => e.edition?.identifier==="quran-simple");
  const tafsirEd=editions.find(e => e.edition?.identifier==="ar.muyassar");
  const transEd=editions.find(e => e.edition?.identifier==="en.sahih");
  const displayAyah=original?.text||ayah;

  // Play audio on listen tab / reciter / ayah change
  useEffect(() => {
    if(tab!=="listen"||!surahNum||!audioRef.current) return;
    const gn=globalAyahNum(surahNum, curAyah);
    audioRef.current.src=`https://cdn.islamic.network/quran/audio/128/${reciter}/${gn}.mp3`;
    audioRef.current.load();
    audioRef.current.play().catch(() => {});
  }, [tab, reciter, surahNum, curAyah]);

  // Copy ayah text
  const copyAyah=async () => {
    const text=`${displayAyah}\n(${original?.surah?.name||""} — الآية ${curAyah})`;
    try {await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000);} catch {}
  };

  // Share ayah
  const shareAyah=async () => {
    const text=`${displayAyah}\n${original?.surah?.name||""} — الآية ${curAyah}\n#القرآن_الكريم`;
    if(navigator.share) {await navigator.share({text}).catch(() => {});}
    else copyAyah();
  };

  // Bookmark this ayah
  const [ayahBk, setAyahBk]=useState(false);
  const bookmarkAyah=() => {
    const key=`bk_ayah_${surahNum}_${curAyah}`;
    const existing=LS.get(key, null);
    if(existing) {LS.set(key, null); setAyahBk(false);}
    else {LS.set(key, {surah: surahNum, ayah: curAyah, text: displayAyah, surahName: original?.surah?.name}); setAyahBk(true);}
  };
  useEffect(() => {
    setAyahBk(!!LS.get(`bk_ayah_${surahNum}_${curAyah}`, null));
  }, [surahNum, curAyah]);

  const TABS=[
    {id: "tafsir", label: "📖 تفسير"},
    {id: "listen", label: "🔊 استماع"},
    {id: "translate", label: "🌍 ترجمة"},
    {id: "words", label: "🔤 كلمة كلمة"},
  ];

  // Fetch word-by-word data when words tab active
  const wbwUrl=(tab==="words"&&surahNum)? `https://api.alquran.cloud/v1/ayah/${surahNum}:${curAyah}/ar.wordbyword`:null;
  const {data: wbwData, loading: wbwLoading}=useFetch(wbwUrl, [surahNum, curAyah, tab==="words"]);
  const wordTokens=wbwData?.data?.words||[];

  return (
    <div className="tafsir-popup-overlay" onClick={e => {if(e.target===e.currentTarget) onClose();}}>
      <div className="tafsir-popup" onClick={e => e.stopPropagation()}>
        <div className="tp-drag-handle" />
        {/* Header */}
        <div className="tp-header">
          <button className="tp-nav-btn" onClick={() => setCurAyah(a => Math.max(1, a-1))} title="الآية السابقة">‹</button>
          <div className="tp-header-center">
            <h3>{original?.surah?.name||""} — الآية {curAyah}</h3>
          </div>
          <button className="tp-nav-btn" onClick={() => setCurAyah(a => a+1)} title="الآية التالية">›</button>
          <div className="tp-header-actions">
            <button className={`tp-save-btn${ayahSaved? " saved":""}`} onClick={saveAyahBtn} title="حفظ الآية">
              {ayahSaved? "✅":"⭐"}
            </button>
            <button className="tp-close" onClick={onClose}>✕</button>
          </div>
        </div>

        {/* Ayah text + copy/share */}
        <div className="tp-ayah">
          {loading? <span style={{opacity: .5}}>جاري التحميل...</span>:displayAyah}
        </div>
        <div className="tp-ayah-actions">
          <button className="tp-action-btn" onClick={copyAyah} title="نسخ">
            {copied? "✅ تم النسخ":"📋 نسخ"}
          </button>
          <button className="tp-action-btn" onClick={shareAyah} title="مشاركة">
            📤 مشاركة
          </button>
          <button className={`tp-action-btn${ayahBk? " tp-action-btn-active":""}`} onClick={bookmarkAyah} title="حفظ الآية">
            {ayahBk? "🔖 محفوظة":"🔖 حفظ"}
          </button>
        </div>

        {/* Tabs */}
        <div className="tp-tabs">
          {TABS.map(t => (
            <button key={t.id} className={`tp-tab${tab===t.id? " active":""}`} onClick={() => setTab(t.id)}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="tp-body">
          {tab==="tafsir"&&<>
            {loading&&<Loading />}
            {!loading&&tafsirEd&&(
              <div>
                <div className="tp-tafsir-label">التفسير الميسر</div>
                <div className="tp-tafsir-text">{tafsirEd.text}</div>
              </div>
            )}
            {!loading&&!tafsirEd&&(
              <div style={{textAlign: 'center', padding: '30px 20px', color: 'var(--txm)'}}>
                <div style={{fontSize: 40, marginBottom: 10}}>📖</div>
                <p style={{fontFamily: 'Tajawal', fontSize: 'var(--t-sm)'}}>لا يتوفر تفسير لهذه الآية</p>
              </div>
            )}
          </>}

          {tab==="listen"&&(
            <div className="tp-audio-wrap">
              <p>🎙️ اختر القارئ:</p>
              <div className="tp-reciter-list">
                {AYAH_RECITERS.map(r => (
                  <button key={r.id}
                    className={`tp-reciter-btn${reciter===r.id? " active":""}`}
                    onClick={() => setReciter(r.id)}>
                    {r.name}
                  </button>
                ))}
              </div>
              <audio ref={audioRef} controls style={{width: "100%", marginTop: 12, borderRadius: 8, accentColor: "var(--ac)"}}
                onEnded={() => {
                  const orig2=(data?.data||[]).find(e => e.edition?.identifier==="quran-simple");
                  const maxAyah=orig2?.surah?.numberOfAyahs||286;
                  setCurAyah(a => {const next=a+1; return next<=maxAyah? next:a;});
                }} />
            </div>
          )}

          {tab==="translate"&&<>
            {loading&&<Loading />}
            {!loading&&transEd&&(
              <div>
                <div style={{fontFamily: "'Tajawal',sans-serif", fontSize: "var(--t-xs)", color: "var(--ac)", fontWeight: 700, marginBottom: 10}}>
                  🇬🇧 Sahih International (English)
                </div>
                <div style={{direction: "ltr", textAlign: "left", fontFamily: "'Tajawal',sans-serif", fontSize: "var(--t-sm)", lineHeight: 2, color: "var(--tx)", marginBottom: 18}}>
                  {transEd.text}
                </div>
                {editions.find(e => e.edition?.identifier==="fr.hamidullah")&&(
                  <>
                    <div style={{fontFamily: "'Tajawal',sans-serif", fontSize: "var(--t-xs)", color: "var(--ac)", fontWeight: 700, marginBottom: 10}}>
                      🇫🇷 Hamidullah (Français)
                    </div>
                    <div style={{direction: "ltr", textAlign: "left", fontFamily: "'Tajawal',sans-serif", fontSize: "var(--t-sm)", lineHeight: 2, color: "var(--tx)"}}>
                      {editions.find(e => e.edition?.identifier==="fr.hamidullah").text}
                    </div>
                  </>
                )}
              </div>
            )}
            {!loading&&!transEd&&<p style={{color: "var(--txm)", fontFamily: "Tajawal", textAlign: "center", padding: 20}}>No translation available</p>}
          </>}

          {tab==="words"&&(
            <div style={{direction: "rtl"}}>
              <div style={{fontSize: "var(--t-xs)", color: "var(--txm)", fontFamily: "Tajawal", marginBottom: 12, textAlign: "center"}}>
                اضغط على كل كلمة لرؤية معناها
              </div>
              {wbwLoading&&<Loading />}
              {!wbwLoading&&(
                <div style={{display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", padding: "0 4px"}}>
                  {wordTokens.map((w, i) => (
                    <div key={i} style={{
                      background: "var(--item)", borderRadius: 8, padding: "10px 12px",
                      textAlign: "center", border: "1.5px solid var(--bdr)",
                      minWidth: 70, cursor: "pointer", transition: ".2s"
                    }}
                      onMouseEnter={e => e.currentTarget.style.borderColor="var(--ac)"}
                      onMouseLeave={e => e.currentTarget.style.borderColor="var(--bdr)"}>
                      <div style={{fontFamily: "'Amiri',serif", fontSize: "var(--t-lg)", color: "var(--tx)", marginBottom: 6, lineHeight: 1.8}}>
                        {w.text?.ar||w.ar||w.text}
                      </div>
                      <div style={{fontFamily: "Tajawal", fontSize: 10, color: "var(--txm)", lineHeight: 1.5}}>
                        {w.translation?.text||w.transliteration?.text||""}
                      </div>
                    </div>
                  ))}
                  {!wbwLoading&&wordTokens.length===0&&(
                    <p style={{color: "var(--txm)", fontFamily: "Tajawal", textAlign: "center", padding: 20}}>
                      لا تتوفر بيانات الكلمات لهذه الآية
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


// ─── Focus Mode ───────────────────────────────────────────────────────────────
// Layout: fixed overlay → flex column → [topbar sticky] [scroll div] [progress sticky]
// The .focus-overlay is flex column, topbar is sticky z-index 1601,
// .focus-scroll fills remaining space and overflows-y:auto, progress is sticky bottom.

// ─── MemorizationMode — test Quran memorization by hiding words ───────────────

// ─── Word Tooltip ─────────────────────────────────────────────────────────────
const QURAN_WORDS_MAP={
  'الله': {en: 'Allah — God', root: 'أله'}, 'الرحمن': {en: 'The Most Gracious', root: 'رحم'},
  'الرحيم': {en: 'The Most Merciful', root: 'رحم'}, 'رب': {en: 'Lord, Sustainer', root: 'ربب'},
  'العالمين': {en: 'All the worlds', root: 'علم'}, 'الحمد': {en: 'All praise', root: 'حمد'},
  'ملك': {en: 'King, Owner', root: 'ملك'}, 'يوم': {en: 'Day', root: 'يوم'},
  'الدين': {en: 'The religion, judgement', root: 'دين'}, 'نعبد': {en: 'We worship', root: 'عبد'},
  'نستعين': {en: 'We seek help', root: 'عون'}, 'اهدنا': {en: 'Guide us', root: 'هدي'},
  'الصراط': {en: 'The path, way', root: 'صرط'}, 'المستقيم': {en: 'The straight', root: 'قوم'},
  'علم': {en: 'Taught, knowledge', root: 'علم'}, 'قرآن': {en: 'The Quran', root: 'قرأ'},
  'كتاب': {en: 'Book, scripture', root: 'كتب'}, 'نور': {en: 'Light', root: 'نور'},
  'هدى': {en: 'Guidance', root: 'هدي'}, 'رحمة': {en: 'Mercy', root: 'رحم'},
  'جنة': {en: 'Paradise, garden', root: 'جنن'}, 'نار': {en: 'Fire, hell', root: 'نور'},
  'صلاة': {en: 'Prayer', root: 'صلو'}, 'زكاة': {en: 'Purification tax', root: 'زكو'},
  'توبة': {en: 'Repentance', root: 'توب'}, 'ايمان': {en: 'Faith, belief', root: 'أمن'},
  'اسلام': {en: 'Submission', root: 'سلم'}, 'قلب': {en: 'Heart', root: 'قلب'},
  'روح': {en: 'Spirit, soul', root: 'روح'}, 'حياة': {en: 'Life', root: 'حيا'},
  'موت': {en: 'Death', root: 'موت'}, 'سماء': {en: 'Sky, heaven', root: 'سمو'},
  'ارض': {en: 'Earth, land', root: 'أرض'}, 'ماء': {en: 'Water', root: 'موه'},
  'شمس': {en: 'Sun', root: 'شمس'}, 'قمر': {en: 'Moon', root: 'قمر'},
};

function WordTooltip () {
  const [info, setInfo]=useState(null);
  useEffect(() => {
    const h=e => setInfo(e.detail);
    document.addEventListener('wordTap', h);
    return () => document.removeEventListener('wordTap', h);
  }, []);
  if(!info) return null;
  const clean=info.word.replace(/[\u064B-\u065F\u0670]/g, '').replace(/[،؟!.،]/g, '').trim();
  const data=QURAN_WORDS_MAP[clean]||QURAN_WORDS_MAP[info.word]||null;
  return (
    <div className="word-tooltip">
      <button className="word-tooltip-close" onClick={() => setInfo(null)}>✕</button>
      <div className="word-tooltip-ar">{info.word}</div>
      {data? (
        <>
          {data.root&&data.root!=='—'&&<div className="word-tooltip-root">جذر: {data.root}</div>}
          <div className="word-tooltip-en">{data.en}</div>
        </>
      ):(
        <div className="word-tooltip-en">اضغط مطولاً لفتح التفسير الكامل</div>
      )}
    </div>
  );
}

function MemorizationMode ({surah, onExit}) {
  const [ayahIdx, setAyahIdx]=useState(0);
  const [hideRatio, setHideRatio]=useState(0); // 0=none, 0.25, 0.5, 0.75, 1=all
  const [revealed, setRevealed]=useState(new Set()); // set of "ayah-word" keys revealed on tap

  const ayahs=surah.ayahs;
  const curAyah=ayahs[ayahIdx];
  const words=curAyah?.text?.split(' ')||[];
  const totalWords=words.length;
  const hiddenCount=Math.floor(totalWords*hideRatio);

  // Which word indices to hide (from the end = harder)
  const hiddenSet=new Set(
    Array.from({length: hiddenCount}, (_, i) => totalWords-1-i)
  );

  const toggleWord=(key) => {
    setRevealed(s => {
      const n=new Set(s);
      if(n.has(key)) n.delete(key); else n.add(key);
      return n;
    });
  };

  const next=() => {
    if(ayahIdx<ayahs.length-1) {
      setAyahIdx(i => i+1);
      setRevealed(new Set());
    }
  };
  const prev=() => {
    if(ayahIdx>0) {
      setAyahIdx(i => i-1);
      setRevealed(new Set());
    }
  };

  const RATIOS=[
    {v: 0, label: 'عرض كل'},
    {v: 0.25, label: 'إخفاء ٢٥٪'},
    {v: 0.5, label: 'إخفاء ٥٠٪'},
    {v: 0.75, label: 'إخفاء ٧٥٪'},
    {v: 1, label: 'إخفاء كل'},
  ];

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow='hidden';
    return () => {document.body.style.overflow='';};
  }, []);

  return (
    <div className="memo-overlay">
      <div className="memo-header">
        <div>
          <div className="memo-title">{surah.name} — حفظ</div>
          <div style={{fontFamily: "'Tajawal',sans-serif", fontSize: 10, color: 'rgba(255,255,255,.5)'}}>
            اضغط على الكلمة المخفية لكشفها
          </div>
        </div>
        <button className="memo-exit" onClick={onExit}>✕ خروج</button>
      </div>

      <div className="memo-body">
        {/* Context: show a few ayahs before */}
        {ayahIdx>0&&(
          <div style={{opacity: .35, marginBottom: 8, direction: 'rtl', textAlign: 'right', fontFamily: "'Amiri','Aref Ruqaa',serif", fontSize: '1em', color: '#fff', lineHeight: 2.4}}>
            {ayahs[ayahIdx-1]?.text} <AyahNum n={ayahs[ayahIdx-1]?.numberInSurah} />
          </div>
        )}

        {/* Current ayah */}
        <div className="memo-ayah-row" style={{color: '#fff'}}>
          {words.map((w, wi) => {
            const key=`${ayahIdx}-${wi}`;
            const isHidden=hiddenSet.has(wi)&&!revealed.has(key);
            return (
              <span key={key}
                className={`memo-word${isHidden? ' hidden':''}`}
                onClick={() => isHidden&&toggleWord(key)}>
                {w}{' '}
              </span>
            );
          })}
          <AyahNum n={curAyah?.numberInSurah} />
        </div>

        {/* Navigation */}
        <div style={{display: 'flex', gap: 10, justifyContent: 'center', marginTop: 16}}>
          <button className="memo-ctrl-btn" onClick={prev} disabled={ayahIdx===0}>
            السابقة ›
          </button>
          <span style={{fontFamily: "'Tajawal',sans-serif", color: 'rgba(255,255,255,.5)', fontSize: 'var(--t-xs)', alignSelf: 'center'}}>
            {ayahIdx+1} / {ayahs.length}
          </span>
          <button className="memo-ctrl-btn" onClick={next} disabled={ayahIdx===ayahs.length-1}>
            ‹ التالية
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="memo-controls">
        {RATIOS.map(r => (
          <button key={r.v}
            className={`memo-ctrl-btn${hideRatio===r.v? ' active':''}`}
            onClick={() => {setHideRatio(r.v); setRevealed(new Set());}}>
            {r.label}
          </button>
        ))}
        <div className="memo-progress-lbl">
          {hiddenCount===0? 'اقرأ وتأكد من الحفظ':`مخفي: ${hiddenCount} من ${totalWords} كلمة — اضغط لكشف`}
        </div>
      </div>
    </div>
  );
}

function FocusMode ({label, ayahs, surahNum, fontSize, bg, onExit, bkKey}) {
  const [fs, setFs]=useState(fontSize||16);
  const [tajweed, setTaj]=useState(() => LS.get("focus_tj", false));
  const [showBg, setBg]=useState(bg||false);
  const [activeIdx, setActive]=useState(null);
  const [autoBkToast, setToast]=useState(false);
  const [focusPaged, setFocusPaged]=useState(false);
  const [focusPage, setFocusPage]=useState(0);
  const [focusSettingsOpen, setFocusSettingsOpen]=useState(false);
  const FOCUS_PAGE=14;
  const scrollRef=useRef(null);
  const toastTimer=useRef(null);

  // Hide main header while focus mode is open
  useEffect(() => {
    document.body.classList.add('focus-mode-open');
    return () => {
      document.body.classList.remove('focus-mode-open');
      if(bkKey) LS.set(bkKey, {label, surahNum, ts: Date.now()});
    };
  }, [label, surahNum, bkKey]);

  // Scroll-based auto-bookmark every 8 s
  useEffect(() => {
    const el=scrollRef.current;
    if(!el||!bkKey) return;
    const iv=setInterval(() => {
      const spans=el.querySelectorAll(".ayah-unit");
      let top=null;
      spans.forEach((sp, i) => {
        const r=sp.getBoundingClientRect();
        if(r.top>90&&r.top<window.innerHeight*0.45&&top===null) top=i;
      });
      if(top!==null) {
        LS.set(bkKey, {label, surahNum, ayahIdx: top, ts: Date.now()});
        clearTimeout(toastTimer.current);
        setToast(true);
        toastTimer.current=setTimeout(() => setToast(false), 2200);
      }
    }, 8000);
    return () => clearInterval(iv);
  }, [label, surahNum, bkKey]);

  useEffect(() => {LS.set("focus_tj", tajweed);}, [tajweed]);
  const pct=activeIdx!==null? Math.round(((activeIdx+1)/ayahs.length)*100):0;

  return (
    <>
      {/* z-index:1500 overlay — flex column so children stack naturally */}
      <div className="focus-overlay" style={{display: "flex", flexDirection: "column", overflow: "hidden"}}>

        {/* ── sticky topbar ── */}
        <div className="focus-topbar">
          <span className="focus-title">{label}</span>
          <div className="focus-controls">
            {/* ⚙️ settings toggle */}
            <button className={`focus-btn${focusSettingsOpen? ' active':''}`}
              onClick={() => setFocusSettingsOpen(v => !v)}
              title="الإعدادات">⚙️</button>
            <button className="focus-exit" onClick={onExit}>✕</button>
          </div>
        </div>
        {/* Settings panel — drops down below topbar */}
        {focusSettingsOpen&&(
          <div style={{background: 'var(--item)', padding: '8px 14px', borderBottom: '1px solid var(--bdr)', flexShrink: 0, display: 'flex', gap: 7, flexWrap: 'wrap', alignItems: 'center'}}>
            <button className={`focus-btn${tajweed? ' active':''}`} onClick={() => setTaj(v => !v)}>🎨 تجويد</button>
            <button className={`focus-btn${showBg? ' active':''}`} onClick={() => setBg(v => !v)}>🖼 خلفية</button>
            <button className={`focus-btn${focusPaged? ' active':''}`} onClick={() => {setFocusPaged(p => !p); setFocusPage(0);}}>📄 صفحة</button>
            <button className="focus-btn" onClick={() => setFs(s => Math.max(14, s-2))}>A−</button>
            <span style={{fontSize: 10, color: 'var(--txm)', fontFamily: 'Tajawal', minWidth: 22, textAlign: 'center'}}>{fs}</span>
            <button className="focus-btn" onClick={() => setFs(s => Math.min(38, s+2))}>A+</button>
          </div>
        )}

        {/* Tajweed legend sits BELOW topbar, ABOVE scroll — always visible */}
        {tajweed&&(
          <div style={{
            background: "var(--item)", padding: "6px 14px", flexShrink: 0,
            borderBottom: "1px solid var(--bdr)"
          }}>
            <div style={{maxWidth: 800, margin: "0 auto"}}>
              <TajweedLegend />
            </div>
          </div>
        )}

        {/* ── scrollable content area ── */}
        <div className="focus-scroll" ref={scrollRef}>
          <div className="focus-content">
            {!focusPaged? (
              <div className={showBg? "qr-page-bg":""}>
                <div className="qr-text" style={{fontSize: fs}}>
                  {ayahs.map((a, i) => (
                    <span key={i}
                      className={`ayah-unit${activeIdx===i? " focus-active":""}`}
                      onClick={() => {setActive(i); document.dispatchEvent(new CustomEvent("openTafsir", {detail: {text: a.text, surah: surahNum, ayah: a.numberInSurah||i+1}}));}}
                    >
                      {tajweed? <TajweedText text={a.text} />:a.text}
                      {" "}<AyahNum n={a.numberInSurah||i+1} />{" "}
                    </span>
                  ))}
                </div>
              </div>
            ):(() => {
              const total=Math.ceil(ayahs.length/FOCUS_PAGE);
              const pg=Math.min(focusPage, total-1);
              const slice=ayahs.slice(pg*FOCUS_PAGE, (pg+1)*FOCUS_PAGE);
              const prev=() => {if(pg>0) {setFocusPage(pg-1); scrollRef.current?.scrollTo({top: 0, behavior: 'smooth'});} };
              const next=() => {if(pg<total-1) {setFocusPage(pg+1); scrollRef.current?.scrollTo({top: 0, behavior: 'smooth'});} };
              return (<>
                <div className="focus-page-nav">
                  <button className="fpn-btn" onClick={prev} disabled={pg===0}>&#8250;</button>
                  <span className="fpn-label">{pg+1} / {total}</span>
                  <button className="fpn-btn" onClick={next} disabled={pg===total-1}>&#8249;</button>
                </div>
                <p className="fpn-hint">← اسحب للانتقال بين الصفحات →</p>
                <SwipeNav onPrev={next} onNext={prev}>
                  <div className={showBg? "qr-page-bg":""}>
                    <div className="qr-text" style={{fontSize: fs}}>
                      {slice.map((a, i) => {
                        const gi=pg*FOCUS_PAGE+i;
                        return (
                          <span key={gi}
                            className={`ayah-unit${activeIdx===gi? " focus-active":""}`}
                            onClick={() => {setActive(gi); document.dispatchEvent(new CustomEvent("openTafsir", {detail: {text: a.text, surah: surahNum, ayah: a.numberInSurah||gi+1}}));}}
                          >
                            {tajweed? <TajweedText text={a.text} />:a.text}
                            {" "}<AyahNum n={a.numberInSurah||gi+1} />{" "}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </SwipeNav>
                <div className="focus-page-nav" style={{marginTop: 12}}>
                  <button className="fpn-btn" onClick={prev} disabled={pg===0}>&#8250;</button>
                  <span className="fpn-label">{pg+1} / {total}</span>
                  <button className="fpn-btn" onClick={next} disabled={pg===total-1}>&#8249;</button>
                </div>
              </>);
            })()}
          </div>
        </div>

        {/* ── progress bar pinned to bottom of overlay ── */}
        <div className="focus-progress">
          <span className="focus-progress-lbl">{activeIdx!==null? activeIdx+1:"-"} / {ayahs.length}</span>
          <div className="focus-progress-bar">
            <div className="focus-progress-fill" style={{width: `${pct}%`}} />
          </div>
          <span className="focus-progress-lbl">{pct}%</span>
        </div>
      </div>



      {/* Auto-bookmark toast */}
      {autoBkToast&&<div className="focus-auto-bk-toast">🔖 تم حفظ موضعك تلقائياً</div>}
    </>
  );
}


// ─── PWA Install Banner ───────────────────────────────────────────────────────
function PWAInstallBanner () {
  const [prompt, setPrompt]=useState(null);
  const [dismissed, setDismissed]=useState(() => LS.get("pwa_dismissed", false));

  useEffect(() => {
    const h=e => {e.preventDefault(); setPrompt(e);};
    window.addEventListener("beforeinstallprompt", h);
    return () => window.removeEventListener("beforeinstallprompt", h);
  }, []);

  if(!prompt||dismissed) return null;

  const install=async () => {
    prompt.prompt();
    const {outcome}=await prompt.userChoice;
    if(outcome==="accepted") setPrompt(null);
  };

  const dismiss=() => {setDismissed(true); LS.set("pwa_dismissed", true);};

  return (
    <div className="pwa-banner">
      <p>📲 ثبّت التطبيق على جهازك للوصول إليه بدون إنترنت</p>
      <button className="pwa-install-btn" onClick={install}>تثبيت</button>
      <button className="pwa-dismiss" onClick={dismiss}>لاحقاً</button>
    </div>
  );
}

// ─── Resume Bookmark Banner ──────────────────────────────────────────────────
// Shown when user returns to a surah/page they previously read in Focus Mode.
// Reads from localStorage key `foc_bk_{sectionKey}` and scrolls to last ayah.
function ResumeBkBanner ({bkKey, ayahs, label}) {
  const [saved, setSaved]=useState(() => LS.get(bkKey, null));
  const [dismissed, setDismissed]=useState(false);

  if(!saved||dismissed) return null;

  const timeAgo=() => {
    const mins=Math.round((Date.now()-saved.ts)/60000);
    if(mins<2) return "منذ قليل";
    if(mins<60) return `منذ ${mins} دقيقة`;
    const hrs=Math.round(mins/60);
    if(hrs<24) return `منذ ${hrs} ساعة`;
    return `منذ ${Math.round(hrs/24)} يوم`;
  };

  const scrollToAyah=() => {
    setDismissed(true);
    if(saved.ayahIdx==null) return;
    // Slight delay so the component re-renders first
    setTimeout(() => {
      const units=document.querySelectorAll('.ayah-unit');
      if(units[saved.ayahIdx]) {
        units[saved.ayahIdx].scrollIntoView({behavior: 'smooth', block: 'center'});
        units[saved.ayahIdx].style.transition='background .3s';
        units[saved.ayahIdx].style.background='rgba(255,200,50,.35)';
        setTimeout(() => {units[saved.ayahIdx].style.background='';}, 1800);
      }
    }, 200);
  };

  return (
    <div className="resume-bk-banner">
      <p>🔖 استكمل قراءة <strong>{label||saved.label||"آخر موضع"}</strong>{saved.surahName? ` — ${saved.surahName}`:''} — {timeAgo()}</p>
      <button className="resume-bk-btn" onClick={scrollToAyah}>استكمل القراءة ←</button>
      <button className="resume-bk-btn" style={{background: "transparent", border: "1px solid rgba(255,255,255,.3)"}} onClick={() => setDismissed(true)}>✕</button>
    </div>
  );
}


// ── Daily Dua Card ─────────────────────────────────────────────────────────────

// ── Verse of the Hour ─────────────────────────────────────────────────────────
const HOUR_AYAHS=[
  {ar: "وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ", ref: "الطلاق 3", en: "And whoever relies upon Allah – then He is sufficient for him."},
  {ar: "إِنَّ مَعَ الْعُسْرِ يُسْرًا", ref: "الشرح 6", en: "Indeed, with hardship will be ease."},
  {ar: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا", ref: "الشرح 5", en: "For indeed, with hardship will be ease."},
  {ar: "وَعَسَىٰ أَن تَكْرَهُوا شَيْئًا وَهُوَ خَيْرٌ لَّكُمْ", ref: "البقرة 216", en: "But perhaps you hate a thing and it is good for you."},
  {ar: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ", ref: "الرعد 28", en: "Verily, in the remembrance of Allah do hearts find rest."},
  {ar: "وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ", ref: "الحديد 4", en: "And He is with you wherever you are."},
  {ar: "إِنَّ اللَّهَ لَا يُضِيعُ أَجْرَ الْمُحْسِنِينَ", ref: "التوبة 120", en: "Indeed, Allah does not allow to be lost the reward of those who do good."},
  {ar: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ", ref: "آل عمران 173", en: "Sufficient for us is Allah, and He is the best disposer of affairs."},
  {ar: "اللَّهُ لَطِيفٌ بِعِبَادِهِ", ref: "الشورى 19", en: "Allah is Subtle with His servants."},
  {ar: "وَبَشِّرِ الصَّابِرِينَ", ref: "البقرة 155", en: "And give good tidings to the patient."},
  {ar: "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ", ref: "البقرة 153", en: "Indeed, Allah is with the patient."},
  {ar: "وَلَا تَيْأَسُوا مِن رَّوْحِ اللَّهِ", ref: "يوسف 87", en: "And do not despair of relief from Allah."},
];

// ─── VerseCounter — daily ayah reading counter ───────────────────────────────
function VerseCounter ({count=0, onIncrement, onReset}) {
  const today=new Date().toDateString();
  const [todayCount, setTodayCount]=useState(() => {
    const saved=LS.get('vc_data', {date: '', count: 0});
    return saved.date===today? saved.count:0;
  });
  const [burst, setBurst]=useState(false);
  const goal=LS.get('vc_goal', 20);
  const pct=Math.min(100, Math.round((todayCount/goal)*100));

  const bump=() => {
    const next=todayCount+1;
    setTodayCount(next);
    LS.set('vc_data', {date: today, count: next});
    setBurst(true); setTimeout(() => setBurst(false), 400);
    if(next===goal) document.dispatchEvent(new CustomEvent('appNotification', {detail: {title: '🎉 هدف اليوم!', body: `أحسنت! قرأت ${next} آية اليوم`}}));
  };

  useEffect(() => {
    const d=LS.get('vc_data', {date: '', count: 0});
    if(d.date!==today) {LS.set('vc_data', {date: today, count: 0}); setTodayCount(0);}
  }, []);

  return (
    <div className="vc-wrap">
      <div className="vc-header">
        <span className="vc-title">📊 عداد الآيات اليومي</span>
        <span className="vc-goal-lbl">الهدف: {goal} آية</span>
      </div>
      <div className="vc-body">
        <div className={`vc-count${burst? ' vc-burst':''}`}>
          <span className="vc-num">{todayCount}</span>
          <span className="vc-unit">آية</span>
        </div>
        <div className="vc-ring-wrap">
          <svg width="80" height="80" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="33" fill="none" stroke="var(--bdr)" strokeWidth="7" />
            <circle cx="40" cy="40" r="33" fill="none" stroke="var(--ac)" strokeWidth="7"
              strokeDasharray={`${2*Math.PI*33}`}
              strokeDashoffset={`${2*Math.PI*33*(1-pct/100)}`}
              strokeLinecap="round"
              transform="rotate(-90 40 40)"
              style={{transition: 'stroke-dashoffset .4s ease'}}
            />
            <text x="40" y="46" textAnchor="middle" fill="var(--ac)"
              style={{fontFamily: 'Tajawal', fontSize: 14, fontWeight: 800}}>{pct}%</text>
          </svg>
        </div>
      </div>
      <div className="vc-bar-wrap">
        <div className="vc-bar">
          <div className="vc-bar-fill" style={{width: pct+'%'}} />
        </div>
        <span className="vc-bar-lbl">{todayCount}/{goal}</span>
      </div>
      <div className="vc-actions">
        <button className="vc-btn-add" onClick={bump}>+ آية قرأتها</button>
        <button className="vc-btn-reset" onClick={() => {setTodayCount(0); LS.set('vc_data', {date: today, count: 0});}}>↺</button>
      </div>
    </div>
  );
}

// ─── WordByWordPanel — shows word-by-word for an ayah ────────────────────────
function WordByWordPanel ({surahNum, ayahNum, onClose}) {
  const url=surahNum? `https://api.alquran.cloud/v1/ayah/${surahNum}:${ayahNum}/ar.wordbyword`:null;
  const {data, loading}=useFetch(url, [surahNum, ayahNum]);
  const [selWord, setSelWord]=useState(null);
  const words=data?.data?.words||[];

  return (
    <div className="wbw-panel">
      <div className="wbw-hdr">
        <span className="wbw-title">كلمة بكلمة — الآية {ayahNum}</span>
        <button className="wbw-close" onClick={onClose}>✕</button>
      </div>
      {loading&&<div className="wbw-loading"><span className="wbw-spin">◌</span> جارٍ التحميل…</div>}
      {!loading&&words.length===0&&<p className="wbw-empty">لا تتوفر بيانات لهذه الآية</p>}
      {!loading&&words.length>0&&(
        <div className="wbw-words">
          {words.map((w, i) => (
            <div key={i}
              className={`wbw-word${selWord===i? ' wbw-word-sel':''}`}
              onClick={() => setSelWord(selWord===i? null:i)}>
              <div className="wbw-ar">{w.text?.ar||w.ar||w.text}</div>
              <div className="wbw-tr">{w.translation?.text||w.transliteration?.text||''}</div>
              {selWord===i&&w.translation?.text&&(
                <div className="wbw-meaning">{w.translation.text}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function VerseOfHour () {
  const hour=new Date().getHours();
  const ayah=HOUR_AYAHS[hour%HOUR_AYAHS.length];
  const [showEn, setShowEn]=useState(false);
  return (
    <div className="voh-card">
      <div className="voh-label">✨ آية الساعة</div>
      <div className="voh-text" dir="rtl">{ayah.ar}</div>
      <div className="voh-ref">{ayah.ref}</div>
      {showEn&&<div className="voh-en">{ayah.en}</div>}
      <button className="voh-toggle" onClick={() => setShowEn(s => !s)}>
        {showEn? "إخفاء الترجمة":"🌍 ترجمة"}
      </button>
    </div>
  );
}

function DuaOfDayCard () {
  const [showEn, setShowEn]=useState(false);
  const [copied, setCopied]=useState(false);
  // Pick dua based on day of year so it changes daily
  const dayIdx=Math.floor((Date.now()-new Date(new Date().getFullYear(), 0, 0))/86400000)%DAILY_DUAS.length;
  const dua=DAILY_DUAS[dayIdx];

  const copy=async () => {
    await navigator.clipboard.writeText(dua.text+"\n("+dua.source+")").catch(() => {});
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="dua-card">
      <div className="dua-card-label">🤲 دعاء اليوم</div>
      <div className="dua-card-text" dir="rtl">{dua.text}</div>
      <div className="dua-card-source">{dua.source}</div>
      {showEn&&<div className="dua-card-en">{dua.en}</div>}
      <div className="dua-card-actions">
        <button onClick={() => setShowEn(s => !s)}>{showEn? "إخفاء الترجمة":"🌍 ترجمة"}</button>
        <button onClick={copy}>{copied? "✅ تم النسخ":"📋 نسخ"}</button>
      </div>
    </div>
  );
}

// ─── QuranParts ───────────────────────────────────────────────────────────────

// ─── useSwipe hook ───────────────────────────────────────────────────────────
function useSwipe (onLeft, onRight, minDist=60) {
  const startX=useRef(null);
  return {
    onTouchStart: e => {startX.current=e.targetTouches[0].clientX;},
    onTouchEnd: e => {
      if(startX.current==null) return;
      const diff=startX.current-e.changedTouches[0].clientX;
      if(Math.abs(diff)>=minDist) {diff>0? onLeft?.():onRight?.();}
      startX.current=null;
    },
    style: {userSelect: 'none'},
  };
}

// ─── SwipeNav: wraps children with touch swipe left/right ────────────────────
function SwipeNav ({onPrev, onNext, children, disabled=false}) {
  const touchStart=useRef(null);
  const touchEnd=useRef(null);
  const MIN_SWIPE=60; // px

  const onTouchStart=e => {touchStart.current=e.targetTouches[0].clientX;};
  const onTouchMove=e => {touchEnd.current=e.targetTouches[0].clientX;};
  const onTouchEnd=() => {
    if(!touchStart.current||!touchEnd.current||disabled) return;
    const diff=touchStart.current-touchEnd.current;
    if(Math.abs(diff)<MIN_SWIPE) return;
    if(diff>0) onNext?.();   // swipe left  → next page (RTL: left = forward)
    else onPrev?.();   // swipe right → prev page
    touchStart.current=null; touchEnd.current=null;
  };

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={{userSelect: 'none'}}
    >
      {children}
    </div>
  );
}



// ─── FullPageReader — full-screen swipeable Quran page ────────────────────────
// Fetches from alquran.cloud page API. No scroll — text fills screen.
// Swipe left = next page, swipe right = prev page.
// At boundary → calls onPrevUnit / onNextUnit.
function FullPageReader ({
  startPage, endPage, unitLabel,
  onClose, onPrevUnit, onNextUnit,
  hasPrevUnit, hasNextUnit,
}) {
  const [pg, setPg]=useState(startPage);
  const [ayahs, setAyahs]=useState(null);
  const [loading, setLoading]=useState(true);
  const [surahName, setSurahName]=useState('');
  const [juzNum, setJuzNum]=useState('');
  const [slideDir, setSlideDir]=useState(null);
  const touchStart=useRef(null);
  const touchEnd=useRef(null);
  const cacheRef=useRef({});

  // Menu & options
  const [menuOpen, setMenuOpen]=useState(false);
  const [fs, setFs]=useState(() => LS.get('fpr_fs', 22));
  const [nightMode, setNightMode]=useState(() => LS.get('fpr_night', true));
  const [tafsirMode, setTafsirMode]=useState(true);
  const [gotoAyah, setGotoAyah]=useState('');
  const [gotoPage, setGotoPage]=useState('');
  const [toast, setToast]=useState('');
  const [bkSaved, setBkSaved]=useState(false);
  const menuRef=useRef(null);

  const showToast=(msg) => {setToast(msg); setTimeout(() => setToast(''), 2200);};
  useEffect(() => {LS.set('fpr_fs', fs);}, [fs]);
  useEffect(() => {LS.set('fpr_night', nightMode);}, [nightMode]);
  useEffect(() => {document.body.style.overflow='hidden'; return () => {document.body.style.overflow='';};}, []);

  // Close menu on outside click
  useEffect(() => {
    if(!menuOpen) return;
    const h=e => {if(menuRef.current&&!menuRef.current.contains(e.target)) setMenuOpen(false);};
    document.addEventListener('mousedown', h);
    document.addEventListener('touchstart', h);
    return () => {document.removeEventListener('mousedown', h); document.removeEventListener('touchstart', h);};
  }, [menuOpen]);

  // Fetch with cache
  const fetchPage=useCallback(async (n) => {
    if(cacheRef.current[n]) {
      const d=cacheRef.current[n];
      setAyahs(d.ayahs); setSurahName(d.surahName); setJuzNum(d.juzNum);
      setLoading(false); return;
    }
    setLoading(true);
    try {
      const r=await fetch(`https://api.alquran.cloud/v1/page/${n}/quran-simple`);
      const j=await r.json();
      const a=j.data?.ayahs||[];
      const sn=a[0]?.surah?.name||'';
      const jn=a[0]?.juz||'';
      cacheRef.current[n]={ayahs: a, surahName: sn, juzNum: jn};
      setAyahs(a); setSurahName(sn); setJuzNum(jn);
    } catch {setAyahs([]);}
    setLoading(false);
  }, []);

  const preload=useCallback((n) => {
    [n-1, n+1].forEach(p => {
      if(p>=1&&p<=604&&!cacheRef.current[p]) {
        fetch(`https://api.alquran.cloud/v1/page/${p}/quran-simple`)
          .then(r => r.json())
          .then(j => {
            const a=j.data?.ayahs||[];
            cacheRef.current[p]={ayahs: a, surahName: a[0]?.surah?.name||'', juzNum: a[0]?.juz||''};
          }).catch(() => {});
      }
    });
  }, []);

  useEffect(() => {fetchPage(pg); preload(pg);}, [pg]);
  useEffect(() => {setPg(startPage);}, [startPage]);

  const goTo=(n) => {
    if(n<startPage) {if(hasPrevUnit) {onPrevUnit?.(); return;} return;}
    if(n>endPage) {if(hasNextUnit) {onNextUnit?.(); return;} return;}
    setSlideDir(n>pg? 'left':'right');
    setTimeout(() => setSlideDir(null), 220);
    setPg(n);
  };

  const onTouchStart=e => {if(menuOpen) return; touchStart.current=e.targetTouches[0].clientX;};
  const onTouchMove=e => {if(menuOpen) return; touchEnd.current=e.targetTouches[0].clientX;};
  const onTouchEnd=() => {
    if(menuOpen) return;
    if(touchStart.current===null||touchEnd.current===null) return;
    const diff=touchStart.current-touchEnd.current;
    if(Math.abs(diff)<55) {touchStart.current=null; touchEnd.current=null; return;}
    if(diff>0) goTo(pg+1); else goTo(pg-1);
    touchStart.current=null; touchEnd.current=null;
  };

  const containerRef=useRef(null);
  const textRef=useRef(null);

  // Auto-fit: adjust line-height so text fills available height without overflow
  useEffect(() => {
    if(!containerRef.current||!textRef.current||loading) return;
    const container=containerRef.current;
    const text=textRef.current;
    const avail=container.clientHeight-28; // padding
    const textH=text.scrollHeight;
    if(textH<=avail) return; // fits fine
    // Reduce line-height gradually until it fits
    let lh=2.7;
    while(lh>1.6&&text.scrollHeight>avail) {
      lh=Math.round((lh-0.05)*100)/100;
      text.style.lineHeight=String(lh);
    }
    // If still overflowing, also scale font down slightly
    let fsCur=fs;
    while(fsCur>12&&text.scrollHeight>avail) {
      fsCur-=0.5;
      text.style.fontSize=fsCur+'px';
    }
  }, [ayahs, fs, loading]);


  const saveBookmark=() => {
    LS.set('bk_fpr_page', pg); LS.set('bk_fpr_unit', unitLabel);
    setBkSaved(true); showToast('🔖 تم حفظ الإشارة المرجعية');
    setTimeout(() => setBkSaved(false), 3000);
    setMenuOpen(false);
  };

  const handleGotoAyah=() => {
    const n=parseInt(gotoAyah);
    if(!isNaN(n)&&n>0) {
      const el=document.querySelector(`.fpr-ayah-${n}`);
      if(el) el.scrollIntoView({behavior: 'smooth', block: 'center'});
      else showToast('الآية غير موجودة في هذه الصفحة');
    }
    setGotoAyah(''); setMenuOpen(false);
  };

  const handleGotoPage=() => {
    const n=parseInt(gotoPage);
    if(!isNaN(n)&&n>=1&&n<=604) {goTo(n); showToast(`انتقال إلى الصفحة ${n}`);}
    else showToast('رقم الصفحة غير صحيح (1–604)');
    setGotoPage(''); setMenuOpen(false);
  };

  const toggleFullscreen=() => {
    if(document.fullscreenElement) document.exitFullscreen?.();
    else document.documentElement.requestFullscreen?.();
    showToast(document.fullscreenElement? 'تم الخروج من ملء الشاشة':'⛶ ملء الشاشة');
    setMenuOpen(false);
  };

  // colors
  const bg=nightMode? '#150800':'#fdf6e3';
  const tc=nightMode? '#f2ead8':'#1a0500';
  const sc=nightMode? 'rgba(240,192,60,.85)':'rgba(139,60,0,.8)';

  // Build items — no scroll, fits screen
  const items=[];
  if(ayahs) {
    let lastSurah=null;
    ayahs.forEach((a, i) => {
      const sn=a.surah?.name;
      if(sn&&sn!==lastSurah) {
        lastSurah=sn;
        items.push(
          <span key={'h'+i} style={{display: 'block', textAlign: 'center', fontSize: '0.7em', color: sc, fontFamily: "'Tajawal',sans-serif", margin: '3px 0 1px', letterSpacing: 1}}>{sn}</span>
        );
        if(a.surah?.number!==9&&a.numberInSurah===1) {
          items.push(
            <span key={'bsm'+i} style={{display: 'block', textAlign: 'center', fontSize: '0.68em', color: nightMode? 'rgba(240,192,60,.6)':'rgba(139,60,0,.55)', margin: '1px 0 4px'}}>بِسْمِ ٱللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</span>
          );
        }
      }
      items.push(
        <span key={'a'+i}
          className={`ayah-unit fpr-ayah-${a.numberInSurah}`}
          onClick={() => tafsirMode&&document.dispatchEvent(new CustomEvent('openTafsir', {detail: {text: a.text, surah: a.surah?.number, ayah: a.numberInSurah}}))}
          style={tafsirMode? {cursor: 'pointer'}:{}}
        >
          {a.text}{' '}<AyahNum n={a.numberInSurah} />{' '}
        </span>
      );
    });
  }

  const isFirst=pg<=startPage;
  const isLast=pg>=endPage;
  const totalPages=endPage-startPage+1;
  const pgInUnit=pg-startPage+1;

  // Arabic juz number
  const AR_NUMS=['', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩', '١٠', '١١', '١٢', '١٣', '١٤', '١٥', '١٦', '١٧', '١٨', '١٩', '٢٠', '٢١', '٢٢', '٢٣', '٢٤', '٢٥', '٢٦', '٢٧', '٢٨', '٢٩', '٣٠'];
  const juzLabel=juzNum? `الجزء ${AR_NUMS[juzNum]||juzNum}`:(unitLabel||'');

  return (
    <div className="fpr-overlay" style={{background: bg}} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>

      {/* ══ NAVBAR ══ */}
      <div className="fpr-navbar">
        {/* RIGHT — surah name */}
        <span className="fpr-nb-surah">{surahName||unitLabel}</span>

        {/* CENTER — juz */}
        <span className="fpr-nb-juz">{juzLabel}</span>

        {/* LEFT — 3-dots menu + close */}
        <div style={{display: 'flex', alignItems: 'center', gap: 6}} ref={menuRef}>
          <button className="fpr-dots-btn" onClick={() => setMenuOpen(v => !v)} title="خيارات">⋯</button>
          <button className="fpr-close-btn" onClick={onClose} title="خروج">✕</button>

          {/* ── Dropdown ── */}
          {menuOpen&&(
            <div className="fpr-dropdown">
              {/* Font size */}
              <div className="fpr-dd-fs">
                <span className="fpr-dd-fs-lbl">حجم الخط</span>
                <button className="fpr-dd-fs-btn" onClick={() => setFs(s => Math.max(14, s-1))}>−</button>
                <span className="fpr-dd-fs-val">{fs}</span>
                <button className="fpr-dd-fs-btn" onClick={() => setFs(s => Math.min(34, s+1))}>+</button>
              </div>

              {/* Bookmark */}
              <div className={`fpr-dd-item${bkSaved? ' dd-active':''}`} onClick={saveBookmark}>
                <span className="fpr-dd-icon">🔖</span>
                <span className="fpr-dd-label">إضافة إشارة مرجعية</span>
              </div>

              {/* Night mode */}
              <div className={`fpr-dd-item${nightMode? ' dd-active':''}`} onClick={() => {setNightMode(v => !v);}}>
                <span className="fpr-dd-icon">{nightMode? '☀️':'🌙'}</span>
                <span className="fpr-dd-label">{nightMode? 'وضع القراءة النهاري':'وضع القراءة الليلي'}</span>
              </div>

              {/* Tafsir mode */}
              <div className={`fpr-dd-item${tafsirMode? ' dd-active':''}`} onClick={() => {setTafsirMode(v => !v); setMenuOpen(false);}}>
                <span className="fpr-dd-icon">👆</span>
                <span className="fpr-dd-label">{tafsirMode? 'إيقاف وضع التفسير':'تفعيل وضع التفسير'}</span>
              </div>

              <div className="fpr-dd-sep" />

              {/* Goto ayah */}
              <div className="fpr-dd-section">الذهاب إلى آية</div>
              <div className="fpr-dd-input-row">
                <input className="fpr-dd-input" type="number" min="1" placeholder="رقم الآية"
                  value={gotoAyah} onChange={e => setGotoAyah(e.target.value)}
                  onKeyDown={e => e.key==='Enter'&&handleGotoAyah()} />
                <button className="fpr-dd-go" onClick={handleGotoAyah}>انتقال</button>
              </div>

              {/* Goto page */}
              <div className="fpr-dd-section">الذهاب إلى صفحة (1–604)</div>
              <div className="fpr-dd-input-row">
                <input className="fpr-dd-input" type="number" min="1" max="604" placeholder="رقم الصفحة"
                  value={gotoPage} onChange={e => setGotoPage(e.target.value)}
                  onKeyDown={e => e.key==='Enter'&&handleGotoPage()} />
                <button className="fpr-dd-go" onClick={handleGotoPage}>انتقال</button>
              </div>

              <div className="fpr-dd-sep" />

              {/* Prev unit */}
              <div className="fpr-dd-item" onClick={() => {if(hasPrevUnit) onPrevUnit?.(); else goTo(pg-1); setMenuOpen(false);}}>
                <span className="fpr-dd-icon">↩️</span>
                <span className="fpr-dd-label">السورة / الجزء السابق</span>
              </div>

              {/* Next unit */}
              <div className="fpr-dd-item" onClick={() => {if(hasNextUnit) onNextUnit?.(); else goTo(pg+1); setMenuOpen(false);}}>
                <span className="fpr-dd-icon">↪️</span>
                <span className="fpr-dd-label">السورة / الجزء التالي</span>
              </div>

              {/* Fullscreen */}
              <div className="fpr-dd-item" onClick={toggleFullscreen}>
                <span className="fpr-dd-icon">⛶</span>
                <span className="fpr-dd-label">ملء الشاشة</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ══ PAGE CONTENT — flex-1 ══ */}
      <div className={`fpr-page${slideDir==='left'? ' fpr-slide-left':slideDir==='right'? ' fpr-slide-right':''}`} style={{background: bg}}>
        {loading? (
          <div className="fpr-loading" style={{color: nightMode? 'rgba(240,192,60,.6)':'rgba(139,60,0,.4)'}}>﷽</div>
        ):(
          <div className="fpr-text-wrap" ref={containerRef}>
            <div className="fpr-text" ref={textRef} style={{fontSize: fs+'px', color: tc, lineHeight: '2.7'}}>
              {items}
            </div>
          </div>
        )}
      </div>

      {/* ══ FOOTER ══ */}
      <div className="fpr-footer">
        {/* السابق — right side in RTL */}
        <button className="fpr-foot-btn" onClick={() => goTo(pg-1)} disabled={isFirst&&!hasPrevUnit}>
          ‹ السابق
        </button>

        {/* Center — current page : total pages of this unit */}
        <div className="fpr-foot-center">
          <div className="fpr-foot-pgnum">{pg}</div>
          <div className="fpr-foot-pgof">{pgInUnit} : {totalPages}</div>
        </div>

        {/* التالي — left side in RTL */}
        <button className="fpr-foot-btn" onClick={() => goTo(pg+1)} disabled={isLast&&!hasNextUnit}>
          التالي ›
        </button>
      </div>

      {/* ══ TOAST ══ */}
      {toast&&<div className="fpr-toast">{toast}</div>}
    </div>
  );
}
// Extracted juz paged view to avoid IIFE issues
function JuzPagedView ({pgData, bg, fs, onPrev, onNext}) {
  const ayahs=pgData?.data?.ayahs||[];
  const items=[];
  let lastSurah=null;
  ayahs.forEach((a, i) => {
    if(a.surah?.name!==lastSurah) {
      lastSurah=a.surah?.name;
      if(lastSurah) items.push(<p key={"h"+i} className="juz-hdr">{lastSurah}</p>);
    }
    items.push(
      <span key={"a"+i} className="ayah-unit"
        onClick={() => document.dispatchEvent(new CustomEvent("openTafsir", {
          detail: {text: a.text, surah: a.surah?.number, ayah: a.numberInSurah}
        }))}>
        {a.text}{" "}<AyahNum n={a.numberInSurah} />{" "}
      </span>
    );
  });
  return (
    <div>
      <div className="swipe-hint">← اسحب للانتقال بين الصفحات →</div>
      <SwipeNav onPrev={onPrev} onNext={onNext}>
        <div className={"qr-text"+(bg? " qr-page-bg":"")} style={{fontSize: fs}}>
          {items}
        </div>
      </SwipeNav>
    </div>
  );
}


// Exact page where each juz starts (Madina Mushaf, 604 pages)
const JUZ_START=[
  1, 22, 42, 62, 82, 102, 121, 142, 162, 182,
  202, 222, 242, 262, 282, 302, 322, 342, 362, 382,
  402, 422, 442, 462, 482, 502, 522, 542, 562, 582
];

// Exact first page of every surah in the Madina Mushaf (604 pages)
// Index 0 = surah 1 (Al-Fatiha), index 113 = surah 114 (An-Nas)
const SURAH_PAGES=[
  1, 2, 50, 77, 106, 128, 151, 177, 187, 208,
  221, 235, 249, 255, 262, 267, 282, 293, 305, 312,
  322, 342, 350, 359, 367, 377, 385, 396, 404, 411,
  415, 418, 428, 434, 440, 446, 453, 458, 467, 477,
  483, 489, 495, 499, 503, 507, 511, 515, 519, 523,
  526, 528, 532, 537, 542, 545, 549, 551, 553, 554,
  556, 558, 560, 562, 564, 566, 568, 570, 572, 574,
  575, 577, 578, 580, 582, 583, 584, 586, 587, 589,
  590, 591, 592, 593, 594, 595, 596, 596, 597, 597,
  598, 599, 599, 600, 600, 601, 601, 602, 602, 603,
  603, 604, 604, 604, 604, 604, 604, 604, 604, 604,
  604, 604, 604, 604
];
// helper: returns {startPage, endPage} for surah number 1–114
function surahPageRange (surahNum) {
  const idx=surahNum-1;
  const start=SURAH_PAGES[idx]||1;
  const end=(surahNum<114)? (SURAH_PAGES[idx+1]? SURAH_PAGES[idx+1]-1:start):604;
  return {startPage: start, endPage: Math.max(start, end)};
}

function QuranParts ({onReadMode=() => {}, gotoJuz=null, onGotoDone=() => {}}) {
  const [juz, setJuz]=useState(null); const [saved, setSaved]=useState(false);
  const [bk, setBk]=useState(() => LS.get("bk_juz", null));
  const [fs, setFs]=useState(() => LS.get("fs_juz", 16));
  const [bg, setBg]=useState(() => LS.get("qr_bg", false));
  const [tajweed, setTajweed]=useState(() => LS.get("juz_taj", false));
  const [viewMode, setViewMode]=useState("full"); // "full" | "paged"
  const [juzPg, setJuzPg]=useState(1); // page index within juz (1-based)
  const JUZ_PAGES=20; // ~20 pages per juz
  useEffect(() => {LS.set("fs_juz", fs);}, [fs]);
  const juzBkToast=useAutoBookmark(juz? `autobk_juz_${juz}`:null, juz!==null);
  // Page-by-page: use alquran.cloud page API, knowing juz N spans certain pages
  // Juz page map: juz 1 = pages 1-21, juz 2 = pages 22-41, etc. (approx 20pp each)
  const juzStartPage=juz? (JUZ_START[juz-1]||1):1;
  const juzEndPage=juz? ((JUZ_START[juz]||605)-1):20;
  const juzPageCount=juzEndPage-juzStartPage+1;
  const actualPage=Math.min(juzStartPage+juzPg-1, juzEndPage);
  const pageUrl=(viewMode==="paged"&&juz)? `https://api.alquran.cloud/v1/page/${actualPage}/quran-simple`:null;
  const {data: pgData, loading: pgLoading, error: pgError}=useFetch(pageUrl, [actualPage, viewMode]);
  const {data, loading, error}=useFetch((viewMode==="full"&&juz)? `https://api.alquran.cloud/v1/juz/${juz}/quran-simple`:null, [juz, viewMode]);
  const saveBk=() => {LS.set("bk_juz", juz); setBk(juz); setSaved(true); setTimeout(() => setSaved(false), 2000);};
  const clrBk=() => {LS.set("bk_juz", null); setBk(null);};

  useEffect(() => {onReadMode(juz!==null);}, [juz]);
  useEffect(() => {if(gotoJuz!=null) {setJuz(gotoJuz); setJuzPg(1); onGotoDone();} }, [gotoJuz]);
  useEffect(() => {setJuzPg(1);}, [juz]); // reset page when juz changes

  // ── Swipe for QuranParts ──
  const qpTouchStartX=useRef(null);
  const qpTouchStartY=useRef(null);
  const qpSwipeStart=e => {qpTouchStartX.current=e.targetTouches[0].clientX; qpTouchStartY.current=e.targetTouches[0].clientY;};
  const qpSwipeEnd=e => {
    if(qpTouchStartX.current===null||!juz) return;
    const dx=qpTouchStartX.current-e.changedTouches[0].clientX;
    const dy=Math.abs(qpTouchStartY.current-e.changedTouches[0].clientY);
    if(Math.abs(dx)>55&&dy<80) {
      if(dx>0&&juz<30) {setJuz(n => Math.min(30, n+1)); setSaved(false); window.scrollTo({top: 0, behavior: 'smooth'});}
      else if(dx<0&&juz>1) {setJuz(n => Math.max(1, n-1)); setSaved(false); window.scrollTo({top: 0, behavior: 'smooth'});}
    }
    qpTouchStartX.current=null;
  };

  if(juz) return (
    <div onTouchStart={qpSwipeStart} onTouchEnd={qpSwipeEnd}>
      <ReadingToolbar
        onBack={() => setJuz(null)}
        label={`الجزء ${juz} من 30`}
        onPrev={() => {setJuz(n => Math.max(1, n-1)); setSaved(false); window.scrollTo({top: 0, behavior: 'smooth'});}}
        onNext={() => {setJuz(n => Math.min(30, n+1)); setSaved(false); window.scrollTo({top: 0, behavior: 'smooth'});}}
        disablePrev={juz===1} disableNext={juz===30}
        current={juz} total={30}
        saved={saved||bk===juz} onSave={saveBk}
        bg={bg} onBg={() => {const v=!bg; setBg(v); LS.set("qr_bg", v);}}
        tajweed={tajweed} onTajweed={() => {const v=!tajweed; setTajweed(v); LS.set("juz_taj", v);}}
        viewMode={viewMode} onToggleView={() => {setViewMode(m => m==="full"? "paged":"full"); setJuzPg(1);}}
        fs={fs} onFsDown={() => setFs(s => Math.max(12, s-1))} onFsUp={() => setFs(s => Math.min(28, s+1))}
        shareBtn={<SharePageBtn surahName={`الجزء ${juz}`} />}
      />
      {viewMode==="paged"&&<NavBar label={`صفحة ${actualPage} — الجزء ${juz}`} onPrev={() => setJuzPg(p => Math.max(1, p-1))} onNext={() => setJuzPg(p => Math.min(juzPageCount, p+1))} disablePrev={juzPg===1} disableNext={juzPg===juzPageCount} />}
      {juz&&<AutoResumeBanner storageKey={`autobk_juz_${juz}`} />}
      {juzBkToast&&<div className="autobk-toast">🔖 تم حفظ موضعك تلقائياً</div>}
      {viewMode==="full"&&<>
        {loading&&<Loading />}{error&&<Err msg={error} />}
        {data&&(() => {
          const ayahs=data.data.ayahs;
          const items=[]; let lastSurah=null;
          ayahs.forEach((a, i) => {
            if(a.surah?.name!==lastSurah) {lastSurah=a.surah?.name; if(lastSurah) items.push(<p key={"h"+i} className="juz-hdr">{lastSurah}</p>);}
            items.push(<span key={"a"+i} className="ayah-unit" onClick={() => document.dispatchEvent(new CustomEvent("openTafsir", {detail: {text: a.text, surah: a.surah?.number, ayah: a.numberInSurah}}))}>{tajweed? <TajweedText text={a.text} />:a.text}{" "}<AyahNum n={a.numberInSurah} />{" "}</span>);
          });
          return <div className={`qr-text${bg? " qr-page-bg":""}`} style={{fontSize: fs}}>{items}</div>;
        })()}
      </>}
      {viewMode==="paged"&&<>
        {pgLoading&&<Loading />}{pgError&&<Err msg={pgError} />}
        {pgData&&<JuzPagedView pgData={pgData} bg={bg} fs={fs}
          onPrev={() => setJuzPg(p => Math.max(1, p-1))}
          onNext={() => setJuzPg(p => Math.min(juzPageCount, p+1))}
        />}
      </>}
      {/* Footer nav */}
      <div className="reader-footer-nav">
        <button className="rfn-btn rfn-prev"
          onClick={() => {setJuz(n => Math.max(1, n-1)); setSaved(false); window.scrollTo({top: 0, behavior: 'smooth'});}}
          disabled={juz===1}>▶ الجزء السابق</button>
        <span className="rfn-label">الجزء {juz}/30</span>
        <button className="rfn-btn rfn-next"
          onClick={() => {setJuz(n => Math.min(30, n+1)); setSaved(false); window.scrollTo({top: 0, behavior: 'smooth'});}}
          disabled={juz===30}>الجزء التالي ◀</button>
      </div>
    </div>
  );

  return (
    <div>
      <BkBanner bk={bk} labelFn={b => `الجزء ${b}`} onGoto={() => setJuz(bk)} onClear={clrBk} />
      <div className="parts-grid">
        {Array.from({length: 30}, (_, i) => i+1).map(n => (
          <button key={n} className="part-btn" onClick={() => setJuz(n)}>
            {bk===n&&<span className="bk-dot" />}الجزء {n}
          </button>
        ))}
      </div>
    </div>
  );
}
function GlobalTafsirListener () {
  const [popup, setPopup]=useState(null);
  useEffect(() => {
    const h=e => {setPopup(e.detail);};
    document.addEventListener("openTafsir", h);
    return () => document.removeEventListener("openTafsir", h);
  }, []);
  if(!popup) return null;
  return (
    <TafsirPopup
      ayah={popup.text}
      surahNum={popup.surah}
      ayahNum={popup.ayah}
      onClose={() => setPopup(null)}
    />
  );
}

// ─── Surahs ───────────────────────────────────────────────────────────────────

// Extracted paged view for Surahs to avoid hooks-in-IIFE issues
function SurahPagedView ({ayahs, surahNum, surahPg, setSurahPg, SURAH_PG_SIZE, fs, bg}) {
  const totalPages=Math.ceil(ayahs.length/SURAH_PG_SIZE);
  const clampedPg=Math.min(surahPg, totalPages-1);
  const pageAyahs=ayahs.slice(clampedPg*SURAH_PG_SIZE, (clampedPg+1)*SURAH_PG_SIZE);
  const prev=() => setSurahPg(p => Math.max(0, p-1));
  const next=() => setSurahPg(p => Math.min(totalPages-1, p+1));
  return (
    <>
      <div className="swipe-hint">← اسحب للانتقال بين الصفحات →</div>
      <NavBar
        label={`صفحة ${clampedPg+1} من ${totalPages}`}
        onPrev={prev} onNext={next}
        disablePrev={clampedPg===0} disableNext={clampedPg===totalPages-1}
      />
      <SwipeNav onPrev={prev} onNext={next}>
        <div className={bg? "qr-page-bg":""}>
          <div className="qr-text" style={{fontSize: fs}}>
            <QrTextBlock ayahs={pageAyahs} surahNum={surahNum} />
          </div>
        </div>
      </SwipeNav>
    </>
  );
}


// ─── useAutoBookmark: saves scroll position every 10 seconds ─────────────────
function useAutoBookmark (storageKey, enabled) {
  const [toastVisible, setToastVisible]=useState(false);
  const timerRef=useRef(null);
  const toastRef=useRef(null);
  useEffect(() => {
    if(!enabled||!storageKey) return;
    const save=() => {
      const scrollY=window.scrollY;
      if(scrollY<80) return; // don't save if barely scrolled
      const prev=LS.get(storageKey, null);
      LS.set(storageKey, {scrollY, ts: Date.now()});
      if(!prev||Math.abs((prev.scrollY||0)-scrollY)>100) {
        clearTimeout(toastRef.current);
        setToastVisible(true);
        toastRef.current=setTimeout(() => setToastVisible(false), 2500);
      }
    };
    timerRef.current=setInterval(save, 10000);
    return () => {clearInterval(timerRef.current); clearTimeout(toastRef.current);};
  }, [storageKey, enabled]);
  return toastVisible;
}

// ─── ReadingToolbar v4 — ONE unified bar: nav + label + controls ──────────────
function ReadingToolbar ({
  onBack, label,
  saved, onSave,
  bg, onBg,
  onFocus,
  viewMode, onToggleView,
  tajweed, onTajweed,
  fs, onFsDown, onFsUp,
  shareBtn,
  extraBtns,
  // Nav integration
  onPrev, onNext, disablePrev, disableNext,
  current, total,
}) {
  const [showControls, setShowControls]=useState(false);
  const wrapRef=useRef(null);
  const pct=(current&&total)? Math.round((current/total)*100):null;

  useEffect(() => {
    if(!showControls) return;
    const h=e => {if(wrapRef.current&&!wrapRef.current.contains(e.target)) setShowControls(false);};
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [showControls]);

  return (
    <div className="rtb4-wrap" ref={wrapRef}>
      {/* ── Main pill bar ── */}
      <div className="rtb4-bar">

        {/* LEFT: Back + Prev */}
        <div className="rtb4-side">
          {onBack&&(
            <button className="rtb4-back" onClick={onBack} title="العودة">←</button>
          )}
          {onPrev&&(
            <button className="rtb4-nav-btn" onClick={onPrev} disabled={disablePrev}>›</button>
          )}
        </div>

        {/* CENTER: label + gear */}
        <button className="rtb4-center" onClick={() => setShowControls(v => !v)}>
          <span className="rtb4-label">📖 {label}</span>
          {pct!==null&&(
            <span className="rtb4-pct">{pct}%</span>
          )}
          <span className={`rtb4-arrow${showControls? ' open':''}`}>⌄</span>
        </button>

        {/* RIGHT: Next + FS */}
        <div className="rtb4-side rtb4-side-l">
          {onNext&&(
            <button className="rtb4-nav-btn" onClick={onNext} disabled={disableNext}>‹</button>
          )}
          <div className="rtb4-fs-mini">
            <button onClick={onFsDown}>−</button>
            <span>{fs}</span>
            <button onClick={onFsUp}>+</button>
          </div>
        </div>
      </div>

      {/* ── Progress bar under main bar ── */}
      {pct!==null&&(
        <div className="rtb4-progress">
          <div className="rtb4-progress-fill" style={{width: pct+'%'}} />
        </div>
      )}

      {/* ── Expandable controls panel ── */}
      {showControls&&(
        <div className="rtb4-panel">
          <div className="rtb4-panel-row">
            {onSave&&(
              <button className={`rtb4-pill-btn${saved? ' on':''}`} onClick={() => {onSave(); setShowControls(false);}}>
                {saved? '🔖 محفوظ':'📌 احفظ'}
              </button>
            )}
            {onBg&&(
              <button className={`rtb4-pill-btn${bg? ' on':''}`} onClick={onBg}>
                {bg? '🎨 خلفية ✓':'🎨 خلفية'}
              </button>
            )}
            {onTajweed&&(
              <button className={`rtb4-pill-btn${tajweed? ' on':''}`} onClick={onTajweed}>
                {tajweed? '🌈 تجويد ✓':'🌈 تجويد'}
              </button>
            )}
            {onToggleView&&(
              <button className={`rtb4-pill-btn${viewMode==='paged'? ' on':''}`} onClick={() => {onToggleView(); setShowControls(false);}}>
                {viewMode==='paged'? '📄 صفحة ✓':'📄 صفحة صفحة'}
              </button>
            )}
            {onFocus&&(
              <button className="rtb4-pill-btn" onClick={() => {onFocus(); setShowControls(false);}}>
                🎯 تركيز
              </button>
            )}
            {extraBtns}
            {shareBtn&&shareBtn}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── AutoResumeBanner: fixed overlay "continue where you left off" ──────────
function AutoResumeBanner ({storageKey}) {
  const [bk, setBk]=useState(() => {
    // Read synchronously on init so it shows on FIRST render — no flash
    const saved=LS.get(storageKey, null);
    return (saved&&saved.scrollY>120)? saved:null;
  });
  const [dismissed, setDismissed]=useState(false);

  // Also re-read if storageKey changes (different surah)
  useEffect(() => {
    const saved=LS.get(storageKey, null);
    setBk((saved&&saved.scrollY>120)? saved:null);
    setDismissed(false);
  }, [storageKey]);

  if(!bk||dismissed) return null;
  const mins=Math.round((Date.now()-bk.ts)/60000);
  const ago=mins<2? 'منذ قليل':mins<60? `منذ ${mins} دقيقة`:`منذ ${Math.round(mins/60)} ساعة`;

  return (
    <div className="resume-fixed">
      <span className="rf-icon">📍</span>
      <div className="rf-text">
        <strong>استمر من حيث توقفت</strong>
        <span className="rf-ago">{ago}</span>
      </div>
      <button className="rf-go" onClick={() => {
        window.scrollTo({top: bk.scrollY, behavior: 'smooth'});
        setDismissed(true);
      }}>استمر ←</button>
      <button className="rf-x" onClick={() => setDismissed(true)}>✕</button>
    </div>
  );
}


// Sub-component so hooks (useTranslation) can be called at top level
function SurahFullView ({ayahs, surahNum, bg, fs, showTrans}) {
  const {translations}=useTranslation(surahNum, showTrans);
  return (
    <div className={bg? "qr-page-bg":""}>
      <div className="qr-text" style={{fontSize: fs}}>
        <QrTextBlock ayahs={ayahs} surahNum={surahNum} translations={showTrans? translations:null} />
      </div>
    </div>
  );
}

function Surahs ({onReadMode=() => {}, gotoSurah=null, onGotoDone=() => {}}) {
  const [sel, setSel]=useState(null); const [saved, setSaved]=useState(false);
  const [bk, setBk]=useState(() => LS.get("bk_surah", null));
  const [fs, setFs]=useState(() => LS.get("fs_surah", 16));
  const [bg, setBg]=useState(() => LS.get("qr_bg", false));
  const [focus, setFocus]=useState(false);
  const [memoMode, setMemoMode]=useState(false);
  const [showTrans, setShowTrans]=useState(false);
  const [surahSearch, setSurahSearch]=useState("");
  const [viewMode, setViewMode]=useState("full");
  const [surahPg, setSurahPg]=useState(0);
  const [surahMeta, setSurahMeta]=useState(null);
  const [surahAyahs, setSurahAyahs]=useState(null);
  const [surahLoading, setSurahLoading]=useState(false);
  const [metaLoading, setMetaLoading]=useState(true);
  const [metaError, setMetaError]=useState(null);
  const SURAH_PG_SIZE=20;

  // ALL refs must be before any early return
  const sTx=useRef(null), sTy=useRef(null);

  // ALL useEffects before early returns
  useEffect(() => {
    fetch("https://api.alquran.cloud/v1/surah")
      .then(r => r.json())
      .then(d => {setSurahMeta(d.data||[]); setMetaLoading(false);})
      .catch(() => {setMetaError("تعذّر تحميل قائمة السور"); setMetaLoading(false);});
  }, []);

  useEffect(() => {
    if(sel===null||!surahMeta) return;
    const surahNum=surahMeta[sel]?.number;
    if(!surahNum) return;
    setSurahAyahs(null); setSurahLoading(true);
    fetch(`https://api.alquran.cloud/v1/surah/${surahNum}/quran-simple`)
      .then(r => r.json())
      .then(d => {setSurahAyahs(d.data?.ayahs||[]); setSurahLoading(false);})
      .catch(() => {setSurahLoading(false);});
  }, [sel, surahMeta]);

  useEffect(() => {LS.set("fs_surah", fs);}, [fs]);
  useEffect(() => {onReadMode(sel!==null);}, [sel]);
  useEffect(() => {if(gotoSurah!=null) {setSel(gotoSurah); onGotoDone();} }, [gotoSurah]);

  // useAutoBookmark MUST be before early returns (it's a custom hook)
  const autoBkKey=sel!==null? `autobk_surah_${sel}`:null;
  const autoBkToastS=useAutoBookmark(autoBkKey, sel!==null);

  // ── Early returns AFTER all hooks ──
  if(metaLoading) return <Loading />;
  if(metaError) return <Err msg={metaError} />;
  if(!surahMeta) return null;

  const list=surahMeta;
  const saveBk=() => {LS.set("bk_surah", sel); setBk(sel); setSaved(true); setTimeout(() => setSaved(false), 2000);};
  const clrBk=() => {LS.set("bk_surah", null); setBk(null);};
  const surahSwipeStart=e => {sTx.current=e.targetTouches[0].clientX; sTy.current=e.targetTouches[0].clientY;};
  const surahSwipeEnd=e => {
    if(sTx.current===null||sel===null) return;
    const dx=sTx.current-e.changedTouches[0].clientX;
    const dy=Math.abs(sTy.current-e.changedTouches[0].clientY);
    if(Math.abs(dx)>55&&dy<90) {
      if(dx>0&&sel<list.length-1) {setSel(i => i+1); setSaved(false); setFocus(false); setSurahPg(0); window.scrollTo({top: 0, behavior: 'smooth'});}
      else if(dx<0&&sel>0) {setSel(i => i-1); setSaved(false); setFocus(false); setSurahPg(0); window.scrollTo({top: 0, behavior: 'smooth'});}
    }
    sTx.current=null;
  };

  if(sel!==null) {
    const s=list[sel];
    // Build a surah-like object with ayahs for components that need it
    const surahObj=s? {...s, ayahs: surahAyahs||[], number: s.number}:null;

    return (
      <div onTouchStart={surahSwipeStart} onTouchEnd={surahSwipeEnd}>
        <ReadingToolbar
          onBack={() => setSel(null)}
          label={s? `${s.name} (${sel+1}/${list.length})`:''}
          onPrev={() => {setSel(i => Math.max(0, i-1)); setSaved(false); setFocus(false); setSurahPg(0); window.scrollTo({top: 0, behavior: 'smooth'});}}
          onNext={() => {setSel(i => Math.min(list.length-1, i+1)); setSaved(false); setFocus(false); setSurahPg(0); window.scrollTo({top: 0, behavior: 'smooth'});}}
          disablePrev={sel===0} disableNext={sel===list.length-1}
          current={sel+1} total={list.length}
          saved={saved||bk===sel} onSave={saveBk}
          bg={bg} onBg={() => {const v=!bg; setBg(v); LS.set("qr_bg", v);}}
          focus={focus} onFocus={() => setFocus(true)}
          viewMode={viewMode} onToggleView={() => {setViewMode(m => m==="full"? "paged":"full"); setSurahPg(0);}}
          fs={fs} onFsDown={() => setFs(s => Math.max(12, s-1))} onFsUp={() => setFs(s => Math.min(28, s+1))}
          shareBtn={s? <SharePageBtn surahName={s.name} ayahCount={s.numberOfAyahs} surahNum={s.number} />:null}
          extraBtns={<>
            {surahObj&&surahAyahs&&<button className="rtb4-pill-btn" onClick={() => setMemoMode(true)}>🧠 حفظ</button>}
            <button className={`rtb4-pill-btn${showTrans? ' on':''}`} onClick={() => setShowTrans(v => !v)}>🌍 ترجمة</button>
          </>}
        />
        {memoMode&&surahObj&&<MemorizationMode surah={surahObj} onExit={() => setMemoMode(false)} />}
        {focus&&surahObj&&<FocusMode label={s.name} ayahs={surahAyahs||[]} surahNum={s.number} fontSize={fs} bg={bg} onExit={() => setFocus(false)} bkKey={`foc_bk_sura_${sel}`} />}
        {autoBkKey&&<AutoResumeBanner storageKey={autoBkKey} />}
        {autoBkToastS&&<div className="autobk-toast">🔖 تم حفظ موضعك تلقائياً</div>}
        {/* Surah info banner */}
        {s&&<div className="surah-info-banner">
          <div className="sib-arabic">{s.name}</div>
          <div className="sib-english">{s.englishName} — {s.englishNameTranslation}</div>
          <div className="sib-meta">
            <span>📍 {s.revelationType==="Meccan"? "مكية":"مدنية"}</span>
            <span>📖 {s.numberOfAyahs} آية</span>
            <span>🔢 سورة {s.number}</span>
          </div>
          {s.number!==9&&<div className="sib-bismillah">بِسْمِ ٱللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</div>}
        </div>}
        {surahLoading&&<Loading />}
        {!surahLoading&&surahAyahs&&viewMode==="full"&&(
          <SurahFullView
            ayahs={surahAyahs} surahNum={s.number}
            bg={bg} fs={fs} showTrans={showTrans}
          />
        )}
        {!surahLoading&&surahAyahs&&viewMode==="paged"&&<SurahPagedView
          ayahs={surahAyahs} surahNum={s.number}
          surahPg={surahPg} setSurahPg={setSurahPg}
          SURAH_PG_SIZE={SURAH_PG_SIZE} fs={fs} bg={bg}
        />}
        <div className="swipe-hint">← اسحب يميناً للسورة السابقة · يساراً للتالية →</div>
        <div className="reader-footer-nav">
          <button className="rfn-btn rfn-next"
            onClick={() => {setSel(i => Math.min(list.length-1, i+1)); setSaved(false); setFocus(false); setSurahPg(0); window.scrollTo({top: 0, behavior: 'smooth'});}}
            disabled={sel===list.length-1}>◀ التالية</button>
          <span className="rfn-label">{s?.name} · {sel+1}/{list.length}</span>
          <button className="rfn-btn rfn-prev"
            onClick={() => {setSel(i => Math.max(0, i-1)); setSaved(false); setFocus(false); setSurahPg(0); window.scrollTo({top: 0, behavior: 'smooth'});}}
            disabled={sel===0}>السابقة ▶</button>
        </div>
      </div>
    );
  }
  const filteredList=surahSearch? list.filter(s =>
    s.name.includes(surahSearch)||
    s.englishName.toLowerCase().includes(surahSearch.toLowerCase())||
    String(s.number)===surahSearch.trim()
  ):list;

  return (
    <div>
      <BkBanner bk={bk} labelFn={b => list[b]? `سورة ${list[b].name}`:""} onGoto={() => setSel(bk)} onClear={clrBk} />
      <div className="search-bar" style={{marginBottom: 12}}>
        <input value={surahSearch} onChange={e => setSurahSearch(e.target.value)}
          placeholder="ابحث باسم السورة أو رقمها..." dir="rtl" />
        <button onClick={() => setSurahSearch("")}>{surahSearch? "✕":"🔍"}</button>
      </div>
      {filteredList.length===0&&<div className="empty">لا توجد نتائج</div>}
      <div className="surahs-list">
        {filteredList.map((s, i) => {
          const realIdx=list.indexOf(s); return (
            <div key={realIdx} className="surah-row" onClick={() => setSel(realIdx)}>
              {bk===realIdx&&<span className="bk-flag">🔖</span>}
              <div className="s-side"><p>[{s.number}] {s.name}</p><p>[{s.numberOfAyahs}] آية</p></div>
              <div className="s-side" style={{textAlign: "left", direction: "ltr"}}><p>{s.englishName}</p><p>{s.revelationType==="Meccan"? "Meccan":"Medinan"}</p></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


// ─── Share Page as Image ──────────────────────────────────────────────────────
function SharePageBtn ({surahName, ayahCount, surahNum}) {
  const [sharing, setSharing]=useState(false);

  const shareAsImage=async () => {
    setSharing(true);
    try {
      // Dynamically load html2canvas
      if(!window.html2canvas) {
        await new Promise((res, rej) => {
          const s=document.createElement('script');
          s.src='https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
          s.onload=res; s.onerror=rej;
          document.head.appendChild(s);
        });
      }
      const el=document.querySelector('.qr-text')||document.querySelector('.qr-page-bg');
      if(!el) {setSharing(false); return;}
      const canvas=await window.html2canvas(el, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        logging: false,
      });
      // Add overlay frame
      const out=document.createElement('canvas');
      const pad=40;
      out.width=canvas.width+pad*2;
      out.height=canvas.height+pad*2+80;
      const ctx=out.getContext('2d');
      // Background
      const grad=ctx.createLinearGradient(0, 0, 0, out.height);
      grad.addColorStop(0, '#0e1e3d'); grad.addColorStop(1, '#1a3060');
      ctx.fillStyle=grad; ctx.fillRect(0, 0, out.width, out.height);
      // Border
      ctx.strokeStyle='#f0d060'; ctx.lineWidth=2;
      ctx.strokeRect(14, 14, out.width-28, out.height-28);
      // Title
      ctx.fillStyle='#f0d060'; ctx.textAlign='right'; ctx.font='bold 22px Arial';
      ctx.fillText('AL-Quran AL-Kareem', out.width-pad, pad+10);
      ctx.fillStyle='rgba(255,255,255,0.6)'; ctx.font='14px Arial';
      ctx.fillText(surahName||'', out.width-pad, pad+32);
      // Quran content
      ctx.drawImage(canvas, pad, pad+46);
      // Footer
      ctx.fillStyle='rgba(240,208,96,0.5)'; ctx.font='11px Arial'; ctx.textAlign='center';
      ctx.fillText('AL-Quran AL-Kareem — Mostafa Helal', out.width/2, out.height-18);

      out.toBlob(async blob => {
        try {
          if(navigator.share&&navigator.canShare&&navigator.canShare({files: [new File([blob], 'quran.png', {type: 'image/png'})]})) {
            await navigator.share({
              title: 'القرآن الكريم — '+(surahName||''),
              text: 'آيات من سورة '+(surahName||'')+' | AL-Quran AL-Kareem',
              files: [new File([blob], 'quran.png', {type: 'image/png'})]
            });
          } else {
            const url=URL.createObjectURL(blob);
            const a=document.createElement('a');
            a.href=url; a.download=`quran-${surahName||'page'}.png`;
            a.click();
            setTimeout(() => URL.revokeObjectURL(url), 2000);
          }
        } catch {}
        setSharing(false);
      }, 'image/png');
    } catch(e) {
      console.error(e);
      setSharing(false);
    }
  };

  return (
    <button className="share-page-btn" onClick={shareAsImage} disabled={sharing} title="مشاركة كصورة">
      {sharing
        ? <><i className="fa-solid fa-spinner fa-spin" /> جاري التصدير...</>
        :<><i className="fa-solid fa-share-nodes" /> مشاركة كصورة</>
      }
    </button>
  );
}

// ─── Quran text renderer — tajweed + ۝ ornament + tap-to-tafsir ──────────────

// ─── useTranslation — loads EN translation for a surah lazily ────────────────
function useTranslation (surahNum, enabled) {
  const [translations, setTranslations]=useState(null);
  const [loading, setLoading]=useState(false);
  useEffect(() => {
    if(!enabled||!surahNum) {setTranslations(null); return;}
    setLoading(true);
    fetch(`https://api.alquran.cloud/v1/surah/${surahNum}/en.sahih`)
      .then(r => r.json())
      .then(d => {
        const txts=(d.data?.ayahs||[]).map(a => a.text);
        setTranslations(txts);
      })
      .catch(() => setTranslations(null))
      .finally(() => setLoading(false));
  }, [surahNum, enabled]);
  return {translations, loading};
}

function QrTextBlock ({ayahs, surahNum, tajweed=false, translations=null}) {
  const open=(a) => {
    document.dispatchEvent(new CustomEvent("openTafsir", {
      detail: {text: a.text, surah: surahNum, ayah: a.numberInSurah}
    }));
  };
  return (
    <>
      {ayahs.map((a, i) => (
        <span key={i} className="ayah-unit" onClick={() => open(a)}>
          {tajweed? <TajweedText text={a.text} />:a.text.split(' ').map((w, wi) => (
            <span key={wi}
              onDoubleClick={e => {e.stopPropagation(); document.dispatchEvent(new CustomEvent('wordTap', {detail: {word: w}}));}}
            >{w}{' '}</span>
          ))}
          {" "}<AyahNum n={a.numberInSurah||i+1} />{" "}
          {translations&&translations[i]&&(
            <span style={{
              display: 'block', fontFamily: "'Tajawal',sans-serif", fontSize: '.72em',
              color: 'var(--txm)', direction: 'ltr', textAlign: 'left',
              borderTop: '1px solid var(--bdr)', paddingTop: 4, marginTop: 4, marginBottom: 6,
              lineHeight: 1.6, fontStyle: 'italic'
            }}>
              {translations[i]}
            </span>
          )}
        </span>
      ))}
    </>
  );
}

// ─── Pages ────────────────────────────────────────────────────────────────────
function Pages ({onReadMode=() => {}, gotoPage=null, onGotoDone=() => {}}) {
  const [pg, setPg]=useState(1);
  const [saved, setSaved]=useState(false);
  const [bk, setBk]=useState(() => LS.get("bk_page", null));
  const [fs, setFs]=useState(() => LS.get("fs_page", 16));
  const [bg, setBg]=useState(() => LS.get("qr_bg", false));
  const [showSettings, setShowSettings]=useState(false);
  const touchStartX=useRef(null);
  const touchStartY=useRef(null);
  const contentRef=useRef(null);

  const url=`https://api.alquran.cloud/v1/page/${pg}/quran-simple`;
  useEffect(() => {LS.set("fs_page", fs);}, [fs]);
  useEffect(() => {onReadMode(true);}, []);
  useEffect(() => {if(gotoPage!=null) {goTo(gotoPage); onGotoDone();} }, [gotoPage]);
  const pgBkToast=useAutoBookmark(`autobk_page_${pg}`, true);
  const {data, loading, error}=useFetch(url, [url]);

  const goTo=n => {
    const num=Math.max(1, Math.min(604, n));
    setPg(num);
    window.scrollTo({top: 0, behavior: "smooth"});
  };
  const saveBk=() => {LS.set("bk_page", pg); setBk(pg); setSaved(true); setTimeout(() => setSaved(false), 2000);};
  const clrBk=() => {LS.set("bk_page", null); setBk(null);};

  // ── Swipe left/right ──
  const onTouchStart=e => {
    touchStartX.current=e.targetTouches[0].clientX;
    touchStartY.current=e.targetTouches[0].clientY;
  };
  const onTouchEnd=e => {
    if(touchStartX.current===null) return;
    const dx=touchStartX.current-e.changedTouches[0].clientX;
    const dy=Math.abs(touchStartY.current-e.changedTouches[0].clientY);
    if(Math.abs(dx)>55&&dy<80) {
      if(dx>0&&pg<604) goTo(pg+1);
      else if(dx<0&&pg>1) goTo(pg-1);
    }
    touchStartX.current=null;
  };

  return (
    <div className="pages-wrap" ref={contentRef}
      onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <BkBanner bk={bk} labelFn={b => `صفحة ${b}`} onGoto={() => goTo(bk)} onClear={clrBk} />

      {/* Input row */}
      <div className="pg-input-row">
        <input type="number" value={pg} min={1} max={604}
          onChange={e => setPg(Number(e.target.value))}
          placeholder="1–604" />
        <button onClick={() => goTo(pg)}>عرض</button>
        <button className="pg-settings-btn" onClick={() => setShowSettings(s => !s)} title="إعدادات">⚙️</button>
      </div>

      {/* Settings panel */}
      {showSettings&&(
        <div className="pg-settings-panel">
          <div className="pg-settings-row">
            <span>حجم الخط:</span>
            <button onClick={() => setFs(s => Math.max(12, s-1))}>A-</button>
            <span>{fs}px</span>
            <button onClick={() => setFs(s => Math.min(28, s+1))}>A+</button>
          </div>
          <div className="pg-settings-row">
            <span>خلفية ورقية:</span>
            <button className={bg? "pg-tog-on":"pg-tog"} onClick={() => {const v=!bg; setBg(v); LS.set("qr_bg", v);}}>
              {bg? "مفعّل":"معطّل"}
            </button>
          </div>
          <div className="pg-settings-row">
            <button className={saved||bk===pg? "pg-saved-btn":"pg-save-btn"} onClick={saveBk}>
              {saved||bk===pg? "🔖 محفوظ":"🔖 حفظ الموضع"}
            </button>
          </div>
        </div>
      )}

      <AutoResumeBanner storageKey={`autobk_page_${pg}`} />
      {pgBkToast&&<div className="autobk-toast">🔖 تم حفظ موضعك تلقائياً</div>}

      {/* Top nav bar */}
      {/*
        <div className="reader-nav-bar">
        <button className="rnb-btn" onClick={() => goTo(pg-1)} disabled={pg<=1}>
          ▶ السابق
        </button>
        <span className="rnb-label">صفحة {pg} من 604</span>
        <button className="rnb-btn" onClick={() => goTo(pg+1)} disabled={pg>=604}>
          التالي ◀
        </button>
      </div>
      */}

      {loading&&<Loading />}{error&&<Err msg={error} />}

      {data&&(() => {
        const ayahs=data.data.ayahs;
        const items=[]; let lastSurahName=null;
        ayahs.forEach((a, i) => {
          const sName=a.surah?.name||a.surahName;
          if(sName&&sName!==lastSurahName) {lastSurahName=sName; items.push(<p key={"sh"+i} className="juz-hdr">{sName}</p>);}
          items.push(<span key={"a"+i} className="ayah-unit"
            onClick={() => document.dispatchEvent(new CustomEvent("openTafsir", {detail: {text: a.text, surah: a.surah?.number||a.surahNumber, ayah: a.numberInSurah}}))}>
            {a.text}{" "}<AyahNum n={a.numberInSurah} />{" "}
          </span>);
        });
        return (
          <div className={bg? "qr-page-bg":""}>
            <div className="swipe-hint">← اسحب يميناً/يساراً للتنقل بين الصفحات →</div>
            <div className="qr-text" style={{fontSize: fs}}>{items}</div>
          </div>
        );
      })()}

      {/* Footer nav — fixed at bottom on mobile */}
      <div className="reader-nav-bar">
        <button className="rnb-btn" onClick={() => goTo(pg-1)} disabled={pg<=1}>
          ▶ السابق
        </button>
        <span className="rnb-label">صفحة {pg} من 604</span>
        <button className="rnb-btn" onClick={() => goTo(pg+1)} disabled={pg>=604}>
          التالي ◀
        </button>
      </div>
    </div>
  );
}

// ─── Sajda ────────────────────────────────────────────────────────────────────
function Sajda () {
  const {data, loading, error}=useFetch("https://api.alquran.cloud/v1/sajda/quran-simple");
  if(loading) return <Loading />;
  if(error) return <Err msg={error} />;
  if(!data) return null;
  const ayahs=data.data.ayahs;
  return (
    <div className="sajda-page">
      <div className="sajda-hero">
        <div className="sajda-hero-title">مواضع السجدة</div>
        <div className="sajda-hero-sub">{ayahs.length} موضع سجدة تلاوة في القرآن الكريم</div>
      </div>
      {ayahs.map((a, i) => (
        <div key={i} className="sajda-card">
          <span className="sajda-num">{i+1}</span>
          <div className="sajda-surah">
            {a.surah?.name} — الجزء {a.juz}
          </div>
          <div className="sajda-text"
            onClick={() => document.dispatchEvent(new CustomEvent('openTafsir', {
              detail: {text: a.text, surah: a.surah?.number, ayah: a.numberInSurah}
            }))}>
            {a.text}
          </div>
          <div className="sajda-footer">
            <span className="sajda-badge">🤲 اسجد</span>
            <span className="sajda-ayah-ref">الآية {a.numberInSurah}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Audio ────────────────────────────────────────────────────────────────────

// ─── SleepTimer — stops audio after chosen duration ──────────────────────────
function SleepTimer ({audioRef}) {
  const [mins, setMins]=useState(null);
  const [remaining, setRemaining]=useState(null);
  const timerRef=useRef(null);
  const countRef=useRef(null);

  const start=(m) => {
    clearTimeout(timerRef.current);
    clearInterval(countRef.current);
    setMins(m);
    setRemaining(m*60);
    countRef.current=setInterval(() => {
      setRemaining(r => {
        if(r<=1) {
          clearInterval(countRef.current);
          // Stop audio
          if(audioRef?.current) {audioRef.current.pause();}
          setMins(null); setRemaining(null);
          if(Notification.permission==='granted') {
            new Notification('😴 مؤقت النوم', {body: 'تم إيقاف الاستماع', icon: '/Images/faviconLogo.jpg'});
          }
          return 0;
        }
        return r-1;
      });
    }, 1000);
  };

  const cancel=() => {
    clearInterval(countRef.current);
    setMins(null); setRemaining(null);
  };

  useEffect(() => () => {clearTimeout(timerRef.current); clearInterval(countRef.current);}, []);

  const fmtTime=s => `${String(Math.floor(s/60)).padStart(2, '0')}:${String(s%60).padStart(2, '0')}`;

  return (
    <div className="sleep-timer-wrap">
      <span className="sleep-timer-label">😴 مؤقت النوم:</span>
      {[15, 30, 45, 60].map(m => (
        <button key={m} className={`sleep-timer-btn${mins===m? ' active':''}`}
          onClick={() => mins===m? cancel():start(m)}>
          {m} دقيقة
        </button>
      ))}
      {remaining!==null&&(
        <>
          <span className="sleep-timer-countdown">{fmtTime(remaining)}</span>
          <button className="sleep-timer-cancel" onClick={cancel} title="إلغاء">✕</button>
        </>
      )}
    </div>
  );
}

function AudioSection () {
  const [mode, setMode]=useState(null);
  const [surahs, setSurahs]=useState([]);
  const [curSurahIdx, setCurSurahIdx]=useState(null);
  const [idx, setIdx]=useState(0);
  const [ayahs, setAyahs]=useState([]);
  const [audios, setAudios]=useState([]);
  const [playing, setPlaying]=useState(false);
  const [loop, setLoop]=useState(false);
  const [autoNext, setAutoNext]=useState(true);
  const [audioSearch, setAudioSearch]=useState("");
  const [loadingIdx, setLoadingIdx]=useState(null);
  const ref=useRef(null);
  const sleepRef=ref; // share ref for sleep timer
  // keep sel in sync with curSurahIdx for back-compat
  const sel=curSurahIdx;

  useEffect(() => {
    fetch("https://quran-endpoint.vercel.app/quran/")
      .then(r => r.json()).then(res => setSurahs(res.data||[])).catch(() => {});
  }, []);

  const loadSurah=useCallback((i) => {
    setCurSurahIdx(i); setIdx(0); setPlaying(false); setLoadingIdx(i);
    if(mode==="read") {
      fetch(`https://quran-endpoint.vercel.app/quran/${i+1}`)
        .then(r => r.json())
        .then(res => {
          const v=res.data.ayahs;
          const urls=v.map(x => x.audio.url);
          setAyahs(v.map(x => x.text.ar));
          setAudios(urls);
          setLoadingIdx(null);
          // auto-play first ayah
          setTimeout(() => {
            if(ref.current&&urls[0]) {
              ref.current.src=urls[0];
              ref.current.load();
              ref.current.play().catch(() => {});
              setPlaying(true);
            }
          }, 200);
        })
        .catch(() => setLoadingIdx(null));
    } else {
      // "only" mode: use the surah-level full recitation url
      const s=surahs[i];
      const url=s?.recitation?.full||"";
      const name=Object.values(s?.asma||{})[0]?.long||"";
      setAudios([url]); setAyahs([name]);
      setLoadingIdx(null);
      if(ref.current&&url) {
        ref.current.src=url; ref.current.load();
        ref.current.play().catch(() => {}); setPlaying(true);
      }
    }
  }, [mode, surahs]);

  // manualIdxRef no longer needed — prev/next set src directly in handler

  const toggle=() => {
    if(!ref.current) return;
    if(playing) {ref.current.pause(); setPlaying(false);}
    else {ref.current.play().catch(() => {}); setPlaying(true);}
  };

  // Use refs to access latest values inside ended callback without stale closure
  const audiosRef=useRef(audios);
  const idxRef=useRef(idx);
  const loopRef=useRef(loop);
  const autoNextRef=useRef(autoNext);
  const modeRef=useRef(mode);
  const curSurahIdxRef=useRef(curSurahIdx);
  const surahsRef=useRef(surahs);
  useEffect(() => {audiosRef.current=audios;}, [audios]);
  useEffect(() => {idxRef.current=idx;}, [idx]);
  useEffect(() => {loopRef.current=loop;}, [loop]);
  useEffect(() => {autoNextRef.current=autoNext;}, [autoNext]);
  useEffect(() => {modeRef.current=mode;}, [mode]);
  useEffect(() => {curSurahIdxRef.current=curSurahIdx;}, [curSurahIdx]);
  useEffect(() => {surahsRef.current=surahs;}, [surahs]);

  const ended=useCallback(() => {
    const _loop=loopRef.current;
    const _mode=modeRef.current;
    const _audios=audiosRef.current;
    const _idx=idxRef.current;
    const _autoNext=autoNextRef.current;
    const _curIdx=curSurahIdxRef.current;
    const _surahs=surahsRef.current;
    if(_loop) {
      if(ref.current) {ref.current.currentTime=0; ref.current.play().catch(() => {});}
      return;
    }
    if(_mode==="read") {
      const n=_idx+1;
      if(n<_audios.length) {
        // Directly set src and play — this is inside "ended" event so autoplay is allowed
        if(ref.current&&_audios[n]) {
          ref.current.src=_audios[n];
          ref.current.load();
          ref.current.play().catch(() => {});
        }
        setIdx(n);
      } else if(_autoNext&&_curIdx!=null&&_curIdx<_surahs.length-1) {
        loadSurah(_curIdx+1);
      } else {
        setIdx(0); setPlaying(false);
      }
    } else {
      if(_autoNext&&_curIdx!=null&&_curIdx<_surahs.length-1) {
        loadSurah(_curIdx+1);
      } else {
        setPlaying(false);
      }
    }
  }, [loadSurah]);

  const filteredSurahs=audioSearch
    ? surahs.filter(s => {const n=Object.values(s.asma||{})[0]?.long||""; return n.includes(audioSearch)||String(s.number)===audioSearch;})
    :surahs;

  const curSurahName=curSurahIdx!=null
    ? (Object.values(surahs[curSurahIdx]?.asma||{})[0]?.long||"")
    :"";

  return (
    <div className="audio-page">

      {/* ── Mode selector ── */}
      <div className="audio-mode-row">
        <button className={`audio-mode-btn${mode==="only"? " active":""}`}
          onClick={() => {setMode("only"); setCurSurahIdx(null); setPlaying(false);}}>
          <i className="fa-solid fa-headphones" /> <span>استماع فقط</span>
        </button>
        <button className={`audio-mode-btn${mode==="read"? " active":""}`}
          onClick={() => {setMode("read"); setCurSurahIdx(null); setPlaying(false);}}>
          <i className="fa-solid fa-book-open" /> <span>استماع وقراءة</span>
        </button>
      </div>

      {mode&&<>
        {/* ── Player card ── */}
        <div className="audio-player-card">

          {/* Vinyl / disc decoration */}
          <div className="audio-disc-row">
            <div className={`audio-disc${playing? " spinning":""}`}>
              <div className="audio-disc-inner">
                <span className="audio-disc-icon">🕌</span>
              </div>
            </div>
            <div className="audio-now-info">
              {curSurahIdx!=null? (<>
                <div className="audio-surah-name" dir="rtl">{curSurahName}</div>
                {mode==="read"&&ayahs[idx]&&(
                  <div className="audio-ayah-text" dir="rtl">{ayahs[idx]}</div>
                )}
                {mode==="read"&&audios.length>1&&(
                  <div className="audio-progress-label">{idx+1} / {audios.length} آية</div>
                )}
              </>):(
                <div className="audio-placeholder">
                  {loadingIdx!=null? "⏳ جاري التحميل...":"اختر سورة من القائمة أدناه"}
                </div>
              )}
            </div>
          </div>

          {/* EQ bars when playing */}
          {playing&&(
            <div className="audio-eq-row">
              {[12, 20, 9, 17, 14, 22, 10, 18, 13, 19, 11, 16].map((h, i) => (
                <div key={i} className="audio-eq-bar"
                  style={{"--h": h+"px", "--d": (0.2+i*0.07)+"s"}} />
              ))}
            </div>
          )}

          {/* Native <audio> — hidden visual but functional */}
          <audio ref={ref} className="audio-el"
            onEnded={ended}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          />
          <SleepTimer audioRef={ref} />

          {/* Controls */}
          <div className="audio-controls">
            <button className={`audio-opt-pill${loop? " on":""}`}
              onClick={() => setLoop(l => !l)} title="تكرار السورة">
              <i className="fa-solid fa-repeat" /> <span>تكرار</span>
            </button>

            <button className="audio-ctrl" title="السابق" onClick={() => {
              if(mode==="read") {
                const newIdx=idx>0? idx-1:0;
                if(ref.current&&audios[newIdx]) {
                  ref.current.src=audios[newIdx];
                  ref.current.play().catch(() => {});
                  setPlaying(true);
                }
                setIdx(newIdx);
              } else if(curSurahIdx!=null&&curSurahIdx>0) loadSurah(curSurahIdx-1);
            }}>
              <i className="fa-solid fa-backward-step" />
            </button>

            <button className="audio-ctrl audio-play-btn" onClick={toggle}>
              <i className={`fa-solid fa-${playing? "pause":"play"}`} />
            </button>

            <button className="audio-ctrl" title="التالي" onClick={() => {
              if(mode==="read") {
                const newIdx=Math.min(audios.length-1, idx+1);
                if(ref.current&&audios[newIdx]) {
                  ref.current.src=audios[newIdx];
                  ref.current.play().catch(() => {});
                  setPlaying(true);
                }
                setIdx(newIdx);
              } else if(curSurahIdx!=null&&curSurahIdx<surahs.length-1) loadSurah(curSurahIdx+1);
            }}>
              <i className="fa-solid fa-forward-step" />
            </button>

            <button className={`audio-opt-pill${autoNext? " on":""}`}
              onClick={() => setAutoNext(a => !a)} title="تشغيل تلقائي">
              <i className="fa-solid fa-list" /> <span>متتالي</span>
            </button>
          </div>
        </div>

        {/* ── Search + list ── */}
        <div className="audio-search-row">
          <input value={audioSearch} onChange={e => setAudioSearch(e.target.value)}
            placeholder="ابحث عن سورة..." dir="rtl" />
          <button onClick={() => setAudioSearch("")}>{audioSearch? "✕":"🔍"}</button>
        </div>

        <div className="audio-list">
          {filteredSurahs.map((s) => {
            const origIdx=surahs.indexOf(s);
            const name=Object.values(s.asma||{})[0]?.long||"";
            const type=Object.values(s.type||{})[0]||"";
            const isActive=curSurahIdx===origIdx;
            const isLoading=loadingIdx===origIdx;
            return (
              <div key={origIdx}
                className={`audio-item${isActive? " sel":""}`}
                onClick={() => loadSurah(origIdx)}>
                <div className="audio-item-num">{s.number}</div>
                <div className="audio-item-body">
                  <div className="audio-item-name" dir="rtl">{name}</div>
                  <div className="audio-item-meta">{type} · {s.ayahCount} آية</div>
                </div>
                <div className="audio-item-status">
                  {isLoading&&<i className="fa-solid fa-spinner fa-spin" style={{color: "var(--ac)", fontSize: 13}} />}
                  {isActive&&!isLoading&&playing&&(
                    <div className="audio-mini-eq">
                      {[5, 9, 6].map((h, i) => (
                        <div key={i} className="audio-eq-bar"
                          style={{"--h": h+"px", "--d": (0.2+i*0.15)+"s"}} />
                      ))}
                    </div>
                  )}
                  {isActive&&!isLoading&&!playing&&(
                    <i className="fa-solid fa-pause" style={{color: "var(--ac)", fontSize: 11}} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </>}
    </div>
  );
}

// ─── Radio / Live / Tafasir / Hadith / Azkar / Search / Tasbih ───────────────
function Radio () {
  const [radios, setRadios]=useState([]);
  const [sel, setSel]=useState(null);
  const [selName, setSelName]=useState("اختر محطة");
  const ref=useRef(null);
  useEffect(() => {
    fetch("https://www.mp3quran.net/api/v3/radios?language=ar")
      .then(r => r.json())
      .then(d => setRadios(d.radios.filter(r => SELECTED_RADIO_IDS.has(r.id))))
      .catch(() => {});
  }, []);
  const choose=r => {setSel(r.id); setSelName(r.name); if(ref.current) {ref.current.src=r.url; ref.current.load(); ref.current.play().catch(() => {});} };
  const playing=sel!==null;
  return (
    <div className="radio-page">
      <div className="radio-header">
        <div className="radio-header-icon">📻</div>
        <div className="radio-header-text">
          <h2>إذاعة القرآن الكريم</h2>
          <p>محطات إذاعية إسلامية مباشرة</p>
        </div>
      </div>
      <div className="radio-player-card">
        <div className="radio-now-playing">
          {playing&&(
            <div className="radio-equalizer">
              {[16, 22, 12, 20, 14].map((h, i) => (
                <div key={i} className="radio-eq-bar" style={{"--h": h+"px", "--d": (0.4+i*0.12)+"s"}} />
              ))}
            </div>
          )}
          <div>
            <div className="radio-station-name">{selName}</div>
            <div className="radio-station-sub">{playing? "يبث الآن 🔴":"لا توجد محطة نشطة"}</div>
          </div>
        </div>
        <audio ref={ref} src="" controls preload="auto" className="radio-audio" />
      </div>
      <div className="radio-list">
        {radios.map(r => (
          <div key={r.id} className={`radio-list-item${sel===r.id? " sel":""}`} onClick={() => choose(r)}>
            <div className="radio-list-dot" />
            <div className="radio-list-name">{r.name}</div>
            {sel===r.id&&<i className="fa-solid fa-volume-high" style={{color: "var(--ac)", fontSize: 14}} />}
          </div>
        ))}
        {radios.length===0&&<div className="empty">جاري التحميل...</div>}
      </div>
    </div>
  );
}
function Tafasir () {
  const [surahs, setSurahs]=useState([]);
  const [selUrl, setSelUrl]=useState("");
  const [selName, setSelName]=useState("");
  const [selIdx, setSelIdx]=useState(null);
  const [q, setQ]=useState("");
  const audioRef=useRef(null);

  useEffect(() => {
    fetch("https://www.mp3quran.net/api/v3/tafsir?tafsir=1&language=ar")
      .then(r => r.json())
      .then(d => setSurahs(d.tafasir?.soar||[]))
      .catch(() => {});
  }, []);

  const select=(t, i) => {
    setSelUrl(t.url); setSelName(t.name); setSelIdx(i);
    setTimeout(() => audioRef.current?.play().catch(() => {}), 200);
  };

  const filtered=q? surahs.filter(s => s.name.includes(q)):surahs;

  return (
    <div className="tafasir-page">

      {/* ── Search ── */}
      <div className="tafasir-search-wrap">
        <span className="tafasir-search-icon">🔍</span>
        <input value={q} onChange={e => setQ(e.target.value)}
          placeholder="ابحث باسم السورة..." dir="rtl" />
        {q&&<button style={{background: 'none', border: 'none', cursor: 'pointer', color: 'var(--txm)', fontSize: 14}} onClick={() => setQ('')}>✕</button>}
      </div>

      {/* ── Now Playing Hero ── */}
      {selUrl&&(
        <div className="tafasir-now">
          <div className="tafasir-now-label">▶ يُشغَّل الآن</div>
          <div className="tafasir-now-title">{selName}</div>
          <div className="tafasir-now-sub">🎙️ تفسير الإمام الطبري — تلاوة صوتية</div>
          <audio ref={audioRef} key={selUrl} src={selUrl} controls autoPlay preload="auto" className="tafasir-now-audio" />
        </div>
      )}

      {/* ── Empty state ── */}
      {!selUrl&&(
        <div className="tafasir-empty-state">
          <div className="tafasir-empty-state-icon">📖</div>
          <div style={{fontWeight: 700, color: 'var(--tx)'}}>تفسير الطبري الصوتي</div>
          <div style={{fontSize: 12, textAlign: 'center'}}>اختر أي سورة أدناه لبدء الاستماع لتفسير الإمام ابن جرير الطبري</div>
        </div>
      )}

      {/* ── Surah grid ── */}
      {surahs.length===0? (
        <div className="tafasir-loading-grid">
          {Array.from({length: 20}).map((_, i) => <div key={i} className="tafasir-skeleton" />)}
        </div>
      ):(
        <div className="tafasir-grid">
          {filtered.map((t, i) => {
            const realIdx=surahs.indexOf(t);
            return (
              <div key={i} className={`tafasir-card${selIdx===realIdx? ' sel':''}`} onClick={() => select(t, realIdx)}>
                <div className="tafasir-card-num">{realIdx+1}</div>
                <div className="tafasir-card-name">{t.name}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
function Hadith () {
  const [tab, setTab]=useState('browse'); // 'browse' | 'search'
  const [books, setBooks]=useState([]);
  const [selBook, setSelBook]=useState(null);
  const [secs, setSecs]=useState(null);
  const [hadiths, setHadiths]=useState(null);
  const [meta, setMeta]=useState(null);
  const [range, setRange]=useState(null);
  // Search state
  const [sq, setSq]=useState('');
  const [searchResults, setSearchResults]=useState([]);
  const [searching, setSearching]=useState(false);
  const [searched, setSearched]=useState(false);

  useEffect(() => {
    fetch("https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions.json")
      .then(r => r.json()).then(d => setBooks(Object.values(d))).catch(() => {});
  }, []);

  const open=book => {
    const link=book.collection?.[0]?.link;
    if(!link) return;
    setSelBook(book); setSecs(null); setHadiths(null);
    fetch(link).then(r => r.json()).then(d => {
      setSecs(d.metadata?.sections||{});
      setMeta(d.metadata?.section_details||{});
      setHadiths(d.hadiths||[]);
    }).catch(() => {});
  };

  const grades=g => {
    if(!g?.length) return null;
    return (<div className="h-grades"><table className="g-table"><thead><tr><th>Grade</th><th>Scholar</th></tr></thead><tbody>{g.map((x, i) => <tr key={i}><td>{x.grade}</td><td>{x.name}</td></tr>)}</tbody></table></div>);
  };

  // Search: fetch first book that has loaded hadiths and filter
  const doSearch=async () => {
    const q=sq.trim().toLowerCase();
    if(!q) return;
    setSearching(true); setSearched(true); setSearchResults([]);
    try {
      // Search across bukhari (ar) as primary
      const links=[
        'https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ara-bukhari.json',
        'https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ara-muslim.json',
      ];
      const results=[];
      for(const link of links) {
        const d=await fetch(link).then(r => r.json()).catch(() => null);
        if(!d) continue;
        const bookName=link.includes('bukhari')? 'صحيح البخاري':'صحيح مسلم';
        const matches=(d.hadiths||[]).filter(h =>
          h.text&&h.text.includes(q)
        ).slice(0, 8);
        matches.forEach(h => results.push({...h, bookName}));
        if(results.length>=15) break;
      }
      setSearchResults(results);
    } catch {}
    setSearching(false);
  };

  const highlight=(text, q) => {
    if(!q||!text) return text;
    const parts=text.split(new RegExp(`(${q})`, 'gi'));
    return parts.map((p, i) => p.toLowerCase()===q.toLowerCase()
      ? <mark key={i}>{p}</mark>:p);
  };

  if(range&&hadiths) {
    const [s, e]=range;
    return (
      <div>
        <button className="back-btn" style={{marginBottom: 10}} onClick={() => setRange(null)}>← رجوع</button>
        {hadiths.slice(s, e).map((h, i) => (
          <div key={i} className="h-box" data-num={s+i+1}>
            <p className={`h-text${!h.grades?.length? ' nb':''}`}>{h.text}</p>
            {grades(h.grades)}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="hadith-page">
      {/* Tabs */}
      <div className="hadith-tabs" style={{marginBottom: 14}}>
        <button className={`hadith-tab${tab==='browse'? ' active':''}`} onClick={() => setTab('browse')}>📚 تصفح الكتب</button>
        <button className={`hadith-tab${tab==='search'? ' active':''}`} onClick={() => setTab('search')}>🔍 بحث في الأحاديث</button>
      </div>

      {tab==='search'&&(
        <div>
          <div className="hadith-search-bar">
            <input className="hadith-search-inp" value={sq}
              onChange={e => setSq(e.target.value)}
              onKeyDown={e => e.key==='Enter'&&doSearch()}
              placeholder="ابحث في البخاري ومسلم... مثال: الأعمال بالنيات" />
            <button className="hadith-search-btn" onClick={doSearch}>بحث</button>
          </div>
          {searching&&<Loading />}
          {searched&&!searching&&searchResults.length===0&&(
            <div className="empty">لا توجد نتائج. حاول كلمة أخرى.</div>
          )}
          {searchResults.map((h, i) => (
            <div key={i} className="h-result-card">
              <div className="h-result-book">{h.bookName} — #{h.hadithnumber||i+1}</div>
              <div className="h-result-text">{highlight(h.text, sq.trim())}</div>
              {grades(h.grades)}
            </div>
          ))}
        </div>
      )}

      {tab==='browse'&&(
        <div>
          <h2 className="h-title">كتب الأحاديث</h2>
          {books.length===0&&<Loading />}
          {books.slice(0, 7).map((book, i) => (
            <div key={i}>
              <div className="h-book" onClick={() => open(book)}>
                [{i+1}] {HADITH_BOOKS[i]||book.name}
              </div>
              {selBook===book&&secs&&(
                <div className="h-sec-list">
                  {Object.entries(secs).filter(([k]) => k!=='0').map(([k, v]) => {
                    const d=meta[k];
                    return (
                      <div key={k} className="h-sec-item"
                        onClick={() => setRange([d?.hadithnumber_first, d?.hadithnumber_last])}>
                        <span>{v}</span>
                        <span style={{fontSize: 10, opacity: .7}}>{d?.hadithnumber_first}–{d?.hadithnumber_last}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
function ZekrCard ({zekr, idx}) {
  const target=parseInt(zekr.count)||1;
  const [count, setCount]=useState(0);
  const done=count>=target;
  const progress=Math.min(1, count/target);

  const tap=() => {
    if(done) return;
    const n=count+1;
    setCount(n);
    // Haptic feedback
    if(navigator.vibrate) navigator.vibrate(30);
  };

  return (
    <div className={`zekr-card${done? ' done':''}`}
      style={{'--progress': progress}}>
      <span className="zekr-num">{idx+1}</span>
      <div className="zekr-text">{zekr.text}</div>
      {zekr.bless&&<div className="zekr-bless">💎 {zekr.bless}</div>}
      <div className="zekr-footer">
        <button className={`zekr-counter-btn${done? ' done':''}`} onClick={tap}>
          {done? '✓':'🤲'}
        </button>
        <div className="zekr-count-display">
          <span>{count} / {target}</span>
          <span className="zekr-count-label">{done? 'اكتمل 🎉':'اضغط للعدّ'}</span>
        </div>
        <button className="zekr-reset" onClick={() => setCount(0)}>↺</button>
      </div>
    </div>
  );
}

function Azkar () {
  const S="https://ahegazy.github.io/muslimKit/json/azkar_sabah.json";
  const M="https://ahegazy.github.io/muslimKit/json/azkar_massa.json";
  const P="https://ahegazy.github.io/muslimKit/json/PostPrayer_azkar.json";
  const [local, setLocal]=useState(null);
  const [view, setView]=useState("list");
  const [title, setTitle]=useState("");
  const [items, setItems]=useState([]);
  const [loading, setLoading]=useState(false);

  useEffect(() => {fetch("/JS/adhkar.json").then(r => r.json()).then(setLocal).catch(() => setLocal([]));}, []);

  const loadExt=(url, t) => {
    setLoading(true);
    fetch(url).then(r => r.json()).then(res => {
      setTitle(t);
      setItems(res.content?.map(c => ({text: c.zekr, count: c.repeat, bless: c.bless||""}))||[]);
      setView("content"); setLoading(false);
    }).catch(() => setLoading(false));
  };
  const loadLoc=item => {
    setTitle(item.category);
    setItems(item.array.map(a => ({text: a.text, count: a.count, bless: ""})));
    setView("content");
  };

  const CATS=[
    {icon: "🌅", label: "أذكار الصباح", action: () => loadExt(S, "أذكار الصباح")},
    {icon: "🌙", label: "أذكار المساء", action: () => loadExt(M, "أذكار المساء")},
    {icon: "🕌", label: "بعد الصلاة", action: () => loadExt(P, "أذكار بعد الصلاة")},
  ];

  const completedCount=items.length;

  if(view==="content") return (
    <div>
      <div style={{display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14}}>
        <button className="back-btn" onClick={() => setView("list")}>← رجوع</button>
        <h2 style={{fontFamily: "'Tajawal',sans-serif", fontSize: 'var(--t-md)', color: 'var(--tx)', margin: 0, flex: 1}}>{title}</h2>
        <span style={{fontFamily: "'Tajawal',sans-serif", fontSize: 'var(--t-xs)', color: 'var(--txm)'}}>
          {items.length} ذكر
        </span>
      </div>
      {items.map((z, i) => <ZekrCard key={i} zekr={z} idx={i} />)}
    </div>
  );

  return (
    <div>
      <div style={{textAlign: 'center', padding: '14px 0 18px'}}>
        <div style={{fontFamily: "'Amiri','Aref Ruqaa',serif", fontSize: '1.4em', color: 'var(--tx)', marginBottom: 4}}>
          الأذكار والأوراد
        </div>
        <div style={{fontFamily: "'Tajawal',sans-serif", fontSize: 'var(--t-xs)', color: 'var(--txm)'}}>
          اضغط على أي ذكر لبدء العدّ التلقائي
        </div>
      </div>
      {loading&&<Loading />}
      <div className="azkar-grid">
        {CATS.map((c, i) => (
          <button key={i} className="azkar-cat-btn" onClick={c.action}>
            <span className="azkar-cat-icon">{c.icon}</span>
            {c.label}
          </button>
        ))}
        {local?.slice(1).map((item, i) => (
          <button key={i} className="azkar-cat-btn"
            style={{background: 'var(--item)', color: 'var(--tx)', border: '1.5px solid var(--bdr)', boxShadow: 'none'}}
            onClick={() => loadLoc(item)}>
            <span className="azkar-cat-icon">📿</span>
            {item.category}
          </button>
        ))}
        {local===null&&<Loading />}
      </div>
    </div>
  );
}
function QuranSearch () {
  const [q, setQ]=useState("");
  const [results, setResults]=useState([]);
  const [loading, setLoading]=useState(false);
  const [searched, setSearched]=useState(false);
  const [searchHistory, setSearchHistory]=useState(() => LS.get("search_history", []));

  const addToHistory=(term) => {
    if(!term.trim()) return;
    const h=[term, ...searchHistory.filter(x => x!==term)].slice(0, 10);
    setSearchHistory(h); LS.set("search_history", h);
  };
  const clearHistory=() => {setSearchHistory([]); LS.set("search_history", []);};

  const search=async (term) => {
    const txt=(term||q).trim();
    if(!txt) return;
    if(term) setQ(term);
    addToHistory(txt);
    setLoading(true); setSearched(true); setResults([]);
    try {
      // Try Arabic search first
      const res=await fetch(`https://api.alquran.cloud/v1/search/${encodeURIComponent(txt)}/all/ar`);
      const d=await res.json();
      let matches=d.data?.matches||[];
      // If no results and query looks like English/transliteration, try English translation
      if(matches.length===0) {
        const res2=await fetch(`https://api.alquran.cloud/v1/search/${encodeURIComponent(txt)}/all/en.sahih`);
        const d2=await res2.json();
        matches=d2.data?.matches||[];
      }
      setResults(matches);
    } catch {setResults([]);}
    finally {setLoading(false);}
  };

  // Popular searches
  const POPULAR=["الرحمن الرحيم", "آية الكرسي", "سبحان الله", "يا أيها الناس", "mercy", "paradise", "patience"];

  return (
    <div>
      <div className="search-bar">
        <input value={q} onChange={e => setQ(e.target.value)} onKeyDown={e => e.key==="Enter"&&search()}
          placeholder="ابحث بالعربية أو English..." />
        <button onClick={() => search()}><i className="fa-solid fa-search" /></button>
      </div>
      {!searched&&searchHistory.length>0&&(
        <div className="sh-wrap" style={{marginBottom: 10}}>
          <div className="sh-header">
            <span className="sh-title">🕐 عمليات البحث الأخيرة</span>
            <button className="sh-clear" onClick={clearHistory}>مسح الكل</button>
          </div>
          <div className="sh-chips">
            {searchHistory.map((h, i) => (
              <button key={i} className="sh-chip" onClick={() => {setQ(h); search(h);}}>
                <i className="fa-solid fa-clock-rotate-left" style={{fontSize: 10, opacity: .6, marginLeft: 4}} />
                {h}
              </button>
            ))}
          </div>
        </div>
      )}
      {!searched&&(
        <div style={{marginBottom: 14}}>
          <div style={{fontSize: "var(--t-xs)", color: "var(--txm)", fontFamily: "Tajawal", marginBottom: 8, textAlign: "center"}}>🔍 بحث سريع:</div>
          <div style={{display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center"}}>
            {POPULAR.map((p, i) => (
              <button key={i} onClick={() => search(p)} style={{
                background: "var(--item)", border: "1.5px solid var(--bdr)", borderRadius: 20,
                padding: "4px 11px", fontSize: "var(--t-xs)", fontFamily: "Tajawal",
                color: "var(--ac)", cursor: "pointer", transition: ".2s"
              }}>{p}</button>
            ))}
          </div>
        </div>
      )}
      {loading&&<Loading />}
      {searched&&!loading&&results.length===0&&(
        <div className="s-none">
          <div>لم يتم العثور على نتائج</div>
          <div style={{fontSize: "var(--t-xs)", marginTop: 6, color: "var(--txm)", fontFamily: "Tajawal"}}>
            حاول بكلمات أقصر أو بالعربية — مثال: "رحمن" بدلاً من "الرحمن الرحيم"
          </div>
        </div>
      )}
      {results.length>0&&(
        <div style={{marginBottom: 8, fontSize: "var(--t-xs)", color: "var(--txm)", fontFamily: "Tajawal", textAlign: "center"}}>
          {results.length} نتيجة — اضغط على أي آية للتفسير والاستماع
        </div>
      )}
      {results.map((m, i) => (
        <div key={i} className="s-result" style={{cursor: "pointer"}}>
          <div onClick={() => document.dispatchEvent(new CustomEvent("openTafsir", {detail: {text: m.text, surah: m.surah?.number, ayah: m.numberInSurah}}))}>{m.text}</div>
          <div className="s-meta" style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <span>سورة {m.surah?.name||m.surah?.englishName} — الآية {m.numberInSurah}</span>
            <button style={{background: "var(--ac)", color: "#fff", border: "none", borderRadius: 8, padding: "3px 10px", fontSize: 11, cursor: "pointer", marginRight: 4}} onClick={() => document.dispatchEvent(new CustomEvent("shareAyah", {detail: {text: m.text, surah: m.surah?.number, ayah: m.numberInSurah, surahName: m.surah?.name||""}}))} >📤</button>
          </div>
        </div>
      ))}
    </div>
  );
}
function Tasbih () {
  const [pi, setPi]=useState(() => LS.get('t_idx', 0));
  const [counts, setCounts]=useState(() => LS.get('t_counts', TASBIH_PHRASES.map(() => 0)));
  const [anim, setAnim]=useState(false);
  const phrase=TASBIH_PHRASES[pi];
  const count=counts[pi]||0;
  const goal=phrase.goal;
  const laps=Math.floor(count/goal);
  const pct=((count%goal)/goal)*100;
  const R=88; const CIRC=2*Math.PI*R;
  const dash=CIRC*(1-pct/100);

  const tap=() => {
    const nc=[...counts]; nc[pi]=(nc[pi]||0)+1;
    setCounts(nc); LS.set('t_counts', nc);
    setAnim(true); setTimeout(() => setAnim(false), 120);
    if(nc[pi]%goal===0) {
      if(navigator.vibrate) navigator.vibrate([80, 40, 80]);
      document.dispatchEvent(new CustomEvent('appNotification', {
        detail: {
          title: `✅ أتممت جولة ${Math.floor(nc[pi]/goal)} من ${phrase.ar}`,
          body: `أحسنت! سبّحت ${goal} مرة`, type: 'achievement'
        }
      }));
    } else if(navigator.vibrate) navigator.vibrate(15);
  };
  const undo=() => {const nc=[...counts]; if(nc[pi]>0) nc[pi]--; setCounts(nc); LS.set('t_counts', nc);};
  const reset=() => {const nc=[...counts]; nc[pi]=0; setCounts(nc); LS.set('t_counts', nc);};
  const sel=i => {setPi(i); LS.set('t_idx', i);};

  return (
    <div className="tasbih-wrap">
      <div className="t-phrase-scroll">
        {TASBIH_PHRASES.map((p, i) => (
          <button key={i} className={`t-phrase${pi===i? ' active':''}`} onClick={() => sel(i)}>{p.ar}</button>
        ))}
      </div>
      <div className="tasbih-hero">
        <div className="t-name">{phrase.ar}</div>
        {phrase.meaning&&<div className="t-meaning">{phrase.meaning}</div>}
        <div className="t-counter-ring">
          <svg className="t-ring-svg" viewBox="0 0 200 200" width="200" height="200">
            <circle className="t-ring-bg" cx="100" cy="100" r={R} strokeWidth="10" />
            <circle className="t-ring-fill" cx="100" cy="100" r={R} strokeWidth="10"
              strokeDasharray={CIRC} strokeDashoffset={dash} />
          </svg>
          <div className="t-count-inner">
            <span className="t-count" style={{transform: anim? 'scale(1.18)':'scale(1)', transition: 'transform .1s'}}>{count}</span>
            <span className="t-count-label">من {goal}</span>
            {laps>0&&<span className="t-lap-badge">🔁 جولة {laps+1}</span>}
          </div>
        </div>
        <div className="t-btn-row">
          <button className="t-btn-undo" onClick={undo}>↩</button>
          <button className="t-btn" onClick={tap}>﷽</button>
          <button className="t-btn-undo" onClick={reset}>↺</button>
        </div>
      </div>
      <div className="t-bottom-row">
        <span className="t-info">الهدف: <b>{goal}</b> — الكل: <b>{count}</b></span>
        {laps>0&&(
          <div className="t-sessions">
            {Array.from({length: Math.min(laps, 10)}, (_, i) => (
              <div key={i} className="t-session-dot done" title={`جولة ${i+1}`} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Prayer Times (with notification support) ─────────────────────────────────
function PrayerTimes () {
  const [times, setTimes]=useState(null);
  const [city, setCity]=useState(null);
  const [err, setErr]=useState(null);
  const [loading, setLoading]=useState(false);
  const [notifOn, setNotifOn]=useState(() => LS.get("notif", false));
  const [hijri, setHijri]=useState(null);

  useEffect(() => {
    setLoading(true);
    // Get location fast — don't wait for reverse geocode
    navigator.geolocation.getCurrentPosition(
      async pos => {
        try {
          const {latitude: lat, longitude: lng}=pos.coords;
          const d=new Date();
          const ds=`${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}`;
          // Fetch prayer times + city in parallel
          const [timingRes, geoRes]=await Promise.all([
            fetch(`https://api.aladhan.com/v1/timings/${ds}?latitude=${lat}&longitude=${lng}&method=4`),
            fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`)
          ]);
          const td=await timingRes.json();
          setTimes(td.data?.timings);
          setHijri(td.data?.date?.hijri);
          try {
            const gd=await geoRes.json();
            setCity(gd.address?.city||gd.address?.town||gd.address?.village||gd.address?.county||"موقعك");
          } catch {}
        } catch(e) {setErr("تعذّر جلب المواقيت");}
        finally {setLoading(false);}
      },
      () => {setErr("يرجى السماح بالوصول إلى الموقع"); setLoading(false);},
      {timeout: 8000, maximumAge: 300000, enableHighAccuracy: false}
    );
  }, []);

  const enableNotifications=async () => {
    if(!('Notification' in window)) {alert('متصفحك لا يدعم الإشعارات'); return;}
    const p=await Notification.requestPermission();
    if(p==='granted') {setNotifOn(true); LS.set('notif', true); scheduleRealPrayerNotifs(times);}
  };
  // Auto-schedule when times load if permission already granted
  useEffect(() => {
    if(times&&Notification.permission==='granted'&&LS.get('notif', false)) scheduleRealPrayerNotifs(times);
  }, [times]);

  const getNext=() => {
    if(!times) return null;
    const nm=new Date().getHours()*60+new Date().getMinutes();
    for(const p of PRAYERS) {
      const t=times[p.key]; if(!t) continue;
      const [h, m]=t.split(":").map(Number);
      if(h*60+m>nm) return p.key;
    }
    return PRAYERS[0].key;
  };
  const next=getNext();
  const PRAYER_ICONS={Fajr: "🌙", Sunrise: "🌅", Dhuhr: "☀️", Asr: "🌤", Maghrib: "🌇", Isha: "🌃"};

  if(loading) return (
    <div className="pt-loading">
      <div className="pt-loading-spinner"><i className="fa-solid fa-mosque fa-spin" /></div>
      <p>جاري تحديد الموقع وجلب المواقيت...</p>
    </div>
  );

  if(err) return (
    <div className="pt-err-card">
      <div className="pt-err-icon">📍</div>
      <p>{err}</p>
      <small>تأكد من تفعيل خدمة الموقع في المتصفح</small>
    </div>
  );

  if(!times) return null;

  return (
    <div className="pt-page">
      {/* Header */}
      <div className="pt-header-card">
        <div className="pt-header-top">
          <div>
            <div className="pt-header-title">🕌 مواقيت الصلاة</div>
            {city&&<div className="pt-header-city">📍 {city}</div>}
          </div>
          {hijri&&(
            <div className="pt-header-date">
              <div className="pt-hijri-day">{hijri.day}</div>
              <div className="pt-hijri-month">{hijri.month?.ar}</div>
              <div className="pt-hijri-year">{hijri.year} هـ</div>
            </div>
          )}
        </div>
      </div>

      {/* Prayer cards */}
      <div className="pt-cards-grid">
        {PRAYERS.map(p => (
          <div key={p.key} className={`pt-prayer-card${next===p.key? " pt-next":""}`}>
            <div className="pt-prayer-icon">{PRAYER_ICONS[p.key]||"🕐"}</div>
            <div className="pt-prayer-name">{p.ar}</div>
            <div className="pt-prayer-time">{formatTime(times[p.key])}</div>
            {next===p.key&&<div className="pt-next-badge">القادمة</div>}
          </div>
        ))}
      </div>

      {/* Notification button */}
      <button className={`pt-notif-btn${notifOn? " active":""}`} onClick={enableNotifications}>
        <i className={`fa-solid fa-bell${notifOn? "-slash":""}`} />
        {notifOn? " إشعارات الصلاة مفعّلة":" تفعيل إشعارات الصلاة"}
      </button>
    </div>
  );
}

// ─── Qibla ────────────────────────────────────────────────────────────────────
function Qibla () {
  const [angle, setAngle]=useState(null); const [compass, setCompass]=useState(0); const [err, setErr]=useState(null); const [loading, setLoading]=useState(false);
  useEffect(() => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      pos => {setAngle(calcQiblaAngle(pos.coords.latitude, pos.coords.longitude)); setLoading(false);},
      () => {setErr("يرجى السماح بالوصول إلى الموقع"); setLoading(false);},
      {timeout: 7000, maximumAge: 600000, enableHighAccuracy: false}
    );
    const h=e => {const heading=e.webkitCompassHeading??e.alpha; if(heading!=null) setCompass(heading);};
    if(typeof DeviceOrientationEvent!=="undefined"&&typeof DeviceOrientationEvent.requestPermission!=="function")
      window.addEventListener("deviceorientation", h, true);
    return () => window.removeEventListener("deviceorientation", h, true);
  }, []);
  const requestIOS=async () => {try {if((await DeviceOrientationEvent.requestPermission())==="granted") window.addEventListener("deviceorientation", e => {const h=e.webkitCompassHeading??e.alpha; if(h!=null) setCompass(h);}, true);} catch {} };
  if(loading) return <div className="loading"><i className="fa-solid fa-spinner fa-spin" /> جاري تحديد موقعك...</div>;
  return (
    <div className="qibla-wrap">
      <h3>🧭 اتجاه القبلة</h3>
      <p className="qibla-sub">ادر هاتفك حتى تتجه الإبرة نحو الكعبة المشرفة</p>
      {err? <p className="qibla-err">{err}</p>:(
        <>
          <div className="qibla-compass-outer">
            {/* Compass rose — rotates opposite to device heading so N stays "up" */}
            <div style={{position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center"}}>
              <div style={{position: "relative", width: "100%", height: "100%", transform: `rotate(${-compass}deg)`, transition: "transform .3s ease"}}>
                <span className="qibla-n">N</span>
                <span className="qibla-s">S</span>
                <span className="qibla-e">E</span>
                <span className="qibla-w">W</span>
                {/* Red north needle */}
                <div style={{position: "absolute", width: 5, borderRadius: 3, top: "10%", bottom: "50%", left: "calc(50% - 2.5px)", background: "linear-gradient(to bottom,#ef4444,rgba(239,68,68,.5))"}} />
                {/* South needle (blue/grey) */}
                <div style={{position: "absolute", width: 5, borderRadius: 3, top: "50%", bottom: "10%", left: "calc(50% - 2.5px)", background: "linear-gradient(to top,#94a3b8,rgba(148,163,184,.4))"}} />
              </div>
            </div>
            {/* Qibla needle — always points toward Kaaba */}
            <div style={{position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none"}}>
              <div style={{position: "relative", width: "100%", height: "100%", transform: `rotate(${(angle??0)-compass}deg)`, transition: "transform .3s ease"}}>
                {/* Green qibla needle pointing up = toward Kaaba */}
                <div style={{position: "absolute", width: 6, borderRadius: 3, top: "8%", bottom: "50%", left: "calc(50% - 3px)", background: "linear-gradient(to bottom,#22c55e,rgba(34,197,94,.3))"}} />
                <span style={{position: "absolute", top: "2%", left: "50%", transform: "translateX(-50%)", fontSize: 18, lineHeight: 1}}>🕋</span>
              </div>
            </div>
            <div className="qibla-center" />
          </div>
          {angle!=null&&(
            <div style={{textAlign: "center", marginTop: 10}}>
              <div className="qibla-deg">{Math.round(angle)}° من الشمال</div>
              <div style={{fontFamily: "Tajawal", fontSize: "var(--t-xs)", color: "var(--txm)", marginTop: 4}}>
                وجّه 🕋 نحو الأعلى ثم ادر هاتفك حتى تتطابق الإبر
              </div>
            </div>
          )}
          <p className="qibla-hint" style={{marginTop: 8}}>🔴 شمال &nbsp;|&nbsp; 🟢 اتجاه القبلة 🕋</p>
          {typeof DeviceOrientationEvent!=="undefined"&&typeof DeviceOrientationEvent.requestPermission==="function"&&<button className="back-btn" style={{marginTop: 12}} onClick={requestIOS}>السماح بالبوصلة (iOS)</button>}
        </>
      )}
    </div>
  );
}

// ─── Adhan Player ────────────────────────────────────────────────────────────
// Global audio ref so azan keeps playing across tab switches
const _azanAudio=typeof window!=='undefined'? new Audio():null;


// Store prayer times for Service Worker background notifications
function storePrayerScheduleForSW (timings) {
  const PRAYERS=[
    {key: "Fajr", ar: "الفجر"},
    {key: "Dhuhr", ar: "الظهر"},
    {key: "Asr", ar: "العصر"},
    {key: "Maghrib", ar: "المغرب"},
    {key: "Isha", ar: "العشاء"},
  ];
  const schedule=[];
  PRAYERS.forEach(p => {
    const t=timings[p.key];
    if(!t) return;
    const [h, m]=t.split(":").map(Number);
    const now=new Date();
    const pt=new Date(); pt.setHours(h, m, 0, 0);
    if(pt>now) {
      schedule.push({key: p.key, ar: p.ar, time: t, ts: pt.getTime()});
    }
  });
  LS.set("sw_prayer_schedule", schedule);
  // Notify SW to schedule background notifications
  if("serviceWorker" in navigator&&navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({
      type: "SCHEDULE_ADHAN",
      schedule,
      prefAdhanId: LS.get("pref_adhan_id", 1),
    });
  }
}

function AdhanPlayer () {
  // ── ALL useState hooks must come first ──────────────────────────────────────
  const [playingId, setPlayingId]=useState(null);
  const [vol, setVol]=useState(() => LS.get("azan_vol", 1.0));
  const [errId, setErrId]=useState(null);
  const [prefAdhanId, setPrefAdhanId]=useState(() => LS.get("pref_adhan_id", 1));
  const [notifOn, setNotifOn]=useState(() => LS.get("azan_notif", false));
  const [notifStatus, setNotifStatus]=useState("");
  const [prayerTimes, setPrayerTimes]=useState(null);
  const [city, setCity]=useState("");

  // ── Helper: register service worker + periodic sync ─────────────────────────
  const registerSW=async () => {
    if(!("serviceWorker" in navigator)) return null;
    try {
      const reg=await navigator.serviceWorker.register("/sw.js");
      await navigator.serviceWorker.ready;
      // Register periodic background sync (supported on Chrome Android)
      if('periodicSync' in reg) {
        try {
          await reg.periodicSync.register('check-prayer-times', {minInterval: 15*60*1000});
        } catch(e) { /* periodic sync not supported */}
      }
      return reg;
    } catch(e) {console.warn("SW failed:", e); return null;}
  };

  // ── Wake-up handler: when app comes back to foreground, check missed prayers ─
  useEffect(() => {
    const onVisible=async () => {
      if(document.visibilityState==='visible'&&notifOn) {
        const reg=await navigator.serviceWorker?.ready.catch(() => null);
        if(reg?.active) reg.active.postMessage({type: 'CHECK_MISSED'});
      }
    };
    document.addEventListener('visibilitychange', onVisible);
    return () => document.removeEventListener('visibilitychange', onVisible);
  }, [notifOn]);

  // ── useEffect: listen for SW messages to play adhan ─────────────────────────
  useEffect(() => {
    if(!("serviceWorker" in navigator)) return;
    const h=e => {
      if(e.data?.type==="PLAY_ADHAN"&&_azanAudio) {
        const adhan=ADHANS.find(a => a.id===LS.get("pref_adhan_id", 1))||ADHANS[0];
        _azanAudio.src=adhan.url; _azanAudio.volume=vol; _azanAudio.play().catch(() => {}); setPlayingId(adhan.id);
      }
    };
    navigator.serviceWorker.addEventListener("message", h);
    return () => navigator.serviceWorker.removeEventListener("message", h);
  }, [vol]);

  // ── useEffect: fetch prayer times on mount ───────────────────────────────────
  useEffect(() => {
    if(!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(async pos => {
      try {
        const {latitude: lat, longitude: lng}=pos.coords;
        const gc=await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
        const gd=await gc.json();
        setCity(gd.address?.city||gd.address?.town||gd.address?.village||"");
        const d=new Date(); const ds=`${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}`;
        const r=await fetch(`https://api.aladhan.com/v1/timings/${ds}?latitude=${lat}&longitude=${lng}&method=4`);
        const rd=await r.json(); setPrayerTimes(rd.data?.timings);
      } catch {}
    }, () => {});
  }, []);

  // ── useEffect: schedule notifications when prayerTimes loads ────────────────
  useEffect(() => {
    if(!notifOn||!prayerTimes) return;
    const PRAYERS=[{key: "Fajr", ar: "الفجر"}, {key: "Dhuhr", ar: "الظهر"}, {key: "Asr", ar: "العصر"}, {key: "Maghrib", ar: "المغرب"}, {key: "Isha", ar: "العشاء"}];
    const timers=[];
    PRAYERS.forEach(p => {
      const t=prayerTimes[p.key]; if(!t) return;
      const [h, m]=t.split(":").map(Number);
      const now=new Date(); const pTime=new Date(); pTime.setHours(h, m, 0, 0);
      const warn5=pTime-now-5*60*1000;
      if(warn5>0) {
        timers.push(setTimeout(() => {
          if(Notification.permission==="granted") new Notification(`🕌 ${p.ar} بعد 5 دقائق`, {body: `صلاة ${p.ar} الساعة ${t}`, icon: "/Images/faviconLogo.jpg", tag: `warn_${p.key}`});
          document.dispatchEvent(new CustomEvent("prayerWarning", {detail: {prayer: p.ar, time: t, mins: 5}}));
        }, warn5));
      }
      const onTime=pTime-now;
      if(onTime>0&&onTime<24*60*60*1000) {
        timers.push(setTimeout(() => {
          if(Notification.permission==="granted") new Notification(`🕌 حان وقت صلاة ${p.ar}`, {body: `الآن ${t} — ${city}`, icon: "/Images/faviconLogo.jpg", tag: `azan_${p.key}`, requireInteraction: true});
          document.dispatchEvent(new CustomEvent("prayerWarning", {detail: {prayer: p.ar, time: t, mins: 0}}));
          const prefAdhan=ADHANS.find(a => a.id===LS.get("pref_adhan_id", 1))||ADHANS[0];
          if(_azanAudio) {_azanAudio.src=prefAdhan.url; _azanAudio.volume=vol; _azanAudio.play().catch(() => {}); setPlayingId(prefAdhan.id);}
        }, onTime));
      }
    });
    return () => timers.forEach(clearTimeout);
  }, [notifOn, prayerTimes, vol, city]);

  // ── useEffect: schedule via SW + store schedule ──────────────────────────────
  useEffect(() => {
    if(!notifOn||!prayerTimes) return;
    const send=async () => {
      const reg=await registerSW(); if(!reg) return;
      const PRAYERS_S=[{key: "Fajr", name: "الفجر"}, {key: "Dhuhr", name: "الظهر"}, {key: "Asr", name: "العصر"}, {key: "Maghrib", name: "المغرب"}, {key: "Isha", name: "العشاء"}];
      const prayers=PRAYERS_S.map(p => {const t=prayerTimes[p.key]; if(!t) return null; const [h, m]=t.split(":").map(Number); const d=new Date(); d.setHours(h, m, 0, 0); return {...p, timestamp: d.getTime()};}).filter(Boolean);
      const adhan=ADHANS.find(a => a.id===LS.get("pref_adhan_id", 1))||ADHANS[0];
      const ctrl=reg.active||reg.installing||reg.waiting;
      if(ctrl) ctrl.postMessage({type: "SCHEDULE_ADHAN", prayers, adhanUrl: adhan.url, city});
      // Also send directly to active SW
      if(reg.active) reg.active.postMessage({type: "SCHEDULE_ADHAN", prayers, adhanUrl: adhan.url, city});
    };
    send();
  }, [notifOn, prayerTimes, city]);

  // ── useEffect: sync vol ──────────────────────────────────────────────────────
  useEffect(() => {if(_azanAudio) _azanAudio.volume=vol; LS.set("azan_vol", vol);}, [vol]);

  // ── useEffect: sync prefAdhanId ──────────────────────────────────────────────
  useEffect(() => {LS.set("pref_adhan_id", prefAdhanId);}, [prefAdhanId]);


  const enableNotif=async () => {
    if(!("Notification" in window)) {setNotifStatus("متصفحك لا يدعم الإشعارات"); return;}
    const perm=await Notification.requestPermission();
    if(perm==="granted") {
      setNotifOn(true); LS.set("azan_notif", true);
      setNotifStatus("✅ سيتم تذكيرك قبل كل صلاة بـ 5 دقائق");
      // Tell GlobalPrayerScheduler to re-schedule immediately
      document.dispatchEvent(new CustomEvent('adhanNotifEnabled'));
    } else {
      setNotifStatus("❌ لم يتم السماح بالإشعارات — تحقق من إعدادات المتصفح");
    }
  };

  const play=(a) => {
    if(!_azanAudio) return;
    setErrId(null);
    if(playingId===a.id) {_azanAudio.pause(); setPlayingId(null); return;}
    _azanAudio.src=a.url; _azanAudio.volume=vol; _azanAudio.load();
    _azanAudio.play().catch(() => setErrId(a.id));
    setPlayingId(a.id);
  };

  useEffect(() => {
    if(!_azanAudio) return;
    const h=() => setPlayingId(null);
    _azanAudio.addEventListener("ended", h);
    return () => _azanAudio.removeEventListener("ended", h);
  }, []);

  const PRAYERS_DISPLAY=[
    {key: "Fajr", ar: "الفجر", icon: "🌙"},
    {key: "Dhuhr", ar: "الظهر", icon: "☀️"},
    {key: "Asr", ar: "العصر", icon: "🌤"},
    {key: "Maghrib", ar: "المغرب", icon: "🌅"},
    {key: "Isha", ar: "العشاء", icon: "🌙"},
  ];

  return (
    <div className="adhan-wrap">
      <h3>الأذان</h3>
      <p style={{fontSize: "var(--t-xs)", color: "var(--txm)", fontFamily: "Tajawal", marginBottom: 14}}>
        استمع للأذان — الأذان يستمر حتى لو انتقلت لصفحة أخرى
      </p>
      {/* Mobile adhan tip */}
      <div style={{background: 'var(--item)', borderRadius: 10, padding: '10px 12px', marginBottom: 12, border: '1px dashed var(--bdr)'}}>
        <div style={{fontFamily: 'Tajawal', fontSize: 10, color: 'var(--txm)', lineHeight: 1.8}}>
          💡 <strong style={{color: 'var(--ac)'}}>للحصول على أفضل نتيجة على الجوال:</strong><br />
          • فعّل الإشعارات ثم أضف التطبيق إلى الشاشة الرئيسية<br />
          • لا تُغلق المتصفح نهائياً — فقط اضغط زر الرجوع<br />
          • على أندرويد كروم: الإشعارات تعمل حتى بعد قفل الشاشة ✅
        </div>
      </div>

      {/* Prayer times mini-bar */}
      {prayerTimes&&(
        <div style={{display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14, background: "var(--item)", borderRadius: 10, padding: "10px 12px"}}>
          {PRAYERS_DISPLAY.map(p => (
            <div key={p.key} style={{flex: "1 1 70px", minWidth: 70, textAlign: "center", fontFamily: "Tajawal", padding: "4px 2px"}}>
              <div style={{fontSize: "var(--t-xs)", color: "var(--txm)"}}>{p.icon} {p.ar}</div>
              <div style={{fontSize: "var(--t-sm)", color: "var(--ac)", fontWeight: 700}}>{prayerTimes[p.key]||"--"}</div>
            </div>
          ))}
          {city&&<div style={{width: "100%", fontSize: 10, color: "var(--txm)", fontFamily: "Tajawal", textAlign: "center", marginTop: 4}}>📍 {city}</div>}
        </div>
      )}

      {/* Notification toggle */}
      <div style={{background: "var(--item)", borderRadius: 10, padding: "12px 14px", marginBottom: 14, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8}}>
        <div>
          <div style={{fontFamily: "Tajawal", fontSize: "var(--t-sm)", color: "var(--tx)", fontWeight: 600}}>🔔 تذكير بمواقيت الصلاة</div>
          <div style={{fontFamily: "Tajawal", fontSize: 10, color: "var(--txm)", marginTop: 2}}>تنبيه قبل كل صلاة بـ 5 دقائق حتى عند إغلاق التطبيق • يعمل بشكل أفضل على أندرويد كروم</div>
        </div>
        {notifOn? (
          <button onClick={() => {setNotifOn(false); LS.set("azan_notif", false); setNotifStatus("تم إيقاف التذكيرات");}} style={{background: "#e11d48", color: "#fff", border: "none", borderRadius: 8, padding: "7px 14px", fontFamily: "Tajawal", fontSize: "var(--t-xs)", cursor: "pointer"}}>
            إيقاف التذكيرات
          </button>
        ):(
          <button onClick={enableNotif} style={{background: "var(--ac)", color: "#fff", border: "none", borderRadius: 8, padding: "7px 14px", fontFamily: "Tajawal", fontSize: "var(--t-xs)", cursor: "pointer"}}>
            تفعيل التذكيرات
          </button>
        )}
      </div>
      {notifStatus&&<div style={{fontSize: "var(--t-xs)", fontFamily: "Tajawal", color: "var(--ac)", marginBottom: 10, textAlign: "center"}}>{notifStatus}</div>}

      {/* Volume control */}
      <div style={{display: "flex", alignItems: "center", gap: 10, marginBottom: 14, flexWrap: "wrap", background: "var(--item)", borderRadius: 8, padding: "8px 12px"}}>
        <span style={{fontSize: "var(--t-xs)", fontFamily: "Tajawal", color: "var(--txm)"}}>🔊 الصوت</span>
        <input type="range" min={0} max={1} step={.05} value={vol}
          onChange={e => setVol(+e.target.value)}
          style={{flex: 1, maxWidth: 180, accentColor: "var(--ac)"}} />
        <span style={{fontSize: "var(--t-xs)", color: "var(--ac)", fontFamily: "Tajawal", minWidth: 32}}>{Math.round(vol*100)}%</span>
      </div>

      {/* Adhan cards */}
      <div className="adhan-grid">
        {ADHANS.map(a => (
          <div key={a.id} className={`adhan-card${playingId===a.id? " playing":""}`}>
            <div className="adhan-card-info" onClick={() => play(a)}>
              <div className="adhan-card-name">
                {a.name}
                {prefAdhanId===a.id&&<span className="adhan-default-badge">⭐ افتراضي</span>}
              </div>
              <div className="adhan-card-sub">{a.sub}</div>
              {errId===a.id&&<div style={{fontSize: 10, color: "#e55"}}>تعذّر التشغيل</div>}
            </div>
            <div className="adhan-card-btns">
              {prefAdhanId!==a.id&&(
                <button className="adhan-set-default" title="تعيين كافتراضي للإشعارات"
                  onClick={e => {e.stopPropagation(); setPrefAdhanId(a.id); LS.set("pref_adhan_id", a.id);}}>
                  ⭐
                </button>
              )}
              <button className="adhan-play-btn" onClick={e => {e.stopPropagation(); play(a);}}>
                <i className={`fa-solid ${playingId===a.id? "fa-stop":"fa-play"}`} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Global prayer warning toast ─────────────────────────────────────────────
// ─── Global Prayer Scheduler ─────────────────────────────────────────────────
// Mounts ONCE in App — schedules notifications regardless of which tab is open.
// Stores scheduled flag in LS to avoid double-scheduling on remount.
function GlobalPrayerScheduler () {
  const timersRef=useRef([]);
  const timingsRef=useRef(null);
  const posRef=useRef(null);

  const fireAdhan=useCallback((ar, t) => {
    document.dispatchEvent(new CustomEvent("prayerWarning", {detail: {prayer: ar, time: t, mins: 0}}));
    if(LS.get("azan_notif", false)&&Notification.permission==="granted") {
      new Notification(`🕌 حان وقت صلاة ${ar}`, {
        body: `الآن ${t} — حي على الصلاة`, icon: "/Images/faviconLogo.jpg",
        tag: `azan_${ar}_${t}`, requireInteraction: true
      });
    }
    // Play adhan audio
    if(_azanAudio) {
      const adhan=ADHANS.find(a => a.id===LS.get("pref_adhan_id", 1))||ADHANS[0];
      _azanAudio.src=adhan.url;
      _azanAudio.volume=LS.get("azan_vol", 1.0);
      _azanAudio.play().catch(() => {});
    }
  }, []);

  const scheduleAll=useCallback((times) => {
    // Clear old timers
    timersRef.current.forEach(clearTimeout);
    timersRef.current=[];
    if(!times) return;

    const PRAYERS=[
      {key: "Fajr", ar: "الفجر"}, {key: "Dhuhr", ar: "الظهر"},
      {key: "Asr", ar: "العصر"}, {key: "Maghrib", ar: "المغرب"}, {key: "Isha", ar: "العشاء"}
    ];

    PRAYERS.forEach(p => {
      const t=times[p.key]; if(!t) return;
      const [h, m]=t.split(":").map(Number);
      const now=new Date();
      const pTime=new Date(); pTime.setHours(h, m, 0, 0);
      const diff=pTime-now; // ms until prayer

      // ── Already happening? Fire immediately if within 3-min window ──────
      if(diff<=0&&diff>-3*60*1000) {
        fireAdhan(p.ar, t);
        return;
      }

      // ── 5-min warning ────────────────────────────────────────────────────
      const warn5=diff-5*60*1000;
      if(warn5>0&&warn5<86400000) {
        timersRef.current.push(setTimeout(() => {
          document.dispatchEvent(new CustomEvent("prayerWarning", {detail: {prayer: p.ar, time: t, mins: 5}}));
          if(LS.get("azan_notif", false)&&Notification.permission==="granted") {
            new Notification(`⏰ ${p.ar} بعد 5 دقائق`, {
              body: `سيحين وقت صلاة ${p.ar} الساعة ${t}`,
              icon: "/Images/faviconLogo.jpg", tag: `warn5_${p.key}`
            });
          }
        }, warn5));
      }

      // ── On prayer time ───────────────────────────────────────────────────
      if(diff>0&&diff<86400000) {
        timersRef.current.push(setTimeout(() => fireAdhan(p.ar, t), diff));
      }
    });
  }, [fireAdhan]);

  // ── Fetch prayer times on mount ─────────────────────────────────────────
  useEffect(() => {
    if(!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(async pos => {
      posRef.current=pos.coords;
      try {
        const {latitude: lat, longitude: lng}=pos.coords;
        const d=new Date();
        const ds=`${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}`;
        const r=await fetch(`https://api.aladhan.com/v1/timings/${ds}?latitude=${lat}&longitude=${lng}&method=4`);
        const rd=await r.json();
        const times=rd.data?.timings;
        if(times) {timingsRef.current=times; scheduleAll(times);}
      } catch(e) {console.warn("Prayer scheduler:", e);}
    }, () => {});
  }, [scheduleAll]);

  // ── Re-check when app becomes visible (returns from background) ──────────
  useEffect(() => {
    const onVisible=() => {
      if(document.visibilityState==='visible'&&timingsRef.current) {
        scheduleAll(timingsRef.current);
      }
    };
    document.addEventListener('visibilitychange', onVisible);
    return () => document.removeEventListener('visibilitychange', onVisible);
  }, [scheduleAll]);

  // ── Listen for notifOn changes (user enables in AdhanPlayer) ─────────────
  useEffect(() => {
    const onEnable=() => {if(timingsRef.current) scheduleAll(timingsRef.current);};
    document.addEventListener('adhanNotifEnabled', onEnable);
    return () => document.removeEventListener('adhanNotifEnabled', onEnable);
  }, [scheduleAll]);

  return null;
}

function PrayerWarningToast () {
  const [warn, setWarn]=useState(null);
  useEffect(() => {
    const h=e => {setWarn(e.detail); setTimeout(() => setWarn(null), 8000);};
    document.addEventListener("prayerWarning", h);
    return () => document.removeEventListener("prayerWarning", h);
  }, []);
  if(!warn) return null;
  const isNow=warn.mins===0;
  return (
    <div style={{
      position: "fixed", top: 70, left: "50%", transform: "translateX(-50%)",
      background: isNow? "var(--ac)":"#1e293b",
      color: "#fff", borderRadius: 14, padding: "12px 20px",
      fontFamily: "Tajawal", fontSize: "var(--t-sm)",
      zIndex: 9000, boxShadow: "0 6px 24px rgba(0,0,0,.4)",
      display: "flex", alignItems: "center", gap: 10,
      animation: "slideDown .4s ease", textAlign: "center", direction: "rtl",
      minWidth: 240, justifyContent: "center",
    }}>
      🕌 {isNow? `حان وقت صلاة ${warn.prayer} — ${warn.time}`:`صلاة ${warn.prayer} بعد 5 دقائق — ${warn.time}`}
    </div>
  );
}


// ─── NEW: Reading Tracker ─────────────────────────────────────────────────────
function ReadingTracker () {
  const [readDays, setReadDays]=useState(() => LS.get("read_days", {}));
  const [goal, setGoal]=useState(() => LS.get("read_goal", 10));
  const [logAnim, setLogAnim]=useState(false);
  const [confetti, setConfetti]=useState(false);
  const [tab, setTab]=useState("today"); // today | week | calendar | achievements
  const today=todayKey();
  const todayRead=readDays[today]||0;
  const todayDone=todayRead>=goal;
  const todayPct=Math.min(100, (todayRead/goal)*100);
  const circumf=2*Math.PI*38; // r=38

  /* streak */
  const calcStreak=() => {
    let s=0; const d=new Date();
    while(true) {const k=`${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`; if(!readDays[k]) break; s++; d.setDate(d.getDate()-1);}
    return s;
  };
  const streak=calcStreak();
  const totalDays=Object.keys(readDays).filter(k => readDays[k]>=goal).length;
  const totalPages=Object.values(readDays).reduce((a, b) => a+(b||0), 0);
  const avgPages=totalDays>0? Math.round(totalPages/Object.keys(readDays).filter(k => readDays[k]>0).length):0;

  /* best streak */
  const calcBestStreak=() => {
    const days=Object.keys(readDays).filter(k => readDays[k]>=goal).sort();
    let best=0, cur=0, prev=null;
    days.forEach(k => {
      const d=new Date(k.split('-').join('/'));
      if(prev) {const diff=(d-prev)/86400000; cur=diff<=1? cur+1:1;}
      else cur=1;
      best=Math.max(best, cur); prev=d;
    });
    return best;
  };
  const bestStreak=calcBestStreak();

  const logPage=() => {
    const rd={...readDays, [today]: (readDays[today]||0)+1};
    setReadDays(rd); LS.set("read_days", rd);
    setLogAnim(true); setTimeout(() => setLogAnim(false), 700);
    if(rd[today]===goal) {setConfetti(true); setTimeout(() => setConfetti(false), 3000);}
  };
  const undoPage=() => {
    if(!todayRead) return;
    const rd={...readDays, [today]: todayRead-1};
    setReadDays(rd); LS.set("read_days", rd);
  };

  /* Level system */
  const LEVELS=[
    {min: 0, max: 7, name: 'مبتدئ', icon: '🌱', color: '#6b7280'},
    {min: 8, max: 20, name: 'قارئ', icon: '📗', color: '#10b981'},
    {min: 21, max: 50, name: 'متحمس', icon: '📘', color: '#3b82f6'},
    {min: 51, max: 100, name: 'مواظب', icon: '📙', color: '#f59e0b'},
    {min: 101, max: 200, name: 'متقدم', icon: '📕', color: '#8b5cf6'},
    {min: 201, max: 999, name: 'حافظ', icon: '🏆', color: '#ec4899'},
  ];
  const lvl=LEVELS.find(l => totalDays>=l.min&&totalDays<=l.max)||LEVELS[0];
  const nextLvl=LEVELS[LEVELS.indexOf(lvl)+1];
  const lvlPct=nextLvl? Math.round(((totalDays-lvl.min)/(nextLvl.min-lvl.min))*100):100;

  /* 7-day data */
  const week7=Array.from({length: 7}, (_, i) => {
    const d=new Date(); d.setDate(d.getDate()-(6-i));
    const k=`${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
    return {v: readDays[k]||0, isToday: i===6, day: ['ح', 'ث', 'ر', 'خ', 'ج', 'س', 'أ'][d.getDay()]};
  });
  const maxW=Math.max(1, ...week7.map(d => d.v));

  /* calendar — last 5 weeks */
  const calDays=[];
  const now=new Date();
  const firstDay=new Date(now); firstDay.setDate(firstDay.getDate()-34);
  for(let i=0; i<firstDay.getDay(); i++) calDays.push(null);
  for(let i=0; i<35; i++) {const d=new Date(firstDay); d.setDate(d.getDate()+i); calDays.push(d);}

  /* achievements */
  const ACHIEVEMENTS=[
    {id: 'first', icon: '🌟', name: 'أول يوم', desc: 'قرأت لأول مرة', done: totalDays>=1},
    {id: 'week', icon: '🔥', name: 'أسبوع متواصل', desc: '7 أيام متواصلة', done: bestStreak>=7},
    {id: 'month', icon: '🏆', name: 'شهر متواصل', desc: '30 يوماً متواصلاً', done: bestStreak>=30},
    {id: 'p100', icon: '📚', name: '100 صفحة', desc: 'قرأت 100 صفحة إجمالاً', done: totalPages>=100},
    {id: 'p1000', icon: '💎', name: '1000 صفحة', desc: 'قرأت 1000 صفحة', done: totalPages>=1000},
    {id: 'd50', icon: '⭐', name: '50 يوم مكتمل', desc: 'أتممت الهدف 50 مرة', done: totalDays>=50},
    {id: 'early', icon: '🌅', name: 'القارئ المبكر', desc: 'قرأت قبل الفجر', done: false},
    {id: 'khatm', icon: '📖', name: 'ختمة كاملة', desc: 'أكملت ختمة القرآن', done: (LS.get('khatm_history', []).length)>=1},
  ];

  const motivate=streak>=30? `🏆 ${streak} يوماً — أنت حافظ!`:
    streak>=14? `🌟 ${streak} يوماً متواصلاً — رائع`:
      streak>=7? `🔥 أسبوع كامل — أحسنت!`:
        streak>=3? `💪 ${streak} أيام متواصلة`:
          streak>=1? `📖 استمر، أنت تتقدم`:'ابدأ رحلتك اليوم 🌱';

  const TABS=[{id: 'today', name: 'اليوم'}, {id: 'week', name: 'الأسبوع'}, {id: 'calendar', name: 'التقويم'}, {id: 'achievements', name: 'الإنجازات'}];

  return (
    <div className="tr3-wrap">

      {/* ════ CONFETTI ════ */}
      {confetti&&(
        <div className="tr3-confetti-wrap">
          {Array.from({length: 18}).map((_, i) => (
            <div key={i} className="tr3-confetti-dot" style={{
              left: `${Math.random()*100}%`,
              background: `hsl(${i*20},80%,60%)`,
              animationDelay: `${Math.random()*0.5}s`,
              width: `${6+Math.random()*8}px`,
              height: `${6+Math.random()*8}px`,
            }} />
          ))}
          <div className="tr3-confetti-msg">🎉 أحسنت! هدفك مكتمل!</div>
        </div>
      )}

      {/* ════ HERO ════ */}
      <div className="tr3-hero">
        <div className="tr3-hero-glow" />
        <div className="tr3-top-row">

          {/* Ring */}
          <div className="tr3-ring-area">
            <svg viewBox="0 0 100 100" className="tr3-ring-svg">
              <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(255,255,255,.15)" strokeWidth="8" />
              <circle cx="50" cy="50" r="38" fill="none" stroke="#fff" strokeWidth="8"
                strokeDasharray={`${(todayPct/100)*circumf} ${circumf}`}
                strokeLinecap="round" transform="rotate(-90 50 50)"
                style={{transition: 'stroke-dasharray .8s cubic-bezier(.22,1,.36,1)'}} />
              {todayDone&&<circle cx="50" cy="50" r="38" fill="none" stroke="rgba(134,239,172,.6)" strokeWidth="3"
                strokeDasharray={`${circumf} 0`} transform="rotate(-90 50 50)" />}
            </svg>
            <div className="tr3-ring-inner">
              <div className="tr3-ring-num" style={{transform: logAnim? 'scale(1.4)':'scale(1)', transition: 'transform .3s'}}>
                {todayRead}
              </div>
              <div className="tr3-ring-lbl">صفحة</div>
            </div>
          </div>

          {/* Info */}
          <div className="tr3-hero-info">
            <div className="tr3-hero-date">{new Date().toLocaleDateString('ar-EG', {weekday: 'long', day: 'numeric', month: 'long'})}</div>
            <div className="tr3-hero-status">
              {todayDone
                ? <span className="tr3-done-badge">✅ الهدف مكتمل!</span>
                :<span>الهدف: <strong style={{color: '#fde68a'}}>{goal}</strong> صفحة · تبقى <strong style={{color: '#fde68a'}}>{Math.max(0, goal-todayRead)}</strong></span>}
            </div>
            <div className="tr3-motivate">{motivate}</div>
            <div className="tr3-level-badge" style={{background: `${lvl.color}33`, borderColor: `${lvl.color}55`}}>
              {lvl.icon} {lvl.name}
            </div>
          </div>
        </div>{/* end tr3-top-row */}

        {/* Log row */}
        <div className="tr3-log-row">
          <button className="tr3-undo" onClick={undoPage} disabled={!todayRead}>↩</button>
          <button className="tr3-log-btn" onClick={logPage}>＋ تسجيل صفحة</button>
          <div className="tr3-pct">{Math.round(todayPct)}%</div>
        </div>

        {/* Goal stepper */}
        <div className="tr3-goal-row">
          <span style={{fontSize: 12, opacity: .8}}>🎯 الهدف:</span>
          <button className="tr3-goal-btn" onClick={() => {const v=Math.max(1, goal-1); setGoal(v); LS.set("read_goal", v);}}>−</button>
          <span className="tr3-goal-val">{goal}</span>
          <button className="tr3-goal-btn" onClick={() => {const v=Math.min(50, goal+1); setGoal(v); LS.set("read_goal", v);}}>+</button>
          <span style={{fontSize: 11, opacity: .7}}>صفحة/يوم</span>
        </div>
      </div>

      {/* ════ STATS STRIP ════ */}
      <div className="tr3-stats">
        {[
          {icon: '🔥', val: streak, lbl: 'المتواصل'},
          {icon: '🏆', val: bestStreak, lbl: 'أفضل سلسلة'},
          {icon: '⭐', val: totalDays, lbl: 'أيام مكتملة'},
          {icon: '📚', val: totalPages, lbl: 'مجموع الصفحات'},
          {icon: '📊', val: avgPages||0, lbl: 'معدل يومي'},
        ].map((s, i) => (
          <div key={i} className="tr3-stat">
            <div className="tr3-stat-icon">{s.icon}</div>
            <div className="tr3-stat-val">{s.val}</div>
            <div className="tr3-stat-lbl">{s.lbl}</div>
          </div>
        ))}
      </div>

      {/* ════ LEVEL PROGRESS ════ */}
      <div className="tr3-level-card">
        <div className="tr3-level-row">
          <span className="tr3-level-now">{lvl.icon} {lvl.name}</span>
          <span className="tr3-level-pct">{lvlPct}%</span>
          {nextLvl&&<span className="tr3-level-next">{nextLvl.icon} {nextLvl.name}</span>}
        </div>
        <div className="tr3-level-bar-bg">
          <div className="tr3-level-bar-fill" style={{width: `${lvlPct}%`, background: lvl.color}} />
        </div>
        {nextLvl&&<div className="tr3-level-tip">تحتاج {nextLvl.min-totalDays} يوم مكتمل للمستوى التالي</div>}
      </div>

      {/* ════ TABS ════ */}
      <div className="tr3-tabs">
        {TABS.map(t => (
          <button key={t.id} className={`tr3-tab${tab===t.id? ' active':''}`} onClick={() => setTab(t.id)}>{t.name}</button>
        ))}
      </div>

      {/* ── WEEK tab ── */}
      {tab==='week'&&(
        <div className="tr3-week-card">
          <div className="twc-wrap" style={{marginBottom: 0}}>
            <div className="twc-title">📈 إنجازات آخر 7 أيام</div>
            <div className="twc-bars">
              {week7.map((d, i) => (
                <div key={i} className={`twc-col${d.isToday? ' twc-today':''}`}>
                  <span className="twc-val">{d.v>0? d.v:''}</span>
                  <div className="twc-bar" style={{height: `${Math.max(4, Math.round((d.v/maxW)*100))}%`}} />
                  <span className="twc-day">{d.day}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Week summary */}
          <div className="tr3-week-summary">
            <div className="tr3-ws-item">
              <span>مجموع الأسبوع</span>
              <strong>{week7.reduce((a, d) => a+d.v, 0)} صفحة</strong>
            </div>
            <div className="tr3-ws-item">
              <span>أيام القراءة</span>
              <strong>{week7.filter(d => d.v>0).length} / 7</strong>
            </div>
            <div className="tr3-ws-item">
              <span>أفضل يوم</span>
              <strong>{Math.max(...week7.map(d => d.v))} صفحة</strong>
            </div>
          </div>
        </div>
      )}

      {/* ── CALENDAR tab ── */}
      {tab==='calendar'&&(
        <div className="tr3-cal-card">
          <div className="tracker-cal-header">
            <span>📅 تقويم القراءة — آخر 5 أسابيع</span>
            <div className="tracker-cal-legend">
              <span><span className="tracker-cal-dot read" />مكتمل</span>
              <span><span className="tracker-cal-dot" />لم يُقرأ</span>
            </div>
          </div>
          <div style={{display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 3, margin: "8px 0 4px"}}>
            {DAY_NAMES_AR.map(d => <div key={d} style={{fontSize: 9, color: "var(--txm)", fontFamily: "Tajawal", textAlign: "center"}}>{d}</div>)}
          </div>
          <div className="tracker-calendar">
            {calDays.map((d, i) => {
              if(!d) return <div key={i} className="cal-day empty" />;
              const k=`${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
              const isToday=k===today; const pages=readDays[k]||0; const done=pages>=goal;
              const intensity=pages===0? 0:Math.min(1, pages/goal);
              return (
                <div key={i} className={`cal-day${done? " read":""}${isToday? " today":""}`}
                  style={pages>0&&!done? {background: `var(--ac)${Math.round(intensity*155+50).toString(16).padStart(2, '0')}`}:{}}
                  title={`${d.getDate()} ${MONTH_NAMES_AR[d.getMonth()]} — ${pages} صفحة${done? " ✓":""}`}>
                  {d.getDate()}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── ACHIEVEMENTS tab ── */}
      {tab==='achievements'&&(
        <div className="tr3-ach-grid">
          {ACHIEVEMENTS.map(a => (
            <div key={a.id} className={`tr3-ach-card${a.done? ' done':''}`}>
              <div className="tr3-ach-icon">{a.icon}</div>
              <div className="tr3-ach-name">{a.name}</div>
              <div className="tr3-ach-desc">{a.desc}</div>
              {a.done&&<div className="tr3-ach-check">✓</div>}
            </div>
          ))}
        </div>
      )}

      {/* ── TODAY tab ── */}
      {tab==='today'&&(
        <div className="tr3-today-tips">
          <div className="tr3-tip-title">💡 نصيحة اليوم</div>
          {[
            '"اقرأ كتابَ ربك، فإن القلوب تصدأ كما يصدأ الحديد"',
            'الاستمرار خير من الكثرة — اقرأ ولو صفحة واحدة يومياً',
            'قراءة بعد الفجر من أبرك أوقات القراءة',
            'حاول ربط القراءة بوقت ثابت كل يوم لتكوين عادة',
          ][new Date().getDate()%4]}
        </div>
      )}
    </div>
  );
}

function NightReadingBanner () {
  const [show, setShow]=useState(false);
  const [dismissed, setDismissed]=useState(() => LS.get('night_banner_dismissed', null)===todayKey());
  useEffect(() => {
    const h=parseInt(new Date().getHours());
    if(h>=21||h<5) setShow(true);
  }, []);
  if(!show||dismissed) return null;
  return (
    <div className="night-banner">
      <span className="nb-icon">🌙</span>
      <span className="nb-text">وقت القراءة المسائية — خفّض سطوع الشاشة لراحة عينيك</span>
      <button className="nb-close" onClick={() => {setDismissed(true); LS.set('night_banner_dismissed', todayKey());}}>✕</button>
    </div>
  );
}

// ─── NEW: Ramadan Schedule ────────────────────────────────────────────────────
function RamadanSchedule () {
  const [times, setTimes]=useState(null);
  const [city, setCity]=useState(null);
  const [loading, setLoading]=useState(false);
  const [err, setErr]=useState(null);
  const [schedule, setSchedule]=useState([]);
  const [countdown, setCountdown]=useState(null);

  // Ramadan 1447H — Feb 18, 2026 (approximate)
  const RAMADAN_START=new Date("2026-02-18");
  const RAMADAN_END=new Date("2026-03-19");
  const today=new Date();
  const inRamadan=today>=RAMADAN_START&&today<=RAMADAN_END;
  const dayOfRamadan=inRamadan? Math.floor((today-RAMADAN_START)/(1000*60*60*24))+1:0;

  // Live countdown
  useEffect(() => {
    const tick=() => {
      const diff=RAMADAN_START-new Date();
      if(diff<=0) {setCountdown(null); return;}
      setCountdown({
        d: Math.floor(diff/(1000*60*60*24)),
        h: Math.floor((diff%(1000*60*60*24))/(1000*60*60)),
        m: Math.floor((diff%(1000*60*60))/(1000*60)),
        s: Math.floor((diff%(1000*60))/1000),
      });
    };
    tick();
    const t=setInterval(tick, 1000);
    return () => clearInterval(t);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async pos => {
        try {
          const {latitude: lat, longitude: lng}=pos.coords;
          const d=today;
          const ds=`${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}`;
          const [timingRes, geoRes, calRes]=await Promise.all([
            fetch(`https://api.aladhan.com/v1/timings/${ds}?latitude=${lat}&longitude=${lng}&method=4`),
            fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`),
            fetch(`https://api.aladhan.com/v1/calendar/${d.getFullYear()}/${d.getMonth()+1}?latitude=${lat}&longitude=${lng}&method=4`),
          ]);
          const td=await timingRes.json(); setTimes(td.data?.timings);
          try {const gd=await geoRes.json(); setCity(gd.address?.city||gd.address?.town||gd.address?.village||"موقعك");} catch {}
          try {const cd=await calRes.json(); setSchedule(cd.data||[]);} catch {}
        } catch {setErr("تعذّر جلب البيانات");}
        finally {setLoading(false);}
      },
      () => {setErr("يرجى السماح بالوصول إلى الموقع"); setLoading(false);},
      {timeout: 8000, maximumAge: 300000, enableHighAccuracy: false}
    );
  }, []);

  const suhoor=times?.Fajr; const iftar=times?.Maghrib;

  if(loading) return (
    <div className="pt-loading">
      <div className="pt-loading-spinner"><i className="fa-solid fa-moon fa-spin" /></div>
      <p>جاري تحديد الموقع وجلب البيانات...</p>
    </div>
  );

  return (
    <div className="ramadan-wrap">
      {/* Hero banner */}
      <div className="ramadan-hero">
        <div className="ramadan-hero-title">رمضان كريم 🌙</div>
        {inRamadan
          ? <><div className="ramadan-hero-sub">مرحباً بكم في شهر الخير والبركة</div><div className="ramadan-day-badge">اليوم {dayOfRamadan} من رمضان المبارك</div></>
          :<><div className="ramadan-hero-sub">العد التنازلي لرمضان 1447هـ</div><div className="ramadan-day-badge">فبراير 2026</div></>
        }
        {!inRamadan&&countdown&&(
          <div className="ramadan-countdown-row">
            <div className="rc-box"><div className="rc-num">{countdown.d}</div><div className="rc-lbl">يوم</div></div>
            <div className="rc-box"><div className="rc-num">{countdown.h}</div><div className="rc-lbl">ساعة</div></div>
            <div className="rc-box"><div className="rc-num">{countdown.m}</div><div className="rc-lbl">دقيقة</div></div>
            <div className="rc-box"><div className="rc-num">{countdown.s}</div><div className="rc-lbl">ثانية</div></div>
          </div>
        )}
      </div>

      {/* Suhoor / Iftar */}
      {times&&(
        <div className="ramadan-times-row">
          <div className="ramadan-time-card">
            <div className="rtc-icon">🌙</div>
            <div className="rtc-label">السحور — آخر موعد</div>
            <div className="rtc-time">{formatTime(suhoor)}</div>
          </div>
          <div className="ramadan-time-card">
            <div className="rtc-icon">🌅</div>
            <div className="rtc-label">الإفطار — المغرب</div>
            <div className="rtc-time">{formatTime(iftar)}</div>
          </div>
        </div>
      )}

      {city&&<div className="ramadan-location">📍 {city}</div>}
      {err&&<div className="ramadan-err">⚠️ {err}<br /><small>يرجى السماح بخدمة الموقع</small></div>}

      {/* Full schedule table */}
      {schedule.length>0&&(
        <>
          <div className="ramadan-table-title">🗓️ جدول سحور وإفطار رمضان 1447هـ</div>
          <div className="ramadan-table-wrap">
            <div className="ramadan-table-head">
              <span>#</span><span>التاريخ</span>
              <span style={{textAlign: 'center'}}>السحور</span>
              <span style={{textAlign: 'center'}}>الإفطار</span>
            </div>
            <div className="ramadan-days-list">
              {schedule.map((day, i) => {
                const isToday=inRamadan&&i===dayOfRamadan-1;
                return (
                  <div key={i} className={`ramadan-day-row${isToday? " today-row":""}`}>
                    <div className="rdr-num">{i+1}</div>
                    <span style={{fontSize: 10, direction: 'ltr'}}>{day.date?.gregorian?.date||day.date?.readable}</span>
                    <span className="rdr-time rdr-suhoor">🌙 {formatTime(day.timings?.Fajr)}</span>
                    <span className="rdr-time rdr-iftar">🌅 {formatTime(day.timings?.Maghrib)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// FEATURE 1: NIGHT READING MODE (Sepia / Night toggle in FsBar)
// Adds a warm amber/sepia palette for bedtime reading
// ═══════════════════════════════════════════════════════════════════
// Night mode is handled via CSS class "night-mode" on the main card
// and a button in FsBar. We'll add a global state via custom event.
const NIGHT_EVENT="toggleNight";
function useNightMode () {
  const [night, setNight]=useState(() => LS.get("nightMode", false));
  useEffect(() => {
    const h=() => setNight(n => {const v=!n; LS.set("nightMode", v); return v;});
    document.addEventListener(NIGHT_EVENT, h);
    return () => document.removeEventListener(NIGHT_EVENT, h);
  }, []);
  return night;
}

// ═══════════════════════════════════════════════════════════════════
// FEATURE 8: ISLAMIC CALENDAR — Hijri ↔ Gregorian converter +
//            Important Islamic dates panel
// ═══════════════════════════════════════════════════════════════════
const ISLAMIC_DATES=[
  {month: 1, day: 1, label: "رأس السنة الهجرية", en: "Islamic New Year", emoji: "🌙"},
  {month: 1, day: 10, label: "يوم عاشوراء", en: "Day of Ashura", emoji: "🤲"},
  {month: 3, day: 12, label: "المولد النبوي الشريف", en: "Prophet's Birthday", emoji: "🌹"},
  {month: 7, day: 27, label: "ليلة الإسراء والمعراج", en: "Isra & Mi'raj", emoji: "✨"},
  {month: 8, day: 15, label: "ليلة النصف من شعبان", en: "Mid-Sha'ban", emoji: "⭐"},
  {month: 9, day: 1, label: "أول رمضان", en: "First day of Ramadan", emoji: "🌛"},
  {month: 9, day: 27, label: "ليلة القدر (المرجحة)", en: "Laylat al-Qadr", emoji: "💫"},
  {month: 10, day: 1, label: "عيد الفطر المبارك", en: "Eid al-Fitr", emoji: "🎉"},
  {month: 12, day: 9, label: "يوم عرفة", en: "Day of Arafah", emoji: "🕋"},
  {month: 12, day: 10, label: "عيد الأضحى المبارك", en: "Eid al-Adha", emoji: "🐑"},
  {month: 12, day: 18, label: "أيام التشريق الأخيرة", en: "Last days of Tashreeq", emoji: "📅"},
];

function IslamicCalendar () {
  const [hijriDate, setHijriDate]=useState(null);
  const [gregInput, setGregInput]=useState(() => {
    const d=new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  });
  const [converted, setConverted]=useState(null);
  const [loading, setLoading]=useState(false);
  const [upcomingEvents, setUpcoming]=useState([]);

  // Load today's Hijri date
  useEffect(() => {
    const d=new Date();
    const ds=`${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}`;
    fetch(`https://api.aladhan.com/v1/gToH/${ds}`)
      .then(r => r.json()).then(d => {setHijriDate(d.data?.hijri); computeUpcoming(d.data?.hijri);})
      .catch(() => {});
  }, []);

  const computeUpcoming=(h) => {
    if(!h) return;
    const hMonth=+h.month.number, hDay=+h.day;
    const sorted=ISLAMIC_DATES.map(e => {
      let diff=(e.month-hMonth)*30+(e.day-hDay);
      if(diff<0) diff+=360;
      return {...e, diff};
    }).sort((a, b) => a.diff-b.diff).slice(0, 5);
    setUpcoming(sorted);
  };

  const convert=async () => {
    if(!gregInput) return;
    setLoading(true);
    try {
      const [y, m, d2]=gregInput.split('-');
      const ds=`${d2}-${m}-${y}`;
      const r=await fetch(`https://api.aladhan.com/v1/gToH/${ds}`);
      const d=await r.json();
      setConverted(d.data?.hijri);
    } catch {}
    setLoading(false);
  };

  const HIJRI_MONTHS=["محرم", "صفر", "ربيع الأول", "ربيع الآخر", "جمادى الأولى", "جمادى الآخرة", "رجب", "شعبان", "رمضان", "شوال", "ذو القعدة", "ذو الحجة"];

  return (
    <div className="ical-page">
      {/* Today Hijri */}
      <div className="ical-today-card">
        <div className="ical-today-label">التاريخ الهجري اليوم</div>
        {hijriDate? (
          <>
            <div className="ical-today-day">{hijriDate.day}</div>
            <div className="ical-today-month">{hijriDate.month?.ar}</div>
            <div className="ical-today-year">{hijriDate.year} هـ</div>
            <div className="ical-today-greg">{new Date().toLocaleDateString('ar-EG', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}</div>
          </>
        ):<div style={{fontSize: 28}}>⏳</div>}
      </div>

      {/* Converter */}
      <div className="ical-converter">
        <div className="ical-conv-title">🔄 تحويل التاريخ ميلادي ← هجري</div>
        <div className="ical-conv-row">
          <input type="date" className="ical-date-input" value={gregInput}
            onChange={e => setGregInput(e.target.value)} />
          <button className="ical-conv-btn" onClick={convert} disabled={loading}>
            {loading? <i className="fa-solid fa-spinner fa-spin" />:"تحويل"}
          </button>
        </div>
        {converted&&(
          <div className="ical-conv-result">
            <span className="ical-result-num">{converted.day}</span>
            <span className="ical-result-month">{converted.month?.ar}</span>
            <span className="ical-result-year">{converted.year} هـ</span>
          </div>
        )}
      </div>

      {/* Hijri months ring */}
      <div className="ical-months-wrap">
        <div className="ical-months-title">أشهر السنة الهجرية</div>
        <div className="ical-months-grid">
          {HIJRI_MONTHS.map((m, i) => (
            <div key={i} className={`ical-month-cell${hijriDate&&+hijriDate.month.number===i+1? " current":""}`}>
              <div className="ical-month-num">{i+1}</div>
              <div className="ical-month-name">{m}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming events */}
      <div className="ical-events-wrap">
        <div className="ical-events-title">📅 المناسبات الإسلامية القادمة</div>
        {upcomingEvents.map((e, i) => (
          <div key={i} className="ical-event-row">
            <div className="ical-event-emoji">{e.emoji}</div>
            <div className="ical-event-info">
              <div className="ical-event-name">{e.label}</div>
              <div className="ical-event-date">{e.day} {HIJRI_MONTHS[e.month-1]} — بعد {e.diff} يوم</div>
            </div>
          </div>
        ))}
      </div>

      {/* All events list */}
      <div className="ical-events-wrap">
        <div className="ical-events-title">🌙 جميع المناسبات الإسلامية</div>
        {ISLAMIC_DATES.map((e, i) => (
          <div key={i} className="ical-event-row">
            <div className="ical-event-emoji">{e.emoji}</div>
            <div className="ical-event-info">
              <div className="ical-event-name">{e.label}</div>
              <div className="ical-event-date">{e.day} {HIJRI_MONTHS[e.month-1]} — {e.en}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// FEATURE 10: BOOKMARKS MANAGER — central view of all saved positions
// ═══════════════════════════════════════════════════════════════════
function BookmarksManager ({onGoToJuz, onGoToSurah, onGoToPage}) {
  const [bkJuz, setBkJuz]=useState(() => LS.get("bk_juz", null));
  const [bkSurah, setBkSurah]=useState(() => LS.get("bk_surah", null));
  const [bkPage, setBkPage]=useState(() => LS.get("bk_page", null));
  const [ayahBks, setAyahBks]=useState(() => LS.get("ayah_bks", []));  // array of {text,surah,ayah,surahName,ts}
  const [notes, setNotes]=useState(() => LS.get("ayah_notes", {})); // {key: note text}
  const [editKey, setEditKey]=useState(null);
  const [editVal, setEditVal]=useState("");

  const clearJuz=() => {LS.set("bk_juz", null); setBkJuz(null);};
  const clearSurah=() => {LS.set("bk_surah", null); setBkSurah(null);};
  const clearPage=() => {LS.set("bk_page", null); setBkPage(null);};
  const clearAyah=(i) => {const n=[...ayahBks]; n.splice(i, 1); LS.set("ayah_bks", n); setAyahBks(n);};

  const startEdit=(key, cur) => {setEditKey(key); setEditVal(cur||"");};
  const saveNote=(key) => {const n={...notes, [key]: editVal}; LS.set("ayah_notes", n); setNotes(n); setEditKey(null);};

  const timeAgo=(ts) => {
    const m=Math.round((Date.now()-ts)/60000);
    if(m<2) return "منذ قليل"; if(m<60) return `منذ ${m} د`;
    const h=Math.round(m/60); if(h<24) return `منذ ${h} س`;
    return `منذ ${Math.round(h/24)} يوم`;
  };

  const hasAny=bkJuz||bkSurah||bkPage||ayahBks.length>0;

  return (
    <div className="bkm-page">
      <div className="bkm-header">
        <div className="bkm-header-icon">🔖</div>
        <div><h2>مكتبة المحفوظات</h2><p>جميع مواضع القراءة المحفوظة</p></div>
      </div>

      {!hasAny&&(
        <div className="bkm-empty">
          <div style={{fontSize: 48, marginBottom: 12}}>📚</div>
          <p>لا توجد محفوظات بعد</p>
          <small>احفظ موضعك أثناء القراءة باستخدام زر 🔖</small>
        </div>
      )}

      {/* Reading positions */}
      {(bkJuz||bkSurah||bkPage)&&(
        <div className="bkm-section">
          <div className="bkm-section-title">📍 مواضع القراءة</div>
          {bkJuz!=null&&(
            <div className="bkm-card">
              <div className="bkm-card-icon">📗</div>
              <div className="bkm-card-body">
                <div className="bkm-card-title">الجزء {bkJuz}</div>
                <div className="bkm-card-sub">حفظ موضع الجزء</div>
              </div>
              <div className="bkm-card-actions">
                <button className="bkm-goto" onClick={() => onGoToJuz(bkJuz)}>اذهب ←</button>
                <button className="bkm-del" onClick={clearJuz}>🗑</button>
              </div>
            </div>
          )}
          {bkSurah!=null&&(
            <div className="bkm-card">
              <div className="bkm-card-icon">📘</div>
              <div className="bkm-card-body">
                <div className="bkm-card-title">سورة محفوظة ({bkSurah+1})</div>
                <div className="bkm-card-sub">حفظ موضع السورة</div>
              </div>
              <div className="bkm-card-actions">
                <button className="bkm-goto" onClick={() => onGoToSurah(bkSurah)}>اذهب ←</button>
                <button className="bkm-del" onClick={clearSurah}>🗑</button>
              </div>
            </div>
          )}
          {bkPage!=null&&(
            <div className="bkm-card">
              <div className="bkm-card-icon">📄</div>
              <div className="bkm-card-body">
                <div className="bkm-card-title">الصفحة {bkPage}</div>
                <div className="bkm-card-sub">حفظ موضع الصفحة</div>
              </div>
              <div className="bkm-card-actions">
                <button className="bkm-goto" onClick={() => onGoToPage(bkPage)}>اذهب ←</button>
                <button className="bkm-del" onClick={clearPage}>🗑</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Saved ayahs */}
      {ayahBks.length>0&&(
        <div className="bkm-section">
          <div className="bkm-section-title">⭐ الآيات المحفوظة ({ayahBks.length})</div>
          {ayahBks.map((bk, i) => {
            const key=`${bk.surah}:${bk.ayah}`;
            return (
              <div key={i} className="bkm-ayah-card">
                <div className="bkm-ayah-meta">
                  <span className="bkm-surah-badge">{bk.surahName||`سورة ${bk.surah}`} — آية {bk.ayah}</span>
                  <span className="bkm-time">{timeAgo(bk.ts||Date.now())}</span>
                </div>
                <div className="bkm-ayah-text">{bk.text}</div>
                {notes[key]&&editKey!==key&&(
                  <div className="bkm-note">📝 {notes[key]}</div>
                )}
                {editKey===key&&(
                  <div className="bkm-note-edit">
                    <textarea value={editVal} onChange={e => setEditVal(e.target.value)}
                      placeholder="أضف ملاحظتك..." rows={2} />
                    <div style={{display: 'flex', gap: 6, marginTop: 4}}>
                      <button className="bkm-save-note" onClick={() => saveNote(key)}>حفظ</button>
                      <button className="bkm-cancel-note" onClick={() => setEditKey(null)}>إلغاء</button>
                    </div>
                  </div>
                )}
                <div className="bkm-ayah-actions">
                  <button className="bkm-note-btn" onClick={() => startEdit(key, notes[key])}>
                    {notes[key]? "✏️ تعديل الملاحظة":"📝 إضافة ملاحظة"}
                  </button>
                  <button className="bkm-tafsir-btn" onClick={() => document.dispatchEvent(new CustomEvent("openTafsir", {detail: {text: bk.text, surah: bk.surah, ayah: bk.ayah}}))}>
                    📖 تفسير
                  </button>
                  <button className="bkm-del" onClick={() => clearAyah(i)}>🗑</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// helper — save ayah to bookmarks list (called from TafsirPopup)
function saveAyahBookmark (text, surah, ayah, surahName) {
  const bks=LS.get("ayah_bks", []);
  const key=`${surah}:${ayah}`;
  if(bks.some(b => `${b.surah}:${b.ayah}`===key)) return; // already saved
  bks.unshift({text, surah, ayah, surahName: surahName||`سورة ${surah}`, ts: Date.now()});
  if(bks.length>100) bks.length=100;
  LS.set("ayah_bks", bks);
}

// ═══════════════════════════════════════════════════════════════════
// FEATURE 12: VOCABULARY FLASHCARDS — Quranic word spaced repetition
// ═══════════════════════════════════════════════════════════════════
const QURAN_VOCAB=[
  {ar: "اللَّهُ", en: "Allah / God", freq: "الأكثر تكراراً"},
  {ar: "رَبِّ", en: "Lord / My Lord", freq: "شائع جداً"},
  {ar: "قَالَ", en: "He said", freq: "شائع جداً"},
  {ar: "كَانَ", en: "Was / Were", freq: "شائع جداً"},
  {ar: "إِنَّ", en: "Indeed / Verily", freq: "شائع جداً"},
  {ar: "الَّذِينَ", en: "Those who", freq: "شائع"},
  {ar: "آمَنُوا", en: "Believed", freq: "شائع"},
  {ar: "عَمِلُوا", en: "Did / Worked", freq: "شائع"},
  {ar: "الصَّالِحَاتِ", en: "Righteous deeds", freq: "شائع"},
  {ar: "يَوْمَ", en: "Day", freq: "شائع"},
  {ar: "الْقِيَامَةِ", en: "The Resurrection", freq: "شائع"},
  {ar: "الْجَنَّةَ", en: "Paradise / Garden", freq: "شائع"},
  {ar: "النَّارَ", en: "The Fire / Hell", freq: "شائع"},
  {ar: "رَحِيمٌ", en: "Most Merciful", freq: "وصف الله"},
  {ar: "غَفُورٌ", en: "Most Forgiving", freq: "وصف الله"},
  {ar: "عَلِيمٌ", en: "All-Knowing", freq: "وصف الله"},
  {ar: "قَدِيرٌ", en: "Omnipotent / Able", freq: "وصف الله"},
  {ar: "حَكِيمٌ", en: "All-Wise", freq: "وصف الله"},
  {ar: "سَمِيعٌ", en: "All-Hearing", freq: "وصف الله"},
  {ar: "بَصِيرٌ", en: "All-Seeing", freq: "وصف الله"},
  {ar: "الصَّلَاةَ", en: "Prayer / Salah", freq: "عبادة"},
  {ar: "الزَّكَاةَ", en: "Almsgiving / Zakat", freq: "عبادة"},
  {ar: "الصِّيَامَ", en: "Fasting", freq: "عبادة"},
  {ar: "الْحَجَّ", en: "Pilgrimage / Hajj", freq: "عبادة"},
  {ar: "تَوْبَةً", en: "Repentance", freq: "روحاني"},
  {ar: "صَبَرُوا", en: "Were patient", freq: "أخلاق"},
  {ar: "شَكَرُوا", en: "Were grateful", freq: "أخلاق"},
  {ar: "أَقِيمُوا", en: "Establish / Perform", freq: "أمر"},
  {ar: "آتُوا", en: "Give / Pay", freq: "أمر"},
  {ar: "اتَّقُوا", en: "Fear / Be conscious of", freq: "أمر"},
  {ar: "وَاعْلَمُوا", en: "And know", freq: "أمر"},
  {ar: "فَاذْكُرُوا", en: "So remember", freq: "أمر"},
  {ar: "الْكِتَابَ", en: "The Book", freq: "مصطلح"},
  {ar: "الْوَحْيَ", en: "The Revelation", freq: "مصطلح"},
  {ar: "الرَّسُولَ", en: "The Messenger", freq: "مصطلح"},
  {ar: "الْأَنْبِيَاءَ", en: "The Prophets", freq: "مصطلح"},
  {ar: "الْمُؤْمِنُونَ", en: "The Believers", freq: "مصطلح"},
  {ar: "الْكَافِرُونَ", en: "The Disbelievers", freq: "مصطلح"},
  {ar: "الْمُنَافِقُونَ", en: "The Hypocrites", freq: "مصطلح"},
  {ar: "الدُّنْيَا", en: "This world / Worldly life", freq: "مصطلح"},
  {ar: "الْآخِرَةَ", en: "The Hereafter", freq: "مصطلح"},
  {ar: "بِسْمِ", en: "In the name of", freq: "أساسي"},
  {ar: "الْحَمْدُ", en: "All praise", freq: "أساسي"},
  {ar: "الرَّحْمَنِ", en: "The Most Gracious", freq: "أساسي"},
  {ar: "الرَّحِيمِ", en: "The Most Merciful", freq: "أساسي"},
  {ar: "مَلِكِ", en: "Master / King", freq: "أساسي"},
  {ar: "نَعْبُدُ", en: "We worship", freq: "أساسي"},
  {ar: "نَسْتَعِينُ", en: "We seek help", freq: "أساسي"},
  {ar: "الصِّرَاطَ", en: "The path / Way", freq: "أساسي"},
  {ar: "الْمُسْتَقِيمَ", en: "The straight", freq: "أساسي"},
  // ── Prophets & People ──
  {ar: "مُوسَى", en: "Moses (Prophet)", freq: "أنبياء"},
  {ar: "عِيسَى", en: "Jesus (Prophet)", freq: "أنبياء"},
  {ar: "إِبْرَاهِيمَ", en: "Abraham (Prophet)", freq: "أنبياء"},
  {ar: "مُحَمَّدٌ", en: "Muhammad (Prophet)", freq: "أنبياء"},
  {ar: "نُوحٌ", en: "Noah (Prophet)", freq: "أنبياء"},
  {ar: "دَاوُودَ", en: "David (Prophet)", freq: "أنبياء"},
  {ar: "سُلَيْمَانَ", en: "Solomon (Prophet)", freq: "أنبياء"},
  {ar: "يُوسُفَ", en: "Joseph (Prophet)", freq: "أنبياء"},
  {ar: "يَحْيَى", en: "John the Baptist", freq: "أنبياء"},
  {ar: "مَرْيَمَ", en: "Mary (mother of Jesus)", freq: "أنبياء"},
  // ── Creation & Nature ──
  {ar: "السَّمَاوَاتِ", en: "The heavens / skies", freq: "طبيعة"},
  {ar: "الْأَرْضَ", en: "The earth / land", freq: "طبيعة"},
  {ar: "الشَّمْسَ", en: "The sun", freq: "طبيعة"},
  {ar: "الْقَمَرَ", en: "The moon", freq: "طبيعة"},
  {ar: "الْمَاءَ", en: "Water", freq: "طبيعة"},
  {ar: "النُّورَ", en: "Light", freq: "طبيعة"},
  {ar: "الظُّلُمَاتِ", en: "Darkness / gloom", freq: "طبيعة"},
  {ar: "الرِّيحَ", en: "Wind", freq: "طبيعة"},
  {ar: "الْجِبَالَ", en: "The mountains", freq: "طبيعة"},
  {ar: "الْبَحْرَ", en: "The sea / ocean", freq: "طبيعة"},
  // ── Actions & Verbs ──
  {ar: "خَلَقَ", en: "Created / Made", freq: "فعل"},
  {ar: "أَنْزَلَ", en: "Sent down / Revealed", freq: "فعل"},
  {ar: "يَعْلَمُ", en: "He knows", freq: "فعل"},
  {ar: "يَرْزُقُ", en: "He provides sustenance", freq: "فعل"},
  {ar: "يَهْدِي", en: "He guides", freq: "فعل"},
  {ar: "يَغْفِرُ", en: "He forgives", freq: "فعل"},
  {ar: "يَتُوبُ", en: "He relents / accepts repentance", freq: "فعل"},
  {ar: "قَاتَلُوا", en: "They fought", freq: "فعل"},
  {ar: "هَاجَرُوا", en: "They emigrated", freq: "فعل"},
  {ar: "يُنْفِقُونَ", en: "They spend (in charity)", freq: "فعل"},
  // ── States & Qualities ──
  {ar: "مُسْلِمُونَ", en: "Muslims / Those who submit", freq: "صفة"},
  {ar: "صَادِقُونَ", en: "The truthful", freq: "صفة"},
  {ar: "خَاشِعُونَ", en: "The humble", freq: "صفة"},
  {ar: "ظَالِمُونَ", en: "The wrongdoers", freq: "صفة"},
  {ar: "فَاسِقُونَ", en: "The corrupt / sinful", freq: "صفة"},
  {ar: "مُتَّقُونَ", en: "The righteous / God-fearing", freq: "صفة"},
  {ar: "شَاكِرُونَ", en: "The grateful ones", freq: "صفة"},
  {ar: "صَابِرُونَ", en: "The patient ones", freq: "صفة"},
  // ── Key Concepts ──
  {ar: "الإِيمَانَ", en: "Faith / Belief", freq: "مفاهيم"},
  {ar: "الإِسْلَامَ", en: "Islam / Submission", freq: "مفاهيم"},
  {ar: "التَّقْوَى", en: "God-consciousness / Piety", freq: "مفاهيم"},
  {ar: "الْعَدْلَ", en: "Justice", freq: "مفاهيم"},
  {ar: "الْحَقَّ", en: "The truth / Right", freq: "مفاهيم"},
  {ar: "الْبَاطِلَ", en: "Falsehood / Vanity", freq: "مفاهيم"},
  {ar: "الْفِتْنَةَ", en: "Trial / Temptation / Discord", freq: "مفاهيم"},
  {ar: "النِّعْمَةَ", en: "Blessing / Bounty", freq: "مفاهيم"},
  {ar: "الشَّيْطَانَ", en: "Satan / The Devil", freq: "مفاهيم"},
  {ar: "الْعَرْشَ", en: "The Throne (of Allah)", freq: "مفاهيم"},
  {ar: "الصِّرَاطَ الْمُسْتَقِيمَ", en: "The Straight Path", freq: "مفاهيم"},
];

function VocabFlashcards () {
  const [scores, setScores]=useState(() => LS.get("vocab_scores", {}));
  const [cardIdx, setCardIdx]=useState(0);
  const [flipped, setFlipped]=useState(false);
  const [filter, setFilter]=useState("all");
  const [mode, setMode]=useState("study"); // study | quiz
  const [quizInput, setQuizInput]=useState("");
  const [quizResult, setQuizResult]=useState(null); // null | "correct" | "wrong"
  const [stats, setStats]=useState(() => LS.get("vocab_stats", {correct: 0, wrong: 0, streak: 0}));

  const CATS=[...new Set(QURAN_VOCAB.map(w => w.freq))];
  const deck=filter==="all"? QURAN_VOCAB
    :filter==="unseen"? QURAN_VOCAB.filter(w => !scores[w.ar])
      :filter==="wrong"? QURAN_VOCAB.filter(w => scores[w.ar]==="wrong")
        :QURAN_VOCAB.filter(w => w.freq===filter);

  const card=deck[cardIdx%Math.max(1, deck.length)];
  const progress=Math.round((Object.keys(scores).filter(k => scores[k]==="correct").length/QURAN_VOCAB.length)*100);

  const next=() => {setFlipped(false); setCardIdx(i => (i+1)%deck.length); setQuizInput(""); setQuizResult(null);};
  const prev=() => {setFlipped(false); setCardIdx(i => (i-1+deck.length)%deck.length); setQuizInput(""); setQuizResult(null);};

  const mark=(result) => {
    const ns={...scores, [card.ar]: result};
    setScores(ns); LS.set("vocab_scores", ns);
    const streak=result==="correct"? stats.streak+1:0;
    const ns2={...stats, [result]: stats[result]+1, streak};
    setStats(ns2); LS.set("vocab_stats", ns2);
    setTimeout(next, 400);
  };

  const checkQuiz=() => {
    const ans=quizInput.trim().toLowerCase();
    const correct=card.en.toLowerCase().split("/").some(p => ans.includes(p.trim().substring(0, 4)));
    const result=correct? "correct":"wrong";
    setQuizResult(result);
    mark(result);
  };

  const resetAll=() => {setScores({}); LS.set("vocab_scores", {}); setStats({correct: 0, wrong: 0, streak: 0}); LS.set("vocab_stats", {correct: 0, wrong: 0, streak: 0}); setCardIdx(0);};

  if(!card) return <div className="empty">لا توجد بطاقات في هذا الفلتر</div>;

  return (
    <div className="vocab-page">
      {/* Header */}
      <div className="vocab-header">
        <div className="vocab-header-icon">🃏</div>
        <div>
          <h2>مفردات القرآن الكريم</h2>
          <p>{QURAN_VOCAB.length} كلمة قرآنية — بطاقات تعليمية</p>
        </div>
      </div>

      {/* Stats bar */}
      <div className="vocab-stats">
        <div className="vocab-stat">
          <div className="vocab-stat-n" style={{color: "#22c55e"}}>{Object.values(scores).filter(v => v==="correct").length}</div>
          <div className="vocab-stat-l">✅ صحيح</div>
        </div>
        <div className="vocab-stat">
          <div className="vocab-stat-n" style={{color: "#ef4444"}}>{Object.values(scores).filter(v => v==="wrong").length}</div>
          <div className="vocab-stat-l">❌ خطأ</div>
        </div>
        <div className="vocab-stat">
          <div className="vocab-stat-n" style={{color: "var(--ac)"}}>{stats.streak}</div>
          <div className="vocab-stat-l">🔥 متتالية</div>
        </div>
        <div className="vocab-stat">
          <div className="vocab-stat-n">{progress}%</div>
          <div className="vocab-stat-l">📊 تقدم</div>
        </div>
      </div>
      <div className="vocab-progress-bar"><div style={{width: progress+"%", height: "100%", background: "linear-gradient(90deg,var(--ac),var(--ac2))", borderRadius: 4, transition: "width .5s"}} /></div>

      {/* Mode toggle */}
      <div className="vocab-mode-row">
        <button className={`vocab-mode-btn${mode==="study"? " active":""}`} onClick={() => setMode("study")}>📖 مذاكرة</button>
        <button className={`vocab-mode-btn${mode==="quiz"? " active":""}`} onClick={() => setMode("quiz")}>✍️ اختبار</button>
      </div>

      {/* Filter */}
      <div className="vocab-filters">
        <button className={`vocab-filter${filter==="all"? " active":""}`} onClick={() => {setFilter("all"); setCardIdx(0);}}>الكل</button>
        <button className={`vocab-filter${filter==="unseen"? " active":""}`} onClick={() => {setFilter("unseen"); setCardIdx(0);}}>جديد</button>
        <button className={`vocab-filter${filter==="wrong"? " active":""}`} onClick={() => {setFilter("wrong"); setCardIdx(0);}}>خطأ</button>
        {CATS.map(c => <button key={c} className={`vocab-filter${filter===c? " active":""}`} onClick={() => {setFilter(c); setCardIdx(0);}}>{c}</button>)}
      </div>

      {/* Card */}
      <div className={`vocab-card${flipped? " flipped":""}`} onClick={() => mode==="study"&&setFlipped(f => !f)}>
        <div className="vocab-card-inner">
          <div className="vocab-card-front">
            <div className="vocab-card-freq">{card.freq}</div>
            <div className="vocab-card-arabic">{card.ar}</div>
            {mode==="study"&&<div className="vocab-card-hint">اضغط لرؤية المعنى</div>}
          </div>
          <div className="vocab-card-back">
            <div className="vocab-card-arabic" style={{fontSize: "clamp(20px,5vw,28px)", marginBottom: 8}}>{card.ar}</div>
            <div className="vocab-card-meaning">{card.en}</div>
            <div className="vocab-card-freq" style={{marginTop: 8}}>{card.freq}</div>
          </div>
        </div>
        {scores[card.ar]&&(
          <div className={`vocab-card-badge ${scores[card.ar]}`}>
            {scores[card.ar]==="correct"? "✅":"❌"}
          </div>
        )}
      </div>

      {/* Quiz input */}
      {mode==="quiz"&&!flipped&&(
        <div className="vocab-quiz-row">
          <input className="vocab-quiz-input" value={quizInput} onChange={e => setQuizInput(e.target.value)}
            onKeyDown={e => e.key==="Enter"&&checkQuiz()}
            placeholder="اكتب المعنى بالإنجليزية..." dir="ltr" />
          <button className="vocab-quiz-check" onClick={checkQuiz}>تحقق</button>
        </div>
      )}
      {quizResult&&(
        <div className={`vocab-quiz-result ${quizResult}`}>
          {quizResult==="correct"? "✅ إجابة صحيحة!":`❌ الإجابة الصحيحة: ${card.en}`}
        </div>
      )}

      {/* Study buttons */}
      {mode==="study"&&flipped&&(
        <div className="vocab-mark-row">
          <button className="vocab-mark wrong" onClick={() => mark("wrong")}>❌ لم أعرفها</button>
          <button className="vocab-mark correct" onClick={() => mark("correct")}>✅ عرفتها</button>
        </div>
      )}

      {/* Nav */}
      <div className="vocab-nav">
        <button className="vocab-nav-btn" onClick={prev}>→</button>
        <span className="vocab-nav-pos">{(cardIdx%deck.length)+1} / {deck.length}</span>
        <button className="vocab-nav-btn" onClick={next}>←</button>
      </div>
      <button className="vocab-reset" onClick={resetAll}>🔄 إعادة التعيين</button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// NEW: 99 NAMES OF ALLAH (أسماء الله الحسنى)
// ═══════════════════════════════════════════════════════════════════

// Daily Duas collection
const DAILY_DUAS=[
  {text: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ", source: "البقرة 201", en: "Our Lord, give us in this world [that which is] good and in the Hereafter [that which is] good and protect us from the punishment of the Fire."},
  {text: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً", source: "آل عمران 8", en: "Our Lord, let not our hearts deviate after You have guided us and grant us from Yourself mercy."},
  {text: "رَبَّنَا إِنَّنَا آمَنَّا فَاغْفِرْ لَنَا ذُنُوبَنَا وَقِنَا عَذَابَ النَّارِ", source: "آل عمران 16", en: "Our Lord, indeed we have believed, so forgive us our sins and protect us from the punishment of the Fire."},
  {text: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي", source: "طه 25-26", en: "My Lord, expand for me my breast [with assurance] and ease for me my task."},
  {text: "رَبِّ زِدْنِي عِلْمًا", source: "طه 114", en: "My Lord, increase me in knowledge."},
  {text: "لَا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ", source: "الأنبياء 87", en: "There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers."},
  {text: "رَبِّ أَعُوذُ بِكَ مِنْ هَمَزَاتِ الشَّيَاطِينِ وَأَعُوذُ بِكَ رَبِّ أَن يَحْضُرُونِ", source: "المؤمنون 97-98", en: "My Lord, I seek refuge in You from the incitements of the devils, and I seek refuge in You, my Lord, lest they be present with me."},
  {text: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا", source: "الفرقان 74", en: "Our Lord, grant us from among our wives and offspring comfort to our eyes and make us a leader for the righteous."},
  {text: "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَىٰ وَالِدَيَّ", source: "النمل 19", en: "My Lord, enable me to be grateful for Your favor which You have bestowed upon me and upon my parents."},
  {text: "رَبَّنَا وَسِعْتَ كُلَّ شَيْءٍ رَّحْمَةً وَعِلْمًا فَاغْفِرْ لِلَّذِينَ تَابُوا وَاتَّبَعُوا سَبِيلَكَ", source: "غافر 7", en: "Our Lord, You have encompassed all things in mercy and knowledge, so forgive those who have repented and followed Your way."},
  {text: "رَبَّنَا اغْفِرْ لَنَا وَلِإِخْوَانِنَا الَّذِينَ سَبَقُونَا بِالْإِيمَانِ", source: "الحشر 10", en: "Our Lord, forgive us and our brothers who preceded us in faith."},
  {text: "رَبَّنَا أَتْمِمْ لَنَا نُورَنَا وَاغْفِرْ لَنَا إِنَّكَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ", source: "التحريم 8", en: "Our Lord, perfect for us our light and forgive us. Indeed, You are over all things competent."},
];


// ─── Quran Statistics ────────────────────────────────────────────────────────
const QURAN_STATS={
  totalSurahs: 114, totalAyahs: 6236, totalWords: 77430, totalLetters: 323671,
  makkiSurahs: 86, madaniSurahs: 28,
  longestSurah: {name: "البقرة", number: 2, ayahs: 286},
  shortestSurah: {name: "الكوثر", number: 108, ayahs: 3},
  longestAyah: {text: "آية الكرسي", surah: "البقرة", number: 255},
  mostFreqWord: {ar: "الله", count: 2699},
  juzCount: 30, hizbCount: 60, rub3Count: 240,
  sajdaCount: 15, initials: 29,
};

/* ═══════════════════════════════════════════════════════════
   QURAN QUIZ  – تحدي القرآن
   ═══════════════════════════════════════════════════════════ */
const QUIZ_QUESTIONS=[
  {q: "كم عدد سور القرآن الكريم؟", opts: ["112", "113", "114", "115"], ans: 2},
  {q: "ما هي أطول سورة في القرآن؟", opts: ["آل عمران", "البقرة", "النساء", "المائدة"], ans: 1},
  {q: "ما هي أقصر سورة في القرآن؟", opts: ["الإخلاص", "الفلق", "الكوثر", "الناس"], ans: 2},
  {q: "كم عدد أجزاء القرآن الكريم؟", opts: ["20", "25", "30", "35"], ans: 2},
  {q: "في أي شهر بدأ نزول القرآن الكريم؟", opts: ["رجب", "شعبان", "رمضان", "محرم"], ans: 2},
  {q: "ما اسم أول سورة في القرآن الكريم؟", opts: ["البقرة", "الفاتحة", "الناس", "الإخلاص"], ans: 1},
  {q: "ما اسم آخر سورة في القرآن الكريم؟", opts: ["الإخلاص", "الفلق", "الناس", "الكافرون"], ans: 2},
  {q: "كم عدد آيات سورة الفاتحة؟", opts: ["5", "6", "7", "8"], ans: 2},
  {q: "كم آية في سورة البقرة؟", opts: ["285", "286", "287", "288"], ans: 1},
  {q: "ما هي السورة التي تبدأ بـ'قل هو الله أحد'؟", opts: ["الفلق", "الناس", "الإخلاص", "الكافرون"], ans: 2},
  {q: "كم سجدة في القرآن الكريم؟", opts: ["13", "14", "15", "16"], ans: 2},
  {q: "ما اسم السورة المسماة بـ'قلب القرآن'؟", opts: ["الرحمن", "يس", "الكهف", "طه"], ans: 1},
  {q: "في أي سورة يُذكر أكبر عدد من الأنبياء؟", opts: ["الأنبياء", "يوسف", "آل عمران", "البقرة"], ans: 0},
  {q: "كم مرة ذُكر اسم 'محمد' في القرآن؟", opts: ["2", "4", "6", "8"], ans: 1},
  {q: "ما السورة التي تُقرأ يوم الجمعة؟", opts: ["يوسف", "يس", "الكهف", "الملك"], ans: 2},
  {q: "كم آية في سورة الكوثر؟", opts: ["2", "3", "4", "5"], ans: 1},
  {q: "ما أول ما نزل من القرآن الكريم؟", opts: ["الفاتحة", "المدثر", "العلق", "الإخلاص"], ans: 2},
  {q: "كم مرة ذُكرت كلمة 'الله' في القرآن؟", opts: ["1000", "1500", "2699", "3000"], ans: 2},
  {q: "ما السورة التي لا تبدأ بالبسملة؟", opts: ["الكهف", "التوبة", "يس", "الملك"], ans: 1},
  {q: "كم عدد آيات القرآن الكريم؟", opts: ["6236", "6300", "6000", "6500"], ans: 0},
];

function QuranQuiz () {
  const [started, setStarted]=useState(false);
  const [qIdx, setQIdx]=useState(0);
  const [score, setScore]=useState(0);
  const [selected, setSelected]=useState(null);
  const [finished, setFinished]=useState(false);
  const [questions, setQuestions]=useState([]);
  const [streak, setStreak]=useState(0);
  const [bestScore, setBestScore]=useState(() => LS.get('quiz_best', 0));

  const startQuiz=(count=10) => {
    const shuffled=[...QUIZ_QUESTIONS].sort(() => Math.random()-0.5).slice(0, count);
    setQuestions(shuffled);
    setQIdx(0); setScore(0); setSelected(null); setFinished(false); setStreak(0);
    setStarted(true);
  };

  const handleAnswer=(idx) => {
    if(selected!==null) return;
    setSelected(idx);
    const correct=idx===questions[qIdx].ans;
    const ns=correct? score+1:score;
    const nst=correct? streak+1:0;
    if(correct) setScore(ns);
    setStreak(nst);
    setTimeout(() => {
      if(qIdx+1>=questions.length) {
        setFinished(true);
        if(ns>bestScore) {setBestScore(ns); LS.set('quiz_best', ns);}
      } else {
        setQIdx(i => i+1); setSelected(null);
      }
    }, 900);
  };

  const pct=questions.length? Math.round((score/questions.length)*100):0;
  const grade=pct>=90? 'ممتاز 🌟':pct>=70? 'جيد جداً 👍':pct>=50? 'جيد 🙂':'تحتاج مراجعة 📚';

  if(!started) return (
    <div className="quiz-home">
      <div className="quiz-home-icon">🏆</div>
      <h2 className="quiz-home-title">تحدي القرآن الكريم</h2>
      <p className="quiz-home-sub">اختبر معلوماتك عن كتاب الله العزيز</p>
      {bestScore>0&&<div className="quiz-best">🥇 أعلى نتيجة: {bestScore} / {QUIZ_QUESTIONS.length}</div>}
      <div className="quiz-count-row">
        {[10, 15, 20].map(n => (
          <button key={n} className="quiz-count-btn" onClick={() => startQuiz(n)}>
            <span className="qcb-num">{n}</span>
            <span className="qcb-lbl">سؤال</span>
          </button>
        ))}
      </div>
    </div>
  );

  if(finished) return (
    <div className="quiz-result">
      <div className="quiz-result-circle" style={{'--pct': pct}}>
        <span className="qrc-score">{score}</span>
        <span className="qrc-total">/{questions.length}</span>
      </div>
      <div className="quiz-grade">{grade}</div>
      <div className="quiz-pct">{pct}%</div>
      <div className="quiz-result-btns">
        <button className="quiz-restart-btn" onClick={() => startQuiz(questions.length)}>🔄 إعادة المحاولة</button>
        <button className="quiz-home-btn" onClick={() => setStarted(false)}>🏠 القائمة الرئيسية</button>
      </div>
    </div>
  );

  const q=questions[qIdx];
  return (
    <div className="quiz-play">
      <div className="quiz-hdr">
        <div className="quiz-prog-bar"><div className="quiz-prog-fill" style={{width: `${((qIdx)/questions.length)*100}%`}}></div></div>
        <div className="quiz-meta">
          <span className="quiz-qnum">سؤال {qIdx+1}/{questions.length}</span>
          <span className="quiz-score-live">✅ {score}</span>
          {streak>=3&&<span className="quiz-streak">🔥 {streak}</span>}
        </div>
      </div>
      <div className="quiz-question">{q.q}</div>
      <div className="quiz-opts">
        {q.opts.map((opt, i) => {
          let cls='quiz-opt';
          if(selected!==null) {
            if(i===q.ans) cls+=' correct';
            else if(i===selected&&selected!==q.ans) cls+=' wrong';
          }
          return <button key={i} className={cls} onClick={() => handleAnswer(i)}>{opt}</button>;
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   DAILY DUAS  – أدعية قرآنية ونبوية
   ═══════════════════════════════════════════════════════════ */
const DUAS_DATA={
  "أدعية قرآنية": [
    {ar: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ", ref: "البقرة: 201", en: "Our Lord, give us good in this world and good in the next and protect us from the Fire."},
    {ar: "رَبِّ زِدْنِي عِلْمًا", ref: "طه: 114", en: "My Lord, increase me in knowledge."},
    {ar: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً", ref: "آل عمران: 8", en: "Our Lord, let not our hearts deviate after You have guided us, and grant us mercy from Yourself."},
    {ar: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي", ref: "طه: 25-26", en: "My Lord, expand for me my chest and ease my task for me."},
    {ar: "رَبَّنَا اغْفِرْ لَنَا ذُنُوبَنَا وَإِسْرَافَنَا فِي أَمْرِنَا وَثَبِّتْ أَقْدَامَنَا", ref: "آل عمران: 147", en: "Our Lord, forgive us our sins and our excess in our affairs and plant firmly our feet."},
    {ar: "رَّبِّ أَعُوذُ بِكَ مِنْ هَمَزَاتِ الشَّيَاطِينِ وَأَعُوذُ بِكَ رَبِّ أَن يَحْضُرُونِ", ref: "المؤمنون: 97-98", en: "My Lord, I seek refuge in You from the incitements of the devils, and I seek refuge in You lest they be present with me."},
    {ar: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا", ref: "الفرقان: 74", en: "Our Lord, grant us from among our wives and offspring comfort to our eyes and make us a leader for the righteous."},
    {ar: "رَبَّنَا تَقَبَّلْ مِنَّا ۖ إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ", ref: "البقرة: 127", en: "Our Lord, accept from us. Indeed You are the Hearing, the Knowing."},
  ],
  "أدعية الأنبياء": [
    {ar: "لَّا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ", ref: "الأنبياء: 87 – يونس ﷺ", en: "There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers."},
    {ar: "رَبِّ إِنِّي لِمَا أَنزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ", ref: "القصص: 24 – موسى ﷺ", en: "My Lord, indeed I am in need of whatever good You would send down to me."},
    {ar: "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ", ref: "النمل: 19 – سليمان ﷺ", en: "My Lord, enable me to be grateful for Your favor which You have bestowed upon me."},
    {ar: "رَبِّ هَبْ لِي مِن لَّدُنكَ ذُرِّيَّةً طَيِّبَةً ۖ إِنَّكَ سَمِيعُ الدُّعَاءِ", ref: "آل عمران: 38 – زكريا ﷺ", en: "My Lord, grant me from Yourself a good offspring. Indeed, You are the Hearer of supplication."},
    {ar: "رَبَّنَا إِنَّكَ تَعْلَمُ مَا نُخْفِي وَمَا نُعْلِنُ", ref: "إبراهيم: 38 – إبراهيم ﷺ", en: "Our Lord, indeed You know what we conceal and what we declare."},
  ],
  "أدعية الصباح والمساء": [
    {ar: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ", ref: "حديث نبوي", en: "O Allah, You are my Lord, none has the right to be worshipped except You, You created me and I am your servant."},
    {ar: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ", ref: "حديث نبوي", en: "In the name of Allah with Whose name nothing can harm on earth or in heaven, and He is the All-Hearing, All-Knowing."},
    {ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ", ref: "حديث نبوي", en: "O Allah, I ask You for well-being in this world and the Hereafter."},
  ],
  "أدعية الحاجة": [
    {ar: "اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا وَأَنْتَ تَجْعَلُ الْحَزْنَ سَهْلًا إِذَا شِئْتَ", ref: "حديث نبوي", en: "O Allah, there is no ease except that which You make easy, and You make the difficulty easy if You will."},
    {ar: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ", ref: "آل عمران: 173", en: "Allah is sufficient for us, and He is the best disposer of affairs."},
    {ar: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ وَالْعَجْزِ وَالْكَسَلِ", ref: "حديث نبوي", en: "O Allah, I seek refuge in You from anxiety and sorrow, weakness and laziness."},
  ],
};

function DailyDuas () {
  const cats=Object.keys(DUAS_DATA);
  const [cat, setCat]=useState(cats[0]);
  const [fav, setFav]=useState(() => LS.get('dua_fav', []));
  const [copied, setCopied]=useState(null);
  const [showEn, setShowEn]=useState({});
  const duas=DUAS_DATA[cat]||[];

  const toggleFav=(key) => {
    const nf=fav.includes(key)? fav.filter(x => x!==key):[...fav, key];
    setFav(nf); LS.set('dua_fav', nf);
  };
  const copyDua=(ar, i) => {
    navigator.clipboard?.writeText(ar).catch(() => {});
    setCopied(i); setTimeout(() => setCopied(null), 1500);
  };
  const toggleEn=(i) => setShowEn(s => ({...s, [i]: !s[i]}));

  const catIcons={'أدعية قرآنية': '📖', 'أدعية الأنبياء': '🕌', 'أدعية الصباح والمساء': '🌅', 'أدعية الحاجة': '🤲'};

  return (
    <div className="duas-wrap">
      <div className="duas-title-row">
        <span className="duas-icon">🤲</span>
        <h2 className="duas-title">الأدعية والأذكار</h2>
      </div>
      <div className="duas-cats">
        {cats.map(c => (
          <button key={c} className={`duas-cat${cat===c? ' active':''}`} onClick={() => setCat(c)}>
            <span>{catIcons[c]||'🤲'}</span> {c}
          </button>
        ))}
      </div>
      <div className="duas-list">
        {duas.map((d, i) => {
          const key=`${cat}_${i}`;
          return (
            <div key={i} className={`dua-card${fav.includes(key)? ' dua-fav-card':''}`}>
              <div className="dua-ar">{d.ar}</div>
              <div className="dua-ref">📍 {d.ref}</div>
              {showEn[i]&&<div className="dua-en">{d.en}</div>}
              <div className="dua-actions">
                <button className="dua-act-btn" onClick={() => toggleEn(i)} title="الترجمة">🌐</button>
                <button className={`dua-act-btn${copied===i? ' copied':''}`} onClick={() => copyDua(d.ar, i)} title="نسخ">
                  {copied===i? '✅':'📋'}
                </button>
                <button className={`dua-act-btn${fav.includes(key)? ' fav-on':''}`} onClick={() => toggleFav(key)} title="حفظ">
                  {fav.includes(key)? '❤️':'🤍'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   READING GOALS  – أهداف القراءة
   ═══════════════════════════════════════════════════════════ */
function ReadingGoals () {
  const [goals, setGoals]=useState(() => LS.get('reading_goals', {daily_ayahs: 10, daily_pages: 1, weekly_juz: 1}));
  const [progress, setProgress]=useState(() => LS.get('goals_progress', {}));
  const [editing, setEditing]=useState(false);
  const [draft, setDraft]=useState(goals);
  const today=new Date().toISOString().slice(0, 10);
  const week=`W${Math.ceil(new Date().getDate()/7)}-${new Date().getMonth()+1}`;

  const todayP=progress[today]||{ayahs: 0, pages: 0};
  const weekP=progress[week]||{juz: 0};

  const log=(type, amt=1) => {
    const np={...progress};
    if(type==='ayah') {np[today]={...todayP, ayahs: (todayP.ayahs||0)+amt};}
    else if(type==='page') {np[today]={...todayP, pages: (todayP.pages||0)+amt};}
    else if(type==='juz') {np[week]={...weekP, juz: (weekP.juz||0)+amt};}
    setProgress(np); LS.set('goals_progress', np);
  };
  const reset=(type) => {
    const np={...progress};
    if(type==='ayah'||type==='page') np[today]={...todayP, [type==='ayah'? 'ayahs':'pages']: 0};
    else np[week]={juz: 0};
    setProgress(np); LS.set('goals_progress', np);
  };
  const saveGoals=() => {setGoals(draft); LS.set('reading_goals', draft); setEditing(false);};

  const GoalCard=({icon, label, current, target, unit, onPlus, onReset, color}) => {
    const pct=Math.min(100, Math.round((current/Math.max(target, 1))*100));
    const done=pct>=100;
    return (
      <div className={`goal-card${done? ' goal-done':''}`}>
        <div className="goal-card-top">
          <span className="goal-icon">{icon}</span>
          <div className="goal-info">
            <div className="goal-label">{label}</div>
            <div className="goal-nums"><span className="goal-cur" style={{color}}>{current}</span>/{target} {unit}</div>
          </div>
          {done&&<span className="goal-check">✅</span>}
        </div>
        <div className="goal-bar-bg"><div className="goal-bar-fill" style={{width: `${pct}%`, background: color}}></div></div>
        <div className="goal-pct-row">
          <span className="goal-pct">{pct}%</span>
          <div className="goal-btns">
            <button className="goal-btn" onClick={onPlus}>+1 {unit}</button>
            <button className="goal-btn goal-btn-sm" onClick={onReset} title="إعادة">↺</button>
          </div>
        </div>
      </div>
    );
  };

  // Streaks
  const rd=LS.get('read_days', {});
  const sortedDays=Object.keys(rd).sort().reverse();
  let streak=0;
  for(let i=0; i<sortedDays.length; i++) {
    const d=new Date(sortedDays[i]);
    const diff=Math.round((new Date()-d)/(1000*3600*24));
    if(diff===i) streak++; else break;
  }

  return (
    <div className="goals-wrap">
      <div className="goals-hdr">
        <span className="goals-icon">🎯</span>
        <h2 className="goals-title">أهداف القراءة</h2>
        <button className="goals-edit-btn" onClick={() => setEditing(e => !e)}>✏️ تعديل</button>
      </div>
      {streak>0&&<div className="goals-streak-banner">🔥 سلسلة {streak} يوم متواصل!</div>}

      {editing&&(
        <div className="goals-editor">
          <div className="goals-editor-title">تخصيص الأهداف</div>
          {[
            {key: 'daily_ayahs', label: 'آيات يومياً', min: 1, max: 100},
            {key: 'daily_pages', label: 'صفحات يومياً', min: 1, max: 20},
            {key: 'weekly_juz', label: 'أجزاء أسبوعياً', min: 1, max: 10},
          ].map(g => (
            <div key={g.key} className="goals-ed-row">
              <label className="goals-ed-label">{g.label}</label>
              <input type="number" className="goals-ed-input" min={g.min} max={g.max}
                value={draft[g.key]} onChange={e => setDraft(d => ({...d, [g.key]: Math.max(g.min, Math.min(g.max, +e.target.value))}))} />
            </div>
          ))}
          <button className="goals-save-btn" onClick={saveGoals}>حفظ الأهداف</button>
        </div>
      )}

      <div className="goals-cards">
        <GoalCard icon="📖" label="الآيات اليومية" current={todayP.ayahs||0} target={goals.daily_ayahs}
          unit="آية" onPlus={() => log('ayah')} onReset={() => reset('ayah')} color="var(--ac)" />
        <GoalCard icon="📄" label="الصفحات اليومية" current={todayP.pages||0} target={goals.daily_pages}
          unit="صفحة" onPlus={() => log('page')} onReset={() => reset('page')} color="#10b981" />
        <GoalCard icon="📚" label="الأجزاء الأسبوعية" current={weekP.juz||0} target={goals.weekly_juz}
          unit="جزء" onPlus={() => log('juz')} onReset={() => reset('juz')} color="#8b5cf6" />
      </div>

      <div className="goals-tip">💡 تتبع تقدمك يومياً لتحافظ على سلسلة القراءة!</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   TAJWEED GUIDE  – أحكام التجويد
   ═══════════════════════════════════════════════════════════ */
const TAJWEED_RULES=[
  {
    cat: "النون الساكنة والتنوين",
    color: "#22c55e",
    icon: "🟢",
    rules: [
      {name: "الإظهار", desc: "إظهار النون الساكنة أو التنوين عند حروف الحلق (أ هـ ع ح غ خ) بدون غنة.", example: "مَنْ آمَنَ / عَلِيمٌ خَبِيرٌ", tip: "تُلفظ النون واضحة تماماً"},
      {name: "الإدغام", desc: "إدخال النون الساكنة أو التنوين في الحرف التالي إذا كان من (يرملون).", example: "مَن يَقُولُ / خَيْرٌ لَّكُمْ", tip: "بغنة مع: ي ن م و | بدون غنة مع: ل ر"},
      {name: "الإقلاب", desc: "قلب النون الساكنة أو التنوين ميماً مخفاة عند حرف الباء.", example: "أَنبِئُونِي / سَمِيعٌ بَصِيرٌ", tip: "النون تصبح ميماً مخفاة مع غنة"},
      {name: "الإخفاء", desc: "إخفاء النون الساكنة أو التنوين عند 15 حرفاً مع الغنة.", example: "مَن كَانَ / رِيحٌ صَرْصَرٌ", tip: "حالة بين الإظهار والإدغام"},
    ]
  },
  {
    cat: "الميم الساكنة",
    color: "#3b82f6",
    icon: "🔵",
    rules: [
      {name: "إخفاء شفوي", desc: "إخفاء الميم الساكنة عند الباء مع إبقاء الغنة.", example: "تَرْمِيهِم بِحِجَارَةٍ", tip: "الشفتان لا تنطبقان تماماً"},
      {name: "إدغام مثلين صغير", desc: "إدغام الميم الساكنة في الميم المتحركة.", example: "لَهُم مَّا يَشَاؤُونَ", tip: "ميم واحدة مشددة مع غنة"},
      {name: "إظهار شفوي", desc: "إظهار الميم الساكنة عند جميع الحروف ماعدا الباء والميم.", example: "أَنتُم فِيهَا", tip: "إظهار تام بدون غنة"},
    ]
  },
  {
    cat: "المدود",
    color: "#f59e0b",
    icon: "🟡",
    rules: [
      {name: "المد الطبيعي", desc: "مد يتوقف عليه الإتيان بالحرف وهو حركتان.", example: "قَالَ / يَقُولُ / قِيلَ", tip: "الأساس في المدود = حركتان"},
      {name: "مد المتصل", desc: "اجتماع حرف المد وهمزة في كلمة واحدة، يُمد 4-5 حركات.", example: "جَاءَ / السَّمَاءِ / سُوءٍ", tip: "واجب المد 4-5 حركات"},
      {name: "مد المنفصل", desc: "حرف المد في آخر كلمة وهمزة في أول الكلمة التالية، 2-5 حركات.", example: "إِنَّا أَعْطَيْنَاكَ / بِمَا أُنزِلَ", tip: "جائز المد، يُقرأ بالقصر والمد"},
      {name: "مد اللازم", desc: "يقع بعد حرف المد سكون أصلي، يُمد 6 حركات.", example: "الضَّالِّينَ / دَابَّةٍ", tip: "أطول مد في القرآن = 6 حركات"},
      {name: "مد العارض للسكون", desc: "حرف المد يأتي قبل آخر الكلمة عند الوقف، 2-4-6 حركات.", example: "نَسْتَعِينُ (عند الوقف)", tip: "جائز بالتثليث: 2 أو 4 أو 6"},
    ]
  },
  {
    cat: "أحكام الراء واللام",
    color: "#ef4444",
    icon: "🔴",
    rules: [
      {name: "الراء المفخمة", desc: "تُفخَّم الراء إذا كانت مضمومة أو مفتوحة أو ساكنة بعد فتح أو ضم.", example: "رَبِّ / رُسُل / مَرْيَم", tip: "الراء الغليظة – صوت ضخم"},
      {name: "الراء المرققة", desc: "تُرقَّق الراء إذا كانت مكسورة أو ساكنة بعد كسر.", example: "رِجَال / بِسْمِ اللَّهِ", tip: "الراء النحيفة – صوت رفيع"},
      {name: "لام التفخيم", desc: "تُفخَّم لام لفظ الجلالة (الله) إذا جاءت بعد فتح أو ضم.", example: "قَالَ اللَّهُ / رَسُولُ اللَّهِ", tip: "لام الجلالة المفخمة"},
    ]
  },
  {
    cat: "الغنة والصفات",
    color: "#8b5cf6",
    icon: "🟣",
    rules: [
      {name: "الغنة", desc: "صوت رنّان يخرج من الخيشوم في حرفَي النون والميم المشددتين.", example: "إِنَّا / أُمَّة", tip: "مقدار الغنة = حركتان"},
      {name: "القلقلة", desc: "اضطراب المخرج عند النطق بأحد حروف (قطب جد) ساكنة.", example: "يَجْعَلُونَ / وَقْتًا", tip: "5 حروف: ق ط ب ج د"},
      {name: "التفخيم", desc: "تعلية الصوت وتغليظه عند النطق بحروف الاستعلاء السبعة.", example: "الطُّورَ / خَلَقَ / الصَّلَاة", tip: "خص ضغط قظ = 7 حروف مفخمة"},
    ]
  },
];

function TajweedGuide () {
  const [selCat, setSelCat]=useState(0);
  const [expanded, setExpanded]=useState({});
  const cat=TAJWEED_RULES[selCat];

  const toggle=(i) => setExpanded(e => ({...e, [i]: !e[i]}));

  return (
    <div className="tajweed-wrap">
      <div className="tajweed-hdr-row">
        <span style={{fontSize: 28}}>📜</span>
        <h2 className="tajweed-title">أحكام التجويد</h2>
      </div>
      <p className="tajweed-intro">تعلّم أحكام تلاوة القرآن الكريم بالتجويد خطوة بخطوة</p>

      <div className="tajweed-cats">
        {TAJWEED_RULES.map((c, i) => (
          <button key={i} className={`tj-cat${selCat===i? ' active':''}`}
            style={selCat===i? {borderColor: c.color, background: c.color+'22', color: c.color}:{}}
            onClick={() => {setSelCat(i); setExpanded({});}}>
            {c.icon} {c.cat}
          </button>
        ))}
      </div>

      <div className="tj-rules-list">
        {cat.rules.map((r, i) => (
          <div key={i} className={`tj-rule${expanded[i]? ' tj-expanded':''}`}
            style={{'--tc': cat.color}}>
            <div className="tj-rule-hdr" onClick={() => toggle(i)}>
              <div className="tj-rule-left">
                <span className="tj-rule-dot" style={{background: cat.color}}></span>
                <span className="tj-rule-name">{r.name}</span>
              </div>
              <span className="tj-arrow">{expanded[i]? '▲':'▼'}</span>
            </div>
            {expanded[i]&&(
              <div className="tj-rule-body">
                <p className="tj-desc">{r.desc}</p>
                <div className="tj-example-row">
                  <span className="tj-ex-label">مثال:</span>
                  <span className="tj-ex-text">{r.example}</span>
                </div>
                <div className="tj-tip-row">
                  <span className="tj-tip-icon">💡</span>
                  <span className="tj-tip">{r.tip}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SHARE AYAH AS IMAGE CARD  – مشاركة الآية كصورة
   ═══════════════════════════════════════════════════════════ */
// Global event: dispatch 'shareAyah' with {text, surah, ayah, surahName}
function AnalyticsDashboard () {
  const readDays=LS.get('read_days', {});
  const khatmHistory=LS.get('khatm_history', []);
  const searchHistory=LS.get('search_history', []);
  const today=new Date();
  const goal=LS.get('read_goal', 1);

  let streak=0;
  for(let i=0; ; i++) {
    const d=new Date(today); d.setDate(d.getDate()-i);
    const k=`${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
    if((readDays[k]||0)<goal) break; streak++;
  }
  const totalDays=Object.keys(readDays).filter(k => readDays[k]>0).length;
  const totalPages=Object.values(readDays).reduce((a, b) => a+(b||0), 0);
  const avgPages=totalDays? Math.round(totalPages/totalDays*10)/10:0;

  const dayNamesShort=['أح', 'إث', 'ثل', 'أر', 'خم', 'جم', 'سب'];
  const weekDays=Array.from({length: 7}, (_, i) => {
    const d=new Date(today); d.setDate(d.getDate()-(6-i));
    const k=`${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
    return {label: dayNamesShort[d.getDay()], v: readDays[k]||0, isToday: i===6};
  });
  const maxV=Math.max(...weekDays.map(x => x.v), 1);

  const cells=[];
  for(let i=83; i>=0; i--) {
    const d=new Date(today); d.setDate(d.getDate()-i);
    const k=`${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
    cells.push({d, k, v: readDays[k]||0, isToday: i===0});
  }
  const padded=[...Array(cells[0].d.getDay()).fill(null), ...cells];

  const intensity=v => {
    if(!v) return 'var(--item)';
    if(v>=goal*2) return 'var(--ac)';
    if(v>=goal) return 'var(--ac)99';
    return 'var(--ac)44';
  };

  const KPIS=[
    {icon: '🔥', val: streak, label: 'سلسلة الأيام', color: '#f97316', bg: 'rgba(249,115,22,.1)'},
    {icon: '📖', val: totalPages, label: 'إجمالي الصفحات', color: 'var(--ac)', bg: 'var(--ac)0f'},
    {icon: '📅', val: totalDays, label: 'أيام القراءة', color: '#22c55e', bg: 'rgba(34,197,94,.1)'},
    {icon: '⭐', val: khatmHistory.length, label: 'مرات الختم', color: '#a78bfa', bg: 'rgba(167,139,250,.1)'},
    {icon: '📈', val: avgPages, label: 'صفحة/يوم', color: '#06b6d4', bg: 'rgba(6,182,212,.1)'},
    {icon: '🔍', val: searchHistory.length, label: 'بحث منفّذ', color: '#ec4899', bg: 'rgba(236,72,153,.1)'},
  ];

  return (
    <div className="an-wrap">
      <div className="an-hdr">
        <div className="an-hdr-left">
          <span className="an-hdr-icon">📊</span>
          <div>
            <h2 className="an-title">لوحة التحليلات</h2>
            <p className="an-sub">تتبّع رحلتك مع القرآن الكريم</p>
          </div>
        </div>
      </div>

      <div className="an-kpi-grid">
        {KPIS.map((k, i) => (
          <div key={i} className="an-kpi" style={{'--kbg': k.bg, '--kc': k.color}}>
            <div className="an-kpi-icon">{k.icon}</div>
            <div className="an-kpi-val">{k.val}</div>
            <div className="an-kpi-lbl">{k.label}</div>
          </div>
        ))}
      </div>

      <div className="an-card">
        <div className="an-card-hdr">📅 القراءة الأسبوعية</div>
        {totalPages===0
          ? <div className="an-empty">لا توجد بيانات قراءة بعد</div>
          :<div className="an-week-chart">
            {weekDays.map((d, i) => (
              <div key={i} className={`an-wc-col${d.isToday? ' an-wc-today':''}`}>
                <div className="an-wc-val">{d.v||''}</div>
                <div className="an-wc-bar-wrap">
                  <div className="an-wc-bar" style={{height: `${(d.v/maxV)*100}%`, background: d.isToday? 'var(--ac)':'var(--ac)55'}} />
                </div>
                <div className="an-wc-lbl">{d.label}</div>
              </div>
            ))}
          </div>
        }
      </div>

      <div className="an-card">
        <div className="an-card-hdr">🟩 خريطة القراءة — آخر 12 أسبوع</div>
        <div className="an-hm-dows">
          {['أح', 'إث', 'ثل', 'أر', 'خم', 'جم', 'سب'].map((d, i) => (
            <div key={i} className="an-hm-dow">{d}</div>
          ))}
        </div>
        <div className="an-hm-grid">
          {padded.map((c, i) => c
            ? <div key={i} className={`an-hm-cell${c.isToday? ' an-hm-today':''}`}
              style={{background: intensity(c.v)}}
              title={`${c.d.toLocaleDateString('ar-EG')}: ${c.v} صفحة`} />
            :<div key={i} className="an-hm-cell an-hm-empty" />
          )}
        </div>
        <div className="an-hm-legend">
          <span className="an-hm-leg-lbl">أقل</span>
          {['var(--item)', 'var(--ac)22', 'var(--ac)55', 'var(--ac)99', 'var(--ac)'].map((c, i) => (
            <div key={i} className="an-hm-leg-cell" style={{background: c}} />
          ))}
          <span className="an-hm-leg-lbl">أكثر</span>
        </div>
      </div>

      {khatmHistory.length>0&&(
        <div className="an-card">
          <div className="an-card-hdr">📚 آخر ختمات القرآن</div>
          <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
            {khatmHistory.slice(-3).reverse().map((k, i) => (
              <div key={i} style={{display: 'flex', alignItems: 'center', gap: 10, direction: 'rtl', padding: '8px', background: 'var(--item)', borderRadius: 'var(--r-lg)'}}>
                <span style={{fontSize: 20}}>{i===0? '🥇':i===1? '🥈':'🥉'}</span>
                <span style={{fontFamily: 'Tajawal', fontSize: 'var(--t-sm)', color: 'var(--tx)'}}>{new Date(k.date||k).toLocaleDateString('ar-EG')}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {totalPages===0&&(
        <div className="an-zero-state">
          <div style={{fontSize: 44, marginBottom: 10}}>📖</div>
          <div style={{fontFamily: 'Tajawal', fontSize: 'var(--t-md)', fontWeight: 700, color: 'var(--tx)', marginBottom: 6}}>ابدأ رحلتك اليوم</div>
          <div style={{fontFamily: 'Tajawal', fontSize: 'var(--t-xs)', color: 'var(--txm)'}}>ستظهر إحصائياتك هنا بعد قراءة أول صفحة</div>
        </div>
      )}
    </div>
  );
}

function CustomThemeCreator () {
  const [accent, setAccent]=useState(() => LS.get('custom_accent', '#4f8ef7'));
  const [accent2, setAccent2]=useState(() => LS.get('custom_accent2', '#6fa8dc'));
  const [saved, setSaved]=useState(false);
  const [preview, setPreview]=useState(false);

  const PRESETS=[
    {name: 'أزرق', a: '#4f8ef7', b: '#6fa8dc'},
    {name: 'أخضر', a: '#10b981', b: '#34d399'},
    {name: 'ذهبي', a: '#f59e0b', b: '#fbbf24'},
    {name: 'بنفسجي', a: '#8b5cf6', b: '#a78bfa'},
    {name: 'وردي', a: '#ec4899', b: '#f9a8d4'},
    {name: 'برتقالي', a: '#f97316', b: '#fb923c'},
    {name: 'فيروزي', a: '#06b6d4', b: '#22d3ee'},
    {name: 'أحمر', a: '#ef4444', b: '#f87171'},
  ];

  const applyTheme=() => {
    LS.set('custom_accent', accent);
    LS.set('custom_accent2', accent2);
    LS.set('themeId', 'custom');
    document.dispatchEvent(new CustomEvent('customThemeChange', {detail: {accent, accent2}}));
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="ctc-wrap">
      <div className="ctc-hdr">
        <span style={{fontSize: 26}}>🎨</span>
        <h2 className="ctc-title">منشئ الثيم المخصص</h2>
      </div>
      <p className="ctc-sub">اختر ألوانك المفضلة لتخصيص مظهر التطبيق بالكامل</p>

      {/* Presets */}
      <div className="ctc-section-label">ألوان جاهزة</div>
      <div className="ctc-presets">
        {PRESETS.map((p, i) => (
          <button key={i} className="ctc-preset" style={{'--pa': p.a, '--pb': p.b}}
            onClick={() => {setAccent(p.a); setAccent2(p.b);}}>
            <div className="ctc-preset-swatch" style={{background: `linear-gradient(135deg,${p.a},${p.b})`}}></div>
            <span className="ctc-preset-name">{p.name}</span>
          </button>
        ))}
      </div>

      {/* Custom pickers */}
      <div className="ctc-section-label">تخصيص يدوي</div>
      <div className="ctc-pickers">
        <div className="ctc-picker-row">
          <label className="ctc-picker-label">اللون الأساسي</label>
          <div className="ctc-picker-wrap">
            <input type="color" className="ctc-color-input" value={accent} onChange={e => setAccent(e.target.value)} />
            <span className="ctc-hex">{accent}</span>
          </div>
        </div>
        <div className="ctc-picker-row">
          <label className="ctc-picker-label">اللون الثانوي</label>
          <div className="ctc-picker-wrap">
            <input type="color" className="ctc-color-input" value={accent2} onChange={e => setAccent2(e.target.value)} />
            <span className="ctc-hex">{accent2}</span>
          </div>
        </div>
      </div>

      {/* Live preview */}
      <div className="ctc-section-label">معاينة</div>
      <div className="ctc-preview" style={{'--pa': accent, '--pb': accent2}}>
        <div className="ctc-prev-bar" style={{background: `linear-gradient(90deg,${accent},${accent2})`}}></div>
        <div className="ctc-prev-body">
          <div className="ctc-prev-btn" style={{background: accent, color: '#fff'}}>زر رئيسي</div>
          <div className="ctc-prev-text" style={{color: accent}}>نص ملون</div>
          <div className="ctc-prev-badge" style={{background: accent+'22', color: accent, border: `1px solid ${accent}55`}}>وسم</div>
        </div>
      </div>

      <button className={`ctc-apply-btn${saved? ' ctc-saved':''}`} onClick={applyTheme}
        style={{background: saved? '#22c55e':`linear-gradient(135deg,${accent},${accent2})`}}>
        {saved? '✅ تم التطبيق!':'✨ تطبيق الثيم'}
      </button>
      <p className="ctc-note">* سيُطبَّق الثيم على جميع أجزاء التطبيق فوراً</p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   IN-APP NOTIFICATION CENTER  – مركز الإشعارات
   ═══════════════════════════════════════════════════════════ */
// Push a notification: dispatch 'appNotification' with {title, body, type}
function scheduleRealPrayerNotifs (times) {
  if(!times||Notification.permission!=='granted') return;
  const now=new Date();
  const PRAYER_AR={Fajr: 'الفجر', Dhuhr: 'الظهر', Asr: 'العصر', Maghrib: 'المغرب', Isha: 'العشاء'};
  Object.entries(PRAYER_AR).forEach(([key, ar]) => {
    const t=times[key]; if(!t) return;
    const [h, m]=t.split(':').map(Number);
    const ptime=new Date(); ptime.setHours(h, m, 0, 0);
    const diff=ptime-now;
    const dispatch=(ms, title, body, type) => setTimeout(() => {
      try {new Notification(title, {body, icon: '/Images/faviconLogo.jpg', tag: title});} catch {}
      document.dispatchEvent(new CustomEvent('appNotification', {detail: {title, body, type: type||'prayer'}}));
    }, ms);
    if(diff>15*60*1000) dispatch(diff-15*60*1000, `⏰ ${ar} بعد 15 دقيقة`, `استعد لصلاة ${ar} الساعة ${t}`, 'reminder');
    if(diff>0) dispatch(diff, `🕌 حان وقت ${ar}`, `أقم الصلاة — ${ar} الساعة ${t}`, 'prayer');
  });
}

function NotificationCenter () {
  const [notifs, setNotifs]=useState(() => LS.get('app_notifs', []));
  const [filter, setFilter]=useState('all');
  const [perm, setPerm]=useState(() => typeof Notification!=='undefined'? Notification.permission:'default');

  useEffect(() => {
    const h=e => {
      const n={id: Date.now(), ...e.detail, time: new Date().toISOString(), read: false};
      setNotifs(prev => {const u=[n, ...prev].slice(0, 60); LS.set('app_notifs', u); return u;});
    };
    document.addEventListener('appNotification', h);
    return () => document.removeEventListener('appNotification', h);
  }, []);

  const requestPerm=async () => {
    if(!('Notification' in window)) {alert('متصفحك لا يدعم الإشعارات'); return;}
    const p=await Notification.requestPermission();
    setPerm(p);
    if(p==='granted') {
      LS.set('notif_enabled', true);
      try {new Notification('القرآن الكريم', {body: '✅ تم تفعيل إشعارات الصلاة', icon: '/Images/faviconLogo.jpg'});} catch {}
      document.dispatchEvent(new CustomEvent('appNotification', {detail: {title: '✅ تم تفعيل الإشعارات', body: 'ستصلك تنبيهات قبل كل صلاة بـ 15 دقيقة', type: 'info'}}));
    }
  };

  const markAllRead=() => {const u=notifs.map(n => ({...n, read: true})); setNotifs(u); LS.set('app_notifs', u);};
  const deleteNotif=id => {const u=notifs.filter(n => n.id!==id); setNotifs(u); LS.set('app_notifs', u);};
  const clearAll=() => {setNotifs([]); LS.set('app_notifs', []);};
  const markRead=id => {const u=notifs.map(n => n.id===id? {...n, read: true}:n); setNotifs(u); LS.set('app_notifs', u);};

  const TYPES={
    prayer: {icon: '🕌', color: '#f59e0b', label: 'صلاة'},
    reminder: {icon: '⏰', color: '#06b6d4', label: 'تذكير'},
    achievement: {icon: '🏆', color: '#22c55e', label: 'إنجاز'},
    info: {icon: 'ℹ️', color: 'var(--ac)', label: 'معلومة'},
    quran: {icon: '📖', color: '#8b5cf6', label: 'قرآن'},
  };
  const FILTERS=[{k: 'all', l: 'الكل'}, {k: 'prayer', l: 'صلاة'}, {k: 'reminder', l: 'تذكير'}, {k: 'achievement', l: 'إنجاز'}, {k: 'quran', l: 'قرآن'}];
  const shown=filter==='all'? notifs:notifs.filter(n => n.type===filter);
  const unread=notifs.filter(n => !n.read).length;
  const relTime=iso => {
    const d=Math.floor((Date.now()-new Date(iso))/1000);
    if(d<60) return 'الآن'; if(d<3600) return `منذ ${Math.floor(d/60)} د`;
    if(d<86400) return `منذ ${Math.floor(d/3600)} س`; return `منذ ${Math.floor(d/86400)} يوم`;
  };

  return (
    <div className="nc-wrap">
      <div className="nc-hdr">
        <div className="nc-hdr-title-row">
          <span style={{fontSize: 26}}>🔔</span>
          <h2 className="nc-title">مركز الإشعارات</h2>
          {unread>0&&<span className="nc-badge">{unread}</span>}
        </div>
        <div className="nc-hdr-actions">
          {unread>0&&<button className="nc-act-btn" onClick={markAllRead}>قراءة الكل</button>}
          {notifs.length>0&&<button className="nc-act-btn nc-act-danger" onClick={clearAll}>مسح</button>}
        </div>
      </div>

      {perm!=='granted'&&(
        <div className="nc-perm-banner">
          <div className="nc-perm-icon">🔕</div>
          <div className="nc-perm-body">
            <div className="nc-perm-title">فعّل إشعارات الصلاة</div>
            <div className="nc-perm-sub">تنبيهات قبل كل صلاة بـ 15 دقيقة + تذكيرات القراءة</div>
          </div>
          <button className="nc-perm-btn" onClick={requestPerm}>تفعيل</button>
        </div>
      )}
      {perm==='granted'&&(
        <div className="nc-status-bar">
          <span className="nc-status-dot" />
          <span>الإشعارات مفعّلة — ستصلك تنبيهات الصلاة تلقائياً</span>
        </div>
      )}

      <div className="nc-filters">
        {FILTERS.map(f => (
          <button key={f.k} className={`nc-filter${filter===f.k? ' active':''}`} onClick={() => setFilter(f.k)}>{f.l}</button>
        ))}
      </div>

      {shown.length===0&&(
        <div className="nc-empty">
          <div className="nc-empty-icon">🔕</div>
          <p className="nc-empty-txt">لا توجد إشعارات</p>
          <p className="nc-empty-sub">ستظهر هنا إشعارات الصلاة والإنجازات تلقائياً</p>
        </div>
      )}

      <div className="nc-list">
        {shown.map(n => {
          const t=TYPES[n.type]||TYPES.info;
          return (
            <div key={n.id} className={`nc-item${n.read? '':' nc-unread'}`}
              onClick={() => markRead(n.id)} style={{'--nc': t.color}}>
              <div className="nc-item-icon" style={{background: t.color+'1a', color: t.color}}>{t.icon}</div>
              <div className="nc-item-body">
                <div className="nc-item-title">{n.title}</div>
                <div className="nc-item-desc">{n.body}</div>
                <div className="nc-item-meta">
                  <span style={{fontFamily: 'Tajawal', fontSize: 10, fontWeight: 700, color: t.color}}>{t.label}</span>
                  <span style={{fontFamily: 'Tajawal', fontSize: 10, color: 'var(--txm)'}}>{relTime(n.time)}</span>
                </div>
              </div>
              {!n.read&&<div className="nc-unread-dot" style={{background: t.color}} />}
              <button className="nc-del" onClick={e => {e.stopPropagation(); deleteNotif(n.id);}}>✕</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   TAFSIR COMPARISON  – مقارنة التفاسير
   ═══════════════════════════════════════════════════════════ */
const TAFSIR_EDITIONS=[
  {id: 'ar.muyassar', name: 'الميسر', flag: '🟢', desc: 'التفسير الميسر'},
  {id: 'ar.jalalayn', name: 'الجلالين', flag: '🔵', desc: 'تفسير الجلالين'},
  {id: 'en.sahih', name: 'Sahih Intl', flag: '🇬🇧', desc: 'الترجمة الإنجليزية'},
];

// ═══════════════════════════════════════════════════════════
//  RECITERS PAGE  — صفحة القراء
// ═══════════════════════════════════════════════════════════


// ══════════════════════════════════════════════════════════
//  RECITERS PAGE v3 — mp3quran.net with direct audio src
// ══════════════════════════════════════════════════════════
const POPULAR_IDS=[123, 118, 112, 102, 109, 108, 107, 1, 125, 127, 10, 111, 106, 121, 126, 115, 116, 128];

// Fallback reciters if API is unreachable
const FALLBACK_RECITERS=[
  {id: 1, name: 'عبد الباسط عبد الصمد', moshaf: [{id: 1, moshaf_type: 11, surah_total: 114, server: 'https://server7.mp3quran.net/basit/', surah_list: Array.from({length: 114}, (_, i) => i+1).join(',')}]},
  {id: 10, name: 'محمود خليل الحصري', moshaf: [{id: 10, moshaf_type: 11, surah_total: 114, server: 'https://server8.mp3quran.net/husary/', surah_list: Array.from({length: 114}, (_, i) => i+1).join(',')}]},
  {id: 102, name: 'مشاري راشد العفاسي', moshaf: [{id: 102, moshaf_type: 11, surah_total: 114, server: 'https://server8.mp3quran.net/afs/', surah_list: Array.from({length: 114}, (_, i) => i+1).join(',')}]},
  {id: 107, name: 'سعد الغامدي', moshaf: [{id: 107, moshaf_type: 11, surah_total: 114, server: 'https://server7.mp3quran.net/s_gmd/', surah_list: Array.from({length: 114}, (_, i) => i+1).join(',')}]},
  {id: 108, name: 'ماهر المعيقلي', moshaf: [{id: 108, moshaf_type: 11, surah_total: 114, server: 'https://server8.mp3quran.net/maher/', surah_list: Array.from({length: 114}, (_, i) => i+1).join(',')}]},
  {id: 109, name: 'إدريس أبكر', moshaf: [{id: 109, moshaf_type: 11, surah_total: 114, server: 'https://server7.mp3quran.net/idris/', surah_list: Array.from({length: 114}, (_, i) => i+1).join(',')}]},
  {id: 112, name: 'أحمد العجمي', moshaf: [{id: 112, moshaf_type: 11, surah_total: 114, server: 'https://server8.mp3quran.net/a_jmy/', surah_list: Array.from({length: 114}, (_, i) => i+1).join(',')}]},
  {id: 118, name: 'ناصر القطامي', moshaf: [{id: 118, moshaf_type: 11, surah_total: 114, server: 'https://server8.mp3quran.net/qtm/', surah_list: Array.from({length: 114}, (_, i) => i+1).join(',')}]},
  {id: 123, name: 'عبد الرحمن السديس', moshaf: [{id: 123, moshaf_type: 11, surah_total: 114, server: 'https://server11.mp3quran.net/sds/', surah_list: Array.from({length: 114}, (_, i) => i+1).join(',')}]},
  {id: 125, name: 'سعود الشريم', moshaf: [{id: 125, moshaf_type: 11, surah_total: 114, server: 'https://server8.mp3quran.net/soud/', surah_list: Array.from({length: 114}, (_, i) => i+1).join(',')}]},
];
const SURAH_AR=['الفاتحة', 'البقرة', 'آل عمران', 'النساء', 'المائدة', 'الأنعام', 'الأعراف', 'الأنفال', 'التوبة', 'يونس', 'هود', 'يوسف', 'الرعد', 'إبراهيم', 'الحجر', 'النحل', 'الإسراء', 'الكهف', 'مريم', 'طه', 'الأنبياء', 'الحج', 'المؤمنون', 'النور', 'الفرقان', 'الشعراء', 'النمل', 'القصص', 'العنكبوت', 'الروم', 'لقمان', 'السجدة', 'الأحزاب', 'سبأ', 'فاطر', 'يس', 'الصافات', 'ص', 'الزمر', 'غافر', 'فصلت', 'الشورى', 'الزخرف', 'الدخان', 'الجاثية', 'الأحقاف', 'محمد', 'الفتح', 'الحجرات', 'ق', 'الذاريات', 'الطور', 'النجم', 'القمر', 'الرحمن', 'الواقعة', 'الحديد', 'المجادلة', 'الحشر', 'الممتحنة', 'الصف', 'الجمعة', 'المنافقون', 'التغابن', 'الطلاق', 'التحريم', 'الملك', 'القلم', 'الحاقة', 'المعارج', 'نوح', 'الجن', 'المزمل', 'المدثر', 'القيامة', 'الإنسان', 'المرسلات', 'النبأ', 'النازعات', 'عبس', 'التكوير', 'الانفطار', 'المطففين', 'الانشقاق', 'البروج', 'الطارق', 'الأعلى', 'الغاشية', 'الفجر', 'البلد', 'الشمس', 'الليل', 'الضحى', 'الشرح', 'التين', 'العلق', 'القدر', 'البينة', 'الزلزلة', 'العاديات', 'القارعة', 'التكاثر', 'العصر', 'الهمزة', 'الفيل', 'قريش', 'الماعون', 'الكوثر', 'الكافرون', 'النصر', 'المسد', 'الإخلاص', 'الفلق', 'الناس'];

function getMoshafLabel (t) {
  if(!t) return 'حفص';
  if(t===11||t===14) return 'حفص';
  if(t===21||t===101||t===181) return 'ورش';
  if(t===51) return 'قالون';
  if(t===111) return 'ابن كثير';
  if(t===121) return 'الكسائي';
  if(t===131) return 'الدوري';
  if(t===222) return 'مجوّد';
  if(t===213) return 'معلّم';
  return 'رواية';
}

function buildAudioUrl (server, surahNum) {
  // server always ends with /  e.g. https://server6.mp3quran.net/akdr/
  return `${server}${String(surahNum).padStart(3, '0')}.mp3`;
}

function RecitersPage () {
  const [reciters, setReciters]=useState([]);
  const [loading, setLoading]=useState(true);
  const [error, setError]=useState(null);
  const [selRec, setSelRec]=useState(null);
  const [selMoshaf, setSelMoshaf]=useState(null);
  const [selSurah, setSelSurah]=useState(1);
  const [audioUrl, setAudioUrl]=useState('');
  const [search, setSearch]=useState('');
  const [filter, setFilter]=useState('popular');
  const [favs, setFavs]=useState(() => LS.get('rec_favs', []));

  useEffect(() => {
    // Try both https and http versions of the API
    const tryFetch=async () => {
      const urls=[
        'https://mp3quran.net/api/v3/reciters?language=ar',
        'https://www.mp3quran.net/api/v3/reciters?language=ar',
        'https://mp3quran.net/api/v3/reciters',
      ];
      let data=null;
      for(const url of urls) {
        try {
          const r=await fetch(url, {headers: {'Accept': 'application/json'}});
          if(r.ok) {data=await r.json(); break;}
        } catch(e) {console.warn('reciters fetch failed:', url, e);}
      }
      if(!data||!data.reciters) {
        // Use fallback reciters
        const enriched=FALLBACK_RECITERS.map(r => ({...r, bestMoshaf: r.moshaf[0], isPopular: POPULAR_IDS.includes(r.id)}));
        setReciters(enriched); setLoading(false);
        return;
      }
      const enriched=(data.reciters||[]).map(r => {
        const mList=r.moshaf||[];
        const best=mList.find(m => m.moshaf_type===11&&m.surah_total===114)
          ||mList.find(m => m.surah_total===114)
          ||mList[0];
        return {...r, bestMoshaf: best, isPopular: POPULAR_IDS.includes(r.id)};
      }).filter(r => r.bestMoshaf);
      setReciters(enriched);
      setLoading(false);
    };
    tryFetch();
  }, []);

  const playNow=(rec, moshaf, surahNum) => {
    const url=buildAudioUrl(moshaf.server, surahNum);
    setSelRec(rec); setSelMoshaf(moshaf); setSelSurah(surahNum); setAudioUrl(url);
  };

  const pickReciter=(rec) => {
    const validSurahs=(rec.bestMoshaf?.surah_list||'1').split(',').map(Number);
    const surah=validSurahs.includes(selSurah)? selSurah:validSurahs[0];
    playNow(rec, rec.bestMoshaf, surah);
  };

  const toggleFav=(id, e) => {
    e.stopPropagation();
    setFavs(prev => {
      const next=prev.includes(id)? prev.filter(x => x!==id):[...prev, id];
      LS.set('rec_favs', next); return next;
    });
  };

  const shown=(() => {
    let list=reciters;
    if(filter==='popular') list=list.filter(r => r.isPopular);
    else if(filter==='favs') list=list.filter(r => favs.includes(r.id));
    if(search.trim()) list=list.filter(r => r.name.includes(search.trim()));
    return list;
  })();

  const availSurahs=selMoshaf? (selMoshaf.surah_list||'').split(',').map(Number).filter(Boolean):[];

  return (
    <div className="rec3-page">
      {/* ── Player bar (sticky) ── */}
      {selRec&&audioUrl&&(
        <div className="rec3-player-bar">
          <div className="rec3-pb-info">
            <div className="rec3-pb-avatar">{selRec.name.charAt(0)}</div>
            <div className="rec3-pb-text">
              <div className="rec3-pb-name">{selRec.name}</div>
              <div className="rec3-pb-meta">{SURAH_AR[selSurah-1]} · {getMoshafLabel(selMoshaf?.moshaf_type)}</div>
            </div>
          </div>
          <div className="rec3-pb-center">
            <audio key={audioUrl} src={audioUrl} controls autoPlay
              className="rec3-audio"
              onError={() => setAudioUrl('')}
            />
          </div>
          <div className="rec3-pb-right">
            {selRec.moshaf?.length>1&&(
              <select className="rec3-sel" value={selMoshaf?.id}
                onChange={e => {const m=selRec.moshaf.find(x => x.id===+e.target.value); if(m) playNow(selRec, m, selSurah);}}>
                {selRec.moshaf.map(m => <option key={m.id} value={m.id}>{getMoshafLabel(m.moshaf_type)}</option>)}
              </select>
            )}
            {availSurahs.length>0&&(
              <select className="rec3-sel" value={selSurah}
                onChange={e => playNow(selRec, selMoshaf, +e.target.value)}>
                {availSurahs.map(n => <option key={n} value={n}>{SURAH_AR[n-1]||`سورة ${n}`}</option>)}
              </select>
            )}
          </div>
        </div>
      )}

      {/* ── Header ── */}
      <div className="rec3-hdr">
        <div className="rec3-hdr-left">
          <span className="rec3-hdr-icon">🎙️</span>
          <div>
            <h2 className="rec3-title">القـراء</h2>
            <p className="rec3-sub">{loading? 'جارٍ التحميل…':`${reciters.length} قارئ`}</p>
          </div>
        </div>
      </div>

      {/* ── Search ── */}
      <div className="rec3-search-wrap">
        <input className="rec3-search" placeholder="ابحث باسم القارئ…"
          value={search} onChange={e => setSearch(e.target.value)} />
        <span className="rec3-search-icon">🔍</span>
      </div>

      {/* ── Filters ── */}
      <div className="rec3-filters">
        {[
          {k: 'popular', l: '⭐ مشهورون'},
          {k: 'all', l: `الكل (${reciters.length})`},
          {k: 'favs', l: `❤️ مفضلة (${favs.length})`},
        ].map(f => (
          <button key={f.k} className={`rec3-filt${filter===f.k? ' on':''}`}
            onClick={() => setFilter(f.k)}>{f.l}</button>
        ))}
      </div>

      {/* ── States ── */}
      {loading&&(
        <div className="rec3-loading">
          <div className="rec3-loading-dots"><span /><span /><span /></div>
          <p>جارٍ تحميل القراء من mp3quran.net…</p>
        </div>
      )}
      {error&&<div className="rec3-error">⚠️ {error}</div>}
      {!loading&&shown.length===0&&(
        <div className="rec3-empty">
          {filter==='favs'? '❤️ لم تضف أي قارئ للمفضلة بعد':'لا توجد نتائج'}
        </div>
      )}

      {/* ── Grid ── */}
      {!loading&&!error&&shown.length>0&&(
        <div className="rec3-grid">
          {shown.map(rec => {
            const active=selRec?.id===rec.id;
            const isFav=favs.includes(rec.id);
            const mCount=rec.moshaf?.length||0;
            const label=getMoshafLabel(rec.bestMoshaf?.moshaf_type);
            return (
              <div key={rec.id}
                className={`rec3-card${active? ' rec3-card-active':''}`}
                onClick={() => pickReciter(rec)}>
                <button className={`rec3-fav-btn${isFav? ' on':''}`}
                  onClick={e => toggleFav(rec.id, e)}>{isFav? '❤️':'🤍'}</button>
                {rec.isPopular&&<div className="rec3-pop-badge">⭐</div>}
                <div className={`rec3-avatar${active? ' pulse':''}`}>
                  {rec.name.charAt(0)}
                  {active&&(
                    <div className="rec3-eq"><span /><span /><span /><span /></div>
                  )}
                </div>
                <div className="rec3-card-name">{rec.name}</div>
                <div className="rec3-card-tags">
                  <span className="rec3-tag">{label}</span>
                  {mCount>1&&<span className="rec3-tag rec3-tag-b">{mCount} روايات</span>}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function TafsirComparison () {
  const [surahNum, setSurahNum]=useState(1);
  const [ayahNum, setAyahNum]=useState(1);
  const [maxAyah, setMaxAyah]=useState(7);
  const [results, setResults]=useState({});
  const [loading, setLoading]=useState(false);
  const [ayahText, setAyahText]=useState('');
  const [surahName, setSurahName]=useState('الفاتحة');
  const [selected, setSelected]=useState(['ar.muyassar', 'ar.jalalayn', 'en.sahih']);
  const {data: slData}=useFetch('https://api.alquran.cloud/v1/surah');
  const surahList=slData?.data||[];

  const compare=async () => {
    setLoading(true); setResults({});
    try {
      const r=await fetch(`https://api.alquran.cloud/v1/ayah/${surahNum}:${ayahNum}/ar`);
      const d=await r.json();
      setAyahText(d.data?.text||'');
      if(d.data?.surah?.name) setSurahName(d.data.surah.name);
    } catch {}
    // Fetch each tafsir
    const res={};
    await Promise.all(selected.map(async (ed) => {
      try {
        const r=await fetch(`https://api.alquran.cloud/v1/ayah/${surahNum}:${ayahNum}/${ed}`);
        const d=await r.json();
        res[ed]=d.data?.text||'غير متوفر';
      } catch {res[ed]='خطأ في التحميل';}
    }));
    setResults(res); setLoading(false);
  };

  const toggleEd=(id) => setSelected(s => s.includes(id)? s.filter(x => x!==id):[...s, id]);

  return (
    <div className="tcomp-wrap">
      <div className="tcomp-hdr-row">
        <span style={{fontSize: 26}}>📚</span>
        <h2 className="tcomp-title">مقارنة التفاسير</h2>
      </div>
      <p className="tcomp-sub">قارن تفسير نفس الآية من مصادر متعددة جنباً إلى جنب</p>

      <div className="tcomp-controls">
        <div className="tcomp-ctrl-row">
          <label className="tcomp-label">السورة:</label>
          <select className="tcomp-input tcomp-sel" value={surahNum} onChange={e => {
            const n=+e.target.value; const s=surahList[n-1];
            setSurahNum(n); setSurahName(s?.name||''); setMaxAyah(s?.numberOfAyahs||286); setAyahNum(1);
          }}>
            {surahList.length===0
              ? <option value={surahNum}>{surahNum}. {surahName}</option>
              :surahList.map(s => <option key={s.number} value={s.number}>{s.number}. {s.name} — {s.englishName}</option>)
            }
          </select>
        </div>
        <div className="tcomp-ctrl-row">
          <label className="tcomp-label">الآية:</label>
          <select className="tcomp-input tcomp-sel" value={ayahNum} onChange={e => setAyahNum(+e.target.value)}>
            {Array.from({length: maxAyah}, (_, i) => <option key={i+1} value={i+1}>الآية {i+1}</option>)}
          </select>
          {surahList[surahNum-1]&&<span style={{fontFamily: 'Tajawal', fontSize: 10, color: 'var(--txm)', whiteSpace: 'nowrap'}}>{surahList[surahNum-1]?.numberOfAyahs} آية</span>}
        </div>
        <div className="tcomp-eds">
          {TAFSIR_EDITIONS.map(e => (
            <button key={e.id} className={`tcomp-ed-btn${selected.includes(e.id)? ' active':''}`}
              onClick={() => toggleEd(e.id)}>
              {e.flag} {e.name}
            </button>
          ))}
        </div>
        <button className="tcomp-compare-btn" onClick={compare} disabled={loading||selected.length===0}>
          {loading? 'جارٍ التحميل...':'🔍 مقارنة'}
        </button>
      </div>

      {ayahText&&(
        <div className="tcomp-ayah-box">
          <div className="tcomp-ayah-label">الآية الكريمة</div>
          <div className="tcomp-ayah-text">{ayahText}</div>
          <div className="tcomp-ayah-ref">سورة {surahName} ({surahNum}) — الآية {ayahNum}</div>
        </div>
      )}

      {Object.keys(results).length>0&&(
        <div className="tcomp-results">
          {TAFSIR_EDITIONS.filter(e => selected.includes(e.id)).map(e => (
            <div key={e.id} className="tcomp-result-card">
              <div className="tcomp-result-hdr">
                <span>{e.flag}</span>
                <span className="tcomp-result-name">{e.name}</span>
                <span className="tcomp-result-desc">{e.desc}</span>
              </div>
              <div className={`tcomp-result-text${e.id==='en.sahih'? ' tcomp-ltr':''}`}>
                {results[e.id]||<span className="tcomp-loading">جارٍ التحميل...</span>}
              </div>
            </div>
          ))}
        </div>
      )}

      {Object.keys(results).length===0&&!loading&&(
        <div className="tcomp-hint">
          <div style={{fontSize: 36}}>📖</div>
          <p>اختر السورة والآية ثم اضغط «مقارنة» لعرض التفاسير جنباً إلى جنب</p>
        </div>
      )}
    </div>
  );
}

function QuranStats () {
  // Personal stats from localStorage
  const readDays=LS.get('read_days', {});
  const khatmHistory=LS.get('khatm_history', []);
  const searchHistory=LS.get('search_history', []);
  const bkJuz=LS.get('bk_juz', null);
  const bkSurah=LS.get('bk_surah', null);
  const bkPage=LS.get('bk_page', null);

  const calcStreak=() => {
    let s=0; const d=new Date();
    while(true) {const k=`${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`; if(!readDays[k]) break; s++; d.setDate(d.getDate()-1);}
    return s;
  };
  const totalReadDays=Object.keys(readDays).filter(k => readDays[k]>=1).length;
  const streak=calcStreak();
  const khatmCount=khatmHistory.length;

  const personalCards=[
    {icon: '🔥', label: 'التسلسل الحالي', value: streak>0? `${streak} يوم`:'—', sub: 'يوم متتالي', highlight: streak>0},
    {icon: '📅', label: 'أيام القراءة', value: totalReadDays, sub: 'يوم قرأت فيه'},
    {icon: '🏆', label: 'عدد الختمات', value: khatmCount||'—', sub: 'ختمة مكتملة'},
    {icon: '🔍', label: 'عمليات البحث', value: searchHistory.length, sub: 'بحث أجريته'},
  ];

  const quranCards=[
    {icon: "📖", label: "عدد السور", value: "114", sub: "سورة"},
    {icon: "📝", label: "عدد الآيات", value: "6,236", sub: "آية"},
    {icon: "🔤", label: "عدد الكلمات", value: "77,430", sub: "كلمة"},
    {icon: "✍️", label: "عدد الحروف", value: "323,671", sub: "حرف"},
    {icon: "🕌", label: "سور مكية", value: "86", sub: "سورة مكية"},
    {icon: "🏙️", label: "سور مدنية", value: "28", sub: "سورة مدنية"},
    {icon: "📚", label: "عدد الأجزاء", value: "30", sub: "جزءاً"},
    {icon: "🔁", label: "مواضع السجدة", value: "15", sub: "موضع سجدة"},
    {icon: "🌟", label: "أطول سورة", value: "البقرة", sub: "286 آية"},
    {icon: "✨", label: "أقصر سورة", value: "الكوثر", sub: "3 آيات"},
    {icon: "💫", label: "أكثر كلمة", value: "الله", sub: "ذُكرت 2,699 مرة"},
    {icon: "🔢", label: "الأحرف المقطعة", value: "29", sub: "سورة تبدأ بأحرف مقطعة"},
  ];

  return (
    <div className="qstats-page">
      <div className="qstats-hero">
        <div className="qstats-hero-title">📊 إحصائياتي</div>
        <div className="qstats-hero-sub">تقدمك الشخصي + أرقام القرآن الكريم</div>
      </div>

      {/* Personal stats */}
      <div style={{fontFamily: "'Tajawal',sans-serif", fontSize: 'var(--t-sm)', color: 'var(--ac)', fontWeight: 700, marginBottom: 8, marginTop: 4}}>
        📈 تقدمك الشخصي
      </div>
      <div className="qstats-grid" style={{gridTemplateColumns: 'repeat(2,1fr)', marginBottom: 16}}>
        {personalCards.map((c, i) => (
          <div key={i} className="qstats-card" style={c.highlight? {border: '2px solid var(--ac)', background: 'linear-gradient(135deg,var(--card),var(--ac)11)'}:{}}>
            <div className="qstats-icon">{c.icon}</div>
            <div className="qstats-label">{c.label}</div>
            <div className="qstats-value" style={c.highlight? {color: 'var(--ac)'}:{}}>{c.value}</div>
            <div className="qstats-sub">{c.sub}</div>
          </div>
        ))}
      </div>

      {/* Quran facts */}
      <div style={{fontFamily: "'Tajawal',sans-serif", fontSize: 'var(--t-sm)', color: 'var(--ac)', fontWeight: 700, marginBottom: 8}}>
        📖 حقائق القرآن الكريم
      </div>
      <div className="qstats-grid">
        {quranCards.map((c, i) => (
          <div key={i} className="qstats-card">
            <div className="qstats-icon">{c.icon}</div>
            <div className="qstats-label">{c.label}</div>
            <div className="qstats-value">{c.value}</div>
            <div className="qstats-sub">{c.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const ASMA_HUSNA=[
  {num: 1, ar: "اللَّهُ", en: "Allah", meaning: "الاسم الجامع لجميع صفات الكمال"},
  {num: 2, ar: "الرَّحْمَنُ", en: "Ar-Rahman", meaning: "ذو الرحمة الواسعة الشاملة لجميع الخلق"},
  {num: 3, ar: "الرَّحِيمُ", en: "Ar-Raheem", meaning: "ذو الرحمة الخاصة بالمؤمنين"},
  {num: 4, ar: "الْمَلِكُ", en: "Al-Malik", meaning: "المالك لجميع الأشياء والمتصرف فيها"},
  {num: 5, ar: "الْقُدُّوسُ", en: "Al-Quddus", meaning: "المنزّه عن كل نقص وعيب"},
  {num: 6, ar: "السَّلَامُ", en: "As-Salam", meaning: "السالم من كل نقص ومصدر السلامة لخلقه"},
  {num: 7, ar: "الْمُؤْمِنُ", en: "Al-Mu'min", meaning: "المصدّق لرسله وعباده المؤمنين"},
  {num: 8, ar: "الْمُهَيْمِنُ", en: "Al-Muhaymin", meaning: "الرقيب الحافظ على كل شيء"},
  {num: 9, ar: "الْعَزِيزُ", en: "Al-Aziz", meaning: "الغالب الذي لا يُقهر"},
  {num: 10, ar: "الْجَبَّارُ", en: "Al-Jabbar", meaning: "القاهر فوق عباده والمصلح لأمورهم"},
  {num: 11, ar: "الْمُتَكَبِّرُ", en: "Al-Mutakabbir", meaning: "المتعالي عن صفات الخلق"},
  {num: 12, ar: "الْخَالِقُ", en: "Al-Khaliq", meaning: "المبدع للأشياء على غير مثال سابق"},
  {num: 13, ar: "الْبَارِئُ", en: "Al-Bari'", meaning: "المميّز للأشياء بعضها عن بعض"},
  {num: 14, ar: "الْمُصَوِّرُ", en: "Al-Musawwir", meaning: "الذي يُصوّر الخلق كيف يشاء"},
  {num: 15, ar: "الْغَفَّارُ", en: "Al-Ghaffar", meaning: "كثير المغفرة لذنوب عباده"},
  {num: 16, ar: "الْقَهَّارُ", en: "Al-Qahhar", meaning: "الغالب لكل شيء"},
  {num: 17, ar: "الْوَهَّابُ", en: "Al-Wahhab", meaning: "كثير العطاء بلا حساب"},
  {num: 18, ar: "الرَّزَّاقُ", en: "Ar-Razzaq", meaning: "الذي يرزق جميع الخلق"},
  {num: 19, ar: "الْفَتَّاحُ", en: "Al-Fattah", meaning: "فاتح أبواب الرزق والرحمة"},
  {num: 20, ar: "الْعَلِيمُ", en: "Al-Alim", meaning: "المحيط علمه بكل شيء"},
  {num: 21, ar: "الْقَابِضُ", en: "Al-Qabid", meaning: "الذي يقبض الأرواح والأرزاق"},
  {num: 22, ar: "الْبَاسِطُ", en: "Al-Basit", meaning: "الذي يبسط الرزق لمن يشاء"},
  {num: 23, ar: "الْخَافِضُ", en: "Al-Khafid", meaning: "الذي يخفض الظالمين"},
  {num: 24, ar: "الرَّافِعُ", en: "Ar-Rafi'", meaning: "الذي يرفع المؤمنين بطاعته"},
  {num: 25, ar: "الْمُعِزُّ", en: "Al-Mu'izz", meaning: "الذي يُعزّ من يشاء"},
  {num: 26, ar: "الْمُذِلُّ", en: "Al-Mudhil", meaning: "الذي يُذلّ من يشاء"},
  {num: 27, ar: "السَّمِيعُ", en: "As-Sami'", meaning: "المحيط سمعه بكل الأصوات"},
  {num: 28, ar: "الْبَصِيرُ", en: "Al-Basir", meaning: "المحيط بصره بكل الأشياء"},
  {num: 29, ar: "الْحَكَمُ", en: "Al-Hakam", meaning: "الحاكم العدل في قضائه"},
  {num: 30, ar: "الْعَدْلُ", en: "Al-Adl", meaning: "البالغ في العدل أقصاه"},
  {num: 31, ar: "اللَّطِيفُ", en: "Al-Latif", meaning: "اللطيف بعباده العالم بدقائق الأمور"},
  {num: 32, ar: "الْخَبِيرُ", en: "Al-Khabir", meaning: "العالم بخفايا الأمور"},
  {num: 33, ar: "الْحَلِيمُ", en: "Al-Halim", meaning: "الصفوح عن زلّات عباده"},
  {num: 34, ar: "الْعَظِيمُ", en: "Al-Azim", meaning: "ذو العظمة الكاملة"},
  {num: 35, ar: "الْغَفُورُ", en: "Al-Ghafur", meaning: "واسع المغفرة"},
  {num: 36, ar: "الشَّكُورُ", en: "Ash-Shakur", meaning: "الذي يُثيب على القليل من العمل"},
  {num: 37, ar: "الْعَلِيُّ", en: "Al-Ali", meaning: "المتعالي في ذاته وصفاته"},
  {num: 38, ar: "الْكَبِيرُ", en: "Al-Kabir", meaning: "الكبير المتعالي على كل شيء"},
  {num: 39, ar: "الْحَفِيظُ", en: "Al-Hafiz", meaning: "الحافظ لكل شيء"},
  {num: 40, ar: "الْمُقِيتُ", en: "Al-Muqit", meaning: "القادر على كل شيء المقتدر"},
  {num: 41, ar: "الْحَسِيبُ", en: "Al-Hasib", meaning: "الكافي المحاسب لعباده"},
  {num: 42, ar: "الْجَلِيلُ", en: "Al-Jalil", meaning: "ذو الجلال والعظمة"},
  {num: 43, ar: "الْكَرِيمُ", en: "Al-Karim", meaning: "الجواد الكثير العطاء"},
  {num: 44, ar: "الرَّقِيبُ", en: "Ar-Raqib", meaning: "المراقب لجميع أحوال الخلق"},
  {num: 45, ar: "الْمُجِيبُ", en: "Al-Mujib", meaning: "المجيب لدعاء عباده"},
  {num: 46, ar: "الْوَاسِعُ", en: "Al-Wasi'", meaning: "الواسع علمه ورحمته وقدرته"},
  {num: 47, ar: "الْحَكِيمُ", en: "Al-Hakim", meaning: "ذو الحكمة البالغة"},
  {num: 48, ar: "الْوَدُودُ", en: "Al-Wadud", meaning: "الذي يحب عباده الصالحين"},
  {num: 49, ar: "الْمَجِيدُ", en: "Al-Majid", meaning: "الكريم الواسع الفضل"},
  {num: 50, ar: "الْبَاعِثُ", en: "Al-Ba'ith", meaning: "الذي يبعث الخلق بعد الموت"},
  {num: 51, ar: "الشَّهِيدُ", en: "Ash-Shahid", meaning: "الشاهد على كل شيء"},
  {num: 52, ar: "الْحَقُّ", en: "Al-Haqq", meaning: "الثابت الوجود الحق"},
  {num: 53, ar: "الْوَكِيلُ", en: "Al-Wakil", meaning: "المتكفل بأرزاق العباد"},
  {num: 54, ar: "الْقَوِيُّ", en: "Al-Qawi", meaning: "الكامل القوة"},
  {num: 55, ar: "الْمَتِينُ", en: "Al-Matin", meaning: "الشديد القوة الذي لا يعجزه شيء"},
  {num: 56, ar: "الْوَلِيُّ", en: "Al-Wali", meaning: "ناصر المؤمنين ومتولي أمورهم"},
  {num: 57, ar: "الْحَمِيدُ", en: "Al-Hamid", meaning: "المحمود في ذاته وصفاته وأفعاله"},
  {num: 58, ar: "الْمُحْصِي", en: "Al-Muhsi", meaning: "العالم بعدد كل شيء"},
  {num: 59, ar: "الْمُبْدِئُ", en: "Al-Mubdi'", meaning: "الذي أبدع الخلق وأوجده"},
  {num: 60, ar: "الْمُعِيدُ", en: "Al-Mu'id", meaning: "الذي يُعيد الخلق بعد الفناء"},
  {num: 61, ar: "الْمُحْيِي", en: "Al-Muhyi", meaning: "الذي يهب الحياة"},
  {num: 62, ar: "الْمُمِيتُ", en: "Al-Mumit", meaning: "الذي يُميت الخلق"},
  {num: 63, ar: "الْحَيُّ", en: "Al-Hayy", meaning: "الحي الدائم الذي لا يموت"},
  {num: 64, ar: "الْقَيُّومُ", en: "Al-Qayyum", meaning: "القائم بنفسه المقيم لغيره"},
  {num: 65, ar: "الْوَاجِدُ", en: "Al-Wajid", meaning: "الغني الذي لا يفتقر"},
  {num: 66, ar: "الْمَاجِدُ", en: "Al-Majid", meaning: "الكريم الواسع العطاء"},
  {num: 67, ar: "الْوَاحِدُ", en: "Al-Wahid", meaning: "الفرد الذي لا شريك له"},
  {num: 68, ar: "الْأَحَدُ", en: "Al-Ahad", meaning: "المتفرد بالوحدانية"},
  {num: 69, ar: "الصَّمَدُ", en: "As-Samad", meaning: "السيد الذي يُصمد إليه في الحاجات"},
  {num: 70, ar: "الْقَادِرُ", en: "Al-Qadir", meaning: "ذو القدرة التامة على كل شيء"},
  {num: 71, ar: "الْمُقْتَدِرُ", en: "Al-Muqtadir", meaning: "الذي قدرته نافذة في كل شيء"},
  {num: 72, ar: "الْمُقَدِّمُ", en: "Al-Muqaddim", meaning: "الذي يُقدّم من يشاء"},
  {num: 73, ar: "الْمُؤَخِّرُ", en: "Al-Mu'akhkhir", meaning: "الذي يُؤخّر من يشاء"},
  {num: 74, ar: "الْأَوَّلُ", en: "Al-Awwal", meaning: "الذي ليس قبله شيء"},
  {num: 75, ar: "الْآخِرُ", en: "Al-Akhir", meaning: "الذي ليس بعده شيء"},
  {num: 76, ar: "الظَّاهِرُ", en: "Az-Zahir", meaning: "الذي ظهر فوق كل شيء"},
  {num: 77, ar: "الْبَاطِنُ", en: "Al-Batin", meaning: "الذي علم بواطن الأمور"},
  {num: 78, ar: "الْوَالِي", en: "Al-Wali", meaning: "المتولي لأمور الخلق"},
  {num: 79, ar: "الْمُتَعَالِي", en: "Al-Muta'ali", meaning: "المتنزّه عن صفات الخلق"},
  {num: 80, ar: "الْبَرُّ", en: "Al-Barr", meaning: "الكثير الإحسان والبر بعباده"},
  {num: 81, ar: "التَّوَّابُ", en: "At-Tawwab", meaning: "كثير القبول للتوبة"},
  {num: 82, ar: "الْمُنْتَقِمُ", en: "Al-Muntaqim", meaning: "الذي ينتقم من الظالمين"},
  {num: 83, ar: "الْعَفُوُّ", en: "Al-Afuww", meaning: "كثير العفو والصفح"},
  {num: 84, ar: "الرَّؤُوفُ", en: "Ar-Ra'uf", meaning: "الشديد الرحمة بعباده"},
  {num: 85, ar: "مَالِكُ الْمُلْكِ", en: "Malik-ul-Mulk", meaning: "مالك الملك كله لا ينازعه فيه أحد"},
  {num: 86, ar: "ذُو الْجَلَالِ", en: "Dhul-Jalali wal-Ikram", meaning: "صاحب العظمة والكرم"},
  {num: 87, ar: "الْمُقْسِطُ", en: "Al-Muqsit", meaning: "العادل في حكمه"},
  {num: 88, ar: "الْجَامِعُ", en: "Al-Jami'", meaning: "الذي يجمع الخلق ليوم القيامة"},
  {num: 89, ar: "الْغَنِيُّ", en: "Al-Ghani", meaning: "المستغني عن كل شيء"},
  {num: 90, ar: "الْمُغْنِي", en: "Al-Mughni", meaning: "الذي يُغني من يشاء من عباده"},
  {num: 91, ar: "الْمَانِعُ", en: "Al-Mani'", meaning: "الذي يمنع ما يشاء"},
  {num: 92, ar: "الضَّارُّ", en: "Ad-Darr", meaning: "الذي ينفع ويضر بحكمته"},
  {num: 93, ar: "النَّافِعُ", en: "An-Nafi'", meaning: "الذي يجلب النفع لمن يشاء"},
  {num: 94, ar: "النُّورُ", en: "An-Nur", meaning: "منور السموات والأرض"},
  {num: 95, ar: "الْهَادِي", en: "Al-Hadi", meaning: "الذي يهدي من يشاء"},
  {num: 96, ar: "الْبَدِيعُ", en: "Al-Badi'", meaning: "المبتدع للأشياء على غير مثال"},
  {num: 97, ar: "الْبَاقِي", en: "Al-Baqi", meaning: "الدائم الذي لا يفنى"},
  {num: 98, ar: "الْوَارِثُ", en: "Al-Warith", meaning: "الباقي بعد فناء خلقه"},
  {num: 99, ar: "الرَّشِيدُ", en: "Ar-Rashid", meaning: "الذي أرشد الخلق إلى مصالحهم"},
];

function AsmaaHusna () {
  const [search, setSearch]=useState("");
  const [selected, setSelected]=useState(null);
  const detailRef=useRef(null);
  const filtered=search
    ? ASMA_HUSNA.filter(n => n.ar.includes(search)||n.en.toLowerCase().includes(search.toLowerCase())||n.meaning.toLowerCase().includes(search.toLowerCase()))
    :ASMA_HUSNA;

  const selectName=(n) => {
    setSelected(n);
    // Scroll detail card into view after render
    setTimeout(() => {
      detailRef.current?.scrollIntoView({behavior: 'smooth', block: 'center'});
    }, 80);
  };

  return (
    <div className="asma-page">
      {/* Header banner */}
      <div className="asma-hero">
        <div className="asma-hero-title">أسماء الله الحسنى</div>
        <div className="asma-hero-sub">لِلَّهِ الْأَسْمَاءُ الْحُسْنَىٰ فَادْعُوهُ بِهَا</div>
        <div className="asma-hero-count">99 اسماً</div>
      </div>

      {/* Search */}
      <div className="search-bar">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="ابحث بالاسم أو المعنى..." dir="rtl" />
        <button onClick={() => setSearch("")}>{search? "✕":"🔍"}</button>
      </div>

      {/* Detail modal overlay */}
      {selected&&(
        <div className="asma-overlay" onClick={() => setSelected(null)}>
          <div className="asma-modal" ref={detailRef} onClick={e => e.stopPropagation()}>
            <button className="asma-modal-close" onClick={() => setSelected(null)}>✕</button>
            <div className="asma-modal-num">{selected.num} / 99</div>
            <div className="asma-modal-arabic">{selected.ar}</div>
            <div className="asma-modal-divider" />
            <div className="asma-modal-en">{selected.en}</div>
            <div className="asma-modal-meaning">{selected.meaning}</div>
            {/* Prev / Next */}
            <div className="asma-modal-nav">
              <button
                onClick={() => selectName(ASMA_HUSNA[Math.max(0, selected.num-2)])}
                disabled={selected.num===1}>
                ‹ السابق
              </button>
              <button
                onClick={() => selectName(ASMA_HUSNA[Math.min(98, selected.num)])}
                disabled={selected.num===99}>
                التالي ›
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="asma-grid">
        {filtered.map(n => (
          <div key={n.num} className="asma-card" onClick={() => selectName(n)}>
            <div className="asma-num">{n.num}</div>
            <div className="asma-arabic">{n.ar}</div>
            <div className="asma-en-sm">{n.en}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// FEATURE 13: KHATM TRACKER — track full Quran reading completion
// ═══════════════════════════════════════════════════════════════════
function KhatmTracker () {
  const [done, setDone]=useState(() => LS.get("khatm_done", new Array(30).fill(false)));
  const [history, setHistory]=useState(() => LS.get("khatm_history", []));
  const [startDate, setStartDate]=useState(() => LS.get("khatm_start", null));

  const completed=done.filter(Boolean).length;
  const pct=Math.round((completed/30)*100);
  const isFinished=completed===30;

  const toggleJuz=(i) => {
    const n=[...done]; n[i]=!n[i];
    setDone(n); LS.set("khatm_done", n);
    if(!startDate&&n[i]) {const d=new Date().toISOString(); setStartDate(d); LS.set("khatm_start", d);}
  };

  const finishKhatm=() => {
    const entry={date: new Date().toLocaleDateString('ar-EG', {year: 'numeric', month: 'long', day: 'numeric'}), ts: Date.now()};
    const h=[entry, ...history]; setHistory(h); LS.set("khatm_history", h);
    const fresh=new Array(30).fill(false); setDone(fresh); LS.set("khatm_done", fresh);
    setStartDate(null); LS.set("khatm_start", null);
  };

  const daysElapsed=startDate? Math.ceil((Date.now()-new Date(startDate))/(1000*60*60*24)):0;

  return (
    <div className="khatm-page">
      {/* Hero ring */}
      <div className="khatm-hero">
        <svg className="khatm-ring-svg" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,.15)" strokeWidth="10" />
          <circle cx="60" cy="60" r="52" fill="none" stroke="#f0d060" strokeWidth="10"
            strokeDasharray={`${2*Math.PI*52}`}
            strokeDashoffset={`${2*Math.PI*52*(1-pct/100)}`}
            strokeLinecap="round"
            style={{transform: "rotate(-90deg)", transformOrigin: "60px 60px", transition: "stroke-dashoffset .8s ease"}} />
          <text x="60" y="56" textAnchor="middle" fill="#f0d060" fontSize="22" fontWeight="bold" fontFamily="Tajawal">{pct}%</text>
          <text x="60" y="72" textAnchor="middle" fill="rgba(255,255,255,.7)" fontSize="10" fontFamily="Tajawal">مكتمل</text>
        </svg>
        <div className="khatm-hero-info">
          <h2>ختم القرآن الكريم</h2>
          <p>{completed} / 30 جزء</p>
          {startDate&&<p style={{fontSize: "var(--t-xs)", opacity: .7}}>منذ {daysElapsed} يوم</p>}
        </div>
      </div>

      {/* Juz grid */}
      <div className="khatm-grid">
        {done.map((d, i) => (
          <button key={i} className={`khatm-juz${d? " done":""}`} onClick={() => toggleJuz(i)}>
            {d&&<span className="khatm-check">✓</span>}
            <span className="khatm-juz-n">{i+1}</span>
          </button>
        ))}
      </div>

      {/* Finish button */}
      {isFinished&&(
        <div className="khatm-congrats">
          <div style={{fontSize: 40}}>🎉</div>
          <h3>مبروك! أتممت ختم القرآن الكريم</h3>
          <p>نسأل الله أن يتقبل منك ويجعله في ميزان حسناتك</p>
          <button className="khatm-finish-btn" onClick={finishKhatm}>✨ تسجيل الختمة وبدء جديدة</button>
        </div>
      )}

      {/* History */}
      {history.length>0&&(
        <div className="khatm-history">
          <div className="khatm-history-title">📜 سجل الختمات ({history.length})</div>
          {history.map((h, i) => (
            <div key={i} className="khatm-history-row">
              <span>🏆 الختمة {history.length-i}</span>
              <span>{h.date}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// FEATURE 14: OFFLINE CACHE — favourite surahs downloader
// ═══════════════════════════════════════════════════════════════════
function OfflineCache () {
  const [cached, setCached]=useState(() => LS.get("cached_surahs", {}));
  const [loading, setLoading]=useState({});
  const [surahs, setSurahs]=useState([]);
  const [filter, setFilter]=useState("");
  const [swReady, setSwReady]=useState(false);
  const [storageInfo, setStorageInfo]=useState(null);

  useEffect(() => {
    const check=async () => {
      if("caches" in window) setSwReady(true);
      if(navigator.storage?.estimate) {
        try {
          // Calculate actual app localStorage size
          let lsSize=0;
          try {
            for(const k of Object.keys(localStorage)) {
              lsSize+=(localStorage.getItem(k)||'').length*2; // UTF-16
            }
          } catch {}
          const est=await navigator.storage.estimate();
          setStorageInfo({used: Math.round(lsSize/1024), quota: Math.round((est.quota||0)/1024/1024), lsKB: Math.round(lsSize/1024)});
        } catch {}
      }
    };
    check();
  }, []);

  useEffect(() => {
    fetch("https://api.alquran.cloud/v1/surah")
      .then(r => r.json()).then(d => setSurahs(d.data||[])).catch(() => {});
  }, []);

  const cacheSize=Object.keys(cached).length;
  const totalAyahs=Object.values(cached).reduce((s, v) => s+(v.ayahs||0), 0);

  const download=async (s) => {
    if(loading[s.number]) return;
    setLoading(l => ({...l, [s.number]: true}));
    try {
      const url=`https://api.alquran.cloud/v1/surah/${s.number}/quran-simple`;
      const r=await fetch(url);
      const d=await r.json();
      if("caches" in window) {
        try {
          const cache=await caches.open("quran-surahs-v1");
          const r2=await fetch(url);
          await cache.put(url, r2);
        } catch {}
      }
      const nc={...cached, [s.number]: {name: s.name, english: s.englishName, ayahs: d.data?.numberOfAyahs||s.numberOfAyahs||0, data: d.data, ts: Date.now()}};
      setCached(nc); LS.set("cached_surahs", nc);
      if(navigator.storage?.estimate) {
        const est=await navigator.storage.estimate();
        setStorageInfo({used: Math.round((est.usage||0)/1024), quota: Math.round((est.quota||0)/1024/1024)});
      }
    } catch {}
    setLoading(l => ({...l, [s.number]: false}));
  };

  const remove=async (num) => {
    const nc={...cached}; delete nc[num];
    setCached(nc); LS.set("cached_surahs", nc);
    if("caches" in window) {
      try {
        const cache=await caches.open("quran-surahs-v1");
        await cache.delete(`https://api.alquran.cloud/v1/surah/${num}/quran-simple`);
      } catch {}
    }
  };

  const downloadAll=async () => {
    for(const s of surahs) {
      if(!cached[s.number]&&!loading[s.number]) {
        await download(s);
        await new Promise(r => setTimeout(r, 150));
      }
    }
  };

  const clearAll=async () => {
    setCached({}); LS.set("cached_surahs", {});
    if("caches" in window) {try {await caches.delete("quran-surahs-v1");} catch {} }
  };

  const filtered=filter? surahs.filter(s => s.name.includes(filter)||s.englishName.toLowerCase().includes(filter.toLowerCase())||String(s.number)===filter):surahs;

  const [readingCached, setReadingCached]=useState(null);
  const [offlineTab, setOfflineTab]=useState("download");

  if(readingCached&&cached[readingCached]) {
    const s=cached[readingCached];
    const ayahs=s.data?.ayahs||[];
    return (
      <div className="offline-reader">
        <div className="offline-reader-hdr">
          <button className="back-btn" onClick={() => setReadingCached(null)}>← العودة</button>
          <div className="offline-reader-title">{s.name}</div>
          <div className="offline-badge">📴 بدون إنترنت</div>
        </div>
        <div className="surah-info-banner">
          <div className="sib-arabic">{s.name}</div>
          <div className="sib-english">{s.english}</div>
          <div className="sib-bismillah">بِسْمِ ٱللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</div>
        </div>
        <div className="qr-text" style={{direction: "rtl", lineHeight: 2.8, padding: "8px 0", fontFamily: "var(--qfont)"}}>
          {ayahs.map((a, i) => (
            <span key={i} className="ayah-unit"
              onClick={() => document.dispatchEvent(new CustomEvent("openTafsir", {detail: {text: a.text, surah: a.surah?.number||readingCached, ayah: a.numberInSurah}}))}>
              {a.text}{" "}<AyahNum n={a.numberInSurah} />{" "}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="offline-page">
      <div className="offline-header">
        <div className="offline-header-icon">📥</div>
        <div>
          <h2>القراءة بدون إنترنت</h2>
          <p>{cacheSize} سورة — {totalAyahs} آية محفوظة</p>
        </div>
      </div>

      <div style={{margin: "0 0 12px", padding: "10px 14px", borderRadius: "var(--r-md)", background: swReady? "rgba(34,197,94,.12)":"rgba(251,191,36,.12)", border: `1px solid ${swReady? "rgba(34,197,94,.3)":"rgba(251,191,36,.3)"}`, display: "flex", alignItems: "center", gap: 10, fontSize: "var(--t-xs)", color: swReady? "#22c55e":"#fbbf24"}}>
        <span style={{fontSize: 18}}>{swReady? "✅":"⚠️"}</span>
        <div>
          <strong>{swReady? "التخزين الحقيقي (Cache API) متاح":"Cache API غير متاح — يُستخدم localStorage فقط"}</strong>
          {storageInfo&&<div style={{opacity: .8, marginTop: 2}}>بيانات التطبيق: {storageInfo.lsKB||storageInfo.used}KB</div>}
          {!swReady&&<div style={{opacity: .8, marginTop: 2}}>حد أقصى ~5MB في localStorage</div>}
        </div>
      </div>

      <div className="offline-tabs">
        <button className={`offline-tab${offlineTab==="saved"? " active":""}`} onClick={() => setOfflineTab("saved")}>📚 المحفوظة ({cacheSize})</button>
        <button className={`offline-tab${offlineTab==="download"? " active":""}`} onClick={() => setOfflineTab("download")}>⬇️ تحميل سور</button>
      </div>

      {offlineTab==="saved"&&(
        <div>
          {cacheSize===0? (
            <div className="offline-empty">
              <div style={{fontSize: 40, marginBottom: 10}}>📴</div>
              <p>لا توجد سور محفوظة بعد</p>
              <small>انتقل لتبويب "تحميل" لحفظ سور للقراءة بدون إنترنت</small>
            </div>
          ):(
            <>
              <button onClick={clearAll} style={{background: "rgba(239,68,68,.15)", border: "1px solid rgba(239,68,68,.3)", color: "#ef4444", borderRadius: "var(--r-md)", padding: "7px 14px", fontSize: "var(--t-xs)", cursor: "pointer", marginBottom: 10}}>🗑 حذف الكل</button>
              <div className="offline-saved-list">
                {Object.entries(cached).map(([num, s]) => (
                  <div key={num} className="offline-saved-card">
                    <div className="offline-saved-info">
                      <div className="offline-saved-name">{s.name}</div>
                      <div className="offline-saved-sub">{s.english} • {s.ayahs} آية</div>
                    </div>
                    <div className="offline-saved-btns">
                      <button className="offline-read-btn" onClick={() => setReadingCached(+num)}>📖 قرأ</button>
                      <button className="offline-del-btn" onClick={() => remove(+num)}>🗑</button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      <div className="offline-stats">
        <div className="offline-stat"><div className="offline-stat-n">{cacheSize}</div><div>سور</div></div>
        <div className="offline-stat"><div className="offline-stat-n">{totalAyahs}</div><div>آية</div></div>
        <div className="offline-stat"><div className="offline-stat-n">{storageInfo? `${storageInfo.lsKB||storageInfo.used}KB`:`~${Math.round(totalAyahs*0.04)}KB`}</div><div>مساحة</div></div>
      </div>

      {offlineTab==="download"&&<>
        <div style={{display: "flex", gap: 8, margin: "0 0 10px", flexWrap: "wrap", alignItems: "center"}}>
          <button onClick={downloadAll} style={{background: "linear-gradient(135deg,var(--ac),var(--ac2))", color: "#fff", border: "none", borderRadius: "var(--r-md)", padding: "8px 16px", fontSize: "var(--t-xs)", cursor: "pointer", fontWeight: 700, boxShadow: "var(--sh-ac)"}}>⬇️ تحميل كل القرآن</button>
          <small style={{color: "var(--txs)"}}>{114-cacheSize} سورة متبقية</small>
        </div>
        <div className="offline-search">
          <input value={filter} onChange={e => setFilter(e.target.value)} placeholder="ابحث..." dir="rtl" />
          {filter&&<button onClick={() => setFilter("")}>✕</button>}
        </div>
        <div className="offline-list">
          {filtered.map(s => {
            const isCached=!!cached[s.number];
            const isLoading=!!loading[s.number];
            return (
              <div key={s.number} className={`offline-row${isCached? " cached":""}`}>
                <div className="offline-row-info">
                  <span className="offline-row-name">[{s.number}] {s.name}</span>
                  <span className="offline-row-sub">{s.englishName} • {s.numberOfAyahs||s.ayahs?.length||"?"} آية</span>
                </div>
                <div className="offline-row-action">
                  {isCached? (
                    <><span className="offline-cached-badge">✅ محفوظ</span><button className="offline-del-btn" onClick={() => remove(s.number)}>🗑</button></>
                  ):(
                    <button className="offline-dl-btn" onClick={() => download(s)} disabled={isLoading}>
                      {isLoading? <i className="fa-solid fa-spinner fa-spin" />:"⬇️ حفظ"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </>}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// FEATURE 16: SEARCH HISTORY — remember recent searches
// This is implemented inside QuranSearch via a hook
// ═══════════════════════════════════════════════════════════════════
// (Handled by modifying QuranSearch component below)


// ─── Main App ──────────────────────────────────────────────────────────────────

// ─── متشابهات القرآن الكريم ──────────────────────────────────────────────────
// Searches Quran text for similar/repeated phrases across surahs.
// Uses the alquran.cloud search API to find all occurrences of a phrase.
function Mutashabihat () {
  const [q, setQ]=useState("");
  const [inputQ, setInputQ]=useState("");
  const [results, setResults]=useState(null);
  const [loading, setLoading]=useState(false);
  const [history, setHistory]=useState([]); // breadcrumb stack

  const EXAMPLES=[
    "إن الله غفور رحيم",
    "إن الله على كل شيء قدير",
    "والله بما تعملون خبير",
    "يا أيها الذين آمنوا",
    "سبحان الله",
    "الله أكبر",
  ];

  const doSearch=async (term) => {
    const text=term.trim();
    if(!text) return;
    setInputQ(text);
    setLoading(true);
    setResults(null);
    try {
      const r=await fetch(`https://api.alquran.cloud/v1/search/${encodeURIComponent(text)}/all/ar`);
      const d=await r.json();
      const matches=d.data?.matches||[];
      setResults({term: text, matches});
      setQ(text);
    } catch {
      setResults({term: text, matches: []});
    } finally {
      setLoading(false);
    }
  };

  // When user clicks an ayah → find its similar occurrences
  // We pick the most DISTINCTIVE phrase (words 2–5, skipping opening words like "إن","و","لا")
  const COMMON_OPENERS=new Set(["إن", "إنّ", "وَ", "و", "لا", "قُل", "قل", "يا", "ما", "هو", "هي", "أن", "الَّذِينَ", "الذين"]);
  const findSimilar=(ayahText) => {
    const words=ayahText.trim().split(/\s+/).filter(w => !COMMON_OPENERS.has(w.replace(/[ًٌٍَُِّْ]/g, "")));
    // Take 4 distinctive words from middle of the filtered list
    const start=Math.min(1, Math.max(0, Math.floor(words.length/4)));
    const phrase=words.slice(start, start+4).join(" ");
    if(phrase.split(/\s+/).length<2) {
      // fallback to first 4 words of original
      const fb=ayahText.trim().split(/\s+/).slice(1, 5).join(" ");
      setHistory(h => [...h, {q, results}]);
      doSearch(fb);
      return;
    }
    setHistory(h => [...h, {q, results}]);
    doSearch(phrase);
  };

  const goBack=() => {
    const prev=history[history.length-1];
    if(!prev) return;
    setHistory(h => h.slice(0, -1));
    setInputQ(prev.q);
    setQ(prev.q);
    setResults(prev.results);
  };

  // Group results by surah
  const grouped={};
  (results?.matches||[]).forEach(m => {
    const sn=m.surah?.name||"غير محدد";
    if(!grouped[sn]) grouped[sn]=[];
    grouped[sn].push(m);
  });

  const totalMatches=results?.matches?.length||0;

  return (
    <div className="mutashabihat-wrap">
      {/* Header banner */}
      <div style={{
        background: "linear-gradient(135deg,var(--ac),var(--ac2))",
        borderRadius: 12, padding: "14px 16px", color: "#fff",
        marginBottom: 14, textAlign: "center"
      }}>
        <div style={{fontSize: "clamp(17px,5vw,22px)", fontFamily: "'Amiri',serif", fontWeight: 700, marginBottom: 3}}>
          متشابهات القرآن الكريم
        </div>
        <div style={{fontSize: "var(--t-xs)", opacity: .9, fontFamily: "'Tajawal',sans-serif"}}>
          ابحث عن الآيات المتشابهة والمتكررة — اضغط على أي آية لعرض تشابهاتها
        </div>
      </div>

      {/* Search bar */}
      <div className="ms-search">
        <input
          value={inputQ}
          onChange={e => setInputQ(e.target.value)}
          onKeyDown={e => e.key==="Enter"&&doSearch(inputQ)}
          placeholder="اكتب عبارة قرآنية..."
        />
        <button onClick={() => doSearch(inputQ)}>
          <i className="fa-solid fa-search" /> بحث
        </button>
      </div>

      {/* Back button + breadcrumb */}
      {history.length>0&&(
        <button onClick={goBack} style={{
          display: "flex", alignItems: "center", gap: 6,
          background: "var(--item)", border: "1px solid var(--bdr)",
          borderRadius: 8, padding: "6px 12px",
          fontSize: "var(--t-xs)", fontFamily: "'Tajawal',sans-serif",
          color: "var(--ac)", cursor: "pointer", marginBottom: 10, transition: ".2s"
        }}>
          ← رجوع للبحث السابق: "{history[history.length-1]?.q}"
        </button>
      )}

      {/* Example chips — always shown when no results */}
      {!results&&!loading&&(
        <div style={{marginBottom: 14}}>
          <div style={{fontSize: "var(--t-xs)", color: "var(--txm)", fontFamily: "'Tajawal',sans-serif", marginBottom: 8, textAlign: "center"}}>
            📌 اضغط على مثال للبحث:
          </div>
          <div style={{display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center"}}>
            {EXAMPLES.map((ex, i) => (
              <button key={i} onClick={() => doSearch(ex)} style={{
                background: "var(--item)", color: "var(--ac)",
                border: "1.5px solid var(--ac)", borderRadius: 20,
                padding: "5px 13px", fontSize: "var(--t-xs)",
                fontFamily: "'Amiri',serif", cursor: "pointer", transition: ".2s"
              }}>
                {ex}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Loading */}
      {loading&&<Loading />}

      {/* No results */}
      {results&&!loading&&results.matches.length===0&&(
        <div className="ms-empty">لم يتم العثور على نتائج لـ "{results.term}"</div>
      )}

      {/* Results */}
      {results&&results.matches.length>0&&(
        <>
          {/* Summary row */}
          <div style={{
            background: "var(--item)", borderRadius: 8, padding: "9px 14px",
            marginBottom: 12, display: "flex", alignItems: "center",
            justifyContent: "space-between", flexWrap: "wrap", gap: 6
          }}>
            <span style={{fontFamily: "'Tajawal',sans-serif", fontSize: "var(--t-sm)", color: "var(--ac)", fontWeight: 700}}>
              🔍 "{results.term}" — {results.matches.length} موضع في {Object.keys(grouped).length} سورة
            </span>
            <button onClick={() => {setResults(null); setInputQ(""); setQ(""); setHistory([]);}} style={{
              background: "transparent", border: "1px solid var(--bdr)",
              borderRadius: 6, padding: "3px 10px",
              fontSize: "var(--t-xs)", fontFamily: "'Tajawal',sans-serif",
              color: "var(--txm)", cursor: "pointer"
            }}>
              ✕ مسح
            </button>
          </div>

          {/* Grouped by surah */}
          {Object.entries(grouped).map(([surahName, ayahs]) => (
            <div key={surahName} className="ms-result-group">
              <div className="ms-group-title">
                📖 {surahName} — {ayahs.length} موضع
              </div>
              {ayahs.map((m, i) => (
                <div key={i} className="ms-card">
                  {/* Ayah text */}
                  <div className="ms-card-text" dir="rtl" style={{cursor: "pointer"}}
                    onClick={() => document.dispatchEvent(new CustomEvent("openTafsir", {detail: {text: m.text, surah: m.surah?.number, ayah: m.numberInSurah}}))}
                    title="اضغط للتفسير">
                    {m.text} <AyahNum n={m.numberInSurah} />
                  </div>
                  <div className="ms-card-meta" style={{marginBottom: 9}}>
                    سورة {surahName} — الآية {m.numberInSurah}
                    {m.juz?.number? ` — الجزء ${m.juz.number}`:""}
                  </div>
                  {/* Two actions: find similar OR open tafsir */}
                  <div style={{display: "flex", gap: 7, flexWrap: "wrap"}}>
                    <button
                      onClick={() => findSimilar(m.text)}
                      style={{
                        background: "var(--ac)", color: "#fff", border: "none",
                        borderRadius: 7, padding: "5px 13px",
                        fontSize: "var(--t-xs)", fontFamily: "'Tajawal',sans-serif",
                        cursor: "pointer", transition: ".2s", display: "flex", alignItems: "center", gap: 5
                      }}
                    >
                      🔍 اعرض متشابهاتها
                    </button>
                    <button
                      onClick={() => document.dispatchEvent(new CustomEvent("openTafsir", {detail: {text: m.text, surah: m.surah?.number, ayah: m.numberInSurah}}))}
                      style={{
                        background: "var(--item)", color: "var(--tx)",
                        border: "1.5px solid var(--bdr)",
                        borderRadius: 7, padding: "5px 13px",
                        fontSize: "var(--t-xs)", fontFamily: "'Tajawal',sans-serif",
                        cursor: "pointer", transition: ".2s", display: "flex", alignItems: "center", gap: 5
                      }}
                    >
                      📖 تفسير / استماع
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </>
      )}

    </div>
  );
}



// ── NAV icons for bottom nav ──────────────────────────────────────────────────
const BOTTOM_NAV=[
  {tab: 0, icon: "🏠", label: "الرئيسية"},
  {tab: 2, icon: "📖", label: "السور"},
  {tab: 19, icon: "🔖", label: "محفوظاتي"},
  {tab: 10, icon: "🔍", label: "بحث"},
  {tab: 12, icon: "🕌", label: "الصلاة"},
];

// ── Skeleton Loading component ────────────────────────────────────────────────
function SkeletonLines ({n=4}) {
  return (
    <div style={{padding: "10px 0"}}>
      {Array.from({length: n}, (_, i) => (
        <div key={i} className={`skeleton skel-line ${i%3===0? "w100":i%3===1? "w80":"w60"}`} style={{animationDelay: `${i*0.08}s`}} />
      ))}
    </div>
  );
}

// ── Daily Ayah Card ───────────────────────────────────────────────────────────
const DAILY_AYAHS=[
  {text: "وَبَشِّرِ الصَّابِرِينَ", meta: "سورة البقرة — الآية 155", surah: 2, ayah: 155},
  {text: "إِنَّ مَعَ الْعُسْرِ يُسْرًا", meta: "سورة الشرح — الآية 6", surah: 94, ayah: 6},
  {text: "وَاللَّهُ يُحِبُّ الصَّابِرِينَ", meta: "سورة آل عمران — الآية 146", surah: 3, ayah: 146},
  {text: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ", meta: "سورة آل عمران — الآية 173", surah: 3, ayah: 173},
  {text: "وَقُل رَّبِّ زِدْنِي عِلْمًا", meta: "سورة طه — الآية 114", surah: 20, ayah: 114},
  {text: "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ", meta: "سورة البقرة — الآية 153", surah: 2, ayah: 153},
  {text: "فَاذْكُرُونِي أَذْكُرْكُمْ", meta: "سورة البقرة — الآية 152", surah: 2, ayah: 152},
];

function DailyAyahCard ({onTafsir}) {
  const idx=new Date().getDay(); // changes each day
  const ayah=DAILY_AYAHS[idx%DAILY_AYAHS.length];
  const [copied, setCopied]=useState(false);

  const share=async () => {
    const text=`${ayah.text}\n${ayah.meta}\n#القرآن_الكريم`;
    if(navigator.share) {await navigator.share({text}).catch(() => {});}
    else {
      await navigator.clipboard.writeText(text).catch(() => {});
      setCopied(true); setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <div className="daily-ayah-card fade-in-up fade-in-up-d3">
      <div className="daily-ayah-label">✨ آية اليوم</div>
      <div className="daily-ayah-text">{ayah.text}</div>
      <div className="daily-ayah-meta">{ayah.meta}</div>
      <div className="daily-ayah-share">
        <button className="share-btn" onClick={() => onTafsir&&onTafsir(ayah)}>📖 التفسير</button>
        <button className="share-btn" onClick={share}>{copied? "✅ تم النسخ":"📤 مشاركة"}</button>
      </div>
    </div>
  );
}

// ── Prayer + Hijri Countdown Widget ──────────────────────────────────────────
function PrayerHijriWidget () {
  const [times, setTimes]=useState(null);
  const [hijri, setHijri]=useState(null);
  const [now, setNow]=useState(new Date());
  const PRAYERS=[
    {key: "Fajr", ar: "الفجر"}, {key: "Dhuhr", ar: "الظهر"},
    {key: "Asr", ar: "العصر"}, {key: "Maghrib", ar: "المغرب"}, {key: "Isha", ar: "العشاء"},
  ];

  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(async pos => {
      try {
        const {latitude: lat, longitude: lng}=pos.coords;
        const d=new Date();
        const ds=`${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}`;
        const r=await fetch(`https://api.aladhan.com/v1/timings/${ds}?latitude=${lat}&longitude=${lng}&method=4`);
        const rd=await r.json();
        setTimes(rd.data?.timings);
        setHijri(rd.data?.date?.hijri);
      } catch {}
    }, () => {});
    const iv=setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(iv);
  }, []);

  if(!times) return null;

  // Find next prayer
  let nextPrayer=null, nextTime=null, minDiff=Infinity;
  PRAYERS.forEach(p => {
    const t=times[p.key]; if(!t) return;
    const [h, m]=t.split(":").map(Number);
    const pt=new Date(); pt.setHours(h, m, 0, 0);
    let diff=pt-now;
    if(diff<0) diff+=86400000;
    if(diff<minDiff) {minDiff=diff; nextPrayer=p; nextTime=t;}
  });

  const hh=String(Math.floor(minDiff/3600000)).padStart(2, "0");
  const mm=String(Math.floor((minDiff%3600000)/60000)).padStart(2, "0");
  const ss=String(Math.floor((minDiff%60000)/1000)).padStart(2, "0");

  const hijriStr=hijri? `${hijri.day} ${hijri.month?.ar} ${hijri.year}هـ`:"";

  return (
    <div className="pw-widget fade-in-up fade-in-up-d2">
      <div className="pw-next">
        {hijriStr&&<div className="pw-hijri">📅 {hijriStr}</div>}
        <div className="pw-prayer-name">🕌 {nextPrayer?.ar}</div>
        <div className="pw-countdown">{hh}:{mm}:{ss}</div>
        <div style={{fontSize: 9, opacity: .7, fontFamily: "Tajawal", marginTop: 2}}>الوقت المتبقي</div>
      </div>
      <div className="pw-prayers-mini">
        {PRAYERS.map(p => {
          const t=times[p.key]||"";
          const [h, m]=(t.split(":")||[0, 0]).map(Number);
          const pt=new Date(); pt.setHours(h, m, 0, 0);
          const isNext=p.key===nextPrayer?.key;
          return (
            <div key={p.key} className={`pw-p${isNext? " active":""}`}>
              <div className="pw-p-name">{p.ar}</div>
              <div className="pw-p-time">{t.substring(0, 5)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Resume Reading Banner ─────────────────────────────────────────────────────
function ResumeReadingBanner ({onResume}) {
  // Check all possible bookmark keys
  const bkSurah=LS.get("bk_surah", null);
  const bkJuz=LS.get("bk_juz", null);
  const bkPage=LS.get("bk_page", null);

  let label=null, type=null, bkVal=null;
  if(bkSurah!==null) {label=`السورة ${bkSurah+1}`; type="surah"; bkVal=bkSurah;}
  else if(bkJuz!==null) {label=`الجزء ${bkJuz}`; type="juz"; bkVal=bkJuz;}
  else if(bkPage!==null) {label=`الصفحة ${bkPage}`; type="page"; bkVal=bkPage;}

  if(!label) return null;

  return (
    <div className="resume-hero fade-in-up">
      <div>
        <div className="resume-hero-text">🔖 استكمل القراءة</div>
        <div className="resume-hero-sub">{label}</div>
      </div>
      <button className="resume-hero-btn" onClick={() => onResume&&onResume(type, bkVal)}>
        استكمل ←
      </button>
    </div>
  );
}

// ── Quick Start Sheet ─────────────────────────────────────────────────────────
function QuickStartSheet ({onClose, onGo, surahs}) {
  const [mode, setMode]=useState("surah");
  const [surahSel, setSurahSel]=useState(1);
  const [juzSel, setJuzSel]=useState(1);
  const [pageSel, setPageSel]=useState(1);

  const go=() => {
    onGo(mode, mode==="surah"? surahSel-1:mode==="juz"? juzSel:pageSel);
    onClose();
  };

  return (
    <div className="qs-overlay" onClick={e => e.target===e.currentTarget&&onClose()}>
      <div className="qs-sheet">
        <div className="qs-title">ابدأ القراءة</div>
        <div className="qs-tabs">
          {[{id: "surah", label: "سورة"}, {id: "juz", label: "جزء"}, {id: "page", label: "صفحة"}].map(t => (
            <button key={t.id} className={`qs-tab${mode===t.id? " active":""}`} onClick={() => setMode(t.id)}>{t.label}</button>
          ))}
        </div>
        {mode==="surah"&&(
          <select className="qs-select" value={surahSel} onChange={e => setSurahSel(+e.target.value)}>
            {surahs.map((s, i) => <option key={i} value={i+1}>[{i+1}] {s.name} — {s.englishName}</option>)}
          </select>
        )}
        {mode==="juz"&&(
          <select className="qs-select" value={juzSel} onChange={e => setJuzSel(+e.target.value)}>
            {Array.from({length: 30}, (_, i) => <option key={i} value={i+1}>الجزء {i+1}</option>)}
          </select>
        )}
        {mode==="page"&&(
          <input type="number" className="qs-select" min={1} max={604} value={pageSel}
            onChange={e => setPageSel(+e.target.value)} placeholder="1 – 604" />
        )}
        <button className="qs-go" onClick={go}>ابدأ القراءة ←</button>
      </div>
    </div>
  );
}

// ── Hero Section ──────────────────────────────────────────────────────────────

// ─── Onboarding Wizard — shown on first visit ─────────────────────────────────
function OnboardingScreen ({onDone, themes}) {
  const [step, setStep]=useState(0);
  const [dir, setDir]=useState(''); // '' | 'fwd' | 'bwd'
  const [selTheme, setSelTheme]=useState('blue');
  const [selFont, setSelFont]=useState('Amiri');
  const [city, setCity]=useState(() => LS.get('prayer_city', ''));
  const TOTAL=3;

  const FONTS=[
    {id: 'Amiri', label: 'Amiri (كلاسيك)', preview: 'بِسْمِ ٱللّٰهِ الرَّحْمٰنِ الرَّحِيمِ'},
    {id: 'Aref Ruqaa', label: 'Ruqaa (رقعة)', preview: 'بِسْمِ ٱللّٰهِ الرَّحْمٰنِ الرَّحِيمِ'},
    {id: 'Noto Naskh Arabic', label: 'Naskh (نسخ)', preview: 'بِسْمِ ٱللّٰهِ الرَّحْمٰنِ الرَّحِيمِ'},
    {id: 'me_quran', label: 'me_Quran', preview: 'بِسْمِ ٱللّٰهِ الرَّحْمٰنِ الرَّحِيمِ'},
  ];

  const STEPS=[
    {icon: '🎨', title: 'اختر اللون المفضل', sub: 'يُطبَّق فوراً على كل أجزاء التطبيق'},
    {icon: '🖋️', title: 'اختر خط القرآن', sub: 'يظهر في جميع صفحات القراءة'},
    {icon: '🕌', title: 'مدينتك لمواقيت الصلاة', sub: 'يمكن تغييرها لاحقاً من الإعدادات'},
  ];

  const CITIES=['القاهرة', 'الرياض', 'دبي', 'بيروت', 'عمّان', 'الكويت', 'مكة', 'المدينة'];

  const go=(next) => {
    setDir(next>step? 'fwd':'bwd');
    setTimeout(() => {setStep(next); setDir('');}, 260);
  };

  const finish=() => onDone({themeId: selTheme, qfont: selFont, city});
  const next=() => step<TOTAL-1? go(step+1):finish();
  const prev=() => step>0&&go(step-1);

  return (
    <div className="ob-overlay">
      <div className="ob-inner">

        {/* ── Header ── */}
        <div className="ob-logo">﷽</div>
        <div className="ob-app-name">القرآن الكريم</div>
        <div className="ob-tagline">ضبط سريع • {TOTAL} خطوات</div>

        {/* ── Progress bar ── */}
        <div className="ob-prog-track">
          <div className="ob-prog-fill" style={{width: `${((step+1)/TOTAL)*100}%`}} />
        </div>

        {/* ── Step header ── */}
        <div className="ob-step-hdr">
          <span className="ob-step-icon">{STEPS[step].icon}</span>
          <div>
            <div className="ob-step-title">{STEPS[step].title}</div>
            <div className="ob-step-sub">{STEPS[step].sub}</div>
          </div>
        </div>

        {/* ── Animated card ── */}
        <div className={`ob-card ${dir==='fwd'? 'ob-exit-l':dir==='bwd'? 'ob-exit-r':''}`} key={step}>

          {step===0&&(
            <div className="ob-theme-grid">
              {themes.map(t => (
                <button key={t.id}
                  className={`ob-theme-dot${selTheme===t.id? ' sel':''}`}
                  style={{background: t.accent}}
                  onClick={() => setSelTheme(t.id)}>
                  <span className="ob-theme-lbl">{t.label}</span>
                  {selTheme===t.id&&<span className="ob-check">✓</span>}
                </button>
              ))}
            </div>
          )}

          {step===1&&(
            <div className="ob-font-list">
              {FONTS.map(f => (
                <button key={f.id}
                  className={`ob-font-btn${selFont===f.id? ' sel':''}`}
                  onClick={() => setSelFont(f.id)}>
                  <span className="ob-font-prev" style={{fontFamily: `'${f.id}',serif`}}>{f.preview}</span>
                  <span className="ob-font-lbl">{f.label}</span>
                  {selFont===f.id&&<span className="ob-check ob-check-gold">✓</span>}
                </button>
              ))}
            </div>
          )}

          {step===2&&(
            <div className="ob-city-wrap">
              <input
                className="ob-city-input"
                placeholder="مثال: القاهرة، الرياض، دبي..."
                value={city}
                onChange={e => setCity(e.target.value)}
                autoFocus
                dir="rtl"
              />
              <div className="ob-city-tags">
                {CITIES.map(c => (
                  <button key={c} className={`ob-city-tag${city===c? ' sel':''}`}
                    onClick={() => setCity(c)}>{c}</button>
                ))}
              </div>
              <p className="ob-city-note">🔒 تُستخدم فقط لحساب مواقيت الصلاة</p>
            </div>
          )}
        </div>

        {/* ── Navigation ── */}
        <div className="ob-nav-row">
          <button className="ob-back-btn" onClick={prev}
            style={{opacity: step>0? 1:0, pointerEvents: step>0? 'auto':'none'}}>
            → رجوع
          </button>
          <div className="ob-dots">
            {Array.from({length: TOTAL}, (_, i) => (
              <span key={i} className={`ob-dot${step===i? ' active':step>i? ' done':''}`} />
            ))}
          </div>
          <button className="ob-next-btn" onClick={next}>
            {step<TOTAL-1? 'التالي ←':'✓ ابدأ'}
          </button>
        </div>

        <button className="ob-skip" onClick={finish}>تخطي الإعداد</button>
      </div>
    </div>
  );
}


function useReadingStreak () {
  const today=new Date().toDateString();
  const yesterday=new Date(Date.now()-86400000).toDateString();
  const count=LS.get('streak_count', 0);
  const last=LS.get('streak_last', '');
  const mark=() => {
    if(last===today) return count;
    const n=last===yesterday? count+1:1;
    LS.set('streak_count', n); LS.set('streak_last', today);
    return n;
  };
  const cur=last===today? count:(last===yesterday? count:0);
  return {streak: cur, mark};
}

function ReadingStreakCard () {
  const {streak, mark}=useReadingStreak();
  const [cur, setCur]=useState(streak);
  useEffect(() => {setCur(mark());}, []);
  const lit=Math.min(cur, 7);
  const badge=cur>=30? '🏆 أسطوري':cur>=14? '⭐ متميز':cur>=7? '🔥 رائع':cur>=3? '💪 منتظم':null;
  return (
    <div className="streak-card">
      <div className="streak-flames">
        {Array.from({length: 7}, (_, i) => (
          <span key={i} className={`streak-flame${i<lit? ' lit':''}`}>🔥</span>
        ))}
      </div>
      <div className="streak-info">
        <div className="streak-count">{cur} <span className="streak-unit">يوم متواصل</span></div>
        <div className="streak-label">سلسلة القراءة اليومية</div>
      </div>
      {badge&&<div className="streak-badge">{badge}</div>}
    </div>
  );
}


// ══════════════════════════════════════════════════════════════
//  HOME TAB v2 — Luxury redesign
// ══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════
//  MINI READING TRACKER WIDGET (for HomeTab)
// ═══════════════════════════════════════════════════════════
function MiniTrackerWidget ({onGoTracker}) {
  const readDays=LS.get("read_days", {});
  const goal=LS.get("read_goal", 10);
  const today=todayKey();
  const todayRead=readDays[today]||0;
  const pct=Math.min(100, (todayRead/goal)*100);
  const circumf=2*Math.PI*28;
  // streak
  let streak=0; const d=new Date();
  while(true) {const k=`${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`; if(!readDays[k]) break; streak++; d.setDate(d.getDate()-1);}
  const done=todayRead>=goal;

  const logPage=(e) => {
    e.stopPropagation();
    const rd={...readDays, [today]: (readDays[today]||0)+1};
    LS.set("read_days", rd);
    // force re-render by dispatching custom event
    window.dispatchEvent(new Event('tracker-update'));
  };

  return (
    <div className="mtr-widget" onClick={onGoTracker} title="انتقل لمتابعة القراءة">
      <div className="mtr-ring-wrap">
        <svg viewBox="0 0 70 70" className="mtr-ring-svg">
          <circle cx="35" cy="35" r="28" fill="none" stroke="var(--bdr)" strokeWidth="6" />
          <circle cx="35" cy="35" r="28" fill="none"
            stroke={done? "#22c55e":"var(--ac)"} strokeWidth="6"
            strokeDasharray={`${(pct/100)*circumf} ${circumf}`}
            strokeLinecap="round" transform="rotate(-90 35 35)"
            style={{transition: 'stroke-dasharray .6s'}} />
        </svg>
        <div className="mtr-ring-center">
          <span className="mtr-ring-num">{todayRead}</span>
          <span className="mtr-ring-lbl">/{goal}</span>
        </div>
      </div>
      <div className="mtr-info">
        <div className="mtr-title">متابعة القراءة</div>
        <div className="mtr-sub">{done? "✅ هدف اليوم مكتمل":`تبقى ${goal-todayRead} صفحة`}</div>
        {streak>0&&<div className="mtr-streak">🔥 {streak} يوم متواصل</div>}
      </div>
      <button className="mtr-log-btn" onClick={logPage}>+</button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
//  SLEEP TIMER (مؤقت النوم) — global audio sleep timer
// ═══════════════════════════════════════════════════════════
function SleepTimerWidget () {
  const [mins, setMins]=useState(30);
  const [active, setActive]=useState(false);
  const [left, setLeft]=useState(0);
  const [open, setOpen]=useState(false);
  const timerRef=useRef(null);

  const PRESETS=[10, 15, 20, 30, 45, 60];

  const startTimer=() => {
    clearInterval(timerRef.current);
    setLeft(mins*60);
    setActive(true);
  };

  const stopTimer=() => {
    clearInterval(timerRef.current);
    setActive(false);
    setLeft(0);
    // pause all audio
    document.querySelectorAll('audio').forEach(a => a.pause());
  };

  useEffect(() => {
    if(!active) return;
    timerRef.current=setInterval(() => {
      setLeft(l => {
        if(l<=1) {
          setActive(false);
          document.querySelectorAll('audio').forEach(a => a.pause());
          return 0;
        }
        return l-1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [active]);

  const fmt=s => `${String(Math.floor(s/60)).padStart(2, '0')}:${String(s%60).padStart(2, '0')}`;

  if(!open) return (
    <button className="sleep-fab" onClick={() => setOpen(true)} title="مؤقت النوم">
      {active? <span style={{fontSize: 11, fontFamily: 'Tajawal', fontWeight: 700}}>{fmt(left)}</span>:'😴'}
    </button>
  );

  return (
    <div className="sleep-panel">
      <div className="sleep-header">
        <span>😴 مؤقت النوم</span>
        <button className="sleep-close" onClick={() => setOpen(false)}>✕</button>
      </div>
      {active? (
        <div className="sleep-active">
          <div className="sleep-countdown">{fmt(left)}</div>
          <div className="sleep-sub">سيتوقف الصوت تلقائياً</div>
          <button className="sleep-stop-btn" onClick={stopTimer}>إلغاء المؤقت</button>
        </div>
      ):(
        <>
          <div className="sleep-presets">
            {PRESETS.map(m => (
              <button key={m} className={`sleep-preset${mins===m? ' active':''}`} onClick={() => setMins(m)}>{m} د</button>
            ))}
          </div>
          <button className="sleep-start-btn" onClick={() => {startTimer(); setOpen(false);}}>
            تشغيل المؤقت ({mins} دقيقة)
          </button>
        </>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
//  QURAN KHATM PROGRESS (شريط تقدم الختمة)
// ═══════════════════════════════════════════════════════════
function KhatmProgressBar ({onGoKhatm}) {
  const khatm=LS.get("khatm_current", null);
  if(!khatm) return null;
  const totalPages=604;
  const done=khatm.currentPage||1;
  const pct=Math.round(((done-1)/totalPages)*100);
  const juz=Math.ceil((done-1)/20)||1;

  return (
    <div className="kpb-wrap" onClick={onGoKhatm} title="عرض تفاصيل الختمة">
      <div className="kpb-header">
        <span className="kpb-label">📖 {khatm.name||"ختمة جارية"}</span>
        <span className="kpb-pct">{pct}% · صفحة {done}</span>
      </div>
      <div className="kpb-bar-bg">
        <div className="kpb-bar-fill" style={{width: `${pct}%`}} />
        <div className="kpb-bar-marker" style={{left: `${pct}%`}} />
      </div>
      <div className="kpb-footer">
        <span>الجزء {juz}</span>
        <span>{totalPages-done+1} صفحة متبقية</span>
      </div>
    </div>
  );
}

function HomeTab ({onGoTab, onStartReading, onListen, onSearch, onResume}) {
  const [q, setQ]=useState('');
  const [dailyPopup, setDailyPopup]=useState(null);
  const [timeStr, setTimeStr]=useState('');
  const idx=new Date().getDay();
  const ayah=DAILY_AYAHS[idx%DAILY_AYAHS.length];

  useEffect(() => {
    const tick=() => {
      const n=new Date();
      setTimeStr(n.toLocaleTimeString('ar-EG', {hour: '2-digit', minute: '2-digit'}));
    };
    tick();
    const id=setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  const QUICK=[
    {icon: '☰', label: 'الأجزاء', tab: 1, color: '#6366f1'},
    {icon: '📖', label: 'السور', tab: 2, color: '#10b981'},
    {icon: '📄', label: 'الصفحات', tab: 3, color: '#f59e0b'},
    {icon: '🎙️', label: 'القراء', tab: 33, color: '#ec4899'},
    {icon: '🕌', label: 'الصلاة', tab: 12, color: '#14b8a6'},
    {icon: '📿', label: 'تسبيح', tab: 11, color: '#8b5cf6'},
    {icon: '🧭', label: 'القبلة', tab: 13, color: '#06b6d4'},
    {icon: '🔖', label: 'محفوظاتي', tab: 19, color: '#f97316'},
  ];

  return (
    <div className="ht2-page">

      {/* ── TOP HERO ── */}
      <div className="ht2-hero">
        <div className="ht2-hero-glow" />
        <div className="ht2-hero-pattern" />
        <div className="ht2-time">{timeStr}</div>
        <div className="ht2-bismillah">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيمِ</div>
        <div className="ht2-welcome">مرحباً بك في القرآن الكريم</div>
        <div className="ht2-ayah-box">
          <div className="ht2-ayah-text">{ayah.text}</div>
          <div className="ht2-ayah-meta">{ayah.meta}</div>
        </div>
        <div className="ht2-hero-btns">
          <button className="ht2-btn-main" onClick={onStartReading}>
            <span className="ht2-btn-icon">📖</span>
            <span>ابدأ القراءة</span>
          </button>
          <button className="ht2-btn-sec" onClick={onListen}>
            <span className="ht2-btn-icon">🎵</span>
            <span>استمع</span>
          </button>
        </div>
        <div className="ht2-search">
          <input value={q} onChange={e => setQ(e.target.value)}
            onKeyDown={e => e.key==='Enter'&&q.trim()&&onSearch(q)}
            placeholder="ابحث في القرآن الكريم…" />
          <button className="ht2-search-btn" onClick={() => q.trim()&&onSearch(q)}>🔍</button>
        </div>
      </div>

      {/* ── Prayer & Hijri ── */}
      <PrayerHijriWidget />

      {/* ── Resume Banner ── */}
      <ResumeReadingBanner onResume={onResume} />

      {/* ── Mini Tracker Widget ── */}
      <MiniTrackerWidget onGoTracker={() => onGoTab(15)} />

      {/* ── Khatm Progress ── */}
      <KhatmProgressBar onGoKhatm={() => onGoTab(21)} />

      {/* ── Quick Nav ── */}
      <div className="ht2-section">
        <div className="ht2-sec-hdr">
          <span className="ht2-sec-title">تصفح سريع</span>
          <div className="ht2-sec-line" />
        </div>
        <div className="ht2-quick">
          {QUICK.map((l, i) => (
            <button key={i} className="ht2-quick-btn"
              style={{'--qc': l.color}}
              onClick={() => onGoTab(l.tab)}>
              <div className="ht2-quick-ico-wrap">
                <span className="ht2-quick-ico">{l.icon}</span>
              </div>
              <span className="ht2-quick-lbl">{l.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Daily Ayah card ── */}
      <DailyAyahCard onTafsir={a => setDailyPopup(a)} />
      {dailyPopup&&(
        <TafsirPopup ayah={dailyPopup.text} surahNum={dailyPopup.surah}
          ayahNum={dailyPopup.ayah} onClose={() => setDailyPopup(null)} />
      )}

      {/* ── Dua + Streak ── */}
      <DuaOfDayCard />
      <VerseCounter />
      <ReadingStreakCard />
      <VerseOfHour />
    </div>
  );
}

function HeroSection ({onStartReading, onListen, onSearch}) {
  const idx=new Date().getDay();
  const ayah=DAILY_AYAHS[idx%DAILY_AYAHS.length];
  const [q, setQ]=useState("");

  return (
    <div className="hero fade-in-up">
      <div className="hero-bismillah">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيمِ</div>
      <div className="hero-ayah">{ayah.text}</div>
      <div className="hero-ayah-meta">{ayah.meta}</div>
      <div className="hero-btns">
        <button className="hero-btn hero-btn-primary" onClick={onStartReading}>
          📖 ابدأ القراءة
        </button>
        <button className="hero-btn hero-btn-secondary" onClick={onListen}>
          🎵 استمع للقرآن
        </button>
      </div>
      <div className="hero-search">
        <input value={q} onChange={e => setQ(e.target.value)}
          onKeyDown={e => e.key==="Enter"&&onSearch(q)}
          placeholder="ابحث في القرآن الكريم... مثال: إن الله غفور" />
        <button onClick={() => onSearch(q)}>🔍</button>
      </div>
    </div>
  );
}

// ── App Footer ────────────────────────────────────────────────────────────────
function AppFooter () {
  return (
    <footer className="app-footer">
      <div className="footer-inner">
        <div className="footer-logo">AL-Quran AL-Kareem</div>
        <p className="footer-tagline">قراءة · تفسير · تلاوة · أذكار · مواقيت</p>

        <div className="footer-grid">
          <div className="footer-col">
            <h4>القرآن الكريم</h4>
            <p>١١٤ سورة — ٦٢٣٦ آية</p>
            <p>٣٠ جزءاً — ٦٠٤ صفحة</p>
            <p>التفسير الميسر</p>
            <p>ترجمة إنجليزية وفرنسية</p>
          </div>
          <div className="footer-col">
            <h4>المزايا</h4>
            <p>مواقيت الصلاة والأذان</p>
            <p>اتجاه القبلة</p>
            <p>أذكار وأدعية</p>
            <p>متابعة القراءة اليومية</p>
          </div>
          <div className="footer-col footer-developer">
            <h4>المطوّر</h4>
            <p className="dev-name">✨ Mostafa Helal</p>
            <div className="dev-links">
              <a href="https://www.facebook.com/mostafa.helal.5817300" target="_blank" rel="noopener" title="Facebook">
                <i className="fa-brands fa-facebook" />
              </a>
              <a href="https://wa.me/+201097500559" target="_blank" rel="noopener" title="WhatsApp">
                <i className="fa-brands fa-whatsapp" />
              </a>
              <a href="https://www.linkedin.com/in/mostafa-helal-b5a8631b8" target="_blank" rel="noopener" title="LinkedIn">
                <i className="fa-brands fa-linkedin" />
              </a>
              <a href="https://github.com/MostafaHelal-CS" target="_blank" rel="noopener" title="GitHub">
                <i className="fa-brands fa-github" />
              </a>
              <a href="mailto:mostafahelal435@gmail.com" title="Email">
                <i className="fa-solid fa-envelope" />
              </a>
            </div>
          </div>
        </div>

        <hr className="footer-divider" />
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} تطبيق القرآن الكريم — تصميم وتطوير Mostafa Helal</p>
          <p>البيانات: alquran.cloud · aladhan.com · islamic.network</p>
        </div>
      </div>
    </footer>
  );
}

export default function App () {
  const [tab, setTab]=useState(0);
  const [navOpen, setNavOpen]=useState(false);
  const [showSettings, setShowSettings]=useState(false);
  const settingsRef=useRef(null);
  const [showMore, setShowMore]=useState(false);
  const moreRef=useRef(null);
  const [showScroll, setShowScroll]=useState(false);
  const [dark, setDark]=useState(() => LS.get("darkMode", false));
  const [themeId, setThemeId]=useState(() => LS.get("themeId", "blue"));
  const [customAccent, setCustomAccent]=useState(() => LS.get('custom_accent', '#4f8ef7'));
  const [customAccent2, setCustomAccent2]=useState(() => LS.get('custom_accent2', '#6fa8dc'));
  const [showOnboarding, setShowOnboarding]=useState(() => !LS.get("onboarded", false));
  const [offline, setOffline]=useState(!navigator.onLine);
  const [showQS, setShowQS]=useState(false);
  const [qsSearch, setQsSearch]=useState("");
  const [surahList, setSurahList]=useState([]);
  const [dailyPopup, setDailyPopup]=useState(null);
  const [scrollY, setScrollY]=useState(0);
  const [night, setNight]=useState(() => LS.get('nightMode', false));
  const [inReadMode, setInReadMode]=useState(false); // true when reading juz/surah/page
  // Apply reading-mode class to body for CSS hiding of header
  useEffect(() => {
    if(inReadMode) document.body.classList.add('reading-mode');
    else document.body.classList.remove('reading-mode');
    return () => document.body.classList.remove('reading-mode');
  }, [inReadMode]);
  const [qfont, setQfont]=useState(() => LS.get('qfont', "'Amiri','Aref Ruqaa',serif"));
  const theme=(() => {
    const base=THEMES.find(t => t.id===themeId)||THEMES[0];
    if(themeId==='custom') return {...base, accent: customAccent, accent2: customAccent2};
    return base;
  })();

  // Onboarding handler
  const handleOnboardDone=({themeId: tid, qfont: qf, city}) => {
    if(tid) {setThemeId(tid); LS.set('themeId', tid);}
    if(qf) {setQfont(`'${qf}','Amiri',serif`); LS.set('qfont', `'${qf}','Amiri',serif`);}
    if(city) {LS.set('prayer_city', city);}
    LS.set('onboarded', true);
    setShowOnboarding(false);
  };

  /* ── persistence ── */
  useEffect(() => {LS.set("darkMode", dark);}, [dark]);
  useEffect(() => {LS.set("themeId", themeId);}, [themeId]);
  // ── Dynamic theme-color for status bar ──
  useEffect(() => {
    const colors={
      blue: '#0c2340', green: '#0d2b1a', teal: '#0a2520', purple: '#1a0f35',
      gold: '#1a1505', rose: '#2a0a10', slate: '#0e1520', custom: '#1a1035'
    };
    const darkColor='#0a0a0a';
    const color=dark? darkColor:(colors[themeId]||'#1a1035');
    const meta=document.getElementById('theme-color-meta');
    if(meta) meta.setAttribute('content', color);
    // Also update apple status bar
    let apMeta=document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
    if(apMeta) apMeta.setAttribute('content', 'black-translucent');
  }, [themeId, dark]);
  useEffect(() => {LS.set('qfont', qfont);}, [qfont]);
  useEffect(() => {LS.set('nightMode', night);}, [night]);

  /* ── Custom theme: sync live when user clicks "تطبيق الثيم" ── */
  useEffect(() => {
    const h=(e) => {
      const {accent, accent2}=e.detail||{};
      if(accent) {setCustomAccent(accent); LS.set('custom_accent', accent);}
      if(accent2) {setCustomAccent2(accent2); LS.set('custom_accent2', accent2);}
      setThemeId('custom');
      LS.set('themeId', 'custom');
    };
    document.addEventListener('customThemeChange', h);
    return () => document.removeEventListener('customThemeChange', h);
  }, []);

  /* ── scroll: show scroll-top, transparent header ── */
  useEffect(() => {
    const h=() => {const y=window.scrollY; setShowScroll(y>400); setScrollY(y);};
    window.addEventListener("scroll", h, {passive: true});
    return () => window.removeEventListener("scroll", h);
  }, []);

  /* ── close theme panel on outside click ── */
  useEffect(() => {
    if(!showSettings) return;
    const h=e => {if(settingsRef.current&&!settingsRef.current.contains(e.target)) setShowSettings(false);};
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [showSettings]);
  useEffect(() => {
    if(!showMore) return;
    const h=e => {if(moreRef.current&&!moreRef.current.contains(e.target)) setShowMore(false);};
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [showMore]);


  /* ── online/offline ── */
  useEffect(() => {
    const on=() => setOffline(false), off=() => setOffline(true);
    window.addEventListener("online", on); window.addEventListener("offline", off);
    return () => {window.removeEventListener("online", on); window.removeEventListener("offline", off);};
  }, []);

  /* ── load surah list once for Quick-Start sheet ── */
  useEffect(() => {
    fetch("https://api.alquran.cloud/v1/quran/quran-simple")
      .then(r => r.json()).then(d => setSurahList(d.data?.surahs||[])).catch(() => {});
  }, []);

  /* ── close mobile nav on tab change ── */
  const goTab=(i) => {setTab(i); setNavOpen(false); setInReadMode(false); window.scrollTo({top: 0, behavior: "smooth"});};

  /* ── hero search navigates to search tab with query pre-filled ── */
  const handleHeroSearch=(q) => {
    if(!q.trim()) return;
    // Save search query so QuranSearch can pick it up
    LS.set("pending_search", q.trim());
    goTab(10);
  };

  /* ── resume reading handler ── */
  const handleResume=(type, val) => {
    if(type==="surah") goTab(2);
    else if(type==="juz") goTab(1);
    else if(type==="page") goTab(3);
  };

  /* ── quick-start navigation ── */
  const [qsGoto, setQsGoto]=useState(null); // {mode,val} direct nav signal
  const handleQuickStart=(mode, val) => {
    setQsGoto({mode, val});
    if(mode==="surah") goTab(2);
    else if(mode==="juz") goTab(1);
    else if(mode==="page") goTab(3);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const SECTIONS=useMemo(() => [
    <SectionErrorBoundary><HomeTab onGoTab={goTab} onStartReading={() => setShowQS(true)} onListen={() => goTab(5)} onSearch={handleHeroSearch} onResume={handleResume} /></SectionErrorBoundary>,
    <SectionErrorBoundary><QuranParts onReadMode={setInReadMode} gotoJuz={qsGoto?.mode==="juz"? qsGoto.val:null} onGotoDone={() => setQsGoto(null)} /></SectionErrorBoundary>,
    <SectionErrorBoundary><Surahs onReadMode={setInReadMode} gotoSurah={qsGoto?.mode==="surah"? qsGoto.val:null} onGotoDone={() => setQsGoto(null)} /></SectionErrorBoundary>,
    <SectionErrorBoundary><Pages onReadMode={setInReadMode} gotoPage={qsGoto?.mode==="page"? qsGoto.val:null} onGotoDone={() => setQsGoto(null)} /></SectionErrorBoundary>,
    <SectionErrorBoundary><Sajda /></SectionErrorBoundary>, <SectionErrorBoundary><AudioSection /></SectionErrorBoundary>, <SectionErrorBoundary><Radio /></SectionErrorBoundary>,
    <SectionErrorBoundary><Tafasir /></SectionErrorBoundary>, <SectionErrorBoundary><Hadith /></SectionErrorBoundary>, <SectionErrorBoundary><Azkar /></SectionErrorBoundary>, <SectionErrorBoundary><QuranSearch /></SectionErrorBoundary>, <SectionErrorBoundary><Tasbih /></SectionErrorBoundary>, <SectionErrorBoundary><PrayerTimes /></SectionErrorBoundary>, <SectionErrorBoundary><Qibla /></SectionErrorBoundary>,
    <SectionErrorBoundary><AdhanPlayer /></SectionErrorBoundary>, <SectionErrorBoundary><ReadingTracker /></SectionErrorBoundary>, <SectionErrorBoundary><RamadanSchedule /></SectionErrorBoundary>, <SectionErrorBoundary><Mutashabihat /></SectionErrorBoundary>,
    <SectionErrorBoundary><IslamicCalendar /></SectionErrorBoundary>,
    <SectionErrorBoundary><BookmarksManager onGoToJuz={v => {setQsGoto({mode: "juz", val: v}); goTab(1);}} onGoToSurah={v => {setQsGoto({mode: "surah", val: v}); goTab(2);}} onGoToPage={v => {setQsGoto({mode: "page", val: v}); goTab(3);}} /></SectionErrorBoundary>,
    <SectionErrorBoundary><VocabFlashcards /></SectionErrorBoundary>, <SectionErrorBoundary><KhatmTracker /></SectionErrorBoundary>, <SectionErrorBoundary><OfflineCache /></SectionErrorBoundary>, <SectionErrorBoundary><AsmaaHusna /></SectionErrorBoundary>, <SectionErrorBoundary><QuranStats /></SectionErrorBoundary>,
    <SectionErrorBoundary><DailyDuas /></SectionErrorBoundary>,
    <SectionErrorBoundary><QuranQuiz /></SectionErrorBoundary>,
    <SectionErrorBoundary><ReadingGoals /></SectionErrorBoundary>,
    <SectionErrorBoundary><TajweedGuide /></SectionErrorBoundary>,
    <SectionErrorBoundary><AnalyticsDashboard /></SectionErrorBoundary>,
    <SectionErrorBoundary><CustomThemeCreator /></SectionErrorBoundary>,
    <SectionErrorBoundary><NotificationCenter /></SectionErrorBoundary>,
    <SectionErrorBoundary><TafsirComparison /></SectionErrorBoundary>,
    <SectionErrorBoundary><RecitersPage /></SectionErrorBoundary>
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ], [qsGoto, inReadMode, night]);

  const navScrolled=scrollY>20;

  if(showOnboarding) return (
    <>
      <style>{buildStyles(theme, dark, qfont)}</style>
      <OnboardingScreen themes={THEMES} qfonts={[]} onDone={handleOnboardDone} />
    </>
  );

  return (
    <>
      <style>{buildStyles(theme, dark, qfont)}</style>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

      {/* Global background services */}
      <GlobalPrayerScheduler />
      <GlobalTafsirListener />
      <NightReadingBanner />
      <PrayerWarningToast />
      <WordTooltip />
      <PWAInstallBanner />
      <SleepTimerWidget />
      {offline&&<div className="offline-toast">⚡ وضع عدم الاتصال</div>}

      {/* ── HEADER: centered logo, left/right controls ── */}
      <header className={`app-header${navScrolled? " scrolled":""}`}>
        <div className="header-inner">
          {/* Left: unified ⚙️ settings */}
          <div className="header-left" ref={settingsRef}>
            <button className="hdr-btn sp-open-btn" onClick={() => setShowSettings(s => !s)}>
              <span className="ico">⚙️</span>
              <span className="sp-lbl">إعدادات</span>
            </button>
            {showSettings&&(
              <div className="sp-panel">
                <div className="sp-panel-title">⚙️ إعدادات العرض</div>

                <div className="sp-group-label">🌙 الإضاءة</div>
                <div className="sp-row2">
                  <button className={`sp-pill${dark? " sp-pill-on":""}`} onClick={() => setDark(d => !d)}>
                    {dark? "☀️ فاتح":"🌙 داكن"}
                  </button>
                  <button className={`sp-pill${night? " sp-pill-on":""}`} onClick={() => setNight(n => !n)}>
                    {night? "🕯 إيقاف ليلي":"🕯 وضع ليلي"}
                  </button>
                </div>

                <div className="sp-group-label">🎨 اللون</div>
                <div className="sp-swatches">
                  {THEMES.map(t => (
                    <button key={t.id}
                      className={`sp-sw${themeId===t.id? " sp-sw-on":""}`}
                      style={{'--sc': t.accent}}
                      title={t.label}
                      onClick={() => setThemeId(t.id)}>
                      {themeId===t.id&&"✓"}
                    </button>
                  ))}
                </div>
                <div className="sp-color-names">
                  {THEMES.map(t => (
                    <button key={t.id}
                      className={`sp-cn${themeId===t.id? " sp-cn-on":""}`}
                      style={{'--sc': t.accent}}
                      onClick={() => setThemeId(t.id)}>
                      {t.label}
                    </button>
                  ))}
                </div>

                <div className="sp-group-label">𝐴 خط القرآن</div>
                <div className="sp-fonts">
                  {[
                    {l: "أميري", v: "'Amiri','Aref Ruqaa',serif"},
                    {l: "شهرزاد", v: "'Scheherazade New',serif"},
                    {l: "ريم كوفي", v: "'Reem Kufi',serif"},
                    {l: "رقعة", v: "'Aref Ruqaa',serif"},
                    {l: "مقرئ", v: "'Traditional Arabic','Arial',serif"},
                  ].map(f => (
                    <button key={f.v} className={`sp-font${qfont===f.v? " sp-font-on":""}`}
                      onClick={() => setQfont(f.v)}>
                      <span style={{fontFamily: f.v, fontSize: 15, direction: 'rtl', display: 'block'}}>بِسْمِ</span>
                      <span className="sp-fn">{f.l}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Center: logo */}
          <a className="logo" onClick={() => goTab(0)}>الْقُرْآن الْكَرِيْم</a>

          {/* Right: hamburger + nav — always the same */}
          <div className="header-right">
            {/* Mobile hamburger dropdown */}
            <nav className={navOpen? "open":"closed"} aria-hidden={!navOpen}>
              <ul>
                {NAV.map((label, i) => (
                  <li key={i}>
                    <button className={tab===i? "active":""} onClick={() => {goTab(i); setNavOpen(false);}}>
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
            {/* ALL-SCREENS sections dropdown (More ▼) */}
            <div className="nav-more-wrap" ref={moreRef}>
              <button className="hdr-btn nav-more-btn" onClick={() => setShowMore(s => !s)}>
                <span style={{fontSize: 11, fontFamily: 'Tajawal'}}>{NAV[tab]||'الأقسام'} ▾</span>
              </button>
              {showMore&&(
                <div className="nav-more-panel">
                  {NAV.map((label, i) => {
                    const icons=['📖', '📚', '📄', '⬇', '🎧', '📻', '📺', '🔊', '📿', '🌿', '🔍', '📿', '🕌', '🧭', '🔔', '📍', '🌙', '🔄', '📅', '🔖', '🃏', '📊', '💾', '✨', '📈', '🤲', '🏆', '🎯', '📜', '📤', '📊', '🎨', '🔔', '📚', '🎙️'];
                    return (
                      <button key={i} className={`nmp-item${tab===i? " active":""}`} onClick={() => {goTab(i); setShowMore(false);}}>
                        <span className="nmp-item-icon">{icons[i]||'📖'}</span>
                        <span className="nmp-item-label">{label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ── MAIN CONTENT ── */}
      <div className={`landing${dark&&night? " dark-night-mode":""}`}>
        <div className={`main-card${night? " night-mode":""}`}>



          {/* Section content */}
          <div className="fade-in-up">
            {SECTIONS[tab]}
          </div>

        </div>
      </div>

      {/* Daily ayah tafsir popup */}
      {dailyPopup&&(
        <TafsirPopup
          ayah={dailyPopup.text} surahNum={dailyPopup.surah} ayahNum={dailyPopup.ayah}
          onClose={() => setDailyPopup(null)}
        />
      )}

      {/* Quick-start sheet */}
      {showQS&&(
        <QuickStartSheet
          onClose={() => setShowQS(false)}
          onGo={handleQuickStart}
          surahs={surahList}
        />
      )}

      {/* Footer — only on home page */}
      {tab===0&&<AppFooter />}

      {/* Bottom Navigation — mobile only */}
      <nav className="bottom-nav" role="navigation" aria-label="التنقل السريع">
        {BOTTOM_NAV.map(item => (
          <button key={item.tab} className={`bn-item${tab===item.tab? " active":""}`}
            onClick={() => goTab(item.tab)}>
            <span className="bn-icon">{item.icon}</span>
            <span className="bn-label">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Scroll-to-top */}
      {showScroll&&(
        <button id="scroll-top" onClick={() => window.scrollTo({top: 0, behavior: "smooth"})}>↑</button>
      )}
    </>
  );
}
