import { useForm, type SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import { useFormStore } from "@/04_features/store/useFormStore";
import styles from "./multiFormStep-1.module.scss";

interface Form {
  name: string;
  email: string;
  password: string;
}

function MultiFormStep1() {
  const formData = useFormStore((state) => state.formData);
  const setFormData = useFormStore((state) => state.setFormData);
  const shouldSubmit = useFormStore((state) => state.shouldSubmit);
  const setShouldSubmit = useFormStore((state) => state.setShouldSubmit);
  const nextStep = useFormStore((state) => state.nextStep);

  const { register, handleSubmit, formState } = useForm<Form>({
    mode: "onChange",
    defaultValues: formData, 
  });

  useEffect(() => {
    if (shouldSubmit) {
      handleSubmit((data) => {
        setFormData(data);
        nextStep();
      })();
      setShouldSubmit(false);
    }
  }, [shouldSubmit, handleSubmit, nextStep, setFormData, setShouldSubmit]);

  const emailError = formState.errors["email"]?.message;
  const passwordError = formState.errors["password"]?.message;

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
      <div className={styles.formHolder}>
        <label htmlFor="name" className={styles.formName}>Имя пользователя</label>
        <input
          type="text"
          id="name"
          placeholder="name"
          {...register("name", { required: "Обязательно к заполнению" })}
        />
        {formState.errors.name && (
          <p className={styles.errorMassage}>{formState.errors.name.message}</p>
        )}
      </div>

      <div className={styles.formHolder}>
        <label htmlFor="email" className={styles.formName}>Электронная почта</label>
        <input
          type="email"
          id="email"
          placeholder="example@mail.com"
          {...register("email", {
            required: "Обязательно к заполнению",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Неправильный email адрес",
            },
          })}
        />
        {emailError && <p className={styles.errorMassage}>{emailError}</p>}
      </div>

      <div className={styles.formHolder}>
        <label htmlFor="password" className={styles.formName}>Пароль</label>
        <input
          type="password"
          id="password"
          placeholder="qwerty"
          {...register("password", {
            required: "Обязательно к заполнению",
            minLength: {
              value: 7,
              message: "Пароль должен быть не менее 7 символов",
            },
          })}
        />
        {passwordError && (
          <p className={styles.errorMassage}>{passwordError}</p>
        )}
      </div>
    </form>
  );
}

export { MultiFormStep1 };