import { useState, useEffect } from 'react';


function useDebounce(query, delay) {
  const [debouncedValue, setDebouncedValue] = useState(query);

  useEffect(
    () => {
      const debounceHandler = setTimeout(() => {
        setDebouncedValue(query);
      }, delay);
      return () => {
        clearTimeout(debounceHandler);
      };
    },
    [query] 
  );

  return debouncedValue;
}

export default useDebounce;