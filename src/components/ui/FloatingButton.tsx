
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface FloatingButtonProps {
  className?: string;
  href: string;
}

const FloatingButton = ({ className, href }: FloatingButtonProps) => {
  return (
    <div className={cn(
      "fixed bottom-6 right-6 z-50", 
      className
    )}>
      <Button
        size="lg"
        className="bg-france-red hover:bg-red-700 text-white font-bold shadow-lg hover:shadow-xl transition-all rounded-full flex items-center gap-2"
        asChild
      >
        <Link to={href}>
          Faire ma demande
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
};

export default FloatingButton;
