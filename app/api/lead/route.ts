import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// ============================================================
// TYPES
// ============================================================

type Answer = {
  stepId: string;
  question: string;
  optionId: string;
  label: string;
  tag?: string;
};

type Payload = {
  variant: 'gewerbe' | 'privat';
  answers: Answer[];
  contact: {
    name: string;
    email: string;
    phone: string;
    plz?: string;
    company?: string;
    message?: string;
    consent: boolean;
  };
  page?: string;
  ts?: string;
};

// ============================================================
// UTILS
// ============================================================

function escape(s: string | undefined): string {
  if (!s) return '';
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function firstName(full: string): string {
  return full.trim().split(/\s+/)[0] || full;
}

function formatDateDE(iso: string | undefined): string {
  if (!iso) return '';
  try {
    const d = new Date(iso);
    return d.toLocaleString('de-DE', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return iso;
  }
}

// Tag-Übersetzung für interne Lead-Bewertung
function tagBadge(tag?: string): string {
  if (!tag) return '';
  const map: Record<string, { label: string; color: string }> = {
    hot: { label: '🔥 Hot', color: '#dc2626' },
    warm: { label: '⏱ Warm', color: '#ea580c' },
    cold: { label: '❄ Kalt', color: '#475569' },
    enterprise: { label: '⭐ Enterprise', color: '#7c3aed' },
    mid: { label: 'Mid', color: '#1e7fba' },
    small: { label: 'Small', color: '#0f766e' },
    scoping: { label: 'Scoping', color: '#475569' },
  };
  const t = map[tag] ?? { label: tag, color: '#475569' };
  return `<span style="background:${t.color};color:#ffffff;padding:3px 8px;border-radius:4px;font-size:11px;font-weight:600;letter-spacing:0.3px;margin-left:8px;">${t.label}</span>`;
}

// ============================================================
// SHARED EMAIL CHROME (Header mit Logo, Footer)
// ============================================================

const FONTS =
  "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

function wrap(opts: {
  preheader: string;
  brandedLogo: string; // absolute URL to logo
  body: string;
}): string {
  return `<!DOCTYPE html>
<html lang="de"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light only">
<title>Folien Institut</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:${FONTS};color:#0F2D52;">
<span style="display:none !important;visibility:hidden;mso-hide:all;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${escape(opts.preheader)}</span>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f1f5f9;padding:32px 16px;">
  <tr><td align="center">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(15,45,82,0.06);">
      <tr><td style="background:#ffffff;padding:28px 32px 0 32px;border-bottom:1px solid #e2e8f0;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr>
            <td valign="middle"><img src="${opts.brandedLogo}" alt="Folien Institut" width="56" height="56" style="display:block;border:0;outline:none;text-decoration:none;"></td>
            <td valign="middle" align="right" style="font-size:11px;color:#64748b;letter-spacing:0.5px;text-transform:uppercase;font-weight:500;">Bremen · Ostfriesland · Hannover · Hamburg</td>
          </tr>
        </table>
        <div style="height:24px;line-height:24px;font-size:0;">&nbsp;</div>
      </td></tr>

      ${opts.body}

      <tr><td style="background:#0F2D52;padding:24px 32px;">
        <p style="margin:0;color:#cbd5e1;font-size:12px;line-height:1.6;">
          <strong style="color:#ffffff;">Folien Institut</strong> · Sonnenschutzfolien für Gewerbe & Privat<br>
          Bremen · Ostfriesland · Hannover · Hamburg
        </p>
      </td></tr>
    </table>

    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;width:100%;">
      <tr><td align="center" style="padding:16px 8px 0 8px;color:#94a3b8;font-size:11px;line-height:1.6;">
        Sie erhalten diese E-Mail, weil Sie eine Anfrage über folien-institut.de gestellt haben.
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;
}

// ============================================================
// EMAIL 1: BESTÄTIGUNG AN KUNDEN (branded, mit Dank)
// ============================================================

function buildCustomerHtml(p: Payload, logoUrl: string): string {
  const c = p.contact;
  const fn = firstName(c.name);
  const isGewerbe = p.variant === 'gewerbe';

  // Antworten als Übersichts-Karte
  const answerRows = p.answers
    .map(
      a => `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:13px;width:55%;vertical-align:top;">${escape(a.question)}</td>
        <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#0F2D52;font-size:14px;font-weight:600;text-align:right;">${escape(a.label)}</td>
      </tr>`,
    )
    .join('');

  const body = `
  <tr><td style="padding:32px;">
    <p style="margin:0 0 8px 0;color:#1e7fba;font-size:12px;font-weight:600;letter-spacing:1px;text-transform:uppercase;">Anfrage eingegangen</p>
    <h1 style="margin:0 0 24px 0;color:#0F2D52;font-size:28px;font-weight:600;line-height:1.2;letter-spacing:-0.02em;">Vielen Dank, ${escape(fn)}.</h1>

    <p style="margin:0 0 16px 0;color:#334155;font-size:15px;line-height:1.6;">
      wir haben Ihre Anfrage erhalten und melden uns <strong style="color:#0F2D52;">innerhalb von 24 Stunden</strong> persönlich bei Ihnen ${isGewerbe ? '– per E-Mail oder telefonisch unter der angegebenen Nummer' : 'zurück'}.
    </p>

    <p style="margin:0 0 28px 0;color:#334155;font-size:15px;line-height:1.6;">
      In der Zwischenzeit finden Sie hier eine Übersicht Ihrer Angaben. Falls etwas geändert werden soll, antworten Sie einfach auf diese E-Mail.
    </p>

    <!-- Was passiert als Nächstes -->
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f8fafc;border-radius:12px;margin:0 0 28px 0;">
      <tr><td style="padding:20px 24px;">
        <p style="margin:0 0 12px 0;color:#0F2D52;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">So geht es weiter</p>
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr>
            <td valign="top" style="width:36px;padding:6px 12px 6px 0;"><div style="width:28px;height:28px;background:#0F2D52;color:#ffffff;border-radius:50%;text-align:center;line-height:28px;font-size:13px;font-weight:600;">1</div></td>
            <td valign="top" style="padding:6px 0;color:#334155;font-size:14px;line-height:1.5;">Wir prüfen Ihre Angaben und Ihre Situation vor Ort anhand der PLZ.</td>
          </tr>
          <tr>
            <td valign="top" style="width:36px;padding:6px 12px 6px 0;"><div style="width:28px;height:28px;background:#0F2D52;color:#ffffff;border-radius:50%;text-align:center;line-height:28px;font-size:13px;font-weight:600;">2</div></td>
            <td valign="top" style="padding:6px 0;color:#334155;font-size:14px;line-height:1.5;">Wir melden uns innerhalb von 24 Stunden mit einer ersten Einschätzung und klären offene Punkte.</td>
          </tr>
          <tr>
            <td valign="top" style="width:36px;padding:6px 12px 6px 0;"><div style="width:28px;height:28px;background:#0F2D52;color:#ffffff;border-radius:50%;text-align:center;line-height:28px;font-size:13px;font-weight:600;">3</div></td>
            <td valign="top" style="padding:6px 0;color:#334155;font-size:14px;line-height:1.5;">Bei Bedarf vereinbaren wir einen kostenfreien Vor-Ort-Termin und erstellen Ihnen ein verbindliches Angebot.</td>
          </tr>
        </table>
      </td></tr>
    </table>

    <!-- Angaben-Übersicht -->
    <p style="margin:0 0 12px 0;color:#0F2D52;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Ihre Angaben</p>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 28px 0;">
      ${answerRows}
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:13px;">Kontakt</td>
        <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#0F2D52;font-size:14px;font-weight:600;text-align:right;">${escape(c.email)}<br><span style="font-weight:500;color:#475569;font-size:13px;">${escape(c.phone)}</span></td>
      </tr>
      ${c.plz ? `<tr><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:13px;">PLZ</td><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#0F2D52;font-size:14px;font-weight:600;text-align:right;">${escape(c.plz)}</td></tr>` : ''}
      ${c.company ? `<tr><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:13px;">Firma</td><td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#0F2D52;font-size:14px;font-weight:600;text-align:right;">${escape(c.company)}</td></tr>` : ''}
      ${c.message ? `<tr><td colspan="2" style="padding:14px 0 0 0;color:#64748b;font-size:13px;">Ihre Anmerkung:<br><span style="display:block;margin-top:6px;color:#334155;font-size:14px;line-height:1.5;white-space:pre-wrap;">${escape(c.message)}</span></td></tr>` : ''}
    </table>

    <!-- Vertrauensblock -->
    <div style="background:#dceffd;border-radius:12px;padding:20px 24px;margin:0 0 8px 0;">
      <p style="margin:0;color:#0F2D52;font-size:14px;line-height:1.6;">
        <strong>Übrigens:</strong> Wir arbeiten ausschließlich mit zertifizierten Folien von Bruxsafol und bringen 15 Jahre Erfahrung in Verklebung und Beratung mit. Sichtbare Wirkung – ab dem ersten Sonnentag.
      </p>
    </div>
  </td></tr>`;

  return wrap({
    preheader: `Danke ${fn} – wir melden uns innerhalb von 24 Stunden bei Ihnen.`,
    brandedLogo: logoUrl,
    body,
  });
}

function buildCustomerText(p: Payload): string {
  const c = p.contact;
  const fn = firstName(c.name);
  return [
    `Vielen Dank, ${fn}.`,
    '',
    'Wir haben Ihre Anfrage erhalten und melden uns innerhalb von 24 Stunden persönlich bei Ihnen zurück.',
    '',
    '--- So geht es weiter ---',
    '1. Wir prüfen Ihre Angaben und Ihre Situation vor Ort anhand der PLZ.',
    '2. Wir melden uns innerhalb von 24 Stunden mit einer ersten Einschätzung.',
    '3. Bei Bedarf vereinbaren wir einen kostenfreien Vor-Ort-Termin und erstellen ein verbindliches Angebot.',
    '',
    '--- Ihre Angaben ---',
    ...p.answers.map(a => `${a.question}: ${a.label}`),
    '',
    '--- Kontakt ---',
    `Name:    ${c.name}`,
    c.company ? `Firma:   ${c.company}` : '',
    `E-Mail:  ${c.email}`,
    `Telefon: ${c.phone}`,
    c.plz ? `PLZ:     ${c.plz}` : '',
    c.message ? `Anmerkung: ${c.message}` : '',
    '',
    'Falls etwas geändert werden soll, antworten Sie einfach auf diese E-Mail.',
    '',
    'Folien Institut',
    'Sonnenschutzfolien für Gewerbe & Privat',
    'Bremen · Ostfriesland · Hannover · Hamburg',
  ]
    .filter(Boolean)
    .join('\n');
}

// ============================================================
// EMAIL 2: INTERNE LEAD-MAIL ANS FOLIEN INSTITUT
// ============================================================

function buildInternalHtml(p: Payload, logoUrl: string): string {
  const c = p.contact;
  const isGewerbe = p.variant === 'gewerbe';

  // Lead-Tag bestimmen für visuelle Priorität
  const allTags = p.answers.map(a => a.tag).filter(Boolean) as string[];
  const primaryTag =
    allTags.find(t => t === 'hot' || t === 'enterprise') ||
    allTags.find(t => t === 'warm' || t === 'mid') ||
    allTags[0] ||
    '';

  // Priority Banner
  let priorityBanner = '';
  if (primaryTag === 'hot' || primaryTag === 'enterprise') {
    priorityBanner = `<div style="background:#dc2626;color:#ffffff;padding:10px 16px;border-radius:8px;margin:0 0 20px 0;font-size:13px;font-weight:600;letter-spacing:0.3px;">⚡ Hohe Priorität – Lead möchte zeitnah handeln</div>`;
  } else if (primaryTag === 'warm' || primaryTag === 'mid') {
    priorityBanner = `<div style="background:#ea580c;color:#ffffff;padding:10px 16px;border-radius:8px;margin:0 0 20px 0;font-size:13px;font-weight:600;letter-spacing:0.3px;">Mittlere Priorität – Lead plant 1–3 Monate</div>`;
  }

  const answerRows = p.answers
    .map(
      a => `
      <tr>
        <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:13px;width:45%;vertical-align:top;">${escape(a.question)}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;color:#0F2D52;font-size:14px;font-weight:600;">${escape(a.label)}${tagBadge(a.tag)}</td>
      </tr>`,
    )
    .join('');

  const body = `
  <tr><td style="padding:32px;">
    <p style="margin:0 0 8px 0;color:${isGewerbe ? '#7c3aed' : '#1e7fba'};font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">Neuer Lead · ${escape(p.variant)}</p>
    <h1 style="margin:0 0 6px 0;color:#0F2D52;font-size:26px;font-weight:600;line-height:1.2;letter-spacing:-0.02em;">${escape(c.name)}</h1>
    ${c.company ? `<p style="margin:0 0 20px 0;color:#475569;font-size:15px;">${escape(c.company)}</p>` : '<div style="height:14px;"></div>'}

    ${priorityBanner}

    <!-- Quick-Action Buttons -->
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 28px 0;">
      <tr>
        <td style="padding:0 6px 0 0;width:50%;">
          <a href="tel:${escape(c.phone)}" style="display:block;background:#0F2D52;color:#ffffff;text-decoration:none;text-align:center;padding:14px 16px;border-radius:8px;font-size:14px;font-weight:600;letter-spacing:0.2px;">📞 Anrufen</a>
        </td>
        <td style="padding:0 0 0 6px;width:50%;">
          <a href="mailto:${escape(c.email)}" style="display:block;background:#1e7fba;color:#ffffff;text-decoration:none;text-align:center;padding:14px 16px;border-radius:8px;font-size:14px;font-weight:600;letter-spacing:0.2px;">✉ Antworten</a>
        </td>
      </tr>
    </table>

    <!-- Kontaktdaten -->
    <p style="margin:0 0 12px 0;color:#0F2D52;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">Kontaktdaten</p>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f8fafc;border-radius:8px;margin:0 0 28px 0;">
      <tr>
        <td style="padding:12px 16px;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:13px;width:30%;">Telefon</td>
        <td style="padding:12px 16px;border-bottom:1px solid #e2e8f0;font-size:14px;font-weight:600;"><a href="tel:${escape(c.phone)}" style="color:#1e7fba;text-decoration:none;">${escape(c.phone)}</a></td>
      </tr>
      <tr>
        <td style="padding:12px 16px;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:13px;">E-Mail</td>
        <td style="padding:12px 16px;border-bottom:1px solid #e2e8f0;font-size:14px;font-weight:600;"><a href="mailto:${escape(c.email)}" style="color:#1e7fba;text-decoration:none;">${escape(c.email)}</a></td>
      </tr>
      ${c.plz ? `<tr><td style="padding:12px 16px;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:13px;">PLZ</td><td style="padding:12px 16px;border-bottom:1px solid #e2e8f0;color:#0F2D52;font-size:14px;font-weight:600;">${escape(c.plz)}</td></tr>` : ''}
      ${c.company ? `<tr><td style="padding:12px 16px;color:#64748b;font-size:13px;">Firma</td><td style="padding:12px 16px;color:#0F2D52;font-size:14px;font-weight:600;">${escape(c.company)}</td></tr>` : `<tr><td colspan="2" style="padding:0;height:0;line-height:0;font-size:0;">&nbsp;</td></tr>`}
    </table>

    <!-- Funnel-Antworten -->
    <p style="margin:0 0 12px 0;color:#0F2D52;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">Antworten aus dem Funnel</p>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;margin:0 0 28px 0;">
      ${answerRows}
    </table>

    ${
      c.message
        ? `
    <p style="margin:0 0 12px 0;color:#0F2D52;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">Anmerkung vom Lead</p>
    <div style="background:#fffbeb;border-left:3px solid #f59e0b;padding:14px 16px;border-radius:4px;margin:0 0 28px 0;color:#334155;font-size:14px;line-height:1.6;white-space:pre-wrap;">${escape(c.message)}</div>
    `
        : ''
    }

    <!-- Meta -->
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f8fafc;border-radius:8px;">
      <tr><td style="padding:14px 16px;color:#64748b;font-size:12px;line-height:1.6;">
        <strong style="color:#0F2D52;">Eingang:</strong> ${escape(formatDateDE(p.ts))}<br>
        <strong style="color:#0F2D52;">Seite:</strong> <span style="word-break:break-all;">${escape(p.page)}</span><br>
        <strong style="color:#0F2D52;">DSGVO-Einwilligung:</strong> ${c.consent ? '✓ erteilt' : '✗ FEHLT'}
      </td></tr>
    </table>
  </td></tr>`;

  return wrap({
    preheader: `Neuer ${p.variant}-Lead von ${c.name}${c.company ? ' (' + c.company + ')' : ''}`,
    brandedLogo: logoUrl,
    body,
  });
}

function buildInternalText(p: Payload): string {
  const c = p.contact;
  const allTags = p.answers.map(a => a.tag).filter(Boolean) as string[];
  const primaryTag = allTags[0] || '–';

  return [
    `NEUER LEAD — ${p.variant.toUpperCase()}`,
    `Tag: ${primaryTag}`,
    '',
    `Name:    ${c.name}`,
    c.company ? `Firma:   ${c.company}` : '',
    `Tel:     ${c.phone}`,
    `E-Mail:  ${c.email}`,
    c.plz ? `PLZ:     ${c.plz}` : '',
    '',
    '--- Antworten ---',
    ...p.answers.map(a => `${a.question}: ${a.label}${a.tag ? '  [' + a.tag + ']' : ''}`),
    '',
    c.message ? `Anmerkung: ${c.message}` : '',
    '',
    `Eingang: ${formatDateDE(p.ts)}`,
    `Seite:   ${p.page ?? ''}`,
    `DSGVO:   ${c.consent ? 'erteilt' : 'FEHLT'}`,
  ]
    .filter(Boolean)
    .join('\n');
}

// ============================================================
// POST HANDLER
// ============================================================

export async function POST(req: Request) {
  let payload: Payload;
  try {
    payload = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ error: 'Ungueltige Anfrage' }, { status: 400 });
  }

  const c = payload.contact;
  if (!c || !c.name || !c.email || !c.phone || !c.consent) {
    return NextResponse.json({ error: 'Pflichtfelder fehlen' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email)) {
    return NextResponse.json({ error: 'Ungueltige E-Mail' }, { status: 400 });
  }
  if (!['gewerbe', 'privat'].includes(payload.variant)) {
    return NextResponse.json({ error: 'Ungueltige Variante' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const mailToInternal = process.env.MAIL_TO ?? 'hallo@turm.media';
  const mailFromBrand =
    process.env.MAIL_FROM_BRAND ?? process.env.MAIL_FROM ?? 'Folien Institut <noreply@turm.media>';
  const mailFromInternal =
    process.env.MAIL_FROM_INTERNAL ?? process.env.MAIL_FROM ?? 'leads@turm.media';
  const prefix = process.env.LEAD_SUBJECT_PREFIX ?? '[Lead Folien Institut]';
  const replyToBrand = process.env.MAIL_REPLY_TO_BRAND ?? mailToInternal;

  // Logo-URL absolut bestimmen (für Email-Client Rendering)
  // Resend braucht eine absolute URL - fallback auf Vercel-URL aus env
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (payload.page ? new URL(payload.page).origin : 'https://landing-folien-institut.vercel.app');
  const logoUrl = `${baseUrl}/logo.png`;

  if (!apiKey) {
    console.warn('RESEND_API_KEY nicht gesetzt – Lead wurde nur geloggt:');
    console.log(JSON.stringify(payload, null, 2));
    return NextResponse.json({ ok: true, dev: true });
  }

  const resend = new Resend(apiKey);
  const internalSubject = `${prefix} ${payload.variant} · ${c.name}${c.company ? ' (' + c.company + ')' : ''}`;
  const customerSubject = `Ihre Anfrage beim Folien Institut – wir melden uns innerhalb von 24 Stunden`;

  try {
    // Beide Mails parallel senden
    const results = await Promise.allSettled([
      // 1) Interne Mail ans Folien Institut
      resend.emails.send({
        from: mailFromInternal,
        to: mailToInternal,
        replyTo: c.email,
        subject: internalSubject,
        html: buildInternalHtml(payload, logoUrl),
        text: buildInternalText(payload),
      }),
      // 2) Bestätigung an Kunden
      resend.emails.send({
        from: mailFromBrand,
        to: c.email,
        replyTo: replyToBrand,
        subject: customerSubject,
        html: buildCustomerHtml(payload, logoUrl),
        text: buildCustomerText(payload),
      }),
    ]);

    // Wenn die interne Mail durch ist, gilt der Lead als erfasst
    const internalOk = results[0].status === 'fulfilled';
    const customerOk = results[1].status === 'fulfilled';

    if (!internalOk) {
      console.error('Interne Mail Fehler:', results[0].status === 'rejected' ? results[0].reason : '');
      return NextResponse.json({ error: 'Versand fehlgeschlagen' }, { status: 502 });
    }

    if (!customerOk) {
      // Lead ist erfasst, aber Bestätigung an Kunden fehlgeschlagen — nur loggen
      console.warn('Kunden-Bestätigung fehlgeschlagen:', results[1].status === 'rejected' ? results[1].reason : '');
    }

    return NextResponse.json({ ok: true, customerNotified: customerOk });
  } catch (err) {
    console.error('Resend Fehler:', err);
    return NextResponse.json({ error: 'Versand fehlgeschlagen' }, { status: 502 });
  }
}
