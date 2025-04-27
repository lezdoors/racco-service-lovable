
import { AlertTriangle, Info, Check, X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

interface FrenchAlertProps {
  title: string;
  description: string;
  variant: "info" | "warning" | "success" | "error";
  className?: string;
  onClose?: () => void;
}

export function FrenchAlert({ 
  title, 
  description, 
  variant, 
  className,
  onClose
}: FrenchAlertProps) {
  const variantStyles = {
    info: {
      containerClass: "border-france-navy bg-france-blueLight text-france-navy",
      iconComponent: Info,
      iconClass: "text-france-navy",
    },
    warning: {
      containerClass: "border-orange-500 bg-orange-50 text-orange-800",
      iconComponent: AlertTriangle,
      iconClass: "text-orange-500",
    },
    success: {
      containerClass: "border-green-500 bg-green-50 text-green-800",
      iconComponent: Check,
      iconClass: "text-green-500",
    },
    error: {
      containerClass: "border-france-red bg-france-redLight text-france-red",
      iconComponent: AlertTriangle,
      iconClass: "text-france-red",
    },
  };

  const { containerClass, iconComponent: IconComponent, iconClass } = variantStyles[variant];

  return (
    <Alert className={cn("relative", containerClass, className)}>
      <IconComponent className={cn("h-5 w-5", iconClass)} />
      <AlertTitle className="font-playfair font-semibold text-inherit">{title}</AlertTitle>
      <AlertDescription className="text-inherit">{description}</AlertDescription>
      
      {onClose && (
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 hover:bg-black/5 rounded-full p-1"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </Alert>
  );
}
