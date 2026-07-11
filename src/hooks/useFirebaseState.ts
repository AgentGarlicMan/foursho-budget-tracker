import { useState, useEffect, useCallback, useRef } from 'react';
import { ref, onValue, set } from 'firebase/database';
import { database } from '../firebase';
import { AppState } from '../types';
import { STORAGE_KEY } from '../constants';

const defaultState: AppState = {
  contributions: [],
  expenses: [],
};

function getLocalStorageState(): AppState | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as AppState;
    }
  } catch {
    // If parsing fails, return null
  }
  return null;
}

function saveToLocalStorage(state: AppState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Silently fail if localStorage is unavailable
  }
}

export function useFirebaseState() {
  const [state, setLocalState] = useState<AppState>(() => {
    return getLocalStorageState() || defaultState;
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const isWriting = useRef(false);

  useEffect(() => {
    const dbRef = ref(database, '/appState');

    const unsubscribe = onValue(
      dbRef,
      (snapshot) => {
        if (isWriting.current) {
          return;
        }
        const data = snapshot.val();
        if (data) {
          const appState: AppState = {
            contributions: data.contributions || [],
            expenses: data.expenses || [],
          };
          setLocalState(appState);
          saveToLocalStorage(appState);
        } else {
          // No data in Firebase, use localStorage fallback or default
          const fallback = getLocalStorageState() || defaultState;
          setLocalState(fallback);
        }
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error('Firebase read error:', err.message);
        setError(err.message);
        setLoading(false);
        // Fall back to localStorage
        const fallback = getLocalStorageState() || defaultState;
        setLocalState(fallback);
      }
    );

    return () => unsubscribe();
  }, []);

  const setState: React.Dispatch<React.SetStateAction<AppState>> = useCallback(
    (action) => {
      setLocalState((prev) => {
        const newState =
          typeof action === 'function' ? action(prev) : action;

        // Write to Firebase and localStorage
        isWriting.current = true;
        const dbRef = ref(database, '/appState');
        set(dbRef, newState)
          .catch((err) => {
            console.error('Firebase write error:', err.message);
            setError(err.message);
          })
          .finally(() => {
            isWriting.current = false;
          });

        saveToLocalStorage(newState);
        return newState;
      });
    },
    []
  );

  const resetState = useCallback(() => {
    isWriting.current = true;
    const dbRef = ref(database, '/appState');
    set(dbRef, defaultState)
      .catch((err) => {
        console.error('Firebase write error:', err.message);
        setError(err.message);
      })
      .finally(() => {
        isWriting.current = false;
      });

    setLocalState(defaultState);
    saveToLocalStorage(defaultState);
  }, []);

  return { state, setState, resetState, loading, error };
}
