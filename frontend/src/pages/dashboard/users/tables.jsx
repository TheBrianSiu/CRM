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
import moment from 'moment';
import { Link, Outlet } from "react-router-dom";
import { useState,useEffect } from "react";


export function Tables() {
  const [Userdata, setUserdata] = useState([]);
  useEffect(()=>{
    fetch('http://localhost:8080/users-table')
    .then(reponse => reponse.json())
    .then(data => setUserdata(data))
    .catch(error => console.error(error));
  })
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Users Table
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Users", "Role", "status", "created", ""].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
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
              {Userdata.map(
                ({ img, first_name, last_name, email, role, status, date, user_id}, key) => {
                  const className = `py-3 px-5 ${
                    key === Userdata.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;
                  const formatdate = moment(date).format('YYYY-MM-DD');
                  return (
                    <tr key={first_name+" "+last_name}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Avatar src={img} alt={first_name+last_name} size="sm" />
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {first_name+" "+last_name}
                            </Typography>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {email}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {role}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Chip
                          variant="gradient"
                          color={status === '1' ? "green" : "blue-gray"}
                          value={status === '1' ? "active" : "inactive"}
                          className="py-0.5 px-2 text-[11px] font-medium"
                        />
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          <time dateTime="2017-02-14">{formatdate}</time>
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          as="a"
                          href={`tables/edit/${user_id}`}
                          className="text-xs font-semibold text-blue-gray-600">
                            Edit
                        </Typography>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
      <Outlet />
    </div>
  );
}

export default Tables;
