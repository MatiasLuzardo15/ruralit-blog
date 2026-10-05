import { h2, list, note, p, path, steps, tip, warn } from '../blocks.js';

const UPDATED = '2026-10-05';

export const ayudaArticles = [
  {
    slug: 'no-puedo-entrar',
    category: 'ayuda',
    title: 'No puedo entrar a mi cuenta',
    summary: 'Correo sin verificar, contraseña olvidada, demasiados intentos o código de verificación en dos pasos.',
    keywords: ['no puedo entrar', 'login', 'contraseña incorrecta', 'correo no verificado', 'demasiados intentos', 'cuenta bloqueada', 'código 2fa', 'acceso'],
    updated: UPDATED,
    related: ['primeros-pasos/crear-tu-cuenta', 'seguridad/verificacion-en-dos-pasos'],
    blocks: [
      h2('«Correo o contraseña incorrectos»'),
      list(
        'Revisá que el correo esté bien escrito, sin espacios al final.',
        'Si creaste la cuenta con **Google**, entrá con el botón de Google: esa cuenta no tiene contraseña propia.',
        'Si no recordás la contraseña, recuperala desde la pantalla de inicio de sesión. Ver [Crear tu cuenta e iniciar sesión](/docs/primeros-pasos/crear-tu-cuenta).',
      ),
      h2('«Debes verificar tu correo»'),
      p('Abrí el enlace del correo de verificación que te enviamos al registrarte. Buscalo también en correo no deseado o promociones.'),
      h2('«Demasiados intentos»'),
      p('Por seguridad, después de varios intentos seguidos Ruralit pide esperar unos minutos. Esperá y probá de nuevo con calma.'),
      h2('El código de 6 dígitos no funciona'),
      list(
        'Usá el código más reciente: cambia cada 30 segundos.',
        'Revisá que la hora de tu teléfono esté en automático: si está desfasada, los códigos no coinciden.',
      ),
      note('Si nada de esto funciona, escribinos desde el botón al pie de esta página y contanos con qué correo te registraste.'),
    ],
  },

  {
    slug: 'el-dictado-no-funciona',
    category: 'ayuda',
    title: 'El dictado por voz no funciona',
    summary: 'Permiso de micrófono, navegador compatible y qué hacer si la transcripción falla.',
    keywords: ['micrófono', 'dictado', 'voz', 'no escucha', 'dictado no disponible', 'permiso', 'no pude transcribir', 'audio'],
    updated: UPDATED,
    related: ['registrar/dictado-por-voz', 'registrar/registro-rapido'],
    blocks: [
      h2('Aparece «Dictado no disponible»'),
      p('Tu navegador no permite grabar audio en esa página. Probá con una versión actualizada de **Chrome**, **Edge** o **Safari**.'),
      h2('El micrófono no responde'),
      steps(
        'Revisá que hayas dado **permiso de micrófono** a Ruralit. En Chrome: tocá el candado junto a la dirección › Permisos › Micrófono › Permitir.',
        'Cerrá otras apps que puedan estar usando el micrófono (una llamada, una nota de voz).',
        'Recargá la página y probá de nuevo.',
      ),
      h2('«No pude transcribir el audio»'),
      list(
        'Hablá más cerca del teléfono y evitá el ruido de motores o viento.',
        'Revisá tu conexión: la primera preparación del dictado necesita descargar lo necesario.',
        'Si sigue fallando, escribí la frase: el registro rápido funciona igual.',
      ),
      tip('Después de dictar, siempre revisá la vista previa antes de confirmar. Nada se guarda sin que lo confirmes.'),
    ],
  },

  {
    slug: 'no-se-guarda-un-registro',
    category: 'ayuda',
    title: 'Un registro no se guarda',
    summary: 'Datos incompletos, ejercicio cerrado, permisos de solo lectura o un monto en cero.',
    keywords: ['no se guarda', 'error al guardar', 'no puedo registrar', 'botón deshabilitado', 'ejercicio cerrado', 'sin permisos', 'completá los datos'],
    updated: UPDATED,
    related: ['registrar/registro-rapido', 'balances/cerrar-el-ejercicio', 'equipo/roles-y-permisos'],
    blocks: [
      h2('El botón de guardar está deshabilitado'),
      p('En el registro rápido, si falta un dato (monto, categoría, cantidad) el botón queda deshabilitado y el campo aparece marcado: «Completá los datos marcados para guardar».'),
      h2('«El monto tiene que ser mayor a 0»'),
      p('Revisá que el monto no esté vacío ni en cero.'),
      h2('El período está cerrado'),
      p('Si la fecha cae en un ejercicio contable cerrado, Ruralit no deja registrar ni editar. Cambiá la fecha o pedí a alguien con permisos que reabra el ejercicio. Ver [Cerrar el ejercicio](/docs/balances/cerrar-el-ejercicio).'),
      h2('«No tienes permisos…»'),
      p('Tu rol en ese establecimiento es **Solo ver**. Pedile al dueño o a un Encargado que te cambie a Colaborador. Ver [Roles y permisos](/docs/equipo/roles-y-permisos).'),
      h2('No aparece en la lista'),
      list(
        'Revisá que estés en el **establecimiento** correcto.',
        'Revisá la **moneda** y el **mes** que tenés seleccionados en Movimientos.',
        'Si era la inversión inicial de un proyecto, la encontrás dentro del proyecto.',
      ),
    ],
  },

  {
    slug: 'la-importacion-tiene-errores',
    category: 'ayuda',
    title: 'La importación de Excel tiene errores',
    summary: 'Filas con errores, columnas sin reconocer, límite diario y una importación que se cortó.',
    keywords: ['importación', 'excel', 'errores', 'filas', 'columnas', 'no reconoce', 'límite diario', 'se cortó', 'csv'],
    updated: UPDATED,
    related: ['importar/preparar-tu-planilla', 'importar/importar-desde-excel'],
    blocks: [
      h2('Filas con errores en la revisión'),
      p('El paso de revisión marca cada fila con problemas y explica por qué. Lo más común es una fecha que no es fecha, un monto con texto o un campo obligatorio vacío. Corregí la planilla y volvé a subirla.'),
      h2('Las columnas no se reconocen'),
      p('En el paso de **Mapeo**, asociá a mano cada campo de Ruralit con la columna de tu planilla. Revisá que la primera fila tenga los encabezados.'),
      h2('Llegaste al límite del día'),
      p('En Gratis podés iniciar 3 importaciones de Excel por día. Esperá al día siguiente o pasá a Pro, que no tiene límite diario.'),
      h2('La importación se cortó'),
      warn('Si cerraste o recargaste la pestaña durante la importación, se detuvo. Revisá en Movimientos o Stock hasta qué fila llegó antes de volver a importar, para no duplicar registros.'),
    ],
  },

  {
    slug: 'olvide-mi-pin',
    category: 'ayuda',
    title: 'Olvidé mi PIN',
    summary: 'Qué hacer si no recordás el PIN de 4 dígitos de este dispositivo.',
    keywords: ['pin', 'olvidé', 'bloqueado', 'no recuerdo', 'intentos', '5 minutos'],
    updated: UPDATED,
    related: ['seguridad/bloqueo-con-pin'],
    blocks: [
      p('El PIN se guarda solo en el dispositivo, así que nadie (tampoco nosotros) puede decírtelo.'),
      list(
        'Después de 10 intentos fallidos, Ruralit se bloquea 5 minutos. Esperá y probá con calma.',
        'Cerrar sesión desde la pantalla del PIN **no lo quita**: el PIN pertenece al dispositivo y se vuelve a pedir al entrar.',
      ),

      h2('Quitar el PIN de este dispositivo'),
      steps(
        'En el navegador, borrá los **datos del sitio** de ruralit.site (en Chrome: el candado junto a la dirección › Configuración del sitio › Borrar datos).',
        'Abrí Ruralit de nuevo e iniciá sesión con tu correo y contraseña.',
        'Si querés, configurá un PIN nuevo.',
      ),
      path('Ajustes', 'Mi cuenta', 'Seguridad', 'Bloqueo de Aplicación (PIN)'),
      note('Tus registros están guardados en la nube: borrar los datos del sitio no borra nada de tu libreta, solo las preferencias guardadas en ese navegador.'),
    ],
  },
];
