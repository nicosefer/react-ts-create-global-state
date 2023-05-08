import { useState, useEffect } from 'react';

export default function createGlobalState<T>(
  initialState: T
): () => [T, (newState: T) => void] {
  let scopedState = initialState;
  let scopedSeters = [];

  return function useGlobalState() {
    const [, setState] = useState<T | null>(scopedState);

    useEffect(() => {
      scopedSeters.push(setState);

      // remove seter on unmount
      return () => {
        scopedSeters = scopedSeters.filter((seter) => seter !== setState);
      };
    }, []);

    return [
      scopedState,
      (newState: T) => {
        scopedState = newState;
        scopedSeters.forEach((seter) => {
          seter(scopedState);
        });
      },
    ];
  };
}
