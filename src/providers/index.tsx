import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { AuthProvider } from './auth.provider';
import dark from '../styles/themes/dark';

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={dark}>
    <AuthProvider>{children}</AuthProvider>
  </ThemeProvider>
);

export default Providers;
