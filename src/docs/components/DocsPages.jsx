import React from 'react';
import { ArrowLeft, ArrowRight, Search } from 'lucide-react';
import {
  DOC_ARTICLES, DOC_CATEGORIES, DOC_STARTING_POINTS, articlesOf, categoryHref, docHref,
  getArticleByKey, getCategory, neighborsOf,
} from '../content/index.js';
import { formatDocDate } from '../content/text.js';
import { Link } from '../router.jsx';
import { DocContent } from './DocBlocks.jsx';
import { shortcutLabel } from './platform.js';

const SUPPORT_EMAIL = 'matiasluzardevv@gmail.com';

export const supportHref = subject =>
  `https://mail.google.com/mail/?view=cm&fs=1&to=${SUPPORT_EMAIL}&su=${encodeURIComponent(subject)}`;

/** Frases de ejemplo: el buscador se usa como el cuadro «¿Qué pasó hoy?» de la app. */
const SEARCH_EXAMPLES = ['dictar un gasto', 'stock mínimo', 'ejercicio agrícola', 'invitar al contador', 'IVA', 'importar Excel'];

const articleCount = count => `${count} ${count === 1 ? 'artículo' : 'artículos'}`;

/** Una hoja del cuaderno, con la pestaña del tema asomando arriba. */
function Sheet({ tab, children, className = '' }) {
  return (
    <div className={`dx-sheet ${className}`}>
      {tab}
      <div className="dx-sheet-inner">{children}</div>
    </div>
  );
}

function TopicTab({ category, linked }) {
  return linked ? (
    <Link href={categoryHref(category.id)} className="dx-tab">{category.title}</Link>
  ) : (
    <span className="dx-tab" aria-current="page">{category.title}</span>
  );
}

/** Una línea del índice: título y bajada a la izquierda, puntos guía y el dato a la derecha. */
function IndexLine({ href, title, detail, aside }) {
  return (
    <li>
      <Link href={href} className="dx-line">
        <span className="dx-line-text">
          <span className="dx-line-title">{title}</span>
          {detail && <span className="dx-line-detail">{detail}</span>}
        </span>
        {aside && <span className="dx-line-aside">{aside}</span>}
      </Link>
    </li>
  );
}

export function DocsHome({ openSearch }) {
  const latest = DOC_ARTICLES.reduce((max, article) => (article.updated > max ? article.updated : max), '');
  const firstSteps = DOC_STARTING_POINTS.map(getArticleByKey).filter(Boolean);

  return (
    <div className="dx-notebook is-home">
      <header className="dx-cover">
        <div className="dx-cover-sticky">
          <p className="dx-cover-mark"><span className="dx-wordmark">ruralit<span>.</span></span> Cuaderno de ayuda</p>
          <h1 className="dx-cover-title">Cómo usar Ruralit, sección por sección.</h1>
          <p className="dx-cover-lead">
            Contanos qué querés hacer, como cuando anotás algo en la app, y te llevamos a la guía que lo explica.
          </p>

          <button type="button" onClick={() => openSearch()} className="dx-ask">
            <span className="dx-ask-prompt">¿Qué querés hacer?</span>
            <span className="dx-ask-line">
              <Search size={18} strokeWidth={1.75} aria-hidden="true" />
              <span>Ej.: cerrar el ejercicio</span>
              <kbd aria-hidden="true">{shortcutLabel()}</kbd>
            </span>
          </button>

          <div className="dx-ask-examples" aria-label="Búsquedas de ejemplo">
            {SEARCH_EXAMPLES.map(example => (
              <button key={example} type="button" onClick={() => openSearch(example)}>{example}</button>
            ))}
          </div>

          <p className="dx-cover-meta">
            {DOC_ARTICLES.length} artículos en {DOC_CATEGORIES.length} temas, revisados contra la app
            {latest && <> el {formatDocDate(latest)}</>}.
          </p>
        </div>
      </header>

      <Sheet className="is-index">
        <section aria-labelledby="dx-first">
          <h2 id="dx-first" className="dx-sheet-heading">Si es tu primera vez</h2>
          <p className="dx-sheet-note">Leelas en este orden para configurar tu campo y hacer tus primeros registros.</p>
          <ol className="dx-first-steps">
            {firstSteps.map((article, index) => (
              <li key={docHref(article)}>
                <span className="dx-first-num" aria-hidden="true">{index + 1}</span>
                <Link href={docHref(article)}>{article.title}</Link>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="dx-topics">
          <h2 id="dx-topics" className="dx-sheet-heading">Índice</h2>
          <ul className="dx-lines">
            {DOC_CATEGORIES.map(category => (
              <IndexLine
                key={category.id}
                href={categoryHref(category.id)}
                title={category.title}
                detail={category.description}
                aside={articleCount(articlesOf(category.id).length)}
              />
            ))}
          </ul>
        </section>

        <footer className="dx-sheet-foot">
          <p>¿Una duda rápida? Las <a href="/faq/" className="dx-link">preguntas frecuentes</a> la responden en una o dos frases.</p>
          <p>¿No encontrás algo o no coincide con la app? <a href={supportHref('Documentación de Ruralit')} target="_blank" rel="noopener noreferrer" className="dx-link">Escribinos</a> y te respondemos por correo.</p>
        </footer>
      </Sheet>
    </div>
  );
}

export function DocsCategoryPage({ category }) {
  const articles = articlesOf(category.id);

  return (
    <Sheet tab={<TopicTab category={category} />}>
      <header className="dx-sheet-head">
        <h1 className="dx-title">{category.title}</h1>
        <p className="dx-lead">{category.description}</p>
      </header>
      <ul className="dx-lines is-articles">
        {articles.map(article => (
          <IndexLine key={article.slug} href={docHref(article)} title={article.title} detail={article.summary} />
        ))}
      </ul>
    </Sheet>
  );
}

export function DocsArticlePage({ article, category }) {
  const { previous, next } = neighborsOf(article);
  const related = (article.related ?? []).map(getArticleByKey).filter(Boolean);

  return (
    <Sheet tab={<TopicTab category={category} linked />}>
      <header className="dx-sheet-head">
        <h1 className="dx-title">{article.title}</h1>
        <p className="dx-lead">{article.summary}</p>
        <p className="dx-meta">Revisado el {formatDocDate(article.updated)}</p>
      </header>

      <div className="dx-article-body">
        <DocContent article={article} />
      </div>

      {related.length > 0 && (
        <section className="dx-related" aria-labelledby="dx-related">
          <h2 id="dx-related" className="dx-sheet-heading">Seguí leyendo</h2>
          <ul className="dx-lines">
            {related.map(candidate => (
              <IndexLine
                key={docHref(candidate)}
                href={docHref(candidate)}
                title={candidate.title}
                aside={getCategory(candidate.category)?.title}
              />
            ))}
          </ul>
        </section>
      )}

      {(previous || next) && (
        <nav aria-label={`Otros artículos de ${category.title}`} className="dx-pager">
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

      <p className="dx-margin-note">
        ¿Algo no coincide con lo que ves en la app?{' '}
        <a href={supportHref(`Documentación: ${article.title}`)} target="_blank" rel="noopener noreferrer" className="dx-link">
          Avisanos y lo corregimos
        </a>.
      </p>
    </Sheet>
  );
}
