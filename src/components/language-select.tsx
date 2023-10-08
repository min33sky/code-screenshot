import usePreferences from '@/hooks/usePreferences';
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { languages } from '@/lib/options';
import { MagicWandIcon } from '@radix-ui/react-icons';

export default function LanguageSelect() {
  const { language, autoDetectLanguage, setLanguage, setAutoDetectLanguage } =
    usePreferences();

  const handleChange = (language: any) => {
    if (language === 'auto-detect') {
      setAutoDetectLanguage(true);
      setLanguage('plaintext');
    } else {
      setAutoDetectLanguage(false);
      setLanguage(language);
    }
  };
  return (
    <div>
      <label className="block mb-2 text-xs font-medium text-neutral-400">
        Language
      </label>
      <Select value={language} onValueChange={handleChange}>
        <SelectTrigger className="w-32 border-slate-500">
          {autoDetectLanguage && <MagicWandIcon className="mr-2" />}
          <SelectValue placeholder="Select Language" />
        </SelectTrigger>
        <SelectContent className="dark max-h-[500px]">
          <SelectItem value="auto-detect">Auto Detect</SelectItem>
          {Object.entries(languages).map(([lang, name]) => (
            <SelectItem key={lang} value={lang}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
