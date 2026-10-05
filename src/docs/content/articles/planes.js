import { h2, list, note, p, path, steps, table, tip } from '../blocks.js';

const UPDATED = '2026-10-05';

export const planesArticles = [
  {
    slug: 'gratis-pro-y-equipos',
    category: 'planes',
    title: 'Gratis, Pro y Equipos',
    summary: 'Qué incluye cada plan, los límites de establecimientos y personas, y qué funciones son de Pro.',
    keywords: ['plan', 'planes', 'precio', 'gratis', 'pro', 'equipos', 'límites', 'cuánto cuesta', 'usd 9,90', 'suscripción', 'premium'],
    updated: UPDATED,
    related: ['planes/prueba-gratuita-de-pro', 'planes/si-dejas-pro'],
    blocks: [
      p('En ningún plan se cobra por movimiento: la libreta no tiene límite de registros. La diferencia está en cuántos campos y personas manejás, la profundidad del análisis y las alertas. La comparación completa está en [la página de planes](/planes/).'),

      h2('Los límites'),
      table(
        ['', 'Gratis', 'Ruralit Pro', 'Ruralit Equipos'],
        ['**Establecimientos propios**', '1', '5', 'Sin límite comercial visible'],
        ['**Compartidos contigo**', '1', '3', 'Sin límite comercial visible'],
        ['**Personas**', '3 en total, dueño incluido', '4 por establecimiento', 'Sin límite comercial visible'],
        ['**Importaciones de Excel**', '3 por día', 'Sin límite diario', 'Sin límite diario'],
        ['**Precio**', 'Sin costo', 'USD 9,90 por mes, después de 30 días de prueba', 'En desarrollo'],
      ),

      h2('Incluido en todos los planes'),
      list(
        'Registro, edición y exportación de movimientos sin límite.',
        'Registro rápido, dictado por voz y lectura de facturas PDF.',
        'Stock, balances, proyectos e impuestos.',
        'Roles, edición compartida y chats del equipo cifrados.',
        'Seguridad: verificación en dos pasos, PIN y alertas de seguridad.',
      ),

      h2('Lo que suma Ruralit Pro'),
      list(
        'La sección [Reportes](/docs/reportes/tipos-de-reporte), con el informe integral y los comparativos.',
        'La [actividad del equipo](/docs/equipo/actividad-del-equipo) con el historial completo y las reversiones.',
        'Resumen semanal, alertas de gastos y alertas de stock bajo por correo.',
        'Importaciones de Excel sin límite diario.',
      ),

      h2('Ruralit Equipos'),
      p('Pensado para operaciones que coordinan personas y establecimientos de distintos propietarios. Está **en desarrollo** y todavía no admite solicitudes.'),
      note('Si colaborás en el campo de otra persona, trabajás con el plan de ese campo. Eso no cambia el plan de tus campos propios.'),
    ],
  },

  {
    slug: 'prueba-gratuita-de-pro',
    category: 'planes',
    title: 'Pedir la prueba gratuita de Pro',
    summary: '30 días de Ruralit Pro sin tarjeta, una vez por cuenta, solicitados desde la app.',
    keywords: ['prueba gratuita', 'trial', '30 días', 'solicitar pro', 'activar pro', 'sin tarjeta', 'plan y suscripción'],
    updated: UPDATED,
    related: ['planes/gratis-pro-y-equipos', 'planes/si-dejas-pro'],
    blocks: [
      path('Ajustes', 'Mi cuenta', 'Plan y suscripción', 'Planes y precios'),
      steps(
        'Iniciá sesión en Ruralit con la cuenta en la que querés Pro.',
        'Entrá a **Planes y precios** y compará Gratis, Pro y Equipos.',
        'Solicitá la prueba gratuita de Pro.',
        'Revisá el estado de tu solicitud en **Plan y suscripción**. Cuando la activamos, Pro queda habilitado en tu cuenta.',
      ),
      list(
        'Dura **30 días**.',
        'No pide tarjeta ni cobra nada.',
        'Se puede pedir **una sola vez** por cuenta.',
        'Hacer la solicitud no cambia tu plan por sí sola: se activa manualmente.',
      ),
      tip('En **Plan y suscripción** también ves la vigencia de tu plan, el uso de tus cupos y el estado de tu solicitud.'),
    ],
  },

  {
    slug: 'si-dejas-pro',
    category: 'planes',
    title: 'Si dejás Pro o superás un límite',
    summary: 'Volver a Gratis no borra nada: tus datos, campos, equipo y chats siguen ahí.',
    keywords: ['downgrade', 'bajar de plan', 'cancelar', 'vencimiento', 'límite', 'cupo', 'superé', 'bloqueado', 'ver planes'],
    updated: UPDATED,
    related: ['planes/gratis-pro-y-equipos', 'seguridad/tus-datos'],
    blocks: [
      h2('Al volver a Gratis'),
      list(
        'No se elimina ningún dato, establecimiento, historial, integrante ni chat.',
        'Todo lo existente sigue siendo **legible**.',
        'Solo se detienen las nuevas acciones propias de Pro, como generar reportes o recibir las alertas Pro.',
        'Tus preferencias de notificaciones Pro quedan guardadas y vuelven a activarse si regresás a Pro.',
      ),

      h2('Si llegás a un límite'),
      p('Cuando una acción supera lo que incluye tu plan (por ejemplo, invitar a una cuarta persona en Gratis), Ruralit te explica el límite y te ofrece **Ver planes**. Lo que ya tenés no se toca.'),
      note('Los límites de plan son independientes de los permisos: un rol nunca se degrada por una cuestión de plan.'),
    ],
  },
];
