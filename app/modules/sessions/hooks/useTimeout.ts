import { useEffect, useState } from 'react';

function useTimeout(delay: number) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsReady(true);
    }, delay);

    return () => clearTimeout(timeoutId); // Dọn dẹp timeout khi component unmount
  }, [delay]);

  return isReady;
}

export default useTimeout;
