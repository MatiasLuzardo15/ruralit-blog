import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, AreaChart, Area
} from 'recharts';

const styles = `
  .balance-section {
    background: var(--cream);
    padding: 96px 80px;
  }
  .balance-container {
    max-width: 1200px;
    margin: 0 auto;
  }
  .balance-header {
    text-align: center;
    margin-bottom: 48px;
  }
  .balance-header .eyebrow {
    display: block;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--muted);
    margin-bottom: 16px;
  }
  .balance-header h2 {
    font-size: 2.25rem;
    font-weight: 300;
    color: var(--dark);
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", system-ui, sans-serif;
  }
  .balance-subtitle {
    font-size: 1rem;
    color: var(--muted);
    margin-top: 12px;
    font-weight: 400;
    line-height: 1.5;
  }
  .balance-toggle {
    display: flex;
    gap: 6px;
    background: var(--inner);
    padding: 4px;
    border-radius: 14px;
    width: fit-content;
    margin: 0 auto 40px;
    user-select: none;
  }
  .balance-toggle button {
    padding: 10px 24px;
    border: none;
    border-radius: 11px;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    background: transparent;
    color: var(--muted);
    transition: all 0.2s;
    font-family: inherit;
    white-space: nowrap;
  }
  .balance-toggle button small {
    font-weight: 400;
    opacity: 0.6;
  }
  .balance-toggle button.active {
    background: var(--white);
    color: var(--dark);
    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  }
  .balance-toggle button.active small { opacity: 0.8; }
  .balance-view-toggle {
    display: flex;
    gap: 4px;
    justify-content: center;
    margin: -28px auto 32px;
  }
  .balance-view-toggle button {
    padding: 6px 18px;
    border: none;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 500;
    cursor: pointer;
    background: transparent;
    color: var(--muted);
    transition: all 0.2s;
    font-family: inherit;
    letter-spacing: 0.02em;
  }
  .balance-view-toggle {
    animation: chart-fade-up 0.6s ease both;
    animation-delay: 0.08s;
  }
  .balance-view-toggle button.active {
    background: var(--dark);
    color: var(--white);
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  .balance-charts-grid {
    display: grid;
    grid-template-columns: 3fr 2fr;
    gap: 24px;
    align-items: start;
  }
  .balance-chart-card {
    background: var(--white);
    border-radius: 28px;
    padding: 28px 32px 24px;
    box-shadow: 0 4px 24px rgba(14, 30, 18, 0.06);
  }
  .balance-chart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px;
  }
  .balance-chart-header h3 {
    font-size: 0.9375rem;
    font-weight: 700;
    color: var(--dark);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  .balance-chart-header span {
    font-size: 0.75rem;
    color: var(--muted);
    font-weight: 500;
  }
  .balance-chart-sub {
    font-size: 0.8125rem;
    color: var(--muted);
    margin-bottom: 16px;
    font-weight: 500;
  }
  .balance-period-label {
    text-align: center;
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid rgba(14,30,18,0.05);
    font-size: 0.8125rem;
    color: var(--muted);
    font-weight: 500;
    line-height: 1.6;
  }
  .balance-period-label strong { color: var(--dark); }
  .balance-stats {
    display: flex;
    gap: 16px;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 24px;
  }
  .balance-stat {
    background: var(--white);
    border-radius: 16px;
    padding: 14px 24px;
    min-width: 140px;
    text-align: center;
    box-shadow: 0 2px 12px rgba(14, 30, 18, 0.05);
  }
  .balance-stat-label {
    display: block;
    font-size: 0.6875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--muted);
    margin-bottom: 4px;
  }
  .balance-stat-value {
    display: block;
    font-size: 1.125rem;
    font-weight: 700;
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", system-ui, sans-serif;
  }
  .balance-note {
    margin-top: 8px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.75rem;
    color: var(--muted);
    font-weight: 500;
  }
  .balance-note svg {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
  }
  .chart-green { color: var(--agri); }
  .chart-warm { color: #E5734A; }
  .chart-sub-badge {
    margin-left: 10px;
    font-size: 0.625rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--muted);
    opacity: 0.7;
  }
  @keyframes chart-fade-up {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .balance-header { animation: chart-fade-up 0.6s ease both; }
  .balance-toggle { animation: chart-fade-up 0.6s ease both; animation-delay: 0.05s; }
  .balance-charts-grid { animation: chart-fade-up 0.6s ease both; animation-delay: 0.1s; }
  .balance-note-wrap { animation: chart-fade-up 0.6s ease both; animation-delay: 0.15s; }

  .export-section {
    background: var(--cream);
    padding: 0 80px 96px;
  }
  .export-container {
    max-width: 1200px;
    margin: 0 auto;
  }
  .export-table-wrap {
    margin-top: 40px;
    position: relative;
  }
  .export-table-hint {
    display: none;
    text-align: center;
    font-size: 0.6875rem;
    color: var(--muted);
    padding: 10px 0 2px;
    font-weight: 500;
    animation: chart-fade-up 0.4s ease;
  }
  .export-table-hint span { display: inline-block; animation: hint-arrow 1.2s ease infinite; }
  @keyframes hint-arrow {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(4px); }
  }
  .export-table-wrap.is-scrollable + .export-table-hint { display: block; }
  .export-table-wrap::-webkit-scrollbar { display: none; }
  .export-table-wrap { scrollbar-width: none; -ms-overflow-style: none; }
  .export-table {
    background: var(--white);
    border-radius: 24px;
    box-shadow: 0 4px 24px rgba(14, 30, 18, 0.06);
  }
  .export-table-head {
    display: grid;
    grid-template-columns: 36px 140px repeat(6, 1fr) 100px;
    gap: 4px;
    padding: 14px 18px;
    background: var(--cream);
    border-bottom: 1px solid rgba(14, 30, 18, 0.06);
  }
  .export-table-head .et-col {
    font-size: 0.625rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--muted);
  }
  .export-table-row {
    display: grid;
    grid-template-columns: 36px 140px repeat(6, 1fr) 100px;
    gap: 4px;
    padding: 14px 18px;
    align-items: center;
    border-bottom: 1px solid rgba(14, 30, 18, 0.04);
    transition: background 0.15s;
  }
  .export-table-row:last-child { border-bottom: none; }
  .export-table-row:hover { background: rgba(14, 30, 18, 0.02); }
  .et-col { display: flex; align-items: center; }
  .et-col.et-name {
    font-size: 0.8125rem;
    font-weight: 700;
    color: var(--dark);
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", system-ui, sans-serif;
  }
  .et-col.et-feat { justify-content: center; overflow: hidden; }
  .et-col.et-feat > span { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: inherit; }
  .et-col.et-dl { gap: 4px; justify-content: flex-end; }
  .export-btn {
    padding: 7px 16px;
    border-radius: 10px;
    border: none;
    font-size: 0.6875rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    font-family: inherit;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    background: var(--inner);
    color: var(--muted);
  }
  .export-btn.csv {
    background: rgba(46, 158, 83, 0.1);
    color: #2E9E53;
  }
  a.export-btn { text-decoration: none; display: inline-block; text-align: center; }
  .export-btn.csv:hover { background: rgba(46, 158, 83, 0.2); }
  .export-btn.pdf {
    background: rgba(229, 115, 74, 0.1);
    color: #E5734A;
  }
  .export-btn.pdf:hover { background: rgba(229, 115, 74, 0.2); }
  .export-preview {
    margin-top: 48px;
    background: var(--white);
    border-radius: 28px;
    padding: 32px 36px;
    box-shadow: 0 4px 24px rgba(14, 30, 18, 0.06);
  }
  .export-preview-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(14, 30, 18, 0.06);
  }
  .export-preview-header h3 {
    font-size: 1rem;
    font-weight: 700;
    color: var(--dark);
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", system-ui, sans-serif;
  }
  .export-preview-header .preview-badge {
    font-size: 0.6875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    background: rgba(14, 30, 18, 0.05);
    padding: 4px 12px;
    border-radius: 8px;
    color: var(--muted);
  }
  .export-preview-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }
  .export-kpi-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }
  .export-kpi {
    background: var(--cream);
    border-radius: 14px;
    padding: 14px 16px;
    text-align: center;
  }
  .export-kpi .kpi-label {
    display: block;
    font-size: 0.625rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--muted);
    margin-bottom: 4px;
  }
  .export-kpi .kpi-value {
    display: block;
    font-size: 1.125rem;
    font-weight: 700;
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", system-ui, sans-serif;
  }
  .export-chart-preview {
    display: flex;
    align-items: flex-end;
    gap: 6px;
    height: 80px;
    padding: 0 4px;
  }
  .export-chart-preview .bar {
    flex: 1;
    border-radius: 4px 4px 0 0;
    min-height: 8px;
    transition: height 0.3s;
  }
  .export-chart-preview .bar.green { background: #2E9E53; }
  .export-chart-preview .bar.warm { background: #E5734A; }
  .export-cat-bars {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .export-cat-row {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .export-cat-row .cat-label {
    font-size: 0.6875rem;
    font-weight: 600;
    color: var(--dark);
    width: 80px;
    flex-shrink: 0;
    text-align: right;
  }
  .export-cat-row .cat-bar {
    flex: 1;
    height: 18px;
    border-radius: 9px;
    background: var(--inner);
    overflow: hidden;
  }
  .export-cat-row .cat-bar .fill {
    height: 100%;
    border-radius: 9px;
    transition: width 0.5s;
  }
  .export-cat-row .cat-pct {
    font-size: 0.6875rem;
    font-weight: 600;
    color: var(--muted);
    width: 32px;
    text-align: right;
  }
  .export-footer-text {
    margin-top: 24px;
    font-size: 0.6875rem;
    color: var(--muted);
    text-align: center;
    border-top: 1px solid rgba(14, 30, 18, 0.06);
    padding-top: 16px;
    font-weight: 500;
  }
  .export-footer-text strong { font-family: 'Courier New', monospace; }

  .export-downloads {
    margin-top: 48px;
    background: var(--white);
    border-radius: 28px;
    padding: 28px 32px 32px;
    box-shadow: 0 4px 24px rgba(14, 30, 18, 0.06);
  }
  .export-downloads-header {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.9375rem;
    font-weight: 700;
    color: var(--dark);
    margin-bottom: 20px;
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", system-ui, sans-serif;
  }
  .export-group {
    margin-bottom: 6px;
  }
  .export-group:last-child { margin-bottom: 0; }
  .export-group-head {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 0 8px;
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    border-bottom: 1px solid rgba(14, 30, 18, 0.05);
  }
  .export-group-files {
    display: flex;
    flex-direction: column;
  }
  .export-file {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 6px;
    text-decoration: none;
    color: var(--dark);
    border-radius: 10px;
    transition: background 0.15s;
    font-size: 0.8125rem;
  }
  .export-file:hover { background: var(--cream); }
  .export-file svg { color: var(--muted); flex-shrink: 0; }
  .export-file span:not(.export-file-btn):not(.export-file-size) { flex: 1; font-weight: 500; font-family: 'SF Mono', 'Cascadia Code', 'Consolas', monospace; font-size: 0.75rem; }
  .export-file-size {
    flex: none;
    font-size: 0.6875rem;
    color: var(--muted);
    font-weight: 400;
    font-family: inherit;
  }
  .export-file-btn {
    font-size: 0.5625rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    padding: 2px 8px;
    border-radius: 5px;
    flex: none;
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", system-ui, sans-serif;
    line-height: 1.4;
  }
  .export-file-btn.csv { background: rgba(46,158,83,0.1); color: #2E9E53; }
  .export-file-btn.pdf { background: rgba(229,115,74,0.1); color: #E5734A; }

  @media (max-width: 1024px) {
    .balance-charts-grid { grid-template-columns: 1fr; }
    .export-table-wrap { overflow-x: auto; }
    .export-table-head, .export-table-row { grid-template-columns: 30px 110px repeat(6, 80px) 110px; gap: 4px; padding: 10px 14px; }
    .export-file span:not(.export-file-btn):not(.export-file-size) { font-size: 0.6875rem; }
  }
  @media (max-width: 768px) {
    .balance-section { padding: 56px 20px; }
    .balance-header h2 { font-size: 1.5rem; }
    .balance-chart-card { padding: 20px; border-radius: 20px; }
    .balance-chart-card .recharts-text { font-size: 9px !important; }
    .balance-toggle button { padding: 8px 16px; font-size: 0.8125rem; }
    .balance-stats {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-left: -20px;
      margin-right: -20px;
      padding: 0 20px;
    }
    .balance-stat {
      min-width: 0;
      padding: 12px 14px;
      border-radius: 14px;
    }
    .balance-stat-value { font-size: 1rem; }
    .export-section { padding: 0 20px 56px; }

    .export-table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }
    .export-table { min-width: 840px; }
    .export-table-head, .export-table-row { grid-template-columns: 26px 100px repeat(6, 88px) 140px; gap: 4px; padding: 10px 14px 10px 12px; }
    .export-table-row .et-dl .export-btn { padding: 2px 8px; font-size: 0.5rem; }

    .export-downloads { padding: 20px; border-radius: 20px; }
    .export-file span:not(.export-file-btn):not(.export-file-size) { font-size: 0.6875rem; }
    .export-file { flex-wrap: wrap; gap: 8px; }
  }
`;

const civilData = [
  { name: 'Ene', Ingresos: 185000, Gastos: 112000, Margen: 39.5 },
  { name: 'Feb', Ingresos: 162000, Gastos: 98000, Margen: 39.5 },
  { name: 'Mar', Ingresos: 210000, Gastos: 135000, Margen: 35.7 },
  { name: 'Abr', Ingresos: 145000, Gastos: 88000, Margen: 39.3 },
  { name: 'May', Ingresos: 198000, Gastos: 121000, Margen: 38.9 },
  { name: 'Jun', Ingresos: 175000, Gastos: 105000, Margen: 40.0 },
  { name: 'Jul', Ingresos: 220000, Gastos: 142000, Margen: 35.5 },
  { name: 'Ago', Ingresos: 168000, Gastos: 96000, Margen: 42.9 },
  { name: 'Sep', Ingresos: 193000, Gastos: 118000, Margen: 38.9 },
  { name: 'Oct', Ingresos: 235000, Gastos: 155000, Margen: 34.0 },
  { name: 'Nov', Ingresos: 280000, Gastos: 178000, Margen: 36.4 },
  { name: 'Dic', Ingresos: 310000, Gastos: 210000, Margen: 32.3 },
];

const formatAxis = (v) => {
  if (v >= 1000000) return `$${(v / 1000000).toFixed(1)}M`;
  if (v >= 1000) return `$${(v / 1000).toFixed(0)}k`;
  return `$${v}`;
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null;
  return (
    <div style={{
      background: 'var(--white)',
      borderRadius: '14px',
      border: '1px solid rgba(14,30,18,0.08)',
      boxShadow: '0 8px 24px rgba(14,30,18,0.1)',
      padding: '10px 14px',
      fontSize: '12px',
    }}>
      <div style={{ fontWeight: 700, marginBottom: 4, color: 'var(--dark)' }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color, fontWeight: 600, marginTop: i > 0 ? 2 : 0 }}>
          {p.name}: {p.name === 'Margen' ? `${p.value.toFixed(1)}%` : `$${p.value.toLocaleString()}`}
        </div>
      ))}
    </div>
  );
};

const civilOrder = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
const ejercicioOrder = ['Jul','Ago','Sep','Oct','Nov','Dic','Ene','Feb','Mar','Abr','May','Jun'];

const dailyRaw = [
  { d: '1', i: 8500,  g: 14200 },
  { d: '5', i: 19200, g: 8100 },
  { d: '10', i: 14300, g: 6500 },
  { d: '15', i: 22100, g: 13100 },
  { d: '20', i: 16800, g: 7200 },
  { d: '25', i: 25400, g: 9800 },
  { d: '28', i: 31200, g: 11500 },
];
const dailyData = dailyRaw.map(({ d, i, g }) => ({
  name: d, Ingresos: i, Gastos: g,
  Margen: Math.round(((i - g) / i) * 100 * 10) / 10,
}));
let accI = 0, accG = 0;
const dailyAccum = dailyData.map(d => {
  accI += d.Ingresos; accG += d.Gastos;
  return { name: d.name, Ingresos: accI, Gastos: accG, Margen: d.Margen };
});

const monthShort = { 'Ene':'En','Feb':'Fe','Mar':'Mr','Abr':'Ab','May':'My','Jun':'Jn','Jul':'Jl','Ago':'Ag','Sep':'Sp','Oct':'Oc','Nov':'Nv','Dic':'Dc' };

const ChartDemo = () => {
  const [mode, setMode] = useState('civil');
  const [view, setView] = useState('anual');
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  const fmtLabel = (v) => (view === 'anual' || view === 'trimestral') && isMobile && monthShort[v] ? monthShort[v] : v;
  const tableRef = React.useRef(null);
  React.useEffect(() => {
    const el = tableRef.current;
    if (!el) return;
    const check = () => el.classList.toggle('is-scrollable', el.scrollWidth > el.clientWidth);
    check();
    el.addEventListener('scroll', check);
    window.addEventListener('resize', check);
    return () => { el.removeEventListener('scroll', check); window.removeEventListener('resize', check); };
  }, []);

  const currentOrder = mode === 'civil' ? civilOrder : ejercicioOrder;
  const fullData = currentOrder.map(name => civilData.find(d => d.name === name));

  const quarterData = [
    { name: 'Ene–Mar', Ingresos: 0, Gastos: 0, Margen: 0 },
    { name: 'Abr–Jun', Ingresos: 0, Gastos: 0, Margen: 0 },
    { name: 'Jul–Sep', Ingresos: 0, Gastos: 0, Margen: 0 },
    { name: 'Oct–Dic', Ingresos: 0, Gastos: 0, Margen: 0 },
  ];
  fullData.forEach((d, i) => {
    const q = Math.floor(i / 3);
    quarterData[q].Ingresos += d.Ingresos;
    quarterData[q].Gastos += d.Gastos;
  });
  quarterData.forEach(q => { q.Margen = Math.round(((q.Ingresos - q.Gastos) / q.Ingresos) * 100 * 10) / 10; });

  const barData = view === 'trimestral' ? quarterData : view === 'mensual' ? dailyData : fullData;
  const areaData = view === 'trimestral' ? quarterData : view === 'mensual' ? dailyAccum : fullData;

  const periodLabel = mode === 'civil'
    ? 'Enero — Diciembre (año civil completo)'
    : 'Julio — Junio (ejercicio completo)';

  return (
    <>
      <style>{styles}</style>
      <section className="balance-section" id="balances">
        <div className="balance-container">
          <div className="balance-header">
            <span className="eyebrow">Panel de Balances</span>
            <h2>Visualizá tu evolución financiera</h2>
            <p className="balance-subtitle">Explorá tus datos en vista <strong>Mensual</strong>, <strong>Trimestral</strong> o <strong>Anual</strong>, y alterná entre año civil y ejercicio.</p>
          </div>

          <div className="balance-toggle">
            <button
              className={mode === 'civil' ? 'active' : ''}
              onClick={() => setMode('civil')}
            >
              Año Civil <small>(Ene–Dic)</small>
            </button>
            <button
              className={mode === 'ejercicio' ? 'active' : ''}
              onClick={() => setMode('ejercicio')}
            >
              Ejercicio <small>(Jul–Jun)</small>
            </button>
          </div>

          <div className="balance-view-toggle">
            {[
              { k: 'mensual', l: 'Mensual' },
              { k: 'trimestral', l: 'Trimestral' },
              { k: 'anual', l: 'Anual' },
            ].map(({ k, l }) => (
              <button
                key={k}
                className={view === k ? 'active' : ''}
                onClick={() => setView(k)}
              >
                {l}
              </button>
            ))}
          </div>

          <div className="balance-charts-grid">
            <div className="balance-chart-card">
              <div className="balance-chart-header">
                <h3>Ingresos vs Gastos</h3>
                <span>{view === 'mensual' ? 'Semanas' : view === 'trimestral' ? 'Trimestres' : 'Meses'}</span>
              </div>
              <div className="balance-chart-sub">
                <span className="chart-green">● Ingresos</span> · <span className="chart-warm">● Gastos</span>
                {view === 'mensual' && <span className="chart-sub-badge">Acumulado diario</span>}
                {view === 'trimestral' && <span className="chart-sub-badge">Agrupado por trimestre</span>}
              </div>
              <ResponsiveContainer width="100%" height={260}>
                {view === 'mensual' ? (
                  <AreaChart data={areaData} margin={{ top: 12, right: 4, left: 0, bottom: 4 }}>
                    <defs>
                      <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2E9E53" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="#2E9E53" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorGastos" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#E5734A" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="#E5734A" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(14,30,18,0.06)" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#6b7a5e', fontWeight: 600 }} tickMargin={6} interval={0} tickFormatter={fmtLabel} />
                    <YAxis axisLine={false} tickLine={false} width={42} tick={{ fontSize: 11, fill: '#6b7a5e', fontWeight: 500 }} tickFormatter={formatAxis} />
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(14,30,18,0.1)', strokeWidth: 1 }} />
                    <Legend verticalAlign="bottom" height={28} wrapperStyle={{ paddingTop: 6, fontSize: 12, fontWeight: 600, color: '#6b7a5e' }} iconType="circle" />
                    <Area type="monotone" dataKey="Ingresos" stroke="#2E9E53" strokeWidth={3} fillOpacity={1} fill="url(#colorIngresos)" dot={false} />
                    <Area type="monotone" dataKey="Gastos" stroke="#E5734A" strokeWidth={3} fillOpacity={1} fill="url(#colorGastos)" dot={false} />
                  </AreaChart>
                ) : (
                  <BarChart data={barData} margin={{ top: 8, right: 4, left: 0, bottom: 4 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(14,30,18,0.06)" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#6b7a5e', fontWeight: 600 }} tickMargin={6} interval={0} tickFormatter={fmtLabel} />
                    <YAxis axisLine={false} tickLine={false} width={42} tick={{ fontSize: 11, fill: '#6b7a5e', fontWeight: 500 }} tickFormatter={formatAxis} />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(14,30,18,0.03)' }} />
                    <Legend verticalAlign="bottom" height={28} wrapperStyle={{ paddingTop: 6, fontSize: 12, fontWeight: 600, color: '#6b7a5e' }} iconType="circle" />
                    <Bar dataKey="Ingresos" fill="#2E9E53" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="Gastos" fill="#E5734A" radius={[6, 6, 0, 0]} />
                  </BarChart>
                )}
              </ResponsiveContainer>
              <div className="balance-period-label">
                {view === 'mensual' ? 'Enero — acumulado día por día' : view === 'trimestral' ? 'Agrupación trimestral' : `Mostrando ${periodLabel}`}
              </div>
            </div>

            <div className="balance-chart-card">
              <div className="balance-chart-header">
                <h3>Tendencia de Margen</h3>
                <span>%</span>
              </div>
              <div className="balance-chart-sub">
                {view === 'mensual' ? 'Margen diario acumulado' : view === 'trimestral' ? 'Margen por trimestre' : 'Diferencia entre ingresos y gastos'}
              </div>
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={areaData} margin={{ top: 12, right: 4, left: 0, bottom: 4 }}>
                  <defs>
                    <linearGradient id="colorMargen" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0E1E12" stopOpacity={0.12} />
                      <stop offset="95%" stopColor="#0E1E12" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(14,30,18,0.06)" />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#6b7a5e', fontWeight: 600 }}
                    tickMargin={6}
                    interval={0}
                    tickFormatter={fmtLabel}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    width={36}
                    tick={{ fontSize: 11, fill: '#6b7a5e', fontWeight: 500 }}
                    tickFormatter={v => `${v.toFixed(0)}%`}
                    domain={[20, 50]}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(14,30,18,0.1)', strokeWidth: 1 }} />
                  <Area type="monotone" dataKey="Margen" stroke="#0E1E12" strokeWidth={3} fillOpacity={1} fill="url(#colorMargen)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
              <div className="balance-period-label" style={{ marginTop: 12 }}>
                Margen promedio: <strong>{Math.round(areaData.reduce((s, d) => s + d.Margen, 0) / areaData.length * 10) / 10}%</strong>
                <span style={{ opacity: 0.5, marginLeft: 6 }}>· {view === 'mensual' ? 'c/5 días' : view === 'trimestral' ? '4 trimestres' : '12 meses'}</span>
              </div>
            </div>
          </div>

          <div className="balance-stats">
            <div className="balance-stat">
              <span className="balance-stat-label">{view === 'mensual' ? 'Ingresos del Mes' : 'Total Ingresos'}</span>
              <span className="balance-stat-value" style={{ color: '#2E9E53' }}>
                ${barData.reduce((s, d) => s + d.Ingresos, 0).toLocaleString()}
              </span>
            </div>
            <div className="balance-stat">
              <span className="balance-stat-label">{view === 'mensual' ? 'Gastos del Mes' : 'Total Gastos'}</span>
              <span className="balance-stat-value" style={{ color: '#E5734A' }}>
                ${barData.reduce((s, d) => s + d.Gastos, 0).toLocaleString()}
              </span>
            </div>
            <div className="balance-stat">
              <span className="balance-stat-label">Diferencia</span>
              <span className="balance-stat-value" style={{ color: 'var(--dark)' }}>
                ${(barData.reduce((s, d) => s + d.Ingresos, 0) - barData.reduce((s, d) => s + d.Gastos, 0)).toLocaleString()}
              </span>
            </div>
            <div className="balance-stat">
              <span className="balance-stat-label">Período</span>
              <span className="balance-stat-value" style={{ color: 'var(--dark)' }}>
                {view === 'mensual' ? '1 Mes' : view === 'trimestral' ? '4 Trimestres' : mode === 'civil' ? 'Ene–Dic' : 'Jul–Jun'}
              </span>
            </div>
          </div>

          <div className="balance-period-label balance-note-wrap" style={{ marginTop: 16, borderTop: 'none', paddingTop: 4 }}>
            <span className="balance-note">
              {view === 'mensual' && (
                <><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="14" height="14"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" /></svg>
                  Vista diaria: ingresos y gastos acumulados de la semana en curso.
                </>
              )}
              {view === 'trimestral' && (
                <><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="14" height="14"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" /></svg>
                  {mode === 'civil' ? 'Ene–Mar · Abr–Jun · Jul–Sep · Oct–Dic' : 'Jul–Sep · Oct–Dic · Ene–Mar · Abr–Jun'}
                </>
              )}
              {view === 'anual' && mode === 'ejercicio' && (
                <><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="14" height="14"><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" /></svg>
                  Los meses se reordenan automáticamente: el ejercicio comienza en Julio y termina en Junio.
                </>
              )}
              {view === 'anual' && mode === 'civil' && (
                <><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="14" height="14"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Vista clásica con orden calendario. Alterná a Ejercicio para ver la reorganización automática.
                </>
              )}
            </span>
          </div>
        </div>
      </section>

      <section className="export-section">
        <div className="export-container">
          <div className="balance-header">
            <span className="eyebrow">Sistema de Exportación</span>
            <h2>Exportá tus reportes</h2>
            <p className="balance-subtitle">Descargá balances, movimientos y archivos contables en CSV o PDF con un diagnóstico automático de tu evolución financiera.</p>
          </div>

          <div className="export-table-wrap" ref={tableRef}>
            <div className="export-table" style={{ animation: 'chart-fade-up 0.6s ease both', animationDelay: '0.1s' }}>
              <div className="export-table-head">
                <span className="et-col et-icon"></span>
                <span className="et-col et-name">Tipo</span>
                <span className="et-col et-feat"><span>KPIs</span></span>
                <span className="et-col et-feat"><span>Categorías</span></span>
                <span className="et-col et-feat"><span>Inventario</span></span>
                <span className="et-col et-feat"><span>IVA</span></span>
                <span className="et-col et-feat"><span>Proyectos</span></span>
                <span className="et-col et-feat"><span>Diagnóstico</span></span>
                <span className="et-col et-dl"></span>
              </div>
              {[
                { icon: 'balance', name: 'Balance', feat: [true, true, false, false, false, true], csv: '/reporte_analisis_de_balance_2026-06-21.csv', pdf: '/Ruralit%20-%20Balance%20Trimestral%20-%20Q4%20Ejercicio%20(abr%20-%20jun).pdf' },
                { icon: 'movs', name: 'Movimientos', feat: [false, true, false, false, false, false], csv: '/reporte_movimientos_2026-06-21.csv', pdf: '/Ruralit%20-%20Libreta%20junio%202026.pdf' },
                { icon: 'contable', name: 'Archivo Contable', feat: [true, true, true, true, true, true], csv: '/reporte_ruralit_-_el_ceibo_2026-06-21.csv', pdf: '/Ruralit%20-%20Informe%20Integral%20-%20El%20ceibo.pdf' },
                { icon: 'inventario', name: 'Inventario Físico', feat: [false, false, true, false, false, false], csv: '/inventario_el_ceibo_junio_2026.csv', pdf: '/Ruralit%20-%20Inventario%20junio%202026.pdf' },
              ].map((row, i) => (
                <div className="export-table-row" key={i}>
                  <span className="et-col et-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.6" stroke="currentColor" width="18" height="18" style={{ color: 'var(--muted)' }}>
                      {row.icon === 'balance' && <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />}
                      {row.icon === 'movs' && <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />}
                      {row.icon === 'contable' && <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />}
                      {row.icon === 'inventario' && <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />}
                    </svg>
                  </span>
                  <span className="et-col et-name">{row.name}</span>
                  {row.feat.map((f, j) => (
                    <span className="et-col et-feat" key={j}>
                      {f ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="#2E9E53" width="16" height="16"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                      ) : (
                        <span style={{ color: 'var(--border)', fontSize: '0.875rem' }}>–</span>
                      )}
                    </span>
                  ))}
                  <span className="et-col et-dl">
                    <a className="export-btn csv" href={row.csv} download>CSV</a>
                    <a className="export-btn pdf" href={row.pdf} target="_blank">PDF</a>
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="export-table-hint">Deslizá para ver más columnas <span>→</span></div>

          <div className="export-downloads" style={{ animation: 'chart-fade-up 0.6s ease both', animationDelay: '0.35s' }}>
            <div className="export-downloads-header">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="18" height="18"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
              Descargá ejemplos reales
            </div>

            <div className="export-group">
              <div className="export-group-head">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" width="16" height="16"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>
                Balance
              </div>
              <div className="export-group-files">
                <a href="/reporte_analisis_de_balance_2026-06-21.csv" download className="export-file">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="16" height="16"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
                  <span>reporte_analisis_de_balance_2026-06-21.csv</span>
                  <span className="export-file-size">4.2 KB</span>
                  <span className="export-file-btn csv">CSV</span>
                </a>
                <a href="/Ruralit%20-%20Balance%20Trimestral%20-%20Q4%20Ejercicio%20(abr%20-%20jun).pdf" target="_blank" className="export-file">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="16" height="16"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
                  <span>Ruralit — Balance Trimestral — Q4 Ejercicio (abr-jun).pdf</span>
                  <span className="export-file-size">156 KB</span>
                  <span className="export-file-btn pdf">PDF</span>
                </a>
              </div>
            </div>

            <div className="export-group">
              <div className="export-group-head">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" width="16" height="16"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                Movimientos
              </div>
              <div className="export-group-files">
                <a href="/reporte_movimientos_2026-06-21.csv" download className="export-file">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="16" height="16"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
                  <span>reporte_movimientos_2026-06-21.csv</span>
                  <span className="export-file-size">8.7 KB</span>
                  <span className="export-file-btn csv">CSV</span>
                </a>
                <a href="/Ruralit%20-%20Libreta%20junio%202026.pdf" target="_blank" className="export-file">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="16" height="16"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
                  <span>Ruralit — Libreta junio 2026.pdf</span>
                  <span className="export-file-size">98 KB</span>
                  <span className="export-file-btn pdf">PDF</span>
                </a>
              </div>
            </div>

            <div className="export-group">
              <div className="export-group-head">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" width="16" height="16"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" /></svg>
                Archivo Contable
              </div>
              <div className="export-group-files">
                <a href="/reporte_ruralit_-_el_ceibo_2026-06-21.csv" download className="export-file">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="16" height="16"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
                  <span>reporte_ruralit_el_ceibo_2026-06-21.csv</span>
                  <span className="export-file-size">12.1 KB</span>
                  <span className="export-file-btn csv">CSV</span>
                </a>
                <a href="/Ruralit%20-%20Informe%20Integral%20-%20El%20ceibo.pdf" target="_blank" className="export-file">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="16" height="16"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
                  <span>Ruralit — Informe Integral — El Ceibo.pdf</span>
                  <span className="export-file-size">324 KB</span>
                  <span className="export-file-btn pdf">PDF</span>
                </a>
              </div>
            </div>

            <div className="export-group">
              <div className="export-group-head">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" width="16" height="16"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" /></svg>
                Inventario Físico
              </div>
              <div className="export-group-files">
                <a href="/inventario_el_ceibo_junio_2026.csv" download className="export-file">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="16" height="16"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
                  <span>inventario_el_ceibo_junio_2026.csv</span>
                  <span className="export-file-size">3.4 KB</span>
                  <span className="export-file-btn csv">CSV</span>
                </a>
                <a href="/Ruralit%20-%20Inventario%20junio%202026.pdf" target="_blank" className="export-file">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="16" height="16"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
                  <span>Ruralit — Inventario junio 2026.pdf</span>
                  <span className="export-file-size">212 KB</span>
                  <span className="export-file-btn pdf">PDF</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ChartDemo;
