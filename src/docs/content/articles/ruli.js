import { h2, list, note, p } from '../blocks.js';

const UPDATED = '2026-11-11';

export const ruliArticles = [
  {
    slug: 'que-es-ruli',
    category: 'ruli',
    title: 'Ruli está en desarrollo',
    summary: 'Ruli va a ser el asistente del establecimiento. Todavía no está en la app: hoy se registra como siempre.',
    keywords: ['ruli', 'asistente', 'próximamente', 'en desarrollo', 'chat', 'inicio'],
    updated: UPDATED,
    related: ['primeros-pasos/que-es-ruralit', 'registrar/registro-rapido', 'registrar/dictado-por-voz'],
    blocks: [
      p('**Ruli** es el asistente que estamos desarrollando para Ruralit. La idea es que, más adelante, puedas consultar tu establecimiento conversando. **Todavía no está en la app.** Inicio sigue siendo el registro rápido.'),
      note('No hay un botón ni un chat de Ruli para activar. Si no lo ves, es porque aún no se publicó.'),

      h2('Qué estamos construyendo'),
      list(
        'Un chat en Inicio para preguntar por el campo, por cómo registrar y para abrir una sección.',
        'Mensajes de texto y, después, de audio.',
        'La carga manual de siempre, al lado: gastos, ingresos, stock y archivos.',
        'Nada se va a guardar solo. Ruli va a proponer el registro y vos lo vas a confirmar.',
      ),

      h2('Qué sigue igual hoy'),
      p('Registrás con una frase, con el dictado o con el formulario. El dictado por voz de un gasto es otra cosa: se procesa en el teléfono y ya está disponible. Está explicado en [Dictado por voz](/docs/registrar/dictado-por-voz).'),
      p('Cuando Ruli se publique, esta guía va a pasar a ser el manual de uso. Hasta entonces, no hace falta configurarlo ni buscarlo en Ajustes.'),
    ],
  },
];
