/**
 * File: src/contexts/ThemeContext.tsx
 * 
 * Theme Context Provider - Global theme state management
 * Provides theme switching functionality across the entire application
 */

'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

// Theme context type definition
export interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

// Create the theme context
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Custom hook to use theme context with error checking
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// Theme provider component
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  // Apply theme class to body element
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
} 