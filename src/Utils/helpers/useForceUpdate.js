import { useState, useCallback } from 'react';

export function useForceUpdate() {
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  return forceUpdate;
}
