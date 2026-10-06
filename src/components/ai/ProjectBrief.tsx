'use client';

import { CheckCircle2 } from 'lucide-react';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { MESSAGE_MAX_LENGTH, NAME_MAX_LENGTH } from '@/lib/contact-schema';
import { FALLBACK_EMAIL } from '@/lib/mailer-constants';
import {
  DESCRIPTION_MIN_LENGTH,
  PROJECT_AREAS,
  PROJECT_TIMELINES,
  SHORT_FIELD_MAX_LENGTH,
} from '@/lib/project-schema';
import styles from './ProjectBrief.module.css';

type Status = { kind: 'idle' } | { kind: 'sending' } | { kind: 'sent' } | { kind: 'error'; message: string };
type FieldKey = keyof typeof EMPTY;
type FieldElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

const EMPTY = { name: '', company: '', email: '', area: '', timeline: '', description: '' };
const GENERIC_ERROR = `Your project brief could not be sent. Please email us at ${FALLBACK_EMAIL}.`;

function errorFrom(body: unknown): string {
  return body && typeof body === 'object' && 'error' in body && typeof body.error === 'string'
    ? body.error
    : GENERIC_ERROR;
}

export default function ProjectBrief() {
  const [fields, setFields] = useState(EMPTY);
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  const update = (key: FieldKey) => (e: ChangeEvent<FieldElement>) =>
    setFields((prev) => ({ ...prev, [key]: e.target.value }));

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus({ kind: 'sending' });
    try {
      const res = await fetch('/api/project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      });
      const body: unknown = await res.json().catch(() => null);
      if (!res.ok) {
        setStatus({ kind: 'error', message: errorFrom(body) });
        return;
      }
      setFields(EMPTY);
      setStatus({ kind: 'sent' });
    } catch {
      setStatus({ kind: 'error', message: GENERIC_ERROR });
    }
  }

  return (
    <section id="project" className={`section section-soft ${styles.section}`}>
      <div className={`container ${styles.grid}`}>
        <div>
          <h2 className="section-title">Describe your project</h2>
          <p className="lead">
            In addition to our standardized services, we develop customized AI solutions tailored to your
            processes, systems and industry requirements.
          </p>
          <p className={styles.direct}>
            Please briefly describe your project and we will get back to you, or contact us at the E-Mail below.
          </p>
          <p className={styles.direct}>
            E-Mail: <a href={`mailto:${FALLBACK_EMAIL}`}>{FALLBACK_EMAIL}</a>
          </p>
        </div>

        <div className={styles.card}>
          {status.kind === 'sent' ? (
            <div className={styles.success} role="status">
              <CheckCircle2 size={36} aria-hidden="true" />
              <h3>Thank you, your message has been sent.</h3>
              <p>We will get back to you as soon as possible.</p>
              <button type="button" className="btn btn-outline" onClick={() => setStatus({ kind: 'idle' })}>
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className={styles.form}>
              <div className={styles.row}>
                <label className={styles.field}>
                  <span>
                    Name <abbr title="required">*</abbr>
                  </span>
                  <input
                    type="text"
                    name="name"
                    autoComplete="name"
                    required
                    maxLength={NAME_MAX_LENGTH}
                    value={fields.name}
                    onChange={update('name')}
                  />
                </label>
                <label className={styles.field}>
                  <span>Company</span>
                  <input
                    type="text"
                    name="company"
                    autoComplete="organization"
                    maxLength={SHORT_FIELD_MAX_LENGTH}
                    value={fields.company}
                    onChange={update('company')}
                  />
                </label>
              </div>

              <div className={styles.row}>
                <label className={styles.field}>
                  <span>
                    Email <abbr title="required">*</abbr>
                  </span>
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    value={fields.email}
                    onChange={update('email')}
                  />
                </label>
                <label className={styles.field}>
                  <span>
                    Timeline <abbr title="required">*</abbr>
                  </span>
                  <select name="timeline" required value={fields.timeline} onChange={update('timeline')}>
                    <option value="" disabled>
                      Select a timeline…
                    </option>
                    {PROJECT_TIMELINES.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className={styles.field}>
                <span>
                  Industry <abbr title="required">*</abbr>
                </span>
                <select name="area" required value={fields.area} onChange={update('area')}>
                  <option value="" disabled>
                    Select an industry…
                  </option>
                  {PROJECT_AREAS.map((a) => (
                    <option key={a.value} value={a.value}>
                      {a.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className={styles.field}>
                <span>
                  Description <abbr title="required">*</abbr>
                </span>
                <textarea
                  name="description"
                  rows={6}
                  required
                  minLength={DESCRIPTION_MIN_LENGTH}
                  maxLength={MESSAGE_MAX_LENGTH}
                  placeholder="Current processes, systems in use, what you would like to automate…"
                  value={fields.description}
                  onChange={update('description')}
                />
              </label>

              {status.kind === 'error' && (
                <p className={styles.error} role="alert">
                  {status.message}
                </p>
              )}

              <button type="submit" className="btn btn-primary" disabled={status.kind === 'sending'}>
                {status.kind === 'sending' ? 'Sending…' : 'Send'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
