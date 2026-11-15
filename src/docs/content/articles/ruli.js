import { h2, list, note, p } from '../blocks.js';

const UPDATED = '2026-11-14';

export const ruliArticles = [
  {
    slug: 'que-es-ruli',
    category: 'ruli',
    title: 'Ruli está en desarrollo',
    summary: 'Ruli va a ser el asistente del establecimiento. Todavía no está en la app: hoy se registra como siempre.',
    keywords: ['ruli', 'asistente', 'próximamente', 'en desarrollo', 'chat', 'inicio', 'audio', 'inteligencia artificial', 'privacidad', 'nombre del asistente'],
    updated: UPDATED,
    related: ['primeros-pasos/que-es-ruralit', 'registrar/registro-rapido', 'registrar/dictado-por-voz'],
    blocks: [
      p('**Ruli** es el asistente que estamos desarrollando para Ruralit. La idea es que, más adelante, puedas consultar tu establecimiento conversando. **Todavía no está en la app.** Inicio sigue siendo el registro rápido.'),
      note('No hay un botón ni un chat de Ruli para activar. Si no lo ves, es porque aún no se publicó.'),

      h2('Qué estamos construyendo'),
      list(
        '**Un chat en Inicio**: le escribes o le mandas un audio. El audio se transcribe y no se guarda; queda solo el texto.',
        '**Preguntas sobre tus números**: movimientos con el filtro que pidas, el resultado de un período por moneda, la comparación entre dos períodos, la cotización actual, los impuestos estimados y si un período está cerrado.',
        '**Propuestas que tú confirmas**: encontrar un movimiento y proponer editarlo o eliminarlo, o proponer un registro nuevo, con los botones **Confirmar** y **Editar**.',
        '**Otro nombre, si quieres**: puedes cambiarle el nombre a tu asistente. El cambio es solo para ti.',
        '**La carga manual de siempre, al lado**: el botón **+** sigue cargando gastos, ingresos, stock y archivos.',
      ),

      h2('Reglas que no cambian'),
      list(
        'Nada se guarda solo. Las eliminaciones se confirman tocando el botón y un audio nunca confirma.',
        'Trabaja solo con el establecimiento que tienes abierto y con los permisos de tu rol.',
        'Tus conversaciones son privadas y se borran a los 30 días sin actividad.',
        'Al proveedor de inteligencia artificial nunca le llega el texto de las notas de tus movimientos ni el chat del equipo. El detalle está en la [Política de Privacidad](/privacidad/).',
        'Puede equivocarse: revisa cada propuesta antes de confirmarla. No reemplaza a tu contador.',
      ),

      h2('Cómo se va a abrir'),
      p('Primero lo va a probar un grupo chico de cuentas. Con lo aprendido se van a definir los créditos de cada plan, y después llega al resto.'),

      h2('Qué sigue igual hoy'),
      p('Registras con una frase, con el dictado o con el formulario. El dictado por voz de un gasto es otra cosa: se procesa en el teléfono y ya está disponible. Está explicado en [Dictado por voz](/docs/registrar/dictado-por-voz).'),
      p('Cuando Ruli se publique, esta guía va a pasar a ser el manual de uso. Hasta entonces, no hace falta configurarlo ni buscarlo en Ajustes.'),
    ],
  },
];
