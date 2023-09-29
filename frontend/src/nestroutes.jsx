import {
  Addcustomers,
  Customersprofile,
  Usersprofile,
  Addusers,
  Addprojects,
  ProjectsProfile,
} from "./pages/dashboard";


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
