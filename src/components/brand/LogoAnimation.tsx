
import { useEffect, useRef, forwardRef } from 'react';

interface LogoAnimationProps {
  variant?: 'full' | 'mono' | 'white' | 'mark';
  className?: string;
  animate?: boolean;
  onClick?: () => void;
}

const LogoAnimation = forwardRef<HTMLDivElement, LogoAnimationProps>(({
  variant = 'full',
  className = '',
  animate = true,
  onClick
}, ref) => {
  const objectRef = useRef<HTMLObjectElement>(null);

  useEffect(() => {
    if (!animate || !objectRef.current) return;

    // We need to wait for the SVG to load in the object element
    objectRef.current.onload = () => {
      try {
        // Access the SVG document inside the object
        const svgDoc = objectRef.current?.contentDocument;
        if (!svgDoc) return;

        // Find and animate the flowing line path inside the SVG document
        const flowLine = svgDoc.querySelector('path[stroke*="url(#flow-gradient)"]');
        if (flowLine) {
          flowLine.classList.add('animate-pulse');
        }
      } catch (error) {
        console.error("Error accessing SVG content:", error);
      }
    };
  }, [animate]);

  const logoPath = `/brand/connect-enedis-${
    variant === 'full' ? 'logo' :
    variant === 'mono' ? 'logo-mono' :
    variant === 'white' ? 'logo-white' :
    'mark'
  }.svg`;

  // Create a div wrapper that can receive clicks
  return (
    <div 
      ref={ref}
      className={`${className} cursor-pointer`} 
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick?.();
        }
      }}
    >
      <object
        ref={objectRef}
        data={logoPath}
        type="image/svg+xml"
        className="w-auto h-full"
        aria-label="Connect Enedis Logo"
        // This prevents the object from capturing clicks
        style={{ pointerEvents: 'none' }}
      />
    </div>
  );
});

LogoAnimation.displayName = 'LogoAnimation';

export default LogoAnimation;
