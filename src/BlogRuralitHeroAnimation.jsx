import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  Home, BookOpen, Package, BarChart2, Folder, FileText, Settings,
  Bell, FileSpreadsheet, ArrowDownRight, ArrowUpRight, Mic, Send,
  Check, CornerDownRight, ChevronRight, PanelLeftClose, Building2, Plus,
  X, ListChecks, MessageSquare, LockKeyhole, WalletCards, StickyNote,
  RotateCcw, ExternalLink, Paperclip, ChevronLeft, MousePointer2,
  Tractor, NotebookPen, Wheat
} from 'lucide-react';

/**
 * BlogRuralitHeroAnimation
 * ------------------------------------------------------------------
 * Pieza hero 16:9 que simula el inicio desktop (modo claro) de Ruralit
 * funcionando: el usuario escribe un registro en lenguaje natural, la
 * app lo procesa y aparece en "Últimos registros" + micro cambios en
 * el contador y el stock de la sidebar.
 *
 * 100% visual/mock: sin lógica real, sin Supabase, sin parsers, sin
 * datos de la app principal. Replica la identidad visual del inicio
 * desktop real de Ruralit (tokens, tipografías, radios, sombras) según
 * el informe de estilos. Respeta `prefers-reduced-motion`.
 *
 * El escalado se hace con un ResizeObserver que fija el font-size del
 * frame en píxeles (1em = ~1.45% del ancho), así toda la escena escala
 * con el contenedor sin depender de container queries.
 *
 * Estilos autocontenidos y scoping bajo `.rha-` para no colisionar con
 * el blog ni con la app real.
 */

// --- Datos mock (registros que se van escribiendo en el input) ----------------
const REGISTROS = [
  { text: 'Vendí 2 terneros por 500 USD', type: 'ingreso', title: 'Venta de terneros', badge: 'INGRESO', rowAmount: '+ US$ 500', date: 'Hoy, 22:14', stockDelta: 0 },
  { text: 'Gasté 3.500 UYU en combustible', type: 'gasto', title: 'Combustible', badge: 'GASTO', rowAmount: '- $ 3.500', date: 'Hoy, 21:48', stockDelta: 0 },
  { text: 'Compré 20 bolsas de ración', type: 'stock', title: 'Ración', badge: 'STOCK', rowAmount: '+ 20 bolsas', date: 'Hoy, 20:35', stockDelta: 20 },
  { text: 'Ingreso por venta de lana 620 USD', type: 'ingreso', title: 'Venta de lana', badge: 'INGRESO', rowAmount: '+ US$ 620', date: 'Hoy, 19:22', stockDelta: 0 },
  { text: 'Pagué alambrado 2.400 UYU', type: 'gasto', title: 'Alambrado', badge: 'GASTO', rowAmount: '- $ 2.400', date: 'Ayer, 18:40', stockDelta: 0 },
  { text: 'Agregué 8 bolsas de ración al stock', type: 'stock', title: 'Ración', badge: 'STOCK', rowAmount: '+ 8 bolsas', date: 'Hoy, 17:06', stockDelta: 8 },
];

const PLACEHOLDERS = ['¿Qué pasó hoy?', 'Describí una actividad...', 'Escribí un registro...'];
const PILLS = ['Vendí 2 terneros por 900 USD', 'Gasté 3.500 UYU en combustible', 'Compré 20 bolsas de ración', 'Pagué 2.400 UYU de alambrado'];

const SEED_ROWS = [
  { uid: 's1', type: 'stock', title: 'Fertilizantes', badge: 'STOCK', rowAmount: '+ 10 unidades', date: 'Ayer, 22:12' },
  { uid: 's2', type: 'ingreso', title: 'Venta de terneros', badge: 'INGRESO', rowAmount: '+ US$ 500', date: 'Ayer, 22:12' },
  { uid: 's3', type: 'stock', title: 'Novillos', badge: 'STOCK', rowAmount: '+ 15 novillos', date: 'Ayer, 21:01' },
];

const INITIAL_STOCK = 120;
const INITIAL_TODAY = 3;

// --- Helpers -----------------------------------------------------------------
const ROW_ICON = {
  ingreso: { Icon: ArrowUpRight, color: 'var(--green-main)', bg: 'rgba(46,125,50,0.10)', flash: '#EDF4ED' },
  gasto: { Icon: ArrowDownRight, color: 'var(--red-soft)', bg: 'rgba(201,74,74,0.10)', flash: '#FDECEA' },
  stock: { Icon: Package, color: 'var(--blue-main)', bg: 'rgba(29,104,197,0.10)', flash: '#F0F7FF' },
};

// --- Estilos (scoping .rha-) -------------------------------------------------
const styles = `
.rha-outer {
  position: relative;
  left: 50%;
  width: min(1120px, calc(100vw - 48px));
  translate: -50% 0;
  isolation: isolate;
}
.rha-browser-bar {
  position: absolute; z-index: 2; left: 0; right: 0; top: -30px; height: 31px;
  display: grid; grid-template-columns: 1fr auto 1fr; align-items: center;
  padding: 0 12px; background: #fff;
  border: 1px solid rgba(16,24,40,0.1); border-bottom-color: rgba(16,24,40,0.07);
  border-radius: 12px 12px 0 0;
  box-shadow: 0 -5px 15px rgba(16,24,40,0.04);
  font-family: 'Inter', system-ui, sans-serif; pointer-events: none;
}
.rha-browser-controls { display: flex; align-items: center; gap: 6px; }
.rha-browser-dot { width: 7px; height: 7px; border-radius: 50%; }
.rha-browser-dot.red { background: #ff5f57; }
.rha-browser-dot.yellow { background: #febc2e; }
.rha-browser-dot.green { background: #28c840; }
.rha-browser-address {
  min-width: 220px; height: 19px; padding: 0 14px;
  display: inline-flex; align-items: center; justify-content: center; gap: 5px;
  border: 1px solid rgba(16,24,40,0.08); border-radius: 6px;
  background: #fff; color: #767676; font-size: 9px; font-weight: 500;
}
.rha-browser-address svg { width: 9px; height: 9px; stroke-width: 1.7; }
.rha-browser-tools { justify-self: end; color: #9a9a9a; font-size: 11px; letter-spacing: 2px; }
.rha-sticker {
  position: absolute; z-index: 3; width: 42px; height: 42px;
  display: grid; place-items: center; border: 2px solid #1e2b21; border-radius: 50%;
  color: #173d20; background: #e9f5e8;
  box-shadow: 3px 4px 0 rgba(30,43,33,0.16);
  animation: rha-sticker-float 4.8s ease-in-out infinite;
  pointer-events: none;
}
.rha-sticker svg { width: 21px; height: 21px; stroke-width: 1.8; }
.rha-sticker.tractor { left: 7%; top: -78px; --tilt: -8deg; }
.rha-sticker.notes { right: 7%; top: -72px; --tilt: 7deg; background: #fff0cf; color: #72490f; animation-delay: -1.2s; }
.rha-sticker.stock { left: 10%; bottom: -34px; --tilt: 6deg; background: #e9f0fb; color: #245a99; animation-delay: -2.4s; }
.rha-sticker.wheat { right: 10%; bottom: -30px; --tilt: -7deg; background: #f5e9d3; color: #7c5319; animation-delay: -3.2s; }
.rha-frame {
  --green-main: #1B5E20;
  --green-sec: #2E7D32;
  --green-light: #EDF4ED;
  --logo-dot: #D4FF55;
  --red-soft: #C94A4A;
  --red-light: #FDECEA;
  --blue-main: #1D68C5;
  --blue-light: #F0F7FF;
  --charcoal: #101828;
  --t1: #2C2C2C;
  --t2: #4A4A4A;
  --t3: #888888;
  --beige-bg: #F8F1E5;
  --bg-outer: #E2E4DE;
  --bg-sidebar: #F9F8F3;
  --bg-card: #ffffff;
  --bg-input: #ffffff;
  --border: #E0E0E0;
  --border-sm: #EEEEEE;
  --border-rgba: rgba(0,0,0,0.08);
  --shadow-sm: 0 0.625rem 1.875rem rgba(0,0,0,0.04);
  --shadow-input: 0 0.75rem 2rem rgba(0,0,0,0.08);
  --r-md: 0.75rem;
  --font: 'Inter Tight', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  --font-logo: 'Orbitron', 'Inter Tight', sans-serif;

  /* fallback hasta que el ResizeObserver fija el tamaño exacto */
  font-size: clamp(8px, 1.6vw, 16px);
  font-family: var(--font);
  color: var(--t1);
  position: relative;
  z-index: 1;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: var(--bg-outer);
  border: 1px solid var(--border-rgba);
  border-radius: 0 0 1em 1em;
  box-shadow: 0 0.35em 1.35em rgba(16,24,40,0.055), 0 0 0.55em rgba(16,24,40,0.035);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

/* stage absoluto: garantiza 16:9 exacto sin crecer con el contenido */
.rha-stage {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: stretch;
  overflow: hidden;
}

/* ---------- Sidebar ---------- */
.rha-sidebar {
  width: 12em;
  flex: 0 0 12em;
  background: var(--bg-sidebar);
  border-right: 1px solid var(--border-rgba);
  display: flex;
  flex-direction: column;
  padding: 1.6em 1em 1.05em;
  min-height: 0;
}
.rha-side-top { display: flex; align-items: center; justify-content: space-between; padding: 0 0.15em 1em; }
.rha-brand {
  font-family: var(--font-logo);
  font-weight: 700;
  font-size: 1.05em;
  color: var(--green-main);
  letter-spacing: -0.05em;
  line-height: 1;
}
.rha-brand .rha-dot { color: var(--logo-dot); font-weight: 900; }
.rha-collapse {
  width: 1.55em; height: 1.55em; border-radius: 0.45em; border: 1px solid var(--border);
  background: var(--bg-card); color: var(--t3); display: grid; place-items: center;
}
.rha-collapse svg { width: 0.82em; height: 0.82em; stroke-width: 1.7; }
.rha-nav { display: flex; flex-direction: column; gap: 0.12em; }
.rha-nav-group + .rha-nav-group { margin-top: 0.9em; }
.rha-nav-label {
  font-size: 0.54em; font-weight: 700; color: var(--t3);
  text-transform: uppercase; letter-spacing: 0.05em;
  padding: 0.3em 0.65em 0.35em; text-align: left;
}
.rha-item {
  display: flex; align-items: center; gap: 0.55em;
  padding: 0.55em 0.65em; border-radius: 0.55em;
  font-size: 0.7em; font-weight: 600; color: var(--t2);
  position: relative; white-space: nowrap;
}
.rha-item svg { width: 1.15em; height: 1.15em; stroke-width: 1.6; flex-shrink: 0; }
.rha-item.active { background: var(--green-light); color: var(--green-main); font-weight: 700; }
.rha-item.active::before {
  content: ""; position: absolute; left: 0; top: 0.45em; bottom: 0.45em;
  width: 0.16em; border-radius: 0.16em; background: var(--green-main);
}
.rha-item .rha-badge {
  margin-left: auto; min-width: 1.4em; height: 1.15em; padding: 0 0.34em;
  border-radius: 0.6em; background: var(--green-light); color: var(--green-main);
  font-size: 0.8em; font-weight: 700; display: grid; place-items: center;
  font-variant-numeric: tabular-nums;
  transition: transform 0.25s ease, background 0.25s ease, color 0.25s ease;
}
.rha-item .rha-badge.pulse { animation: rha-badge-pulse 0.7s ease; }

.rha-side-foot { margin-top: auto; display: flex; flex-direction: column; gap: 0.12em; padding-top: 0.7em; border-top: 1px solid var(--border-sm); }
.rha-est {
  display: flex; align-items: center; gap: 0.55em;
  padding: 0.55em 0.65em; border-radius: 0.55em;
  font-size: 0.7em; font-weight: 600;
  background: transparent; border: 0;
}
.rha-est-av {
  width: 1.15em; height: 1.15em;
  background: transparent; color: var(--t2);
  display: grid; place-items: center; flex-shrink: 0;
}
.rha-est-av svg { width: 1.15em; height: 1.15em; stroke-width: 1.6; }
.rha-est-main { min-width: 0; display: flex; align-items: center; }
.rha-est-name { font-size: 1em; font-weight: 600; color: var(--t2); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.rha-est-chevron { width: 0.9em; height: 0.9em; margin-left: auto; color: var(--t3); stroke-width: 1.6; }
.rha-side-settings { margin-bottom: 0.45em; padding-block: 0.62em; }
.rha-team-block {
  display: grid; grid-template-columns: minmax(0, 1fr) auto;
  align-items: center; gap: 0.32em 0.55em;
  padding: 0.62em 0.65em; border-radius: 0.62em;
  background: var(--bg-card); border: 1px solid var(--border-sm);
}
.rha-team-copy { display: contents; }
.rha-team-block-title {
  grid-column: 1 / -1; min-width: 0; width: 100%; justify-self: start; text-align: left;
  font-size: 0.56em; font-weight: 750; color: var(--t1);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; letter-spacing: -0.01em;
}
.rha-team-role {
  grid-column: 1; justify-self: start;
  font-size: 0.43em; font-weight: 800; line-height: 1; color: var(--green-main);
  background: var(--green-light); padding: 0.28em 0.5em; border-radius: 0.35em;
}
.rha-team-avatars { grid-column: 2; display: flex; align-items: center; justify-self: end; flex-shrink: 0; }
.rha-team-avatar {
  width: 1.6em; height: 1.6em; margin-left: -0.3em; border-radius: 50%;
  border: 1px solid var(--bg-card); display: grid; place-items: center;
  font-size: 0.55em; font-weight: 700; color: #5f4b7a; background: #eee9f5;
}
.rha-team-avatar:first-child { margin-left: 0; color: #fff; background: #7a4d59; }
.rha-team-avatar.emoji { font-size: 0.72em; background: #fff; }
.rha-team-online { width: 0.32em; height: 0.32em; margin-left: 0.45em; border-radius: 50%; background: #2fb45a; box-shadow: 0 0 0 0.12em #edf8f0; }

/* ---------- Main ---------- */
.rha-main { flex: 1; min-width: 0; background: var(--beige-bg); display: flex; flex-direction: column; min-height: 0; overflow: hidden; }

.rha-topbar {
  display: flex; align-items: center; justify-content: space-between;
  gap: 1.5em; padding: 1.25em 2.2em 1.2em; border-bottom: 1px solid var(--border-sm);
  flex: 0 0 auto;
}
.rha-tb-left { min-width: 0; }
.rha-tb-context { display: flex; align-items: center; gap: 0.38em; margin-bottom: 0.06em; }
.rha-tb-name { font-size: 0.56em; font-weight: 800; color: var(--charcoal); letter-spacing: 0.02em; }
.rha-tb-role {
  font-size: 0.44em; font-weight: 800; color: var(--green-main); background: var(--green-light);
  padding: 0.13em 0.32em; border-radius: 0.25em; text-transform: uppercase; letter-spacing: 0.05em;
}
.rha-frame .rha-h1 {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 1.38em; font-weight: 900; color: var(--charcoal);
  letter-spacing: -0.018em; line-height: 1.1; margin: 0;
}
.rha-sub { font-size: 0.64em; font-weight: 500; color: var(--t3); margin-top: 0.28em; }
.rha-actions { display: flex; align-items: center; gap: 0.38em; flex-shrink: 0; }
.rha-tbtn {
  display: inline-flex; align-items: center; gap: 0.3em;
  height: 3em; padding: 0 1.2em; border-radius: 1em;
  border: 1px solid var(--border); background: var(--bg-input); color: var(--t1);
  font-size: 0.66em; font-weight: 700; font-family: inherit;
}
.rha-tbtn svg { width: 0.92em; height: 0.92em; stroke-width: 1.8; }
.rha-tbtn .green { color: var(--green-main); }
.rha-tbtn .red { color: var(--red-soft); }
.rha-bell {
  width: 2.2em; height: 2.2em; border-radius: 0.72em; border: 1px solid var(--border-sm);
  background: var(--bg-input); color: var(--t2); display: grid; place-items: center; position: relative;
}
.rha-bell svg { width: 0.92em; height: 0.92em; stroke-width: 1.6; }
.rha-bell .rha-bell-dot { position: absolute; top: 0.36em; right: 0.36em; width: 0.38em; height: 0.38em; border-radius: 50%; background: var(--red-soft); }

/* ---------- Centro (quick entry) ---------- */
.rha-center {
  display: flex; flex-direction: column; align-items: center;
  padding: 1.7em 1.5em 0; max-width: 34em; margin: 0 auto; width: 100%;
  flex: 0 0 auto;
}
.rha-mobile-intro, .rha-mobile-plus, .rha-mobile-voice, .rha-mobile-result { display: none; }
.rha-qe-title { font-size: 0.94em; font-weight: 700; color: var(--t1); letter-spacing: -0.03em; margin: 0; text-align: center; }
.rha-qe-sub { font-size: 0.6em; font-weight: 500; color: var(--t3); margin-top: 0.2em; text-align: center; }

.rha-input-shell {
  margin-top: 0.82em; width: 100%; display: flex; align-items: center; gap: 0.35em;
  background: var(--bg-input); border: 1px solid var(--border-rgba);
  border-radius: 0.8em; padding: 0.16em 0.3em 0.16em 1.05em;
  height: 2.65em; box-shadow: var(--shadow-input);
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
}
.rha-input-shell.focused {
  border-color: var(--green-main);
  box-shadow: 0 0 0 0.18em rgba(46,125,50,0.06), var(--shadow-input);
}
.rha-mic {
  width: 1.85em; height: 1.85em; border: none; border-radius: 50%;
  background: transparent; color: var(--t3); display: grid; place-items: center; flex-shrink: 0;
}
.rha-mic svg { width: 1em; height: 1em; stroke-width: 1.7; }
.rha-input-area { flex: 1; min-width: 0; position: relative; height: 1.4em; }
.rha-typed {
  position: absolute; inset: 0; display: flex; align-items: center;
  font-size: 0.76em; font-weight: 500; color: var(--t1); white-space: nowrap;
  overflow: hidden; transition: opacity 0.2s ease;
}
.rha-typed .rha-cursor { display: inline-block; width: 0.08em; height: 1em; background: var(--green-main); margin-left: 1px; flex-shrink: 0; animation: rha-blink 1s step-end infinite; }
.rha-placeholder {
  position: absolute; inset: 0; display: flex; align-items: center;
  font-size: 0.76em; color: var(--t3); white-space: nowrap; overflow: hidden;
  text-overflow: ellipsis; pointer-events: none;
}
.rha-placeholder > span { display: inline-block; animation: rha-ph-in 0.4s cubic-bezier(0.16,1,0.3,1) both; }
.rha-send {
  width: 1.95em; height: 1.95em; border: none; border-radius: 0.5em;
  background: var(--green-main); color: #fff; display: grid; place-items: center;
  flex-shrink: 0; opacity: 0.55; transition: opacity 0.2s ease, transform 0.2s ease;
}
.rha-send.ready { opacity: 1; }
.rha-send.success { opacity: 1; animation: rha-send-pop 0.4s ease; }
.rha-send svg { width: 1em; height: 1em; stroke-width: 2; }

/* chips van DEBAJO del input, con aire */
.rha-chips { display: flex; gap: 0.55em; margin-top: 0.82em; justify-content: center; }
.rha-chip {
  height: 1.8em; padding: 0 0.78em; border-radius: 999px;
  border: 1px solid var(--border); background: transparent; color: var(--t3);
  font-size: 0.6em; font-weight: 600; font-family: inherit;
  display: inline-flex; align-items: center; gap: 0.32em; transition: all 0.18s ease;
}
.rha-chip svg { width: 0.95em; height: 0.95em; stroke-width: 1.8; }
.rha-chip.active.ingreso { border-color: var(--green-main); color: var(--green-main); background: var(--green-light); }
.rha-chip.active.gasto { border-color: var(--red-soft); color: var(--red-soft); background: var(--red-light); }
.rha-chip.active.stock { border-color: var(--blue-main); color: var(--blue-main); background: var(--blue-light); }

.rha-sugg { margin-top: 1.15em; display: flex; flex-direction: column; align-items: center; gap: 0.65em; }
.rha-sugg-label { font-size: 0.55em; font-weight: 700; color: var(--t3); text-transform: uppercase; letter-spacing: 0.07em; }
.rha-pills { display: grid; grid-template-columns: repeat(2, max-content); gap: 0.5em 0.55em; justify-content: center; max-width: 32em; }
.rha-pill {
  display: inline-flex; align-items: center; gap: 0.3em;
  padding: 0.42em 0.88em; border-radius: 100px; border: 1px solid var(--border-sm);
  background: var(--bg-card); color: var(--t2); font-size: 0.59em; font-weight: 500;
}
.rha-pill svg { width: 0.9em; height: 0.9em; opacity: 0.6; stroke-width: 1.8; }

/* ---------- Últimos registros (sección) ---------- */
.rha-recent-section {
  flex: 0 0 auto; margin: 2em 1.5em 1.2em; max-width: 34em; width: 100%; align-self: center;
  display: flex; flex-direction: column; gap: 0.62em;
}
/* encabezado de sección (fuera de la card) */
.rha-recent-head {
  display: flex; align-items: baseline; justify-content: space-between;
  padding: 0 0.3em;
}
.rha-recent-title { display: flex; align-items: baseline; gap: 0.6em; min-width: 0; }
.rha-recent-head h3 { font-size: 0.73em; font-weight: 700; color: var(--t1); letter-spacing: -0.01em; margin: 0; }
.rha-recent-count { font-size: 0.5em; font-weight: 600; color: var(--t3); transition: color 0.3s ease; }
.rha-recent-count.bump { color: var(--green-main); }
.rha-recent-link { font-size: 0.59em; font-weight: 600; color: var(--t3); display: inline-flex; align-items: center; gap: 0.15em; white-space: nowrap; }
.rha-recent-link svg { width: 0.9em; height: 0.9em; stroke-width: 1.8; }

/* card blanca: solo la lista, altura según contenido */
.rha-recent {
  background: var(--bg-card); border: 1px solid var(--border-rgba);
  border-radius: var(--r-md); box-shadow: var(--shadow-sm);
  display: flex; flex-direction: column; overflow: hidden;
}
.rha-rows { display: flex; flex-direction: column; }
.rha-row {
  display: flex; align-items: center; gap: 0.75em;
  min-height: 3.25em; padding: 0.62em 0.85em; border-bottom: 1px solid var(--border-sm);
}
.rha-row:last-child { border-bottom: none; }
.rha-row.new { animation: rha-row-in 0.4s ease both, rha-row-flash 1.5s ease both; }
.rha-row-ico { width: 2.1em; height: 2.1em; border-radius: 0.45em; display: grid; place-items: center; flex-shrink: 0; }
.rha-row-ico.ingreso { background: rgba(46,125,50,0.10); }
.rha-row-ico.gasto { background: rgba(201,74,74,0.10); }
.rha-row-ico.stock { background: transparent; color: var(--t2) !important; }
.rha-row-ico svg { width: 1.05em; height: 1.05em; stroke-width: 2; }
.rha-row-main { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 0.15em; text-align: left; }
.rha-row-desc { font-size: 0.7em; font-weight: 650; color: var(--t1); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.rha-row-meta { display: flex; align-items: center; gap: 0.4em; }
.rha-row-badge { font-size: 0.5em; font-weight: 800; text-transform: uppercase; letter-spacing: 0.03em; padding: 0.18em 0.34em; border-radius: 0.22em; }
.rha-row-badge.ingreso { color: var(--green-main); background: var(--green-light); }
.rha-row-badge.gasto { color: var(--red-soft); background: var(--red-light); }
.rha-row-badge.stock { color: var(--blue-main); background: var(--blue-light); }
.rha-row-sep { color: var(--t3); opacity: 0.5; font-size: 0.6em; }
.rha-row-date { font-size: 0.6em; font-weight: 500; color: var(--t3); }
.rha-row-amt { font-size: 0.82em; font-weight: 800; white-space: nowrap; font-variant-numeric: tabular-nums; letter-spacing: -0.02em; }
.rha-row-amt.green { color: var(--green-main); }
.rha-row-amt.red { color: var(--red-soft); }
.rha-row-amt.blue { color: var(--blue-main); }

/* ---------- Flujo lateral: actividad del equipo ---------- */
.rha-team-block.tapped { animation: rha-team-tap 0.55s ease both; }
.rha-team-overlay { position: absolute; inset: 0; z-index: 20; display: flex; justify-content: flex-end; }
.rha-team-backdrop { position: absolute; inset: 0; background: rgba(18,23,20,0.42); animation: rha-backdrop-in 0.35s ease both; }
.rha-team-panel {
  position: relative; z-index: 1; width: 42%; height: 100%; overflow: hidden;
  display: flex; flex-direction: column; background: #fff; border-left: 1px solid var(--border);
  box-shadow: -0.6em 0 1.8em rgba(16,24,40,0.08); animation: rha-panel-in 0.5s cubic-bezier(0.16,1,0.3,1) both;
  text-align: left;
}
.rha-team-overlay.closing .rha-team-backdrop { animation: rha-backdrop-out 0.6s ease both; }
.rha-team-overlay.closing .rha-team-panel { animation: rha-panel-out 0.65s cubic-bezier(0.4,0,0.2,1) both; }
.rha-demo-cursor {
  position: absolute; z-index: 40; width: 1.55em; height: 1.55em;
  display: grid; place-items: center; pointer-events: none;
  color: #171717; filter: drop-shadow(0 0.12em 0.18em rgba(0,0,0,0.28));
  transition: left 0.85s cubic-bezier(0.16,1,0.3,1), top 0.85s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease;
}
.rha-demo-cursor svg { width: 1.35em; height: 1.35em; fill: #fff; stroke-width: 1.7; }
.rha-demo-cursor.team { left: 9.5%; top: 88%; }
.rha-demo-cursor.entry { left: 70%; top: 48%; }
.rha-demo-cursor.comment { left: 84%; top: 79%; }
.rha-demo-cursor.send { left: 94%; top: 90%; }
.rha-demo-cursor.closing { left: 96%; top: 90%; opacity: 0; }
.rha-demo-cursor::after {
  content: ''; position: absolute; width: 1.7em; height: 1.7em;
  border: 1px solid rgba(27,94,32,0.5); border-radius: 50%; opacity: 0;
}
.rha-demo-cursor.clicking::after { animation: rha-cursor-click 0.55s ease-out both; }
.rha-panel-head { display: flex; align-items: flex-start; gap: 0.75em; padding: 1.1em 1.2em 0.9em; border-bottom: 1px solid var(--border-sm); }
.rha-panel-close { width: 1.5em; height: 1.5em; margin-top: 0.05em; display: grid; place-items: center; color: var(--t2); flex-shrink: 0; }
.rha-panel-close svg { width: 0.9em; height: 0.9em; }
.rha-panel-heading { min-width: 0; display: flex; flex-direction: column; gap: 0.15em; }
.rha-panel-heading strong { font-size: 0.9em; font-weight: 800; color: var(--charcoal); letter-spacing: -0.025em; }
.rha-panel-heading span { font-size: 0.53em; color: var(--t3); }
.rha-panel-tabs { display: grid; grid-template-columns: 1fr 1fr; border-bottom: 1px solid var(--border-sm); }
.rha-panel-tab { min-height: 2.5em; display: flex; align-items: center; justify-content: center; gap: 0.45em; font-size: 0.62em; font-weight: 700; color: var(--t3); position: relative; }
.rha-panel-tab.active { color: var(--t1); }
.rha-panel-tab.active::after { content: ''; position: absolute; left: 1em; right: 1em; bottom: 0; height: 1px; background: var(--t1); }
.rha-panel-tab svg { width: 1em; height: 1em; }
.rha-panel-people { display: flex; gap: 0.4em; padding: 0.65em 1.2em; border-bottom: 1px solid var(--border-sm); }
.rha-person-chip { display: inline-flex; align-items: center; gap: 0.35em; padding: 0.25em 0.5em 0.25em 0.28em; border: 1px solid var(--border-sm); border-radius: 99px; font-size: 0.5em; font-weight: 650; }
.rha-panel-avatar { width: 1.85em; height: 1.85em; border-radius: 50%; display: grid; place-items: center; color: #fff; background: #805564; font-size: 0.9em; font-weight: 700; }
.rha-panel-avatar.farmer { background: #edf4ed; }
.rha-panel-avatar.max { color: #665188; background: #eee9f7; }
.rha-panel-notice { display: flex; align-items: center; gap: 0.42em; padding: 0.55em 1.25em; border-bottom: 1px solid var(--border-sm); color: var(--t3); font-size: 0.5em; }
.rha-panel-notice svg { width: 1em; height: 1em; }
.rha-activity-filters { display: grid; grid-template-columns: repeat(5, 1fr); border-bottom: 1px solid var(--border-sm); }
.rha-filter { min-height: 2.35em; display: flex; align-items: center; justify-content: center; gap: 0.25em; font-size: 0.48em; font-weight: 650; color: var(--t3); position: relative; }
.rha-filter.active { color: var(--t1); }
.rha-filter.active::after { content: ''; position: absolute; left: 0.7em; right: 0.7em; bottom: 0; height: 1px; background: var(--t1); }
.rha-filter svg { width: 0.9em; height: 0.9em; }
.rha-panel-view { min-height: 0; flex: 1; display: flex; flex-direction: column; animation: rha-view-in 0.32s ease both; }
.rha-activity-day { padding: 0.55em 1.2em 0.3em; font-size: 0.48em; font-weight: 700; color: var(--t3); }
.rha-activity-list { min-height: 0; overflow: hidden; }
.rha-activity-entry { display: flex; align-items: center; gap: 0.6em; padding: 0.72em 1.2em; border-bottom: 1px solid var(--border-sm); transition: background 0.2s, transform 0.2s; }
.rha-activity-entry.selected { background: var(--green-light); transform: translateX(-0.15em); }
.rha-activity-entry .rha-panel-avatar { width: 2.1em; height: 2.1em; flex-shrink: 0; font-size: 0.55em; }
.rha-entry-copy { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 0.16em; }
.rha-entry-line { font-size: 0.56em; color: var(--t3); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.rha-entry-line b { color: var(--t1); font-weight: 750; }
.rha-entry-desc { font-size: 0.49em; color: var(--t3); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.rha-entry-time { font-size: 0.43em; color: var(--t3); flex-shrink: 0; }
.rha-detail-body {
  padding: 0.9em 1.2em 1.1em;
  display: flex; flex-direction: column; gap: 0.82em;
  overflow: hidden;
}
.rha-back-link { display: inline-flex; align-items: center; gap: 0.3em; font-size: 0.52em; font-weight: 700; color: var(--t2); }
.rha-back-link svg { width: 0.9em; height: 0.9em; }
.rha-detail-actor { display: flex; align-items: center; gap: 0.55em; }
.rha-detail-actor .rha-panel-avatar { width: 2.15em; height: 2.15em; font-size: 0.58em; }
.rha-detail-actor-copy { display: flex; flex-direction: column; gap: 0.12em; }
.rha-detail-actor-copy b { font-size: 0.6em; }
.rha-detail-actor-copy span { font-size: 0.47em; color: var(--t3); }
.rha-change-card { padding: 0.9em; border-radius: 0.72em; background: #f8efe5; border: 1px solid #efd9cd; }
.rha-change-card-top { display: flex; align-items: center; gap: 0.55em; }
.rha-change-icon { width: 1.8em; height: 1.8em; border-radius: 0.5em; display: grid; place-items: center; background: #fff; color: var(--red-soft); }
.rha-change-icon svg { width: 0.9em; height: 0.9em; }
.rha-change-label { display: flex; flex-direction: column; gap: 0.08em; }
.rha-change-label small { font-size: 0.42em; font-weight: 800; color: var(--t3); }
.rha-change-label b { font-size: 0.6em; }
.rha-change-amount { margin-top: 0.35em; font-size: 1em; font-weight: 850; color: var(--red-soft); }
.rha-detail-section-title { font-size: 0.45em; font-weight: 800; color: var(--t3); text-transform: uppercase; }
.rha-detail-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.72em 1em; }
.rha-detail-field {
  min-height: 2.35em; padding: 0.55em 0.12em 0.3em;
  border-top: 1px solid var(--border-sm);
  display: flex; flex-direction: column; gap: 0.24em;
}
.rha-detail-field small { font-size: 0.4em; font-weight: 750; color: var(--t3); text-transform: uppercase; }
.rha-detail-field b { font-size: 0.49em; color: var(--t1); }
.rha-detail-note { padding: 0.68em 0; border-top: 1px solid var(--border-sm); border-bottom: 1px solid var(--border-sm); font-size: 0.49em; line-height: 1.5; color: var(--t3); }
.rha-detail-actions { display: flex; flex-wrap: wrap; gap: 0.5em; margin-top: 0.08em; }
.rha-detail-btn { height: 2.35em; padding: 0 0.8em; display: inline-flex; align-items: center; gap: 0.35em; border: 1px solid var(--border); border-radius: 0.55em; background: #fff; font-size: 0.5em; font-weight: 700; }
.rha-detail-btn.dark { color: #fff; background: #262626; border-color: #262626; }
.rha-detail-btn.danger { color: var(--red-soft); }
.rha-detail-btn.tapped { animation: rha-button-tap 0.55s ease both; }
.rha-detail-btn svg { width: 0.95em; height: 0.95em; }
.rha-chat-head { display: flex; align-items: flex-start; justify-content: space-between; padding: 1.1em 1.2em 0.9em; border-bottom: 1px solid var(--border-sm); }
.rha-chat-member { display: flex; align-items: center; gap: 0.55em; padding: 0.72em 1.2em; border-bottom: 1px solid var(--border-sm); }
.rha-chat-member .rha-panel-avatar { width: 2.1em; height: 2.1em; font-size: 0.58em; }
.rha-chat-thread { flex: 1; min-height: 0; padding: 0.7em 1.2em; display: flex; flex-direction: column; gap: 0.55em; overflow: hidden; }
.rha-chat-message { display: flex; align-items: flex-start; gap: 0.48em; }
.rha-chat-message .rha-panel-avatar { width: 1.8em; height: 1.8em; font-size: 0.5em; flex-shrink: 0; }
.rha-message-copy { display: flex; flex-direction: column; gap: 0.1em; }
.rha-message-copy b { font-size: 0.53em; }
.rha-message-copy > span:not(.rha-chat-record) { font-size: 0.49em; color: var(--t2); }
.rha-chat-message.outgoing { justify-content: flex-start; animation: rha-view-in 0.35s ease both; }
.rha-chat-message.outgoing .rha-message-copy { max-width: 86%; padding: 0; background: transparent; }
.rha-chat-message.reply { animation: rha-reply-in 0.42s cubic-bezier(0.16,1,0.3,1) both; }
.rha-chat-message.reply .rha-message-copy { max-width: 82%; padding: 0; background: transparent; }
.rha-chat-record { margin-top: auto; padding: 0.55em 0.65em; display: flex; align-items: center; gap: 0.5em; border: 1px solid var(--border-sm); border-radius: 0.65em; }
.rha-chat-record.embedded { width: 100%; min-width: 18em; margin-top: 0.38em; background: #fff; }
.rha-chat-record-copy { flex: 1; display: flex; flex-direction: column; gap: 0.08em; }
.rha-chat-record-copy b { font-size: 0.5em; }
.rha-chat-record-copy span { font-size: 0.43em; color: var(--t3); }
.rha-chat-compose { padding: 0.65em 1.2em 0.85em; border-top: 1px solid var(--border-sm); }
.rha-chat-input { min-height: 3.7em; padding: 0.55em; border-radius: 0.75em; background: var(--beige-bg); display: flex; flex-direction: column; }
.rha-chat-typed { min-height: 1.3em; font-size: 0.53em; color: var(--t2); }
.rha-chat-input-foot { margin-top: auto; display: flex; align-items: center; justify-content: flex-end; gap: 0.4em; }
.rha-chat-tool { width: 2em; height: 2em; display: grid; place-items: center; border-radius: 0.5em; background: #fff; color: var(--t3); }
.rha-chat-tool svg { width: 0.95em; height: 0.95em; }
.rha-chat-send {
  height: 3.85em; padding: 0 1.35em;
  display: inline-flex; align-items: center; gap: 0.62em;
  border-radius: 1em; background: #282828; color: #fff;
  font-size: 0.52em; font-weight: 700;
}
.rha-chat-send svg { width: 1.5em; height: 1.5em; }

/* ---------- Keyframes ---------- */
@keyframes rha-blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
@keyframes rha-ph-in { from { opacity: 0; transform: translateY(0.5em); } to { opacity: 1; transform: none; } }
@keyframes rha-send-pop { 0% { transform: scale(0.9); } 50% { transform: scale(1.06); } 100% { transform: scale(1); } }
@keyframes rha-badge-pulse { 0% { transform: scale(1); } 40% { transform: scale(1.18); background: var(--green-main); color: #fff; } 100% { transform: scale(1); } }
@keyframes rha-row-in { from { opacity: 0; transform: translateY(-0.5em); } to { opacity: 1; transform: none; } }
@keyframes rha-row-flash { 0% { background: var(--flash, transparent); } 100% { background: transparent; } }
@keyframes rha-mobile-card-in {
  from { opacity: 0; transform: translateY(0.8em) scale(0.97); }
  to { opacity: 1; transform: none; }
}
@keyframes rha-backdrop-in { from { opacity: 0; } to { opacity: 1; } }
@keyframes rha-panel-in { from { transform: translateX(100%); } to { transform: none; } }
@keyframes rha-backdrop-out { from { opacity: 1; } to { opacity: 0; } }
@keyframes rha-panel-out { from { transform: none; opacity: 1; } to { transform: translateX(100%); opacity: 0.92; } }
@keyframes rha-view-in { from { opacity: 0; transform: translateX(0.5em); } to { opacity: 1; transform: none; } }
@keyframes rha-reply-in { from { opacity: 0; transform: translateY(0.55em); } to { opacity: 1; transform: none; } }
@keyframes rha-team-tap { 0%,100% { transform: scale(1); } 45% { transform: scale(0.96); background: var(--green-light); } }
@keyframes rha-button-tap { 0%,100% { transform: scale(1); } 45% { transform: scale(0.94); background: var(--green-light); border-color: var(--green-main); } }
@keyframes rha-cursor-click { 0% { opacity: 0; transform: scale(0.35); } 35% { opacity: 1; } 100% { opacity: 0; transform: scale(1.25); } }
@keyframes rha-sticker-float {
  0%,100% { transform: translateY(0) rotate(var(--tilt)); }
  50% { transform: translateY(-7px) rotate(calc(var(--tilt) + 2deg)); }
}

/* ---------- Mobile: pieza dedicada, solo el input animado ---------- */
@media (max-width: 768px) {
  .rha-outer {
    left: 0;
    width: 100%;
    translate: none;
  }
  .rha-browser-bar { display: none; }
  .rha-sticker { display: none; }
  .rha-frame {
    font-size: clamp(11px, 3vw, 14px) !important;
    aspect-ratio: 4 / 3;
    border-radius: 1.3em;
    background: transparent;
    border: 0;
    box-shadow: none;
  }
  .rha-sidebar,
  .rha-topbar,
  .rha-qe-title,
  .rha-qe-sub,
  .rha-chips,
  .rha-sugg,
  .rha-recent-section,
  .rha-team-overlay,
  .rha-demo-cursor { display: none; }
  .rha-main {
    width: 100%;
    height: 100%;
    margin: 0;
    justify-content: center;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 1.55em;
    box-shadow: 0 0.6em 1.8em rgba(16,24,40,0.06);
  }
  .rha-center {
    flex: 1 1 auto;
    justify-content: center;
    align-items: stretch;
    width: 100%;
    max-width: none;
    padding: 1.45em 1.45em 1.35em;
  }
  .rha-mobile-intro {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    order: 1;
    text-align: left;
  }
  .rha-mobile-title {
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 1.48em;
    line-height: 1.05;
    font-weight: 800;
    color: var(--t1);
    letter-spacing: -0.045em;
  }
  .rha-mobile-sub {
    margin-top: 0.32em;
    font-size: 0.83em;
    color: var(--t3);
  }
  .rha-mobile-prompt {
    margin-top: 1.35em;
    font-size: 0.86em;
    color: var(--t3);
  }
  .rha-chips {
    display: flex;
    order: 2;
    justify-content: flex-start;
    gap: 0.55em;
    margin-top: 0.72em;
  }
  .rha-chip {
    height: 2.75em;
    padding: 0 0.9em;
    border-radius: 0.72em;
    background: var(--bg-card);
    font-size: 0.82em;
    color: var(--t3);
  }
  .rha-input-shell {
    order: 3;
    height: 3.55em;
    margin: 1.05em 0 0;
    border-radius: 1.35em;
    padding: 0.25em 0.38em 0.25em 0.82em;
    box-shadow: 0 0.55em 1.5em rgba(16,24,40,0.07);
  }
  .rha-typed,
  .rha-placeholder { font-size: 0.86em; }
  .rha-placeholder > span { display: none; }
  .rha-placeholder::after { content: 'Describí una actividad...'; }
  .rha-desktop-mic { display: none; }
  .rha-mobile-plus { display: block; }
  .rha-mic {
    width: 2.15em; height: 2.15em;
    margin-right: 0.15em;
    background: #f1f2f2;
    color: var(--t2);
    border: 1px solid var(--border);
  }
  .rha-mobile-voice {
    width: 2.1em; height: 2.1em;
    display: grid; place-items: center;
    color: var(--t3); flex-shrink: 0;
  }
  .rha-mobile-voice svg { width: 1.05em; height: 1.05em; stroke-width: 1.8; }
  .rha-send {
    width: 2.75em; height: 2.75em;
    border-radius: 50%;
    background: #242424;
    box-shadow: 0 0.45em 1em rgba(0,0,0,0.22);
  }
  .rha-mobile-result {
    order: 4;
    display: flex;
    align-items: center;
    gap: 0.75em;
    min-height: 4.2em;
    margin-top: 0.85em;
    padding: 0.68em 0.8em;
    border: 1px solid var(--border-sm);
    border-radius: 1em;
    background: var(--bg-card);
    box-shadow: 0 0.5em 1.4em rgba(16,24,40,0.06);
    text-align: left;
    animation: rha-mobile-card-in 0.45s cubic-bezier(0.16,1,0.3,1) both;
  }
  .rha-mobile-result-icon {
    width: 2.45em; height: 2.45em; border-radius: 0.72em;
    display: grid; place-items: center; flex-shrink: 0;
  }
  .rha-mobile-result-icon.ingreso { color: var(--green-main); background: var(--green-light); }
  .rha-mobile-result-icon.gasto { color: var(--red-soft); background: var(--red-light); }
  .rha-mobile-result-icon.stock { color: var(--blue-main); background: var(--blue-light); }
  .rha-mobile-result-icon svg { width: 1.15em; height: 1.15em; stroke-width: 2; }
  .rha-mobile-result-copy { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 0.25em; }
  .rha-mobile-result-title { font-size: 0.86em; font-weight: 700; color: var(--t1); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .rha-mobile-result-meta { display: flex; align-items: center; gap: 0.42em; }
  .rha-mobile-result-amount { font-size: 0.9em; font-weight: 800; white-space: nowrap; }
  .rha-mobile-result-amount.ingreso { color: var(--green-main); }
  .rha-mobile-result-amount.gasto { color: var(--red-soft); }
  .rha-mobile-result-amount.stock { color: var(--blue-main); }
}

/* ---------- Reduced motion ---------- */
@media (prefers-reduced-motion: reduce) {
  .rha-cursor, .rha-send.success, .rha-item .rha-badge.pulse,
  .rha-recent-count.bump, .rha-row.new, .rha-placeholder > span,
  .rha-mobile-result, .rha-team-backdrop, .rha-team-panel, .rha-panel-view,
  .rha-team-block.tapped, .rha-detail-btn.tapped,
  .rha-chat-message.reply, .rha-demo-cursor::after,
  .rha-sticker { animation: none !important; }
  .rha-demo-cursor { transition: none !important; }
}
`;

// --- Sub-componente: fila de registro ----------------------------------------
function RecentRow({ row }) {
  const { Icon, color, flash } = ROW_ICON[row.type];
  const amountClass = row.type === 'ingreso' ? 'green' : row.type === 'gasto' ? 'red' : 'blue';
  return (
    <div className={'rha-row' + (row.isNew ? ' new' : '')} style={{ '--flash': flash }}>
      <div className={'rha-row-ico ' + row.type} style={{ color }}>
        <Icon />
      </div>
      <div className="rha-row-main">
        <div className="rha-row-desc">{row.title}</div>
        <div className="rha-row-meta">
          <span className={'rha-row-badge ' + row.type}>{row.badge}</span>
          <span className="rha-row-sep">•</span>
          <span className="rha-row-date">{row.date}</span>
        </div>
      </div>
      <div className={'rha-row-amt ' + amountClass}>{row.rowAmount}</div>
    </div>
  );
}

const TEAM_EVENTS = [
  { actor: 'Matias (tú)', kind: 'Stock', desc: 'Agregó 8 bolsas de ración al stock', time: '22:12', avatar: 'M' },
  { actor: 'Max', kind: 'Editó gasto', desc: 'Cambió Veterinaria de $1.200 a $500', time: '21:25', avatar: 'M', target: true },
  { actor: 'Nahuel', kind: 'Ingreso', desc: 'Registró una venta de lana por US$ 620', time: '21:14', avatar: '🧑‍🌾' },
  { actor: 'Matias (tú)', kind: 'Gasto', desc: 'Registró combustible por $3.500', time: '20:48', avatar: 'M' },
  { actor: 'Max', kind: 'Nota', desc: 'Actualizó la nota del proyecto Alambrado norte', time: '20:31', avatar: 'M' },
];

function PanelPeople() {
  return (
    <div className="rha-panel-people">
      <span className="rha-person-chip"><span className="rha-panel-avatar">M</span> Matias (tú)</span>
      <span className="rha-person-chip"><span className="rha-panel-avatar farmer">🧑‍🌾</span> Nahuel</span>
      <span className="rha-person-chip"><span className="rha-panel-avatar max">M</span> Max</span>
    </div>
  );
}

function TeamFlowPanel({ flow, chatTyped, chatSent }) {
  const activitySelected = flow === 'activityTap';
  const detailTapped = flow === 'detailTap';

  const commonHeader = (
    <>
      <div className="rha-panel-head">
        <span className="rha-panel-close"><X /></span>
        <span className="rha-panel-heading">
          <strong>Actividad del equipo</strong>
          <span>Acciones y cambios realizados en El ceibo.</span>
        </span>
      </div>
      <PanelPeople />
    </>
  );

  return (
    <div className={'rha-team-overlay' + (flow === 'closing' ? ' closing' : '')}>
      <div className="rha-team-backdrop" />
      <aside className="rha-team-panel">
        {(flow === 'activity' || flow === 'activityTap') && (
          <div className="rha-panel-view" key="activity">
            <div className="rha-panel-head">
              <span className="rha-panel-close"><X /></span>
              <span className="rha-panel-heading">
                <strong>Actividad del equipo</strong>
                <span>Acciones y cambios realizados en El ceibo.</span>
              </span>
            </div>
            <div className="rha-panel-tabs">
              <span className="rha-panel-tab active"><ListChecks /> Actividad</span>
              <span className="rha-panel-tab"><MessageSquare /> Chats</span>
            </div>
            <PanelPeople />
            <div className="rha-panel-notice"><LockKeyhole /> Historial visible para el dueño y las personas que autorice.</div>
            <div className="rha-activity-filters">
              <span className="rha-filter active"><ListChecks /> Todos</span>
              <span className="rha-filter"><WalletCards /> Gastos</span>
              <span className="rha-filter"><ArrowUpRight /> Ingresos</span>
              <span className="rha-filter"><Package /> Stock</span>
              <span className="rha-filter"><StickyNote /> Notas</span>
            </div>
            <span className="rha-activity-day">Hoy</span>
            <div className="rha-activity-list">
              {TEAM_EVENTS.map((event, index) => (
                <div className={'rha-activity-entry' + (activitySelected && event.target ? ' selected' : '')} key={index}>
                  <span className={'rha-panel-avatar' + (event.actor === 'Max' ? ' max' : event.actor === 'Nahuel' ? ' farmer' : '')}>{event.avatar}</span>
                  <span className="rha-entry-copy">
                    <span className="rha-entry-line"><b>{event.actor}</b> · {event.kind}</span>
                    <span className="rha-entry-desc">{event.desc}</span>
                  </span>
                  <span className="rha-entry-time">{event.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {(flow === 'detail' || flow === 'detailTap') && (
          <div className="rha-panel-view" key="detail">
            {commonHeader}
            <div className="rha-detail-body">
              <span className="rha-back-link"><ChevronLeft /> Volver a la actividad</span>
              <div className="rha-detail-actor">
                <span className="rha-panel-avatar max">M</span>
                <span className="rha-detail-actor-copy"><b>Max</b><span>Hoy · 21:25</span></span>
              </div>
              <div className="rha-change-card">
                <div className="rha-change-card-top">
                  <span className="rha-change-icon"><WalletCards /></span>
                  <span className="rha-change-label"><small>GASTO · CAMBIO</small><b>Veterinaria</b></span>
                </div>
                <div className="rha-change-amount">− $ 500</div>
              </div>
              <span className="rha-detail-section-title">Información del movimiento</span>
              <div className="rha-detail-grid">
                <span className="rha-detail-field"><small>Fecha</small><b>Hoy, 21:25</b></span>
                <span className="rha-detail-field"><small>Tipo</small><b>Gasto</b></span>
                <span className="rha-detail-field"><small>Categoría</small><b>Veterinaria</b></span>
                <span className="rha-detail-field"><small>Moneda</small><b>UYU</b></span>
              </div>
              <div className="rha-detail-note"><b>Nota:</b> Se corrigió el importe cargado originalmente de $1.200 a $500.</div>
              <div className="rha-detail-actions">
                <span className="rha-detail-btn dark"><ExternalLink /> Ver registro</span>
                <span className="rha-detail-btn danger"><RotateCcw /> Revertir cambio</span>
                <span className={'rha-detail-btn' + (detailTapped ? ' tapped' : '')}><MessageSquare /> Comentar</span>
              </div>
            </div>
          </div>
        )}

        {(flow === 'chat' || flow === 'chatReply' || flow === 'closing') && (
          <div className="rha-panel-view" key="chat">
            <div className="rha-chat-head">
              <span className="rha-panel-heading"><strong>Conversación con Max</strong><span>Consultá un cambio con un integrante del equipo.</span></span>
              <span className="rha-panel-close"><X /></span>
            </div>
            <div className="rha-chat-member">
              <span className="rha-panel-avatar max">M</span>
              <span className="rha-detail-actor-copy"><b>Max</b><span>Integrante del equipo</span></span>
            </div>
            <div className="rha-chat-thread">
              <div className="rha-chat-message">
                <span className="rha-panel-avatar max">M</span>
                <span className="rha-message-copy"><b>Max</b><span>Actualicé el gasto de veterinaria.</span></span>
              </div>
              {chatSent && (
                <div className="rha-chat-message outgoing">
                  <span className="rha-panel-avatar">M</span>
                  <span className="rha-message-copy">
                    <b>Matias (tú)</b>
                    <span>Max, ¿por qué cambiaste el registro de veterinaria a $500?</span>
                    <span className="rha-chat-record embedded">
                      <span className="rha-change-icon"><WalletCards /></span>
                      <span className="rha-chat-record-copy"><b>Gasto · Veterinaria</b><span>− $500 · Hoy, 21:25</span></span>
                      <ChevronRight />
                    </span>
                  </span>
                </div>
              )}
              {(flow === 'chatReply' || flow === 'closing') && (
                <div className="rha-chat-message reply">
                  <span className="rha-panel-avatar max">M</span>
                  <span className="rha-message-copy"><b>Max</b><span>Lo corregí porque el comprobante final era por $500. El importe anterior estaba duplicado.</span></span>
                </div>
              )}
              {!chatSent && (
                <div className="rha-chat-record">
                  <span className="rha-change-icon"><WalletCards /></span>
                  <span className="rha-chat-record-copy"><b>Gasto · Veterinaria</b><span>− $500 · Hoy, 21:25</span></span>
                  <ChevronRight />
                </div>
              )}
            </div>
            <div className="rha-chat-compose">
              <div className="rha-chat-input">
                <span className="rha-chat-typed">{chatTyped || (chatSent ? '' : 'Escribí tu mensaje...')}{chatTyped && <span className="rha-cursor" />}</span>
                <span className="rha-chat-input-foot">
                  <span className="rha-chat-tool"><Paperclip /></span>
                  <span className="rha-chat-send"><Send /> Enviar</span>
                </span>
              </div>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}

// --- Componente principal ----------------------------------------------------
const BlogRuralitHeroAnimation = () => {
  const frameRef = useRef(null);
  const idxRef = useRef(0);
  const runCycleRef = useRef(null);
  const timersRef = useRef([]);
  const startedRef = useRef(false);
  const reduceRef = useRef(
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  const [typed, setTyped] = useState('');
  const [activeChip, setActiveChip] = useState(null);
  const [sendState, setSendState] = useState('idle');
  const [focused, setFocused] = useState(false);
  const [rows, setRows] = useState(SEED_ROWS);
  const [stock, setStock] = useState(INITIAL_STOCK);
  const [stockPulse, setStockPulse] = useState(false);
  const [today, setToday] = useState(INITIAL_TODAY);
  const [todayBump, setTodayBump] = useState(false);
  const [phIdx, setPhIdx] = useState(0);
  const [mobileResult, setMobileResult] = useState(null);
  const [teamFlow, setTeamFlow] = useState('closed');
  const [teamTap, setTeamTap] = useState(false);
  const [chatTyped, setChatTyped] = useState('');
  const [chatSent, setChatSent] = useState(false);

  const schedule = useCallback((fn, ms) => {
    const id = setTimeout(fn, ms);
    timersRef.current.push(id);
    return id;
  }, []);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  // Escala tipográfica fija en píxeles según el ancho real del frame.
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const update = () => {
      const w = frame.clientWidth;
      if (w > 0) frame.style.fontSize = (w * 0.016) + 'px';
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(frame);
    return () => ro.disconnect();
  }, []);

  // Rotación de placeholder cuando el input está vacío (no en reduced motion).
  useEffect(() => {
    if (reduceRef.current) return;
    if (typed !== '') return;
    const id = setInterval(() => setPhIdx((i) => (i + 1) % PLACEHOLDERS.length), 2400);
    return () => clearInterval(id);
  }, [typed]);

  // Limpieza al desmontar.
  useEffect(() => () => clearTimers(), [clearTimers]);

  const typeText = useCallback((text, speed, done) => {
    let i = 0;
    const tick = () => {
      i += 1;
      setTyped(text.slice(0, i));
      if (i < text.length) schedule(tick, speed);
      else done && done();
    };
    tick();
  }, [schedule]);

  const deleteText = useCallback((text, speed, done) => {
    let i = text.length;
    const tick = () => {
      i -= 1;
      setTyped(text.slice(0, Math.max(0, i)));
      if (i > 0) schedule(tick, speed);
      else done && done();
    };
    tick();
  }, [schedule]);

  const typeChatText = useCallback((text, speed, done) => {
    let i = 0;
    const tick = () => {
      i += 1;
      setChatTyped(text.slice(0, i));
      if (i < text.length) schedule(tick, speed);
      else done && done();
    };
    tick();
  }, [schedule]);

  const applyRegistro = useCallback((r) => {
    setMobileResult({ ...r, uid: 'm' + Date.now() });
    setRows((prev) => {
      const next = [{ uid: 'c' + Date.now() + Math.random().toString(36).slice(2, 6), isNew: true, ...r }, ...prev];
      return next.slice(0, 3);
    });
    schedule(() => setRows((prev) => prev.map((row) => ({ ...row, isNew: false }))), 900);

    setToday((t) => (t + 1) % 24);
    setTodayBump(true);
    schedule(() => setTodayBump(false), 850);

    if (r.type === 'stock' && r.stockDelta) {
      setStock((s) => s + r.stockDelta);
      setStockPulse(true);
      schedule(() => setStockPulse(false), 800);
    }
  }, [schedule]);

  const startTeamFlow = useCallback(() => {
    const question = 'Max, ¿por qué cambiaste el registro de veterinaria a $500?';
    setTeamTap(true);
    schedule(() => {
      setTeamTap(false);
      setTeamFlow('activity');
      schedule(() => {
        setTeamFlow('activityTap');
        schedule(() => {
          setTeamFlow('detail');
          schedule(() => {
            setTeamFlow('detailTap');
            schedule(() => {
              setTeamFlow('chat');
              setChatTyped('');
              setChatSent(false);
              schedule(() => {
                typeChatText(question, 34, () => {
                  schedule(() => {
                    setChatTyped('');
                    setChatSent(true);
                    schedule(() => {
                      setTeamFlow('chatReply');
                      schedule(() => {
                        setTeamFlow('closing');
                        schedule(() => {
                          setTeamFlow('closed');
                          setChatSent(false);
                          schedule(() => runCycleRef.current && runCycleRef.current(), 850);
                        }, 680);
                      }, 2400);
                    }, 900);
                  }, 450);
                });
              }, 900);
            }, 550);
          }, 2600);
        }, 550);
      }, 2600);
    }, 520);
  }, [schedule, typeChatText]);

  const runCycle = useCallback(() => {
    const r = REGISTROS[idxRef.current];
    setActiveChip(r.type);
    setFocused(true);
    typeText(r.text, 38, () => {
      setSendState('ready');
      schedule(() => {
        setSendState('success');
        schedule(() => {
          applyRegistro(r);
          schedule(() => {
            deleteText(r.text, 28, () => {
              setSendState('idle');
              setActiveChip(null);
              setFocused(false);
              const completedLoop = idxRef.current === REGISTROS.length - 1;
              idxRef.current = (idxRef.current + 1) % REGISTROS.length;
              if (completedLoop && frameRef.current && frameRef.current.clientWidth > 768) {
                schedule(startTeamFlow, 850);
              } else {
                schedule(runCycle, 750);
              }
            });
          }, 620);
        }, 520);
      }, 480);
    });
  }, [applyRegistro, deleteText, schedule, startTeamFlow, typeText]);

  runCycleRef.current = runCycle;

  // Arranca el ciclo cuando el frame es visible (y hay movimiento permitido).
  useEffect(() => {
    if (reduceRef.current) return;
    const frame = frameRef.current;
    if (!frame) return;
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !startedRef.current) {
        startedRef.current = true;
        io.disconnect();
        schedule(runCycle, 900);
      }
    }, { threshold: 0.25 });
    io.observe(frame);
    return () => {
      io.disconnect();
      startedRef.current = false;
      clearTimers();
    };
  }, [runCycle, schedule, clearTimers]);

  const chipClass = (type) => 'rha-chip ' + (activeChip === type ? 'active ' + type : '');
  const MobileResultIcon = mobileResult ? ROW_ICON[mobileResult.type].Icon : null;
  const cursorPhase = teamTap
    ? 'team'
    : (teamFlow === 'activity' || teamFlow === 'activityTap')
      ? 'entry'
      : (teamFlow === 'detail' || teamFlow === 'detailTap')
        ? 'comment'
        : (teamFlow === 'chat' || teamFlow === 'chatReply')
          ? 'send'
          : 'closing';
  const cursorClicking = teamTap || teamFlow === 'activityTap' || teamFlow === 'detailTap' || (teamFlow === 'chat' && chatSent);

  return (
    <>
      <style>{styles}</style>
      <div className="rha-outer">
        <span className="rha-sticker tractor" aria-hidden="true"><Tractor /></span>
        <span className="rha-sticker notes" aria-hidden="true"><NotebookPen /></span>
        <span className="rha-sticker stock" aria-hidden="true"><Package /></span>
        <span className="rha-sticker wheat" aria-hidden="true"><Wheat /></span>
        <span className="rha-browser-bar" aria-hidden="true">
          <span className="rha-browser-controls">
            <span className="rha-browser-dot red" />
            <span className="rha-browser-dot yellow" />
            <span className="rha-browser-dot green" />
          </span>
          <span className="rha-browser-address"><LockKeyhole /> ruralit.site</span>
          <span className="rha-browser-tools">•••</span>
        </span>
        <div className="rha-frame" ref={frameRef} aria-hidden="true">
         <div className="rha-stage">
          {/* ---------- Sidebar ---------- */}
          <aside className="rha-sidebar">
            <div className="rha-side-top">
              <div className="rha-brand">ruralit<span className="rha-dot">.</span></div>
              <span className="rha-collapse"><PanelLeftClose /></span>
            </div>

            <div className="rha-nav">
              <div className="rha-nav-group">
                <div className="rha-nav-label">Navegación</div>
                <div className="rha-item active"><Home /> Inicio</div>
              </div>
              <div className="rha-nav-group">
                <div className="rha-nav-label">Gestión de datos</div>
                <div className="rha-item"><BookOpen /> Movimientos</div>
                <div className="rha-item">
                  <Package /> Stock
                  <span className={'rha-badge' + (stockPulse ? ' pulse' : '')}>{stock}</span>
                </div>
                <div className="rha-item"><BarChart2 /> Balances</div>
                <div className="rha-item"><Folder /> Proyectos</div>
                <div className="rha-item"><FileText /> Reportes</div>
              </div>
            </div>

            <div className="rha-side-foot">
              <div className="rha-est">
                <div className="rha-est-av"><Building2 /></div>
                <div className="rha-est-main">
                  <span className="rha-est-name">El ceibo</span>
                </div>
                <ChevronRight className="rha-est-chevron" />
              </div>
              <div className="rha-item rha-side-settings"><Settings /> Ajustes</div>
              <div className={'rha-team-block' + (teamTap ? ' tapped' : '')}>
                <div className="rha-team-copy">
                  <span className="rha-team-block-title">Actividad del equipo</span>
                  <span className="rha-team-role">DUEÑO</span>
                </div>
                <div className="rha-team-avatars">
                  <span className="rha-team-avatar">J</span>
                  <span className="rha-team-avatar emoji">🧑‍🌾</span>
                  <span className="rha-team-avatar">M</span>
                  <span className="rha-team-online" />
                </div>
              </div>
            </div>
          </aside>

          {/* ---------- Main ---------- */}
          <main className="rha-main">
            {/* Header del dashboard */}
            <header className="rha-topbar">
              <div className="rha-tb-left">
                <div className="rha-tb-context">
                  <span className="rha-tb-name">EL CEIBO</span>
                  <span className="rha-tb-role">Dueño</span>
                </div>
                <h1 className="rha-h1">Buenas noches, Matias</h1>
                <div className="rha-sub">Registro rápido del establecimiento</div>
              </div>
              <div className="rha-actions">
                <button type="button" className="rha-tbtn" tabIndex={-1}>
                  <FileSpreadsheet className="green" /> Importar
                </button>
                <button type="button" className="rha-tbtn" tabIndex={-1}>
                  <ArrowDownRight className="red" /> Gasto
                </button>
                <button type="button" className="rha-tbtn" tabIndex={-1}>
                  <ArrowUpRight className="green" /> Ingreso
                </button>
                <button type="button" className="rha-bell" tabIndex={-1} aria-label="Notificaciones">
                  <Bell />
                  <span className="rha-bell-dot" />
                </button>
              </div>
            </header>

            {/* Bloque de registro rápido */}
            <div className="rha-center">
              <div className="rha-mobile-intro">
                <strong className="rha-mobile-title">¿Qué pasó hoy?</strong>
                <span className="rha-mobile-sub">Registro rápido del establecimiento</span>
                <span className="rha-mobile-prompt">Podés escribir:</span>
              </div>
              <h2 className="rha-qe-title">Anotá lo que pasó en tu establecimiento</h2>
              <div className="rha-qe-sub">Registrá una venta, compra, gasto o stock.</div>

              <div className={'rha-input-shell' + (focused ? ' focused' : '')}>
                <span className="rha-mic"><Mic className="rha-desktop-mic" /><Plus className="rha-mobile-plus" /></span>
                <div className="rha-input-area">
                  {typed ? (
                    <span className="rha-typed">{typed}<span className="rha-cursor" /></span>
                  ) : (
                    <span className="rha-placeholder" key={phIdx}>
                      <span>{PLACEHOLDERS[phIdx]}</span>
                    </span>
                  )}
                </div>
                <span className="rha-mobile-voice"><Mic /></span>
                <span className={'rha-send ' + sendState}>
                  {sendState === 'success' ? <Check /> : <Send />}
                </span>
              </div>

              {mobileResult && (
                <div className="rha-mobile-result" key={mobileResult.uid}>
                  <span className={'rha-mobile-result-icon ' + mobileResult.type}><MobileResultIcon /></span>
                  <span className="rha-mobile-result-copy">
                    <span className="rha-mobile-result-title">{mobileResult.title}</span>
                    <span className="rha-mobile-result-meta">
                      <span className={'rha-row-badge ' + mobileResult.type}>{mobileResult.badge}</span>
                      <span className="rha-row-sep">•</span>
                      <span className="rha-row-date">{mobileResult.date}</span>
                    </span>
                  </span>
                  <span className={'rha-mobile-result-amount ' + mobileResult.type}>{mobileResult.rowAmount}</span>
                </div>
              )}

              {/* Chips debajo del input */}
              <div className="rha-chips">
                <span className={chipClass('ingreso')}><ArrowUpRight /> Ingreso</span>
                <span className={chipClass('gasto')}><ArrowDownRight /> Gasto</span>
                <span className={chipClass('stock')}><Package /> Stock</span>
              </div>

              <div className="rha-sugg">
                <span className="rha-sugg-label">Probá escribir algo como</span>
                <div className="rha-pills">
                  {PILLS.map((p) => (
                    <span className="rha-pill" key={p}><CornerDownRight /> {p}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Últimos registros (encabezado de sección + card con la lista) */}
            <div className="rha-recent-section">
              <div className="rha-recent-head">
                <div className="rha-recent-title">
                  <h3>Últimos registros</h3>
                </div>
                <span className="rha-recent-link">Ver todos <ChevronRight /></span>
              </div>
              <div className="rha-recent">
                <div className="rha-rows">
                  {rows.map((row) => (
                    <RecentRow key={row.uid} row={row} />
                  ))}
                </div>
              </div>
            </div>
          </main>
          {teamFlow !== 'closed' && (
            <TeamFlowPanel flow={teamFlow} chatTyped={chatTyped} chatSent={chatSent} />
          )}
          {(teamTap || teamFlow !== 'closed') && (
            <span className={'rha-demo-cursor ' + cursorPhase + (cursorClicking ? ' clicking' : '')}><MousePointer2 /></span>
          )}
         </div>
        </div>
      </div>
    </>
  );
};

export default BlogRuralitHeroAnimation;
