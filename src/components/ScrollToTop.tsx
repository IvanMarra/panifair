import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Garante scroll no topo após navegação client-side (ex.: links do rodapé).
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
