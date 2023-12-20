import { createContext, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { userRole } from './data';

export const UserRolesContext = createContext({
  userRoles: [],
  error: [],
  isLoading: [],
});

export function UserRolesProvider({ children }) {
  const { user, isAuthenticated } = useAuth0();
  const [userRoles, setUserRoles] = useState([]);
  const [error, setError] = useState();
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    const fetchUserRoles = async () => {
      if (isAuthenticated && user) {
        try {
          const fetchedRoles = await userRole(user.sub);
          if (Array.isArray(fetchedRoles)) {
            const rolesArray = fetchedRoles.map((role) => role.name);
            setUserRoles(rolesArray);
          } else {
            setUserRoles([]);
          }
        } catch (error) {
          setError(error);
        } finally {
          setIsloading(false);
        }
      }
    };

    fetchUserRoles();
  }, [user, isAuthenticated]);

  return (
    <UserRolesContext.Provider value={{ userRoles, error, isLoading }}>
      {children}
    </UserRolesContext.Provider>
  );
}
