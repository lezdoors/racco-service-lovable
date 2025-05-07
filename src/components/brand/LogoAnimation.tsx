
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
        const wirePath = svgDoc.querySelector('path[stroke="url(#flow-gradient)"], path[stroke="#1EAEDB"], path[stroke="white"]');
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
          animation.setAttribute('dur', '1.5s');
          animation.setAttribute('repeatCount', 'indefinite');
          el.appendChild(animation);
        });
        
        // Animate power outlets - updated with more vibrant glow
        const outlets = svgDoc.querySelectorAll('rect[fill="#50C878"], rect[fill="white"]');
        outlets.forEach((outlet, index) => {
          const animation = document.createElementNS("http://www.w3.org/2000/svg", "animate");
          animation.setAttribute('attributeName', 'opacity');
          animation.setAttribute('values', '1;0.7;1');
          animation.setAttribute('dur', `${1.2 + index * 0.4}s`);
          animation.setAttribute('repeatCount', 'indefinite');
          outlet.appendChild(animation);
        });
        
        // Animate energy indicators - new effect
        const energyIndicators = svgDoc.querySelectorAll('circle[fill="#FFD600"], circle[fill="white"]');
        energyIndicators.forEach((indicator) => {
          const pulseAnimation = document.createElementNS("http://www.w3.org/2000/svg", "animate");
          pulseAnimation.setAttribute('attributeName', 'r');
          pulseAnimation.setAttribute('values', '2.5;2;2.5');
          pulseAnimation.setAttribute('dur', '2s');
          pulseAnimation.setAttribute('repeatCount', 'indefinite');
          indicator.appendChild(pulseAnimation);
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

  // Create a div wrapper that can receive clicks with proper sizing
  return (
    <div 
      ref={ref || containerRef}
      className={`${className} cursor-pointer relative inline-flex`}
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
        className="w-full h-full"
        aria-hidden="true"
      />
      {/* Fixed overlay that matches SVG dimensions */}
      <div 
        className="absolute top-0 left-0 w-full h-full"
        aria-hidden="true"
      />
    </div>
  );
});

LogoAnimation.displayName = 'LogoAnimation';

export default LogoAnimation;
