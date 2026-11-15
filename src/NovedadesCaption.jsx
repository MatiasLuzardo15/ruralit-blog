import React, { useEffect, useState } from 'react';
import { MessageSquare, NotebookPen, Package, Tractor, Wheat } from 'lucide-react';

const CAPTIONS = [
  'Escribe o dicta un movimiento con palabras cotidianas. Ruralit reconoce el monto, la categoría y la moneda, y te muestra la vista previa.',
  'En Ruralit Pro, pregúntale a Ruli por tus números o pídele un registro. Te muestra la propuesta y la guarda solo si la confirmas.',
  'Carga los gastos apenas ocurren, cada uno con su categoría. Después los encuentras listos en Balances y Reportes.',
  'Registra compras, producción, consumo o pérdidas de stock. Las existencias se recalculan sin mantener planillas paralelas.',
  'Trabaja con varias monedas en el mismo establecimiento. Cada movimiento conserva su moneda y su cotización, y los totales no las mezclan.',
  'Asocia gastos e ingresos a proyectos. Así sigues cuánto invertiste, cuánto recuperaste y cuánto falta.',
  'Comparte el establecimiento con familia, socios o encargados. Cada persona accede según su rol y cada cambio queda registrado.',
  'Revisa el historial por persona y tipo de movimiento. Cada acción conserva usuario, fecha y hora para mantener el control.',
  'Al abrir un cambio, ves exactamente qué valor se modificó. Desde el detalle también puedes revertirlo o iniciar una consulta.',
  'Cita el registro dentro de una conversación. La otra persona recibe la consulta con todo el contexto, sin explicaciones aparte.',
  'Las respuestas quedan vinculadas al movimiento original. Puedes volver al hilo cuando necesites revisar por qué se hizo un cambio.',
];

const ICONS = [Tractor, Package, Wheat, NotebookPen, MessageSquare];

const NovedadesCaption = () => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const EraserIcon = ICONS[index % ICONS.length];

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let swapTimer;
    const interval = window.setInterval(() => {
      setVisible(false);
      swapTimer = window.setTimeout(() => {
        setIndex((current) => (current + 1) % CAPTIONS.length);
        setVisible(true);
      }, 820);
    }, 6200);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(swapTimer);
    };
  }, []);

  return (
    <span className="rha-live-caption">
      <span className="rha-live-caption-mark" aria-hidden="true" />
      <span className={'rha-live-caption-text ' + (visible ? 'visible' : 'hidden')}>{CAPTIONS[index]}</span>
      <span className={'rha-caption-eraser' + (!visible ? ' active' : '')} aria-hidden="true"><EraserIcon /></span>
    </span>
  );
};

export default NovedadesCaption;
