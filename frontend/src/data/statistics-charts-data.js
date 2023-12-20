import { API_URL } from '@/settings';
import { makeApiRequest } from './main-api';

const API_BASE_URL = API_URL;

async function fetchData(endpoint, userid) {
  try {
    return await makeApiRequest(`${API_BASE_URL}/${endpoint}?userid=${userid}`, 'GET', null);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function fetchMonthlyProjectData(userid) {
  return fetchData('monthly-project', userid);
}

async function fetchMonthlySalesData(userid) {
  return fetchData('monthly-sales', userid);
}

async function fetchMonthlyClientsData(userid) {
  return fetchData('monthly-clients', userid);
}

function createChart(data, type, name, categoryLabels, itemKey) {
  const chart = {
    type,
    height: 220,
    series: [
      {
        name,
        data: Array(12).fill(0),
      },
    ],
    options: {
      xaxis: {
        categories: categoryLabels,
      },
    },
  };

  if (data) {
    data.forEach((item) => {
      const monthIndex = item.month - 1;
      if (monthIndex >= 0 && monthIndex < 12) {
        chart.series[0].data[monthIndex] = item[itemKey];
      }
    });
  }

  return chart;
}

export async function fetchChartsData(year, setStatisticsChartsData, userid) {
  try {
    const [projectData, salesData, clientsData] = await Promise.all([
      fetchMonthlyProjectData(userid),
      fetchMonthlySalesData(userid),
      fetchMonthlyClientsData(userid),
    ]);

    const newTasksChart = createChart(
      projectData,
      'bar',
      'Tasks',
      ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      'projects_created',
    );
    const monthlySalesChart = createChart(
      salesData,
      'line',
      'Sales',
      ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      'sales_revenue',
    );
    const monthlyNewClientsChart = createChart(
      clientsData,
      'bar',
      'Views',
      ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      'new_client',
    );
    const statisticsChartsData = [
      {
        color: 'white',
        title: 'New Project By Month',
        description: 'Discover the monthly evolution of new projects.',
        footer: `Activities in this ${year}`,
        chart: newTasksChart,
      },
      {
        color: 'white',
        title: 'Sales closed by Month',
        description: 'Gain insights into your sales performance.',
        footer: `Activities in this ${year}`,
        chart: monthlySalesChart,
      },
      {
        color: 'white',
        title: 'Number of new clients',
        description: 'Track the monthly influx of new clients.',
        footer: `Activities in this ${year}`,
        chart: monthlyNewClientsChart,
      },
    ];

    setStatisticsChartsData(statisticsChartsData);
  } catch (error) {
    console.error(error);
  }
}
