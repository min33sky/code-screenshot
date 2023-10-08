import { Fonts, Themes, themes } from '@/lib/options';
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
  fontStyle: keyof Fonts;
  padding: number;
  setTitle: (title: string) => void;
  setCode: (code: string) => void;
  setLanguage: (language: string) => void;
  setTheme: (theme: keyof Themes) => void;
  setAutoDetectLanguage: (autoDetectLanguage: boolean) => void;
  setFontStyle: (fontStyle: keyof Fonts) => void;
}

const usePreferences = create(
  persist<StoreState>(
    (set) => ({
      code: '',
      title: '',
      theme: 'hyper',
      darkMode: false,
      showBackground: true,
      language: 'javascript',
      autoDetectLanguage: false,
      fontSize: 16,
      fontStyle: 'sourceCodePro',
      padding: 0,
      setTitle: (title: string) => set({ title }),
      setCode: (code: string) => set({ code }),
      setLanguage: (language: string) => set({ language }),
      setTheme: (theme: keyof Themes) => set({ theme }),
      setAutoDetectLanguage: (autoDetectLanguage: boolean) =>
        set({ autoDetectLanguage }),
      setFontStyle: (fontStyle: keyof Fonts) => set({ fontStyle }),
    }),
    {
      name: 'user-preferences',
    },
  ),
);

export default usePreferences;
