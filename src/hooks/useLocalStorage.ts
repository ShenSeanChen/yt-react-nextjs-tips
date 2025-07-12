/**
 * File: src/hooks/useLocalStorage.ts
 * 
 * Custom hook for localStorage management
 * Provides persistent state that survives page refreshes
 */

import { useState, useCallback, useEffect } from 'react';

/**
 * Custom hook to manage localStorage state
 * @param key - localStorage key
 * @param initialValue - default value if no stored value exists
 * @returns [storedValue, setValue] - tuple similar to useState
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // 🐍 Python: Like creating a reusable function
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.error('Error reading from localStorage:', error);
    }
  }, [key]);

  const setValue = useCallback((value: T) => {
    try {
      setStoredValue(value);
      if (mounted && typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [key, mounted]);

  return [storedValue, setValue];
} 