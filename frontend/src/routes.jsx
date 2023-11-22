import { HomeIcon, TableCellsIcon } from "@heroicons/react/24/solid";
import { Home, Users } from "@/pages";

import Customers from "@/pages/customers/cust";
import Projects from "@/pages/projects/projects";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/",
        element: <Home />,
        roles: ["admin", "users"]
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "users",
        path: "/users",
        element: <Users />,
        roles: ["admin"]
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "customers",
        path: "/customers",
        element: <Customers />,
        roles: ["admin", "users"]
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "projects",
        path: "/projects",
        element: <Projects />,
        roles: ["admin", "users"]
      },
    ],
  },
];

export default routes;
