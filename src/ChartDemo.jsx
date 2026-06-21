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
  @media (max-width: 1024px) {
    .balance-charts-grid {
      grid-template-columns: 1fr;
    }
  }
  @media (max-width: 768px) {
    .balance-section { padding: 56px 20px; }
    .balance-header h2 { font-size: 1.5rem; }
    .balance-chart-card { padding: 20px; border-radius: 20px; }
    .balance-toggle button { padding: 8px 16px; font-size: 0.8125rem; }
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

const ChartDemo = () => {
  const [mode, setMode] = useState('civil');
  const [view, setView] = useState('anual');

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
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#6b7a5e', fontWeight: 600 }} tickMargin={6} interval={0} />
                    <YAxis axisLine={false} tickLine={false} width={42} tick={{ fontSize: 11, fill: '#6b7a5e', fontWeight: 500 }} tickFormatter={formatAxis} />
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(14,30,18,0.1)', strokeWidth: 1 }} />
                    <Legend verticalAlign="bottom" height={28} wrapperStyle={{ paddingTop: 6, fontSize: 12, fontWeight: 600, color: '#6b7a5e' }} iconType="circle" />
                    <Area type="monotone" dataKey="Ingresos" stroke="#2E9E53" strokeWidth={3} fillOpacity={1} fill="url(#colorIngresos)" dot={false} />
                    <Area type="monotone" dataKey="Gastos" stroke="#E5734A" strokeWidth={3} fillOpacity={1} fill="url(#colorGastos)" dot={false} />
                  </AreaChart>
                ) : (
                  <BarChart data={barData} margin={{ top: 8, right: 4, left: 0, bottom: 4 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(14,30,18,0.06)" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#6b7a5e', fontWeight: 600 }} tickMargin={6} interval={0} />
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
    </>
  );
};

export default ChartDemo;
