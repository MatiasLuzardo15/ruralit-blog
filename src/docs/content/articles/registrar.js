import { flow, h2, list, node, note, p, path, phrase, steps, table, tip, warn } from '../blocks.js';

const UPDATED = '2026-10-05';

export const registrarArticles = [
  {
    slug: 'registro-rapido',
    category: 'registrar',
    title: 'El registro rápido: anotá lo que pasó con una frase',
    summary: 'Escribí como hablás en el campo y Ruralit arma el registro: tipo, monto, moneda, categoría y cantidad. Revisás la vista previa y confirmás.',
    keywords: ['qué pasó hoy', 'anotar', 'escribir', 'frase', 'texto', 'smart input', 'inteligente', 'vista previa', 'deshacer', 'cargar rápido', 'lenguaje natural'],
    updated: UPDATED,
    related: ['registrar/dictado-por-voz', 'registrar/carga-detallada', 'stock/registrar-stock-con-una-frase'],
    blocks: [
      p('En **Inicio** está el cuadro de registro rápido: «Anotá lo que pasó en tu establecimiento» en la computadora, «¿Qué pasó hoy?» en el celular. Escribís una frase con monto, moneda, concepto y, si corresponde, cantidad, y Ruralit la convierte en un registro listo para guardar.'),

      h2('Cómo se usa'),
      steps(
        'Escribí la frase en el cuadro. Por ejemplo: `pago luz tambo 5400`.',
        'Mientras escribís, debajo aparece la **vista previa** con lo que Ruralit entendió.',
        'Si falta un dato, queda marcado. Completalo desde la vista previa tocando el registro.',
        'Tocá el botón de enviar. El registro queda guardado y aparece primero en tus últimos movimientos.',
      ),
      phrase('Vendí 5 terneros a 600 dólares cada uno', [
        ['Tipo', 'Ingreso'],
        ['Monto', 'USD 3.000'],
        ['Categoría', 'Venta de animales'],
        ['Stock', '−5 cabezas · Terneros'],
      ], 'Una venta con cantidad: Ruralit registra el ingreso y, si el recurso existe en tu stock, también la salida.'),

      h2('Los atajos Ingreso, Gasto y Stock'),
      p('Arriba del cuadro hay tres atajos que preparan la frase antes de que escribas:'),
      table(
        ['Atajo', 'Empieza la frase con', 'Para'],
        ['**Ingreso**', '`Vendí `', 'Ventas y cobros.'],
        ['**Gasto**', '`Compré `', 'Compras, pagos y servicios.'],
        ['**Stock**', '`Ingresé `', 'Entradas o cambios de inventario sin dinero de por medio.'],
      ),

      h2('Qué entiende Ruralit'),
      list(
        '**Montos** con o sin puntos de miles: `5400` o `5.400`.',
        '**Monedas**: pesos y dólares (`pesos`, `$`, `dólares`, `dls`, `USD`). Si no la escribís, usa la moneda que estés viendo.',
        '**Categorías** a partir del concepto: gasoil, ración, vacunas, luz, flete, venta de terneros… Ruralit aprende de las correcciones que hacés.',
        '**Cantidades y recursos** de tu stock: cabezas, kilos, litros, bolsas, hectáreas.',
        '**Fechas** como `ayer`; si no decís nada, el registro queda con la fecha de hoy.',
      ),
      phrase('Compré ración por 12.000', [
        ['Tipo', 'Gasto'],
        ['Monto', '$ 12.000'],
        ['Categoría', 'Alimentación / ración'],
      ]),

      h2('Varios registros en una sola frase'),
      p('Podés contar más de una cosa a la vez: `pagué 3000 de gasoil y 1500 de luz`. La vista previa muestra un registro por cada operación; los revisás y los guardás todos juntos.'),

      h2('Si Ruralit no encuentra la categoría'),
      p('Cuando el concepto no coincide con ninguna categoría de tu establecimiento, Ruralit te propone **crear una nueva** con un nombre sugerido. Podés aceptarla, cambiarle el nombre o elegir una categoría existente.'),

      h2('Editar o deshacer lo que acabás de guardar'),
      p('Después de guardar aparece una confirmación con dos botones: **Editar** abre el registro para corregirlo y **Deshacer** lo quita. Pasado ese momento, lo corregís desde [Movimientos](/docs/movimientos/editar-y-eliminar).'),
      tip('Si preferís completar un formulario campo por campo, usá la [carga detallada](/docs/registrar/carga-detallada). Las dos formas guardan exactamente lo mismo.'),
    ],
  },

  {
    slug: 'dictado-por-voz',
    category: 'registrar',
    title: 'Dictado por voz',
    summary: 'Tocá el micrófono, decí lo que pasó y Ruralit lo transcribe al cuadro de registro rápido para que lo revises y confirmes.',
    keywords: ['voz', 'micrófono', 'hablar', 'dictar', 'audio', 'transcribir', 'manos libres', 'whisper'],
    updated: UPDATED,
    related: ['registrar/registro-rapido', 'ayuda/el-dictado-no-funciona', 'primeros-pasos/ruralit-en-el-celular'],
    blocks: [
      p('El dictado es la forma más rápida de registrar desde el campo: en vez de escribir, hablás. Ruralit convierte lo que dijiste en texto, lo pone en el cuadro de registro rápido y lo interpreta igual que si lo hubieras escrito.'),

      h2('Cómo dictar'),
      steps(
        'En **Inicio**, tocá el **micrófono** del cuadro de registro rápido.',
        'Si es la primera vez, el navegador te pide permiso para usar el micrófono: aceptalo.',
        'Hablá con naturalidad: «gasté cinco mil en gasoil».',
        'Tocá **Detener**. Ruralit transcribe el audio y completa el cuadro.',
        'Revisá la vista previa y confirmá con el botón de enviar.',
      ),
      flow(
        'El dictado nunca guarda solo: siempre ves lo que se entendió antes de confirmar.',
        node('person', 'Hablás', '«Pagué 30 dólares de sanidad»'),
        node('phone', 'Se transcribe', 'El texto aparece en el cuadro'),
        node('ruralit', 'Se interpreta', 'Gasto · USD 30 · Sanidad'),
        node('person', 'Confirmás', 'Un toque y queda guardado'),
      ),

      h2('Consejos para que entienda a la primera'),
      list(
        'Decí el **monto y la moneda**: «treinta dólares», «doce mil pesos».',
        'Nombrá el **concepto** como lo llamarías en tu libreta: gasoil, ración, vacuna, flete.',
        'Si hay animales o insumos, decí la **cantidad**: «vendí cinco terneros».',
        'En lugares con mucho viento o motor, acercá el teléfono a la boca.',
      ),
      note('La primera vez, Ruralit puede tardar unos segundos en preparar el dictado («Preparando dictado»). Las siguientes veces arranca más rápido.'),
      p('Si el micrófono no responde o aparece «Dictado no disponible», revisá [El dictado no funciona](/docs/ayuda/el-dictado-no-funciona).'),
    ],
  },

  {
    slug: 'carga-detallada',
    category: 'registrar',
    title: 'Carga detallada de ingresos y gastos',
    summary: 'El formulario completo: monto, categoría, fecha, moneda y cotización, observaciones, proyecto, stock asociado e impuestos.',
    keywords: ['formulario', 'registrar ingreso', 'registrar gasto', 'entrada', 'salida', 'manual', 'confirmar registro', 'observaciones', 'fecha de operación'],
    updated: UPDATED,
    related: ['registrar/categorias', 'registrar/otra-moneda', 'impuestos/impuestos-en-cada-registro'],
    blocks: [
      p('Cuando necesitás controlar cada campo (una venta con impuestos, una compra en dólares con cotización del día, un gasto que pertenece a un proyecto), usá la carga detallada.'),

      h2('Dónde está'),
      list(
        '**En el celular**: el botón **+** junto al cuadro de registro rápido → **Registrar ingreso** o **Registrar gasto**.',
        '**En la computadora**: los botones **Gasto** e **Ingreso** en la parte superior de Inicio, junto a **Importar**.',
      ),

      h2('Los campos'),
      table(
        ['Campo', 'Qué va'],
        ['**Monto**', 'El importe de la operación. Tiene que ser mayor a 0.'],
        ['**Moneda**', 'Una de las monedas activas del establecimiento.'],
        ['**Clasificación**', 'La categoría, agrupada por macrocategoría. Podés crear una nueva sin salir del formulario.'],
        ['**Fecha de Operación**', 'Hoy por defecto. Cambiala si estás cargando algo atrasado.'],
        ['**Observaciones**', 'Opcional: proveedor, número de factura, a quién se le vendió.'],
        ['**Proyecto vinculado**', 'Opcional: el proyecto al que pertenece este dinero.'],
        ['**Stock**', 'Opcional: el recurso, la cantidad y la unidad que entran o salen con esta operación.'],
      ),
      p('Al terminar, tocá **Confirmar Registro**. Si estás editando un registro existente, el botón dice **Guardar Cambios**.'),

      h2('Mover stock en la misma operación'),
      p('La opción de stock vincula el movimiento de dinero con el inventario: en un **gasto**, «suma stock por una compra»; en un **ingreso**, «resta stock por una venta». Completá recurso, cantidad y unidad, y Ruralit actualiza los dos registros a la vez.'),

      h2('Impuestos'),
      p('Si configuraste tu perfil fiscal, el formulario muestra el **desglose impositivo**: en ventas podés activar la aplicación de impuestos y en gastos el **IVA crédito**. Los impuestos no se aplican solos; lo decidís en cada registro. Está explicado en [Impuestos en cada registro](/docs/impuestos/impuestos-en-cada-registro).'),
      warn('Si la fecha cae dentro de un ejercicio contable **cerrado**, no vas a poder guardar. Ver [Cerrar el ejercicio](/docs/balances/cerrar-el-ejercicio).'),
    ],
  },

  {
    slug: 'categorias',
    category: 'registrar',
    title: 'Categorías de ingresos y gastos',
    summary: 'Cómo se organizan las categorías, cómo crear y editar las tuyas, y para qué sirven la macrocategoría y el código.',
    keywords: ['categoría', 'clasificación', 'macrocategoría', 'código contable', 'rubro', 'crear categoría', 'renombrar', 'eliminar categoría', 'sin categoría'],
    updated: UPDATED,
    related: ['registrar/carga-detallada', 'primeros-pasos/configuracion-inicial', 'balances/leer-el-balance'],
    blocks: [
      p('Cada ingreso y cada gasto lleva una **categoría**: Venta de animales, Combustible, Sanidad, Alimentación / ración… Las categorías son las que después te dicen, en el balance, de dónde viene la plata y a dónde se va.'),

      h2('De dónde salen'),
      p('Al crear el establecimiento, Ruralit carga un juego de categorías según el **rubro** que elegiste. Cada establecimiento tiene las suyas: lo que cambiás en un campo no afecta a los demás.'),

      h2('Administrar categorías'),
      path('Ajustes', 'Este establecimiento', 'Categorías Entradas'),
      path('Ajustes', 'Este establecimiento', 'Categorías Salidas'),
      p('Desde ahí creás categorías nuevas, les cambiás el nombre, el ícono o el color, y quitás las que no usás.'),
      list(
        '**Macrocategoría**: el grupo al que pertenece (por ejemplo, «Sanidad» agrupa Vacunas, Medicamentos y Antiparasitarios). Ordena el selector y agrupa el balance.',
        '**Código**: opcional, para que coincida con el plan de cuentas de tu contador.',
      ),

      h2('Crear una categoría mientras registrás'),
      p('No hace falta ir a Ajustes: en la carga detallada podés crear una categoría desde el mismo selector, y en el registro rápido Ruralit te propone crearla cuando el concepto no coincide con ninguna existente.'),

      h2('Si quitás una categoría'),
      p('Los movimientos que la usaban **no se borran**. En el balance quedan agrupados como sin categoría hasta que los reasignes.'),
      tip('Ruralit aprende de tus correcciones: si en el registro rápido cambiás la categoría que te propuso, la próxima frase parecida va a la categoría que elegiste.'),
      note('Solo quienes tienen permiso de edición en el establecimiento pueden crear o modificar categorías.'),
    ],
  },

  {
    slug: 'otra-moneda',
    category: 'registrar',
    title: 'Registrar en pesos, dólares u otra moneda',
    summary: 'Cada registro guarda su moneda y su cotización. Ruralit no mezcla monedas: las suma por separado.',
    keywords: ['moneda', 'dólares', 'pesos', 'usd', 'uyu', 'ars', 'cotización', 'tipo de cambio', 'divisa', 'convertir'],
    updated: UPDATED,
    related: ['ajustes/monedas-y-cotizaciones', 'balances/varias-monedas', 'registrar/carga-detallada'],
    blocks: [
      p('En el campo es común vender en dólares y pagar en pesos. Ruralit guarda cada operación **en la moneda en que ocurrió**, con su cotización, y nunca convierte por su cuenta.'),

      h2('Elegir la moneda de un registro'),
      list(
        'En el **registro rápido**, decí o escribí la moneda: `30 dólares`, `5000 pesos`, `USD 200`. Si no la mencionás, se usa la moneda que estás viendo.',
        'En la **carga detallada**, elegila en el selector de moneda junto al monto.',
      ),
      p('Solo aparecen las monedas **activas** del establecimiento (hasta dos). Se configuran en [Monedas y cotizaciones](/docs/ajustes/monedas-y-cotizaciones).'),

      h2('La cotización'),
      p('Al registrar en una moneda distinta de la principal, el formulario consulta la **cotización del momento** y la deja editable: podés escribir la que usaste de verdad en la operación. Si la consulta no responde, Ruralit te pide ingresarla a mano.'),
      p('Si el movimiento pertenece a un proyecto en otra moneda, también se guarda la **cotización del proyecto**, para que el seguimiento del proyecto sume en su propia moneda.'),

      h2('Cómo se suman'),
      p('Movimientos y Balances funcionan como **cuentas paralelas**: los pesos se suman con pesos y los dólares con dólares. Cambiás de moneda con las pestañas de moneda de cada sección. Así ningún resultado depende de un tipo de cambio que no elegiste.'),
      tip('La opción **Convertir a USD** del formulario te muestra cuánto representa el monto en dólares como referencia, pero el registro se guarda en la moneda original.'),
    ],
  },
];
