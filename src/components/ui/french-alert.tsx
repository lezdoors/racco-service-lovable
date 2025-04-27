
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
      containerClass: "border-france-blue bg-france-blueLight text-france-blue",
      iconComponent: Info,
      iconClass: "text-france-blue",
    },
    warning: {
      containerClass: "border-amber-400 bg-amber-50 text-amber-700",
      iconComponent: AlertTriangle,
      iconClass: "text-amber-400",
    },
    success: {
      containerClass: "border-emerald-400 bg-emerald-50 text-emerald-700",
      iconComponent: Check,
      iconClass: "text-emerald-400",
    },
    error: {
      containerClass: "border-france-coral bg-france-redLight text-france-coral",
      iconComponent: AlertTriangle,
      iconClass: "text-france-coral",
    },
  };

  const { containerClass, iconComponent: IconComponent, iconClass } = variantStyles[variant];

  return (
    <Alert className={cn("relative rounded-lg shadow-sm", containerClass, className)}>
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
