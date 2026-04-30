import { useFormContext, Controller } from "react-hook-form";
import styles from "./multiFormStep-1.module.scss";

interface Form {
  name: string;
  email: string;
  password: string;
}

function MultiFormStep1() {
  const { control } = useFormContext<Form>();
  
  return (
    <div
      className={styles.formGroup}
    >
      <Controller
        name="name"
        control={control}
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
    </div>
  );
}

export { MultiFormStep1 };
