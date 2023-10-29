import { API_URL } from "@/settings";
import { isTokenExpired, refreshToken } from "./auth-data";

const API_BASE_URL = API_URL;

async function makeApiRequest(url, method, data) {
  let token = localStorage.getItem('token');

  if (!token || isTokenExpired(token)) {
    try {
      token = await refreshToken();
    } catch (error) {
      console.error(error);
      return { error: 'Token refresh failed' };
    }
  }

  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      },
      body: data !== null ? JSON.stringify(data) : null,
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData || 'API request failed' };
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    return { error: 'API request error: ' + error.message };
  }
}

async function fetchMonthlyProjectData() {
  try {
    return await makeApiRequest(`${API_BASE_URL}/monthly-project`, "GET", null);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function fetchMonthlySalesData() {
  try {
    return await makeApiRequest(`${API_BASE_URL}/monthly-sales`, "GET", null);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function fetchMonthlyClientsData() {
  try {
    return await makeApiRequest(`${API_BASE_URL}/monthly-clients`, "GET", null);
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

export async function FetchChartsData(year, setStatisticsChartsData) {
  try {
    const projectData = await fetchMonthlyProjectData();
    const salesData = await fetchMonthlySalesData();
    const clientsData = await fetchMonthlyClientsData();

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
