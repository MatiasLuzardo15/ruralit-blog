import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronRight, CornerDownLeft, Search, X } from 'lucide-react';
import { DOC_STARTING_POINTS, docHref, getArticleByKey, getCategory } from '../content/index.js';
import { highlightSegments, queryTerms, searchDocs } from '../content/search.js';
import { navigate } from '../router.jsx';

function Highlighted({ text, terms }) {
  return (
    <>
      {highlightSegments(text, terms).map((segment, index) =>
        segment.hit ? <mark key={index}>{segment.text}</mark> : <React.Fragment key={index}>{segment.text}</React.Fragment>,
      )}
    </>
  );
}

/** Sin búsqueda escrita se ofrecen los artículos por los que conviene empezar. */
const startingHits = () =>
  DOC_STARTING_POINTS.flatMap(key => {
    const article = getArticleByKey(key);
    const category = getCategory(article?.category);
    if (!article || !category) return [];
    return [{ article, category, sectionId: null, sectionTitle: null, href: docHref(article), snippet: article.summary }];
  });

export default function DocsSearch({ open, initialQuery = '', onClose }) {
  const [query, setQuery] = useState(initialQuery);
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const returnFocusRef = useRef(null);

  const idle = query.trim() === '';
  const terms = useMemo(() => queryTerms(query), [query]);
  const rows = useMemo(() => (idle ? startingHits() : searchDocs(query)), [idle, query]);

  // Al abrir: parte de cero (o de la consulta recibida), enfoca el campo y
  // bloquea el scroll de la página. Al cerrar, devuelve el foco a quien lo abrió.
  useEffect(() => {
    if (!open) return undefined;
    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setQuery(initialQuery);
    setActive(0);
    const frame = requestAnimationFrame(() => inputRef.current?.focus());
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      returnFocusRef.current?.focus?.({ preventScroll: true });
    };
  }, [open, initialQuery]);

  useEffect(() => { setActive(0); }, [query]);

  useEffect(() => {
    if (!open) return;
    document.getElementById(`dx-search-row-${active}`)?.scrollIntoView({ block: 'nearest' });
  }, [active, open]);

  if (!open) return null;

  const go = row => {
    onClose();
    navigate(row.href);
  };

  const onKeyDown = event => {
    if (event.key === 'Escape') {
      event.preventDefault();
      onClose();
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActive(index => Math.min(index + 1, rows.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActive(index => Math.max(index - 1, 0));
    } else if (event.key === 'Enter' && rows[active]) {
      event.preventDefault();
      go(rows[active]);
    }
  };

  return createPortal(
    <div className="dx-search-layer" role="dialog" aria-modal="true" aria-label="Buscar en la documentación">
      <div className="dx-search-backdrop" onClick={onClose} />
      <div className="dx-search-panel" onKeyDown={onKeyDown}>
        <div className="dx-search-field">
          <Search size={18} strokeWidth={1.75} aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder="¿Qué querés hacer? Ej.: cerrar el ejercicio"
            aria-label="Buscar en la documentación"
            aria-controls="dx-search-results"
            aria-activedescendant={rows[active] ? `dx-search-row-${active}` : undefined}
            autoComplete="off"
            spellCheck="false"
          />
          <button type="button" onClick={onClose} className="dx-icon-btn" aria-label="Cerrar el buscador">
            <X size={18} />
          </button>
        </div>

        <div className="dx-search-body">
          <p className="dx-search-caption">
            {idle ? 'Por dónde empezar' : rows.length > 0 ? `${rows.length} ${rows.length === 1 ? 'resultado' : 'resultados'}` : ''}
          </p>

          {!idle && rows.length === 0 ? (
            <div className="dx-search-empty">
              <p>No encontramos nada para «{query.trim()}».</p>
              <p>Probá con otra palabra, por ejemplo lo que querés hacer: «invitar», «exportar», «IVA».</p>
            </div>
          ) : (
            <ul id="dx-search-results" role="listbox" className="dx-search-results">
              {rows.map((row, index) => (
                <li key={row.href} id={`dx-search-row-${index}`} role="option" aria-selected={index === active}>
                  <a
                    href={row.href}
                    onClick={event => {
                      if (event.metaKey || event.ctrlKey || event.shiftKey) return;
                      event.preventDefault();
                      go(row);
                    }}
                    onMouseMove={() => setActive(index)}
                    className={`dx-search-row${index === active ? ' is-active' : ''}`}
                  >
                    <span className="dx-search-trail">
                      {row.category.title}
                      {row.sectionTitle && (
                        <>
                          <ChevronRight size={12} aria-hidden="true" />
                          {row.article.title}
                        </>
                      )}
                    </span>
                    <span className="dx-search-title">
                      <Highlighted text={row.sectionTitle ?? row.article.title} terms={idle ? [] : terms} />
                    </span>
                    <span className="dx-search-snippet">
                      <Highlighted text={row.snippet} terms={idle ? [] : terms} />
                    </span>
                    {index === active && <CornerDownLeft size={15} className="dx-search-enter" aria-hidden="true" />}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="dx-search-foot" aria-hidden="true">
          <span><kbd>↑</kbd><kbd>↓</kbd> moverse</span>
          <span><kbd>Enter</kbd> abrir</span>
          <span><kbd>Esc</kbd> cerrar</span>
        </div>
      </div>
    </div>,
    document.body,
  );
}
