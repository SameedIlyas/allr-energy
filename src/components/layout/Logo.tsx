import Image from 'next/image';
import Link from 'next/link';
import styles from './Logo.module.css';

interface LogoProps {
  /** Compact variant hides the tagline (used in tight spaces). */
  compact?: boolean;
  className?: string;
}

export default function Logo({ compact = false, className = '' }: LogoProps) {
  return (
    <Link href="/" className={`${styles.logo} ${className}`.trim()} aria-label="ALLR ENERGY home">
      <span className={styles.mark}>
        <Image src="/assets/logo-emblem.png" alt="" width={216} height={216} quality={95} />
      </span>
      <span className={styles.words}>
        <span className={styles.name}>ALLR ENERGY</span>
        {!compact && <span className={styles.tagline}>Profitable · Sustainable</span>}
      </span>
    </Link>
  );
}
