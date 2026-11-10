import { useEffect, useId, useState } from 'react';
import { withBase } from '@shared/lib/paths';

const LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
  { href: 'cv', label: 'CV' },
] as const;

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className="mobile-nav">
      <button
        type="button"
        className="icon-btn mobile-nav__toggle"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="mobile-nav__icon" aria-hidden="true">
          <span className={open ? 'is-open' : undefined} />
          <span className={open ? 'is-open' : undefined} />
          <span className={open ? 'is-open' : undefined} />
        </span>
      </button>

      {open ? (
        <div className="mobile-nav__scrim" role="presentation" onClick={() => setOpen(false)}>
          <nav
            id={panelId}
            className="mobile-nav__panel"
            aria-label="Mobile"
            onClick={(event) => event.stopPropagation()}
          >
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={withBase(link.href)}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </div>
  );
}
