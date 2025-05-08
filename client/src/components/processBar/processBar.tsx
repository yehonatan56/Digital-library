import { useState } from 'react';
import './processBar.css';

interface ProcessBarProps {
    config: {
        label: string;
        component: any;
        functionInNextStep?: () => boolean;
    }[];
}
export default function ProcessBar({ config }: ProcessBarProps) {
    const [step, setStep] = useState(0);
    return (
        <div className="process-bar">
            <div className="steps">
                <div className="steps-line">
                    {config.map((item, index) => (
                        <div key={index} className={`step ${index <= step ? 'active' : ''}`}>
                            <div className={`circle ${index <= step ? 'active' : ''}`}>{index + 1}</div>
                            <h2 className="label">{item.label}</h2>
                        </div>
                    ))}
                </div>
                {config.map(
                    (item, index) =>
                        index === step && (
                            <div key={index} className={`step ${index === step ? 'active' : ''}`}>
                                <h2 className="label">{item.label}</h2>
                                {index === step && <item.component />}
                            </div>
                        )
                )}

                <div className="buttons">
                    <button onClick={() => setStep((prev) => (prev > 0 ? prev - 1 : prev))} disabled={step === 0}>
                        Previous
                    </button>
                    <button
                        onClick={() => {
                            if (config[step].functionInNextStep) {
                                config[step].functionInNextStep() &&
                                    setStep((prev) => (prev < config.length - 1 ? prev + 1 : prev));
                            }
                        }}
                        disabled={step === config.length - 1}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
