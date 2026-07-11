import { useState, useEffect, useCallback, useRef } from 'react';
import { ref, onValue, set } from 'firebase/database';
import { database } from '../firebase';
import { AppState } from '../types';
import { STORAGE_KEY } from '../constants';

const MIGRATION_FLAG = 'firebase-migrated';
const FIREBASE_TIMEOUT_MS = 10000;

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

function isEmptyState(data: unknown): boolean {
  if (!data) return true;
  const state = data as AppState;
  const hasContributions = Array.isArray(state.contributions) && state.contributions.length > 0;
  const hasExpenses = Array.isArray(state.expenses) && state.expenses.length > 0;
  return !hasContributions && !hasExpenses;
}

function hasMigrated(): boolean {
  try {
    return localStorage.getItem(MIGRATION_FLAG) === 'true';
  } catch {
    return false;
  }
}

function markMigrated(): void {
  try {
    localStorage.setItem(MIGRATION_FLAG, 'true');
  } catch {
    // Silently fail
  }
}

export function useFirebaseState() {
  const [state, setLocalState] = useState<AppState>(() => {
    return getLocalStorageState() || defaultState;
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const isWriting = useRef(false);
  const hasReceivedData = useRef(false);

  useEffect(() => {
    const dbRef = ref(database, '/appState');

    // Set up a timeout - if Firebase does not respond within ~10 seconds, show error
    const timeoutId = setTimeout(() => {
      if (!hasReceivedData.current) {
        setError('Firebase connection timed out. Using cached data.');
        setLoading(false);
        const fallback = getLocalStorageState() || defaultState;
        setLocalState(fallback);
      }
    }, FIREBASE_TIMEOUT_MS);

    const unsubscribe = onValue(
      dbRef,
      (snapshot) => {
        hasReceivedData.current = true;
        clearTimeout(timeoutId);

        if (isWriting.current) {
          return;
        }

        const data = snapshot.val();

        // Migration logic: if Firebase is empty but localStorage has data, migrate
        if (isEmptyState(data) && !hasMigrated()) {
          const localData = getLocalStorageState();
          if (localData && !isEmptyState(localData)) {
            // Push localStorage data to Firebase
            isWriting.current = true;
            set(dbRef, localData)
              .then(() => {
                markMigrated();
                setLocalState(localData);
                saveToLocalStorage(localData);
              })
              .catch((err) => {
                console.error('Migration failed:', err.message);
              })
              .finally(() => {
                isWriting.current = false;
              });
            setLoading(false);
            setError(null);
            return;
          }
        }

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
        hasReceivedData.current = true;
        clearTimeout(timeoutId);
        console.error('Firebase read error:', err.message);
        setError(err.message);
        setLoading(false);
        // Fall back to localStorage
        const fallback = getLocalStorageState() || defaultState;
        setLocalState(fallback);
      }
    );

    return () => {
      clearTimeout(timeoutId);
      unsubscribe();
    };
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
