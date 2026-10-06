'use client';

import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { MESSAGE_MAX_LENGTH, NAME_MAX_LENGTH } from '@/lib/contact-schema';
import styles from './contact.module.css';

type Status = { kind: 'idle' } | { kind: 'sending' } | { kind: 'sent' } | { kind: 'error'; message: string };

const EMPTY = { name: '', email: '', message: '' };
const GENERIC_ERROR = 'Your message could not be sent. Please email us at info@allr-energy.com.';

function errorFrom(body: unknown): string {
  return body && typeof body === 'object' && 'error' in body && typeof body.error === 'string'
    ? body.error
    : GENERIC_ERROR;
}

export default function ContactForm() {
  const [fields, setFields] = useState(EMPTY);
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  const update = (key: keyof typeof EMPTY) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFields((prev) => ({ ...prev, [key]: e.target.value }));

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus({ kind: 'sending' });
    try {
      const res = await fetch('/api/contact', {
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

  if (status.kind === 'sent') {
    return (
      <div className={styles.success} role="status">
        <CheckCircle2 size={40} aria-hidden="true" />
        <h2>Thank you, your message has been sent.</h2>
        <p>We will get back to you as soon as possible.</p>
        <button type="button" className="btn btn-outline" onClick={() => setStatus({ kind: 'idle' })}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={styles.form} noValidate={false}>
      <div className={styles.row}>
        <label className={styles.field}>
          <span>Name</span>
          <input
            type="text"
            name="name"
            autoComplete="name"
            maxLength={NAME_MAX_LENGTH}
            value={fields.name}
            onChange={update('name')}
          />
        </label>
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
      </div>
      <label className={styles.field}>
        <span>
          How can we support you? <abbr title="required">*</abbr>
        </span>
        <textarea
          name="message"
          rows={7}
          required
          maxLength={MESSAGE_MAX_LENGTH}
          placeholder="Please briefly describe the task we may support you with…"
          value={fields.message}
          onChange={update('message')}
        />
      </label>

      {status.kind === 'error' && (
        <p className={styles.error} role="alert">
          {status.message}
        </p>
      )}

      <button type="submit" className="btn btn-primary" disabled={status.kind === 'sending'}>
        {status.kind === 'sending' ? 'Sending…' : 'Send message'} <ArrowRight size={18} aria-hidden="true" />
      </button>
    </form>
  );
}
