
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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animate || !objectRef.current) return;

    // We need to wait for the SVG to load in the object element
    objectRef.current.onload = () => {
      try {
        // Access the SVG document inside the object
        const svgDoc = objectRef.current?.contentDocument;
        if (!svgDoc) return;

        // Find and animate elements in the SVG
        const lightBulb = svgDoc.querySelector('ellipse[fill="#FFF9C4"]');
        if (lightBulb) {
          lightBulb.classList.add('animate-pulse');
        }
        
        const electricRays = svgDoc.querySelectorAll('path[stroke="#FFD600"], path[stroke="white"]');
        electricRays.forEach(ray => {
          ray.classList.add('animate-pulse');
        });
      } catch (error) {
        console.error("Error accessing SVG content:", error);
      }
    };
  }, [animate]);

  const logoPath = `/brand/${
    variant === 'full' ? 'sre-connect-logo' :
    variant === 'mono' ? 'sre-connect-logo' :
    variant === 'white' ? 'sre-connect-logo-white' :
    'sre-connect-mark'
  }.svg`;

  // Improved handling for click events 
  const handleClick = (e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => {
    if (onClick) {
      e.preventDefault();
      e.stopPropagation();
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick(e);
    }
  };

  // Create a div wrapper that can receive clicks
  return (
    <div 
      ref={ref || containerRef}
      className={`${className} cursor-pointer relative`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label="Logo Raccordement Connect"
    >
      <object
        ref={objectRef}
        data={logoPath}
        type="image/svg+xml"
        className="w-auto h-full pointer-events-none"
        aria-hidden="true"
      />
      {/* Invisible overlay to ensure clicks work everywhere on the logo */}
      <div 
        className="absolute inset-0" 
        aria-hidden="true"
      />
    </div>
  );
});

LogoAnimation.displayName = 'LogoAnimation';

export default LogoAnimation;
