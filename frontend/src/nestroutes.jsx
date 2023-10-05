import Addusers from "@/pages/users/addusers";
import Usersprofile from "@/pages/users/usersprofile";
import Customersprofile from "@/pages/customers/custprofile";
import Addcustomers from "@/pages/customers/addcust";
import Addprojects from "@/pages/projects/addprojects";
import ProjectsProfile from "@/pages/projects/projectsprofile";

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
