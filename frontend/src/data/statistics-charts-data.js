import { API_URL } from "@/settings";
import { makeApiRequest } from "./mainApi";

const API_BASE_URL = API_URL;

async function fetchMonthlyProjectData(userid) {
  try {
    return await makeApiRequest(`${API_BASE_URL}/monthly-project?userid=${userid}`, "GET", null);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function fetchMonthlySalesData(userid) {
  try {
    return await makeApiRequest(`${API_BASE_URL}/monthly-sales?userid=${userid}`, "GET", null);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function fetchMonthlyClientsData(userid) {
  try {
    return await makeApiRequest(`${API_BASE_URL}/monthly-clients?userid=${userid}`, "GET", null);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function createChart(data, type, name, categoryLabels, itemKey) {
  const chart = {
    type: type,
    height: 220,
    series: [
      {
        name: name,
        data: Array(12).fill(0),
      },
    ],
    options: {
      xaxis: {
        categories: categoryLabels,
      },
    },
  };

  data.forEach((item) => {
    const monthIndex = item.month - 1;
    if (monthIndex >= 0 && monthIndex < 12) {
      chart.series[0].data[monthIndex] = item[itemKey];
    }
  });

  return chart;
}

export async function FetchChartsData(year, setStatisticsChartsData,userid) {
  try {
    const projectData = await fetchMonthlyProjectData(userid);
    const salesData = await fetchMonthlySalesData(userid);
    const clientsData = await fetchMonthlyClientsData(userid);

    const newTasksChart = createChart(projectData, "bar", "Tasks", [
      "Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"
    ],"projects_created");
    const monthlySalesChart = createChart(salesData, "line", "Sales", [
      "Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"
    ],"sales_revenue");
    const monthlyNewClientsChart = createChart(clientsData, "bar", "Views", [
      "Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"
    ],"new_client");

    const statisticsChartsData = [
      {
        color: "white",
        title: "New Project By Month",
        description: "Discover the monthly evolution of new projects.",
        footer: "Activities in this " + year,
        chart: newTasksChart,
      },
      {
        color: "white",
        title: "Sales closed by Month",
        description: "Gain insights into your sales performance.",
        footer: "Activities in this " + year,
        chart: monthlySalesChart,
      },
      {
        color: "white",
        title: "Number of new clients",
        description: "Track the monthly influx of new clients.",
        footer: "Activities in this " + year,
        chart: monthlyNewClientsChart,
      },
    ];

    setStatisticsChartsData(statisticsChartsData);
  } catch (error) {
    console.error(error);
  }
}
