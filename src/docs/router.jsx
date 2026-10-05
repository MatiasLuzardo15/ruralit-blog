import React, { useEffect, useState } from 'react';
import { DOCS_BASE } from './content/index.js';

/**
 * Enrutador mínimo de la documentación. El sitio es una MPA (cada sección es
 * su propio HTML); solo `/docs/*` navega del lado del cliente, así que alcanza
 * con History API y no hace falta sumar react-router.
 */

const listeners = new Set();

const readLocation = () => ({
  pathname: window.location.pathname,
  hash: window.location.hash,
  search: window.location.search,
});

export const navigate = (href, { replace = false } = {}) => {
  const target = href.startsWith('#') ? `${window.location.pathname}${href}` : href;
  window.history[replace ? 'replaceState' : 'pushState']({}, '', target);
  listeners.forEach(listener => listener());
};

export const useLocation = () => {
  const [location, setLocation] = useState(readLocation);

  useEffect(() => {
    const update = () => setLocation(readLocation());
    listeners.add(update);
    window.addEventListener('popstate', update);
    return () => {
      listeners.delete(update);
      window.removeEventListener('popstate', update);
    };
  }, []);

  return location;
};

/** `/docs/stock/agregar-un-recurso` → `{ categoryId: 'stock', slug: 'agregar-un-recurso' }` */
export const parseDocsPath = pathname => {
  const rest = pathname.startsWith(DOCS_BASE) ? pathname.slice(DOCS_BASE.length) : pathname;
  const [categoryId, slug] = rest.split('/').filter(Boolean).map(decodeURIComponent);
  return { categoryId, slug };
};

const isClientRoute = href => href.startsWith('#') || href === DOCS_BASE || href.startsWith(`${DOCS_BASE}/`);

/** Un `<a>` normal que, dentro de /docs, navega sin recargar la página. */
export function Link({ href, onClick, children, ...rest }) {
  const handleClick = event => {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (rest.target === '_blank' || !isClientRoute(href)) return;
    event.preventDefault();
    navigate(href);
  };

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
