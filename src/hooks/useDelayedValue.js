import { useEffect, useState } from "react";

export default function useDelayedValue(value, delay = 500) {
  const [delayedValue, setDelayedValue] = useState(value);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDelayedValue(value);
    }, delay);
    return () => clearTimeout(timeoutId);
  }, [value, delay])
  return delayedValue;
}
