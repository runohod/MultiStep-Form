import { useState } from 'react';
import MultiForm from '@/03_widgets/multiForm/ui/multiForm';
// import { MultiFormStep-1 } from '@/03_widgets/multiForm/ui/MultiFormStep1';
// import { MultiFormStep-2 } from '@/03_widgets/multiForm/ui/MultiFormStep2';
// import { MultiFormStep-3 } from '@/03_widgets/multiForm/ui/MultiFormStep3';

export const FormPage = () => {
    const [step, setStep] = useState(1);

    return (
        <MultiForm 
            stepNumber={step}
            title={step === 1 ? "Personal Info" : step === 2 ? "Our services" : "Payment"}         
            // subTitle={title}
        >
            {/* {step === 1 && <MultiFormStep-1 />}
            {step === 2 && <MultiFormStep-2 />}
            {step === 3 && <MultiFormStep-3 />} */}
        </MultiForm>
    );
};