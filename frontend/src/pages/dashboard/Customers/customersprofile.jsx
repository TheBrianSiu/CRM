import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Avatar,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  Switch,
  Tooltip,
  Button,
} from "@material-tailwind/react";
import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import { useParams } from "react-router-dom";
import { ProfileInfoCard } from "@/widgets/cards";
import { useEffect, useState } from "react";

export function Customersprofile() {
  const [UserData, setUserData] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:8080/user-table/${id}`)
      .then((reponse) => reponse.json())
      .then((data) => setUserData(data))
      .catch((error) => console.error(error));
  }, []);
  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url(https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4">
        <CardBody className="p-4">
          {UserData.map(
            (
              {
                img,
                first_name,
                last_name,
                email,
                role,
                status,
                date,
                user_id,
              },
              key,
            ) => {
              const className = `py-3 px-5 ${
                key === UserData.length - 1
                  ? ""
                  : "border-b border-blue-gray-50"
              }`;
              return (
                <>
                  <div className="mb-10 flex items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                      <Avatar
                        src={img}
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
                          {first_name + " " + last_name}
                        </Typography>
                        <Typography
                          variant="small"
                          className="font-normal text-blue-gray-600"
                        >
                          {role}
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
                  <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
                    <form className="w-full max-w-lg">
                      <div className="-mx-3 mb-6 flex flex-wrap">
                        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                          <label
                            className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                            htmlFor="grid-first-name"
                          >
                            First Name
                          </label>
                          <input
                            className="mb-3 block w-full appearance-none rounded border border-red-500 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:bg-white focus:outline-none"
                            id="grid-first-name"
                            type="text"
                            placeholder="Jane"
                          />
                          <p className="text-xs italic text-red-500">
                            Please fill out this field.
                          </p>
                        </div>
                        <div className="w-full px-3 md:w-1/2">
                          <label
                            className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                            htmlFor="grid-last-name"
                          >
                            Last Name
                          </label>
                          <input
                            className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                            id="grid-last-name"
                            type="text"
                            placeholder="Doe"
                          />
                        </div>
                      </div>
                      <div className="-mx-3 mb-6 flex flex-wrap">
                        <div className="w-full px-3">
                          <label
                            className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                            htmlFor="grid-password"
                          >
                            Password
                          </label>
                          <input
                            className="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                            id="grid-password"
                            type="password"
                            placeholder="******************"
                          />
                          <p className="text-xs italic text-gray-600">
                            Make it as long and as crazy as you'd like
                          </p>
                        </div>
                      </div>
                      <div className="-mx-3 mb-2 flex flex-wrap">
                        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
                          <label
                            className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                            htmlFor="grid-city"
                          >
                            City
                          </label>
                          <input
                            className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                            id="grid-city"
                            type="text"
                            placeholder="Albuquerque"
                          />
                        </div>
                        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
                          <label
                            className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                            htmlFor="grid-state"
                          >
                            State
                          </label>
                          <div className="relative">
                            <select
                              className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                              id="grid-state"
                            >
                              <option>New Mexico</option>
                              <option>Missouri</option>
                              <option>Texas</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                              <svg
                                className="h-4 w-4 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
                          <label
                            className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                            htmlFor="grid-zip"
                          >
                            Zip
                          </label>
                          <input
                            className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                            id="grid-zip"
                            type="text"
                            placeholder="90210"
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </>
              );
            },
          )}
        </CardBody>
      </Card>
    </>
  );
}

export default Customersprofile;
