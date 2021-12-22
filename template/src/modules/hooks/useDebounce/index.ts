/**
 *
 * Debounce Hook
 *
 */

import { useState, useEffect } from 'react';

function useDebounce(value?: any, delay = 1000): any {
  const [debouncedValue, setDebouncedValue] = useState<any>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
