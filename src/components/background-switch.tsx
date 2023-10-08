import React from 'react';
import { Switch } from './ui/switch';
import usePreferences from '@/hooks/usePreferences';

export default function BackgroundSwitch() {
  const { showBackground, setShowBackground } = usePreferences();

  return (
    <div>
      <label className="block mb-2 text-xs font-medium text-neutral-400">
        Background
      </label>
      <Switch
        checked={showBackground}
        onCheckedChange={(checked) => setShowBackground(checked)}
        className="my-1.5"
      />
    </div>
  );
}
