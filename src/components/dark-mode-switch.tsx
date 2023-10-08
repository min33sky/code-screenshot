import React from 'react';
import { Switch } from './ui/switch';
import usePreferences from '@/hooks/usePreferences';

export default function DarkModeSwitch() {
  const { darkMode, setDarkmode } = usePreferences();

  return (
    <div>
      <label className="block mb-2 text-xs font-medium text-neutral-400">
        DarkMode
      </label>
      <Switch
        checked={darkMode}
        onCheckedChange={(checked) => setDarkmode(checked)}
        className="my-1.5"
      />
    </div>
  );
}
