import { Chip, Typography } from '@material-tailwind/react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '@/data';
import { formatDate, formatPhoneNumber } from '@/utils/formatting';

export function Table({ currentItems, Userdata }) {
  const { user } = useAuth0();
  const navigate = useNavigate();

  function Deleteuser(id) {
    if (window.confirm('Do you want to delete the user?')) {
      deleteUser(id, user.sub)
        .then(() => {
          alert('The user is deleted');
          window.location.reload();
        })
        .catch((error) => console.error(error));
    }
  }

  return (
    <table className="w-full min-w-[640px] table-auto">
      <thead>
        <tr>
          {['name', 'phone number', 'role', 'status', 'last login', ''].map(
            (el) => (
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
            ),
          )}
        </tr>
      </thead>
      <tbody>
        {currentItems.map(
          (
            {
              userId,
              firstName,
              lastName,
              email,
              phoneNumber,
              jobTitle,
              status,
              lastLogin,
            },
            key,
          ) => {
            const className = `py-3 px-5 ${
              key === Userdata.length - 1 ? '' : 'border-b border-blue-gray-50'
            }`;
            const p_umber = formatPhoneNumber(phoneNumber);
            return (
              <tr key={userId}>
                <td className={className}>
                  <div className="flex items-center gap-4">
                    <div>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-semibold"
                      >
                        {`${firstName} ${lastName}`}
                      </Typography>
                      <Typography className="text-xs font-normal text-blue-gray-500">
                        {email}
                      </Typography>
                    </div>
                  </div>
                </td>
                <td className={className}>
                  <Typography className="text-xs font-semibold text-blue-gray-600">
                    {p_umber}
                  </Typography>
                </td>
                <td className={className}>
                  <Typography className="text-xs font-semibold text-blue-gray-600">
                    {jobTitle}
                  </Typography>
                </td>
                <td className={className}>
                  <Chip
                    variant="gradient"
                    color={status === 'active' ? 'green' : 'blue-gray'}
                    value={status === 'active' ? 'active' : 'inactive'}
                    className="px-2 py-0.5 text-center text-[11px] font-medium"
                  />
                </td>
                <td className={className}>
                  {lastLogin != null ? (<Typography className="text-xs font-semibold text-blue-gray-600">
                    {lastLogin == null ? null : formatDate(lastLogin)}
                  </Typography>): null}
                </td>
                <td className={className}>
                  <Typography
                    as="a"
                    onClick={() => navigate(`edit/${userId}`)}
                    className="text-xs font-semibold text-blue-gray-600"
                  >
                    Edit
                  </Typography>
                  <Typography
                    as="a"
                    onClick={() => Deleteuser(userId)}
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
  );
}
