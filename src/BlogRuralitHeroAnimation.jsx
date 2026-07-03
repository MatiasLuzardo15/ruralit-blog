import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  Home, BookOpen, Package, BarChart2, Folder, FileText, Settings,
  Bell, FileSpreadsheet, ArrowDownRight, ArrowUpRight, Mic, Send,
  Check, CornerDownRight, ChevronRight, PanelLeftClose, Building2, Plus
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
}
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
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: var(--bg-outer);
  border: 1px solid var(--border-rgba);
  border-radius: 1em;
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

/* ---------- Mobile: pieza dedicada, solo el input animado ---------- */
@media (max-width: 768px) {
  .rha-outer {
    left: 0;
    width: 100%;
    translate: none;
  }
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
  .rha-recent-section { display: none; }
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
  .rha-mobile-result { animation: none !important; }
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

// --- Componente principal ----------------------------------------------------
const BlogRuralitHeroAnimation = () => {
  const frameRef = useRef(null);
  const idxRef = useRef(0);
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
              idxRef.current = (idxRef.current + 1) % REGISTROS.length;
              schedule(runCycle, 750);
            });
          }, 620);
        }, 520);
      }, 480);
    });
  }, [applyRegistro, deleteText, schedule, typeText]);

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

  return (
    <>
      <style>{styles}</style>
      <div className="rha-outer">
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
              <div className="rha-team-block">
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
         </div>
        </div>
      </div>
    </>
  );
};

export default BlogRuralitHeroAnimation;
