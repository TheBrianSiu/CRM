import { Auth0Provider } from "@auth0/auth0-react";
import { clientId, domain } from "./settings";

const Auth0ProviderWithHistory = ({ children }) => {

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
