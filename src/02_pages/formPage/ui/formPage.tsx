import { useState } from "react";
import MultiForm from "@/03_widgets/multiForm/ui/multiForm";
import { MultiFormStep1 } from "@/03_widgets/multiForm/ui/multiFormStep-1";
import { MultiFormStep2 } from "@/03_widgets/multiForm/ui/multiFormStep-2";
import { MultiFormStep3 } from "@/03_widgets/multiForm/ui/multiFormStep-3";
import styles from './formPage.module.scss';

const stepsData = [
  { id: 1, label: "Personal Info", component: <MultiFormStep1 /> },
  { id: 2, label: "Our services", component: <MultiFormStep2 /> },
  { id: 3, label: "Payment", component: <MultiFormStep3 /> },
];

export const FormPage = () => {
  const [step, setStep] = useState(1);

  const getTitle = (step) => {
    switch (step) {
      case 1:
        return "our";
      case 2:
        return "two";
      case 3:
        return "serivces";
      default:
        return "one";
    }
  };

  return (
    <div className={styles.pageWrapper}>
    <MultiForm
      stepNumber={step}
      title={getTitle(step)}
      subTitle={"title"}
      stepsData={stepsData}
    >
      {stepsData.map((item) => {
        if (step === item.id) {
          return item.component;
        }
      })}
    </MultiForm>
    </div>
  );
};
