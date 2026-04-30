import { z } from "zod";

export const multiFormSchema = z.object({
  name: z.string().min(1, "Обязательно к заполнению"),
  email: z.string().min(1, "Обязательно к заполнению").email("Неправильный email адрес"),
  password: z.string().min(7, "Пароль должен быть не менее 7 символов"),
  service: z.string().min(1, "Пожалуйста, выберите сервис"), 
});

export type FormValues = z.infer<typeof multiFormSchema>;