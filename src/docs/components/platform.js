export const isApplePlatform = () =>
  typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);

/** Atajo del buscador tal como lo escribe el teclado de quien lee. */
export const shortcutLabel = () => (isApplePlatform() ? '⌘ K' : 'Ctrl K');
