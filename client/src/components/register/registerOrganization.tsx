import RegisterUser from './registerUser.tsx';
import ProcessBar from '../processBar/processBar.tsx';
import './register.css';
import { useRef } from 'react';
import InsertLogo from '../insertLogo/insertLogo.tsx';

export default function RegisterOrganization() {
    const step1Ref = useRef(null);
    const step2Ref = useRef(null);

    const step1Validator = () => {
        if (step1Ref.current) {
            // @ts-expect-error trigger submit is not in ref
            const result = step1Ref.current.triggerSubmit();
            console.log('result', result);
            return result;
        }
    };
    const step2Validator = () => {
        if (step2Ref.current) {
            // @ts-expect-error trigger submit is not in ref
            const result = step2Ref.current.triggerSubmit();
            console.log('result', result);
            return result;
        }
    };
    const step1Content = () => <RegisterUser onlyUser={false} ref={step1Ref} />;
    const step2Content = () => <InsertLogo ref={step2Ref} />;
    const step3Content = () => <h1>Step 3 Content</h1>;

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
                        functionInNextStep: step2Validator,
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
