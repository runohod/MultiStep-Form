import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {multiFormSchema, type FormValues,} from "@/03_widgets/multiForm/model/schema";
import MultiForm from "@/03_widgets/multiForm/ui/multiForm";
import { MultiFormStep1 } from "@/03_widgets/multiForm/ui/multiFormStep-1";
import { MultiFormStep2 } from "@/03_widgets/multiForm/ui/multiFormStep-2";
import { MultiFormStep3 } from "@/03_widgets/multiForm/ui/multiFormStep-3";
import { useFormStore } from "@/04_features/store/useFormStore";
import styles from "./formPage.module.scss";

export const FormPage = () => {
  const currentStep = useFormStore((state) => state.currentStep);

  const methods = useForm<FormValues>({
    resolver: zodResolver(multiFormSchema), 
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      service: "",
    },
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
