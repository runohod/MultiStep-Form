import { useFormStore } from '@/05_entities/store/useFormStore';
import React, { type JSX } from 'react';
import clsx from 'clsx';
import { LineRounded } from '@/06_shared/icons';
import styles from './multiForm.module.scss';

interface MultiFormProps { 
    title: string;
    subTitle: string;
    children: React.ReactNode;
    stepNumber: number;
    onNext: () => void;
    onBack: () => void;
    onStepClick: (stepId: number) => void;
    stepsData: {
        id: number;
        label: string;
        component: JSX.Element;
    }[];
}

const MultiForm: React.FC<MultiFormProps> = ({ 
    title, subTitle, children, stepNumber, stepsData, onBack, onNext, onStepClick
}) => {

    const { formData } = useFormStore();
    const isServiceSelected = formData.service !== '';

    const isStep1Finished = formData.name && formData.email && formData.password;
    const isStep2Finished = formData.service !== '';

    const handleBreadcrumbClick = (targetStepId: number) => {
        
        if (targetStepId < stepNumber) {
            onStepClick(targetStepId); 
            return;
        }

        if (targetStepId === 2 && isStep1Finished) {
            onStepClick(targetStepId);
            return;
        }

        if (targetStepId === 3 && isStep1Finished && isStep2Finished) {
            onStepClick(targetStepId);
            return;
        }
        
    };

    return (
            <div className={styles.formContainer}>
                <div className={styles.breadCrumbs}>
                    {stepsData.map((step, index) => {
                        const isLocked = (
                            (step.id === 2 && !isStep1Finished) || 
                            (step.id === 3 && (!isStep1Finished || !isStep2Finished))
                        );
                        return (
                        <React.Fragment key={step.id}>
                            <div className={clsx(styles.stepWrapper, {
                                [styles.active]: stepNumber === step.id,
                                [styles.completed]: stepNumber > step.id,
                                [styles.locked]: isLocked
                                })} 
                                onClick={() => handleBreadcrumbClick(step.id)}
                            >
                                <div className={styles.circle}>{step.id}</div>
                                <span className={styles.stepLabel}>{step.label}</span>
                            </div>
                            {index < stepsData.length - 1 && (
                                <div className={styles.separator}>
                                    <LineRounded />
                                </div>
                            )}
                        </React.Fragment>
                        );
                    })}
                </div>
                <div className={styles.divider} />
                <div className={styles.formHeader}> 
                    <h1>{title}</h1>
                    <p>{subTitle}</p>
                </div>
                <div className={styles.stepContent}>
                    {children}
                </div>
                <div className={styles.formFooter}>
                    <button className={styles.backButton} onClick={onBack}>Back</button>
                    <button 
                        type={stepNumber === 1 ? "submit" : "button"}
                        form={stepNumber === 1 ? "step1-form" : undefined}
                        className={styles.continueButton}
                        onClick={stepNumber !== 1 ? onNext : undefined}
                        disabled={stepNumber === 2 && !isServiceSelected}
                    >
                        Continue
                    </button>
                </div>
            </div>
    );
};

export default MultiForm


