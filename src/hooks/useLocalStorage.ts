import { useState, useEffect } from 'react';
import { AppState } from '../types';
import { STORAGE_KEY } from '../constants';

const defaultState: AppState = {
  contributions: [],
  expenses: [],
};

export function useLocalStorage() {
  const [state, setState] = useState<AppState>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored) as AppState;
      }
    } catch {
      // If parsing fails, use default
    }
    return defaultState;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const resetState = () => {
    setState(defaultState);
  };

  return { state, setState, resetState };
}
