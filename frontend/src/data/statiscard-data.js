import {
  BanknotesIcon,
  UserPlusIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";
import { API_URL } from "@/settings";
import { refreshToken, isTokenExpired } from "./auth-data";

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

export async function FetchSalesRecords(
  formattedStartOfMonth,
  formattedEndOfMonth,
  formattedStartOfLastMonth,
  formattedEndOfLastMonth,
  formatNumber,
  setStatisticsCardsData,
) {
  try {
    const { currentMonthData: currentSalesData, previousMonthData: previousSalesData } = await fetchSalesData(formattedStartOfMonth, formattedEndOfMonth, formattedStartOfLastMonth, formattedEndOfLastMonth);
    const { currentMonthData: currentEstSalesData, previousMonthData: previousEstSalesData } = await fetchEstSalesData(formattedStartOfMonth, formattedEndOfMonth, formattedStartOfLastMonth, formattedEndOfLastMonth);
    const { currentMonthData: currentProjectData, previousMonthData: previousProjectData } = await fetchProjectData(formattedStartOfMonth, formattedEndOfMonth, formattedStartOfLastMonth, formattedEndOfLastMonth);
    const { currentMonthData: currentCustomerData, previousMonthData: previousCustomerData } = await fetchCustomerData(formattedStartOfMonth, formattedEndOfMonth, formattedStartOfLastMonth, formattedEndOfLastMonth);

    const salesIncrease = calculateIncrease(currentSalesData, previousSalesData);
    const estSalesIncrease = calculateIncrease(currentEstSalesData, previousEstSalesData);
    const projectIncrease = calculateIncrease(currentProjectData, previousProjectData);
    const customerIncrease = calculateIncrease(currentCustomerData, previousCustomerData);

    const salesdata = createStatisticsCard(
      "blue",
      BanknotesIcon,
      "Monthly Sales Records",
      formatNumber(currentSalesData),
      salesIncrease,
    );

    const estsalesdata = createStatisticsCard(
      "blue",
      BanknotesIcon,
      "Expected Sale Value",
      formatNumber(currentEstSalesData),
      estSalesIncrease,
    );

    const projectdata = createStatisticsCard(
      "pink",
      ChartBarIcon,
      "Monthly New Project",
      currentProjectData,
      projectIncrease,
    );

    const custdata = createStatisticsCard(
      "green",
      UserPlusIcon,
      "New Clients",
      currentCustomerData,
      customerIncrease,
    );

    const combinedData = [salesdata, estsalesdata, projectdata, custdata];
    setStatisticsCardsData(combinedData);
  } catch (error) {
    console.error(error);
  }
}

async function fetchSalesData(startOfMonth, endOfMonth, startOfLastMonth, endOfLastMonth) {
  const currentMonthData = await makeApiRequest(`${API_BASE_URL}/sales-records?start=${startOfMonth}&end=${endOfMonth}`, 'GET', null);
  const previousMonthData = await makeApiRequest(`${API_BASE_URL}/sales-records?start=${startOfLastMonth}&end=${endOfLastMonth}`, 'GET', null);
  return { currentMonthData, previousMonthData };
}

async function fetchEstSalesData(startOfMonth, endOfMonth, startOfLastMonth, endOfLastMonth) {
  const currentMonthData = await makeApiRequest(`${API_BASE_URL}/est-sales-records?start=${startOfMonth}&end=${endOfMonth}`, 'GET', null);
  const previousMonthData = await makeApiRequest(`${API_BASE_URL}/est-sales-records?start=${startOfLastMonth}&end=${endOfLastMonth}`, 'GET', null);
  return { currentMonthData, previousMonthData };
}

async function fetchProjectData(startOfMonth, endOfMonth, startOfLastMonth, endOfLastMonth) {
  const currentMonthData = await makeApiRequest(`${API_BASE_URL}/project-records?start=${startOfMonth}&end=${endOfMonth}`, 'GET', null);
  const previousMonthData = await makeApiRequest(`${API_BASE_URL}/project-records?start=${startOfLastMonth}&end=${endOfLastMonth}`, 'GET', null);
  return { currentMonthData, previousMonthData };
}

async function fetchCustomerData(startOfMonth, endOfMonth, startOfLastMonth, endOfLastMonth) {
  const currentMonthData = await makeApiRequest(`${API_BASE_URL}/customers-records?start=${startOfMonth}&end=${endOfMonth}`, 'GET', null);
  const previousMonthData = await makeApiRequest(`${API_BASE_URL}/customers-records?start=${startOfLastMonth}&end=${endOfLastMonth}`, 'GET', null);
  return { currentMonthData, previousMonthData };
}

function calculateIncrease(currentData, previousData) {
  return previousData !== 0 ? ((currentData - previousData) / previousData) * 100 : 100;
}

function createStatisticsCard(color, icon, title, value, increase) {
  return {
    color,
    icon,
    title,
    value: `$${value}`,
    footer: {
      color: increase >= 0 ? "text-green-500" : "text-red-500",
      value: increase.toFixed(0),
      label: "than last month",
    },
  };
}
