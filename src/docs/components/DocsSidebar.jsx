import React, { useEffect, useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { DOCS_BASE, DOC_CATEGORIES, articlesOf, categoryHref, docHref } from '../content/index.js';
import { Link } from '../router.jsx';
import DocIcon from './DocIcon.jsx';
import { shortcutLabel } from './platform.js';

export default function DocsSidebar({ categoryId, slug, onOpenSearch, onNavigate }) {
  const [expanded, setExpanded] = useState(() => new Set(categoryId ? [categoryId] : []));

  // Al llegar a un artículo por un enlace o por el buscador, su categoría se abre sola.
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
    <nav aria-label="Documentación" className="dx-sidebar">
      <button type="button" onClick={onOpenSearch} className="dx-search-trigger is-compact">
        <Search size={16} strokeWidth={1.75} aria-hidden="true" />
        <span>Buscar</span>
        <kbd aria-hidden="true">{shortcutLabel()}</kbd>
      </button>

      <Link
        href={`${DOCS_BASE}/`}
        onClick={onNavigate}
        aria-current={!categoryId ? 'page' : undefined}
        className={`dx-side-home${!categoryId ? ' is-active' : ''}`}
      >
        Inicio de la documentación
      </Link>

      <p className="dx-side-group">Temas</p>
      {DOC_CATEGORIES.map(category => {
        const isOpen = expanded.has(category.id);
        const isCurrent = category.id === categoryId;
        const onCategoryPage = isCurrent && !slug;
        return (
          <div key={category.id} className="dx-side-category">
            <div className="dx-side-row">
              <Link
                href={categoryHref(category.id)}
                onClick={onNavigate}
                aria-current={onCategoryPage ? 'page' : undefined}
                className={`dx-side-link${onCategoryPage || (isCurrent && !isOpen) ? ' is-active' : ''}`}
              >
                <DocIcon name={category.icon} size={16} />
                <span>{category.title}</span>
              </Link>
              <button
                type="button"
                onClick={() => toggle(category.id)}
                aria-expanded={isOpen}
                aria-label={`${isOpen ? 'Contraer' : 'Expandir'} ${category.title}`}
                className="dx-side-toggle"
              >
                <ChevronDown size={15} className={isOpen ? 'is-open' : ''} />
              </button>
            </div>

            {isOpen && (
              <ul className="dx-side-articles">
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
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </nav>
  );
}
