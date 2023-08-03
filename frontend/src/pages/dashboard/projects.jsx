import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Tooltip,
  Chip,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

export function Projects() {
  const [projects, setProjects] = useState([]);
  const [listUser, setListUser] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch projects and users data simultaneously
  useEffect(() => {
    const fetchProjectsData = fetch("http://localhost:8080/projects-table")
      .then((response) => response.json())
      .catch((error) => console.error(error));

    const fetchUsersData = fetch("http://localhost:8080/users-table/users")
      .then((response) => response.json())
      .then((data) => {
        // Create a user map with user IDs as keys and user data as values
        const userMap = {};
        data.forEach((user) => {
          userMap[user.user_id] = user;
        });
        setListUser(userMap);
      })
      .catch((error) => console.error(error));

    // Wait for both fetches to complete
    Promise.all([fetchProjectsData, fetchUsersData])
      .then(([projectsData]) => {
        setProjects(projectsData);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="mb-8 mt-12 flex flex-col gap-12">
      {loading ? (
        <p>Loading projects and users...</p>
      ) : (
        <Card>
          <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
            <Typography variant="h6" color="white">
              Projects Table
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pb-2 pt-0">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  <th className="border-b border-blue-gray-50 px-5 py-3 text-left">
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      companies
                    </Typography>
                  </th>
                  <th className="border-b border-blue-gray-50 px-5 py-3 text-left">
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      Team members
                    </Typography>
                  </th>
                  <th className="border-b border-blue-gray-50 px-5 py-3 text-left">
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      budget
                    </Typography>
                  </th>
                  <th className="border-b border-blue-gray-50 px-5 py-3 text-left">
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      completion
                    </Typography>
                  </th>
                  <th className="border-b border-blue-gray-50 px-5 py-3 text-left">
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      &nbsp;
                    </Typography>
                  </th>
                </tr>
              </thead>
              <tbody>
                {projects.map(
                  ({ img, name, budget, completion, user_id }, key) => {
                    const className = `py-3 px-5 ${
                      key === projects.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;
                    const userIds = user_id.split(",");
                    const usersData = userIds.map((id) => listUser[id]);

                    return (
                      <tr key={name}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <Avatar src={img} alt={name} size="sm" />
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold"
                            >
                              {name}
                            </Typography>
                          </div>
                        </td>
                        <td className={className}>
                          {usersData.map((user, key) => {
                            if (!listUser[user.user_id]) {
                              // Return null or a placeholder if user data or img is not available
                              return null;
                            }
                            console.log(listUser[user.user_id]);
                            return (
                              <Tooltip
                                key={
                                  listUser[user.user_id].first_name +
                                  " " +
                                  listUser[user.user_id].last_name
                                }
                                content={`${
                                  listUser[user.user_id].first_name
                                } ${listUser[user.user_id].last_name}`}
                              >
                                <Avatar
                                  src={listUser[user.user_id].img}
                                  alt={`${listUser[user.user_id].first_name} ${
                                    listUser[user.user_id].last_name
                                  }`}
                                  size="xs"
                                  variant="circular"
                                  className={`cursor-pointer border-2 border-white ${
                                    key === 0 ? "" : "-ml-2.5"
                                  }`}
                                />
                              </Tooltip>
                            );
                          })}
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {budget}
                          </Typography>
                        </td>
                        <td className={className}>
                          <div className="w-10/12">
                            <Typography
                              variant="small"
                              className="mb-1 block text-xs font-medium text-blue-gray-600"
                            >
                              <Chip
                                variant="gradient"
                                color={
                                  completion === "Completed"
                                    ? "green"
                                    : completion === "In progress"
                                    ? "yellow"
                                    : "gray"
                                }
                                value={completion}
                              />
                            </Typography>
                            {/* Progress bar here */}
                          </div>
                        </td>
                        <td className={className}>
                          {/* Ellipsis icon here */}
                        </td>
                      </tr>
                    );
                  },
                )}
              </tbody>
            </table>
          </CardBody>
        </Card>
      )}
    </div>
  );
}

export default Projects;
