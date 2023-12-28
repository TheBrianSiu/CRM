import {
  Card,
  CardBody,
  Avatar,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  Button,
} from '@material-tailwind/react';
import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/solid';
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
  adminOptions,
  statusOptions,
  changePassword,
  retrieveDataById,
  supervisor,
  updateUser,
} from '@/data';

export function Usersprofile() {
  const animatedComponents = makeAnimated();
  const [Users, setUsers] = useState([]);
  const [Data, setData] = useState([]);
  const [initialUsername, setInitialUsername] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth0();

  const supervisorOptions = Users.map((user) => ({
    value: user.userId,
    label: `${user.first_name} ${user.last_name}`,
  }));

  // change password request
  const Resetpassword = (email) => {
    if (window.confirm('Do you want to reset/change the password?')) {
      changePassword(email)
        .then((data) => {
          alert('Link is sent to user mail box successfully!');
          navigate(-1); // Navigate back after the fetch is successful
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  // retrieve supervisor id
  useEffect(() => {
    supervisor()
      .then((data) => setUsers(data))
      .catch((error) => console.error(error));
  }, []);

  // extract data
  useEffect(() => {
    retrieveDataById(id, user.sub)
      .then((data) => {
        const dataArray = Array.isArray(data) ? data : [data];
        setData(dataArray);
        setInitialUsername(dataArray[0]?.username || '');
      })
      .catch((error) => console.error(error));
  }, [id]);

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (window.confirm('Do you want to submit the form?')) {
      const userToUpdate = Data[0];
      const { username, password, confirm_password, ...userData } =
        userToUpdate; // remove all three

      let updatedData = { ...userData };
      delete updatedData.id;

      // check username has udpated or not
      if (initialUsername !== username) {
        updatedData = { ...updatedData, username };
      }

      updateUser(id, updatedData, user.sub)
        .then((data) => {
          alert('Form submitted successfully!');
          navigate(-1); // Navigate back after the fetch is successful
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setData((prevData) =>
      prevData.map((users, i) =>
        i === index ? { ...users, [name]: value } : users,
      ),
    );
  };

  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url(https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4">
        <CardBody className="p-4">
          {Data.map((users, index) => {
            const className = `py-3 px-5 ${
              index === Data.length - 1 ? '' : 'border-b border-blue-gray-50'
            }`;
            return (
              <div>
                <div className="mb-10 flex items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <Avatar
                      src={users.img}
                      alt="bruce-mars"
                      size="xl"
                      className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                    />
                    <div>
                      <Typography
                        variant="h5"
                        color="blue-gray"
                        className="mb-1"
                      >
                        {users.first_name} {users.last_name}
                      </Typography>
                      <Typography
                        variant="small"
                        className="font-normal text-blue-gray-600"
                      >
                        {users.job_title}
                      </Typography>
                    </div>
                  </div>
                  <div className="w-96">
                    <Tabs value="app">
                      <TabsHeader>
                        <Tab value="app">
                          <HomeIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                          App
                        </Tab>
                        <Tab value="message">
                          <ChatBubbleLeftEllipsisIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" />
                          Message
                        </Tab>
                        <Tab value="settings">
                          <Cog6ToothIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                          Settings
                        </Tab>
                      </TabsHeader>
                    </Tabs>
                  </div>
                </div>
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
                                  htmlFor="firstName"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  First name
                                </label>
                                <input
                                  type="text"
                                  name="firstName"
                                  id="firstName"
                                  autoComplete="given-name"
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  value={users.first_name || ''}
                                  onChange={(e) => handleChange(e, index)}
                                  placeholder="Enter first name"
                                  required
                                />
                              </div>

                              <div className="col-span-6 sm:col-span-3">
                                <label
                                  htmlFor="lastName"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Last name
                                </label>
                                <input
                                  type="text"
                                  name="lastName"
                                  id="lastName"
                                  autoComplete="family-name"
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  value={users.last_name || ''}
                                  onChange={(e) => handleChange(e, index)}
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
                                  value={users.username || ''}
                                  onChange={(e) => handleChange(e, index)}
                                  placeholder="Enter username"
                                  required
                                />
                              </div>

                              <div className="col-span-6 sm:col-span-3">
                                <label
                                  htmlFor="phoneNumber"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Phone Number
                                </label>
                                <input
                                  type="tel"
                                  name="phoneNumber"
                                  id="phoneNumber"
                                  autoComplete="phoneNumber"
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  value={users.phone_number || ''}
                                  onChange={(e) => handleChange(e, index)}
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
                                  value={users.email || ''}
                                  onChange={(e) => handleChange(e, index)}
                                  placeholder="Enter email address"
                                  readOnly
                                  disabled
                                  color="gray"
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
                                  value={users.address || ''}
                                  onChange={(e) => handleChange(e, index)}
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
                                  value={users.department || ''}
                                  onChange={(e) => handleChange(e, index)}
                                  placeholder="Enter department"
                                  required
                                />
                              </div>

                              <div className="col-span-3">
                                <label
                                  htmlFor="jobTitle"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Job Title
                                </label>
                                <input
                                  type="text"
                                  name="jobTitle"
                                  id="jobTitle"
                                  autoComplete="jobTitle"
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  value={users.job_title || ''}
                                  onChange={(e) => handleChange(e, index)}
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
                                    (option) =>
                                      option.value === Data[0].supervisor_id,
                                  )}
                                  onChange={(selectedOption) =>
                                    handleChange(
                                      {
                                        target: {
                                          name: 'supervisor_id',
                                          value: selectedOption.value,
                                        },
                                      },
                                      0,
                                    )
                                  }
                                />
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
                                    (option) => option.value === Data[0].status,
                                  )}
                                  onChange={(selectedOption) =>
                                    handleChange(
                                      {
                                        target: {
                                          name: 'status',
                                          value: selectedOption.value,
                                        },
                                      },
                                      0,
                                    )
                                  }
                                />
                              </div>

                              <div className="col-span-6 sm:col-span-3">
                                <label
                                  htmlFor="isAdmin"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Admin
                                </label>
                                <Select
                                  id="isAdmin"
                                  name="admin"
                                  options={adminOptions}
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  value={adminOptions.find(
                                    (option) =>
                                      option.value === Data[0].is_admin,
                                  )}
                                  onChange={(selectedOption) =>
                                    handleChange(
                                      {
                                        target: {
                                          name: 'is_admin',
                                          value: selectedOption.value,
                                        },
                                      },
                                      0,
                                    )
                                  }
                                />
                              </div>
                            </div>
                          </div>

                          <div className=" bg-gray-50 grid grid-cols-2 gap-6">
                            <div className=" px-4 py-3 text-left sm:px-6">
                              <Button
                                variant="text"
                                size="regular"
                                ripple="light"
                                onClick={() => {
                                  Resetpassword(Data[0].email);
                                }}
                              >
                                Reset/Change password
                              </Button>
                            </div>
                            <div className=" px-4 py-3 text-right sm:px-6">
                              <Button
                                type="submit"
                                color="indigo"
                                buttonType="filled"
                                size="regular"
                                ripple="light"
                              >
                                Save
                              </Button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </CardBody>
      </Card>
    </>
  );
}

export default Usersprofile;
