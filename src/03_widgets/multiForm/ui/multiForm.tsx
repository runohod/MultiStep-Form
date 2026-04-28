import { useFormStore } from "@/04_features/store/useFormStore";
import React from "react";
import { useFormContext } from "react-hook-form";
import clsx from "clsx";
import { LineRounded } from "@/06_shared/icons";
import styles from "./multiForm.module.scss";

interface FormValues {
  name: string;
  email: string;
  password: string;
  service: string;
}

interface MultiFormProps {
  title: string;
  subTitle: string;
  children: React.ReactNode;
  stepsData: {
    id: number;
    label: string;
    component: React.ReactNode;
  }[];
}

const MultiForm: React.FC<MultiFormProps> = ({
  title,
  subTitle,
  children,
  stepsData,
}) => {
  const { watch, handleSubmit } = useFormContext<FormValues>();
  const formValues = watch();
  const currentStep = useFormStore((state) => state.currentStep);
  const nextStep = useFormStore((state) => state.nextStep);
  const prevStep = useFormStore((state) => state.prevStep);
  const goToStep = useFormStore((state) => state.goToStep);

  const isStep1Finished = !!(
    formValues.name &&
    formValues.email &&
    formValues.password
  );
  const isServiceSelected = !!formValues.service;
  // const setShouldSubmit = useFormStore((state) => state.setShouldSubmit);
  // const formData = useFormStore((state) => state.formData);

  // const isServiceSelected = formData.service !== "";
  // const isStep1Finished = !!(
  //   formData.name &&
  //   formData.email &&
  //   formData.password
  // );
  const isStep2Finished = isServiceSelected;

  const handleBreadcrumbClick = (targetStepId: number) => {
    if (targetStepId === currentStep) return;

    if (currentStep === 1 && targetStepId > 1) {
      handleSubmit(() => goToStep(targetStepId))();
      return;
    }

    if (targetStepId < currentStep) {
      goToStep(targetStepId);
      return;
    }

    if (targetStepId === 2 && isStep1Finished) {
      goToStep(targetStepId);
    }

    if (targetStepId === 3 && isStep1Finished && isStep2Finished) {
      goToStep(targetStepId);
    }
  };
  const handleContinue = () => {
    if (currentStep === 1) {
      handleSubmit(() => nextStep())();
    } else {
      nextStep();
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.breadCrumbs}>
        {stepsData.map((step, index) => {
          const isLocked =
            (step.id === 2 && !isStep1Finished) ||
            (step.id === 3 && (!isStep1Finished || !isStep2Finished));
          return (
            <React.Fragment key={step.id}>
              <div
                className={clsx(styles.stepWrapper, {
                  [styles.active]: currentStep === step.id,
                  [styles.completed]: currentStep > step.id,
                  [styles.locked]: isLocked,
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
      <div className={styles.stepContent}>{children}</div>
      <div className={styles.formFooter}>
        <button
          className={styles.backButton}
          onClick={prevStep}
          disabled={currentStep === 1}
        >
          Back
        </button>
        <button
          type="button"
          className={styles.continueButton}
          onClick={handleContinue}
          disabled={currentStep === 2 && !isServiceSelected}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default MultiForm;
