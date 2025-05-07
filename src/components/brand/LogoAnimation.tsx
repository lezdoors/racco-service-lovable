
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
        const wirePath = svgDoc.querySelector('path[stroke="url(#flow-gradient)"], path[stroke="#0063AF"], path[stroke="white"]');
        if (wirePath) {
          // Add a pulsing animation to the wire
          wirePath.setAttribute('stroke-dasharray', '4,2');
          wirePath.setAttribute('class', 'animate-pulse');
        }
        
        // Animate lightning elements if they exist
        const lightningElements = svgDoc.querySelectorAll('path[class="animate-pulse"]');
        lightningElements.forEach(el => {
          // Add more dynamic animation
          el.setAttribute('opacity', '0.8');
          const animation = document.createElementNS("http://www.w3.org/2000/svg", "animate");
          animation.setAttribute('attributeName', 'opacity');
          animation.setAttribute('values', '0.8;0.4;0.8');
          animation.setAttribute('dur', '2s');
          animation.setAttribute('repeatCount', 'indefinite');
          el.appendChild(animation);
        });
        
        // Animate power outlets
        const outlets = svgDoc.querySelectorAll('rect[fill="#94C11F"], rect[fill="white"]');
        outlets.forEach((outlet, index) => {
          const animation = document.createElementNS("http://www.w3.org/2000/svg", "animate");
          animation.setAttribute('attributeName', 'opacity');
          animation.setAttribute('values', '1;0.7;1');
          animation.setAttribute('dur', `${1.5 + index * 0.5}s`);
          animation.setAttribute('repeatCount', 'indefinite');
          outlet.appendChild(animation);
        });
      } catch (error) {
        console.error("Error accessing SVG content:", error);
      }
    };
  }, [animate]);

  const logoPath = `/brand/${
    variant === 'full' ? 'sre-connect-logo' :
    variant === 'mono' ? 'sre-connect-logo-mono' :
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
