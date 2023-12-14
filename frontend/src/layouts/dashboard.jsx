import { Routes, Route, redirect } from "react-router-dom";
import { IconButton } from "@material-tailwind/react";

import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/widgets/layout";
import routes from "@/routes";
import nestroutes from "@/nestroutes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { useContext, useEffect, useState } from "react";
import { UserRolesContext } from "@/userrolescontext";

export function Dashboard() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;
  const [route, setRoute] = useState(null);
  const { userRoles, isLoading } = useContext(UserRolesContext);

  useEffect(() => {
    const renderRoutes = () => {
      const renderedRoute = routes.flatMap(({ layout, pages }) => {
        if (layout === "dashboard") {
          return pages.map(({ path, element }) => (
            <Route key={path} exact path={path} element={element} />
          ));
        }
      });
      setRoute(renderedRoute);
    };

    renderRoutes();
  }, [isLoading, userRoles]);

  // const hasRole = (roles) => {
  //   if (userRoles) {
  //     const lowerCaseUserRoles = userRoles.map((role) => role.toLowerCase());
  //     const hasMatchingRole = roles.some((pagerole) =>
  //       lowerCaseUserRoles.includes(pagerole.toLowerCase())
  //     );
  //     return hasMatchingRole;
  //   }
  //   return false;
  // };

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={routes}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <Configurator />
        <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton>
        <Routes>
          {route}
          {nestroutes.map(
            ({ layout, pages }) =>
              layout === "dashboard_subpages" &&
              pages.map(({ path, element }) => (
                <Route exact path={path} element={element} />
              ))
          )}
        </Routes>
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
