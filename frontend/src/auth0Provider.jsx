import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

const Auth0ProviderWithHistory = ({ children }) => {
  const domain = "dev-8dixmhiwz587kgpl.us.auth0.com";
  const clientId = "15lDMYMAdGAyqLxUhX5tPjWaLJAI2y1q";

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
