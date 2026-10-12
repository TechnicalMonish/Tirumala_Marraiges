import { cn } from '../../lib/cn.js';

// Decorative ornaments for the subhalekha / zari world. All are aria-hidden.

export function Lotus({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 14" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M12 .8c2.3 2.7 2.6 6.6.6 10.4h-1.2C9.4 7.4 9.7 3.5 12 .8Z" />
      <path d="M10.6 11.4C7.2 11 4.4 8.9 3 5.7c3.4.3 6 2.4 7.6 5.7Z" />
      <path d="M13.4 11.4c3.4-.4 6.2-2.5 7.6-5.7-3.4.3-6 2.4-7.6 5.7Z" />
      <path d="M5.5 12.6h13v.9h-13z" />
    </svg>
  );
}

// Pulli kolam rosette: a 3x3 dot grid with a looping line around it.
export function Kolam({ className }) {
  const dots = [6, 12, 18];
  return (
    <svg className={cn('kolam', className)} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      {dots.map((y) => dots.map((x) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.15" fill="currentColor" />))}
      <path
        d="M12 2.6c2.4 0 3.2 2.1 3.2 3.4S17.6 8.8 18 8.8c1.3 0 3.4.8 3.4 3.2s-2.1 3.2-3.4 3.2-2.8 2.4-2.8 2.8c0 1.3-.8 3.4-3.2 3.4s-3.2-2.1-3.2-3.4S6.4 15.2 6 15.2c-1.3 0-3.4-.8-3.4-3.2S4.7 8.8 6 8.8s2.8-2.4 2.8-2.8c0-1.3.8-3.4 3.2-3.4Z"
        stroke="currentColor"
        strokeWidth=".9"
      />
    </svg>
  );
}

export function ZariBand({ className }) {
  return <div className={cn('zari', className)} aria-hidden="true" />;
}

// Section label set as a lotus caption rule beneath its heading.
export function CaptionRule({ label, align = 'center', tone = 'light', as: Tag = 'p', className, id }) {
  return (
    <Tag
      id={id}
      className={cn(
        'caption-rule t-label',
        align === 'center' && 'caption-rule--center',
        tone === 'dark' && 'caption-rule--dark',
        className
      )}
    >
      {align === 'center' && <span className="caption-rule__line" aria-hidden="true" />}
      {align === 'center' && <Lotus className="caption-rule__lotus" />}
      <span className="caption-rule__label">{label}</span>
      <Lotus className="caption-rule__lotus" />
      <span className="caption-rule__line" aria-hidden="true" />
    </Tag>
  );
}

export function Wordmark({ className }) {
  return (
    <span className={cn('wordmark', className)}>
      <span className="wordmark__name">TIRUMALA</span>
      <span className="wordmark__sub">MARRIAGE SERVICE &amp; SUPPLIERS</span>
    </span>
  );
}
