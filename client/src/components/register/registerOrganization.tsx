import RegisterUser from './registerUser.tsx';
import ProcessBar from '../processBar/processBar.tsx';
import './register.css';
import { useRef } from 'react';
import InsertLogo from '../insertLogo/insertLogo.tsx';
import OrganizationForm from './organizationForm.tsx';

export default function RegisterOrganization() {
    const step1Ref = useRef(null);
    const step2Ref = useRef(null);
    const step3Ref = useRef(null);
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

    const step3Validator = () => {
        if (step3Ref.current) {
            // @ts-expect-error trigger submit is not in ref
            const result = step3Ref.current.triggerSubmit();
            console.log('result', result);
            return result;
        }
    };
    const step1Content = () => <RegisterUser onlyUser={false} ref={step1Ref} />;
    const step2Content = () => <InsertLogo ref={step2Ref} />;
    const step3Content = () => <OrganizationForm ref={step3Ref} />;

    return (
        <div className="register-organization">
            <ProcessBar
                config={[
                    {
                        label: 'User Details',
                        component: step1Content,
                        functionInNextStep: step1Validator,
                    },
                    {
                        label: 'Insert Logo',
                        component: step2Content,
                        functionInNextStep: step2Validator,
                    },
                    {
                        label: 'Organization Details',
                        component: step3Content,
                        functionInNextStep: step3Validator,
                    },
                    {
                        label: 'Finish',
                        component: () => <div>Finish</div>,
                        functionInNextStep: () => true,
                    },
                ]}
            />
        </div>
    );
}
