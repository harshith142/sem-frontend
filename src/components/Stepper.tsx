interface StepperProps {
  currentStep: number;
}

const steps = ["Setup & Analysis", "Keyword Research", "Campaign Structure"];

export default function Stepper({ currentStep }: StepperProps) {
  return (
    <div className="flex justify-between mb-6">
      {steps.map((label, i) => (
        <div key={i} className="flex-1 text-center">
          <div
            className={`p-2 rounded-full w-8 h-8 mx-auto mb-1 flex items-center justify-center text-sm font-medium ${
              currentStep === i + 1
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {i + 1}
          </div>
          <p
            className={`text-sm ${
              currentStep === i + 1 ? "font-bold text-primary" : "text-muted-foreground"
            }`}
          >
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}