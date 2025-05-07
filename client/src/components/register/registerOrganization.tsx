import RegisterUser from './registerUser.tsx';
import ProcessBar from '../processBar/processBar.tsx';
import './register.css';
import { useRef } from 'react';

export default function RegisterOrganization() {
    const step1Ref = useRef(null);

    const step1Validator = () => {
        if (step1Ref.current) {
            // @ts-ignore
            step1Ref.current.triggerSubmit();
        }
    };
    const step2Content = () => <h1>Step 2 Content</h1>;

    const step3Content = () => <h1>Step 3 Content</h1>;
    const step1Content = () => <RegisterUser onlyUser={false} ref={step1Ref} />;
    return (
        <div className="register-organization">
            <ProcessBar
                config={[
                    {
                        label: 'Step 1',
                        component: step1Content,
                        functionInNextStep: step1Validator,
                    },
                    {
                        label: 'Step 2',
                        component: step2Content,
                    },
                    {
                        label: 'Step 3',
                        component: step3Content,
                    },
                ]}
            />
        </div>
    );
}
