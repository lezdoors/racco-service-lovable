
import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

const StepIndicator = ({ steps, currentStep }: StepIndicatorProps) => {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-3xl">
        <ol className="grid grid-cols-1 sm:grid-cols-4">
          {steps.map((step, index) => (
            <li
              key={index}
              className={cn(
                "relative flex items-start flex-col sm:flex-row justify-center text-center",
                {
                  "text-enedis-blue": index <= currentStep,
                  "text-enedis-gray-400": index > currentStep,
                }
              )}
            >
              {/* Step connector */}
              {index > 0 && (
                <div 
                  className={cn(
                    "hidden sm:block absolute top-5 left-0 h-0.5 w-full -translate-x-1/2", 
                    {
                      "bg-enedis-blue": index <= currentStep,
                      "bg-enedis-gray-200": index > currentStep,
                    }
                  )}
                  aria-hidden="true" 
                />
              )}
              
              <div className="flex flex-col items-center">
                {/* Step indicator */}
                <div 
                  className={cn(
                    "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 mb-2", 
                    {
                      "border-enedis-blue bg-enedis-blue text-white": index === currentStep,
                      "border-enedis-blue bg-white text-enedis-blue": index < currentStep,
                      "border-enedis-gray-300 bg-white text-enedis-gray-500": index > currentStep,
                    }
                  )}
                >
                  {index < currentStep ? (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="text-sm">{index + 1}</span>
                  )}
                </div>
                
                {/* Step name */}
                <span className={cn("text-xs sm:text-sm font-medium mt-1", {
                  "text-enedis-blue": index <= currentStep,
                  "text-enedis-gray-500": index > currentStep,
                })}>
                  {step}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default StepIndicator;
