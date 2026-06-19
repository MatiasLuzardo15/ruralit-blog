import React from 'react';

const articles = [
  {
    id: 1,
    category: 'Producto',
    title: 'Dictado inteligente: Cargá gastos con tu voz',
    excerpt:
      'Decí "gasté 5000 en gasoil" y Ruralit escucha, entiende y carga el movimiento por vos. Sin tipear nada, directamente desde el campo.',
    date: 'Junio 2026',
    readTime: '3 min',
    featured: true,
    link: '/novedades/dictado-inteligente',
  },
  {
    id: 2,
    category: 'Mejora',
    title: 'Motor Impositivo: Impuestos automáticos',
    excerpt:
      'Interruptores inteligentes para IMEBA o IVA al registrar una venta. Monto bruto y neto a la vista, sin calculadoras externas.',
    date: 'Junio 2026',
    readTime: '4 min',
    link: '/novedades/motor-impositivo',
  },
  {
    id: 3,
    category: 'Guía',
    title: 'Organizá los gastos de tu campo',
    excerpt:
      'Clasificá gastos por categoría, monto y stock para tener claridad total sobre dónde va cada peso.',
    date: 'Mayo 2026',
    readTime: '5 min',
    link: '/novedades/organiza-los-gastos',
  },
  {
    id: 4,
    category: 'Mejora',
    title: 'Lectura automática de facturas',
    excerpt:
      'Subí una factura en PDF y Ruralit extrae fecha, monto, proveedor y categoría. Sin cargar nada a mano.',
    date: 'Marzo 2026',
    readTime: '4 min',
    link: '/novedades/lectura-automatica',
  },
];

const articleIcons = {
  1: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
    </svg>
  ),
  2: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25v-.008zm2.492-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008v-.008zm2.508-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008H12v-.008zm0 2.25h.008v.008H12v-.008zm2.508-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM12 21a9 9 0 110-18 9 9 0 010 18z" />
    </svg>
  ),
  3: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.166 1.403-.352 1.403-1.1V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
    </svg>
  ),
  4: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  ),
};

const categoryStyles = {
  Producto: { bg: '#2E9E53', text: '#FFFFFF' },
  Mejora: { bg: '#C78B2E', text: '#FFFFFF' },
  Guía: { bg: '#2563EB', text: '#FFFFFF' },
  Finanzas: { bg: '#0D9488', text: '#FFFFFF' },
  Campo: { bg: '#92400E', text: '#FFFFFF' },
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700&display=swap');
  @import url('https://db.onlinewebfonts.com/c/53077f9a3eee9c479d37d6af20394ded?family=Cooper+BT+W01+Light');

  .blog-section {
    --dark: #0E1E12;
    --cream: #F8F1E5;
    --amber: #C78B2E;
    --agri: #2E9E53;
    --card: #E9E1D5;
    --inner: #F0EBE3;
    --white: #ffffff;
    --muted: #6b7a5e;
    --fg: #0E1E12;
    font-family: 'Inter', system-ui, sans-serif;
    background: var(--cream);
    padding: 96px 80px;
    width: 100%;
    box-sizing: border-box;
  }

  .blog-container {
    max-width: 1100px;
    margin: 0 auto;
  }

  .blog-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 48px;
  }

  .blog-eyebrow {
    display: block;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--amber);
    margin-bottom: 12px;
  }

  .blog-header h2 {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
    font-weight: 300;
    font-size: clamp(2rem, 3.5vw, 3rem);
    color: var(--dark);
    line-height: 1.15;
    letter-spacing: -0.02em;
    margin: 0;
  }

  .blog-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }

  .blog-card {
    background: var(--white);
    border-radius: 18px;
    overflow: hidden;
    border: 1px solid rgba(14, 30, 18, 0.06);
    display: flex;
    flex-direction: column;
    text-decoration: none;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    cursor: pointer;
  }

  .blog-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 40px rgba(14, 30, 18, 0.12);
  }

  .blog-card-img {
    height: 140px;
    background: var(--card);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .blog-card-img svg {
    width: 40px;
    height: 40px;
    color: var(--dark);
    opacity: 0.7;
  }

  .blog-card-body {
    padding: 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .blog-category {
    display: inline-block;
    font-size: 0.6875rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    padding: 4px 10px;
    border-radius: 6px;
    margin-bottom: 8px;
    width: fit-content;
    line-height: 1.4;
  }

  .blog-title {
    font-size: 0.9375rem;
    font-weight: 700;
    color: var(--dark);
    margin: 0 0 8px 0;
    line-height: 1.4;
  }

  .blog-meta {
    font-size: 0.75rem;
    color: var(--muted);
    margin-bottom: 12px;
  }

  .blog-link {
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--amber);
    text-decoration: none;
    margin-top: auto;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    transition: color 0.15s ease;
  }

  .blog-link:hover {
    color: #a07120;
  }

  .blog-cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 0.875rem;
    font-weight: 600;
    background: var(--dark);
    color: var(--white);
    padding: 10px 24px;
    border-radius: 14px;
    text-decoration: none;
    transition: background 0.2s ease;
    cursor: pointer;
    border: none;
    white-space: nowrap;
  }

  .blog-cta:hover {
    background: #1a2e1f;
  }

  @media (max-width: 1024px) {
    .blog-section {
      padding: 72px 40px;
    }

    .blog-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 768px) {
    .blog-section {
      padding: 56px 20px;
    }

    .blog-header {
      align-items: flex-end;
      gap: 12px;
    }

    .blog-cta {
      padding: 8px 16px;
      font-size: 0.8125rem;
    }

    .blog-grid {
      grid-template-columns: 1fr;
    }
  }
`;

const BlogSection = () => {
  return (
    <>
      <style>{styles}</style>
      <section id="blog" className="blog-section">
        <div className="blog-container">
          <div className="blog-header">
            <div>
              <span className="blog-eyebrow">Novedades</span>
              <h2>Desde Ruralit</h2>
            </div>
            <a href="/novedades/" className="blog-cta">
              Ver más
            </a>
          </div>

          <div className="blog-grid">
            {articles.map((article) => (
              <a
                key={article.id}
                href={article.link}
                className="blog-card"
              >
                <div className="blog-card-img">
                  {articleIcons[article.id]}
                </div>
                <div className="blog-card-body">
                  <span
                    className="blog-category"
                    style={{
                      background: categoryStyles[article.category].bg,
                      color: categoryStyles[article.category].text,
                    }}
                  >
                    {article.category}
                  </span>
                  <div className="blog-title">{article.title}</div>
                  <div className="blog-meta">
                    {article.date} &middot; {article.readTime} de lectura
                  </div>
                  <span className="blog-link">
                    Leer art&iacute;culo &rarr;
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogSection;