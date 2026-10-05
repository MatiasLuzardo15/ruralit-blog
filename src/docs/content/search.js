import { DOC_ARTICLES, docHref, getCategory, sectionsOf } from './index.js';
import { blockText, normalizeText, stripInline } from './text.js';

/**
 * Buscador de la documentación.
 *
 * Indexa cada artículo por secciones (los títulos `h2`), no por artículo
 * entero: buscar «cerrar ejercicio» lleva a la sección que lo explica, no al
 * principio de un artículo largo. Ignora tildes y mayúsculas, exige que
 * aparezcan todas las palabras escritas y prefiere las coincidencias que
 * empiezan una palabra («gas» encuentra «gasoil» antes que «desgaste»).
 */

let indexCache = null;

const buildIndex = () => {
  const records = [];

  for (const article of DOC_ARTICLES) {
    const category = getCategory(article.category);
    if (!category) continue;
    const nTitle = normalizeText(article.title);
    const nKeywords = normalizeText((article.keywords ?? []).join(' '));
    const nCategory = normalizeText(category.title);
    const nSummary = normalizeText(article.summary);

    for (const section of sectionsOf(article)) {
      const isIntro = section.id === null;
      // El título de la sección ya viaja aparte: no se repite dentro del cuerpo.
      const body = section.blocks
        .filter(block => block.type !== 'h2')
        .map(blockText)
        .join(' ');

      records.push({
        article,
        category,
        sectionId: section.id,
        sectionTitle: isIntro ? null : stripInline(section.title),
        body,
        nTitle,
        nKeywords,
        nCategory,
        nSection: isIntro ? '' : normalizeText(stripInline(section.title)),
        nSummary: isIntro ? nSummary : '',
        nBody: normalizeText(body),
      });
    }
  }

  return records;
};

const getIndex = () => (indexCache ??= buildIndex());

const isWordChar = char => Boolean(char && /[a-z0-9]/.test(char));

/** ¿La palabra buscada empieza una palabra del texto? */
const startsWord = (text, term) => {
  let from = 0;
  while (from <= text.length) {
    const at = text.indexOf(term, from);
    if (at === -1) return false;
    if (at === 0 || !isWordChar(text[at - 1])) return true;
    from = at + 1;
  }
  return false;
};

/** ¿La palabra buscada es una palabra completa del texto? */
const hasWord = (text, term) =>
  new RegExp(`(^|[^a-z0-9])${term}([^a-z0-9]|$)`).test(text);

/** Palabra entera > empieza una palabra > aparece dentro. */
const fieldScore = (text, term, exact, starts, inside) => {
  if (!text) return 0;
  if (hasWord(text, term)) return exact;
  if (startsWord(text, term)) return starts;
  return text.includes(term) ? inside : 0;
};

export const queryTerms = query => {
  const terms = normalizeText(query).split(/[^a-z0-9]+/).filter(Boolean);
  // Una letra suelta no dice nada: solo cuenta cuando es lo único escrito.
  const meaningful = terms.filter(term => term.length > 1);
  return meaningful.length > 0 ? meaningful : terms;
};

const scoreRecord = (record, terms, phrase) => {
  let total = 0;

  for (const term of terms) {
    const article = Math.max(
      fieldScore(record.nTitle, term, 50, 30, 18),
      fieldScore(record.nKeywords, term, 36, 22, 12),
      fieldScore(record.nCategory, term, 8, 6, 3),
    );
    const local = Math.max(
      fieldScore(record.nSection, term, 28, 20, 10),
      fieldScore(record.nSummary, term, 12, 8, 4),
      fieldScore(record.nBody, term, 6, 5, 3),
    );
    if (article + local === 0) return -1;
    total += article + local;
  }

  if (terms.length > 1) {
    if (record.nTitle.includes(phrase)) total += 40;
    if (record.nSection.includes(phrase)) total += 25;
  }

  // Si todo lo escrito está en el título, el mejor destino es el artículo
  // entero (su introducción), no una sección suelta que repite la palabra.
  if (record.sectionId === null && terms.every(term => record.nTitle.includes(term))) total += 25;

  return total;
};

/**
 * Normalizar cambia la longitud (quitar una tilde puede acortar el texto), así
 * que un índice sobre el normalizado no vale para el original. Se normaliza
 * carácter a carácter recordando de dónde vino cada trozo.
 */
const normalizeWithMap = text => {
  let norm = '';
  const origin = [];
  let offset = 0;

  for (const char of text) {
    const piece = normalizeText(char);
    for (let i = 0; i < piece.length; i++) origin.push(offset);
    norm += piece;
    offset += char.length;
  }
  origin.push(text.length);

  return { norm, origin };
};

const mergeRanges = ranges => {
  const sorted = [...ranges].sort((a, b) => a[0] - b[0]);
  const merged = [];
  for (const range of sorted) {
    const last = merged[merged.length - 1];
    if (last && range[0] <= last[1]) last[1] = Math.max(last[1], range[1]);
    else merged.push([range[0], range[1]]);
  }
  return merged;
};

const matchRanges = (text, terms) => {
  const { norm, origin } = normalizeWithMap(text);
  const ranges = [];

  for (const term of terms) {
    let from = 0;
    while (term) {
      const at = norm.indexOf(term, from);
      if (at === -1) break;
      ranges.push([origin[at], origin[at + term.length]]);
      from = at + term.length;
    }
  }

  return mergeRanges(ranges);
};

/** Parte un texto en trozos `{ text, hit }`, marcando los que coinciden con la búsqueda. */
export const highlightSegments = (text, terms) => {
  if (terms.length === 0) return [{ text, hit: false }];
  const ranges = matchRanges(text, terms);
  if (ranges.length === 0) return [{ text, hit: false }];

  const segments = [];
  let cursor = 0;
  for (const [start, end] of ranges) {
    if (start > cursor) segments.push({ text: text.slice(cursor, start), hit: false });
    segments.push({ text: text.slice(start, end), hit: true });
    cursor = end;
  }
  if (cursor < text.length) segments.push({ text: text.slice(cursor), hit: false });
  return segments;
};

const SNIPPET_LENGTH = 150;

const snippetFor = (record, terms) => {
  const source = record.body;
  const ranges = source ? matchRanges(source, terms) : [];

  if (ranges.length === 0) {
    // Sin coincidencia en el cuerpo: la introducción enseña el resumen del artículo.
    if (record.sectionId === null) return record.article.summary;
    return source.length > SNIPPET_LENGTH ? `${source.slice(0, SNIPPET_LENGTH).trimEnd()}…` : source;
  }

  const first = ranges[0][0];
  let start = Math.max(0, first - 50);
  if (start > 0) {
    // Empieza en una palabra entera, no a mitad de ella.
    const space = source.indexOf(' ', start);
    if (space !== -1 && space < first) start = space + 1;
  }
  let end = Math.min(source.length, start + SNIPPET_LENGTH);
  if (end < source.length) {
    const space = source.lastIndexOf(' ', end);
    if (space > first) end = space;
  }

  return `${start > 0 ? '…' : ''}${source.slice(start, end).trim()}${end < source.length ? '…' : ''}`;
};

/** Devuelve, como mucho, un resultado por artículo: la sección que mejor responde. */
export const searchDocs = (query, limit = 8) => {
  const terms = queryTerms(query);
  if (terms.length === 0) return [];
  const phrase = terms.join(' ');

  const best = new Map();
  for (const record of getIndex()) {
    const score = scoreRecord(record, terms, phrase);
    if (score < 0) continue;
    const current = best.get(record.article);
    if (!current || score > current.score) best.set(record.article, { record, score });
  }

  return [...best.values()]
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ record, score }) => ({
      article: record.article,
      category: record.category,
      sectionId: record.sectionId,
      sectionTitle: record.sectionTitle,
      href: docHref(record.article, record.sectionId),
      snippet: snippetFor(record, terms),
      score,
    }));
};
