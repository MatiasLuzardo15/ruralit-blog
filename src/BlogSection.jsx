import React, { useState, useEffect } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  Info, 
  Sprout,
  Activity,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

const RURALIT_STYLE = {
  green: '#2E7D32',
  greenLight: 'rgba(46, 125, 50, 0.1)',
  red: '#C94A4A',
  redLight: 'rgba(201, 74, 74, 0.1)',
  text1: 'var(--text, #FFFFFF)',
  text3: 'var(--text-muted, #98A2B3)',
  bg: 'var(--bg, #0C0E10)',
  card: 'var(--card-bg, #161B22)',
  border: 'var(--border, #21262D)',
  shadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
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

// Composable Sub-components
const FeedbackHeader = () => (
  <div style={{ background: RURALIT_STYLE.card, borderRadius: '16px', padding: '15px', borderLeft: `4px solid ${RURALIT_STYLE.green}`, boxShadow: RURALIT_STYLE.shadow, display: 'flex', gap: '10px', alignItems: 'center' }}>
    <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: RURALIT_STYLE.greenLight, display: 'flex', alignItems: 'center', justifyContent: 'center', color: RURALIT_STYLE.green }}>
       <Activity size={18} />
    </div>
    <div style={{ flex: 1 }}>
      <p style={{ fontSize: '9px', fontWeight: 900, color: RURALIT_STYLE.green, textTransform: 'uppercase', margin: 0 }}>Diagnóstico</p>
      <p style={{ fontSize: '13px', fontWeight: 600, color: RURALIT_STYLE.text1, margin: 0 }}>"Rendimiento del 42%. Margen excelente."</p>
    </div>
  </div>
);

const ChartContainer = ({ title, children }) => (
  <div style={{ background: RURALIT_STYLE.card, borderRadius: '20px', padding: '16px', boxShadow: RURALIT_STYLE.shadow, border: `1px solid ${RURALIT_STYLE.border}`, width: '100%' }}>
    <p style={{ fontSize: '11px', fontWeight: 700, color: RURALIT_STYLE.text3, textTransform: 'uppercase', marginBottom: '12px' }}>{title}</p>
    <div style={{ width: '100%', height: 160 }}>
      {children}
    </div>
  </div>
);

const CategoryBars = () => (
  <div style={{ background: RURALIT_STYLE.card, borderRadius: '20px', padding: '16px', border: `1px solid ${RURALIT_STYLE.border}` }}>
    <h3 style={{ fontSize: '14px', fontWeight: 800, color: RURALIT_STYLE.text1, marginBottom: '12px' }}>Distribución de Gastos</h3>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {catData.map((item, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px' }}>
            <span style={{ fontWeight: 600, color: RURALIT_STYLE.text1 }}>{item.nombre}</span>
            <span style={{ fontWeight: 800 }}>{item.pct}%</span>
          </div>
          <div style={{ height: '3px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ width: `${item.pct}%`, height: '100%', background: item.color }} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const InvestmentCard = () => (
  <div style={{ background: RURALIT_STYLE.card, borderRadius: '20px', padding: '16px', border: `1px solid ${RURALIT_STYLE.border}` }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
      <h4 style={{ fontSize: '14px', fontWeight: 800, color: RURALIT_STYLE.text1, margin: 0 }}>Lote Brangus</h4>
      <div style={{ background: RURALIT_STYLE.greenLight, color: RURALIT_STYLE.green, padding: '2px 6px', borderRadius: '5px', fontSize: '10px', fontWeight: 700 }}>
        ROI +18.4%
      </div>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        <p style={{ fontSize: '10px', color: RURALIT_STYLE.text3, margin: 0 }}>Invertido: <b style={{color: '#fff'}}>USD 45k</b></p>
        <p style={{ fontSize: '10px', color: RURALIT_STYLE.text3, margin: 0 }}>Días: <b style={{color: '#fff'}}>142/180</b></p>
    </div>
  </div>
);

const SmartRegisterMock = () => (
  <div style={{ background: '#111827', borderRadius: '20px', padding: '20px', border: `1px solid ${RURALIT_STYLE.border}` }}>
    <p style={{ fontSize: '10px', color: '#9CA3AF', marginBottom: '10px', fontWeight: 900 }}>DICCIONARIO INTELIGENTE</p>
    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '12px', fontFamily: 'monospace', fontSize: '13px', color: RURALIT_STYLE.green, marginBottom: '12px' }}>
      "Compramos 12 toros a 2500 usd c/u"
    </div>
    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
      {['12 Unidades', 'USD 30.000', 'Hacienda'].map(tag => (
        <span key={tag} style={{ background: 'rgba(46, 125, 50, 0.1)', color: RURALIT_STYLE.green, padding: '3px 8px', borderRadius: '6px', fontSize: '9px', fontWeight: 700, border: `1px solid ${RURALIT_STYLE.green}44` }}>
          ✓ {tag}
        </span>
      ))}
    </div>
  </div>
);

const BlogSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const tabs = [
    { label: 'Simplicidad', icon: <Wallet size={16} /> },
    { label: 'Inteligencia', icon: <TrendingUp size={16} /> },
    { label: 'Resultados', icon: <Activity size={16} /> },
    { label: 'Seguridad', icon: <ShieldCheck size={16} /> }
  ];

  return (
    <section id="blog" style={{ background: 'var(--bg)', padding: '80px 0' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', width: '90%' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '35px' }}>
          <span style={{ color: RURALIT_STYLE.green, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '4px', fontSize: '11px' }}>Insight Report</span>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', color: 'var(--text)', marginTop: '8px', fontWeight: 900 }}>
            Gestión <span style={{ color: RURALIT_STYLE.green }}>profesional</span> simple
          </h2>
        </div>

        {/* Tab Navigation */}
        <div style={{ 
          display: 'flex', 
          gap: '6px', 
          marginBottom: '30px',
          background: 'rgba(255,255,255,0.02)',
          padding: '4px',
          borderRadius: '50px',
          border: '1px solid var(--border)',
          width: 'fit-content',
          margin: '0 auto 30px auto',
          maxWidth: '100%',
          overflowX: 'auto'
        }}>
          {tabs.map((tab, idx) => (
            <button 
              key={idx}
              onClick={() => setActiveTab(idx)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '40px',
                border: 'none',
                background: activeTab === idx ? RURALIT_STYLE.green : 'transparent',
                color: activeTab === idx ? '#fff' : 'var(--text-muted)',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '12px',
                whiteSpace: 'nowrap',
                transition: 'all 0.3s ease'
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div style={{ 
          background: 'var(--card-bg)', 
          padding: '24px', 
          borderRadius: '24px', 
          border: '1px solid var(--border)',
          minHeight: '300px'
        }}>
          
          {activeTab === 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '15px', color: 'var(--text)' }}>Carga natural.</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: 1.6, marginBottom: '25px' }}>
                  Olvidate de las planillas complejas. Ruralit entiende tus notas de voz o texto y organiza todo por vos.
                </p>
                <FeedbackHeader />
              </div>
              <SmartRegisterMock />
            </div>
          )}

          {activeTab === 1 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '15px', color: 'var(--text)' }}>Anticipación Estratégica.</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: 1.6, marginBottom: '25px' }}>
                  Visualizá flujos de caja y provisiones. No esperes a fin de año para saber cómo vas.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: RURALIT_STYLE.green, fontWeight: 800 }}>
                  <CheckCircle2 size={18} /> Previsión de liquidez 2026
                </div>
              </div>
              {mounted && (
                <ChartContainer title="Evolución de Caja">
                  <ResponsiveContainer>
                    <AreaChart data={evolData}>
                      <defs>
                        <linearGradient id="colorIng" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={RURALIT_STYLE.green} stopOpacity={0.1}/>
                          <stop offset="95%" stopColor={RURALIT_STYLE.green} stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" hide />
                      <Tooltip />
                      <Area type="monotone" dataKey="Ingresos" stroke={RURALIT_STYLE.green} fill="url(#colorIng)" strokeWidth={2} />
                      <Area type="monotone" dataKey="Gastos" stroke={RURALIT_STYLE.red} fill="transparent" strokeWidth={2} strokeDasharray="5 5" />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              )}
            </div>
          )}

          {activeTab === 2 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '15px', color: 'var(--text)' }}>Rentabilidad Real.</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: 1.6, marginBottom: '25px' }}>
                  Controlá el margen de cada proyecto individualmente. Detectamos costos invisibles antes de que afecten tu capital.
                </p>
                <InvestmentCard />
              </div>
              <CategoryBars />
            </div>
          )}

          {activeTab === 3 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '15px', color: 'var(--text)' }}>Seguridad de Grado Bancario.</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: 1.6, marginBottom: '25px' }}>
                  Tus datos están seguros y siempre accesibles. Sincronización automática y respaldo blindado.
                </p>
                <div style={{ background: RURALIT_STYLE.greenLight, padding: '15px', borderRadius: '15px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <ShieldCheck color={RURALIT_STYLE.green} size={24} />
                  <span style={{ fontSize: '13px', color: RURALIT_STYLE.green, fontWeight: 800 }}>DATOS ENCRIPTADOS Y DISPONIBLES OFFLINE</span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                 <div style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', borderRadius: '20px', border: `1px dashed ${RURALIT_STYLE.border}` }}>
                    <p style={{ fontSize: '12px', color: RURALIT_STYLE.text3, margin: '0 0 10px 0' }}>Estado del Mercado</p>
                    <div style={{ fontSize: '20px', fontWeight: 900 }}>USD $39.55 <span style={{ color: '#38A169', fontSize: '12px' }}>+0.22%</span></div>
                 </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default BlogSection;
