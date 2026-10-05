import { flow, h2, list, node, note, p, path, steps, table, tip, warn } from '../blocks.js';

const UPDATED = '2026-10-05';

export const balancesArticles = [
  {
    slug: 'leer-el-balance',
    category: 'balances',
    title: 'Leer el balance de tu establecimiento',
    summary: 'Elegí el período, mirá el resultado neto y bajá hasta la categoría que lo explica.',
    keywords: ['balance', 'resultado', 'ganancia', 'pérdida', 'mensual', 'trimestral', 'anual', 'gráficos', 'categorías', 'comparar', 'período anterior', 'cuadros'],
    updated: UPDATED,
    related: ['balances/indicadores-de-rentabilidad', 'balances/ano-civil-o-ejercicio-agricola', 'balances/varias-monedas'],
    blocks: [
      p('**Balances** convierte tus movimientos en la marcha económica del establecimiento: cuánto entró, cuánto salió, cuánto quedó y de dónde viene cada número. No hay nada que cargar acá: todo sale de lo que registraste.'),

      h2('Elegí qué querés ver'),
      table(
        ['Vista', 'Qué muestra'],
        ['**Mensual**', 'Un mes, comparado con el mes anterior.'],
        ['**Trimestral**', 'Un trimestre, con la distribución de ingresos y gastos de esos tres meses.'],
        ['**Anual**', 'El año civil o el ejercicio agrícola completo, con la evolución mes a mes y el cierre del período.'],
      ),
      p('Con los selectores de período cambiás de mes, trimestre o año. Al entrar, Balances siempre abre en el período en curso.'),

      h2('De arriba hacia abajo'),
      steps(
        '**El resumen**: el resultado neto (ingresos menos gastos) y cuánto cambió respecto del período anterior.',
        '**Los indicadores**: margen, rentabilidad sobre costos y cobertura de egresos. Ver [Indicadores de rentabilidad](/docs/balances/indicadores-de-rentabilidad).',
        '**Los gráficos**: la evolución del período y la comparación entre meses o trimestres.',
        '**Las categorías**: qué categorías pesan más en ingresos y en gastos, con su porcentaje.',
      ),

      h2('Bajar al detalle de una categoría'),
      p('Tocá una categoría en las barras de distribución: se abre el detalle con todos los movimientos que la componen en el período. Desde ahí podés abrir cualquiera de ellos y corregirlo.'),

      h2('Stock en el balance'),
      p('Si llevás stock, el análisis del período incluye el **inventario productivo**: cómo cambiaron tus recursos entre el inicio y el final del período, además del dinero.'),

      h2('Impuestos'),
      p('Si tenés un perfil fiscal con IVA, Balances suma un panel con el **IVA débito, el IVA crédito** y la diferencia del período. Ver [Resumen de IVA](/docs/impuestos/resumen-de-iva).'),

      h2('El calendario del año'),
      p('En la vista anual, el calendario muestra cada día del año como un cuadradito, para ver de un vistazo en qué épocas hubo más movimiento.'),
      note('En los primeros días de un mes, los gráficos muestran «Recopilando datos…» hasta tener suficientes registros. Y si elegís un período que todavía no empezó, Balances te lo avisa en lugar de mostrar ceros.'),
    ],
  },

  {
    slug: 'indicadores-de-rentabilidad',
    category: 'balances',
    title: 'Indicadores de rentabilidad',
    summary: 'Qué miden el resultado neto, el margen neto de caja, la rentabilidad sobre costos, la cobertura de egresos y el riesgo de rentabilidad.',
    keywords: ['rentabilidad', 'margen', 'margen neto', 'retorno', 'cobertura', 'riesgo', 'indicadores', 'kpi', 'lectura económica', 'variabilidad'],
    updated: UPDATED,
    related: ['balances/leer-el-balance', 'proyectos/seguir-un-proyecto'],
    blocks: [
      p('Los indicadores clave resumen en pocos números si el período fue bueno o malo. Todos se calculan con la **caja**: lo que efectivamente entró y salió, en la moneda que estás viendo.'),

      h2('Los indicadores'),
      table(
        ['Indicador', 'Cómo se calcula', 'Cómo leerlo'],
        ['**Resultado neto**', 'Ingresos − gastos.', 'Positivo: el período dejó plata. Negativo: costó más de lo que entró.'],
        ['**Margen neto de caja**', 'Resultado neto ÷ ingresos.', 'De cada 100 que entraron, cuántos quedaron.'],
        ['**Rentabilidad sobre costos**', 'Resultado neto ÷ gastos.', 'Cuánto rindió cada peso o dólar gastado.'],
        ['**Cobertura de egresos**', 'Ingresos ÷ gastos.', 'Más de 1: los ingresos cubrieron los gastos.'],
        ['**Riesgo de rentabilidad**', 'Variación de los resultados entre meses.', 'Alto: resultados muy irregulares de un mes a otro.'],
      ),

      h2('La lectura económica'),
      p('Debajo de los indicadores, Ruralit explica **cómo se forma el resultado neto** y sugiere **qué hacer con esta lectura**: cargar movimientos que faltan, validar gastos o revisar la estructura de costos. Son orientaciones, no reemplazan el análisis de tu contador o asesor.'),
      tip('Los indicadores son tan buenos como tus registros. Si un mes parece raro, revisá en [Movimientos](/docs/movimientos/buscar-y-filtrar) que no falte nada ni haya un gasto duplicado.'),
    ],
  },

  {
    slug: 'ano-civil-o-ejercicio-agricola',
    category: 'balances',
    title: 'Año civil o ejercicio agrícola',
    summary: 'Elegí si el balance anual va de enero a diciembre o de julio a junio, y cómo cambian los trimestres.',
    keywords: ['ejercicio', 'ejercicio agrícola', 'zafra', 'campaña', 'año civil', 'julio a junio', 'período contable', 'trimestres', 'modo'],
    updated: UPDATED,
    related: ['balances/cerrar-el-ejercicio', 'primeros-pasos/configuracion-inicial'],
    blocks: [
      p('Cada establecimiento elige cómo agrupa su año contable. La elección afecta la vista anual, los trimestres y los cierres.'),

      h2('Las dos opciones'),
      table(
        ['', 'Año civil', 'Ejercicio agrícola'],
        ['**Va de**', 'Enero a diciembre', 'Julio a junio'],
        ['**Se nombra**', '2026', '2025/26'],
        ['**1.er trimestre**', 'Enero a marzo', 'Julio a setiembre'],
        ['**2.º trimestre**', 'Abril a junio', 'Octubre a diciembre'],
        ['**3.er trimestre**', 'Julio a setiembre', 'Enero a marzo'],
        ['**4.º trimestre**', 'Octubre a diciembre', 'Abril a junio'],
        ['**Conviene para**', 'Servicios y administración por calendario', 'Producción agropecuaria y lectura por zafra'],
      ),

      h2('Cambiarlo'),
      path('Ajustes', 'Este establecimiento', 'Período contable y archivo', 'Período contable'),
      p('El cambio aplica a todo el establecimiento y a todo el equipo. Tus movimientos no cambian: solo cambia cómo se agrupan.'),
      note('Si ya cerraste ejercicios con un modo, esos cierres quedan archivados tal como estaban.'),
    ],
  },

  {
    slug: 'varias-monedas',
    category: 'balances',
    title: 'Balances con varias monedas',
    summary: 'Por qué Ruralit muestra un balance por moneda y no los convierte a una sola.',
    keywords: ['moneda', 'dólares', 'pesos', 'convertir', 'consolidar', 'cuentas paralelas', 'divisa', 'tipo de cambio'],
    updated: UPDATED,
    related: ['registrar/otra-moneda', 'ajustes/monedas-y-cotizaciones'],
    blocks: [
      p('Si trabajás con pesos y dólares, Balances muestra **un balance por moneda**, como si fueran dos cuentas paralelas. Cambiás entre ellas con las pestañas de moneda.'),

      h2('Por qué no convierte'),
      p('Convertir todo a una sola moneda obliga a elegir un tipo de cambio, y ese número cambia todos los días. Un balance en pesos que incluye ventas en dólares convertidas a la cotización de hoy no refleja lo que realmente pasó. Por eso Ruralit suma cada moneda por separado y deja la conversión a tu criterio.'),

      h2('Dónde sí se consolida'),
      list(
        '**Proyectos** puede consolidar en la moneda base del proyecto, usando la cotización guardada en cada movimiento.',
        'Los **cierres de ejercicio** guardan los totales de cada moneda por separado.',
      ),
    ],
  },

  {
    slug: 'cerrar-el-ejercicio',
    category: 'balances',
    title: 'Cerrar el ejercicio y consultar el archivo contable',
    summary: 'El cierre guarda una foto inmutable del año y bloquea los cambios en ese período. Se puede reabrir con un motivo.',
    keywords: ['cierre', 'cerrar ejercicio', 'cerrar año', 'reabrir', 'archivo contable', 'ejercicio cerrado', 'bloqueado', 'snapshot', 'motivo'],
    updated: UPDATED,
    related: ['balances/ano-civil-o-ejercicio-agricola', 'reportes/tipos-de-reporte', 'movimientos/editar-y-eliminar'],
    blocks: [
      p('Cuando termina un año (civil o agrícola), podés **cerrarlo**. El cierre guarda una foto completa del período (totales por moneda, mes a mes, categorías, impuestos, proyectos e inventario) y desde ese momento nadie puede agregar, editar ni borrar movimientos con fechas dentro de ese período.'),
      flow(
        'El ciclo de un ejercicio.',
        node('chart', 'Abierto', 'Se registra con normalidad'),
        node('ruralit', 'Cerrado', 'Foto guardada; cambios bloqueados'),
        node('person', 'Reabierto', 'Con un motivo, para corregir'),
        node('ruralit', 'Cerrado otra vez', 'La foto se actualiza'),
      ),

      h2('Cerrar'),
      steps(
        'En **Balances**, elegí la vista **Anual** y el período a cerrar.',
        'En el panel de cierre del ejercicio, usá el botón para cerrar.',
        'Confirmá. El período queda **cerrado** y archivado.',
      ),
      list(
        'El botón se habilita en los **últimos 3 días** del período o cuando ya terminó.',
        'En **año civil**, si el año ya terminó y nadie lo cerró, Ruralit lo cierra automáticamente la primera vez que alguien con permiso de edición abre la vista anual.',
        'Necesitás permiso de edición en el establecimiento.',
      ),

      h2('Reabrir'),
      p('Si encontrás un error en un período cerrado, reabrilo desde el mismo panel. Ruralit te pide un **motivo**, que queda registrado. Corregí lo necesario y volvé a cerrar para actualizar la foto.'),
      warn('Mientras un período está cerrado, cualquier intento de registrar o modificar un movimiento con fecha en ese período se rechaza, también desde el registro rápido y las importaciones.'),

      h2('El archivo contable'),
      path('Ajustes', 'Este establecimiento', 'Período contable y archivo', 'Archivo contable'),
      p('Ahí consultás cada ejercicio cerrado: lectura rápida, resumen financiero, evolución del período, actividad mensual, composición por categorías, inventario físico del cierre y proyectos. Podés exportarlo, y con Ruralit Pro generar el reporte **Ejercicio archivado**.'),
      note('El archivo muestra lo que se guardó al cerrar. Si un cierre es muy antiguo y no muestra todos los datos, reabrilo y volvé a cerrarlo para regenerar la foto.'),
    ],
  },
];
