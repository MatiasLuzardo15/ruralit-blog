import { h2, h3, list, note, p, phrase, steps, table, tip, warn } from '../blocks.js';

const UPDATED = '2026-10-05';

export const proyectosArticles = [
  {
    slug: 'que-es-un-proyecto',
    category: 'proyectos',
    title: 'Qué es un proyecto y qué tipo elegir',
    summary: 'Recuperar una inversión, seguir una actividad, crear una meta de ahorro o controlar un activo: cuatro formas de medir algo por separado.',
    keywords: ['proyecto', 'inversión', 'actividad', 'meta de ahorro', 'activo', 'mejora', 'tipos', 'modo', 'campaña', 'lote', 'zafra', 'recuperar'],
    updated: UPDATED,
    related: ['proyectos/crear-un-proyecto', 'proyectos/registrar-en-un-proyecto', 'proyectos/seguir-un-proyecto'],
    blocks: [
      p('Un **proyecto** separa un trabajo, una compra o un objetivo del resto del campo, para medirlo por su cuenta sin mezclarlo con la operación diaria. Agrupa los movimientos de dinero, los recursos de stock y las novedades que le pertenecen.'),

      h2('Los cuatro tipos'),
      table(
        ['Tipo', 'Para qué sirve', 'Ejemplos'],
        ['**Recuperar una inversión**', 'Controlar cuánto falta para recuperar una compra o un gasto importante.', 'Compra de un tractor, una reforma del tambo.'],
        ['**Seguir una actividad**', 'Medir ingresos, gastos y resultado de un lote, campaña o trabajo.', 'Invernada de novillos, la zafra de soja, un trabajo para terceros.'],
        ['**Crear una meta de ahorro**', 'Juntar capital hasta llegar a un objetivo.', 'Fondo de reserva, ahorro para maquinaria.'],
        ['**Controlar un activo o mejora**', 'Registrar costos, estado y evolución de un bien o mejora.', 'Una camioneta, un galpón, un equipo de riego.'],
      ),

      h2('Rubro y estado'),
      p('Cada proyecto tiene además un **rubro** (Ganadería, Agricultura, Maquinaria, Infraestructura, Servicios u Otro) y un **estado** que podés ir cambiando: en curso, pausado, finalizado y otros propios de cada tipo.'),

      h2('Cómo se relaciona con el resto'),
      list(
        'Los **movimientos** vinculados a un proyecto siguen apareciendo en Movimientos y en Balances, con una marca del proyecto.',
        'Los **recursos de stock** del proyecto aparecen en Stock dentro de «En proyectos».',
        'Las **novedades** (notas, problemas, mantenimientos) viven solo dentro del proyecto: documentan sin mover dinero ni stock.',
      ),
    ],
  },

  {
    slug: 'crear-un-proyecto',
    category: 'proyectos',
    title: 'Crear un proyecto',
    summary: 'Elegí el tipo, completá sus datos y, si corresponde, el capital inicial y el control productivo.',
    keywords: ['nuevo proyecto', 'crear', 'capital inicial', 'monto objetivo', 'presupuesto estimado', 'aporte sugerido', 'valor actual estimado', 'próxima revisión', 'control productivo', 'inversión inicial'],
    updated: UPDATED,
    related: ['proyectos/que-es-un-proyecto', 'proyectos/registrar-en-un-proyecto'],
    blocks: [
      steps(
        'En **Proyectos**, tocá el botón de nuevo proyecto.',
        'Elegí el tipo: activo o mejora, meta de ahorro, recuperar inversión o actividad.',
        'Completá el nombre, el rubro, la moneda y las fechas.',
        'Completá los datos propios del tipo (abajo).',
        'Guardá. El proyecto aparece en la lista y ya podés registrar en él.',
      ),

      h2('Los datos de cada tipo'),
      table(
        ['Tipo', 'Datos propios'],
        ['**Recuperar una inversión**', 'Capital inicial (lo que pusiste) y el objetivo de recuperación.'],
        ['**Seguir una actividad**', 'Presupuesto estimado y resultado esperado.'],
        ['**Meta de ahorro**', 'Monto objetivo, destino, frecuencia de aporte (semanal, quincenal, mensual, trimestral o cuando se pueda) y aporte sugerido.'],
        ['**Activo o mejora**', 'Tipo de activo, costo inicial, valor actual estimado y próxima revisión.'],
      ),

      h2('El capital inicial'),
      p('Si cargás un monto inicial, Ruralit crea automáticamente el **movimiento inicial** del proyecto: un gasto por la inversión o el costo inicial, o un aporte si es una meta de ahorro (el ahorro inicial).'),
      note('Ese movimiento inicial pertenece al proyecto y **no cuenta en el balance operativo** del campo ni aparece en la lista de Movimientos, para no inflar los gastos del mes en que hiciste la compra.'),

      h2('Control productivo'),
      p('Al crear el proyecto podés activar el **control productivo**: Ruralit crea un recurso de stock propio del proyecto con su cantidad inicial. Sirve para seguir animales, hectáreas o insumos del proyecto, por ejemplo las cabezas de una invernada.'),
    ],
  },

  {
    slug: 'registrar-en-un-proyecto',
    category: 'proyectos',
    title: 'Registrar gastos, ingresos y novedades en un proyecto',
    summary: 'Desde dentro del proyecto, una frase o el registro manual cargan dinero, stock o una nota, siempre vinculados al proyecto.',
    keywords: ['registro de proyecto', 'novedad', 'nota', 'observación', 'problema', 'mantenimiento', 'aporte', 'retiro', 'venta', 'gasto del proyecto', 'vincular'],
    updated: UPDATED,
    related: ['proyectos/seguir-un-proyecto', 'registrar/carga-detallada'],
    blocks: [
      p('Dentro de un proyecto, el botón de registrar abre el **Registro de proyecto**. Funciona como el registro rápido de Inicio, pero todo lo que guardás queda vinculado a ese proyecto.'),

      h2('Con una frase'),
      p('Escribí lo que pasó y Ruralit decide qué tipo de registro es: dinero, stock, las dos cosas o una novedad.'),
      phrase('Compré 20 terneros a 450 dólares', [
        ['Tipo', 'Gasto del proyecto'],
        ['Monto', 'USD 9.000'],
        ['Stock', '+20 cabezas · Terneros'],
      ]),
      phrase('Se rompió el bebedero del potrero 3', [
        ['Tipo', 'Novedad'],
      ], 'Si no hay dinero ni stock claro, queda preparado como novedad del proyecto.'),

      h2('Con el registro manual'),
      p('Elegí **Registro manual** y después el tipo de registro. Los tipos cambian según el proyecto: aportes y retiros en una meta, mantenimiento y arreglos en un activo, gastos, ingresos y novedades en una actividad.'),

      h3('Tipos de novedad'),
      list('Novedad', 'Observación', 'Evento', 'Problema', 'Mantenimiento', 'Otro'),
      p('Las novedades no mueven dinero ni stock: arman la historia del proyecto en su línea de tiempo.'),
      warn('No se puede registrar una venta de stock de un proyecto si ese recurso no tiene stock suficiente.'),

      h2('Vincular un movimiento existente'),
      p('Si ya registraste un gasto desde Inicio y te olvidaste de vincularlo, abrilo en **Movimientos** o desde el detalle de una categoría en **Balances** y elegí el proyecto en **Proyecto vinculado**.'),
    ],
  },

  {
    slug: 'seguir-un-proyecto',
    category: 'proyectos',
    title: 'Seguir y filtrar tus proyectos',
    summary: 'La tarjeta de cada proyecto, sus métricas, la línea de tiempo y los filtros por estado.',
    keywords: ['seguimiento', 'métricas', 'progreso', 'avance de la meta', 'línea de tiempo', 'filtro', 'activas', 'pausadas', 'finalizadas', 'resumen', 'consolidado'],
    updated: UPDATED,
    related: ['proyectos/finalizar-un-proyecto', 'proyectos/registrar-en-un-proyecto'],
    blocks: [
      h2('La lista de proyectos'),
      p('Arriba ves un **resumen consolidado** de todos los proyectos del establecimiento en una moneda base. Abajo, una tarjeta por proyecto con su estado y su número principal.'),
      p('Filtrá por **Todas**, **Activas**, **Pausadas** o **Finalizadas** para mantener la vista enfocada.'),

      h2('Dentro de un proyecto'),
      list(
        '**Estado financiero del proyecto**: el número que importa según el tipo (cuánto falta recuperar, el resultado de la actividad, el progreso de la meta o el costo acumulado del activo).',
        '**Métricas**: ingresos, gastos, aportes, presupuesto o valor actual, según corresponda.',
        '**Línea de tiempo**: todos los movimientos, cambios de stock y novedades, en orden.',
        '**Detalles**: los datos con los que creaste el proyecto, que podés editar.',
      ),
      table(
        ['Tipo', 'Lo que muestra primero'],
        ['Recuperar una inversión', 'Cuánto falta recuperar.'],
        ['Seguir una actividad', 'Ingresos menos gastos registrados en esta actividad.'],
        ['Meta de ahorro', 'El avance de la meta: aportes netos frente al monto objetivo.'],
        ['Activo o mejora', 'Costos, estado y evolución del bien.'],
      ),
      tip('Si un proyecto usa varias monedas, el resumen las consolida con la cotización guardada en cada movimiento.'),
    ],
  },

  {
    slug: 'finalizar-un-proyecto',
    category: 'proyectos',
    title: 'Finalizar un proyecto y su informe de cierre',
    summary: 'Cerrá el proyecto cuando termina y obtené un PDF con el rendimiento y el desglose de movimientos.',
    keywords: ['finalizar', 'cerrar proyecto', 'terminar', 'informe de cierre', 'pdf', 'reporte del proyecto', 'eliminar proyecto'],
    updated: UPDATED,
    related: ['proyectos/seguir-un-proyecto', 'reportes/tipos-de-reporte'],
    blocks: [
      h2('Finalizar'),
      steps(
        'Abrí el proyecto.',
        'Usá la opción para finalizarlo y confirmá.',
        'Ruralit calcula el resultado final y el proyecto pasa a **Finalizadas**.',
      ),
      p('Un proyecto finalizado conserva toda su historia y su vista de cierre, con el resultado y el **informe de cierre**.'),

      h2('El informe en PDF'),
      p('Desde el proyecto podés generar un PDF con el rendimiento, las métricas y el desglose de **todos** los movimientos del proyecto. Con Ruralit Pro también lo armás desde [Reportes](/docs/reportes/tipos-de-reporte), con notas y análisis.'),

      h2('Eliminar un proyecto'),
      p('Si eliminás un proyecto, sus **movimientos no se borran**: siguen en Movimientos y en Balances, y los reportes históricos los siguen mostrando.'),
      note('Finalizar es lo habitual cuando un proyecto terminó. Eliminar es para proyectos creados por error.'),
    ],
  },
];
