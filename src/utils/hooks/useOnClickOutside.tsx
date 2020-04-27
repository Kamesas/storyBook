import { useEffect, RefObject, useCallback } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useOnClickOutside = <T extends Element | any>(ref: RefObject<T>, handler: (arg: boolean) => void) => {
  const listener = useCallback((event: any) => {
    // Do nothing if clicking ref's element or descendent elements
    if (!ref.current || ref.current.contains(event.target)) {
      return;
    }

    handler(event);
  }, [handler, ref]);

  useEffect(
    () => {
      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);

      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    },
    [ref, handler, listener],
  );
};

export default useOnClickOutside;
