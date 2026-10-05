import { flow, h2, list, node, note, p, path, phrase, steps, table, tip, warn } from '../blocks.js';

const UPDATED = '2026-10-05';

export const stockArticles = [
  {
    slug: 'que-es-el-stock',
    category: 'stock',
    title: 'Qué es el stock y cómo se calcula',
    summary: 'El inventario físico del campo, separado del dinero: recursos con su unidad, su saldo (entradas menos salidas) y su estado.',
    keywords: ['inventario', 'recursos', 'existencias', 'saldo', 'cabezas', 'animales', 'insumos', 'unidad', 'general', 'en proyectos'],
    updated: UPDATED,
    related: ['stock/agregar-un-recurso', 'stock/registrar-cambios-de-stock', 'stock/stock-minimo-y-alertas'],
    blocks: [
      p('**Stock** registra lo que hay físicamente en el establecimiento: animales, cultivos, leche, insumos, maquinaria y cualquier otro recurso. Es independiente de la contabilidad: podés llevar stock sin registrar dinero, y dinero sin tocar el stock.'),

      h2('Recursos'),
      p('Cada cosa que controlás es un **recurso**, con un nombre, un tipo y una unidad base.'),
      table(
        ['Tipo', 'Unidades habituales'],
        ['Ganado', 'cabezas'],
        ['Cultivo', 'hectáreas, kg, toneladas'],
        ['Leche', 'litros'],
        ['Insumo', 'bolsas, kg, litros, unidades'],
        ['Maquinaria', 'unidades, horas'],
        ['Recurso u otro', 'metros, unidades u otra'],
      ),

      h2('Cómo se calcula el saldo'),
      p('El saldo de un recurso es la suma de sus **entradas** menos la suma de sus **salidas**. No se escribe a mano: se recalcula solo con cada cambio que registrás.'),
      flow(
        'Ejemplo de un recurso de ganado a lo largo de un mes.',
        node('stock', 'Stock inicial', '+120 cabezas'),
        node('stock', 'Compra', '+30 cabezas'),
        node('stock', 'Venta', '−40 cabezas'),
        node('chart', 'Saldo', '110 cabezas'),
      ),

      h2('General y en proyectos'),
      p('Los recursos pueden pertenecer al **stock general** del campo o a un **proyecto** (por ejemplo, el lote de novillos de una invernada). El selector de alcance te deja ver General, En proyectos o Todos.'),
      note('Los recursos de un proyecto se editan desde ese proyecto en **Proyectos**, para que su seguimiento quede completo.'),

      h2('Dónde está'),
      list(
        '**En la computadora**: **Stock** en la barra lateral.',
        '**En el celular**: en **Movimientos**, cambiá a **Stock** con el selector de arriba.',
      ),
    ],
  },

  {
    slug: 'agregar-un-recurso',
    category: 'stock',
    title: 'Agregar un recurso con su stock inicial',
    summary: 'Nombre, tipo, unidad, cantidad inicial y stock mínimo: lo necesario para empezar a controlar un recurso.',
    keywords: ['nuevo recurso', 'crear recurso', 'stock inicial', 'agregar stock', 'ícono', 'alta', 'cargar inventario'],
    updated: UPDATED,
    related: ['stock/que-es-el-stock', 'stock/stock-minimo-y-alertas', 'importar/importar-desde-excel'],
    blocks: [
      steps(
        'En **Stock**, tocá **Agregar recurso**.',
        'Escribí el **nombre**: «Terneros», «Ración 18%», «Gasoil».',
        'Elegí el **tipo** y la **unidad**. Si querés, cambiá el ícono.',
        'Poné el **stock inicial**: lo que hay hoy.',
        'Opcional: un **stock mínimo** y una nota.',
        'Guardá. El recurso aparece en la tabla con su saldo.',
      ),
      tip('Si ya existe un recurso con ese nombre en el stock general, Ruralit no crea uno duplicado.'),

      h2('Cargar muchos recursos de una vez'),
      p('Si tenés el inventario en una planilla, importalo: elegí el destino **Inventario y Stock** en el [importador de Excel](/docs/importar/importar-desde-excel).'),

      h2('Quitar un recurso'),
      p('Desde el recurso, usá la opción de quitar. Ruralit pide **confirmar dos veces** para evitar borrados accidentales. Sus movimientos dejan de contar en los saldos.'),
    ],
  },

  {
    slug: 'registrar-cambios-de-stock',
    category: 'stock',
    title: 'Registrar compras, ventas y otros cambios de stock',
    summary: 'Las operaciones que suman o restan stock, cómo registrarlas y cómo ver el historial de cada recurso.',
    keywords: ['movimiento de stock', 'entrada', 'salida', 'compra', 'venta', 'producción', 'consumo', 'pérdida', 'mortandad', 'ajuste', 'historial del recurso'],
    updated: UPDATED,
    related: ['stock/registrar-stock-con-una-frase', 'registrar/carga-detallada', 'stock/que-es-el-stock'],
    blocks: [
      p('Cada vez que algo entra o sale del campo, registrás un cambio en el recurso. El saldo se actualiza solo.'),

      h2('Las operaciones'),
      table(
        ['Operación', 'Efecto', 'Ejemplo'],
        ['**Compra**', 'Suma', 'Compraste 50 bolsas de ración.'],
        ['**Producción**', 'Suma', 'Nacieron 12 terneros; se ordeñaron 800 litros.'],
        ['**Sumar stock**', 'Suma', 'Un ajuste después de recontar.'],
        ['**Venta**', 'Resta', 'Vendiste 40 novillos.'],
        ['**Consumo**', 'Resta', 'Se usaron 10 bolsas de ración.'],
        ['**Pérdida**', 'Resta', 'Mortandad, robo o deterioro.'],
        ['**Quitar stock**', 'Resta', 'Un ajuste a la baja después de recontar.'],
      ),

      h2('Registrar un cambio'),
      steps(
        'Buscá el recurso en la tabla y abrilo.',
        'Elegí la **operación**.',
        'Ingresá la **cantidad** y la **fecha**.',
        'Agregá una nota si querés y guardá. La vista previa muestra cómo queda el stock antes de confirmar.',
      ),

      h2('Con dinero o sin dinero'),
      p('Una compra o una venta de stock **no registra dinero por sí sola**. Si querés registrar las dos cosas a la vez, hacelo desde la [carga detallada](/docs/registrar/carga-detallada) con la opción de stock, o con una frase en el [registro rápido](/docs/stock/registrar-stock-con-una-frase).'),

      h2('El historial de un recurso'),
      p('Cada recurso guarda todos sus cambios con fecha, operación, cantidad y nota. Abrilo para ver el historial y las entradas, salidas y cambios del período.'),
      warn('Ruralit no impide que el saldo quede negativo si registrás más salidas que entradas. Si ves un número negativo, revisá el historial: suele faltar el stock inicial o una compra.'),
    ],
  },

  {
    slug: 'registrar-stock-con-una-frase',
    category: 'stock',
    title: 'Registrar stock con una frase',
    summary: 'Desde el registro rápido de Inicio, una frase puede mover stock, registrar dinero o las dos cosas.',
    keywords: ['registro rápido', 'frase', 'vendí vacas', 'quedan bolsas', 'ingresé', 'texto', 'voz', 'inventario con texto'],
    updated: UPDATED,
    related: ['registrar/registro-rapido', 'stock/registrar-cambios-de-stock', 'registrar/dictado-por-voz'],
    blocks: [
      p('No hace falta abrir Stock para cada cambio. En el registro rápido de **Inicio** podés escribir o dictar lo que pasó, y Ruralit detecta el recurso, la operación y la cantidad.'),
      phrase('Vendí 40 vacas a 500 dólares', [
        ['Tipo', 'Ingreso'],
        ['Monto', 'USD 20.000'],
        ['Stock', 'Venta · −40 cabezas · Vacas'],
      ], 'Una venta con precio: se registra el ingreso y la salida de stock juntos.'),
      phrase('Ingresé 30 bolsas de ración', [
        ['Stock', 'Entrada · +30 bolsas · Ración'],
      ], 'Sin monto: solo se mueve el stock.'),

      h2('Consejos'),
      list(
        'Usá el atajo **Stock** de Inicio: empieza la frase con «Ingresé».',
        'Nombrá el recurso como lo tenés en Stock. Si no existe, Ruralit lo crea al guardar.',
        'Decí la cantidad con su unidad: cabezas, kilos, litros, bolsas.',
      ),
      tip('Siempre ves la vista previa antes de guardar: si interpretó mal la operación o la cantidad, la corregís ahí.'),
    ],
  },

  {
    slug: 'stock-minimo-y-alertas',
    category: 'stock',
    title: 'Stock mínimo y alertas de stock bajo',
    summary: 'Definí cuánto es lo mínimo que necesitás de cada recurso y enterate antes de que falte.',
    keywords: ['stock mínimo', 'mínimo', 'alerta', 'stock bajo', 'faltante', 'aviso', 'correo', 'email', 'estado', 'normal', 'bajo'],
    updated: UPDATED,
    related: ['stock/agregar-un-recurso', 'ajustes/notificaciones', 'planes/gratis-pro-y-equipos'],
    blocks: [
      p('El **stock mínimo** es la cantidad por debajo de la cual un recurso empieza a preocuparte: las bolsas de ración para la próxima semana, el gasoil para la cosecha, las dosis de vacuna.'),

      h2('Configurarlo'),
      steps(
        'Abrí el recurso en **Stock**.',
        'Activá **stock mínimo** y escribí la cantidad.',
        'Guardá.',
      ),

      h2('Los estados'),
      table(
        ['Estado', 'Qué significa'],
        ['**Normal**', 'Hay más que el mínimo, con margen.'],
        ['**Bajo**', 'El saldo está en el mínimo o muy cerca. Ruralit lo marca un poco antes de llegar, para que tengas tiempo de reponer.'],
        ['**Sin mínimo**', 'El recurso no tiene un mínimo configurado.'],
      ),
      p('El resumen de Stock muestra cuántos recursos están disponibles, cuántos faltan y cuántos están bajos.'),

      h2('Alertas por correo'),
      path('Ajustes', 'Mi cuenta', 'Email y Notificaciones', 'Alertas de Stock Bajo'),
      p('Con esta alerta activada, recibís un correo cuando un recurso queda por debajo de su stock mínimo.'),
      note('Las alertas de stock bajo por correo están incluidas en Ruralit Pro y Equipos. Los estados en pantalla están en todos los planes.'),
    ],
  },
];
