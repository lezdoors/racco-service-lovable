
import { useEffect, useRef } from 'react';

interface LogoAnimationProps {
  variant?: 'full' | 'mono' | 'white' | 'mark';
  className?: string;
  animate?: boolean;
}

const LogoAnimation = ({
  variant = 'full',
  className = '',
  animate = true
}: LogoAnimationProps) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!animate || !svgRef.current) return;

    // Add animation class to the flowing line
    const flowLine = svgRef.current.querySelector('path[stroke*="url(#flow-gradient)"]');
    if (flowLine) {
      flowLine.classList.add('animate-pulse');
    }
  }, [animate]);

  const logoPath = `/brand/connect-enedis-${
    variant === 'full' ? 'logo' :
    variant === 'mono' ? 'logo-mono' :
    variant === 'white' ? 'logo-white' :
    'mark'
  }.svg`;

  return (
    <object
      ref={svgRef}
      data={logoPath}
      type="image/svg+xml"
      className={`w-auto h-full ${className}`}
      aria-label="Connect Enedis Logo"
    />
  );
};

export default LogoAnimation;
