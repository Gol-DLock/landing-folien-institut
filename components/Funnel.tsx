'use client';

import { useState, useMemo, type FormEvent } from 'react';
import Image from 'next/image';
import { ArrowLeft, ChevronRight, Check, Loader2, AlertCircle } from 'lucide-react';
import type { Tree, Step, Option } from '@/lib/tree';
import { getIcon } from './icons';

type Answer = {
  stepId: string;
  question: string;
  optionId: string;
  label: string;
  tag?: string;
};

type Phase = 'questions' | 'contact' | 'success' | 'error';

type ContactData = {
  name: string;
  email: string;
  phone: string;
  plz: string;
  company?: string;
  message?: string;
  consent: boolean;
};

export default function Funnel({ tree }: { tree: Tree }) {
  const [history, setHistory] = useState<Answer[]>([]);
  const [currentStepId, setCurrentStepId] = useState(tree.start);
  const [phase, setPhase] = useState<Phase>('questions');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const stepsById = useMemo(() => {
    const map: Record<string, Step> = {};
    for (const s of tree.steps) map[s.id] = s;
    return map;
  }, [tree]);

  const currentStep = stepsById[currentStepId];
  const totalSteps = tree.steps.length;
  const currentIndex = tree.steps.findIndex(s => s.id === currentStepId);

  // Progress: bis Kontakt = totalSteps Fragen + 1 Kontaktschritt
  const progressTotal = totalSteps + 1;
  const progressCurrent =
    phase === 'success'
      ? progressTotal
      : phase === 'contact'
        ? totalSteps + 1
        : currentIndex + 1;

  function selectOption(option: Option, step: Step) {
    const answer: Answer = {
      stepId: step.id,
      question: step.question,
      optionId: option.id,
      label: option.label,
      tag: option.tag,
    };
    setHistory(h => [...h, answer]);
    if (option.next === '__contact__') {
      setPhase('contact');
    } else {
      setCurrentStepId(option.next);
    }
  }

  function goBack() {
    if (phase === 'contact') {
      setPhase('questions');
      const last = history[history.length - 1];
      setHistory(h => h.slice(0, -1));
      if (last) setCurrentStepId(last.stepId);
      return;
    }
    if (history.length === 0) return;
    const last = history[history.length - 1];
    setHistory(h => h.slice(0, -1));
    setCurrentStepId(last.stepId);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg(null);

    const form = e.currentTarget;
    const data = new FormData(form);

    const contact: ContactData = {
      name: String(data.get('name') ?? '').trim(),
      email: String(data.get('email') ?? '').trim(),
      phone: String(data.get('phone') ?? '').trim(),
      plz: String(data.get('plz') ?? '').trim(),
      company: data.get('company') ? String(data.get('company')).trim() : undefined,
      message: data.get('message') ? String(data.get('message')).trim() : undefined,
      consent: data.get('consent') === 'on',
    };

    if (!contact.consent) {
      setErrorMsg('Bitte stimmen Sie der Datenschutzerklärung zu.');
      return;
    }
    if (!contact.name || !contact.email || !contact.phone) {
      setErrorMsg('Bitte Name, E-Mail und Telefon ausfüllen.');
      return;
    }
    // Honeypot check
    if (data.get('hp_field')) {
      setPhase('success');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          variant: tree.variant,
          answers: history,
          contact,
          page: typeof window !== 'undefined' ? window.location.href : '',
          ts: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error('Submit fehlgeschlagen');
      setPhase('success');
    } catch (err) {
      setErrorMsg(
        'Die Anfrage konnte gerade nicht gesendet werden. Bitte versuchen Sie es noch einmal oder rufen Sie uns an.',
      );
      setPhase('error');
    } finally {
      setSubmitting(false);
    }
  }

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-navy-100">
      {/* Progress Bar */}
      <div className="h-1.5 bg-navy-100">
        <div
          className="h-full bg-sky-500 transition-all duration-500 ease-out"
          style={{ width: `${(progressCurrent / progressTotal) * 100}%` }}
        />
      </div>

      <div className="grid md:grid-cols-5">
        {/* Mood Image (Desktop only) */}
        {currentStep?.mood && phase === 'questions' && (
          <div className="relative hidden md:col-span-2 md:block">
            <Image
              src={currentStep.mood}
              alt=""
              fill
              sizes="(min-width: 768px) 40vw, 0"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-navy-900/60 via-navy-900/20 to-transparent" />
          </div>
        )}
        {phase !== 'questions' && phase !== 'success' && (
          <div className="relative hidden md:col-span-2 md:block">
            <Image
              src="/images/header-01.jpg"
              alt=""
              fill
              sizes="(min-width: 768px) 40vw, 0"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-navy-900/60 via-navy-900/20 to-transparent" />
          </div>
        )}

        {/* Content */}
        <div
          className={`p-6 sm:p-8 md:p-10 ${
            phase === 'questions' && currentStep?.mood ? 'md:col-span-3' : 'md:col-span-5'
          } ${phase === 'success' ? 'md:col-span-5' : ''}`}
        >
          {/* Step counter + back */}
          {phase !== 'success' && (
            <div className="mb-6 flex items-center justify-between text-xs font-medium text-navy-500">
              <span>
                Schritt {progressCurrent} von {progressTotal}
              </span>
              {(history.length > 0 || phase === 'contact') && (
                <button
                  type="button"
                  onClick={goBack}
                  className="inline-flex items-center gap-1 text-navy-600 hover:text-navy-900"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Zurück
                </button>
              )}
            </div>
          )}

          {/* QUESTIONS */}
          {phase === 'questions' && currentStep && (
            <div key={currentStep.id} className="animate-slide-in-right">
              <h3 className="font-display text-2xl font-semibold leading-tight text-navy-900 sm:text-3xl">
                {currentStep.question}
              </h3>
              {currentStep.subtitle && (
                <p className="mt-2 text-sm text-navy-600">{currentStep.subtitle}</p>
              )}

              <div className="mt-6 space-y-2">
                {currentStep.options.map(option => {
                  const Icon = getIcon(option.icon);
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => selectOption(option, currentStep)}
                      className="group flex w-full items-center gap-4 rounded-xl border border-navy-200 bg-white px-4 py-4 text-left transition-all hover:border-sky-500 hover:bg-sky-50/50 focus:border-sky-500 focus:bg-sky-50/50"
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy-700 transition-colors group-hover:bg-sky-500 group-hover:text-white">
                        <Icon className="h-6 w-6" strokeWidth={1.75} />
                      </span>
                      <span className="flex-1 text-base font-medium text-navy-900">
                        {option.label}
                      </span>
                      <ChevronRight className="h-5 w-5 text-navy-300 transition-transform group-hover:translate-x-0.5 group-hover:text-sky-500" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* CONTACT FORM */}
          {(phase === 'contact' || phase === 'error') && (
            <form key="contact" onSubmit={handleSubmit} noValidate className="animate-slide-in-right">
              <h3 className="font-display text-2xl font-semibold leading-tight text-navy-900 sm:text-3xl">
                Wo dürfen wir Ihr Angebot hinschicken?
              </h3>
              <p className="mt-2 text-sm text-navy-600">
                Wir melden uns innerhalb von 24 Stunden. Keine Verpflichtung.
              </p>

              <div className="mt-6 space-y-3">
                <Field name="name" label="Vor- und Nachname" required autoComplete="name" />
                {tree.variant === 'gewerbe' && (
                  <Field name="company" label="Firma" autoComplete="organization" />
                )}
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field
                    name="email"
                    label="E-Mail"
                    type="email"
                    required
                    autoComplete="email"
                    inputMode="email"
                  />
                  <Field
                    name="phone"
                    label="Telefon"
                    type="tel"
                    required
                    autoComplete="tel"
                    inputMode="tel"
                  />
                </div>
                <Field
                  name="plz"
                  label="PLZ (für Anfahrt-Einschätzung)"
                  autoComplete="postal-code"
                  inputMode="numeric"
                />
                <Field name="message" label="Anmerkung (optional)" textarea />

                {/* Honeypot */}
                <input
                  type="text"
                  name="hp_field"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute -left-[9999px] h-0 w-0 opacity-0"
                />

                <label className="flex cursor-pointer items-start gap-3 pt-2">
                  <input
                    type="checkbox"
                    name="consent"
                    required
                    className="mt-0.5 h-5 w-5 shrink-0 rounded border-navy-300 text-sky-500 focus:ring-sky-500"
                  />
                  <span className="text-xs leading-relaxed text-navy-600">
                    Ich willige ein, dass meine Angaben zur Bearbeitung meiner Anfrage gespeichert
                    und verarbeitet werden. Hinweise zum Widerruf in der{' '}
                    <a
                      href="/datenschutz"
                      target="_blank"
                      rel="noopener"
                      className="underline underline-offset-2 hover:text-sky-600"
                    >
                      Datenschutzerklärung
                    </a>
                    .
                  </span>
                </label>

                {errorMsg && (
                  <div className="flex items-start gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-800">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-2 inline-flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-sky-500 px-6 text-base font-semibold text-white shadow-sm transition-colors hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Wird gesendet …
                    </>
                  ) : (
                    <>
                      Angebot anfordern
                      <ChevronRight className="h-5 w-5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* SUCCESS */}
          {phase === 'success' && (
            <div className="py-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sky-500 text-white">
                <Check className="h-8 w-8" strokeWidth={2.5} />
              </div>
              <h3 className="mt-6 font-display text-2xl font-semibold text-navy-900 sm:text-3xl">
                Vielen Dank für Ihre Anfrage!
              </h3>
              <p className="mx-auto mt-3 max-w-md text-base text-navy-600">
                Wir haben Ihre Angaben erhalten und melden uns innerhalb von 24 Stunden bei Ihnen.
                Schauen Sie in der Zwischenzeit auch in Ihren Spam-Ordner.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Floating-Label-Input — touch-friendly, accessible
function Field({
  name,
  label,
  type = 'text',
  required,
  autoComplete,
  inputMode,
  textarea,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: 'text' | 'email' | 'tel' | 'numeric' | 'decimal' | 'search' | 'url' | 'none';
  textarea?: boolean;
}) {
  const id = `f-${name}`;
  const inputClass =
    'peer w-full rounded-lg border border-navy-200 bg-white px-4 pt-6 pb-2 text-base text-navy-900 placeholder-transparent focus:border-sky-500 focus:outline-none focus:ring-0 transition-colors';
  const labelClass =
    'pointer-events-none absolute left-4 top-2 text-xs font-medium text-navy-500 transition-all duration-150 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-navy-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-sky-600';

  return (
    <div className="relative">
      {textarea ? (
        <textarea
          id={id}
          name={name}
          placeholder={label}
          required={required}
          rows={3}
          className={`${inputClass} min-h-[120px] pt-7 resize-y`}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          placeholder={label}
          required={required}
          autoComplete={autoComplete}
          inputMode={inputMode}
          className={`${inputClass} min-h-[56px]`}
        />
      )}
      <label htmlFor={id} className={labelClass}>
        {label}
        {required && <span className="text-sky-500"> *</span>}
      </label>
    </div>
  );
}
