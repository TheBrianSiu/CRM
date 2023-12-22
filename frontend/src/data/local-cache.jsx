import {
  BanknotesIcon,
  UserPlusIcon,
  ChartBarIcon,
} from '@heroicons/react/24/solid';
import { createStatisticsCard } from './statiscard-data';

export function prepareStatisticsCardsFromCache(cachedData, formatNumber) {
  const statisticsCards = cachedData.data.map((item, index) => {
    switch (index) {
      case 0:
        return createStatisticsCard(
          'blue',
          BanknotesIcon,
          'Monthly Sales Records',
          formatNumber(item[1]),
          item[0],
        );
      case 1:
        return createStatisticsCard(
          'blue',
          BanknotesIcon,
          'Expected Sale Value',
          formatNumber(item[1]),
          item[0],
        );
      case 2:
        return createStatisticsCard(
          'pink',
          ChartBarIcon,
          'Monthly New Project',
          item[1],
          item[0],
        );
      case 3:
        return createStatisticsCard(
          'green',
          UserPlusIcon,
          'New Clients',
          item[1],
          item[0],
        );
      default:
        return null;
    }
  });

  return statisticsCards;
}

export function cacheData(data) {
  const cacheData = data.map((card) => [card.footer.value, card.value]);
  const dataToCache = { data: cacheData, timestamp: Date.now() };
  localStorage.setItem('salesData', JSON.stringify(dataToCache));
}
