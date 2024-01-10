import { Auth0Provider } from '@auth0/auth0-react';
import {audience, clientId, domain, scope } from './settings';

function Auth0ProviderWithHistory({ children }) {  
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: audience,
        scope: scope
      }}
    >
      {children}
    </Auth0Provider>
  );
}

export default Auth0ProviderWithHistory;
