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
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import {
  addAssignees,
  addCustomers,
  addProjects,
  customerBasicInfo,
} from '../../data/projects-data';
import { supervisor } from '../../data/users-data';
import { priorityOptions, taskstatusOptions } from '@/data';

export function Addprojects() {
  const animatedComponents = makeAnimated();
  const navigate = useNavigate();
  const [Cust, setCust] = useState([]);
  const [User, setUser] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedCust, setSelectedCust] = useState([]);
  const [Data, setData] = useState([
    {
      task_name: '',
      due_date: '',
      description: '',
      attachments: '',
      est_hours: '',
      est_value: '',
      lead_status: '',
      priority: '',
    },
  ]);

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (window.confirm('Do you want to submit a new task?')) {
      const customerdata = { ...Data[0] };

      addProjects(customerdata)
        .then((data) => {
          const generatedId = data.id;
          if (selectedUsers.length > 0) {
            handleSelectedUsers(generatedId);
          }
          if (selectedCust.length > 0) {
            handleSelectedCust(generatedId);
          }
          else if (selectedUsers.length === 0 && selectedCust.length === 0) {
            alert('The task is added successfully!');
            navigate(-1);
          }
          alert('The task is added successfully!');
          navigate(-1);
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  // conditional submit
  function handleSelectedUsers(generatedId) {
    const userProjectData = selectedUsers.map((user) => ({
      project_id: generatedId,
      assignee_id: user.value,
    }));

    addAssignees(userProjectData)
      .then((data) => {
        if (selectedCust.length === 0) {
          alert('The task is added successfully!');
          navigate(-1);
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

  // conditional submit
  function handleSelectedCust(generatedId) {
    const custProjectData = selectedCust.map((cust) => ({
      project_id: generatedId,
      customer_id: cust.value,
    }));

    addCustomers(custProjectData)
      .then((data) => {
        if (selectedUsers.length === 0) {
          alert('The task is added successfully!');
          navigate(-1);
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setData((prevCustData) =>
      prevCustData.map((task, i) =>
        i === index ? { ...task, [name]: value } : task,
      ),
    );
  };

  // retrieve data
  useEffect(() => {
    supervisor()
      .then((data) => setUser(data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    customerBasicInfo()
      .then((data) => setCust(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url(https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4">
        <CardBody className="p-4">
          {Data.map((task,index) => (
            <div key={index}>
              <div className="mb-10 flex items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <Avatar
                    src={task.img}
                    alt="Project logo"
                    size="xl"
                    className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                  />
                  <div>
                    <Typography variant="h5" color="blue-gray" className="mb-1">
                      {task.task_name}
                    </Typography>
                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-600"
                    >
                      {task.description}
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
                        Project Information
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        Please provide the details of the project.
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 md:col-span-2 md:mt-0">
                    <form onSubmit={handleSubmit} method="POST">
                      <div className="overflow-hidden shadow sm:rounded-md">
                        <div className="bg-white px-4 py-5 sm:p-6">
                          <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6 sm:col-span-4">
                              <label
                                htmlFor="taskname"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Task Name
                              </label>
                              <input
                                type="text"
                                name="task_name"
                                id="taskname"
                                autoComplete="taskname"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                value={Data[0].task_name}
                                onChange={(e) => handleChange(e, 0)}
                                required
                              />
                            </div>

                            <div className="col-span-6">
                              <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Description
                              </label>
                              <textarea
                                name="description"
                                id="description"
                                autoComplete="description"
                                rows="3"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                value={Data[0].description}
                                onChange={(e) => handleChange(e, 0)}
                              />
                            </div>

                            <div className="col-span-6 sm:col-span-4">
                              <label
                                htmlFor="duedate"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Due Date
                              </label>
                              <input
                                type="date"
                                name="due_date"
                                id="duedate"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                value={Data[0].due_date}
                                onChange={(e) => handleChange(e, 0)}
                                required
                              />
                            </div>

                            {/* <div className="col-span-6 sm:col-span-3">
                                <label
                                  htmlFor="attachments"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Attachments
                                </label>
                                <input
                                  type="text"
                                  name="attachments"
                                  id="attachments"
                                  autoComplete="attachments"
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  value={Data[0].attachments}
                                  onChange={(e) => handleChange(e, 0)}
                                />
                              </div> */}

                            <div className="col-span-6 sm:col-span-3 ">
                              <label
                                htmlFor="est_hours"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Estimated Hours
                              </label>
                              <input
                                type="number"
                                name="est_hours"
                                id="est_hours"
                                autoComplete="est_hours"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                value={Data[0].est_hours}
                                onChange={(e) => handleChange(e, 0)}
                              />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                              <label
                                htmlFor="estValue"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Estimated Value
                              </label>
                              <input
                                type="number"
                                name="est_value"
                                id="estValue"
                                autoComplete="estValue"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                value={Data[0].est_value}
                                onChange={(e) => handleChange(e, 0)}
                              />
                            </div>

                            <div className="col-span-6 sm:col-span-3 ">
                              <label
                                htmlFor="leadStatus"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Lead Status
                              </label>
                              <Select
                                id="leadStatus"
                                name="lead_status"
                                options={taskstatusOptions}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                value={taskstatusOptions.find(
                                  (option) =>
                                    option.value === Data[0].lead_status,
                                )}
                                onChange={(selectedOption) =>
                                  handleChange(
                                    {
                                      target: {
                                        name: 'lead_status',
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
                                htmlFor="priority"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Priority
                              </label>
                              <Select
                                id="priority"
                                name="priority"
                                options={priorityOptions}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                value={priorityOptions.find(
                                  (option) => option.value === Data[0].priority,
                                )}
                                onChange={(selectedOption) =>
                                  handleChange(
                                    {
                                      target: {
                                        name: 'priority',
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
                                htmlFor="userId"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Assignees
                              </label>
                              <Select
                                closeMenuOnSelect={false}
                                components={animatedComponents}
                                isMulti
                                options={User.map((user) => ({
                                  value: user.user_id,
                                  label: `${user.first_name} ${user.last_name}`,
                                }))}
                                value={selectedUsers}
                                onChange={setSelectedUsers}
                              />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                              <label
                                htmlFor="cust_id"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Customers
                              </label>
                              <Select
                                closeMenuOnSelect={false}
                                components={animatedComponents}
                                isMulti
                                options={Cust.map((cust) => ({
                                  value: cust.id,
                                  label: `${cust.first_name} ${cust.last_name}`,
                                }))}
                                value={selectedCust}
                                onChange={setSelectedCust}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                          <Button type="submit" onClick={handleSubmit}>
                            Save
                          </Button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardBody>
      </Card>
    </>
  );
}

export default Addprojects;
