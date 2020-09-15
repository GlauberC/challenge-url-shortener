import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import dark from '../styles/themes/dark';

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={dark}>{children}</ThemeProvider>
);

export default Providers;
