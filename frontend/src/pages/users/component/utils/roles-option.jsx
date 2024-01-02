import { retreiveRoles} from '@/data';
import { useState, useEffect } from 'react';
import Select from 'react-select';

export const RolesOptions = ({ handleChange, selectedRole}) => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      const retrievedRoles = await retreiveRoles();

      const refineData = retrievedRoles.map((role) => ({
        value: role.id,
        label: `${role.name}`,
      }));

      setRoles(refineData);
    };

    fetchRoles();
  }, []);

  return (
    <div className="col-span-6 sm:col-span-3">
      <label htmlFor="role" className="block text-sm font-medium text-gray-700">
        Role
      </label>
      <Select
        id="role"
        name="role"
        options={roles}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        value={
          selectedRole !== null ? roles.find((option) => option.value === selectedRole) : null
        }
        onChange={(selectedOption) =>
          handleChange(
            {
              target: {
                name: 'role',
                value: selectedOption.value,
              },
            },
            0,
          )
        }
      />
    </div>
  );
};
