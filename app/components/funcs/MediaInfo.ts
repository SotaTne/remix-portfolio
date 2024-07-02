//in this file, basically you must write as functional programming

export const IsDarkMode =
  typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? true
    : false;
