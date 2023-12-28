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
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { addCusts, countryOptions, statusOptions } from '@/data';

export function Addcustomers() {
  const { user } = useAuth0();
  const [Data, setData] = useState([
    {
      first_name: '',
      last_name: '',
      phone_number: '',
      email: '',
      property_type: '',
      location_preference: '',
      bedrooms: '',
      bathrooms: '',
      budget: '',
      financing_option: '',
      timeline: '',
      notes: '',
      lead_source: '',
      status: '',
      assigned_agent: '',
      img: '',
      address_country: '',
      address_street: '',
      address_zip_code: '',
      address_city: '',
      address_state: '',
      is_deleted: '0',
    },
  ]);
  const navigate = useNavigate();

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (window.confirm('Do you want to submit a new customer?')) {
      const customerdata = { ...Data[0] };
      addCusts(customerdata, user.sub)
        .then((result) => {
          if (result.error) {
            alert(result.error);
          } else {
            alert('The customer is added successfully!');
            navigate(-1);
          }
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setData((prevData) =>
      prevData.map((customer, i) =>
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
          {Data.map((customer, index) => (
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
                    <Typography variant="h5" color="blue-gray" className="mb-1">
                      {customer.first_name} {customer.last_name}
                    </Typography>
                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-600"
                    >
                      {customer.address_city},{customer.address_state}
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
                                name="first_name"
                                id="firstName"
                                autoComplete="given-name"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                value={customer.first_name}
                                onChange={(e) => handleChange(e, index)}
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
                                name="last_name"
                                id="lastName"
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
                                htmlFor="phoneNumber"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Phone Number
                              </label>
                              <input
                                type="tel"
                                name="phone_number"
                                id="phoneNumber"
                                autoComplete="phoneNumber"
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
                                htmlFor="country"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Country/ Region
                              </label>
                              <Select
                                id="addressCountry"
                                name="country"
                                options={countryOptions}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                value={countryOptions.find(
                                  (option) =>
                                    option.value === Data[0].address_country,
                                )}
                                onChange={(selectedOption) =>
                                  handleChange(
                                    {
                                      target: {
                                        name: 'address_country',
                                        value: selectedOption.value,
                                      },
                                    },
                                    0,
                                  )
                                }
                              />
                            </div>

                            <div className="col-span-6">
                              <label
                                htmlFor="addressStreet"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Street address
                              </label>
                              <input
                                type="text"
                                name="address_street"
                                id="addressStreet"
                                autoComplete="street-address"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                value={customer.address_street}
                                onChange={(e) => handleChange(e, index)}
                              />
                            </div>

                            <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                              <label
                                htmlFor="addressCity"
                                className="block text-sm font-medium text-gray-700"
                              >
                                City
                              </label>
                              <input
                                type="text"
                                name="address_city"
                                id="addressCity"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                value={customer.address_city}
                                onChange={(e) => handleChange(e, index)}
                              />
                            </div>

                            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                              <label
                                htmlFor="addressState"
                                className="block text-sm font-medium text-gray-700"
                              >
                                State / Province
                              </label>
                              <input
                                type="text"
                                name="address_state"
                                id="addressState"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                value={customer.address_state}
                                onChange={(e) => handleChange(e, index)}
                              />
                            </div>

                            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                              <label
                                htmlFor="addressZipCode"
                                className="block text-sm font-medium text-gray-700"
                              >
                                ZIP / Postal
                              </label>
                              <input
                                type="text"
                                name="address_zip_code"
                                id="addressZipCode"
                                autoComplete="addressZipCode"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                value={customer.address_zip_code}
                                onChange={(e) => handleChange(e, index)}
                              />
                            </div>

                            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                              <label
                                htmlFor="locationPreference"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Location reference
                              </label>
                              <input
                                type="text"
                                name="location_preference"
                                id="locationPreference"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                value={customer.location_preference}
                                onChange={(e) => handleChange(e, index)}
                              />
                            </div>

                            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                              <label
                                htmlFor="propertyType"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Property type
                              </label>
                              <input
                                type="text"
                                name="property_type"
                                id="propertyType"
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
                                Bedrooms
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
                                Bathrooms
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
                                Budget
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
                            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                              <label
                                htmlFor="TIMELINE"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Time line
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
                                htmlFor="financingOptionS"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Financing option
                              </label>
                              <input
                                type="text"
                                name="financing_option"
                                id="financingOptionS"
                                autoComplete="financingOptionS"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                value={customer.financing_option}
                                onChange={(e) => handleChange(e, index)}
                              />
                            </div>

                            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                              <label
                                htmlFor="assignedAgent"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Assigned agent
                              </label>
                              <input
                                type="text"
                                name="assigned_agent"
                                id="assignedAgent"
                                autoComplete="assignedAgent"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                value={customer.assigned_agent}
                                onChange={(e) => handleChange(e, index)}
                              />
                            </div>

                            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                              <label
                                htmlFor="leadSource"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Lead source
                              </label>
                              <input
                                type="text"
                                name="lead_source"
                                id="leadSource"
                                autoComplete="leadSource"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                value={customer.lead_source}
                                onChange={(e) => handleChange(e, index)}
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

                            <div className="col-span-12 sm:col-span-6 lg:col-span-2">
                              <label
                                htmlFor="NOTES"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Notes
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
          ))}
        </CardBody>
      </Card>
    </>
  );
}

export default Addcustomers;
