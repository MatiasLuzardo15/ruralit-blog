import React, { useEffect, useState } from 'react';
import { Link } from '../router.jsx';

/** «En esta página»: marca la sección que se está leyendo. */
export default function DocsToc({ items }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? null);

  useEffect(() => {
    setActiveId(items[0]?.id ?? null);
    if (items.length === 0) return undefined;

    let frame = 0;
    const update = () => {
      frame = 0;
      // La sección activa es la última cuyo título ya pasó por debajo de la barra fija.
      let current = items[0].id;
      for (const item of items) {
        const element = document.getElementById(item.id);
        if (element && element.getBoundingClientRect().top <= 150) current = item.id;
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

  if (items.length < 2) return null;

  return (
    <nav aria-label="En esta página" className="dx-toc">
      <p className="dx-eyebrow">En esta página</p>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <Link
              href={`#${item.id}`}
              aria-current={item.id === activeId ? 'location' : undefined}
              className={item.id === activeId ? 'is-active' : undefined}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
