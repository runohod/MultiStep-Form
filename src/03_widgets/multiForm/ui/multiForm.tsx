import React, { type JSX } from 'react';
import clsx from 'clsx';
import { LineRounded } from '@/06_shared/icons';
import styles from './multiForm.module.scss';

interface MultiFormProps { 
    title: string;
    subTitle: string;
    children: React.ReactNode;
    stepNumber: number;
    stepsData: {
        id: number;
        label: string;
        component: JSX.Element;
    }[];
}

const MultiForm: React.FC<MultiFormProps> = ({ title, subTitle, children, stepNumber, stepsData}) => {
    return (
            <div className={styles.formContainer}>
                <div className={styles.breadCrumbs}>
                    {stepsData.map((step, index) => (
                        <React.Fragment key={step.id}>
                            <div className={clsx(styles.stepWrapper, {[styles.active]: stepNumber === step.id})}>
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
                <div className={styles.divider} />
                <div className={styles.formHeader}> 
                    <h1>{title}</h1>
                    <p>{subTitle}</p>
                </div>
                <div className={styles.stepContent}>
                    {children}
                </div>
                <div className={styles.formFooter}>
                    <button className={styles.backButton}>Back</button>
                    <button className={styles.continueButton}>Continue</button>
                </div>
            </div>
    );
};

export default MultiForm


