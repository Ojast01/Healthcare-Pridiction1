import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useRef } from 'react';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function Card({ className, children, ...props }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current || !className?.includes('tilt-card')) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Calculate mouse position relative to card center, normalized between -1 and 1
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    
    // Max tilt angle (degrees)
    const maxTilt = 8;
    const tiltX = -(y - yc) / yc * maxTilt;
    const tiltY = (x - xc) / xc * maxTilt;
    
    // Update CSS Custom Properties
    card.style.setProperty('--tilt-x', `${tiltX}deg`);
    card.style.setProperty('--tilt-y', `${tiltY}deg`);
    
    // Sheen coordinates
    const sheenX = (x / rect.width) * 100;
    const sheenY = (y / rect.height) * 100;
    card.style.setProperty('--sheen-x', `${sheenX}%`);
    card.style.setProperty('--sheen-y', `${sheenY}%`);
    card.style.setProperty('--sheen-opacity', '0.12');
  };

  const handleMouseLeave = () => {
    if (!cardRef.current || !className?.includes('tilt-card')) return;
    const card = cardRef.current;
    card.style.setProperty('--tilt-x', '0deg');
    card.style.setProperty('--tilt-y', '0deg');
    card.style.setProperty('--sheen-opacity', '0');
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("bg-white/86 dark:bg-slate-900/82 border border-white/70 dark:border-slate-700/80 neo-card rounded-lg overflow-hidden relative transition-all duration-300", className)} 
      {...props}
    >
      {className?.includes('tilt-card') && (
        <div 
          className="pointer-events-none absolute inset-0 mix-blend-overlay transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 200px at var(--sheen-x, 50%) var(--sheen-y, 50%), rgba(255, 255, 255, 0.4), transparent)`,
            opacity: `var(--sheen-opacity, 0)`,
            zIndex: 10,
          }}
        />
      )}
      <div className="relative z-1">
        {children}
      </div>
    </div>
  );
}

export function CardHeader({ className, children, ...props }) {
  return (
    <div className={cn("px-6 py-4 border-b border-slate-100 dark:border-slate-700/50", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }) {
  return (
    <h3 className={cn("text-lg font-semibold text-slate-800 dark:text-white", className)} {...props}>
      {children}
    </h3>
  );
}

export function CardContent({ className, children, ...props }) {
  return (
    <div className={cn("p-6", className)} {...props}>
      {children}
    </div>
  );
}
