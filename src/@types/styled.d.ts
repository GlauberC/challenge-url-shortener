import 'styled-components/native';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    title: string;

    colors: {
      prim: string;
      sec: string;
      background: string;
      placeholder: string;
      text1: string;
      text2: string;
      text3: string;
      err: string;
    };
  }
}
