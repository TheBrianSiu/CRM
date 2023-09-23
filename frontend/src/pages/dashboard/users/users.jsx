import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Fuse from "fuse.js";
import { deleteuser, retrievedata } from "./api/api";

function Deleteuser(id) {
  if (window.confirm("Do you want to delete the user?")) {
      deleteuser(id)
      .then((data) => {
        console.log("Response data:", data);
        alert("The user is deleted");
      })
      .catch((error) => console.error(error));
  }
}

function formatPhoneNumber(phoneNumber) {
  const cleaned = ("" + phoneNumber).replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phoneNumber;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function Users() {
  const navigate = useNavigate();
  const [Userdata, setUserdata] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [lastItemIndex, setLastItemIndex] = useState(itemsPerPage);


  // retrieve data
  useEffect(() => {
    retrievedata()
      .then((data) => setUserdata(data))
      .catch((error) => console.error(error));
  }, [Userdata]);

  // navigation
  function adduser() {
    navigate("add");
  }

  // search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const options = {
    keys: ["first_name", "last_name", "email", "phone_number", "status"],
    threshold: 0.3,
    location: 0,
    distance: 100,
    includeMatches: true,
    includeScore: true,
    useExtendedSearch: true,
  };

  const fuse = new Fuse(Userdata, options);

  const filteredUserdata = searchQuery
    ? fuse.search(searchQuery).map((result) => result.item)
    : Userdata;

  // switching pages
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(filteredUserdata.length / itemsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUserdata.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  return (
    <div className="mb-8 mt-12 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Users Table
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pb-2 pt-0">
          <div className="bg-100 grid w-full min-w-[640px] grid-cols-10 gap-4">
            <div className="col-span-5 ml-3 flex">
              <input
                className="flex-grow px-2 text-base text-gray-400 outline-none"
                type="text"
                placeholder="Search name, address..."
                required
                value={searchQuery}
                onChange={handleSearch}
              />
              <div className="col-start-10 justify-start ">
                <button className="rounded-lg bg-blue-500 px-4 py-2 text-base font-thin text-white">
                  Search
                </button>
              </div>
            </div>
            {/* <div className="flex col-start-9 justify-center">
              <select className="rounded-lg border-2 px-4 py-2 text-base text-gray-800 outline-none">
                <option value="first_name" selected>
                  Sort
                </option>
                <option value="net">Date</option>
                <option value="org">A to Z</option>
              </select>
            </div> */}
            <div className="col-start-10 justify-start">
              <button
                type="button"
                className="rounded-lg border-2 px-4 py-2 text-base text-gray-800 outline-none"
                onClick={adduser}
              >
                Add
              </button>
            </div>
          </div>
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {[
                  "name",
                  "phone number",
                  "role",
                  "status",
                  "last login",
                  "",
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
                    user_id,
                    first_name,
                    last_name,
                    email,
                    phone_number,
                    job_title,
                    department,
                    status,
                    last_login,
                  },
                  key,
                ) => {
                  const className = `py-3 px-5 ${
                    key === Userdata.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;
                  const p_umber = formatPhoneNumber(phone_number);
                  return (
                    <tr key={first_name + last_name}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {first_name + " " + last_name}
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
                          {job_title}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Chip
                          variant="gradient"
                          color={status === "0" ? "green" : "blue-gray"}
                          value={status === "0" ? "active" : "inactive"}
                          className="px-2 py-0.5 text-center text-[11px] font-medium"
                        />
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {last_login == null ? null : formatDate(last_login)}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          as="a"
                          href={`users/edit/${user_id}`}
                          className="text-xs font-semibold text-blue-gray-600"
                        >
                          Edit
                        </Typography>
                        <Typography
                          as="a"
                          onClick={() => Deleteuser(user_id)}
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
          <div className="mt-4 flex justify-center">
            <nav aria-label="Page navigation">
              <ul className="inline-flex -space-x-px text-sm">
                <li>
                  <a
                    href="#"
                    onClick={handlePrevPage}
                    className={`ml-0 flex h-8 items-center justify-center rounded-l-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                      currentPage === 1 ? "pointer-events-none" : ""
                    }`}
                  >
                    Previous
                  </a>
                </li>
                {Array.from({
                  length: Math.ceil(filteredUserdata.length / itemsPerPage),
                }).map((_, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      onClick={() => setCurrentPage(index + 1)}
                      className={`flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                        currentPage === index + 1
                          ? "bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                          : ""
                      }`}
                    >
                      {index + 1}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="#"
                    onClick={handleNextPage}
                    className={`flex h-8 items-center justify-center rounded-r-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                      indexOfLastItem >= filteredUserdata.length
                        ? "pointer-events-none"
                        : ""
                    }`}
                  >
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default Users;
