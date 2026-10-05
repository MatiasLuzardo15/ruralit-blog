import { h2, list, note, p, path, steps, table, tip, warn } from '../blocks.js';

const UPDATED = '2026-10-05';

export const impuestosArticles = [
  {
    slug: 'perfil-fiscal',
    category: 'impuestos',
    title: 'Configurar tu perfil fiscal',
    summary: 'Elegí el régimen (IMEBA o IRAE), la situación frente al IVA y la actividad, y Ruralit carga las reglas recomendadas.',
    keywords: ['impuestos', 'perfil fiscal', 'régimen', 'imeba', 'irae', 'iva', 'mevir', 'dgi', 'contribuyente', 'exento', 'mixto', 'sistema impositivo', 'administración fiscal'],
    updated: UPDATED,
    related: ['impuestos/impuestos-en-cada-registro', 'impuestos/reglas-impositivas', 'impuestos/resumen-de-iva'],
    blocks: [
      p('Ruralit puede estimar los impuestos de cada venta y el IVA de cada compra. Para eso necesita saber cómo tributa tu establecimiento: ese es el **perfil fiscal**. Las tasas de referencia son las de Uruguay.'),
      path('Ajustes', 'Este establecimiento', 'Sistema Impositivo'),

      h2('Los datos del perfil'),
      table(
        ['Dato', 'Opciones'],
        ['**Régimen tributario**', 'IMEBA o IRAE.'],
        ['**Situación frente al IVA**', 'Exento, contribuyente o mixto. Solo aplica a IRAE.'],
        ['**Actividad principal**', 'Ganadería, lechería, agricultura, servicios o mixto.'],
      ),

      h2('IMEBA o IRAE'),
      list(
        '**IMEBA**: régimen simplificado agropecuario. No liquida IVA. Ruralit calcula las retenciones de IMEBA y el aporte a MEVIR sobre las ventas de los productos que correspondan.',
        '**IRAE**: renta de actividades económicas. Si no sos exento de IVA, Ruralit calcula el **IVA débito** en las ventas y el **IVA crédito** en las compras.',
      ),

      h2('Guardar y activar'),
      steps(
        'Elegí régimen, situación frente al IVA y actividad.',
        'Guardá. Ruralit carga las **reglas recomendadas** para ese perfil.',
        'Con el interruptor de estado del sistema activás o desactivás los cálculos impositivos en el establecimiento.',
      ),
      p('Si cambiás el perfil más adelante, Ruralit actualiza las reglas recomendadas. Las excepciones que hayas creado se administran en el modo avanzado.'),
      warn('Los cálculos de Ruralit son **estimativos** y sirven para ordenarte. La liquidación formal siempre tiene que validarla un profesional contable.'),
    ],
  },

  {
    slug: 'impuestos-en-cada-registro',
    category: 'impuestos',
    title: 'Impuestos e IVA en cada registro',
    summary: 'Aplicá impuestos a una venta, sumá el IVA crédito a una compra y entendé el gasto automático en la categoría Impuestos.',
    keywords: ['aplicar impuestos', 'venta', 'iva débito', 'iva crédito', 'iva incluido', 'retención', 'desglose impositivo', 'categoría impuestos', 'gasto automático'],
    updated: UPDATED,
    related: ['impuestos/perfil-fiscal', 'registrar/carga-detallada', 'impuestos/resumen-de-iva'],
    blocks: [
      p('Con el perfil fiscal configurado, la [carga detallada](/docs/registrar/carga-detallada) muestra un **desglose impositivo**. Los impuestos son opcionales en cada registro: no se aplican solos.'),

      h2('En una venta'),
      steps(
        'Registrá el ingreso con su monto y categoría.',
        'Activá la opción para aplicar impuestos a esta venta.',
        'Revisá el desglose: impuestos que corresponden según tus reglas (IMEBA, MEVIR, IVA débito) y el **total a descontar**.',
        'Confirmá el registro.',
      ),
      p('Al guardar, Ruralit registra el **ingreso bruto** y crea automáticamente un **gasto en la categoría Impuestos** por el total calculado. Así el balance muestra lo que realmente te queda.'),

      h2('En una compra'),
      steps(
        'Registrá el gasto.',
        'Activá **IVA crédito** si la compra tiene IVA deducible.',
        'Indicá si el monto que escribiste ya **incluye el IVA** o si hay que sumarlo.',
      ),
      p('El IVA queda guardado en el movimiento y suma al crédito fiscal del período.'),

      h2('Dónde se ve'),
      list(
        'En **Movimientos**, los registros con IVA llevan una marca de débito o crédito.',
        'En **Balances**, el panel fiscal resume el IVA del período.',
      ),
      note('Si el formulario dice «Sin perfil fiscal» o «Sin reglas impositivas activas para esta categoría», revisá tu [perfil fiscal](/docs/impuestos/perfil-fiscal) o las [reglas](/docs/impuestos/reglas-impositivas).'),
    ],
  },

  {
    slug: 'reglas-impositivas',
    category: 'impuestos',
    title: 'Reglas impositivas y excepciones',
    summary: 'Qué son las reglas automáticas, cuándo conviene crear una excepción y cómo usar el modo avanzado.',
    keywords: ['reglas', 'tasa', 'alícuota', 'excepción', 'modo avanzado', 'vigencia', 'producto', 'plantilla', 'configuración avanzada'],
    updated: UPDATED,
    related: ['impuestos/perfil-fiscal', 'impuestos/impuestos-en-cada-registro'],
    blocks: [
      p('Una **regla impositiva** dice qué impuesto aplica, con qué tasa, a qué producto (ganado, leche, granos, lana, cueros, lácteos, servicios o general), a qué operación (venta, compra) y desde qué fecha. Las reglas tienen **vigencia**: si una tasa cambia, se agrega una regla nueva sin perder el historial.'),

      h2('Reglas automáticas'),
      p('Al guardar el perfil fiscal, Ruralit carga las reglas recomendadas para tu régimen y tu actividad. Para la mayoría de los establecimientos alcanza con estas.'),

      h2('Excepciones'),
      p('Si tu caso tiene algo particular, entrá al **modo avanzado** (en «Excepciones y reglas personalizadas») para crear, desactivar o eliminar reglas.'),
      tip('Usá el modo avanzado solo para excepciones. Si cambiás el perfil, las reglas recomendadas se actualizan solas.'),
    ],
  },

  {
    slug: 'resumen-de-iva',
    category: 'impuestos',
    title: 'Resumen de IVA del período',
    summary: 'El IVA débito, el IVA crédito y la diferencia de cada mes, en Ajustes y en Balances.',
    keywords: ['iva', 'resumen', 'débito', 'crédito', 'saldo', 'mes', 'período', 'liquidación', 'panel fiscal'],
    updated: UPDATED,
    related: ['impuestos/impuestos-en-cada-registro', 'balances/leer-el-balance'],
    blocks: [
      p('Si tributás IRAE y no sos exento de IVA, Ruralit lleva la cuenta del IVA de cada período.'),
      h2('Dónde verlo'),
      list(
        '**Ajustes › Sistema Impositivo**: el bloque **IVA del Período** muestra débito, crédito y diferencia del mes actual.',
        '**Balances**: el panel fiscal muestra lo mismo para el período y la moneda que estés viendo.',
      ),
      h2('Cómo se calcula'),
      table(
        ['Concepto', 'Sale de'],
        ['**IVA débito**', 'Las ventas registradas con impuestos aplicados.'],
        ['**IVA crédito**', 'Las compras registradas con IVA crédito.'],
        ['**Diferencia**', 'Débito − crédito.'],
      ),
      note('Otros tributos como IMEBA o MEVIR se muestran aparte: no generan IVA.'),
    ],
  },
];
