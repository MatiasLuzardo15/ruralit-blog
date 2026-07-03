import React, { useEffect, useState } from 'react';
import { MessageSquare, NotebookPen, Package, Tractor, Wheat } from 'lucide-react';

const CAPTIONS = [
  'Escribí o dictá un movimiento con palabras cotidianas. Ruralit reconoce el monto, la categoría y la moneda por vos.',
  'Cargá los gastos apenas ocurren y dejá que se clasifiquen automáticamente. Después los encontrás listos para balances y reportes.',
  'Registrá compras, producción, consumo o pérdidas de stock. Las existencias se recalculan sin mantener planillas paralelas.',
  'Trabajá con pesos y dólares dentro del mismo establecimiento. Cada movimiento conserva su moneda y alimenta el margen real.',
  'Asociá gastos e ingresos a proyectos e inversiones. Así seguís el capital invertido, lo recuperado y el punto de equilibrio.',
  'Compartí el establecimiento con familia, socios o encargados. Cada persona accede según su rol y cada cambio queda registrado.',
  'Revisá el historial por persona y tipo de movimiento. Cada acción conserva usuario, fecha y hora para mantener el control.',
  'Al abrir un cambio, ves exactamente qué valor se modificó. Desde el detalle también podés revertirlo o iniciar una consulta.',
  'Citá el registro dentro de una conversación. La otra persona recibe la consulta con todo el contexto, sin explicaciones aparte.',
  'Las respuestas quedan vinculadas al movimiento original. Podés volver al hilo cuando necesites revisar por qué se hizo un cambio.',
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
