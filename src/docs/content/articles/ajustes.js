import { h2, list, note, p, path, table, tip } from '../blocks.js';

const UPDATED = '2026-10-05';

export const ajustesArticles = [
  {
    slug: 'mapa-de-ajustes',
    category: 'ajustes',
    title: 'Qué hay en Ajustes',
    summary: 'Ajustes se divide en tres grupos: tu cuenta, el establecimiento activo y la lista de tus establecimientos.',
    keywords: ['ajustes', 'configuración', 'preferencias', 'mi cuenta', 'este establecimiento', 'mis establecimientos', 'menú'],
    updated: UPDATED,
    related: ['ajustes/perfil', 'ajustes/tus-establecimientos', 'ajustes/apariencia-y-preferencias'],
    blocks: [
      p('Ajustes ordena todo según **a quién afecta**: a vos, al campo que tenés abierto o a todos tus campos.'),
      table(
        ['Grupo', 'Secciones'],
        ['**Mi cuenta**', 'Datos del Perfil · Email y Notificaciones · Seguridad · Apariencia y preferencias · Plan y suscripción'],
        ['**Este establecimiento**', 'Datos del establecimiento · Equipo · Gestión de Monedas · Categorías Entradas · Categorías Salidas · Sistema Impositivo · Período contable y archivo'],
        ['**Mis establecimientos**', 'Todos mis establecimientos'],
      ),
      note('Lo que cambiás en «Este establecimiento» afecta a todo el equipo de ese campo. Lo que cambiás en «Mi cuenta» es solo tuyo.'),

      h2('Llegar a Ajustes'),
      list(
        '**En la computadora**: el menú de tu cuenta, al pie de la barra lateral.',
        '**En el celular**: **Más › Ajustes** en la barra inferior.',
      ),
      tip('¿Encontraste un error o tenés una idea? En Ajustes está **Sugerir mejoras o reportar un error**: nos llega directo.'),
    ],
  },

  {
    slug: 'perfil',
    category: 'ajustes',
    title: 'Tu perfil: nombre, foto y avatar',
    summary: 'Cambiá tu nombre visible y elegí una foto o un emoji para que tu equipo te reconozca.',
    keywords: ['perfil', 'nombre', 'nombre de usuario', 'foto', 'avatar', 'emoji', 'imagen'],
    updated: UPDATED,
    related: ['ajustes/mapa-de-ajustes', 'equipo/actividad-del-equipo'],
    blocks: [
      path('Ajustes', 'Mi cuenta', 'Datos del Perfil'),
      list(
        '**Nombre de Usuario**: tu nombre visible en la plataforma, en la actividad del equipo y en los chats.',
        '**Foto y avatar**: subí una foto o elegí el emoji que te representa.',
      ),
      p('Tu nombre y tu avatar son los mismos en todos los establecimientos en los que participás.'),
    ],
  },

  {
    slug: 'tus-establecimientos',
    category: 'ajustes',
    title: 'Tus establecimientos: datos, crear, cambiar y gestión para terceros',
    summary: 'Nombre y tipo de producción del campo, crear uno nuevo, cambiar entre ellos, eliminarlos o abandonarlos.',
    keywords: ['establecimiento', 'campo', 'nuevo establecimiento', 'crear campo', 'cambiar de campo', 'eliminar establecimiento', 'abandonar', 'tipo de producción', 'gestión para terceros', 'varios campos'],
    updated: UPDATED,
    related: ['primeros-pasos/moverte-por-ruralit', 'equipo/invitar-a-tu-equipo', 'planes/gratis-pro-y-equipos'],
    blocks: [
      h2('Los datos del campo'),
      path('Ajustes', 'Este establecimiento', 'Datos del establecimiento'),
      list(
        '**Nombre del Establecimiento**: el nombre comercial de tu campo o explotación.',
        '**Tipo de Producción**: Ganadería, Lechería, Agricultura, Servicios, Ovina, Mixto o Personalizado. Define el rubro principal para sugerir categorías.',
        '**Gestión para Terceros**: asigná este establecimiento a otra persona o familia, si lo administrás por cuenta de alguien.',
      ),

      h2('Todos tus establecimientos'),
      path('Ajustes', 'Mis establecimientos', 'Todos mis establecimientos'),
      p('Ahí ves cada campo con tu rol y su plan, y podés:'),
      list(
        '**Cambiar** al establecimiento que quieras.',
        '**Crear** uno nuevo: pasa por su propia configuración inicial.',
        '**Eliminar** un establecimiento propio.',
        '**Abandonar** un establecimiento que te compartieron.',
      ),
      note('Cuántos establecimientos propios y compartidos podés tener depende de tu plan. Un campo que te compartieron no consume tu cupo de establecimientos propios.'),

      h2('Cobertura del establecimiento'),
      p('En **Plan y suscripción** está **Cobertura del establecimiento**: qué plan tiene el campo activo y quién administra su facturación. Si colaborás en el campo de otra persona, trabajás con el plan de ese campo.'),
    ],
  },

  {
    slug: 'monedas-y-cotizaciones',
    category: 'ajustes',
    title: 'Monedas y cotizaciones',
    summary: 'Elegí hasta dos monedas activas por establecimiento y consultá las cotizaciones actualizadas.',
    keywords: ['monedas', 'divisas', 'configurar divisas', 'usd', 'uyu', 'ars', 'brl', 'cotización', 'tipo de cambio', 'tiempo real'],
    updated: UPDATED,
    related: ['registrar/otra-moneda', 'balances/varias-monedas'],
    blocks: [
      path('Ajustes', 'Este establecimiento', 'Gestión de Monedas'),
      h2('Configurar divisas'),
      p('Seleccioná **hasta 2 monedas** para gestionar tu negocio, por ejemplo pesos uruguayos y dólares. Son las que vas a poder elegir al registrar y las que aparecen como pestañas en Movimientos y Balances.'),
      h2('Cotizaciones en tiempo real'),
      p('Ruralit muestra las tasas de cambio actualizadas automáticamente desde el mercado. Se usan como sugerencia al registrar en otra moneda; siempre podés escribir la cotización real de tu operación.'),
      tip('Cambiar las monedas activas no borra registros: los movimientos en una moneda que desactivaste se conservan.'),
    ],
  },

  {
    slug: 'apariencia-y-preferencias',
    category: 'ajustes',
    title: 'Apariencia y preferencias',
    summary: 'Tema claro u oscuro, paisaje visual, color de acento y la forma de ver tus movimientos.',
    keywords: ['tema', 'modo oscuro', 'modo claro', 'automático', 'paisaje', 'horizonte', 'linderos', 'color de acento', 'bosque', 'océano', 'pizarra', 'carbón', 'vista lista', 'vista por filtros'],
    updated: UPDATED,
    related: ['movimientos/el-historial', 'ajustes/mapa-de-ajustes'],
    blocks: [
      path('Ajustes', 'Mi cuenta', 'Apariencia y preferencias'),
      table(
        ['Opción', 'Qué cambia'],
        ['**Tema Visual**', 'Claro, oscuro o automático (según tu sistema operativo).'],
        ['**Paisaje visual**', 'Horizonte, limpio y sereno, o Linderos, inspirado en parcelas reales.'],
        ['**Color de Acento**', 'El color principal de la interfaz: Bosque, Océano, Pizarra o Carbón.'],
        ['**Vista de movimientos**', 'Vista lista o vista por filtros. Ver [El historial de movimientos](/docs/movimientos/el-historial).'],
      ),
      p('Estas preferencias son tuyas: no cambian lo que ve el resto del equipo.'),
    ],
  },

  {
    slug: 'notificaciones',
    category: 'ajustes',
    title: 'Notificaciones por correo',
    summary: 'Resumen semanal, recordatorio de carga, seguimiento de proyectos, alertas de gastos, de stock bajo y de seguridad.',
    keywords: ['notificaciones', 'email', 'correo', 'resumen semanal', 'recordatorio', 'alertas de gastos', 'stock bajo', 'alertas de seguridad', 'avisos', 'desactivar'],
    updated: UPDATED,
    related: ['stock/stock-minimo-y-alertas', 'seguridad/verificacion-en-dos-pasos', 'planes/gratis-pro-y-equipos'],
    blocks: [
      path('Ajustes', 'Mi cuenta', 'Email y Notificaciones'),
      table(
        ['Notificación', 'Qué hace', 'Plan'],
        ['**Resumen semanal**', 'Un balance consolidado los domingos, solo si hubo movimientos.', 'Pro'],
        ['**Recordatorio de carga**', 'Un aviso si pasan 4 días sin actividad nueva en tus establecimientos.', 'Todos'],
        ['**Seguimiento de inversiones**', 'Un único resumen cuando tus proyectos activos necesitan revisión.', 'Todos'],
        ['**Alertas de gastos**', 'Aprende del historial de cada establecimiento y te avisa cuando un gasto se sale de lo habitual.', 'Pro'],
        ['**Alertas de stock bajo**', 'Un correo cuando un recurso cruza su stock mínimo; si son varios, llegan agrupados.', 'Pro'],
        ['**Alertas de seguridad**', 'Avisos por dispositivos o redes nuevas. Los cambios de contraseña siempre se informan.', 'Todos'],
      ),
      p('Cada notificación se activa o desactiva por separado.'),
      note('Las alertas de seguridad sobre cambios de contraseña se envían siempre, aunque desactives el resto: protegen tu cuenta.'),
    ],
  },
];
