import { h2, list, note, p, path, steps, table, tip } from '../blocks.js';

const UPDATED = '2026-10-05';

export const movimientosArticles = [
  {
    slug: 'el-historial',
    category: 'movimientos',
    title: 'El historial de movimientos',
    summary: 'Todos los ingresos y gastos del establecimiento, con su resumen de operaciones y las dos formas de recorrerlos: por mes o en lista.',
    keywords: ['libreta', 'historial', 'reporte general', 'resumen de operaciones', 'balance neto', 'flujo', 'vista lista', 'vista por filtros', 'mes anterior'],
    updated: UPDATED,
    related: ['movimientos/buscar-y-filtrar', 'movimientos/editar-y-eliminar', 'ajustes/apariencia-y-preferencias'],
    blocks: [
      p('**Movimientos** es tu libreta completa: cada ingreso y cada gasto del establecimiento, con fecha, monto, moneda, categoría, impuestos y notas. Lo que registras en Inicio, en un proyecto o por importación termina aquí.'),

      h2('El resumen de operaciones'),
      p('Arriba de la lista, el **Resumen de Operaciones** suma lo que estás viendo: **Ingresos**, **Gastos** y **Balance Neto** del período y los filtros elegidos. Si trabajas con dos monedas, cada una se resume por separado.'),

      h2('Cada movimiento'),
      list(
        'Fecha, categoría y monto, en verde si es ingreso y en rojo si es gasto.',
        'La **nota** u observación que escribiste.',
        'Una marca de **IVA** (débito o crédito) si el registro tiene impuestos calculados.',
        'Una marca del **proyecto** al que pertenece, si está vinculado a uno.',
      ),

      h2('Dos formas de recorrerlo'),
      table(
        ['Vista', 'Cómo funciona'],
        ['**Por filtros**', 'Eliges un mes con el selector de mes y año (o «Todo el historial») y filtras por tipo, categoría, código y divisa.'],
        ['**Lista**', 'Ves los registros más recientes y, al llegar al final, cargas el mes anterior. Cuando no hay más, aparece «Llegaste al inicio del historial».'],
      ),
      p('La elegiste en la configuración inicial y la cambias cuando quieras:'),
      path('Ajustes', 'Mi cuenta', 'Apariencia y preferencias'),

      h2('Movimientos y Stock'),
      p('En el celular, arriba de la lista hay un selector para pasar de **Movimientos** (dinero) a **Stock** (recursos físicos). Un mismo registro, como una venta de animales, puede aparecer en los dos.'),
      note('Los movimientos de inversión inicial de un proyecto no se muestran en esta lista ni cuentan en el balance operativo: viven dentro del proyecto. Ver [Crear un proyecto](/docs/proyectos/crear-un-proyecto).'),
    ],
  },

  {
    slug: 'buscar-y-filtrar',
    category: 'movimientos',
    title: 'Buscar y filtrar movimientos',
    summary: 'Encuentra un registro por texto, tipo, categoría, código, divisa o período.',
    keywords: ['buscar', 'filtro', 'búsqueda rápida', 'encontrar', 'solo gastos', 'solo ingresos', 'categoría', 'código', 'divisa', 'mes', 'todo el historial'],
    updated: UPDATED,
    related: ['movimientos/el-historial', 'movimientos/exportar-e-imprimir', 'registrar/categorias'],
    blocks: [
      p('Cuando el historial crece, los filtros te llevan directo al movimiento que buscas.'),

      h2('Los filtros'),
      table(
        ['Filtro', 'Opciones'],
        ['**Búsqueda Rápida**', 'Texto libre sobre notas y detalles: «ración», «leche», el nombre de un proveedor.'],
        ['**Flujo**', 'Todos, Solo Ingresos o Solo Gastos.'],
        ['**Categoría**', 'Cualquier categoría o una en particular.'],
        ['**Código**', 'Para filtrar por el código contable de la categoría.'],
        ['**Divisa**', 'Todas las divisas o solo una.'],
        ['**Período**', 'Un mes con las flechas de mes anterior y siguiente, «Mes actual» o «Todo el historial».'],
      ),
      tip('La búsqueda de texto puede recorrer **todo el historial**, no solo el mes que estás viendo: mientras lo hace, aparece «Buscando en todo el historial…».'),

      h2('Si no aparece nada'),
      p('Si la lista dice «El reporte está vacío», prueba quitar algún filtro o cambiar de mes. Revisa también que estés en el **establecimiento** correcto y en la **divisa** correcta.'),
    ],
  },

  {
    slug: 'editar-y-eliminar',
    category: 'movimientos',
    title: 'Corregir o eliminar movimientos',
    summary: 'Abre un movimiento para editarlo, elimínalo con el borrado seguro o selecciona varios a la vez.',
    keywords: ['editar', 'corregir', 'modificar', 'eliminar', 'borrar', 'selección múltiple', 'seleccionar todo', 'deshacer', 'borrado seguro', 'error'],
    updated: UPDATED,
    related: ['movimientos/el-historial', 'equipo/actividad-del-equipo', 'balances/cerrar-el-ejercicio'],
    blocks: [
      p('Todo registro se puede corregir. Si tienes permiso de edición en el establecimiento, abres el movimiento, cambias lo que haga falta y guardas.'),

      h2('Editar un movimiento'),
      steps(
        'En **Movimientos**, toca la fila o la tarjeta del registro (en la computadora también puedes usar el menú de opciones del movimiento).',
        'Corrige monto, categoría, fecha, moneda, nota, proyecto o impuestos.',
        'Toca **Guardar Cambios**.',
      ),

      h2('Eliminar un movimiento'),
      p('Desde el detalle del movimiento usa la opción de eliminar y confirma. Ruralit usa un **borrado seguro**: el registro desaparece de tus listas y balances, pero el cambio queda asentado en el historial del establecimiento.'),

      h2('Eliminar varios a la vez'),
      steps(
        'Elige **Seleccionar múltiples**.',
        'Marca los registros, o usa **Seleccionar todo**.',
        'Toca **Eliminar Registros** y confirma.',
      ),
      p('Para salir sin borrar, usa **Salir de selección**.'),

      h2('Cuándo no se puede editar'),
      list(
        'Si tu rol es **Solo ver**, no aparecen las opciones de edición. Ver [Roles y permisos](/docs/equipo/roles-y-permisos).',
        'Si la fecha del movimiento cae en un **ejercicio contable cerrado**, hay que reabrirlo antes. Ver [Cerrar el ejercicio](/docs/balances/cerrar-el-ejercicio).',
      ),
      note('En un establecimiento compartido, el dueño y las personas autorizadas pueden ver quién hizo cada cambio y **revertirlo** desde la [actividad del equipo](/docs/equipo/actividad-del-equipo).'),
    ],
  },

  {
    slug: 'exportar-e-imprimir',
    category: 'movimientos',
    title: 'Exportar e imprimir movimientos',
    summary: 'Descarga la lista filtrada en CSV para tu planilla o imprímela en PDF.',
    keywords: ['exportar', 'csv', 'excel', 'planilla', 'imprimir', 'pdf', 'descargar', 'contador'],
    updated: UPDATED,
    related: ['movimientos/buscar-y-filtrar', 'reportes/generar-un-reporte'],
    blocks: [
      p('Los botones de exportación de **Movimientos** trabajan sobre lo que estás viendo: el período y los filtros activos. Primero filtra, después exporta.'),

      h2('CSV'),
      p('Descarga un archivo `.csv` que abres con Excel, Google Sheets o el programa de tu contador, con fecha, tipo, categoría, monto, moneda, notas y proyecto de cada registro.'),

      h2('Imprimir PDF'),
      p('**Imprimir PDF** arma una versión lista para imprimir o guardar como PDF desde el navegador.'),
      tip('La exportación de movimientos está incluida en todos los planes. Para informes más completos (balance, stock, proyectos o el informe integral del campo) usa [Reportes](/docs/reportes/tipos-de-reporte).'),
      note('Si la lista filtrada está vacía, el botón no exporta nada: ajusta los filtros primero.'),
    ],
  },
];
