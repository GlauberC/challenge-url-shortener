import React from 'react';
import Providers from './providers';
import Routes from './routes';
import Statusbar from './Statusbar';

const App: React.FC = () => {
  return (
    <Providers>
      <Statusbar />
      <Routes />
    </Providers>
  );
};

export default App;
