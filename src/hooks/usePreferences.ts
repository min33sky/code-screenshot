import { Themes, themes } from '@/lib/options';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface StoreState {
  code: string;
  title: string;
  theme: keyof Themes;
  darkMode: boolean;
  showBackground: boolean;
  language: string;
  autoDetectLanguage: boolean;
  fontSize: number;
  fontStyle: string;
  padding: number;
}

const usePreferences = create(
  persist<StoreState>(
    (set) => ({
      code: '',
      title: '',
      theme: 'coral',
      darkMode: false,
      showBackground: false,
      language: 'javascript',
      autoDetectLanguage: false,
      fontSize: 16,
      fontStyle: 'normal',
      padding: 0,
    }),
    {
      name: 'user-preferences',
    },
  ),
);

export default usePreferences;
