import { h2, list, note, p, steps, table, tip } from '../blocks.js';

const UPDATED = '2026-10-05';

export const reportesArticles = [
  {
    slug: 'tipos-de-reporte',
    category: 'reportes',
    title: 'Los tipos de reporte',
    summary: 'Movimientos, Balance, Stock y recursos, Proyecto, Informe integral y Ejercicio archivado: qué cuenta cada uno.',
    keywords: ['reporte', 'informe', 'informe integral', 'pdf', 'csv', 'ejercicio archivado', 'balance', 'stock', 'proyecto', 'contador', 'banco'],
    updated: UPDATED,
    related: ['reportes/generar-un-reporte', 'planes/gratis-pro-y-equipos'],
    blocks: [
      p('**Reportes** prepara información para compartir (con tu contador, el banco, un socio o la familia) sin alterar los datos originales. Elegís qué historia querés contar y Ruralit arma el archivo con el establecimiento y los filtros actuales.'),
      note('La sección Reportes está incluida en **Ruralit Pro** y Equipos. En Gratis no aparece en el menú, pero podés exportar e imprimir desde [Movimientos](/docs/movimientos/exportar-e-imprimir).'),

      h2('Los reportes'),
      table(
        ['Reporte', 'Qué muestra', 'Formatos'],
        ['**Movimientos**', 'El detalle de ingresos y gastos de un período.', 'PDF, CSV'],
        ['**Balance**', 'El resultado y la composición financiera del período.', 'PDF, CSV'],
        ['**Stock y recursos**', 'Existencias y movimientos físicos.', 'PDF, CSV'],
        ['**Proyecto**', 'El seguimiento financiero de un proyecto.', 'PDF'],
        ['**Informe integral**', 'Una visión completa del establecimiento: dinero, stock, proyectos e impuestos.', 'PDF, CSV'],
        ['**Ejercicio archivado**', 'Un cierre contable histórico, tal como quedó guardado.', 'PDF, CSV'],
      ),

      h2('Completos, siempre'),
      p('Un reporte de movimientos imprime **todos** los registros que entran en el alcance que elegiste (período, moneda, categoría, proyecto), sin recortes. Los gráficos y rankings pueden destacar lo principal, pero la tabla de detalle siempre está completa. Si Ruralit no puede comprobar que tiene todos los registros, prefiere no generar el archivo antes que entregarte uno incompleto.'),
    ],
  },

  {
    slug: 'generar-un-reporte',
    category: 'reportes',
    title: 'Generar y descargar un reporte',
    summary: 'Elegí el reporte, acotá período y contenido, activá las secciones opcionales, mirá la vista previa y descargá.',
    keywords: ['generar', 'descargar', 'exportar', 'período personalizado', 'filtros', 'vista previa', 'notas', 'análisis', 'pdf', 'csv'],
    updated: UPDATED,
    related: ['reportes/tipos-de-reporte', 'balances/cerrar-el-ejercicio'],
    blocks: [
      steps(
        '**Elegí el reporte** en la lista lateral (en el celular, en el selector de arriba). Los campos se adaptan al reporte elegido.',
        '**Acotá período y contenido**: período, tipo de movimiento, categoría, proyecto y moneda. Solo aparecen los campos que corresponden.',
        '**Elegí detalle y formato**: activá las secciones opcionales (notas, análisis) y elegí PDF o CSV.',
        'Revisá la **vista previa** con los números principales.',
        '**Descargá**. El botón final valida la configuración y prepara el archivo.',
      ),

      h2('Períodos'),
      list(
        '**Mensual**: un mes.',
        '**Trimestral**: un trimestre.',
        '**Anual**: un año.',
        '**Personalizado**: cualquier rango entre dos fechas.',
      ),
      tip('El CSV abre en Excel o Google Sheets; el PDF está pensado para imprimir o mandar por correo o WhatsApp.'),
      note('Generar un reporte queda registrado en la actividad del establecimiento como una exportación.'),
    ],
  },
];
