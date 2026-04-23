import React, { useState, useEffect, useCallback } from 'react';
import {
  Feather,
  Brain,
  TrendingUp,
  Coins,
  FileText,
  ShieldCheck,
} from 'lucide-react';

console.log('[Ruralit] BlogSection module loaded');

const iconMap = {
  feather: Feather,
  brain: Brain,
  'trending-up': TrendingUp,
  coins: Coins,
  'file-text': FileText,
  'shield-check': ShieldCheck,
};

const RURALIT = {
  green: '#22c55e',
  greenMuted: '#16a34a',
  greenGlow: 'rgba(34, 197, 94, 0.15)',
  text: 'var(--text)',
  textMuted: 'var(--text-muted)',
  bg: 'var(--bg)',
  card: 'var(--card-bg)',
  border: 'var(--border)',
};

const catData = [
  { name: 'Insumos', pct: 45, color: '#22c55e' },
  { name: 'Mano de Obra', pct: 22, color: '#4ade80' },
  { name: 'Combustible', pct: 16, color: '#86efac' },
  { name: 'Mantenimiento', pct: 10, color: '#bbf7d0' },
];

const tabs = [
  { id: 'simple', label: 'Simplicidad', icon: 'feather' },
  { id: 'smart', label: 'Inteligencia', icon: 'brain' },
  { id: 'results', label: 'Resultados', icon: 'trending-up' },
  { id: 'multi', label: 'Multimoneda', icon: 'coins' },
  { id: 'reports', label: 'Reportes', icon: 'file-text' },
  { id: 'secure', label: 'Seguridad', icon: 'shield-check' },
];

const TabContent = ({ active }) => {
  switch (active) {
    case 'simple':
      return (
        <>
          <div className="blog-col">
            <h3>Carga natural</h3>
            <p>Escribí en lenguaje natural. Ruralit organiza todo por vos.</p>
            <div className="diagnostic-pill">
              <span className="diagnostic-label">Diagnóstico</span>
              <span className="diagnostic-value">Rendimiento 42% • Excelente</span>
            </div>
          </div>
          <div className="blog-col">
            <div className="smart-register">
              <span className="sr-label">Dictado inteligente</span>
              <div className="sr-input">"Compramos 10 toros por USD 10.000"</div>
              <div className="sr-tags">
                <span className="sr-tag">✓ USD 10.000</span>
                <span className="sr-tag">✓ Ganado</span>
              </div>
            </div>
          </div>
        </>
      );
    case 'smart':
      return (
        <>
          <div className="blog-col">
            <h3>Anticipación estratégica</h3>
            <p>Visualizá flujos futuros. No esperes a fin de año.</p>
            <div className="preview-pill">
              <span className="check-icon">✓</span>
              Previsión 2026
            </div>
          </div>
          <div className="blog-col">
            <div className="mini-chart">
              <div className="chart-bars">
                {[35, 55, 40, 70, 60, 85, 95].map((h, i) => (
                  <div key={i} className="bar" style={{ height: `${h}%` }} />
                ))}
              </div>
              <div className="chart-labels">
                <span>Ene</span><span>Feb</span><span>Mar</span><span>Abr</span><span>May</span><span>Jun</span><span>Jul</span>
              </div>
            </div>
          </div>
        </>
      );
    case 'results':
      return (
        <>
          <div className="blog-col">
            <h3>Resultados claros</h3>
            <p>Margen real por lote en tiempo real.</p>
            <div className="investment-card">
              <div className="inv-header">
                <span className="inv-title">Lote Brangus</span>
                <span className="inv-roi">+18.4% ROI</span>
              </div>
              <div className="inv-stats">
                <span>Invertido: <b>USD 45k</b></span>
                <span>Días: <b>142/180</b></span>
              </div>
            </div>
          </div>
          <div className="blog-col">
            <div className="category-bars">
              <h4>Distribución</h4>
              {catData.map((cat, i) => (
                <div key={i} className="cat-bar">
                  <div className="cat-label">
                    <span>{cat.name}</span>
                    <span>{cat.pct}%</span>
                  </div>
                  <div className="cat-track">
                    <div className="cat-fill" style={{ width: `${cat.pct}%`, background: cat.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      );
    case 'multi':
      return (
        <>
          <div className="blog-col">
            <h3>Claridad multimoneda</h3>
            <p>Unificá Pesos y Dólares automáticamente.</p>
            <div className="preview-pill green">
              <span>✓</span> Conversión pivote
            </div>
          </div>
          <div className="blog-col">
            <div className="currency-converter">
              <div className="curr-row">
                <span className="curr-flag">$</span>
                <span className="curr-name">Peso UYU</span>
                <span className="curr-val">$ 42.500</span>
              </div>
              <div className="curr-rate">39.55</div>
              <div className="curr-row usd">
                <span className="curr-flag">U$</span>
                <span className="curr-name">Dólar USD</span>
                <span className="curr-val">U$ 1.074,58</span>
              </div>
            </div>
          </div>
        </>
      );
    case 'reports':
      return (
        <>
          <div className="blog-col">
            <h3>Informes en 1 clic</h3>
            <p>Reportes PDF/CSV listos para compartir.</p>
            <div className="preview-pill">
              <span>↓</span> Export PDF y CSV
            </div>
          </div>
          <div className="blog-col">
            <div className="report-preview">
              <div className="rep-header">
                <span className="rep-icon">📄</span>
                <span>Informe_2026.pdf</span>
              </div>
              <div className="rep-lines">
                <div /><div /><div />
              </div>
              <div className="rep-actions">
                <div className="rep-btn" />
                <div className="rep-btn outline" />
              </div>
            </div>
          </div>
        </>
      );
    case 'secure':
      return (
        <>
          <div className="blog-col">
            <h3>Seguridad bancaria</h3>
            <p>Datos encriptados con sincronización en tiempo real.</p>
            <div className="secure-badge">
              <span>🔒</span> DATOS ENCRIPTADOS
            </div>
          </div>
          <div className="blog-col">
            <div className="security-options">
              <div className="sec-option">
                <span className="sec-label">Cuenta</span>
                <span className="sec-value">2FA <em>Opcional</em></span>
              </div>
              <div className="sec-option">
                <span className="sec-label">App</span>
                <span className="sec-value">PIN <em>Configurable</em></span>
              </div>
            </div>
          </div>
        </>
      );
    default:
      return null;
  }
};

const BlogSection = () => {
  const [activeTab, setActiveTab] = useState('simple');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="blog" className="blog-section">
      <div className="blog-container">
        <div className="blog-header">
          <span className="blog-tag">Insight Report</span>
          <h2>Gestión <span className="highlight">profesional</span> simple</h2>
        </div>

        <div className="blog-tabs">
          {tabs.map((tab) => {
            const Icon = iconMap[tab.icon];
            return (
              <button
                key={tab.id}
                className={`blog-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={16} className="tab-icon" />
                <span className="tab-label">{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className={`blog-content ${mounted ? 'mounted' : ''}`}>
          <TabContent active={activeTab} />
        </div>
      </div>
    </section>
  );
};

export default BlogSection;