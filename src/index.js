import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ChakraProvider } from '@chakra-ui/react'
import {  ColorModeScript } from '@chakra-ui/color-mode'
import theme from './theme';

import LoginView from './routes/LoginView';
import DashboardView from './routes/DashboardView';
import EditProfileView from './routes/EditProfileView';
import SignoutView from './routes/SignoutView';
import PublicProfileView from './routes/PublicProfileView';
import ChooseUsernameView from './routes/ChooseUsernameView';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <ColorModeScript  initialColorMode={theme.config.initialColorMode}/>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="login" element={<LoginView />} />
            <Route path='dashboard' element={<DashboardView />} />
            <Route path='dashboard/profile' element={<EditProfileView />} />
            <Route path='signout' element={<SignoutView />} />
            <Route path='u/:username' element={<PublicProfileView />} />
            <Route path='choose-username' element={<ChooseUsernameView  />} />
            <Route path="*" element={<div>404</div>} />
          </Routes>
        </ChakraProvider>
      </BrowserRouter>
    </React.StrictMode>
);