'use client';

import usePreferences from '@/hooks/usePreferences';
import { fonts, themes } from '@/lib/options';
import { Resizable } from 're-resizable';
import React, { useEffect, useRef, useState } from 'react';
import WidthMeasurement from './with-measurement';
import { cn } from '@/lib/utils';
import CodeEditor from './code-editor';
import { ResetIcon } from '@radix-ui/react-icons';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import ThemeSelect from './theme-select';
import LanguageSelect from './language-select';
import FontSelect from './font-select';
import FontSizeInput from './font-size-input';
import PaddingSlider from './padding-slider';
import BackgroundSwitch from './background-switch';
import DarkModeSwitch from './dark-mode-switch';
import ExportOptions from './export-options';

import queryString from 'query-string';

export default function AppClient() {
  const {
    theme,
    padding,
    fontStyle,
    showBackground,
    setCode,
    setTheme,
    setLanguage,
    setFontSize,
    setFontStyle,
    setPadding,
    setAutoDetectLanguage,
    setDarkmode,
  } = usePreferences();
  const [width, setWidth] = useState<string | number>('auto');
  const [showWidth, setShowWidth] = useState(false);

  const [mounted, setMounted] = useState(false);

  const editorRef = useRef<React.ElementRef<'div'>>(null);

  useEffect(() => {
    const parsedUrl = queryString.parseUrl(window.location.href);
    const parsed = parsedUrl.query;
    // console.log('code: ', atob(parsed.code as string));
    if (parsed.code) {
      setCode(atob(parsed.code as string));
    }

    if (parsed.darkMode) {
      setDarkmode(parsed.darkMode === 'true');
    }

    if (parsed.fontSize) {
      setFontSize(Number(parsed.fontSize) || 18);
    }

    if (parsed.fontStyle) {
      setFontStyle(parsed.fontStyle as keyof typeof fonts);
    }

    if (parsed.language) {
      setLanguage(parsed.language as any);
    }

    if (parsed.padding) {
      setPadding(Number(parsed.padding) || 16);
    }

    if (parsed.theme) {
      setTheme(parsed.theme as any);
    }

    if (parsed.autoDetectLanguage) {
      setAutoDetectLanguage(parsed.autoDetectLanguage === 'true');
    }
  }, [
    setAutoDetectLanguage,
    setCode,
    setDarkmode,
    setFontSize,
    setFontStyle,
    setLanguage,
    setPadding,
    setTheme,
  ]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // console.log('showBackground: ', showBackground);
  // console.log('theme: ', themes[theme].background);

  return (
    <>
      <link
        rel="stylesheet"
        href={themes[theme].theme}
        crossOrigin="anonymous"
      />
      <link
        rel="stylesheet"
        href={fonts[fontStyle].src}
        crossOrigin="anonymous"
      />

      <Resizable
        enable={{ left: true, right: true }}
        minWidth={padding * 2 + 400}
        size={{ width, height: 'auto' }}
        onResize={(e, dir, ref) => setWidth(ref.offsetWidth)}
        onResizeStart={() => setShowWidth(true)}
        onResizeStop={() => setShowWidth(false)}
      >
        <div
          className={cn(
            'overflow-hidden mb-2 transition-all ease-out',
            showBackground ? themes[theme].background : 'ring ring-neutral-900',
          )}
          style={{ padding }}
          ref={editorRef}
        >
          <CodeEditor />
        </div>
        <WidthMeasurement showWidth={showWidth} width={width} />
        <div
          className={cn(
            'transition-opacity w-fit mx-auto -mt-4',
            showWidth || width === 'auto'
              ? 'invisible opacity-0'
              : 'visible opacity-100',
          )}
        >
          <Button size="sm" onClick={() => setWidth('auto')} variant="ghost">
            <ResetIcon className="mr-2" />
            Reset width
          </Button>
        </div>
      </Resizable>

      <Card className="fixed bottom-16 py-6 px-8 mx-6 bg-zinc-800/70 backdrop-blur">
        <CardContent className="flex flex-wrap gap-6 p-0">
          <ThemeSelect />
          <LanguageSelect />
          <FontSelect />
          <FontSizeInput />
          <PaddingSlider />
          <BackgroundSwitch />
          <DarkModeSwitch />
          <div className="w-px bg-neutral-800" />
          <div className="place-self-center">
            <ExportOptions targetRef={editorRef} />
          </div>
        </CardContent>
      </Card>
    </>
  );
}
