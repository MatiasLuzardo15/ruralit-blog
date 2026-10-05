import { h2, list, note, p, steps, table, tip, warn } from '../blocks.js';

const UPDATED = '2026-10-05';

export const importarArticles = [
  {
    slug: 'importar-desde-excel',
    category: 'importar',
    title: 'Importar movimientos o stock desde Excel o CSV',
    summary: 'Subí una planilla, elegí la hoja y el destino, asociá las columnas, revisá los errores e importá en segundo plano.',
    keywords: ['excel', 'csv', 'planilla', 'xlsx', 'xls', 'importar', 'cargar muchos', 'migrar', 'mapeo', 'columnas', 'hoja de cálculo', 'google sheets'],
    updated: UPDATED,
    related: ['importar/preparar-tu-planilla', 'importar/factura-pdf', 'planes/gratis-pro-y-equipos'],
    blocks: [
      p('Si ya llevabas tus números en una planilla, no hace falta tipearlos de nuevo. El importador lee archivos **.xlsx, .xls y .csv** y carga muchas filas de una vez, a **Movimientos**, a **Stock** o a los dos.'),

      h2('Dónde está'),
      list(
        '**En la computadora**: el botón **Importar** de Inicio → **Importar Excel**.',
        '**En el celular**: el botón **+** junto al cuadro de registro → **Importar Excel**.',
      ),

      h2('Los seis pasos'),
      steps(
        '**Archivo**: arrastrá la planilla o elegila desde tu dispositivo.',
        '**Hojas**: si el archivo tiene varias hojas, elegí la que querés importar.',
        '**Destino**: Movimientos financieros (ingresos y gastos), Inventario y Stock (entradas y salidas) o Ambos. Revisá la vista previa de la planilla.',
        '**Mapeo**: asociá cada campo de Ruralit con una columna de tu planilla. Ruralit reconoce las columnas automáticamente cuando puede; vos confirmás o corregís.',
        '**Revisión**: Ruralit valida cada fila y te muestra las filas listas, las advertencias y los errores antes de importar.',
        '**Resultado**: la importación corre en segundo plano y un aviso flotante muestra el progreso hasta «Importación lista».',
      ),

      h2('Mientras importa'),
      p('Podés seguir usando Ruralit: el aviso de progreso queda flotando en la pantalla y se puede mover. Desde ahí también podés pausar la importación.'),
      warn('No cierres ni recargues la pestaña hasta que termine. La importación vive en esa pestaña abierta: si la cerrás, se detiene y las filas que faltaban no se cargan.'),

      h2('Cuántas planillas por día'),
      p('En el plan **Gratis** podés iniciar hasta **3 importaciones de Excel por día**. En Pro y Equipos no hay límite diario. El cupo se descuenta recién cuando confirmás la importación, no al abrir el archivo.'),
      note('Tu planilla se lee en tu dispositivo: el archivo no se sube a ningún servidor, solo se guardan las filas que importás.'),
    ],
  },

  {
    slug: 'preparar-tu-planilla',
    category: 'importar',
    title: 'Cómo preparar tu planilla para importar',
    summary: 'Qué columnas necesita cada destino y cómo evitar los errores más comunes.',
    keywords: ['formato', 'columnas', 'campos requeridos', 'fecha', 'monto', 'importe', 'errores de importación', 'plantilla', 'encabezados'],
    updated: UPDATED,
    related: ['importar/importar-desde-excel', 'ayuda/la-importacion-tiene-errores'],
    blocks: [
      p('No hace falta una plantilla especial: Ruralit se adapta a tu planilla con el paso de mapeo. Alcanza con que tenga **una fila de encabezados** y **una fila por registro**.'),

      h2('Para movimientos'),
      table(
        ['Campo de Ruralit', '¿Obligatorio?', 'Ejemplo'],
        ['Fecha', 'Sí', '15/03/2026'],
        ['Monto / Importe', 'Sí', '12500'],
        ['Categoría', 'No', 'Combustible'],
        ['Tipo (Ingreso/Gasto)', 'No', 'Gasto'],
        ['Moneda', 'No', 'USD'],
        ['Detalle / Nota', 'No', 'Gasoil cosecha'],
        ['Proyecto / Lote', 'No', 'Invernada 2026'],
      ),

      h2('Para stock'),
      table(
        ['Campo de Ruralit', '¿Obligatorio?', 'Ejemplo'],
        ['Nombre Recurso', 'Sí', 'Terneros'],
        ['Cantidad', 'Sí', '40'],
        ['Dirección (Entrada/Salida)', 'Sí', 'Salida'],
        ['Fecha', 'Sí', '15/03/2026'],
        ['Tipo Recurso', 'No', 'Ganado'],
        ['Unidad de Medida', 'No', 'cabezas'],
        ['Tipo de Movimiento', 'No', 'Venta'],
        ['Detalle / Nota', 'No', 'Remate feria'],
        ['Proyecto / Lote', 'No', 'Invernada 2026'],
      ),

      h2('Para evitar errores'),
      list(
        'Una sola fila de encabezados, sin títulos ni celdas combinadas arriba.',
        'Fechas reales en la columna de fecha, no texto como «marzo».',
        'Montos y cantidades como números, sin texto en la misma celda.',
        'Sin filas de totales al final: Ruralit las leería como un registro más.',
      ),
      tip('Si la planilla tiene varias hojas (una por año, por ejemplo), importalas de a una.'),
    ],
  },

  {
    slug: 'factura-pdf',
    category: 'importar',
    title: 'Registrar una factura o ticket en PDF',
    summary: 'Subí el PDF de un comprobante y Ruralit detecta fecha, importe, moneda, proveedor y categoría para que confirmes.',
    keywords: ['factura', 'ticket', 'pdf', 'comprobante', 'boleta', 'leer factura', 'proveedor', 'escanear', 'ocr'],
    updated: UPDATED,
    related: ['importar/importar-desde-excel', 'registrar/carga-detallada'],
    blocks: [
      p('Cuando un proveedor te manda la factura en PDF, podés registrarla sin copiar los datos a mano. Cada PDF genera **un** movimiento.'),

      h2('Cómo se hace'),
      steps(
        'Abrí **Factura PDF**: desde **Importar** en Inicio (computadora) o desde el botón **+** (celular).',
        'Arrastrá el PDF o elegilo. Ruralit extrae el texto y detecta importes, fecha y proveedor.',
        'Revisá lo detectado: **Fecha de Emisión**, **Importe Total**, moneda, **Proveedor / Concepto**, **Tipo de Registro** y **Categoría Asociada** (con una categoría sugerida).',
        'Si la compra también suma stock, activá **Registrar también impacto en Inventario / Stock** y completá recurso y cantidad.',
        'Tocá **Confirmar y Guardar**.',
      ),

      h2('Qué PDFs funcionan'),
      list(
        'PDFs **legibles**, con texto seleccionable: los que generan los sistemas de facturación.',
        'Una factura o un ticket por archivo.',
      ),
      note('Una foto o un escaneo guardado como PDF no tiene texto que leer. En ese caso, registrá la factura con el [registro rápido](/docs/registrar/registro-rapido) o la [carga detallada](/docs/registrar/carga-detallada).'),
      tip('El PDF se analiza en tu dispositivo y no consume el cupo diario de importaciones de Excel.'),
    ],
  },
];
