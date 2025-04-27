
import { Button } from "@/components/ui/button";

interface FranceConnectButtonProps {
  onLogin?: () => void;
  className?: string;
  size?: "sm" | "default" | "lg";
}

export function FranceConnectButton({ 
  onLogin, 
  className, 
  size = "default" 
}: FranceConnectButtonProps) {
  const handleClick = () => {
    if (onLogin) {
      onLogin();
    } else {
      console.log("FranceConnect login requested - integration pending");
    }
  };

  return (
    <Button
      className={`bg-france-navy hover:bg-blue-900 text-white flex items-center gap-2 ${className}`}
      onClick={handleClick}
      size={size}
    >
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 25 25" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="mr-1"
      >
        <rect x="0" y="0" width="25" height="25" fill="#FFFFFF" rx="4" />
        <path d="M5.14 12.5L9.14 8.5H13.14L9.14 12.5H5.14Z" fill="#E1000F"/>
        <path d="M9.14 12.5L13.14 8.5H17.14L13.14 12.5H9.14Z" fill="#FFFFFF"/>
        <path d="M13.14 12.5L17.14 8.5H21.14L17.14 12.5H13.14Z" fill="#00548B"/>
        <path d="M5.14 12.5L9.14 16.5H13.14L9.14 12.5H5.14Z" fill="#E1000F"/>
        <path d="M9.14 12.5L13.14 16.5H17.14L13.14 12.5H9.14Z" fill="#FFFFFF"/>
        <path d="M13.14 12.5L17.14 16.5H21.14L17.14 12.5H13.14Z" fill="#00548B"/>
      </svg>
      S'identifier avec FranceConnect
    </Button>
  );
}
