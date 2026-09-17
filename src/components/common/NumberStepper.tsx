import './NumberStepper.css';

interface NumberStepperProps {
  label: string;
  value: number;
  step: number;
  min?: number;
  onChange: (value: number) => void;
}

export function NumberStepper({ label, value, step, min = 0, onChange }: NumberStepperProps) {
  return (
    <div className="number-stepper">
      <span className="number-stepper__label">{label}</span>
      <div className="number-stepper__controls">
        <button
          type="button"
          aria-label={`decrease ${label}`}
          onClick={() => onChange(Math.max(min, round(value - step)))}
        >
          −
        </button>
        <input
          type="number"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
        <button
          type="button"
          aria-label={`increase ${label}`}
          onClick={() => onChange(round(value + step))}
        >
          +
        </button>
      </div>
    </div>
  );
}

function round(n: number): number {
  return Math.round(n * 100) / 100;
}
