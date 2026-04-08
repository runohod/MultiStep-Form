import React from 'react';
import { LineRounded } from '@/06_shared/icons';
import styles from './multiForm.module.scss';

interface MultiFormProps { 
    title: string;
    subTitle: string;
    children: React.ReactNode;
    stepNumber: number
}

const stepsData = [
    { id: 1, label: 'Personal Info' },
    { id: 2, label: 'Our services' },
    { id: 3, label: 'Payment' }
];

const MultiForm: React.FC<MultiFormProps> = ({ title, subTitle, children, stepNumber }) => {
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.formContainer}>
                <div className={styles.breadCrumbs}>
                    {stepsData.map((step, index) => (
                        <React.Fragment key={step.id}>
                            <div className={`${styles.stepWrapper} ${stepNumber === step.id ? styles.active : ''}`}>
                                <div className={styles.circle}>{step.id}</div>
                                <span className={styles.stepLabel}>{step.label}</span>
                            </div>
                            {index < stepsData.length - 1 && (
                                <div className={styles.separator}>
                                    <LineRounded />
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
                <div className="formHeader">
                    <h1>{title}</h1>
                    <p>{subTitle}</p>
                </div>
                <main className="formContent">
                    {children}
                </main>
                <footer className={styles.formFooter}>
                    <button className={styles.backButton}>Back</button>
                    <button className={styles.continueButton}>Continue</button>
                </footer>
            </div>
        </div>
    );
};

export default MultiForm


