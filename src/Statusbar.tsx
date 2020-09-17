import React from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components/native';

const Statusbar: React.FC = () => {
  const { colors } = useTheme();
  return <StatusBar backgroundColor={colors.background} />;
};

export default Statusbar;
