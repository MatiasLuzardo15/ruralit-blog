import { useEffect, useState } from 'react';

/** La sección que se está leyendo: la última cuyo título ya pasó por debajo de la barra fija. */
export function useActiveSection(items) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? null);

  useEffect(() => {
    setActiveId(items[0]?.id ?? null);
    if (items.length === 0) return undefined;

    let frame = 0;
    const update = () => {
      frame = 0;
      let current = items[0].id;
      for (const item of items) {
        const element = document.getElementById(item.id);
        if (element && element.getBoundingClientRect().top <= 160) current = item.id;
      }
      setActiveId(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [items]);

  return activeId;
}
