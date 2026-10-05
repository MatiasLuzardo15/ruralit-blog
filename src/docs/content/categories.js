/**
 * El orden de esta lista es el orden de la barra lateral y de la portada.
 * `icon` es el nombre de un icono de lucide-react (ver `DocIcon.jsx`): el
 * contenido queda como datos puros y también lo puede leer el script del sitemap.
 */
export const DOC_CATEGORIES = [
  {
    id: 'primeros-pasos',
    title: 'Primeros pasos',
    description: 'Qué es Ruralit, cómo crear tu cuenta, configurar tu campo y moverte por la app.',
    icon: 'Footprints',
  },
  {
    id: 'registrar',
    title: 'Registrar movimientos',
    description: 'El registro rápido con texto o voz, la carga detallada, categorías y monedas.',
    icon: 'Zap',
  },
  {
    id: 'movimientos',
    title: 'Movimientos',
    description: 'El historial de ingresos y gastos: buscar, filtrar, corregir, eliminar y exportar.',
    icon: 'BookOpen',
  },
  {
    id: 'stock',
    title: 'Stock e inventario',
    description: 'Animales, cultivos, insumos y maquinaria con su saldo, stock mínimo e historial.',
    icon: 'Package',
  },
  {
    id: 'balances',
    title: 'Balances',
    description: 'Resultados por mes, trimestre o año, rentabilidad, ejercicio agrícola y cierres.',
    icon: 'BarChart3',
  },
  {
    id: 'proyectos',
    title: 'Proyectos',
    description: 'Inversiones, actividades, metas de ahorro y activos, cada uno con su seguimiento.',
    icon: 'Folder',
  },
  {
    id: 'reportes',
    title: 'Reportes',
    description: 'Informes en PDF y CSV de movimientos, balance, stock, proyectos y ejercicios.',
    icon: 'FileText',
  },
  {
    id: 'importar',
    title: 'Importar datos',
    description: 'Planillas de Excel o CSV y facturas en PDF, sin tipear fila por fila.',
    icon: 'Upload',
  },
  {
    id: 'equipo',
    title: 'Equipo y colaboración',
    description: 'Invitaciones, roles, actividad del equipo, reversiones y chats cifrados.',
    icon: 'Users',
  },
  {
    id: 'impuestos',
    title: 'Impuestos',
    description: 'Perfil fiscal IMEBA o IRAE, IVA en cada registro y reglas impositivas.',
    icon: 'Receipt',
  },
  {
    id: 'ajustes',
    title: 'Cuenta y ajustes',
    description: 'Perfil, establecimientos, monedas, categorías, apariencia y notificaciones.',
    icon: 'UserCog',
  },
  {
    id: 'seguridad',
    title: 'Seguridad y privacidad',
    description: 'Verificación en dos pasos, PIN, pregunta de seguridad y qué pasa con tus datos.',
    icon: 'ShieldCheck',
  },
  {
    id: 'planes',
    title: 'Planes',
    description: 'Qué incluye Gratis, Ruralit Pro y Equipos, y cómo pedir la prueba gratuita.',
    icon: 'BadgeCheck',
  },
  {
    id: 'ayuda',
    title: 'Solución de problemas',
    description: 'Qué hacer si el dictado no responde, un registro no se guarda o falta un dato.',
    icon: 'LifeBuoy',
  },
];
