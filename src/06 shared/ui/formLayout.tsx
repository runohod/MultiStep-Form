interface Props {
  children: React.ReactNode;
  stepTitle: string;
  currentStep: string;
  onBack?: () => void;
  onNext?: () => void;
}

export const FormLayout = ({ children, stepTitle, currentStep, onBack, onNext }: Props) => {
  return (
    <div className="form-card">
      <header>
        <h1>{stepTitle}</h1>
        <span>{currentStep}</span>
      </header>
      
      <div className="form-content">
        {children} {/* Тот самый пропс, о котором говорил ментор */}
      </div>

      <div className="form-footer">
        {onBack && <button onClick={onBack}>Back</button>}
        <button onClick={onNext}>Continue</button>
      </div>
    </div>
  );
};