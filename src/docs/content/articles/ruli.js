import { h2, list, note, p, tip, warn } from '../blocks.js';

const UPDATED = '2026-11-15';

export const ruliArticles = [
  {
    slug: 'que-es-ruli',
    category: 'ruli',
    title: 'Qué es Ruli',
    summary: 'El asistente conversacional de Ruralit Pro: responde sobre tu campo y te propone registros que tú confirmas. Hoy está en beta cerrada.',
    keywords: ['ruli', 'asistente', 'pro', 'beta', 'chat', 'inicio', 'audio', 'inteligencia artificial', 'confirmar', 'cupo', 'privacidad', 'nombre del asistente'],
    updated: UPDATED,
    related: ['planes/gratis-pro-y-equipos', 'planes/prueba-gratuita-de-pro', 'registrar/registro-rapido'],
    blocks: [
      p('**Ruli** es el asistente conversacional de Ruralit. Vive en **Inicio**: le escribes o le envías un audio, y responde con los datos del establecimiento que tienes activo. Cuando le pides registrar algo, te muestra una propuesta y solo la guarda si la confirmas.'),
      p('Ruli es **exclusivo de Ruralit Pro**, y también lo incluirá Equipos cuando se lance. Hoy está en **beta cerrada**: se habilita por cuenta y sus funciones se encienden por etapas.'),
      note('Si tu campo no tiene Ruli, ves el Inicio de siempre, con el registro rápido. Cuando Ruli está activo, Inicio pasa a ser su chat y el menú **+** conserva todas las cargas manuales.'),

      h2('Qué puede hacer'),
      list(
        '**Responder sobre tus números**: movimientos con el filtro que pidas, el resultado de un período por moneda, la comparación entre dos períodos, la cotización actual disponible, los impuestos estimados y si una fecha está en un período cerrado.',
        '**Responder sobre stock y proyectos**: qué recursos están en el mínimo o cerca, y el resumen de un proyecto.',
        '**Proponerte operaciones**: registrar un ingreso o un gasto, editar o eliminar un movimiento después de buscarlo, crear una categoría y, en stock y proyectos, movimientos, ajustes, recursos, proyectos, eventos y notas.',
        '**Ayudarte a usar Ruralit**: explica cómo hacer algo y te ofrece abrir la sección que necesitas.',
        '**Entender audios**: transcribe lo que dijiste y te muestra el texto. Si quedó mal, **Corregir** lo pasa al cuadro de texto para editarlo y enviarlo otra vez.',
        '**Llamarse como quieras**: puedes cambiarle el nombre desde Ajustes. El cambio es solo para ti.',
      ),
      tip('Las funciones dependen de tu rol y de la etapa de la beta. Pregúntale «¿Qué puedes hacer?» y te dice lo que tiene habilitado.'),

      h2('Cómo se confirma'),
      list(
        'Cada operación llega como una propuesta, con los botones **Confirmar** y **Editar**. Revisa monto, moneda, fecha y categoría antes de confirmar.',
        'En altas y cambios también puedes confirmar respondiendo «sí» por escrito a una propuesta única.',
        'Las eliminaciones y otras acciones de alto impacto, como finalizar un proyecto, solo se confirman tocando el botón.',
        'Un audio **nunca** confirma una operación.',
        'Si una operación aparece sin verificar, revisa el historial antes de repetirla: una propuesta nueva puede duplicarla.',
      ),

      h2('Lo que no hace'),
      list(
        'No trabaja con otro campo ni se salta los permisos de tu rol: con **Solo ver**, no recibes propuestas de escritura.',
        'No da asesoría contable, legal, tributaria, veterinaria ni de inversión. Puede explicar los cálculos de Ruralit, sin reemplazar a un profesional.',
        'No genera PDF, no cierra ni reabre ejercicios y no envía invitaciones desde el chat: te lleva a la sección donde se hace.',
        'No inventa cifras. Puede equivocarse, así que revisa cada propuesta.',
      ),

      h2('Cupo de uso'),
      p('El uso de Ruli tiene un **cupo mensual** por cuenta y puede haber un tope por integrante del establecimiento. Si se agota o no se puede verificar, Ruli te avisa y sigues registrando con el menú **+**.'),

      h2('Privacidad'),
      list(
        'Al proveedor de inteligencia artificial le llegan tus mensajes, la transcripción de tus audios y un resumen mínimo de los datos necesarios para responder. Cuando buscas un movimiento concreto, también algunas filas, sin sus notas.',
        'Nunca le llega el texto de las notas de tus registros, sus identificadores internos ni el chat del equipo.',
        'El audio no se guarda: queda solo el texto transcrito.',
        'Cada usuario ve sus propias conversaciones. Se eliminan a los 30 días sin actividad y puedes borrarlas antes.',
      ),
      p('El detalle está en la [Política de Privacidad](/privacidad/).'),

      h2('Cómo acceder'),
      p('Ruli es parte de Ruralit Pro. Si todavía no tienes Pro, puedes [pedir la prueba gratuita](/docs/planes/prueba-gratuita-de-pro). Durante la beta cerrada, Ruli se habilita de a poco: si tienes Pro y todavía no lo ves en Inicio, tu cuenta aún no está en la beta.'),
      warn('No incluyas en tus mensajes datos que Ruli no necesita, como contraseñas o números de tarjeta: lo que escribes o dices se envía tal cual.'),
    ],
  },
];
