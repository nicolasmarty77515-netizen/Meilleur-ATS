'use client';

import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface SearchableItem {
  type: 'logiciel' | 'comparatif' | 'guide' | 'profil';
  title: string;
  description: string;
  url: string;
  extra?: string;
}

interface SearchModalProps {
  items: SearchableItem[];
}

export default function SearchModal({ items }: SearchModalProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Keyboard shortcut: Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Focus management
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setActiveIndex(-1);
      triggerRef.current?.focus();
    }
  }, [open]);

  // Focus trap
  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setOpen(false);
        return;
      }
      if (e.key !== 'Tab') return;

      const focusable = dialog.querySelectorAll<HTMLElement>(
        'input, button, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };

    dialog.addEventListener('keydown', handleKeyDown);
    return () => dialog.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return items
      .filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          (item.extra && item.extra.toLowerCase().includes(q))
      )
      .slice(0, 8);
  }, [items, query]);

  // Reset active index when results change
  useEffect(() => {
    setActiveIndex(results.length > 0 ? 0 : -1);
  }, [results]);

  const navigate = useCallback(
    (url: string) => {
      setOpen(false);
      router.push(url);
    },
    [router]
  );

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === 'Enter' && activeIndex >= 0 && results[activeIndex]) {
      e.preventDefault();
      navigate(results[activeIndex].url);
    }
  };

  const typeLabels: Record<string, { label: string; color: string }> = {
    logiciel: { label: 'ATS', color: 'bg-blue-100 text-blue-700' },
    comparatif: { label: 'VS', color: 'bg-orange-100 text-orange-700' },
    guide: { label: 'Guide', color: 'bg-green-100 text-green-700' },
    profil: { label: 'Profil', color: 'bg-purple-100 text-purple-700' },
  };

  return (
    <>
      {/* Trigger button */}
      <button
        ref={triggerRef}
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-500 transition hover:border-blue-300 hover:text-blue-600"
        aria-label="Rechercher (Ctrl+K)"
        aria-haspopup="dialog"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <span className="hidden sm:inline">Rechercher</span>
        <kbd className="hidden rounded border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-xs text-gray-400 sm:inline" aria-hidden="true">
          Ctrl+K
        </kbd>
      </button>

      {/* Modal overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/50 pt-[15vh]"
          onClick={() => setOpen(false)}
          role="presentation"
        >
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Rechercher sur le site"
            className="mx-4 w-full max-w-xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={() => {}}
          >
            {/* Search input */}
            <div className="flex items-center border-b border-gray-200 px-4">
              <svg className="h-5 w-5 shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher un ATS, guide, comparatif..."
                className="w-full px-3 py-4 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none"
                onKeyDown={handleInputKeyDown}
                aria-label="Rechercher"
                aria-autocomplete="list"
                aria-controls="search-results"
                aria-activedescendant={activeIndex >= 0 ? `search-result-${activeIndex}` : undefined}
                role="combobox"
                aria-expanded={results.length > 0}
              />
              <button
                onClick={() => setOpen(false)}
                className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                aria-label="Fermer la recherche"
              >
                <kbd className="text-xs" aria-hidden="true">Esc</kbd>
              </button>
            </div>

            {/* Results */}
            <div className="max-h-80 overflow-y-auto">
              {query.trim() && results.length === 0 && (
                <div className="px-4 py-8 text-center text-sm text-gray-500" role="status" aria-live="polite">
                  Aucun résultat pour &laquo; {query} &raquo;
                </div>
              )}

              {results.length > 0 && (
                <>
                  <div className="sr-only" role="status" aria-live="polite">
                    {results.length} résultat{results.length > 1 ? 's' : ''} trouvé{results.length > 1 ? 's' : ''}
                  </div>
                  <ul id="search-results" className="divide-y divide-gray-100 py-2" role="listbox" aria-label="Résultats de recherche">
                    {results.map((item, i) => {
                      const badge = typeLabels[item.type];
                      return (
                        <li
                          key={i}
                          id={`search-result-${i}`}
                          role="option"
                          aria-selected={activeIndex === i}
                        >
                          <button
                            onClick={() => navigate(item.url)}
                            onMouseEnter={() => setActiveIndex(i)}
                            className={`flex w-full items-start gap-3 px-4 py-3 text-left transition ${
                              activeIndex === i ? 'bg-blue-50' : 'hover:bg-gray-50'
                            }`}
                            tabIndex={-1}
                          >
                            <span className={`mt-0.5 shrink-0 rounded px-1.5 py-0.5 text-xs font-semibold ${badge.color}`} aria-hidden="true">
                              {badge.label}
                            </span>
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-medium text-gray-900">{item.title}</p>
                              <p className="mt-0.5 truncate text-xs text-gray-500">{item.description}</p>
                            </div>
                            <svg className="mt-1 h-4 w-4 shrink-0 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}

              {!query.trim() && (
                <div className="px-4 py-6 text-center text-sm text-gray-400">
                  Tapez pour rechercher parmi {items.length} contenus
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-4 py-2 text-xs text-gray-400" aria-hidden="true">
              <span>
                <kbd className="rounded border border-gray-200 bg-white px-1">&uarr;&darr;</kbd> naviguer
                {' '}
                <kbd className="rounded border border-gray-200 bg-white px-1">Entrée</kbd> ouvrir
              </span>
              <span>
                <kbd className="rounded border border-gray-200 bg-white px-1">Esc</kbd> fermer
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
