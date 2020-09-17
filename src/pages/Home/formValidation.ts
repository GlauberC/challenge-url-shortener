import * as Yup from 'yup';

interface FormProps {
  url: string;
}

export default async (data: FormProps) => {
  try {
    const schema = Yup.object().shape({
      url: Yup.string().matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        'Digite um URL válido',
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
