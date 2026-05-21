import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

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

function escape(s: string | undefined): string {
  if (!s) return '';
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildHtml(p: Payload): string {
  const rows = p.answers
    .map(
      a =>
        `<tr><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#475569;font-size:13px;">${escape(
          a.question,
        )}</td><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#0f2d52;font-size:14px;">${escape(
          a.label,
        )}${a.tag ? ` <span style="background:#dceffd;color:#1565a0;padding:2px 6px;border-radius:4px;font-size:11px;font-weight:500;margin-left:6px;">${escape(a.tag)}</span>` : ''}</td></tr>`,
    )
    .join('');

  const c = p.contact;

  return `
<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f8fafc;padding:24px 0;">
  <tr><td align="center">
    <table cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;">
      <tr><td style="background:#0F2D52;padding:20px 24px;">
        <p style="margin:0;color:#9fb3c8;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Neuer Lead · ${escape(p.variant)}</p>
        <h1 style="margin:4px 0 0 0;color:#ffffff;font-size:22px;font-weight:600;">${escape(c.name)}</h1>
      </td></tr>
      <tr><td style="padding:24px;">
        <h2 style="margin:0 0 12px 0;color:#0F2D52;font-size:14px;text-transform:uppercase;letter-spacing:0.5px;">Antworten aus dem Funnel</h2>
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
          ${rows}
        </table>

        <h2 style="margin:24px 0 12px 0;color:#0F2D52;font-size:14px;text-transform:uppercase;letter-spacing:0.5px;">Kontaktdaten</h2>
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
          <tr><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#475569;font-size:13px;">Name</td><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#0f2d52;font-size:14px;">${escape(c.name)}</td></tr>
          <tr><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#475569;font-size:13px;">E-Mail</td><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#0f2d52;font-size:14px;"><a href="mailto:${escape(c.email)}" style="color:#1e7fba;text-decoration:none;">${escape(c.email)}</a></td></tr>
          <tr><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#475569;font-size:13px;">Telefon</td><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#0f2d52;font-size:14px;"><a href="tel:${escape(c.phone)}" style="color:#1e7fba;text-decoration:none;">${escape(c.phone)}</a></td></tr>
          ${c.plz ? `<tr><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#475569;font-size:13px;">PLZ</td><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#0f2d52;font-size:14px;">${escape(c.plz)}</td></tr>` : ''}
          ${c.company ? `<tr><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#475569;font-size:13px;">Firma</td><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#0f2d52;font-size:14px;">${escape(c.company)}</td></tr>` : ''}
          ${c.message ? `<tr><td style="padding:8px 12px;color:#475569;font-size:13px;vertical-align:top;">Nachricht</td><td style="padding:8px 12px;color:#0f2d52;font-size:14px;white-space:pre-wrap;">${escape(c.message)}</td></tr>` : ''}
        </table>

        <p style="margin:24px 0 0 0;color:#94a3b8;font-size:11px;line-height:1.5;">
          Seite: ${escape(p.page)}<br>
          Zeitstempel: ${escape(p.ts)}<br>
          Datenschutz: ${c.consent ? '✓ akzeptiert' : '✗ FEHLT'}
        </p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;
}

function buildText(p: Payload): string {
  const lines: string[] = [];
  lines.push(`Neuer Lead aus dem Folien Institut Funnel (${p.variant.toUpperCase()})`);
  lines.push('');
  lines.push('--- Antworten ---');
  for (const a of p.answers) {
    lines.push(`${a.question}: ${a.label}${a.tag ? `  [${a.tag}]` : ''}`);
  }
  lines.push('');
  lines.push('--- Kontakt ---');
  lines.push(`Name:     ${p.contact.name}`);
  if (p.contact.company) lines.push(`Firma:    ${p.contact.company}`);
  lines.push(`E-Mail:   ${p.contact.email}`);
  lines.push(`Telefon:  ${p.contact.phone}`);
  if (p.contact.plz) lines.push(`PLZ:      ${p.contact.plz}`);
  if (p.contact.message) lines.push(`Nachricht:\n${p.contact.message}`);
  lines.push('');
  lines.push(`Seite: ${p.page ?? ''}`);
  lines.push(`Zeit:  ${p.ts ?? ''}`);
  return lines.join('\n');
}

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
  const mailTo = process.env.MAIL_TO ?? 'hallo@turm.media';
  const mailFrom = process.env.MAIL_FROM ?? 'leads@turm.media';
  const prefix = process.env.LEAD_SUBJECT_PREFIX ?? '[Lead Folien Institut]';

  if (!apiKey) {
    // Dev-Fallback: Log und ok zurueck (Tom kann lokal ohne Resend testen)
    console.warn('RESEND_API_KEY nicht gesetzt – Lead wurde nur geloggt:');
    console.log(JSON.stringify(payload, null, 2));
    return NextResponse.json({ ok: true, dev: true });
  }

  const resend = new Resend(apiKey);
  const subject = `${prefix} ${payload.variant} · ${c.name}`;

  try {
    await resend.emails.send({
      from: mailFrom,
      to: mailTo,
      replyTo: c.email,
      subject,
      html: buildHtml(payload),
      text: buildText(payload),
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Resend Fehler:', err);
    return NextResponse.json({ error: 'Versand fehlgeschlagen' }, { status: 502 });
  }
}
