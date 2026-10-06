import type { Metadata } from 'next';
import { Globe, Mail, MapPin } from 'lucide-react';
import PageHero from '@/components/PageHero';
import { CONTACT } from '@/content/site';
import ContactForm from './ContactForm';
import styles from './contact.module.css';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact ALLR ENERGY. Briefly describe the task we may support you with.',
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact"
        lead="Please briefly describe the task we may support you with or contact the E-Mail provided below."
      />

      <main className="section">
        <div className={`container ${styles.grid}`}>
          <div className={styles.formCard}>
            <ContactForm />
          </div>

          <aside className={styles.details} aria-label="Contact details">
            <h2>Our Contact Details</h2>
            <ul>
              <li>
                <span className={styles.icon}>
                  <Mail size={18} aria-hidden="true" />
                </span>
                <div>
                  <strong>Email</strong>
                  <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
                </div>
              </li>
              <li>
                <span className={styles.icon}>
                  <MapPin size={18} aria-hidden="true" />
                </span>
                <div>
                  <strong>Postal address</strong>
                  <span>
                    ALLR ENERGY
                    <br />
                    {CONTACT.postal.map((line) => (
                      <span key={line}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </span>
                </div>
              </li>
              <li>
                <span className={styles.icon}>
                  <Globe size={18} aria-hidden="true" />
                </span>
                <div>
                  <strong>Website</strong>
                  <a href={`https://${CONTACT.website}`}>{CONTACT.website}</a>
                </div>
              </li>
            </ul>
          </aside>
        </div>
      </main>
    </>
  );
}
