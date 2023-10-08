import usePreferences from '@/hooks/usePreferences';
import React from 'react';
import { Input } from './ui/input';

export default function FontSizeInput() {
  const { fontSize, setFontSize } = usePreferences();

  return (
    <div>
      <label className="block mb-2 text-xs font-medium text-neutral-400">
        Font Size
      </label>
      <Input
        type="number"
        className="!dark w-16 bg-transparent"
        min={6}
        value={fontSize}
        onChange={(e) => setFontSize(Number(e.target.value) || 18)}
      />
    </div>
  );
}
