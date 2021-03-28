import { useEffect, useState } from "react";

const useDebounce = (search, delay) => {
  const [debouncedValue, setDebouncedValue] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(search);
    }, delay);

    return () => clearTimeout(handler);
  }, [search, delay]);

  return debouncedValue;
};

export default useDebounce;
