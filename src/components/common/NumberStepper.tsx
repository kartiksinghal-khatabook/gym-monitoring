import { useEffect, useState } from 'react';
import './NumberStepper.css';

interface NumberStepperProps {
  label: string;
  value: number;
  step: number;
  min?: number;
  onChange: (value: number) => void;
}

export function NumberStepper({ label, value, step, min = 0, onChange }: NumberStepperProps) {
  // The input keeps its own text so a trailing "." or "12.5"-in-progress isn't
  // clobbered by re-rendering the numeric value back as "12" mid-keystroke.
  const [text, setText] = useState(() => String(value));

  useEffect(() => {
    const parsed = parseFloat(text);
    // Only resync when the current text already resolves to a *different*
    // number than the new value (a real external change, e.g. a stepper
    // button or switching exercise). A NaN/empty/in-progress text (like a
    // bare "12.") means the user is mid-edit — leave it alone.
    if (!Number.isNaN(parsed) && parsed !== value) {
      setText(String(value));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  function handleTextChange(next: string) {
    setText(next);
    const parsed = parseFloat(next);
    if (!Number.isNaN(parsed)) onChange(parsed);
  }

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
          step="any"
          value={text}
          onChange={(e) => handleTextChange(e.target.value)}
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
