// src/utils/themeHelper.ts

const THEME_KEY = 'theme';

// Function to apply the theme (light or dark) based on user's preference
export const applyTheme = () => {
  const root = window.document.documentElement;
  const savedTheme = localStorage.getItem(THEME_KEY);

  if (savedTheme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
};

// Function to toggle between light and dark mode
export const toggleTheme = () => {
  const root = window.document.documentElement;
  const currentTheme = localStorage.getItem(THEME_KEY);

  if (currentTheme === 'dark') {
    root.classList.remove('dark');
    localStorage.setItem(THEME_KEY, 'light');
  } else {
    root.classList.add('dark');
    localStorage.setItem(THEME_KEY, 'dark');
  }
};

// Function to set the theme explicitly (e.g., from user preference)
export const setTheme = (theme: 'light' | 'dark') => {
  const root = window.document.documentElement;

  if (theme === 'dark') {
    root.classList.add('dark');
    localStorage.setItem(THEME_KEY, 'dark');
  } else {
    root.classList.remove('dark');
    localStorage.setItem(THEME_KEY, 'light');
  }
};


export const isDarkMode = (): boolean => {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const isDarkMode = window.document.documentElement.classList.contains('dark');
  
    // If there's a saved theme in localStorage, return true if it's dark
    if (savedTheme === 'dark') {
      return true;
    }
  
    // Fallback to checking if the 'dark' class is present on the root element
    return isDarkMode;
  };


 
// Function to get the current theme ('light' or 'dark')
export const getTheme = (): 'light' | 'dark' => {
  const savedTheme = localStorage.getItem(THEME_KEY);
  const isDarkMode = window.document.documentElement.classList.contains('dark');

  // If there's a saved theme in localStorage, return it
  if (savedTheme) {
    return savedTheme as 'light' | 'dark';
  }

  // Fallback to checking if the dark class is present on the root element
  return isDarkMode ? 'dark' : 'light';
};

// Other functions (applyTheme, toggleTheme, setTheme)...
