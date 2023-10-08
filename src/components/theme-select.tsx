import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Themes, themes } from '@/lib/options';
import usePreferences from '@/hooks/usePreferences';

export default function ThemeSelect() {
  const { theme, setTheme } = usePreferences();

  return (
    <div>
      <label className="block mb-2 text-xs font-medium text-neutral-400">
        Theme
      </label>
      <Select
        value={theme}
        onValueChange={(theme: keyof Themes) => setTheme(theme as keyof Themes)}
      >
        <SelectTrigger className="w-32 border-slate-500">
          <SelectValue placeholder="Select Theme" />
        </SelectTrigger>
        <SelectContent className="dark">
          {Object.entries(themes).map(([name, theme]) => (
            <SelectItem key={name} value={name}>
              <div className="flex gap-2 items-center">
                <div className={cn('h-4 w-4 rounded-full', theme.background)} />
                <span className="capitalize">{name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
