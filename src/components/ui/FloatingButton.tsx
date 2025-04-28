
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
        className="bg-enedis-green hover:bg-green-600 text-enedis-gray-800 font-bold shadow-lg hover:shadow-xl transition-all rounded-full"
        asChild
      >
        <Link to={href}>
          Faire ma demande
        </Link>
      </Button>
    </div>
  );
};

export default FloatingButton;
