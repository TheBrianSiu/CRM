import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import {
  ClockIcon,
  CheckIcon,
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import {
  FetchSalesRecords,
  FetchProjectTable,
  FetchProjectCompletion,
  FetchChartsData,
} from "@/data";

export function Home() {
  const [StatisticsCardsData, setStatisticsCardsData] = useState([]);
  const [ProjectsTableData, setProjectsTableData] = useState([]);
  const [CompletedProject, setCompletedProject] = useState();
  const [statisticsChartsData, setStatisticsChartsData] = useState([]);

  function formatDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
  }

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const startOfLastMonth = new Date(year, month - 1, 1);
  const endOfLastMonth = new Date(year, month, 0);
  const startOfMonth = new Date(year, month, 1);
  const endOfMonth = new Date(year, month + 1, 0);

  const formattedStartOfMonth = formatDate(startOfMonth);
  const formattedEndOfMonth = formatDate(endOfMonth);
  const formattedStartOfLastMonth = formatDate(startOfLastMonth);
  const formattedEndOfLastMonth = formatDate(endOfLastMonth);

  function formatNumber(number) {
    if (number >= 1000000000) {
      return (number / 1000000000).toFixed(1) + " billion";
    } else if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + " million";
    } else if (number >= 1000) {
      return (number / 1000).toFixed(1) + " thousand";
    } else {
      return number.toString();
    }
  }

  useEffect(() => {
    FetchSalesRecords(
      formattedStartOfMonth,
      formattedEndOfMonth,
      formattedStartOfLastMonth,
      formattedEndOfLastMonth,
      formatNumber,
      setStatisticsCardsData,
    );
  }, [FetchSalesRecords]);

  useEffect(() => {
    FetchProjectTable(setProjectsTableData);
  }, []);

  useEffect(() => {
    FetchProjectCompletion(
      formattedStartOfMonth,
      formattedEndOfMonth,
      setCompletedProject,
    );
  }, []);

  useEffect(() => {
    FetchChartsData(year, setStatisticsChartsData);
  }, []);

  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-x-6 gap-y-10 md:grid-cols-2 xl:grid-cols-4">
        {StatisticsCardsData.map(({ icon, title, footer, ...rest }) => (
          <StatisticsCard
            key={title}
            {...rest}
            title={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600">
                <strong className={footer.color}>
                  {footer.value}
                  {"%"}
                </strong>
                &nbsp;{footer.label}
              </Typography>
            }
          />
        ))}
      </div>
      <div className="mb-6 grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
        {statisticsChartsData.map((props) => (
          <StatisticsChart
            key={props.title}
            {...props}
            footer={
              <Typography
                variant="small"
                className="flex items-center font-normal text-blue-gray-600"
              >
                <ClockIcon strokeWidth={2} className="h-4 w-4 text-inherit" />
                &nbsp;{props.footer}
              </Typography>
            }
          />
        ))}
      </div>
      <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="overflow-hidden xl:col-span-2">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
                Projects
              </Typography>
              <Typography
                variant="small"
                className="flex items-center gap-1 font-normal text-blue-gray-600"
              >
                <CheckIcon strokeWidth={3} className="h-4 w-4 text-blue-500" />
                <strong>
                  {CompletedProject}
                  {" done"}
                </strong>{" "}
                this month
              </Typography>
            </div>
            <Menu placement="left-start">
              <MenuHandler>
                <IconButton size="sm" variant="text" color="blue-gray">
                  <EllipsisVerticalIcon
                    strokeWidth={3}
                    fill="currenColor"
                    className="h-6 w-6"
                  />
                </IconButton>
              </MenuHandler>
              <MenuList>
                <MenuItem>Action</MenuItem>
                <MenuItem>Another Action</MenuItem>
                <MenuItem>Something else here</MenuItem>
              </MenuList>
            </Menu>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pb-2 pt-0">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["Task item", "assignees", "est value", "status"].map(
                    (el) => (
                      <th
                        key={el}
                        className="border-b border-blue-gray-50 px-6 py-3 text-left"
                      >
                        <Typography
                          variant="small"
                          className="text-[11px] font-medium uppercase text-blue-gray-400"
                        >
                          {el}
                        </Typography>
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {ProjectsTableData.slice(0, 10).map(
                  ({ task_name, assignees, est_value, lead_status }, key) => {
                    const isLastItem =
                      key === Math.min(9, ProjectsTableData.length - 1);
                    const className = `py-3 px-5 ${
                      isLastItem ? "" : "border-b border-blue-gray-50"
                    }`;

                    return (
                      <tr key={task_name}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            {/* <Avatar src={""} alt={task_name} size="sm" /> */}
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold"
                            >
                              {task_name}
                            </Typography>
                          </div>
                        </td>
                        <td className={className}>
                          {assignees.map(({ first_name, last_name }, key) => (
                            <Typography
                              variant="small"
                              className="text-xs font-medium text-blue-gray-600"
                            >
                              {first_name} {last_name}
                            </Typography>
                            // <Tooltip key={first_name} content={first_name}>
                            //   <Avatar
                            //     src={""}
                            //     alt={""}
                            //     size="xs"
                            //     variant="circular"
                            //     className={`cursor-pointer border-2 border-white ${
                            //       key === 0 ? "" : "-ml-2.5"
                            //     }`}
                            //   />
                            // </Tooltip>
                          ))}
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {est_value}
                          </Typography>
                        </td>
                        <td className={className}>
                          <div className="w-10/12">
                            <Typography
                              variant="small"
                              className="mb-1 block text-xs font-medium text-blue-gray-600"
                            >
                              {lead_status}
                            </Typography>
                            <Progress
                              value={lead_status}
                              variant="gradient"
                              // color={completion === 100 ? "green" : "blue"}
                              className="h-1"
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  },
                )}
              </tbody>
            </table>
          </CardBody>
        </Card>
        <Card>
          {/* <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 p-6"
          >
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Orders Overview
            </Typography>
            <Typography
              variant="small"
              className="flex items-center gap-1 font-normal text-blue-gray-600"
            >
              <ArrowUpIcon
                strokeWidth={3}
                className="h-3.5 w-3.5 text-green-500"
              />
              <strong>24%</strong> this month
            </Typography>
          </CardHeader>
          <CardBody className="pt-0">
            {statisticsChartsData.map(
              ({ icon, color, title, description }, key) => (
                <div key={title} className="flex items-start gap-4 py-3">
                  <div
                    className={`relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:w-0.5 after:-translate-x-2/4 after:bg-blue-gray-50 after:content-[''] ${
                      key === ordersOverviewData.length - 1
                        ? "after:h-0"
                        : "after:h-4/6"
                    }`}
                  >
                    {console.log(icon)}
                  </div>
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="block font-medium"
                    >
                      {title}
                    </Typography>
                    <Typography
                      as="span"
                      variant="small"
                      className="text-xs font-medium text-blue-gray-500"
                    >
                      {description}
                    </Typography>
                  </div>
                </div>
              ),
            )}
          </CardBody> */}
        </Card>
      </div>
    </div>
  );
}

export default Home;
