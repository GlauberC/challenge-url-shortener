import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import light from '../styles/themes/light';

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={light}>{children}</ThemeProvider>
);

export default Providers;
