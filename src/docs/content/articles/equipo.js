import { flow, h2, h3, list, node, note, p, path, steps, table, tip, warn } from '../blocks.js';

const UPDATED = '2026-10-05';

export const equipoArticles = [
  {
    slug: 'invitar-a-tu-equipo',
    category: 'equipo',
    title: 'Invitar a tu equipo',
    summary: 'Sumá a tu familia, socios, encargado o contador por correo o con un link de invitación, y elegí su rol desde el principio.',
    keywords: ['invitar', 'compartir', 'establecimiento compartido', 'colaborador', 'socio', 'contador', 'familia', 'link', 'whatsapp', 'invitación', 'correo'],
    updated: UPDATED,
    related: ['equipo/roles-y-permisos', 'equipo/actividad-del-equipo', 'planes/gratis-pro-y-equipos'],
    blocks: [
      p('Un establecimiento compartido es el mismo campo visto por varias personas, cada una con su propia cuenta. Lo que registra una lo ven las demás al instante, sin mandar capturas ni planillas.'),
      flow(
        'De la invitación al trabajo compartido.',
        node('person', 'Invitás', 'Por correo o con un link, eligiendo el rol'),
        node('mail', 'La persona acepta', 'Crea su cuenta si no la tiene'),
        node('team', 'Trabajan juntos', 'Los cambios se ven al instante'),
      ),

      h2('Dónde se invita'),
      path('Ajustes', 'Este establecimiento', 'Equipo'),
      p('En la computadora también podés usar **Compartir establecimiento** desde el selector de establecimiento, al pie de la barra lateral.'),

      h2('Invitar por correo'),
      steps(
        'Escribí el correo de la persona.',
        'Elegí su **rol**: Encargado, Colaborador o Solo ver.',
        'Tocá **Enviar invitación**. Le llega un correo con el enlace para aceptar.',
      ),

      h2('Invitar con un link'),
      steps(
        'Elegí el rol.',
        'Tocá **Generar link seguro**.',
        'Copialo y mandalo por WhatsApp o por donde prefieras.',
      ),
      warn('Cualquiera que tenga el link puede usarlo para unirse con ese rol. Compartilo solo con la persona indicada.'),

      h2('Qué pasa cuando aceptan'),
      p('La persona crea su cuenta (si no tiene una), acepta la invitación y el establecimiento aparece en su lista. Desde ese momento puede trabajar según su rol.'),

      h2('Invitaciones pendientes'),
      p('Mientras nadie acepta, la invitación queda **pendiente** en la lista del equipo. Podés cancelarla en cualquier momento. Las invitaciones vencen pasado un tiempo; si venció, enviá una nueva.'),
      note('Las invitaciones pendientes cuentan para el límite de personas del plan, para que no se pase el cupo al aceptarse todas juntas. Ver [Gratis, Pro y Equipos](/docs/planes/gratis-pro-y-equipos).'),
    ],
  },

  {
    slug: 'roles-y-permisos',
    category: 'equipo',
    title: 'Roles y permisos',
    summary: 'Dueño, Encargado, Colaborador y Solo ver: qué puede hacer cada uno, y los permisos aparte para ver o revertir el historial.',
    keywords: ['rol', 'roles', 'permisos', 'dueño', 'encargado', 'admin', 'colaborador', 'editor', 'solo ver', 'lector', 'cambiar rol', 'quitar miembro', 'abandonar', 'salir'],
    updated: UPDATED,
    related: ['equipo/invitar-a-tu-equipo', 'equipo/actividad-del-equipo'],
    blocks: [
      p('Cada persona del equipo tiene un rol. El rol decide qué puede ver y qué puede cambiar dentro de ese establecimiento.'),

      h2('Los roles'),
      table(
        ['Rol', 'Qué puede hacer'],
        ['**Dueño**', 'Quien creó el establecimiento. Control total, incluido decidir quién ve y revierte el historial. Nadie puede quitarle la propiedad.'],
        ['**Encargado**', 'Administra accesos, configuración y equipo: invita personas, cambia roles y configura el establecimiento.'],
        ['**Colaborador**', 'Registra y edita los datos del día a día: movimientos, stock, categorías y proyectos. No invita ni cambia la configuración del equipo.'],
        ['**Solo ver**', 'Ve movimientos, balances y reportes, pero no puede registrar ni modificar nada. Ideal para el contador.'],
      ),

      h2('Reglas que conviene saber'),
      list(
        'Solo el **dueño** puede invitar o nombrar a alguien como **Encargado**.',
        'Un Encargado no puede cambiar ni quitar al dueño.',
        'Nadie puede cambiar su propio rol.',
        'Los permisos se aplican también en el servidor: no es solo que el botón no aparezca.',
      ),

      h2('Cambiar el rol o quitar a alguien'),
      path('Ajustes', 'Este establecimiento', 'Equipo', 'Roles y permisos'),
      p('Elegí la persona y cambiale el rol, o quitala del establecimiento. Sus registros anteriores se mantienen.'),

      h2('Permisos de historial'),
      p('Ver el historial de cambios del equipo es un permiso **aparte del rol**. El dueño decide quién puede:'),
      list(
        '**Ver el historial**: acceder a la [actividad del equipo](/docs/equipo/actividad-del-equipo).',
        '**Revertir cambios**: deshacer un cambio desde el historial. Requiere también poder verlo.',
      ),
      note('Un Encargado sin permiso de historial no ve la actividad del equipo, aunque administre el resto del establecimiento.'),

      h2('Salir de un establecimiento'),
      p('Si te compartieron un campo y ya no trabajás en él, podés abandonarlo desde **Ajustes › Mis establecimientos › Todos mis establecimientos**. Tus datos propios no se ven afectados.'),
    ],
  },

  {
    slug: 'actividad-del-equipo',
    category: 'equipo',
    title: 'Actividad del equipo y reversiones',
    summary: 'Quién registró, editó o eliminó cada dato, cuándo y desde qué dispositivo, con la opción de revertir un cambio sin perder el historial.',
    keywords: ['actividad', 'historial', 'auditoría', 'quién cargó', 'cambios', 'revertir', 'deshacer', 'trazabilidad', 'log', 'integrantes'],
    updated: UPDATED,
    related: ['equipo/roles-y-permisos', 'equipo/chats-del-equipo', 'planes/gratis-pro-y-equipos'],
    blocks: [
      p('Cuando varias personas comparten un campo, la pregunta «¿quién cargó esto?» aparece seguido. La **actividad del equipo** responde: cada cambio queda registrado con quién lo hizo, cuándo y desde qué dispositivo (celular, tablet o web).'),

      h2('Abrir la actividad'),
      p('Cuando el establecimiento tiene más de una persona, arriba aparece la fila de avatares del equipo con **Actividad del equipo**. Tocala para abrir el panel lateral.'),
      note('Si no tenés permiso para ver el historial, el mismo botón dice **Integrantes del equipo** y muestra solo quiénes forman parte.'),

      h2('Cómo está organizado'),
      list(
        '**Filtro por integrante**: tocá el avatar de una persona para ver solo lo que hizo.',
        '**Pestañas** para acotar por tipo de cambio.',
        '**Detalle** de cada evento: el antes y el después, el responsable y la fecha.',
        'Un punto marca la **actividad de las últimas 24 horas**.',
      ),

      h2('Revertir un cambio'),
      steps(
        'Abrí el detalle del cambio en la actividad.',
        'Tocá **Revertir cambio** y confirmá.',
        'El registro vuelve a su estado anterior. Si el cambio era una creación, revertirla elimina ese registro.',
      ),
      p('La reversión también queda en el historial («Este cambio fue revertido el…»): nada se pierde, solo se corrige.'),

      h2('Qué está incluido en cada plan'),
      list(
        '**Todos los planes**: autor, fecha y última edición de cada registro, visibles desde el propio registro.',
        '**Ruralit Pro y Equipos**: el panel de actividad del equipo con el historial completo y las reversiones.',
      ),
      tip('¿Querés preguntar por un cambio? Desde el detalle podés llevarlo a los [chats del equipo](/docs/equipo/chats-del-equipo) para comentarlo con quien lo hizo.'),
    ],
  },

  {
    slug: 'chats-del-equipo',
    category: 'equipo',
    title: 'Chats del equipo',
    summary: 'Mensajes uno a uno o en grupo dentro del establecimiento, con registros citados y cifrado de extremo a extremo.',
    keywords: ['chat', 'mensajes', 'conversación', 'grupo', 'citar registro', 'clip', 'no leídos', 'cifrado', 'e2ee', 'whatsapp', 'dispositivo nuevo'],
    updated: UPDATED,
    related: ['equipo/actividad-del-equipo', 'seguridad/tus-datos'],
    blocks: [
      p('Los chats del equipo son la mensajería interna del establecimiento. La diferencia con WhatsApp es que cada conversación puede arrancar **con el dato a la vista**: citás el gasto, la venta o el recurso del que querés hablar, con su monto, su fecha y un enlace directo.'),

      h2('Dónde están'),
      p('En el mismo panel de **Actividad del equipo**, junto a la actividad. La bandeja muestra cada conversación con avatar, último mensaje, hora y mensajes sin leer. El filtro **Todos / No leídos** te lleva a lo pendiente.'),

      h2('Empezar una conversación'),
      list(
        '**Uno a uno**: tocá **Nuevo chat** y elegí a la persona.',
        '**En grupo**: elegí varios integrantes y ponele un nombre al grupo.',
      ),

      h2('Citar un registro'),
      steps(
        'En la conversación, tocá el **clip**.',
        'Buscá el registro entre los últimos 50 del establecimiento: un movimiento, un recurso de stock o una nota.',
        'Escribí tu mensaje y enviá. El registro citado va incrustado, y quien lo recibe puede abrirlo con un toque.',
      ),
      note('Citar un registro no da permisos extra: quien no puede ver ese dato en el establecimiento tampoco lo puede abrir desde el chat.'),

      h2('Privacidad'),
      p('Los mensajes están **cifrados de extremo a extremo**: se cifran en tu dispositivo y solo los pueden leer los integrantes de la conversación. Los servidores de Ruralit guardan los mensajes cifrados, sin poder leerlos.'),
      h3('En un dispositivo nuevo'),
      p('Cada dispositivo tiene sus propias claves. Si empezás a usar Ruralit en otro teléfono o computadora, podés transferir el historial de chats desde un dispositivo donde ya tengas la sesión abierta.'),
      tip('Los chats están incluidos en todos los planes, también en Gratis.'),
    ],
  },
];
