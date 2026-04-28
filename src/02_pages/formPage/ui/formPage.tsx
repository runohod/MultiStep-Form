import { useForm, FormProvider } from "react-hook-form";
import MultiForm from "@/03_widgets/multiForm/ui/multiForm";
import { MultiFormStep1 } from "@/03_widgets/multiForm/ui/multiFormStep-1";
import { MultiFormStep2 } from "@/03_widgets/multiForm/ui/multiFormStep-2";
import { MultiFormStep3 } from "@/03_widgets/multiForm/ui/multiFormStep-3";
import { useFormStore } from "@/04_features/store/useFormStore";
import styles from "./formPage.module.scss";

export const FormPage = () => {
  const currentStep = useFormStore((state) => state.currentStep);
  const formData = useFormStore((state) => state.formData);

  const methods = useForm({
    mode: "onChange",
    defaultValues: formData,
  });

  const stepsData = [
    { id: 1, label: "Personal Info", component: <MultiFormStep1 /> },
    { id: 2, label: "Our services", component: <MultiFormStep2 /> },
    { id: 3, label: "Payment", component: <MultiFormStep3 /> },
  ];

  const activeStepData = stepsData.find((s) => s.id === currentStep);

  return (
    <div className={styles.pageWrapper}>
      <FormProvider {...methods}>
        <MultiForm
          stepsData={stepsData}
          title={activeStepData?.label || ""}
          subTitle={`Step ${currentStep}/${stepsData.length}`}
        >
          {activeStepData?.component}
        </MultiForm>
      </FormProvider>
    </div>
  );
};
