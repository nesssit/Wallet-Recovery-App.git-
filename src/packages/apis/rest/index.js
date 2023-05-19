import axios from 'axios';
import {CMC_API_KEY} from '@env';

export const fetchProducts = async () => {
  const data = await axios.get('https://fakestoreapi.com/products');
  return data.data;
};
export const fetchLatestBlockchainCoins = async () => {
  const data = await axios.get(
    'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
    {
      headers: {
        'X-CMC_PRO_API_KEY': CMC_API_KEY,
      },
    },
  );
  return data.data;
};

export const fetchLatestPosts = async () => {
  const response = await axios.get('https://pro-api.coinmarketcap.com/v1/content/latest', {
    headers: {
      'X-CMC_PRO_API_KEY': CMC_API_KEY,
    },
  });
  return response.data;
};
