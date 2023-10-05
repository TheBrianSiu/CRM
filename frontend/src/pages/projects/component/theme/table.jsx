import { Typography, Chip } from "@material-tailwind/react";
import { deleteProjectWithRelatedData } from "@/data/projects-data";

export function Table({ currentItems, tasks }) {
  function deleteProject(id) {
    if (window.confirm("Do you want to delete this item?")) {
      deleteProjectWithRelatedData(id)
        .then(() => {
          alert("The task is deleted");
        })
        .catch((error) => console.error(error));
    }
  }

  return (
    <div>
      <table className="w-full min-w-[640px] table-auto">
        <thead>
          <tr>
            {[
              "Tasks",
              "Assignees",
              "Estimated value",
              "Lead Status",
              "Priority",
              "Action",
            ].map((el) => (
              <th
                key={el}
                className="border-b border-blue-gray-50 px-5 py-3 text-left"
              >
                <Typography
                  variant="small"
                  className="text-[11px] font-bold uppercase text-blue-gray-400"
                >
                  {el}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentItems.map(
            (
              {
                project_id,
                task_name,
                assignees,
                description,
                est_value,
                lead_status,
                priority,
              },
              key,
            ) => {
              const className = `py-3 px-5 ${
                key === tasks.length - 1 ? "" : "border-b border-blue-gray-50"
              }`;
              return (
                <tr key={project_id}>
                  <td className={className}>
                    <div className="flex items-center gap-4">
                      <div>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-semibold"
                        >
                          {task_name}
                        </Typography>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {description}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className={className}>
                    <Typography className="text-xs font-semibold text-blue-gray-600">
                      {assignees.map((user, index) => (
                        <span key={user.assignee_id}>
                          {user.first_name}
                          {index !== assignees.length - 1 && ", "}
                        </span>
                      ))}
                    </Typography>
                  </td>
                  <td className={className}>
                    <Typography className="text-xs font-semibold text-blue-gray-600">
                      {"$"}
                      {est_value}
                    </Typography>
                  </td>
                  <td className={className}>
                    <Chip
                      variant="gradient"
                      color={
                        lead_status === "new"
                          ? "gray"
                          : lead_status === "prospect"
                          ? "green"
                          : lead_status === "proposal"
                          ? "yellow"
                          : lead_status === "won"
                          ? "amber"
                          : lead_status === "lost"
                          ? "red"
                          : "orange"
                      }
                      value={lead_status}
                      className="px-2 py-0.5 text-center text-[11px] font-medium"
                    />
                  </td>
                  <td className={className}>
                    <Typography className="text-xs font-semibold text-blue-gray-600">
                      {priority}
                    </Typography>
                  </td>
                  <td className={className}>
                    <Typography
                      as="a"
                      href={`projects/edit/${project_id}`}
                      className="text-xs font-semibold text-blue-gray-600"
                    >
                      Edit
                    </Typography>
                    <Typography
                      as="a"
                      onClick={() => deleteProject(project_id)}
                      className="text-xs font-semibold text-blue-gray-600"
                    >
                      Delete
                    </Typography>
                  </td>
                </tr>
              );
            },
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
