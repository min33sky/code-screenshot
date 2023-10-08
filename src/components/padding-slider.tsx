import React from 'react';
import { Slider } from './ui/slider';
import usePreferences from '@/hooks/usePreferences';

export default function PaddingSlider() {
  const { padding, setPadding } = usePreferences();

  return (
    <div>
      <label className="block mb-2 text-xs font-medium text-neutral-400">
        Padding
      </label>
      <Slider
        className="w-44 my-5 bg-slate-500"
        value={[padding]}
        onValueChange={([padding]) => setPadding(padding)}
        max={128}
        step={8}
      />
    </div>
  );
}
