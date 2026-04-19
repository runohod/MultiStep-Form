import { useForm, type SubmitHandler } from "react-hook-form";
import { useFormStore } from "@/05_entities/store/useFormStore";
import styles from "./multiFormStep-1.module.scss";

interface Form {
  name: string;
  email: string;
  password: string;
}

interface MultiFormStep1Props {
  onNext: () => void;
}

function MultiFormStep1({ onNext }: MultiFormStep1Props) {

  const { formData, setFormData } = useFormStore();
  const { register, handleSubmit, formState } = useForm<Form>({
    mode: "onChange",
    defaultValues: formData,
  });

  const emailError = formState.errors["email"]?.message;
  const passwordError = formState.errors["password"]?.message;

  const onSubmit: SubmitHandler<Form> = (data) => {
    setFormData(data);
    onNext();
  };

  return (
    <form
      id="step1-form"
      className={styles.formGroup}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={styles.formHolder}>
        <label htmlFor="username" className={styles.formName}>
          Имя пользователя
        </label>
        <input
          type="text"
          id="username"
          placeholder="name"
          {...register("name", { required: "Обязательно к заполнению" })}
        />
      </div>

      <div className={styles.formHolder}>
        <label htmlFor="email" className={styles.formName}>
          Электронная почта
        </label>
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
        <label htmlFor="password" className={styles.formName}>
          Пароль
        </label>
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
