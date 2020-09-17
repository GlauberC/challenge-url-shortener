import * as Yup from 'yup';

interface FormProps {
  name: string;
  email: string;
  userName: string;
  password: string;
  rPassword: string;
}

export default async (data: FormProps) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string().min(3, 'Digite um nome válido'),
      email: Yup.string()
        .required('O email é obrigatório')
        .email('Digite um email válido'),
      userName: Yup.string().min(3, 'Digite um username válido'),
      password: Yup.string()
        .min(6, 'Senha deve ter no mínimo 6 caracteres')
        .test(
          'equal-password',
          'Os campos de senhas não estão iguais',
          () => data.password === data.rPassword,
        ),
      rPassword: Yup.string().test(
        'equal-password',
        'Os campos de senhas não estão iguais',
        () => data.rPassword === data.password,
      ),
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
