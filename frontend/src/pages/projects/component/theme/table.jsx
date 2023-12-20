import { Typography, Chip } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { deleteProjectWithRelatedData } from '@/data';
import { formatNumber } from '@/utils';

export function Table({ currentItems, tasks }) {
  const navigate = useNavigate();
  function deleteProject(id) {
    if (window.confirm('Do you want to delete this item?')) {
      deleteProjectWithRelatedData(id)
        .then(() => {
          alert('The task is deleted');
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
              'Tasks',
              'Assignees',
              'Estimated value',
              'Lead Status',
              'Priority',
              'Action',
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
                projectId,
                taskname,
                assignees,
                description,
                estValue,
                leadStatus,
                priority,
              },
              key,
            ) => {
              const className = `py-3 px-5 ${
                key === tasks.length - 1 ? '' : 'border-b border-blue-gray-50'
              }`;
              return (
                <tr key={projectId}>
                  <td className={className}>
                    <div className="flex items-center gap-4">
                      <div>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-semibold"
                        >
                          {taskname}
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
                          {user.firstName}
                          {index !== assignees.length - 1 && ', '}
                        </span>
                      ))}
                    </Typography>
                  </td>
                  <td className={className}>
                    <Typography className="text-xs font-semibold text-blue-gray-600">
                      ${formatNumber(estValue)}
                    </Typography>
                  </td>
                  <td className={className}>
                    <Chip
                      variant="gradient"
                      color={
                        leadStatus === 'new'
                          ? 'gray'
                          : leadStatus === 'prospect'
                            ? 'green'
                            : leadStatus === 'proposal'
                              ? 'yellow'
                              : leadStatus === 'won'
                                ? 'amber'
                                : leadStatus === 'lost'
                                  ? 'red'
                                  : 'orange'
                      }
                      value={leadStatus}
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
                      onClick={() => navigate(`edit/${projectId}`)}
                      className="text-xs font-semibold text-blue-gray-600"
                    >
                      Edit
                    </Typography>
                    <Typography
                      as="a"
                      onClick={() => deleteProject(projectId)}
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
