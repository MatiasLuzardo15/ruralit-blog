import { h2, list, note, p, path, steps, table, tip, warn } from '../blocks.js';

const UPDATED = '2026-10-05';

export const seguridadArticles = [
  {
    slug: 'verificacion-en-dos-pasos',
    category: 'seguridad',
    title: 'Verificación en dos pasos (2FA)',
    summary: 'Sumá un código de 6 dígitos de Google Authenticator o Authy a tu contraseña para entrar.',
    keywords: ['2fa', 'dos pasos', 'doble autenticación', 'google authenticator', 'authy', 'código', 'qr', 'seguridad de la cuenta', 'totp'],
    updated: UPDATED,
    related: ['seguridad/bloqueo-con-pin', 'seguridad/pregunta-de-seguridad', 'ajustes/notificaciones'],
    blocks: [
      p('Con la verificación en dos pasos, para entrar a tu cuenta no alcanza con la contraseña: también hace falta un código que genera una app en tu teléfono. Aunque alguien conozca tu contraseña, no puede entrar sin tu teléfono.'),
      path('Ajustes', 'Mi cuenta', 'Seguridad', 'Autenticación en Dos Pasos (2FA)'),

      h2('Activarla'),
      steps(
        'Instalá en tu teléfono una app de autenticación, como **Google Authenticator** o **Authy**.',
        'En Ruralit, tocá **Comenzar Activación**.',
        'Con la app, **escaneá el código QR** que aparece en pantalla.',
        'Escribí el **código de 6 dígitos** que muestra la app para confirmar.',
      ),
      p('Desde ese momento, cada vez que inicies sesión en un dispositivo nuevo, Ruralit te pide el código de la app.'),

      h2('Desactivarla'),
      p('Desde la misma sección, **Desactivar 2FA**. Tu cuenta vuelve a pedir solo correo y contraseña.'),
      warn('Si cambiás de teléfono, pasá tus cuentas a la app de autenticación del teléfono nuevo **antes** de borrar el viejo. Sin la app no vas a poder generar el código.'),
    ],
  },

  {
    slug: 'bloqueo-con-pin',
    category: 'seguridad',
    title: 'Bloqueo de la app con PIN',
    summary: 'Un código de 4 dígitos que Ruralit pide al abrirse en este dispositivo.',
    keywords: ['pin', 'bloqueo', 'código', '4 dígitos', 'bloquear app', 'teléfono compartido', 'olvidé el pin', 'intentos'],
    updated: UPDATED,
    related: ['seguridad/verificacion-en-dos-pasos', 'ayuda/olvide-mi-pin'],
    blocks: [
      p('El PIN protege Ruralit en **un dispositivo concreto**: si alguien toma tu teléfono con la sesión abierta, no puede ver tus números sin el código.'),
      path('Ajustes', 'Mi cuenta', 'Seguridad', 'Bloqueo de Aplicación (PIN)'),

      h2('Activarlo'),
      steps(
        'Tocá para crear tu PIN.',
        'Ingresá 4 dígitos.',
        'Volvé a ingresarlos para confirmar.',
      ),

      h2('Cómo funciona'),
      list(
        'Ruralit pide el PIN cada vez que abrís la app en ese dispositivo.',
        'Si dejás la app en segundo plano más de 30 segundos, al volver te lo pide de nuevo.',
        'Después de **10 intentos fallidos**, se bloquea por **5 minutos**.',
        'El PIN se guarda solo en ese dispositivo, cifrado. En otro teléfono o computadora configurás uno distinto.',
      ),
      p('Para quitarlo, entrá a la misma sección e ingresá tu PIN actual.'),
      note('El PIN no reemplaza tu contraseña ni la verificación en dos pasos: es una capa extra para el dispositivo.'),
    ],
  },

  {
    slug: 'pregunta-de-seguridad',
    category: 'seguridad',
    title: 'Pregunta de seguridad',
    summary: 'Una pregunta y su respuesta, sincronizadas con tu cuenta, que Ruralit pide al abrirse.',
    keywords: ['pregunta de seguridad', 'mfa', 'respuesta', 'verificación', 'mascota'],
    updated: UPDATED,
    related: ['seguridad/bloqueo-con-pin', 'seguridad/verificacion-en-dos-pasos'],
    blocks: [
      p('La pregunta de seguridad es otra capa de protección, pero a diferencia del PIN, **viaja con tu cuenta**: se pide en cualquier dispositivo en el que abras Ruralit.'),
      path('Ajustes', 'Mi cuenta', 'Seguridad', 'Preguntas de Seguridad (MFA)'),
      steps(
        'Elegí una pregunta de la lista o escribí una personalizada.',
        'Escribí la respuesta.',
        'Tocá **Guardar y Activar**.',
      ),
      tip('La verificación no distingue entre mayúsculas y minúsculas. Elegí una respuesta que recuerdes pero que nadie pueda adivinar mirando tus redes.'),
    ],
  },

  {
    slug: 'tus-datos',
    category: 'seguridad',
    title: 'Qué pasa con tus datos',
    summary: 'Quién ve tus registros, qué se procesa en tu dispositivo, cómo se borra y qué no hacemos con tu información.',
    keywords: ['privacidad', 'datos', 'quién ve', 'seguridad', 'borrar cuenta', 'cifrado', 'vender datos', 'exportar', 'propiedad'],
    updated: UPDATED,
    related: ['equipo/roles-y-permisos', 'equipo/chats-del-equipo', 'planes/gratis-pro-y-equipos'],
    blocks: [
      h2('Quién ve tus registros'),
      p('Los datos de un establecimiento solo los ven su dueño y las personas que él (o un Encargado) invitó, cada una según su rol. Los permisos se controlan en el servidor, no solo en la pantalla.'),

      h2('Qué se procesa en tu dispositivo'),
      table(
        ['Qué', 'Dónde'],
        ['Las planillas de Excel y los PDF de facturas que importás', 'Se leen en tu dispositivo; solo se guardan los registros que confirmás.'],
        ['Los mensajes de los chats del equipo', 'Se cifran en tu dispositivo de extremo a extremo.'],
        ['Tu PIN', 'Queda cifrado solo en ese dispositivo.'],
      ),

      h2('Lo que no hacemos'),
      list(
        'No vendemos tus datos productivos.',
        'No usamos el contenido de tus registros para publicidad.',
        'Pagar o dejar de pagar un plan **nunca** cambia de quién son los datos ni borra nada.',
      ),

      h2('Llevarte tus datos'),
      p('La exportación de movimientos está disponible en todos los planes. Ver [Exportar e imprimir movimientos](/docs/movimientos/exportar-e-imprimir).'),
      note('El detalle legal está en la [Política de privacidad](/privacidad/) y los [Términos de uso](/terminos/).'),
    ],
  },
];
