import { useState } from 'react';

export default function ProcessBar({
    config,
}: {
    config: {
        label: string;
        component: any;
        functionInNextStep?: () => void;
    }[];
}) {
    const [step, setStep] = useState(0);
    return (
        <div className="process-bar">
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
                <button onClick={() => setStep((prev) => Math.max(prev - 1, 0))} disabled={step === 0}>
                    Previous
                </button>
                <button
                    onClick={() => {
                        if (config[step].functionInNextStep?.())
                            setStep((prev) => Math.min(prev + 1, config.length - 1));
                    }}
                    disabled={step === config.length - 1}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
