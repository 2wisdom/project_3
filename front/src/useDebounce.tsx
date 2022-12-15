import React from "react";
import { useEffect, useState } from "react";

function useDebounce(value: string, delay: number = 600) {
  const [debounceVal, setDebounceVal] = useState<string>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceVal(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debounceVal;
}

export default useDebounce;
