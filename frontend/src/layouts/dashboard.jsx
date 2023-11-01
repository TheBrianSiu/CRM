import { Routes, Route } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
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
import { useAuth0 } from "@auth0/auth0-react";

export function Dashboard() {
  const { user } = useAuth0();
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;

  const hasRole = (role) => {
    const userRoles =
      user["https://dev-8dixmhiwz587kgpl.us.auth0.com/roles"];
    return userRoles && userRoles.includes(role);
  };

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
          {routes.map(
            ({ layout, pages }) =>
              layout === "dashboard" &&
              pages.map(
                ({ path, element, roles }) =>
                  hasRole(roles) && (
                    <Route exact path={path} element={element} />
                  )
              )
          )}
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
