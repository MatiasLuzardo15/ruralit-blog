import { flow, h2, h3, list, node, note, p, path, steps, table, tip, warn } from '../blocks.js';

const UPDATED = '2026-10-05';

export const primerosPasosArticles = [
  {
    slug: 'que-es-ruralit',
    category: 'primeros-pasos',
    title: 'Qué es Ruralit y cómo está organizado',
    summary: 'La libreta digital del campo: registras ingresos, gastos y stock, y Ruralit los convierte en balances, proyectos y reportes. Aquí ves qué hace cada sección.',
    keywords: ['introducción', 'secciones', 'empezar', 'libreta', 'qué es', 'menú', 'para qué sirve'],
    updated: '2026-11-11',
    related: ['ruli/que-es-ruli', 'primeros-pasos/configuracion-inicial', 'primeros-pasos/moverte-por-ruralit'],
    blocks: [
      p('Ruralit es la **libreta del campo** en versión digital. Anotas lo que pasa en tu establecimiento (una venta de terneros, la compra de gasoil, las bolsas de ración que entraron) y la app lo ordena por ti: lo clasifica, lo suma, lo compara con el mes anterior y lo deja listo para compartir con tu contador o tu familia.'),
      p('Está pensado para productores de ganadería, lechería, agricultura, ovinos, servicios o campos mixtos, y funciona igual desde la computadora que desde el celular.'),

      h2('Las secciones'),
      table(
        ['Sección', 'Para qué sirve'],
        ['**Inicio**', 'Registrar rápido lo que pasó, escribiendo o dictando. Muestra tus últimos movimientos y avisos.'],
        ['**Movimientos**', 'El historial completo de ingresos y gastos, con fechas, monedas, categorías, impuestos y notas.'],
        ['**Stock**', 'Los recursos físicos del campo: animales, cultivos, leche, insumos y maquinaria, con su saldo.'],
        ['**Balances**', 'El resultado del mes, el trimestre o el año: ingresos, gastos, margen y de dónde viene cada número.'],
        ['**Proyectos**', 'Separar una inversión, una actividad, una meta de ahorro o un activo para medirlo por su cuenta.'],
        ['**Reportes**', 'Informes en PDF o CSV para compartir. Disponible en Ruralit Pro.'],
        ['**Ajustes**', 'Tu cuenta, tus establecimientos, el equipo, las monedas, las categorías, los impuestos y la seguridad.'],
      ),

      h2('Cómo se conecta todo'),
      flow(
        'Un solo registro alimenta varias secciones a la vez: no hace falta cargar el mismo dato dos veces.',
        node('person', 'Registras', '«Vendí 5 terneros a 600 dólares»'),
        node('ruralit', 'Ruralit interpreta', 'Tipo, monto, moneda, categoría y cantidad'),
        node('stock', 'Movimientos y Stock', 'Entra el ingreso y salen 5 cabezas'),
        node('chart', 'Balances y Reportes', 'El resultado del mes se actualiza solo'),
      ),
      list(
        'Un movimiento puede **vincularse a un proyecto**, para seguir cuánto costó o cuánto rindió.',
        'Una venta o una compra puede **mover stock** al mismo tiempo que registra el dinero.',
        'Si configuras tu **perfil fiscal**, Ruralit calcula el IVA y los impuestos de cada operación.',
        'Si compartes el establecimiento, **todo el equipo** ve los mismos datos al instante.',
      ),

      h2('Establecimientos'),
      p('Todo lo que registras pertenece a un **establecimiento** (tu campo). Puedes tener más de uno y cambiar entre ellos sin mezclar los números: cada establecimiento tiene sus propias categorías, monedas, stock, proyectos y equipo. Cuántos puedes tener depende de tu plan; lo ves en [Gratis, Pro y Equipos](/docs/planes/gratis-pro-y-equipos).'),

      h2('Dónde se usa'),
      p('Ruralit funciona en el navegador: en la computadora, en una tablet o en el celular. Tu cuenta y tus datos son los mismos en todos los dispositivos. Los pasos para tenerlo a mano en el teléfono están en [Ruralit en el celular](/docs/primeros-pasos/ruralit-en-el-celular).'),
      tip('La primera vez que entras a cada sección, Ruralit te muestra una guía corta de unos pocos pasos. Después queda libre para trabajar.'),
    ],
  },

  {
    slug: 'crear-tu-cuenta',
    category: 'primeros-pasos',
    title: 'Crear tu cuenta e iniciar sesión',
    summary: 'Regístrate con tu correo o con Google, verifica tu correo, acepta los términos y recupera el acceso si olvidas la contraseña.',
    keywords: ['registro', 'registrarse', 'contraseña', 'olvidé', 'recuperar', 'google', 'login', 'entrar', 'verificar correo', 'términos', 'cuenta nueva'],
    updated: UPDATED,
    related: ['primeros-pasos/configuracion-inicial', 'seguridad/verificacion-en-dos-pasos', 'ayuda/no-puedo-entrar'],
    blocks: [
      p('Para usar Ruralit necesitas una cuenta. Puedes crearla con tu correo y una contraseña, o entrar directamente con tu cuenta de Google. Solo se hace una vez: después la sesión queda abierta en ese dispositivo hasta que la cierres.'),

      h2('Crear una cuenta con correo'),
      steps(
        'Crea la cuenta desde **Crear cuenta**.',
        'Escribe tu correo y una contraseña de **al menos 6 caracteres**, y confírmala.',
        'Crea la cuenta. Te llega un correo para **verificar tu dirección**: abre el enlace.',
        'Vuelve a Ruralit e inicia sesión con tu correo y tu contraseña.',
      ),
      note('Hasta que verifiques el correo no vas a poder iniciar sesión. Si no te llegó, revisa la carpeta de correo no deseado.'),

      h2('Entrar con Google'),
      p('En la pantalla de inicio de sesión, debajo del formulario, elige **Google** en «O continúa con». No necesitas crear una contraseña aparte: Ruralit usa tu cuenta de Google para identificarte.'),

      h2('Aceptar los términos'),
      p('La primera vez que entras, Ruralit te pide dejar asentada tu aceptación de los [Términos de uso](/terminos/) y la [Política de privacidad](/privacidad/) antes de preparar tu libreta. Es un paso único: resume cómo se usan tus datos y qué controles de acceso aplica la app.'),

      h2('Si olvidaste la contraseña'),
      steps(
        'En la pantalla de inicio de sesión, elige la opción para recuperar la contraseña.',
        'Escribe el correo de tu cuenta. Te enviamos un enlace.',
        'Abre el enlace, escribe la contraseña nueva dos veces y guárdala.',
      ),
      warn('Si haces muchos intentos seguidos, Ruralit te pide esperar unos minutos antes de volver a probar. Es una protección contra accesos no autorizados.'),

      h2('Cerrar sesión'),
      path('Ajustes', 'Cerrar Sesión'),
      p('En la computadora también lo encuentras en el menú de tu cuenta. Cerrar sesión no borra nada: tus datos quedan guardados en la nube.'),
    ],
  },

  {
    slug: 'configuracion-inicial',
    category: 'primeros-pasos',
    title: 'Configuración inicial: tu campo en siete pasos',
    summary: 'País, perfil, campo, rubro, ejercicio, vista y monedas. Lo que eliges en cada paso y cómo cambiarlo después.',
    keywords: ['configurar', 'setup', 'país', 'rubro', 'tipo de producción', 'ejercicio agrícola', 'año civil', 'monedas', 'categorías iniciales', 'onboarding'],
    updated: UPDATED,
    related: ['primeros-pasos/que-es-ruralit', 'balances/ano-civil-o-ejercicio-agricola', 'ajustes/monedas-y-cotizaciones'],
    blocks: [
      p('Después de crear tu cuenta, Ruralit te acompaña con una **configuración inicial** para dejar la libreta lista. Son siete pasos cortos; tu progreso queda a la vista antes de crear el campo y todo se puede cambiar más adelante desde Ajustes.'),

      h2('Los siete pasos'),
      table(
        ['Paso', 'Qué eliges', 'Para qué sirve'],
        ['**País**', 'Uruguay, Argentina, Brasil, Paraguay, Chile, Bolivia, Perú, Colombia o México.', 'Sugiere las monedas y la base impositiva.'],
        ['**Perfil**', 'Tu nombre de trabajo.', 'Es cómo te ve tu equipo en la actividad y los chats.'],
        ['**Campo**', 'El nombre del establecimiento y, si quieres, el dueño o la familia.', 'Crea tu establecimiento principal.'],
        ['**Rubro**', 'Ganadería, Lechería, Agricultura, Servicios, Ovina, Mixto o Personalizado.', 'Carga las categorías iniciales de ingresos y gastos.'],
        ['**Ejercicio**', 'Año civil o ejercicio agrícola.', 'Define cómo se agrupan los balances anuales.'],
        ['**Vista**', 'Vista lista o vista por filtros.', 'Cómo vas a recorrer tus movimientos.'],
        ['**Divisas**', 'Las monedas con las que trabajas.', 'Hasta dos monedas activas, por ejemplo pesos y dólares.'],
      ),

      h2('Rubro y categorías'),
      p('El rubro decide con qué categorías empiezas. Ganadería trae categorías de hacienda y sanidad; Lechería, de tambo y producción diaria; Agricultura, de cultivos, cosecha e insumos; Servicios, de maquinaria y trabajos a terceros. **Mixto** combina varios rubros y **Personalizado** empieza con una base flexible para ajustar después.'),
      p('Las categorías no quedan fijas: puedes crear, renombrar o quitar las que quieras. Está explicado en [Categorías de ingresos y gastos](/docs/registrar/categorias).'),

      h2('Año civil o ejercicio agrícola'),
      list(
        '**Año civil**: de enero a diciembre. Simple para administración personal, servicios o balances por calendario clásico.',
        '**Ejercicio agrícola**: de julio a junio. Recomendado para producción agropecuaria y para leer los números por zafra o campaña.',
      ),
      p('Más detalle en [Año civil o ejercicio agrícola](/docs/balances/ano-civil-o-ejercicio-agricola).'),

      h2('Vista lista o por filtros'),
      list(
        '**Vista lista**: recorres los registros recientes y cargas meses anteriores a medida que los necesitas.',
        '**Vista por filtros**: trabajas por período, moneda, categoría y tipo desde controles siempre visibles.',
      ),

      h2('Cambiar algo después'),
      path('Ajustes', 'Este establecimiento', 'Datos del establecimiento'),
      p('Desde ahí cambias el nombre y el tipo de producción. Las monedas están en **Monedas**, las categorías en **Categorías de ingresos** y **Categorías de gastos**, y el ejercicio en **Período contable y archivo**.'),
      tip('Si administras más de un campo, cada establecimiento nuevo pasa por su propia configuración: rubro, ejercicio y monedas pueden ser distintos en cada uno.'),
    ],
  },

  {
    slug: 'moverte-por-ruralit',
    category: 'primeros-pasos',
    title: 'Moverte por Ruralit en la computadora y en el celular',
    summary: 'La barra lateral en escritorio, la barra inferior en el celular, el cambio de establecimiento y los avisos.',
    keywords: ['navegación', 'menú', 'barra lateral', 'barra inferior', 'más', 'cambiar establecimiento', 'notificaciones', 'avisos', 'campana'],
    updated: UPDATED,
    related: ['primeros-pasos/que-es-ruralit', 'ajustes/tus-establecimientos', 'primeros-pasos/ruralit-en-el-celular'],
    blocks: [
      p('Ruralit adapta su navegación al tamaño de la pantalla. Las secciones son las mismas; lo que cambia es dónde están los accesos.'),

      h2('En la computadora'),
      p('A la izquierda hay una **barra lateral** con dos grupos:'),
      list(
        '**Navegación**: Inicio.',
        '**Gestión de datos**: Movimientos, Stock, Balances, Proyectos y, si tienes Ruralit Pro, Reportes.',
      ),
      p('Al pie de la barra está el **selector de establecimiento** y, debajo, el menú de tu cuenta, desde donde llegas a Ajustes, a esta documentación y a cerrar sesión. La flecha junto al logo contrae la barra para dejar más espacio a los datos.'),

      h2('En el celular'),
      p('Abajo hay una **barra de navegación** con Inicio, Movimientos, Balances, Proyectos y **Más**. «Más» abre Reportes (si tienes Pro) y Ajustes.'),
      list(
        '**Stock** está junto a Movimientos: arriba de la lista hay un selector para cambiar entre **Movimientos** y **Stock**.',
        'La **campana** de Inicio abre tus notificaciones pendientes; las que ya leíste se pueden descartar.',
        'El botón **+** junto al cuadro de registro abre la carga manual de ingresos, gastos y stock, y la importación de Excel o facturas.',
      ),

      h2('Cambiar de establecimiento'),
      p('Si tienes más de un campo, o te compartieron alguno, el **selector de establecimiento** te deja pasar de uno a otro. Al cambiar, toda la app pasa a mostrar los datos del campo elegido: movimientos, stock, balances, proyectos y equipo.'),
      note('Lo que registras siempre queda en el establecimiento activo. Antes de cargar, mira el nombre del campo arriba de la pantalla.'),
    ],
  },

  {
    slug: 'ruralit-en-el-celular',
    category: 'primeros-pasos',
    title: 'Ruralit en el celular',
    summary: 'Úsalo desde el navegador del teléfono y agrégalo a la pantalla de inicio para abrirlo como una app más.',
    keywords: ['móvil', 'celular', 'teléfono', 'instalar', 'pantalla de inicio', 'app', 'android', 'iphone', 'pwa', 'acceso directo'],
    updated: '2026-11-11',
    related: ['primeros-pasos/moverte-por-ruralit', 'registrar/dictado-por-voz', 'seguridad/bloqueo-con-pin'],
    blocks: [
      p('Ruralit está pensado para usarse en el campo, con una mano y a veces sin buena señal para escribir. En el celular tienes las mismas funciones que en la computadora, con una navegación adaptada al pulgar.'),

      h2('Agregarlo a la pantalla de inicio'),
      h3('En Android (Chrome)'),
      steps(
        'Abre Ruralit en Chrome e inicia sesión.',
        'Toca el menú de los tres puntos.',
        'Elige **Agregar a la pantalla principal** o **Instalar aplicación**.',
      ),
      h3('En iPhone (Safari)'),
      steps(
        'Abre Ruralit en Safari e inicia sesión.',
        'Toca el botón **Compartir**.',
        'Elige **Agregar a inicio**.',
      ),
      p('A partir de ahí Ruralit aparece con su ícono junto a tus otras apps y se abre a pantalla completa. En Android y en iPhone es la misma aplicación web. Todavía no hay una app publicada en Play Store ni en App Store.'),

      h2('Lo que más se usa desde el teléfono'),
      list(
        '**Dictar** un gasto o una venta con el micrófono, sin escribir. Ver [Dictado por voz](/docs/registrar/dictado-por-voz).',
        '**Revisar el stock** antes de comprar insumos.',
        'Mirar el **balance del mes** en un minuto.',
        'Responder en los **chats del equipo** sobre un registro concreto.',
      ),
      tip('Si compartes el teléfono con otras personas, activa el [bloqueo con PIN](/docs/seguridad/bloqueo-con-pin): pide un código de 4 dígitos para abrir Ruralit en ese dispositivo.'),
    ],
  },
];
