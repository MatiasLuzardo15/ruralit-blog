/** Sin tildes ni mayúsculas: «Balance» y «balánce» tienen que ser la misma búsqueda. */
export const normalizeText = value =>
  value.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase();

/** Quita el formato en línea y deja lo que el lector ve. */
export const stripInline = value =>
  value
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1');

export const slugify = value =>
  normalizeText(stripInline(value))
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

/** Texto plano de un bloque: es lo que indexa el buscador. */
export const blockText = block => {
  switch (block.type) {
    case 'h2':
    case 'h3':
    case 'p':
      return stripInline(block.text);
    case 'steps':
    case 'list':
      return block.items.map(stripInline).join(' ');
    case 'callout':
      return stripInline(`${block.title ?? ''} ${block.text}`);
    case 'path':
      return block.steps.join(' ');
    case 'table':
      return [...block.head, ...block.rows.flat()].map(stripInline).join(' ');
    case 'flow':
      return [block.caption ?? '', ...block.nodes.flatMap(node => [node.label, node.detail ?? ''])].map(stripInline).join(' ');
    case 'phrase':
      return [block.caption ?? '', block.text, ...block.fields.flatMap(field => [field.label, field.value])].map(stripInline).join(' ');
    default:
      return '';
  }
};

/** Formato «5 de octubre de 2026» a partir de `AAAA-MM-DD`. */
export const formatDocDate = iso =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('es-UY', { day: 'numeric', month: 'long', year: 'numeric' });
