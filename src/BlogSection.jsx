import React from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Wallet, Info, Sprout } from 'lucide-react';

const RURALIT_STYLE = {
  green: '#2E7D32',
  greenLight: '#E8F5E9',
  red: '#C94A4A',
  redLight: '#FDECEA',
  text1: 'var(--text)',
  text3: 'var(--text-muted)',
  bg: 'var(--bg)',
  card: 'var(--card-bg)',
  border: 'var(--border)',
  shadow: '0px 10px 30px rgba(0, 0, 0, 0.04)',
  font: 'Inter Tight, sans-serif'
};

const evolData = [
  { name: '1', Ingresos: 12000, Gastos: 5000 },
  { name: '5', Ingresos: 18000, Gastos: 7000 },
  { name: '10', Ingresos: 15000, Gastos: 12000 },
  { name: '15', Ingresos: 22000, Gastos: 8000 },
  { name: '20', Ingresos: 35000, Gastos: 14000 },
  { name: '25', Ingresos: 31000, Gastos: 13000 },
  { name: '30', Ingresos: 42000, Gastos: 16000 },
];

const catData = [
  { nombre: 'Insumos / Fertilizantes', monto: 8500, pct: 45, color: '#2E7D32' },
  { nombre: 'Mano de Obra / Personal', monto: 4200, pct: 22, color: '#43A047' },
  { nombre: 'Combustibles / Gasoil', monto: 3100, pct: 16, color: '#66BB6A' },
  { nombre: 'Mantenimiento Maquinaria', monto: 1800, pct: 10, color: '#A5D6A7' },
];

const FeedbackHeader = () => (
  <div style={{ background: RURALIT_STYLE.card, borderRadius: '24px', padding: '24px', borderLeft: `6px solid ${RURALIT_STYLE.green}`, boxShadow: RURALIT_STYLE.shadow, display: 'flex', gap: '16px', alignItems: 'center' }}>
    <div style={{ width: '45px', height: '45px', borderRadius: '12px', background: `${RURALIT_STYLE.green}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: RURALIT_STYLE.green }}>
       <TrendingUp size={24} />
    </div>
    <div style={{ flex: 1 }}>
      <p style={{ fontSize: '11px', fontWeight: 900, color: RURALIT_STYLE.green, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Diagnóstico de Rentabilidad</p>
      <p style={{ fontSize: '15px', fontWeight: 700, color: RURALIT_STYLE.text1 }}>"Rendimiento sobresaliente (42%). Tu margen neto supera los índices técnicos esperados."</p>
    </div>
  </div>
);

const EvolutionChart = () => (
  <div style={{ background: RURALIT_STYLE.card, borderRadius: '28px', padding: '24px', boxShadow: RURALIT_STYLE.shadow, border: `1px solid ${RURALIT_STYLE.border}` }}>
    <p style={{ fontSize: '13px', fontWeight: 700, color: RURALIT_STYLE.text3, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '20px' }}>Evolución de Caja (Mensual)</p>
    <div style={{ width: '100%', height: 260 }}>
      <ResponsiveContainer>
        <AreaChart data={evolData}>
          <defs>
            <linearGradient id="clrIng" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={RURALIT_STYLE.green} stopOpacity={0.2} />
              <stop offset="95%" stopColor={RURALIT_STYLE.green} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="clrGas" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={RURALIT_STYLE.red} stopOpacity={0.2} />
              <stop offset="95%" stopColor={RURALIT_STYLE.red} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: RURALIT_STYLE.text3 }} dy={10} />
          <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: RURALIT_STYLE.shadow, fontSize: '12px' }} />
          <Area type="monotone" dataKey="Ingresos" stroke={RURALIT_STYLE.green} strokeWidth={3} fillOpacity={1} fill="url(#clrIng)" />
          <Area type="monotone" dataKey="Gastos" stroke={RURALIT_STYLE.red} strokeWidth={3} fillOpacity={1} fill="url(#clrGas)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const CategoryBars = () => (
  <div style={{ background: RURALIT_STYLE.card, borderRadius: '28px', padding: '24px', boxShadow: RURALIT_STYLE.shadow, border: `1px solid ${RURALIT_STYLE.border}` }}>
    <h3 style={{ fontSize: '16px', fontWeight: 800, color: RURALIT_STYLE.text1, marginBottom: '20px' }}>Concentración de Gastos</h3>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {catData.map((item, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color }} />
              <span style={{ fontSize: '13px', fontWeight: 600, color: RURALIT_STYLE.text1 }}>{item.nombre}</span>
            </div>
            <span style={{ fontSize: '14px', fontWeight: 800 }}>USD {item.monto.toLocaleString()}</span>
          </div>
          <div style={{ height: '6px', background: '#f0f0f0', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ width: `${item.pct}%`, height: '100%', background: item.color, borderRadius: '10px' }} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

// --- COMPONENTE 4: CARD DE INVERSIÓN (ROI) ---
const InvestmentCard = () => (
  <div style={{ background: RURALIT_STYLE.card, borderRadius: '28px', padding: '24px', boxShadow: RURALIT_STYLE.shadow, border: `1px solid ${RURALIT_STYLE.border}`, position: 'relative' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', alignItems: 'flex-start' }}>
      <div>
        <p style={{ fontSize: '10px', fontWeight: 900, color: RURALIT_STYLE.text3, textTransform: 'uppercase', letterSpacing: '1px' }}>Proyecto Activo</p>
        <h4 style={{ fontSize: '18px', fontWeight: 800, color: RURALIT_STYLE.text1 }}>Lote Terneros Brangus</h4>
      </div>
      <div style={{ background: '#E8F5E9', color: RURALIT_STYLE.green, padding: '4px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 700 }}>
        ROI +18.4%
      </div>
    </div>
    
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
      <div>
        <p style={{ fontSize: '11px', color: RURALIT_STYLE.text3 }}>Invertido</p>
        <p style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text)' }}>USD 45.000</p>
      </div>
      <div>
        <p style={{ fontSize: '11px', color: RURALIT_STYLE.text3 }}>Días de Ciclo</p>
        <p style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text)' }}>142 / 180</p>
      </div>
    </div>
    <div style={{ height: '8px', background: 'rgba(0,0,0,0.05)', borderRadius: '4px' }}>
      <div style={{ width: '78%', height: '100%', background: `linear-gradient(90deg, ${RURALIT_STYLE.green}, #66BB6A)`, borderRadius: '4px' }} />
    </div>
  </div>
);

// --- COMPONENTE 5: REGISTRO RÁPIDO DICCIONARIO ---
const SmartRegisterMock = () => (
  <div style={{ background: '#111827', borderRadius: '28px', padding: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', color: '#fff' }}>
    <p style={{ fontSize: '12px', color: '#9CA3AF', marginBottom: '12px', fontWeight: 600, letterSpacing: '1px' }}>DICCIONARIO INTELIGENTE</p>
    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '16px', fontFamily: 'monospace', fontSize: '14px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '16px', color: RURALIT_STYLE.green }}>
      "Compramos 12 toros a 2500 usd c/u"
    </div>
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      {['12 Unidades', 'Hacienda', 'USD 30.000', 'Compra'].map(tag => (
        <span key={tag} style={{ background: `${RURALIT_STYLE.green}33`, color: RURALIT_STYLE.green, padding: '4px 10px', borderRadius: '8px', fontSize: '10px', fontWeight: 700, border: `1px solid ${RURALIT_STYLE.green}` }}>
          ✓ {tag}
        </span>
      ))}
    </div>
  </div>
);

// --- COMPONENTE 7: SEGURIDAD Y BACKUP LOCAL-FIRST ---
const SecurityStatusCard = () => (
  <div style={{ background: RURALIT_STYLE.card, borderRadius: '28px', padding: '24px', boxShadow: RURALIT_STYLE.shadow, border: `1px solid ${RURALIT_STYLE.border}`, display: 'flex', gap: '16px', alignItems: 'center' }}>
    <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: `${RURALIT_STYLE.green}12`, border: `2px solid ${RURALIT_STYLE.green}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: RURALIT_STYLE.green }}>
         <Info size={28} />
    </div>
    <div>
      <h4 style={{ fontSize: '15px', fontWeight: 800, color: RURALIT_STYLE.text1 }}>Datos Sincronizados</h4>
      <p style={{ fontSize: '12px', color: RURALIT_STYLE.text3, marginTop: '2px' }}>Respaldo en Supabase Cloud.</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px' }}>
        <span style={{ fontSize: '9px', background: RURALIT_STYLE.green, color: '#fff', padding: '2px 8px', borderRadius: '4px', fontWeight: 900 }}>OFFLINE READY</span>
      </div>
    </div>
  </div>
);

// --- COMPONENTE 8: SAVINGS GOALS (ESTADO LINEAL) ---
const SavingsGoalCard = () => (
  <div style={{ background: RURALIT_STYLE.card, borderRadius: '28px', padding: '24px', boxShadow: RURALIT_STYLE.shadow, border: `1px solid ${RURALIT_STYLE.border}` }}>
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px' }}>
      <div style={{ flex: 1 }}>
        <h4 style={{ fontSize: '15px', fontWeight: 800, color: RURALIT_STYLE.text1 }}>Progreso de Provisiones</h4>
        <p style={{ fontSize: '12px', color: RURALIT_STYLE.text3 }}>Cosecha 2026 - USD 25k</p>
      </div>
      <div style={{ fontSize: '13px', fontWeight: 800, color: RURALIT_STYLE.green }}>65%</div>
    </div>
    <div style={{ height: '10px', background: 'rgba(0,0,0,0.05)', borderRadius: '10px', overflow: 'hidden', display: 'flex' }}>
       <div style={{ width: '65%', height: '100%', background: RURALIT_STYLE.green, borderRadius: '10px' }} />
       <div style={{ width: '35%', height: '100%', background: 'rgba(0,0,0,0.03)' }} />
    </div>
  </div>
);

// --- COMPONENTE 9: METAS DE AHORRO (DIAGNÓSTICO CIRCULAR) ---
const GoalsCard = () => (
  <div style={{ background: RURALIT_STYLE.card, borderRadius: '28px', padding: '24px', boxShadow: RURALIT_STYLE.shadow, border: `1px solid ${RURALIT_STYLE.border}` }}>
    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
      <div style={{ position: 'relative', width: '70px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="70" height="70" viewBox="0 0 100 100">
           <circle cx="50" cy="50" r="40" stroke="#f0f0f0" strokeWidth="10" fill="none" />
           <circle cx="50" cy="50" r="40" stroke={RURALIT_STYLE.green} strokeWidth="10" fill="none" strokeDasharray="180 251" strokeLinecap="round" />
        </svg>
        <span style={{ position: 'absolute', fontSize: '14px', fontWeight: 800, color: 'var(--text)' }}>72%</span>
      </div>
      <div>
        <p style={{ fontSize: '10px', fontWeight: 900, color: RURALIT_STYLE.text3, textTransform: 'uppercase', marginBottom: '4px' }}>Objetivo</p>
        <h4 style={{ fontSize: '16px', fontWeight: 800, color: RURALIT_STYLE.text1 }}>Reposición</h4>
        <p style={{ fontSize: '14px', color: RURALIT_STYLE.green, fontWeight: 700, marginTop: '2px' }}>$7.2k / $10k</p>
      </div>
    </div>
  </div>
);

// --- COMPONENTE 10: HISTÓRICO COTIZACIÓN (MERCADO) ---
const exchangeData = [
  { day: 'Lun', rate: 38.5 },
  { day: 'Mar', rate: 38.8 },
  { day: 'Mie', rate: 39.2 },
  { day: 'Jue', rate: 39.1 },
  { day: 'Vie', rate: 39.5 },
];
const CurrencyTrend = () => (
  <div style={{ background: RURALIT_STYLE.card, borderRadius: '28px', padding: '24px', boxShadow: RURALIT_STYLE.shadow, border: `1px solid ${RURALIT_STYLE.border}` }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
       <div>
         <p style={{ fontSize: '10px', fontWeight: 900, color: '#3182CE', textTransform: 'uppercase', letterSpacing: '1px' }}>Tendencia USD/UYU</p>
         <p style={{ fontSize: '20px', fontWeight: 800 }}>$ 39.50 <span style={{ fontSize: '12px', color: '#38A169' }}>+0.4%</span></p>
       </div>
       <div style={{ padding: '8px', borderRadius: '12px', background: '#EBF8FF', color: '#3182CE' }}>
         <TrendingUp size={20} />
       </div>
    </div>
    <div style={{ width: '100%', height: 110 }}>
      <ResponsiveContainer>
        <AreaChart data={exchangeData}>
          <defs>
             <linearGradient id="clrRate" x1="0" y1="0" x2="0" y2="1">
               <stop offset="5%" stopColor="#3182CE" stopOpacity={0.2} />
               <stop offset="95%" stopColor="#3182CE" stopOpacity={0} />
             </linearGradient>
          </defs>
          <Area type="monotone" dataKey="rate" stroke="#3182CE" strokeWidth={3} fillOpacity={1} fill="url(#clrRate)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const BlogSection = () => {
  const [activeTab, setActiveTab] = React.useState(0);

  const tabs = [
    { label: '01. Simplicidad', icon: <Wallet size={18} /> },
    { label: '02. Inteligencia', icon: <TrendingUp size={18} /> },
    { label: '03. Rentabilidad', icon: <TrendingDown size={18} /> },
    { label: '04. Robustez', icon: <Sprout size={18} /> }
  ];

  return (
    <section id="blog" style={{ background: 'var(--bg)', padding: '100px 0', fontFamily: 'Inter Tight, sans-serif' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', width: '90%' }}>
        
        {/* Main Title */}
        <div style={{ marginBottom: '60px', textAlign: 'center' }}>
          <span style={{ color: RURALIT_STYLE.green, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '4px', fontSize: '12px' }}>Insight Report</span>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--text)', marginTop: '10px', fontWeight: 900, lineHeight: 1.1 }}>
            Gestión <span style={{ color: RURALIT_STYLE.green }}>profesional</span>.
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '16px', marginTop: '15px' }}>
            Explorá los tres pilares que transforman el capital de tu campo.
          </p>
        </div>

        {/* Tab Interface */}
        <div style={{ 
          display: 'flex', 
          justifyContent: activeTab > -1 ? 'flex-start' : 'center', // Changed to flex-start for scroll
          gap: '10px', 
          marginBottom: '50px',
          background: 'var(--bg-alt)',
          padding: '8px',
          borderRadius: '50px',
          border: '1px solid var(--border)',
          width: 'fit-content',
          margin: '0 auto 50px auto',
          maxWidth: '100%',
          overflowX: 'auto',
          msOverflowStyle: 'none', // hide scrollbar IE
          scrollbarWidth: 'none', // hide scrollbar Firefox
          WebkitOverflowScrolling: 'touch'
        }}>
          {tabs.map((tab, idx) => (
            <button 
              key={idx}
              onClick={() => setActiveTab(idx)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                borderRadius: '40px',
                border: 'none',
                background: activeTab === idx ? RURALIT_STYLE.green : 'transparent',
                color: activeTab === idx ? '#fff' : 'var(--text-muted)',
                cursor: 'pointer',
                fontWeight: 800,
                fontSize: '14px',
                transition: 'all 0.4s ease',
                flexShrink: 0 // Prevent buttons from shrinking
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Container */}
        <div style={{ 
          background: 'var(--card-bg)', 
          padding: '50px 40px', 
          borderRadius: '32px', 
          border: '1px solid var(--border)',
          minHeight: '400px'
        }}>
          
          {/* Tab 01: Simplicity (INPUTS) */}
          {activeTab === 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '50px', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 900, color: RURALIT_STYLE.green, letterSpacing: '2px', textTransform: 'uppercase' }}>Pilar 01: Simplicidad</span>
                <h3 style={{ fontSize: '28px', fontWeight: 900, marginBottom: '20px', color: 'var(--text)', marginTop: '8px' }}>Carga natural sin fricción.</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '17px', marginBottom: '30px', lineHeight: 1.5 }}>
                  Usá palabras clave para registrar movimientos desde el potrero. Ruralit clasifica automáticamente importes, monedas y categorías.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                   <p style={{ fontSize: '14px', opacity: 0.7, fontStyle: 'italic', borderLeft: `3px solid ${RURALIT_STYLE.green}`, paddingLeft: '15px' }}>
                     "El 80% de nuestros usuarios carga datos en menos de 10 segundos."
                   </p>
                   <FeedbackHeader />
                </div>
              </div>
              <SmartRegisterMock />
            </div>
          )}

          {/* Tab 02: Intelligence (ANALYSIS) */}
          {activeTab === 1 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '50px', alignItems: 'center' }}>
              <div style={{ order: 2 }}>
                <span style={{ fontSize: '11px', fontWeight: 900, color: RURALIT_STYLE.green, letterSpacing: '2px', textTransform: 'uppercase' }}>Pilar 02: Inteligencia</span>
                <h3 style={{ fontSize: '28px', fontWeight: 900, marginBottom: '20px', color: 'var(--text)', marginTop: '8px' }}>No solo midas: planificá.</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '17px', marginBottom: '30px', lineHeight: 1.5 }}>
                  Entendé la evolución de tu caja y creá provisiones estratégicas para asegurar la liquidez de tu próxima reposición o cosecha.
                </p>
                <GoalsCard />
              </div>
              <div style={{ order: 1 }}>
                <EvolutionChart />
              </div>
            </div>
          )}

          {/* Tab 03: Profitability (BUSINESS VALUE) */}
          {activeTab === 2 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '50px', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 900, color: RURALIT_STYLE.green, letterSpacing: '2px', textTransform: 'uppercase' }}>Pilar 03: Resultados</span>
                <h3 style={{ fontSize: '28px', fontWeight: 900, marginBottom: '20px', color: 'var(--text)', marginTop: '8px' }}>Rentabilidad por Proyecto.</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '17px', marginBottom: '30px', lineHeight: 1.5 }}>
                  Descubrí exactamente cuánto te deja cada lote de animales o cada hectárea sembrada detectando pérdidas invisibles al instante.
                </p>
                <CategoryBars />
              </div>
              <InvestmentCard />
            </div>
          )}

          {/* Tab 04: Robustness (PLATFORM TRUST) */}
          {activeTab === 3 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '50px', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <span style={{ fontSize: '11px', fontWeight: 900, color: RURALIT_STYLE.green, letterSpacing: '2px', textTransform: 'uppercase' }}>Ecodistema Ruralit</span>
                <h3 style={{ fontSize: '28px', fontWeight: 900, color: 'var(--text)', marginTop: '8px' }}>Estructura de grado financiero.</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '17px', lineHeight: 1.5 }}>
                  Protegemos tu información con seguridad local-first y sincronización en la nube. Entendemos el valor real de tus activos con mercados integrados.
                </p>
                <SecurityStatusCard />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <CurrencyTrend />
                <SavingsGoalCard />
              </div>
            </div>
          )}

        </div>

        {/* Minimalist Stats Row */}
        <div style={{ 
          marginTop: '60px', 
          paddingTop: '40px', 
          borderTop: '1px solid var(--border)', 
          display: 'flex', 
          justifyContent: 'space-around', 
          flexWrap: 'wrap', 
          gap: '30px' 
        }}>
          {[
            { v: '+25%', l: 'Claridad Financiera' },
            { v: '-15%', l: 'Pérdidas Invisibles' },
            { v: '2X', l: 'Decisiones más Rápidas' }
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 900, color: RURALIT_STYLE.green, fontFamily: 'Orbitron' }}>{s.v}</div>
              <div style={{ fontSize: '12px', color: RURALIT_STYLE.text3, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '5px' }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Executive Verdict */}
        <div style={{ marginTop: '50px', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', fontStyle: 'italic', opacity: 0.6 }}>
            "Control financiero para tu tranquilidad."
          </p>
        </div>

      </div>
    </section>
  );
};

export default BlogSection;
