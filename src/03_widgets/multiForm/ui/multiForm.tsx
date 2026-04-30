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
  const { watch, handleSubmit, trigger } = useFormContext<FormValues>();
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
  const isStep2Finished = isServiceSelected;

  const handleBreadcrumbClick = async (targetStepId: number) => {
    if (targetStepId === currentStep) return;

    if (targetStepId < currentStep) {
      goToStep(targetStepId);
      return;
    }

    let isStepValid = false;
    if (currentStep === 1) {
      isStepValid = await trigger(["name", "email", "password"]);
    } else if (currentStep === 2) {
      isStepValid = await trigger(["service"]);
    }

    if (isStepValid) {
      if (targetStepId === 2 && isStep1Finished) {
        goToStep(targetStepId);
      }
      if (targetStepId === 3 && isStep1Finished && isStep2Finished) {
        goToStep(targetStepId);
      }
    }
  };

  const handleContinue = async () => {
    let isStepValid = false;

    if (currentStep === 1) {
      isStepValid = await trigger(["name", "email", "password"]);
    } else if (currentStep === 2) {
      isStepValid = await trigger(["service"]);
    } else if (currentStep === 3) {
      isStepValid = true;
    }

    if (isStepValid) {
      if (currentStep < stepsData.length) {
        nextStep();
      } else {
        handleSubmit((data) => {
          console.log("Final Form Data:", data);
        })();
      }
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
          type="button"
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
        >
          {currentStep === stepsData.length ? "Confirm" : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default MultiForm;