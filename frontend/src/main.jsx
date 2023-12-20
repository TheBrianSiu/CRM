import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-tailwind/react';
import App from './App';
import { UserRolesProvider } from './user-roles-context';
import { MaterialTailwindControllerProvider } from '@/context';
import Auth0ProviderWithHistory from './auth0-provider';
import '../public/css/tailwind.css';

const root = document.getElementById('root');
const rootRoot = createRoot(root);

rootRoot.render(
  <React.StrictMode>
    <Auth0ProviderWithHistory>
      <UserRolesProvider>
        <BrowserRouter>
          <ThemeProvider>
            <MaterialTailwindControllerProvider>
              <App />
            </MaterialTailwindControllerProvider>
          </ThemeProvider>
        </BrowserRouter>
      </UserRolesProvider>
    </Auth0ProviderWithHistory>
  </React.StrictMode>,
);
