import Addcustomers from "./pages/dashboard/customers/addcustomers";
import Customersprofile from "./pages/dashboard/customers/customersprofile";
import Usersprofile from "./pages/dashboard/users/usersprofile";
import Addusers from "./pages/dashboard/users/addusers";

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
    ],
  },
];

export default routes;
