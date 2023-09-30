import {
  HomeIcon,
  TableCellsIcon,
} from "@heroicons/react/24/solid";
import {
  Home,
  Users,
} from "@/pages/dashboard";

import Customers from "@/pages/dashboard/customers/cust"
import Projects from "@/pages/dashboard/projects/projects"

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
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "users",
        path: "/users",
        element: <Users />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "customers",
        path: "/customers",
        element: <Customers />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "projects",
        path: "/projects",
        element: <Projects />,
      },
    ],
  },
];

export default routes;
