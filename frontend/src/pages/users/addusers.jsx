import {
  Card,
  CardBody,
  Avatar,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  Button,
} from "@material-tailwind/react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { addUser, supervisor } from "@/data/users-data";
import { adminOptions, statusOptions } from "@/data";
import { useAuth0 } from "@auth0/auth0-react";

export function Addusers() {
  const { user } = useAuth0();
  const animatedComponents = makeAnimated();
  const [Data, setData] = useState({
    username: null,
    first_name: null,
    last_name: null,
    email: null,
    phone_number: null,
    job_title: null,
    department: null,
    status: "",
    address: "",
    is_admin: "0",
    password: null,
    confirm_password: null,
    supervisor_id: "",
  });
  const [Users, setUsers] = useState([]);
  const [Errors, setErrors] = useState({});
  const navigate = useNavigate();

  const supervisorOptions = Users.map((user) => ({
    value: user.user_id,
    label: `${user.first_name} ${user.last_name}`,
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value === "" ? null : value,
    }));
  };
  // password valdiation
  function validatePassword() {
    const { password, confirm_password } = Data;
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$/;

    if (!passwordPattern.test(password)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password:
          "Password must contain 8-16 characters, including uppercase, lowercase, numbers, and special characters.",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "",
      }));
    }

    if (password !== confirm_password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirm_password: "Passwords do not match.",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirm_password: "",
      }));
    }
  }
  //retrieve users for selecting supervisor
  useEffect(() => {
    supervisor()
      .then((data) => setUsers(data))
      .catch((error) => console.error(error));
  }, []);

  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (window.confirm("Do you want to submit a new user?")) {
      const { confirm_password, ...customerdata } = Data; // remove confirm password from state

      addUser(customerdata, user.sub)
        .then((result) => {
          if (result.error) {
            alert(result.error);
          } else {
            alert("The user is added successfully!");
            navigate(-1); 
          }
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url(https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4">
        <CardBody className="p-4">
          <div className="mt-10 sm:mt-0">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Personal Information
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Use a permanent address where you can receive mail.
                  </p>
                </div>
              </div>
              <div className="mt-5 md:col-span-2 md:mt-0">
                <form onSubmit={handleSubmit} method="PUT">
                  <div className="overflow-hidden shadow sm:rounded-md">
                    <div className="bg-white px-4 py-5 sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="first_name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            First name
                          </label>
                          <input
                            type="text"
                            name="first_name"
                            id="first_name"
                            autoComplete="given-name"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            value={Data.first_name || ""}
                            onChange={handleChange}
                            placeholder="Enter first name"
                            required
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="last_name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Last name
                          </label>
                          <input
                            type="text"
                            name="last_name"
                            id="last_name"
                            autoComplete="family-name"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            value={Data.last_name || ""}
                            onChange={handleChange}
                            placeholder="Enter last name"
                            required
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Username
                          </label>
                          <input
                            type="text"
                            name="username"
                            id="username"
                            autoComplete="username"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            value={Data.username || ""}
                            onChange={handleChange}
                            placeholder="Enter username"
                            required
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="phone_number"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            name="phone_number"
                            id="phone_number"
                            autoComplete="phone_number"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            value={Data.phone_number || ""}
                            onChange={handleChange}
                            placeholder="999-999-999"
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                            required
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-6">
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Email address
                          </label>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            autoComplete="email"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            value={Data.email || ""}
                            onChange={handleChange}
                            placeholder="Enter email address"
                            required
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="address"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Location
                          </label>
                          <input
                            type="text"
                            name="address"
                            id="address"
                            autoComplete="street-address"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            value={Data.address || ""}
                            onChange={handleChange}
                            placeholder="Enter address"
                            required
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="department"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Department
                          </label>
                          <input
                            type="text"
                            name="department"
                            id="department"
                            autoComplete="department"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            value={Data.department || ""}
                            onChange={handleChange}
                            placeholder="Enter department"
                            required
                          />
                        </div>

                        <div className="col-span-3">
                          <label
                            htmlFor="job_title"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Job Title
                          </label>
                          <input
                            type="text"
                            name="job_title"
                            id="job_title"
                            autoComplete="job_title"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            value={Data.job_title || ""}
                            onChange={handleChange}
                            placeholder="Enter job title"
                            required
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="supervisor_id"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Supervisor
                          </label>
                          <Select
                            id="supervisor_id"
                            name="supervisor_id"
                            components={animatedComponents}
                            options={supervisorOptions}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            value={supervisorOptions.find(
                              (option) => option.value === Data.supervisor_id
                            )}
                            onChange={(selectedOption) =>
                              handleChange(
                                {
                                  target: {
                                    name: "supervisor_id",
                                    value: selectedOption.value,
                                  },
                                },
                                0
                              )
                            }
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            name="password"
                            autoComplete="new-password"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            value={Data.password || ""}
                            onChange={handleChange}
                            onBlur={validatePassword}
                            placeholder="Enter password"
                            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$"
                            required
                          />
                          {Errors.password && (
                            <p className="text-red-500">
                              {Errors.confirm_password}
                            </p>
                          )}
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label className="block text-sm font-medium text-gray-700">
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            name="confirm_password"
                            autoComplete="new-password"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            value={Data.confirm_password || ""}
                            onChange={handleChange}
                            onBlur={validatePassword}
                            placeholder="Enter confirm password"
                            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$"
                            required
                          />
                          {Errors.password && (
                            <p className="text-red-500">{Errors.password}</p>
                          )}
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="status"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Status
                          </label>
                          <Select
                            id="status"
                            name="status"
                            options={statusOptions}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            value={statusOptions.find(
                              (option) => option.value === Data.status
                            )}
                            onChange={(selectedOption) =>
                              handleChange(
                                {
                                  target: {
                                    name: "status",
                                    value: selectedOption.value,
                                  },
                                },
                                0
                              )
                            }
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="is_admin"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Admin
                          </label>
                          <Select
                            id="is_admin"
                            name="admin"
                            options={adminOptions}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            value={adminOptions.find(
                              (option) => option.value === Data.is_admin
                            )}
                            onChange={(selectedOption) =>
                              handleChange(
                                {
                                  target: {
                                    name: "is_admin",
                                    value: selectedOption.value,
                                  },
                                },
                                0
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                      <Button
                        type="submit"
                        color="indigo"
                        buttonType="filled"
                        size="regular"
                        ripple="light"
                      >
                        Add User
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default Addusers;
