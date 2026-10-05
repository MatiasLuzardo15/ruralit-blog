import { DOC_CATEGORIES } from './categories.js';
import { slugify } from './text.js';
import { primerosPasosArticles } from './articles/primeros-pasos.js';
import { registrarArticles } from './articles/registrar.js';
import { movimientosArticles } from './articles/movimientos.js';
import { stockArticles } from './articles/stock.js';
import { balancesArticles } from './articles/balances.js';
import { proyectosArticles } from './articles/proyectos.js';
import { reportesArticles } from './articles/reportes.js';
import { importarArticles } from './articles/importar.js';
import { equipoArticles } from './articles/equipo.js';
import { impuestosArticles } from './articles/impuestos.js';
import { ajustesArticles } from './articles/ajustes.js';
import { seguridadArticles } from './articles/seguridad.js';
import { planesArticles } from './articles/planes.js';
import { ayudaArticles } from './articles/ayuda.js';

export { DOC_CATEGORIES };

/** Prefijo de todas las rutas de la documentación. */
export const DOCS_BASE = '/docs';

const ARTICLES_BY_CATEGORY = {
  'primeros-pasos': primerosPasosArticles,
  registrar: registrarArticles,
  movimientos: movimientosArticles,
  stock: stockArticles,
  balances: balancesArticles,
  proyectos: proyectosArticles,
  reportes: reportesArticles,
  importar: importarArticles,
  equipo: equipoArticles,
  impuestos: impuestosArticles,
  ajustes: ajustesArticles,
  seguridad: seguridadArticles,
  planes: planesArticles,
  ayuda: ayudaArticles,
};

/**
 * Todos los artículos, en el orden de las categorías y luego el de cada archivo.
 * Cada artículo: { slug, category, title, summary, keywords?, updated, related?, blocks }.
 * `related` son otros artículos como `categoria/slug`.
 */
export const DOC_ARTICLES = DOC_CATEGORIES.flatMap(category => ARTICLES_BY_CATEGORY[category.id] ?? []);

/**
 * Por dónde empezar. Es una lista curada y no un contador de visitas: no
 * medimos qué lee la gente, así que no podemos ordenar por popularidad.
 */
export const DOC_STARTING_POINTS = [
  'primeros-pasos/que-es-ruralit',
  'primeros-pasos/configuracion-inicial',
  'registrar/registro-rapido',
  'balances/leer-el-balance',
  'equipo/invitar-a-tu-equipo',
  'importar/importar-desde-excel',
];

export const docKey = article => `${article.category}/${article.slug}`;

export const docHref = (article, sectionId) =>
  `${DOCS_BASE}/${article.category}/${article.slug}${sectionId ? `#${sectionId}` : ''}`;

export const categoryHref = categoryId => `${DOCS_BASE}/${categoryId}`;

export const getCategory = id => DOC_CATEGORIES.find(category => category.id === id);

export const getArticle = (categoryId, slug) =>
  DOC_ARTICLES.find(article => article.category === categoryId && article.slug === slug);

export const getArticleByKey = key => DOC_ARTICLES.find(article => docKey(article) === key);

export const articlesOf = categoryId => DOC_ARTICLES.filter(article => article.category === categoryId);

/** Artículo anterior y siguiente dentro de la misma categoría. */
export const neighborsOf = article => {
  const siblings = articlesOf(article.category);
  const index = siblings.findIndex(candidate => candidate.slug === article.slug);
  return {
    previous: index > 0 ? siblings[index - 1] : null,
    next: index >= 0 && index < siblings.length - 1 ? siblings[index + 1] : null,
  };
};

/**
 * Parte un artículo en secciones por sus títulos `h2`. El renderizador y el
 * buscador usan esta misma función, así los enlaces del buscador
 * (`#seccion`) siempre apuntan a un id que existe. La sección con `id: null`
 * es la introducción: lo que hay antes del primer título.
 */
export const sectionsOf = article => {
  const sections = [{ id: null, title: article.title, blocks: [] }];
  const used = new Set();

  for (const block of article.blocks) {
    if (block.type === 'h2') {
      const base = slugify(block.text) || 'seccion';
      let id = base;
      for (let n = 2; used.has(id); n++) id = `${base}-${n}`;
      used.add(id);
      sections.push({ id, title: block.text, blocks: [block] });
    } else {
      sections[sections.length - 1].blocks.push(block);
    }
  }

  return sections;
};
