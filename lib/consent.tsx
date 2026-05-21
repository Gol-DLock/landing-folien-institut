'use client';

// Minimales DSGVO-Consent-Management.
// Keine externe Library – wir laden ohnehin keine Drittanbieter-Skripte by default.
// Wenn spaeter Tracking dazukommt: ueber useConsent().analytics gaten.

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type ConsentState = {
  necessary: true; // immer true
  analytics: boolean;
  marketing: boolean;
  decided: boolean; // hat User schon entschieden?
};

const DEFAULT: ConsentState = {
  necessary: true,
  analytics: false,
  marketing: false,
  decided: false,
};

const STORAGE_KEY = 'fi-consent-v1';

type ConsentContextValue = {
  consent: ConsentState;
  acceptAll: () => void;
  rejectAll: () => void;
  save: (partial: Partial<Omit<ConsentState, 'necessary' | 'decided'>>) => void;
  open: boolean;
  setOpen: (v: boolean) => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentState>(DEFAULT);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as ConsentState;
        setConsent({ ...DEFAULT, ...parsed, decided: true });
      } else {
        setOpen(true);
      }
    } catch {
      setOpen(true);
    }
  }, []);

  const persist = (next: ConsentState) => {
    setConsent(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
    setOpen(false);
  };

  const acceptAll = () =>
    persist({ necessary: true, analytics: true, marketing: true, decided: true });

  const rejectAll = () =>
    persist({ necessary: true, analytics: false, marketing: false, decided: true });

  const save = (partial: Partial<Omit<ConsentState, 'necessary' | 'decided'>>) =>
    persist({ ...consent, ...partial, necessary: true, decided: true });

  return (
    <ConsentContext.Provider value={{ consent, acceptAll, rejectAll, save, open, setOpen }}>
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) {
    throw new Error('useConsent muss innerhalb von ConsentProvider verwendet werden');
  }
  return ctx;
}
