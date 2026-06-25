// app/contexts/locale-context.tsx
'use client';

import { createContext, useContext, useState } from 'react';
import fr from '../../messages/fr.json';  // ← deux niveaux en arrière
import en from '../../messages/en.json';  // ← deux niveaux en arrière

const messages = { fr, en };
type Locale = 'fr' | 'en';

const LocaleContext = createContext<{
  locale: Locale;
  t: (key: string) => string;
  toggle: () => void;
}>({ locale: 'fr', t: (k) => k, toggle: () => {} });

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en');

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = messages[locale];
    for (const k of keys) value = value?.[k];
    return value ?? key;
  };

  const toggle = () => setLocale((l) => l === 'fr' ? 'en' : 'fr');

  return (
    <LocaleContext.Provider value={{ locale, t, toggle }}>
      {children}
    </LocaleContext.Provider>
  );
}

export const useLocale = () => useContext(LocaleContext);