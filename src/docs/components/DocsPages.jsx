import React, { useMemo } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, ChevronRight, Mail, Search } from 'lucide-react';
import {
  DOCS_BASE, DOC_ARTICLES, DOC_CATEGORIES, DOC_STARTING_POINTS, articlesOf, categoryHref, docHref,
  getArticleByKey, getCategory, neighborsOf, sectionsOf,
} from '../content/index.js';
import { formatDocDate, stripInline } from '../content/text.js';
import { Link } from '../router.jsx';
import { DocContent } from './DocBlocks.jsx';
import DocIcon from './DocIcon.jsx';
import DocsToc from './DocsToc.jsx';
import { shortcutLabel } from './platform.js';

const SUPPORT_EMAIL = 'matiasluzardevv@gmail.com';

export const supportHref = subject =>
  `https://mail.google.com/mail/?view=cm&fs=1&to=${SUPPORT_EMAIL}&su=${encodeURIComponent(subject)}`;

/** Búsquedas de ejemplo: enseñan que se puede preguntar por lo que se quiere hacer. */
const SEARCH_EXAMPLES = ['Dictar un gasto', 'Stock mínimo', 'Ejercicio agrícola', 'Invitar al contador', 'IVA', 'Importar Excel'];

function Breadcrumb({ category, current }) {
  return (
    <nav aria-label="Ruta" className="dx-breadcrumb">
      <Link href={`${DOCS_BASE}/`}>Documentación</Link>
      {category && (
        <>
          <ChevronRight size={13} aria-hidden="true" />
          {current ? (
            <Link href={categoryHref(category.id)}>{category.title}</Link>
          ) : (
            <span aria-current="page">{category.title}</span>
          )}
        </>
      )}
    </nav>
  );
}

export function DocsHome({ openSearch }) {
  const latest = DOC_ARTICLES.reduce((max, article) => (article.updated > max ? article.updated : max), '');
  const starting = DOC_STARTING_POINTS.map(getArticleByKey).filter(Boolean);

  return (
    <div className="dx-page">
      <header className="dx-hero">
        <span className="eyebrow">Centro de ayuda</span>
        <h1 className="dx-display">Todo Ruralit,<br />explicado.</h1>
        <p className="dx-lead">
          Guías paso a paso de cada sección de la app. Buscá por lo que querés hacer: no hace falta saber
          cómo se llama la pantalla.
        </p>

        <button type="button" onClick={() => openSearch()} className="dx-search-trigger is-hero">
          <Search size={19} strokeWidth={1.75} aria-hidden="true" />
          <span>Buscar en la documentación</span>
          <kbd aria-hidden="true">{shortcutLabel()}</kbd>
        </button>

        <div className="dx-examples">
          <span>Probá con</span>
          {SEARCH_EXAMPLES.map(example => (
            <button key={example} type="button" onClick={() => openSearch(example)} className="dx-chip">
              {example}
            </button>
          ))}
        </div>

        <p className="dx-meta">
          {DOC_ARTICLES.length} artículos en {DOC_CATEGORIES.length} temas
          {latest && <> · Revisada contra la app el {formatDocDate(latest)}</>}
        </p>
      </header>

      <section className="dx-home-section" aria-labelledby="dx-starting">
        <h2 id="dx-starting" className="dx-section-title">Por dónde empezar</h2>
        <div className="dx-grid is-three">
          {starting.map(article => (
            <Link key={docHref(article)} href={docHref(article)} className="dx-card is-link">
              <span className="dx-card-kicker">{getCategory(article.category)?.title}</span>
              <span className="dx-card-title">{article.title}</span>
              <span className="dx-card-text">{article.summary}</span>
              <span className="dx-card-cta">Leer <ArrowUpRight size={14} aria-hidden="true" /></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="dx-home-section" aria-labelledby="dx-topics">
        <h2 id="dx-topics" className="dx-section-title">Explorá por tema</h2>
        <div className="dx-grid is-two">
          {DOC_CATEGORIES.map(category => {
            const count = articlesOf(category.id).length;
            return (
              <Link key={category.id} href={categoryHref(category.id)} className="dx-card is-link is-topic">
                <span className="dx-topic-icon"><DocIcon name={category.icon} size={20} strokeWidth={1.9} /></span>
                <span>
                  <span className="dx-card-title">{category.title}</span>
                  <span className="dx-card-text">{category.description}</span>
                  <span className="dx-card-cta">
                    {count} {count === 1 ? 'artículo' : 'artículos'} <ChevronRight size={14} aria-hidden="true" />
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="dx-home-section dx-grid is-two" aria-label="Más ayuda">
        <div className="dx-card">
          <h2 className="dx-card-title">¿Una duda rápida?</h2>
          <p className="dx-card-text">Las preguntas frecuentes responden lo que más nos escriben, en una o dos frases.</p>
          <a href="/faq/" className="btn-outline dx-card-action">
            <BookOpen size={16} aria-hidden="true" /> Ver preguntas frecuentes
          </a>
        </div>
        <div className="dx-card is-featured">
          <h2 className="dx-card-title">¿Falta algo?</h2>
          <p className="dx-card-text">
            Si no encontrás una respuesta o algo no coincide con lo que ves en la app, escribinos. Te respondemos por correo.
          </p>
          <a href={supportHref('Documentación de Ruralit')} target="_blank" rel="noopener noreferrer" className="btn-primary dx-card-action">
            <Mail size={16} aria-hidden="true" /> Escribinos <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
      </section>
    </div>
  );
}

export function DocsCategoryPage({ category }) {
  const articles = articlesOf(category.id);

  return (
    <div className="dx-page">
      <Breadcrumb category={category} />
      <header className="dx-category-head">
        <span className="dx-topic-icon is-large"><DocIcon name={category.icon} size={24} strokeWidth={1.8} /></span>
        <h1 className="dx-title">{category.title}</h1>
        <p className="dx-lead">{category.description}</p>
      </header>

      <ul className="dx-article-list">
        {articles.map(article => (
          <li key={article.slug}>
            <Link href={docHref(article)}>
              <span>
                <span className="dx-article-list-title">{article.title}</span>
                <span className="dx-article-list-summary">{article.summary}</span>
              </span>
              <ChevronRight size={20} aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function DocsArticlePage({ article, category }) {
  const toc = useMemo(
    () =>
      sectionsOf(article)
        .filter(section => section.id !== null)
        .map(section => ({ id: section.id, title: stripInline(section.title) })),
    [article],
  );
  const { previous, next } = neighborsOf(article);
  const related = (article.related ?? []).map(getArticleByKey).filter(Boolean);

  return (
    <div className="dx-article-layout">
      <article className="dx-article">
        <Breadcrumb category={category} current />

        <header className="dx-article-head">
          <h1 className="dx-title">{article.title}</h1>
          <p className="dx-lead">{article.summary}</p>
          <p className="dx-meta">Revisado el {formatDocDate(article.updated)}</p>
        </header>

        {toc.length >= 3 && (
          <details className="dx-toc-mobile">
            <summary>En esta página</summary>
            <ul>
              {toc.map(item => (
                <li key={item.id}><Link href={`#${item.id}`}>{item.title}</Link></li>
              ))}
            </ul>
          </details>
        )}

        <div className="dx-article-body">
          <DocContent article={article} />
        </div>

        {related.length > 0 && (
          <section className="dx-related" aria-labelledby="dx-related">
            <h2 id="dx-related" className="dx-section-title">Seguí leyendo</h2>
            <div className="dx-grid is-two">
              {related.map(candidate => (
                <Link key={docHref(candidate)} href={docHref(candidate)} className="dx-card is-link is-compact">
                  <span className="dx-card-kicker">{getCategory(candidate.category)?.title}</span>
                  <span className="dx-related-title">
                    {candidate.title}
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {(previous || next) && (
          <nav aria-label="Artículos de este tema" className="dx-pager">
            {previous ? (
              <Link href={docHref(previous)} className="dx-pager-link">
                <span className="dx-pager-label"><ArrowLeft size={14} aria-hidden="true" /> Anterior</span>
                <span className="dx-pager-title">{previous.title}</span>
              </Link>
            ) : <span />}
            {next && (
              <Link href={docHref(next)} className="dx-pager-link is-next">
                <span className="dx-pager-label">Siguiente <ArrowRight size={14} aria-hidden="true" /></span>
                <span className="dx-pager-title">{next.title}</span>
              </Link>
            )}
          </nav>
        )}

        <aside className="dx-feedback">
          <div>
            <h2 className="dx-card-title">¿Algo no coincide con lo que ves?</h2>
            <p className="dx-card-text">
              La documentación sigue a Ruralit de cerca, pero puede quedarse atrás. Contanos y lo corregimos.
            </p>
          </div>
          <a href={supportHref(`Documentación: ${article.title}`)} target="_blank" rel="noopener noreferrer" className="btn-primary">
            <Mail size={16} aria-hidden="true" /> Avisarnos <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </aside>
      </article>

      <aside className="dx-article-aside">
        <div className="dx-sticky">
          <DocsToc items={toc} />
        </div>
      </aside>
    </div>
  );
}
