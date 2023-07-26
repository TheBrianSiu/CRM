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


function formatPhoneNumber(phoneNumber) {
  const cleaned = ('' + phoneNumber).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phoneNumber;
}


export function Customers() {
  const [Userdata, setUserdata] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/customers-table")
      .then((reponse) => reponse.json())
      .then((data) => setUserdata(data))
      .catch((error) => console.error(error));
  });

  return (
    <div className="mb-8 mt-12 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Customer Table
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pb-2 pt-0">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {[
                  "Users",
                  "Phone number",
                  "status",
                  "address",
                  "property type",
                  "location preference",
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
              {Userdata.map(
                (
                  {
                    id,
                    first_name,
                    last_name,
                    phone_number,
                    email,
                    address_city,
                    address_country,
                    property_type,
                    location_preference,
                    status,
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
                        <Chip
                          variant="gradient"
                          color={status === "0" ? "green" : "blue-gray"}
                          value={status === "0" ? "active" : "inactive"}
                          className="px-2 py-0.5 text-[11px] font-medium"
                        />
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {address_city},{" "+address_country}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {property_type}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {location_preference}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          as="a"
                          href={`customers/edit/${id}`}
                          className="text-xs font-semibold text-blue-gray-600"
                        >
                          Edit
                        </Typography>
                      </td>
                    </tr>
                  );
                },
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default Customers;
