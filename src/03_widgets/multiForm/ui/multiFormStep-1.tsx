import {
  useFormContext,
  type SubmitHandler,
  Controller,
} from "react-hook-form";
import { useEffect } from "react";
import { useFormStore } from "@/04_features/store/useFormStore";
import styles from "./multiFormStep-1.module.scss";

interface Form {
  name: string;
  email: string;
  password: string;
}

function MultiFormStep1() {
  const { control, handleSubmit } = useFormContext<Form>();
  const setFormData = useFormStore((state) => state.setFormData);
  const shouldSubmit = useFormStore((state) => state.shouldSubmit);
  const setShouldSubmit = useFormStore((state) => state.setShouldSubmit);
  const nextStep = useFormStore((state) => state.nextStep);

  useEffect(() => {
    if (shouldSubmit) {
      handleSubmit((data) => {
        setFormData(data);
        nextStep();
      })();
      setShouldSubmit(false);
    }
  }, [shouldSubmit, handleSubmit, nextStep, setFormData, setShouldSubmit]);

  const onSubmit: SubmitHandler<Form> = (data) => {
    setFormData(data);
    nextStep();
  };

  return (
    <form
      id="step1-form"
      className={styles.formGroup}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="name"
        control={control}
        rules={{ required: "Обязательно к заполнению" }}
        render={({ field, fieldState }) => (
          <div className={styles.formHolder}>
            <label htmlFor="name" className={styles.formName}>
              Имя пользователя
            </label>
            <input
              {...field} 
              type="text"
              id="name"
              placeholder="name"
            />
            {fieldState.error && (
              <p className={styles.errorMassage}>{fieldState.error.message}</p>
            )}
          </div>
        )}
      />

      <Controller
        name="email"
        control={control}
        rules={{
          required: "Обязательно к заполнению",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: "Неправильный email адрес",
          },
        }}
        render={({ field, fieldState }) => (
          <div className={styles.formHolder}>
            <label htmlFor="email" className={styles.formName}>
              Электронная почта
            </label>
            <input
              {...field}
              type="email"
              id="email"
              placeholder="example@mail.com"
            />
            {fieldState.error && (
              <p className={styles.errorMassage}>{fieldState.error.message}</p>
            )}
          </div>
        )}
      />

      <Controller
        name="password"
        control={control}
        rules={{
          required: "Обязательно к заполнению",
          minLength: {
            value: 7,
            message: "Пароль должен быть не менее 7 символов",
          },
        }}
        render={({ field, fieldState }) => (
          <div className={styles.formHolder}>
            <label htmlFor="password" className={styles.formName}>
              Пароль
            </label>
            <input
              {...field}
              type="password"
              id="password"
              placeholder="qwerty"
            />
            {fieldState.error && (
              <p className={styles.errorMassage}>{fieldState.error.message}</p>
            )}
          </div>
        )}
      />
    </form>
  );
}

export { MultiFormStep1 };
