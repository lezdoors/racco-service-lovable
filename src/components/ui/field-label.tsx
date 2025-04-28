
import React from "react";
import { Info } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FieldLabelProps {
  htmlFor?: string;
  label: string;
  tooltip: string;
  required?: boolean;
  className?: string;
}

export const FieldLabel: React.FC<FieldLabelProps> = ({
  htmlFor,
  label,
  tooltip,
  required = false,
  className,
}) => {
  return (
    <div className="flex items-center gap-1.5">
      <Label 
        htmlFor={htmlFor} 
        className={`${required ? "required-field" : ""} ${className || ""}`}
      >
        {label}
      </Label>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Info className="h-4 w-4 text-gray-400 hover:text-gray-600 cursor-help" />
          </TooltipTrigger>
          <TooltipContent className="max-w-xs text-sm">
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
