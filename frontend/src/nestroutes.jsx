import Customersprofile from "./pages/dashboard/customers/customersprofile";
import Usersprofile from "./pages/dashboard/users/usersprofile";
import Addusers from "./pages/dashboard/users/addusers";
import Addprojects from "./pages/dashboard/projects/addprojects";
import ProjectsProfile from "./pages/dashboard/projects/projectsprofile";
import Addcustomers from "./pages/dashboard/customers/addcustomers";


export const routes = [
  {
    layout: "dashboard_subpages",
    pages: [
      {
        name: "users_editpage",
        path: "users/edit/:id",
        element: <Usersprofile />,
      },
      {
        name: "users_addpage",
        path: "users/add",
        element: <Addusers />,
      },
      {
        name: "customers_editpage",
        path: "customers/edit/:id",
        element: <Customersprofile />,
      },
      {
        name: "customers_addpage",
        path: "customers/add",
        element: <Addcustomers />,
      },
      {
        name: "projects_addpage",
        path: "projects/add",
        element: <Addprojects />,
      },
      {
        name: "projects_editpage",
        path: "projects/edit/:id",
        element: <ProjectsProfile />,
      },
    ],
  },
];

export default routes;
