'use client';

import usePreferences from '@/hooks/usePreferences';
import { codeSnippets, fonts } from '@/lib/options';
import { cn } from '@/lib/utils';
import flourite from 'flourite';
import hljs from 'highlight.js';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import Editor from 'react-simple-code-editor';

export default function CodeEditor() {
  const {
    theme,
    padding,
    fontStyle,
    showBackground,
    title,
    code,
    darkMode,
    fontSize,
    language,
    setTitle,
    setCode,
    autoDetectLanguage,
    setLanguage,
  } = usePreferences();

  const searchParams = useSearchParams();
  const queryCode = searchParams.get('code');

  useEffect(() => {
    if (queryCode) return;

    const randomSnippet =
      codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
    setCode(randomSnippet.code);
    setLanguage(randomSnippet.language);
  }, [queryCode, setCode, setLanguage]);

  useEffect(() => {
    if (autoDetectLanguage) {
      const { language } = flourite(code, { noUnknown: true });
      setLanguage(language.toLowerCase() || 'plaintext');
    }
  }, [autoDetectLanguage, code, setLanguage]);

  return (
    <div
      className={cn(
        'min-w-[400px] border-2 rounded-xl shadow-2xl',
        darkMode
          ? 'bg-black/75 border-gray-600/40'
          : 'bg-white/75 border-gray-200/20',
      )}
    >
      <header className="grid grid-cols-6 gap-3 items-center px-4 py-3">
        <div className="flex gap-1.5">
          <div className="rounded-full h-3 w-3 bg-red-500" />
          <div className="rounded-full h-3 w-3 bg-yellow-500" />
          <div className="rounded-full h-3 w-3 bg-green-500" />
        </div>
        <div className="col-span-4 flex justify-center">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            spellCheck={false}
            onClick={(e) => (e.target as any).select()}
            className="bg-transparent text-center text-gray-400 text-sm font-medium focus:outline-none"
          />
        </div>
      </header>
      <div
        className={cn(
          'px-4 pb-4',
          darkMode
            ? 'brightness-110'
            : 'text-gray-800 brightness-50 saturate-200 contrast-200',
        )}
      >
        <Editor
          value={code}
          onValueChange={(code) => setCode(code)}
          highlight={(code) =>
            hljs.highlight(code, { language: language || 'plaintext' }).value
          }
          style={{
            fontFamily: fonts[fontStyle].name,
            fontSize: fontSize,
          }}
          textareaClassName="focus:outline-none"
          onClick={(e) => (e.target as any).select()}
        />
      </div>
    </div>
  );
}
