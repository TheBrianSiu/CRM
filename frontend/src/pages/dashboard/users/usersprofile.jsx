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
import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export function Usersprofile() {
  const [Users, setUsers] = useState([])
  const [UsersData, setUsersData] = useState([]);
  const [initialUsername, setInitialUsername] = useState("");
  const [Errors, setErrors] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();


    // password valdiation
    function validatePassword(){
      const { password, confirm_password } = CustData;
      const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$/;
  
      if (!passwordPattern.test(password)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: "Password must contain 8-16 characters, including uppercase, lowercase, numbers, and special characters.",
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

    // retrieve supervisor id
    useEffect(()=>{
      fetch(`http://localhost:8080/users-table/supervisor`)
      .then((reponse)=> reponse.json())
      .then((data)=> setUsers(data))
      .catch((error)=> console.error(error));
    }, []);
    

  //extract data
  useEffect(() => {
    fetch(`http://localhost:8080/users-table/${id}`)
      .then((reponse) => reponse.json())
      .then((data) => {
        const dataArray = Array.isArray(data) ? data : [data];
        setUsersData(dataArray);
        setInitialUsername(dataArray[0]?.username || "");
      })
      .catch((error) => console.error(error));
  }, [id]);

  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (window.confirm("Do you want to submit the form?")) {
      const userToUpdate = UsersData[0];
      const { username, password, confirm_password, ...userData } = userToUpdate;
  
      let updatedData = { ...userData };
      delete updatedData.id;
  
      // Check if the user has updated the password
      if (password !== null && confirm_password !== null) {
        // Include the password fields in the updatedData object
        updatedData = { ...updatedData, password };
      }

      console.log(initialUsername);
      console.log(username);

      //check username has udpated or not
      if(initialUsername !== username){
        updatedData ={...updatedData, username};
      }

      fetch(`http://localhost:8080/users-table/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      })
        .then((res) => {
          if (!res.ok) {
            return res.text().then((text) => {
              throw new Error(text);
            });
          } else {
            return res.json();
          }
        })
        .then(function (data) {
          alert("Form submitted successfully!");
          navigate(-1); // Navigate back after the fetch is successful
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setUsersData((prevUsersData) =>
      prevUsersData.map((users, i) =>
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
        {UsersData.map((users, index) => {
            const className = `py-3 px-5 ${
              index === UsersData.length - 1
                ? ""
                : "border-b border-blue-gray-50"
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
                              value={users.first_name || ""}
                              onChange={(e) => handleChange(e, index)}
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
                              value={users.last_name || ""}
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
                              value={users.username || ""}
                              onChange={(e) => handleChange(e, index)}
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
                              value={users.phone_number || ""}
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
                              value={users.email || ""}
                              onChange={(e) => handleChange(e, index)}
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
                              value={users.address || ""}
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
                              value={users.department || ""}
                              onChange={(e) => handleChange(e, index)}
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
                              value={users.job_title || ""}
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
                              Supervisor ID
                            </label>
                            <select
                              id="supervisor_id"
                              name="supervisor_id"
                              autoComplete="supervisor_id"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              value={users.supervisor_id || ""}
                              onChange={(e) => handleChange(e, index)}
                            >
                              <option value={null}> </option>
                              {Users.map((user) => (
                                <option value={user.user_id}>
                                  {user.first_name} {user.last_name}
                                </option>
                              ))}
                            </select>
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
                              value={users.password || ""}
                              onChange={(e) => handleChange(e, index)}
                              onBlur={validatePassword}
                              placeholder="Enter password"
                              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$"
                            />
                            {Errors.password && <p className="text-red-500">{Errors.confirm_password}</p>}
                          </div>
      
                          <div className="col-span-6 sm:col-span-3">
                            <label
                              className="block text-sm font-medium text-gray-700"
                            >
                              Confirm Password
                            </label>
                            <input
                              type="password"
                              name="confirm_password"
                              autoComplete="new-password"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              value={users.confirm_password || ""}
                              onChange={(e) => handleChange(e, index)}
                              onBlur={validatePassword}
                              placeholder="Enter confirm password"
                              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$"
                            />
                            {Errors.password && <p className="text-red-500">{Errors.password}</p>}
                          </div>
      
                          <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="status"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Status
                            </label>
                            <select
                              id="status"
                              name="status"
                              autoComplete="status"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              value={users.status || ""}
                              onChange={(e) => handleChange(e, index)}
                              required
                            >
                              <option value="0">Active</option>
                              <option value="1">Inactive</option>
                            </select>
                          </div>
      
                          <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="IS_ADMIN"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Admin Privileges
                            </label>
                            <select
                              id="IS_ADMIN"
                              name="IS_ADMIN"
                              autoComplete="IS_ADMIN"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              value={users.IS_ADMIN || ""}
                              onChange={(e) => handleChange(e, index)}
                              required
                            >
                              <option value="0">Yes</option>
                              <option value="1">No</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
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
