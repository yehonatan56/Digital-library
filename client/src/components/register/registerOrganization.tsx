import StepProgressBar from 'react-step-progress';
import useRegister from './useRegister.tsx';
import RegisterUser from './registerUser.tsx';
import 'react-step-progress/dist/index.css';
import './register.css';

const step1Content = <RegisterUser />;
const step2Content = <h1>Step 2 Content</h1>;
const step3Content = <h1>Step 3 Content</h1>;

function onFormSubmit() {}
// todo: complete this file
export default function RegisterOrganization() {
    const {} = useRegister();
    return (
        <div className="register-organization">
            <StepProgressBar
                startingStep={0}
                onSubmit={onFormSubmit}
                steps={[
                    {
                        label: 'Step 1',
                        subtitle: '10%',
                        name: 'step 1',
                        content: step1Content,
                        validator: step1Validator,
                    },
                    {
                        label: 'Step 2',
                        subtitle: '50%',
                        name: 'step 2',
                        content: step2Content,
                    },
                    {
                        label: 'Step 3',
                        subtitle: '100%',
                        name: 'step 3',
                        content: step3Content,
                    },
                ]}
            />
        </div>
    );
}
