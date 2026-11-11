import { h2, h3, list, note, p, path, steps, table, tip, warn } from '../blocks.js';

const UPDATED = '2026-11-11';

export const ruliArticles = [
  {
    slug: 'que-es-ruli',
    category: 'ruli',
    title: 'Ruli, el asistente de tu establecimiento',
    summary: 'La nueva forma de usar Ruralit: un chat en Inicio para consultar el campo y moverte por la app. El registro manual sigue en el botón +.',
    keywords: ['ruli', 'asistente', 'inteligencia artificial', 'chat', 'inicio', 'dirección', 'conversar'],
    updated: UPDATED,
    related: ['ruli/escribir-o-enviar-un-audio', 'ruli/ponerle-nombre', 'primeros-pasos/que-es-ruralit'],
    blocks: [
      p('Ruli es el asistente de Ruralit. Cuando está habilitado para el establecimiento que tenés abierto, **Inicio deja de ser el cuadro de registro y pasa a ser una conversación**: escribís o le mandás un audio, y Ruli te responde con el contexto de ese campo, te explica cómo hacer algo o te lleva a la sección que pediste.'),
      note('Ruli queda inactivo hasta que se habilita para tu cuenta y para ese establecimiento. Si en Inicio ves el cuadro «¿Qué pasó hoy?», el asistente todavía no está prendido ahí y seguís registrando como siempre.'),

      h2('Qué podés pedirle hoy'),
      list(
        '**El contexto del campo**: nombre, tu rol, las monedas activas y el período.',
        '**Cómo se hace algo**, por ejemplo «¿Cómo registro un gasto?». Te explica y puede dejarte el enlace al manual.',
        '**Ir a una sección**, por ejemplo «Llévame a Stock». El enlace abre esa pantalla cuando lo tocás; Ruli no cambia de sección solo.',
      ),
      p('El botón **+** del chat abre las mismas cargas de siempre: gasto, ingreso, stock, planilla de Excel y factura PDF. Esas pantallas escriben en la libreta. La conversación, por ahora, no guarda movimientos por su cuenta.'),
      tip('El paso que sigue es que Ruli arme la propuesta de un registro y la deje guardada recién cuando la confirmes. Hasta que eso esté en el chat, el alta, la edición y la baja siguen siendo manuales.'),

      h2('Qué no hace'),
      list(
        'No reemplaza al contador ni da asesoramiento fiscal. Los impuestos los calcula el motor de Ruralit, en las pantallas de registro.',
        'No ve el chat cifrado del equipo ni datos de otro establecimiento.',
        'No confirma una operación con un audio. Un mensaje de voz solo se transcribe y se envía como texto.',
        'Si se queda sin créditos, no responde o no está habilitado, la libreta sigue disponible: registrás desde el botón + o desde el Inicio de siempre.',
      ),
      warn('Ruli usa inteligencia artificial y puede equivocarse. Contrastá lo que te dice con Movimientos, Balances o Stock antes de decidir.'),

      h2('Con quién habla'),
      p('Ruli actúa con **tu rol en el establecimiento activo**. Un integrante que solo puede ver no recibe herramientas de escritura. Si cambiás de campo, la conversación se cierra y empieza la de ese campo: cada charla pertenece a un establecimiento y a tu usuario.'),
      p('El detalle de los datos que viajan al proveedor está en la [Política de privacidad](/privacidad/), sección 6.'),
    ],
  },

  {
    slug: 'escribir-o-enviar-un-audio',
    category: 'ruli',
    title: 'Escribirle a Ruli o mandarle un audio',
    summary: 'El compositor del chat, el micrófono, el historial de 30 días y qué hacer si Ruli no responde.',
    keywords: ['audio', 'micrófono', 'mensaje de voz', 'historial', 'conversación', 'sugerencias', 'reintentar', 'ruli no responde'],
    updated: UPDATED,
    related: ['ruli/que-es-ruli', 'ayuda/ruli-no-responde', 'registrar/dictado-por-voz'],
    blocks: [
      p('Con Ruli habilitado, Inicio es el chat. Arriba, en el teléfono, están el historial y el selector de establecimiento. En la computadora el selector sigue en la barra lateral.'),

      h2('Escribir'),
      steps(
        'Escribí en el compositor. En un teclado físico, Enter envía; en el teléfono, Enter agrega una línea.',
        'Mientras Ruli piensa, el envío queda deshabilitado y la pantalla dice que está pensando.',
        'La respuesta aparece como texto. Si incluye una tarjeta, el enlace se abre solo cuando lo tocás.',
      ),
      p('Si la conversación está vacía, Ruli saluda con el campo, el período y tu rol, y ofrece tres pedidos listos: ver el contexto, preguntar cómo registrar un gasto, o ir a Stock.'),

      h2('Mandar un audio'),
      p('Si el cuadro de texto está vacío, el botón de enviar es un micrófono. En el teléfono, mantené apretado para grabar, deslizá a la izquierda para cancelar o hacia arriba para seguir hablando sin sostener. En la computadora, un clic o la barra espaciadora inicia y detiene; Escape descarta.'),
      list(
        'Un audio de menos de un segundo no se envía.',
        'A los 119 segundos se corta y se envía solo.',
        'Ruli muestra «Transcribiendo…» y después el texto entendido, con **Corregir** para editarlo en el compositor antes de reenviarlo.',
        'Ruralit **no guarda el audio**: solo el texto, que queda en la conversación como un mensaje escrito.',
      ),
      warn('Un audio nunca confirma una operación. Aunque digas «sí», la transcripción no aprueba un registro.'),
      note('Este micrófono no es el [dictado por voz](/docs/registrar/dictado-por-voz) del registro rápido. Ese se procesa en el dispositivo y arma un movimiento. El audio de Ruli se transcribe en la nube y entra al chat.'),

      h2('Historial'),
      p('El ícono de lista abre las conversaciones de **ese establecimiento**, y recién ahí se leen. Podés abrir una, empezar otra o borrar una: el borrado pide confirmación y es definitivo.'),
      p('Las conversaciones se eliminan a los **30 días sin actividad**. Borrar la charla no borra los movimientos de la libreta.'),

      h2('Si algo falla'),
      list(
        'Un error transitorio ofrece **Reintentar** y repite el mismo paso.',
        'Sin conexión, el audio queda en la pantalla hasta que reintentes. No se guarda en el teléfono.',
        'Si cambiaste de campo mientras Ruli respondía, esa respuesta se descarta.',
        'Escribir otro mensaje abandona el paso que falló.',
      ),
    ],
  },

  {
    slug: 'ponerle-nombre',
    category: 'ruli',
    title: 'Ponerle nombre al asistente',
    summary: 'El nombre es personal: se cambia en Ajustes o desde el chat, y vacío vuelve a Ruli.',
    keywords: ['nombre', 'renombrar', 'asistente', 'perfil', 'ruli', 'apodo'],
    updated: UPDATED,
    related: ['ruli/que-es-ruli', 'ajustes/perfil'],
    blocks: [
      p('Por defecto el asistente se llama **Ruli**. Podés ponerle otro nombre. Es una preferencia tuya: no depende del campo y el equipo no la ve.'),

      h2('Dónde se cambia'),
      h3('Desde Ajustes'),
      path('Ajustes', 'Mi cuenta', 'Datos del Perfil', 'Nombre de tu asistente'),
      p('El campo aparece solo si Ruli está habilitado en el establecimiento activo. Escribís el nombre y tocás **Guardar**. No se guarda solo.'),
      h3('Desde el chat'),
      p('En la conversación está **Cambiar el nombre**. Usa las mismas reglas y el mismo guardado.'),

      h2('Qué nombre acepta'),
      table(
        ['Regla', 'Detalle'],
        ['Largo', 'De 1 a 20 caracteres.'],
        ['Caracteres', 'Letras, incluidas tildes y ñ, espacios, guion y apóstrofo.'],
        ['Vacío', 'Vuelve a llamarse Ruli.'],
      ),
      list(
        'No admite números, emojis, comillas ni espacios dobles.',
        'Si se corta la conexión, lo que escribiste se conserva para volver a intentar.',
      ),
      tip('El nombre cambia cómo te habla y cómo lo ves en el chat. No cambia sus reglas ni lo que puede hacer.'),
    ],
  },
];
