import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

export function Auth() {
  const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      return loginWithRedirect();
    }
  }, [isAuthenticated, loginWithRedirect]);

  return (
    <div>
      <p>Redirecting to sign-in...</p>
    </div>
  );
}

export default Auth;
