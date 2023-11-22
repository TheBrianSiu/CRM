import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import {UserRolesProvider} from "./userrolescontext"
import { MaterialTailwindControllerProvider } from "@/context";
import Auth0ProviderWithHistory from "./auth0Provider";
import "../public/css/tailwind.css";

const root = document.getElementById("root");
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
  </React.StrictMode>
);
