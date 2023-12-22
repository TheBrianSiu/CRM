import {
  BanknotesIcon,
  UserPlusIcon,
  ChartBarIcon,
} from '@heroicons/react/24/solid';
import { API_URL, cacheExpirationTime } from '@/settings';
import { makeApiRequest } from './main-api';
import { cacheData, prepareStatisticsCardsFromCache } from './local-cache';

const API_BASE_URL = API_URL;
const EXPIRATION_TIME = cacheExpirationTime;

export async function fetchSalesRecords(
  formattedStartOfMonth,
  formattedEndOfMonth,
  formattedStartOfLastMonth,
  formattedEndOfLastMonth,
  formatNumber,
  setStatisticsCardsData,
  userid,
) {
  try {
    const cachedSalesData = JSON.parse(localStorage.getItem('salesData'));

    if (isCachedDataValid(cachedSalesData)) {
      setStatisticsCardsData(
        prepareStatisticsCardsFromCache(cachedSalesData, formatNumber),
      );
    }

    const [
      {
        currentMonthData: currentSalesData,
        previousMonthData: previousSalesData,
      },
      {
        currentMonthData: currentEstSalesData,
        previousMonthData: previousEstSalesData,
      },
      {
        currentMonthData: currentProjectData,
        previousMonthData: previousProjectData,
      },
      {
        currentMonthData: currentCustomerData,
        previousMonthData: previousCustomerData,
      },
    ] = await Promise.all([
      fetchSalesData(
        formattedStartOfMonth,
        formattedEndOfMonth,
        formattedStartOfLastMonth,
        formattedEndOfLastMonth,
        userid,
      ),
      fetchEstSalesData(
        formattedStartOfMonth,
        formattedEndOfMonth,
        formattedStartOfLastMonth,
        formattedEndOfLastMonth,
        userid,
      ),
      fetchProjectData(
        formattedStartOfMonth,
        formattedEndOfMonth,
        formattedStartOfLastMonth,
        formattedEndOfLastMonth,
        userid,
      ),
      fetchCustomerData(
        formattedStartOfMonth,
        formattedEndOfMonth,
        formattedStartOfLastMonth,
        formattedEndOfLastMonth,
        userid,
      ),
    ]);

    const statisticsCards = prepareStatisticsCards(
      formatNumber,
      currentSalesData,
      previousSalesData,
      currentEstSalesData,
      previousEstSalesData,
      currentProjectData,
      previousProjectData,
      currentCustomerData,
      previousCustomerData,
    );

    setStatisticsCardsData(statisticsCards);

    // Cache the data
    cacheData(statisticsCards);
  } catch (error) {
    console.error(error);
  }
}

function isCachedDataValid(cachedData) {
  return (
    cachedData &&
    cachedData.timestamp &&
    Date.now() - cachedData.timestamp < EXPIRATION_TIME &&
    cachedData.data &&
    Array.isArray(cachedData.data) &&
    cachedData.data.length === 4
  );
}

function prepareStatisticsCards(
  formatNumber,
  currentSalesData,
  previousSalesData,
  currentEstSalesData,
  previousEstSalesData,
  currentProjectData,
  previousProjectData,
  currentCustomerData,
  previousCustomerData,
) {
  const salesIncrease = calculateIncrease(currentSalesData, previousSalesData);
  const estSalesIncrease = calculateIncrease(
    currentEstSalesData,
    previousEstSalesData,
  );
  const projectIncrease = calculateIncrease(
    currentProjectData,
    previousProjectData,
  );
  const customerIncrease = calculateIncrease(
    currentCustomerData,
    previousCustomerData,
  );

  const salesdata = createStatisticsCard(
    'blue',
    BanknotesIcon,
    'Monthly Sales Records',
    formatNumber(currentSalesData),
    salesIncrease,
  );
  const estsalesdata = createStatisticsCard(
    'blue',
    BanknotesIcon,
    'Expected Sale Value',
    formatNumber(currentEstSalesData),
    estSalesIncrease,
  );
  const projectdata = createStatisticsCard(
    'pink',
    ChartBarIcon,
    'Monthly New Project',
    currentProjectData,
    projectIncrease,
  );
  const custdata = createStatisticsCard(
    'green',
    UserPlusIcon,
    'New Clients',
    currentCustomerData,
    customerIncrease,
  );

  return [salesdata, estsalesdata, projectdata, custdata];
}

async function fetchSalesData(
  startOfMonth,
  endOfMonth,
  startOfLastMonth,
  endOfLastMonth,
  userid,
) {
  const [currentMonthData, previousMonthData] = await Promise.all([
    makeApiRequest(
      `${API_BASE_URL}/sales-records?start=${startOfMonth}&end=${endOfMonth}&userid=${userid}`,
      'GET',
      null,
    ),
    makeApiRequest(
      `${API_BASE_URL}/sales-records?start=${startOfLastMonth}&end=${endOfLastMonth}&userid=${userid}`,
      'GET',
      null,
    ),
  ]);
  return { currentMonthData, previousMonthData };
}

async function fetchEstSalesData(
  startOfMonth,
  endOfMonth,
  startOfLastMonth,
  endOfLastMonth,
  userid,
) {
  const [currentMonthData, previousMonthData] = await Promise.all([
    makeApiRequest(
      `${API_BASE_URL}/est-sales-records?start=${startOfMonth}&end=${endOfMonth}&userid=${userid}`,
      'GET',
      null,
    ),
    makeApiRequest(
      `${API_BASE_URL}/est-sales-records?start=${startOfLastMonth}&end=${endOfLastMonth}&userid=${userid}`,
      'GET',
      null,
    ),
  ]);
  return { currentMonthData, previousMonthData };
}

async function fetchProjectData(
  startOfMonth,
  endOfMonth,
  startOfLastMonth,
  endOfLastMonth,
  userid,
) {
  const [currentMonthData, previousMonthData] = await Promise.all([
    makeApiRequest(
      `${API_BASE_URL}/project-records?start=${startOfMonth}&end=${endOfMonth}&userid=${userid}`,
      'GET',
      null,
    ),
    makeApiRequest(
      `${API_BASE_URL}/project-records?start=${startOfLastMonth}&end=${endOfLastMonth}&userid=${userid}`,
      'GET',
      null,
    ),
  ]);
  return { currentMonthData, previousMonthData };
}

async function fetchCustomerData(
  startOfMonth,
  endOfMonth,
  startOfLastMonth,
  endOfLastMonth,
  userid,
) {
  const [currentMonthData, previousMonthData] = await Promise.all([
    makeApiRequest(
      `${API_BASE_URL}/customers-records?start=${startOfMonth}&end=${endOfMonth}&userid=${userid}`,
      'GET',
      null,
    ),
    makeApiRequest(
      `${API_BASE_URL}/customers-records?start=${startOfLastMonth}&end=${endOfLastMonth}&userid=${userid}`,
      'GET',
      null,
    ),
  ]);
  return { currentMonthData, previousMonthData };
}

function calculateIncrease(currentData, previousData) {
  return previousData !== 0
    ? ((currentData - previousData) / previousData) * 100
    : 100;
}

export function createStatisticsCard(color, icon, title, value, increase) {
  let formattedIncrease = 'N/A';

  if (!isNaN(increase)) {
    formattedIncrease = increase >= 0 ? Math.abs(increase).toFixed(0) : `-${Math.abs(increase).toFixed(0)}`;
  }

  return {
    color,
    icon,
    title,
    value: `${value !== '' ? `${value}` : 'N/A'}`,
    footer: {
      color: increase >= 0 ? 'text-green-500' : 'text-red-500',
      value: formattedIncrease,
      label: 'than last month',
    },
  };
}
