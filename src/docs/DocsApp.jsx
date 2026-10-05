import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Menu, Search, X } from 'lucide-react';
import { DOCS_BASE, categoryHref, getArticle, getCategory } from './content/index.js';
import { navigate, parseDocsPath, useLocation } from './router.jsx';
import DocsSearch from './components/DocsSearch.jsx';
import DocsSidebar from './components/DocsSidebar.jsx';
import { DocsArticlePage, DocsCategoryPage, DocsHome } from './components/DocsPages.jsx';

const SITE_URL = 'https://www.ruralit.blog';
const HOME_TITLE = 'Documentación de Ruralit | Centro de ayuda';
const HOME_DESCRIPTION =
  'Guías paso a paso para usar Ruralit: registro rápido y por voz, movimientos, stock, balances, proyectos, reportes, equipo, impuestos y seguridad.';

const isTypingTarget = target => {
  if (!target) return false;
  return target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName);
};

const setMeta = (selector, value) => document.querySelector(selector)?.setAttribute('content', value);

/** Título, descripción y canonical de cada ruta: el HTML solo trae los de la portada. */
const updateHead = (title, description, path) => {
  document.title = title;
  setMeta('meta[name="description"]', description);
  setMeta('meta[property="og:title"]', title);
  setMeta('meta[property="og:description"]', description);
  setMeta('meta[property="og:url"]', `${SITE_URL}${path}`);
  document.querySelector('link[rel="canonical"]')?.setAttribute('href', `${SITE_URL}${path}`);
};

/**
 * Marco de la documentación: barra lateral, buscador y la página en el centro.
 * El buscador se abre con Ctrl/⌘+K o con «/».
 */
export default function DocsApp() {
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchSeed, setSearchSeed] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const previousPath = useRef(null);

  const { categoryId, slug } = parseDocsPath(location.pathname);
  const category = getCategory(categoryId);
  const article = category && slug ? getArticle(categoryId, slug) : null;

  const openSearch = useCallback((query = '') => {
    setMenuOpen(false);
    setSearchSeed(query);
    setSearchOpen(true);
  }, []);

  // Una ruta que no existe vuelve al tema (si existe) o a la portada.
  useEffect(() => {
    if (categoryId && !category) navigate(`${DOCS_BASE}/`, { replace: true });
    else if (category && slug && !article) navigate(categoryHref(category.id), { replace: true });
  }, [categoryId, category, slug, article]);

  // `/docs/?q=texto` abre el buscador ya escrito.
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q');
    if (query === null) return;
    openSearch(query);
    params.delete('q');
    const rest = params.toString();
    navigate(`${location.pathname}${rest ? `?${rest}` : ''}${location.hash}`, { replace: true });
  }, [location.search, location.pathname, location.hash, openSearch]);

  useEffect(() => {
    const onKeyDown = event => {
      if ((event.ctrlKey || event.metaKey) && !event.altKey && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setSearchSeed('');
        setSearchOpen(open => !open);
        return;
      }
      if (event.key === '/' && !event.ctrlKey && !event.metaKey && !event.altKey && !isTypingTarget(event.target)) {
        event.preventDefault();
        openSearch();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [openSearch]);

  // Cada página empieza arriba; un enlace con #sección baja hasta ella. El
  // sitio tiene scroll suave global: solo se anima al saltar dentro del mismo
  // artículo, no al cambiar de página ni al entrar por un enlace con #sección.
  useEffect(() => {
    const samePage = previousPath.current === location.pathname;
    setMenuOpen(false);

    const frame = requestAnimationFrame(() => {
      previousPath.current = location.pathname;
      const id = decodeURIComponent(location.hash.slice(1));
      const target = id ? document.getElementById(id) : null;
      if (target) target.scrollIntoView({ behavior: samePage ? 'smooth' : 'instant', block: 'start' });
      else if (!samePage || !id) window.scrollTo({ top: 0, behavior: 'instant' });
    });
    return () => cancelAnimationFrame(frame);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (article) updateHead(`${article.title} | Documentación de Ruralit`, article.summary, location.pathname);
    else if (category) updateHead(`${category.title} | Documentación de Ruralit`, category.description, location.pathname);
    else updateHead(HOME_TITLE, HOME_DESCRIPTION, `${DOCS_BASE}/`);
  }, [article, category, location.pathname]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = event => { if (event.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  let page;
  if (article) page = <DocsArticlePage key={location.pathname} article={article} category={category} />;
  else if (category && !slug) page = <DocsCategoryPage category={category} />;
  else page = <DocsHome openSearch={openSearch} />;

  return (
    <div className="dx-shell">
      {/* Barra móvil: temas y búsqueda a mano sin ocupar una columna. */}
      <div className="dx-mobile-bar">
        <button type="button" onClick={() => setMenuOpen(true)} className="btn-outline" aria-expanded={menuOpen} aria-controls="dx-drawer">
          <Menu size={16} aria-hidden="true" /> Temas
        </button>
        <button type="button" onClick={() => openSearch()} className="btn-outline" aria-label="Buscar en la documentación">
          <Search size={16} aria-hidden="true" /> Buscar
        </button>
      </div>

      <div className="dx-layout">
        <aside className="dx-layout-aside">
          <div className="dx-sticky dx-sidebar-scroll">
            <DocsSidebar categoryId={category?.id} slug={article?.slug} onOpenSearch={() => openSearch()} />
          </div>
        </aside>
        <main className="dx-layout-main">{page}</main>
      </div>

      {menuOpen && (
        <div id="dx-drawer" className="dx-drawer" role="dialog" aria-modal="true" aria-label="Temas de la documentación">
          <div className="dx-drawer-backdrop" onClick={() => setMenuOpen(false)} />
          <div className="dx-drawer-panel">
            <div className="dx-drawer-head">
              <span>Documentación</span>
              <button type="button" onClick={() => setMenuOpen(false)} className="dx-icon-btn" aria-label="Cerrar temas">
                <X size={18} />
              </button>
            </div>
            <div className="dx-drawer-body">
              <DocsSidebar
                categoryId={category?.id}
                slug={article?.slug}
                onOpenSearch={() => openSearch()}
                onNavigate={() => setMenuOpen(false)}
              />
            </div>
          </div>
        </div>
      )}

      <DocsSearch open={searchOpen} initialQuery={searchSeed} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
