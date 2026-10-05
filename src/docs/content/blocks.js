/**
 * Bloques con los que se escribe un artículo. El texto admite formato en línea
 * mínimo: **negrita**, `código` y [enlaces](/ruta o https://…). Todo lo demás
 * es texto plano; el buscador indexa exactamente lo que el lector ve.
 *
 * Tipos de bloque:
 * - h2      Título de sección: entra en «En esta página» y es un destino del buscador.
 * - h3, p
 * - steps   Pasos numerados, en orden.
 * - list
 * - callout tone: 'tip' | 'note' | 'warning'
 * - path    Ruta dentro de la app: «Ajustes › Equipo › Invitar colaboradores».
 * - table
 * - flow    Un recorrido de izquierda a derecha, con un icono por paso
 *           (icon: 'person' | 'ruralit' | 'phone' | 'mail' | 'team' | 'file' | 'chart' | 'stock').
 * - phrase  Una frase escrita en el registro rápido y lo que Ruralit entiende de ella.
 */

export const h2 = text => ({ type: 'h2', text });
export const h3 = text => ({ type: 'h3', text });
export const p = text => ({ type: 'p', text });
export const steps = (...items) => ({ type: 'steps', items });
export const list = (...items) => ({ type: 'list', items });
export const tip = (text, title) => ({ type: 'callout', tone: 'tip', title, text });
export const note = (text, title) => ({ type: 'callout', tone: 'note', title, text });
export const warn = (text, title) => ({ type: 'callout', tone: 'warning', title, text });
export const path = (...stepsList) => ({ type: 'path', steps: stepsList });
export const table = (head, ...rows) => ({ type: 'table', head, rows });
export const flow = (caption, ...nodes) => ({ type: 'flow', caption, nodes });
export const node = (icon, label, detail) => ({ icon, label, detail });

/** `phrase('Vendí 5 terneros…', [['Tipo', 'Ingreso'], …], 'Pie de figura')` */
export const phrase = (text, fields, caption) => ({
  type: 'phrase',
  text,
  caption,
  fields: fields.map(([label, value]) => ({ label, value })),
});
