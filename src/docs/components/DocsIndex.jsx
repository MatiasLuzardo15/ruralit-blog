import React, { useEffect, useState } from 'react';
import { DOCS_BASE, DOC_CATEGORIES, articlesOf, categoryHref, docHref } from '../content/index.js';
import { Link } from '../router.jsx';
import { useActiveSection } from './useActiveSection.js';

/**
 * El índice del cuaderno: va en el lomo (escritorio) y en el panel de temas
 * (móvil). El tema abierto muestra sus artículos y el artículo abierto, sus
 * secciones: así «En esta página» vive en el mismo índice y no en otra columna.
 */
export default function DocsIndex({ categoryId, slug, toc = [], onNavigate }) {
  const [expanded, setExpanded] = useState(() => new Set(categoryId ? [categoryId] : []));
  const activeSection = useActiveSection(toc);

  // Al llegar a un artículo por un enlace o por el buscador, su tema se abre solo.
  useEffect(() => {
    if (!categoryId) return;
    setExpanded(current => (current.has(categoryId) ? current : new Set(current).add(categoryId)));
  }, [categoryId]);

  const toggle = id =>
    setExpanded(current => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <nav aria-label="Índice de la documentación" className="dx-index">
      <Link href={`${DOCS_BASE}/`} onClick={onNavigate} className="dx-index-home" aria-current={!categoryId ? 'page' : undefined}>
        Cómo usar Ruralit
      </Link>

      <ol className="dx-index-topics">
        {DOC_CATEGORIES.map(category => {
          const isOpen = expanded.has(category.id);
          const isCurrent = category.id === categoryId;
          return (
            <li key={category.id} className={isCurrent ? 'is-current' : undefined}>
              <div className="dx-index-row">
                <Link
                  href={categoryHref(category.id)}
                  onClick={onNavigate}
                  aria-current={isCurrent && !slug ? 'page' : undefined}
                  className="dx-index-topic"
                >
                  {category.title}
                </Link>
                <button
                  type="button"
                  onClick={() => toggle(category.id)}
                  aria-expanded={isOpen}
                  aria-label={`${isOpen ? 'Cerrar' : 'Abrir'} ${category.title}`}
                  className="dx-index-toggle"
                >
                  <span aria-hidden="true">{isOpen ? '−' : '+'}</span>
                </button>
              </div>

              {isOpen && (
                <ul className="dx-index-articles">
                  {articlesOf(category.id).map(article => {
                    const isActive = isCurrent && article.slug === slug;
                    return (
                      <li key={article.slug}>
                        <Link
                          href={docHref(article)}
                          onClick={onNavigate}
                          aria-current={isActive ? 'page' : undefined}
                          className={isActive ? 'is-active' : undefined}
                        >
                          {article.title}
                        </Link>
                        {isActive && toc.length > 1 && (
                          <ul className="dx-index-sections" aria-label="En esta página">
                            {toc.map(item => (
                              <li key={item.id}>
                                <Link
                                  href={`#${item.id}`}
                                  onClick={onNavigate}
                                  aria-current={item.id === activeSection ? 'location' : undefined}
                                  className={item.id === activeSection ? 'is-active' : undefined}
                                >
                                  {item.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
