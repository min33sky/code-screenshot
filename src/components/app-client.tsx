'use client';
import usePreferences from '@/hooks/usePreferences';
import { themes } from '@/lib/options';
import Script from 'next/script';

import React, { useEffect, useState } from 'react';

export default function AppClient() {
  const { theme } = usePreferences();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  console.log('theme: ', theme);

  if (!mounted) {
    return null;
  }

  return (
    <div>
      <link
        rel="stylesheet"
        href={themes[theme]?.theme}
        crossOrigin="anonymous"
      />
      <div>App CLient</div>
    </div>
  );
}
