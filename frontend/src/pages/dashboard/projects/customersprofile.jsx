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

export function Customersprofile() {
  const [CustData, setCustData] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  //extract data
  useEffect(() => {
    fetch(`http://localhost:8080/customers-table/${id}`)
      .then((reponse) => reponse.json())
      .then((data) => {
        const dataArray = Array.isArray(data) ? data : [data];
        setCustData(dataArray);
      })
      .catch((error) => console.error(error));
  }, [id]);

  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (window.confirm("Do you want to submit the form?")) {
      const customerToUpdate = CustData[0];
      const updatedData = { ...customerToUpdate, ...CustData[0] };
      delete updatedData.id;

      fetch(`http://localhost:8080/customers-table/update/${id}`, {
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
    setCustData((prevCustData) =>
      prevCustData.map((customer, i) =>
        i === index ? { ...customer, [name]: value } : customer,
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
          {CustData.map((customer, index) => {
            const className = `py-3 px-5 ${
              index === CustData.length - 1
                ? ""
                : "border-b border-blue-gray-50"
            }`;
            return (
              <div>
                <div className="mb-10 flex items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <Avatar
                      src={customer.img}
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
                        {customer.first_name} {customer.last_name}
                      </Typography>
                      <Typography
                        variant="small"
                        className="font-normal text-blue-gray-600"
                      >
                        {customer.address_city}, {customer.address_state}
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
                                  value={customer.first_name}
                                  onChange={(e) => handleChange(e, index)}
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
                                  value={customer.last_name}
                                  onChange={(e) => handleChange(e, index)}
                                />
                              </div>

                              <div className="col-span-6 sm:col-span-3">
                                <label
                                  htmlFor="email"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Email address
                                </label>
                                <input
                                  type="text"
                                  name="email"
                                  id="email"
                                  autoComplete="email"
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  value={customer.email}
                                  onChange={(e) => handleChange(e, index)}
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
                                  value={customer.phone_number}
                                  onChange={(e) => handleChange(e, index)}
                                  placeholder="999-999-999"
                                  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                                  required
                                />
                              </div>

                              <div className="col-span-6 sm:col-span-3">
                                <label
                                  htmlFor="address_country"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Country / Region
                                </label>
                                <select
                                  id="address_country"
                                  name="address_country"
                                  autoComplete="address_country"
                                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                  value={customer.address_country}
                                  onChange={(e) => handleChange(e, index)}
                                >
                                  <option>United States</option>
                                  <option>Canada</option>
                                  <option>Mexico</option>
                                </select>
                              </div>

                              <div className="col-span-6">
                                <label
                                  htmlFor="address_street"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Street address
                                </label>
                                <input
                                  type="text"
                                  name="address_street"
                                  id="address_street"
                                  autoComplete="street-address"
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  value={customer.address_street}
                                  onChange={(e) => handleChange(e, index)}
                                />
                              </div>

                              <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                <label
                                  htmlFor="address_city"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  City
                                </label>
                                <input
                                  type="text"
                                  name="address_city"
                                  id="address_city"
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  value={customer.address_city}
                                  onChange={(e) => handleChange(e, index)}
                                />
                              </div>

                              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                <label
                                  htmlFor="address_state"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  State / Province
                                </label>
                                <input
                                  type="text"
                                  name="address_state"
                                  id="address_state"
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  value={customer.address_state}
                                  onChange={(e) => handleChange(e, index)}
                                />
                              </div>

                              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                <label
                                  htmlFor="address_zip_code"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  ZIP / Postal
                                </label>
                                <input
                                  type="text"
                                  name="address_zip_code"
                                  id="address_zip_code"
                                  autoComplete="address_zip_code"
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  value={customer.address_zip_code}
                                  onChange={(e) => handleChange(e, index)}
                                />
                              </div>

                              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                <label
                                  htmlFor="location_preference"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  LOCATION PREFERENCE
                                </label>
                                <input
                                  type="text"
                                  name="location_preference"
                                  id="location_preference"
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  value={customer.location_preference}
                                  onChange={(e) => handleChange(e, index)}
                                />
                              </div>

                              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                <label
                                  htmlFor="property_type"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  PROPERTY TYPE
                                </label>
                                <input
                                  type="text"
                                  name="property_type"
                                  id="property_type"
                                  autoComplete="property-type"
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  value={customer.property_type}
                                  onChange={(e) => handleChange(e, index)}
                                />
                              </div>

                              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                <label
                                  htmlFor="bedrooms"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  BEDROOMS
                                </label>
                                <input
                                  type="text"
                                  name="bedrooms"
                                  id="bedrooms"
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  value={customer.bedrooms}
                                  onChange={(e) => handleChange(e, index)}
                                />
                              </div>

                              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                <label
                                  htmlFor="bathrooms"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  BATHROOMS
                                </label>
                                <input
                                  type="text"
                                  name="bathrooms"
                                  id="bathrooms"
                                  autoComplete="bathrooms"
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  value={customer.bathrooms}
                                  onChange={(e) => handleChange(e, index)}
                                />
                              </div>

                              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                <label
                                  htmlFor="budget"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  BUDGET
                                </label>
                                <input
                                  type="text"
                                  name="budget"
                                  id="budget"
                                  autoComplete="budget"
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  value={customer.budget}
                                  onChange={(e) => handleChange(e, index)}
                                />
                              </div>
                              <div>
                                <label
                                  htmlFor="TIMELINE"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  TIMELINE
                                </label>
                                <input
                                  type="text"
                                  name="timeline"
                                  id="TIMELINE"
                                  autoComplete="TIMELINE"
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  value={customer.timeline}
                                  onChange={(e) => handleChange(e, index)}
                                />
                              </div>

                              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                <label
                                  htmlFor="FINANCING_OPTIONS"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  FINANCING OPTIONS
                                </label>
                                <input
                                  type="text"
                                  name="financing_option"
                                  id="FINANCING_OPTIONS"
                                  autoComplete="FINANCING_OPTIONS"
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  value={customer.financing_option}
                                  onChange={(e) => handleChange(e, index)}
                                />
                              </div>

                              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                <label
                                  htmlFor="ASSIGNED_AGENT"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  ASSIGNED AGENT
                                </label>
                                <input
                                  type="text"
                                  name="assigned_agent"
                                  id="ASSIGNED_AGENT"
                                  autoComplete="ASSIGNED_AGENT"
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  value={customer.assigned_agent}
                                  onChange={(e) => handleChange(e, index)}
                                />
                              </div>

                              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                <label
                                  htmlFor="LEAD_SOURCE"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  LEAD SOURCE
                                </label>
                                <input
                                  type="text"
                                  name="lead_source"
                                  id="LEAD_SOURCE"
                                  autoComplete="LEAD_SOURCE"
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  value={customer.lead_source}
                                  onChange={(e) => handleChange(e, index)}
                                />
                              </div>

                              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                <label
                                  htmlFor="STATUS"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  STATUS
                                </label>
                                <select
                                  type="STATUS"
                                  name="status"
                                  id="STATUS"
                                  autoComplete="STATUS"
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  value={customer.status}
                                  onChange={(e) => handleChange(e, index)}
                                >
                                  <option value={0}>Active</option>
                                  <option value={1}>Inactive</option>
                                </select>
                              </div>

                              <div className="col-span-12 sm:col-span-6 lg:col-span-2">
                                <label
                                  htmlFor="NOTES"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  NOTES
                                </label>
                                <textarea
                                  name="notes"
                                  id="NOTES"
                                  autoComplete="NOTES"
                                  className=" mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  value={customer.notes}
                                  rows="2"
                                  onChange={(e) => handleChange(e, index)}
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
            );
          })}
        </CardBody>
      </Card>
    </>
  );
}

export default Customersprofile;
