import { useEffect, useState } from 'react';

const THEMES = ['system', 'light', 'dark'];

export default function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      const savedTheme = window.localStorage.getItem('portfolio-theme');
      return THEMES.includes(savedTheme) ? savedTheme : 'system';
    } catch {
      return 'system';
    }
  });

  useEffect(() => {
    const preference = window.matchMedia('(prefers-color-scheme: dark)');
    const applyTheme = () => {
      document.documentElement.classList.toggle('dark', theme === 'dark' || (theme === 'system' && preference.matches));
    };
    applyTheme();
    try {
      window.localStorage.setItem('portfolio-theme', theme);
    } catch {
      // Keep theme selection usable when browser storage is unavailable.
    }
    if (theme !== 'system') return;
    preference.addEventListener('change', applyTheme);
    return () => preference.removeEventListener('change', applyTheme);
  }, [theme]);

  return { theme, setTheme };
}
