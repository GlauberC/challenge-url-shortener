import * as Yup from 'yup';

interface FormProps {
  userName: string;
  password: string;
}

export default async (data: FormProps) => {
  try {
    const schema = Yup.object().shape({
      userName: Yup.string().min(3, 'Digite um username válido'),
      password: Yup.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
    });

    await schema.validate(data, {
      abortEarly: false,
    });
  } catch (err) {
    if (err instanceof Yup.ValidationError) {
      throw err;
    }
    throw new Error('UnexpectedError');
  }
};
