import axios from 'axios';

const apiKey = '324b81b1258fe8034519fdf545df23f7705c2';

const api = axios.create({
  baseURL: `https://cutt.ly/api`,
});

export const getCutUrl = async (url: string) => {
  const response = api.get(`api.php?key=${apiKey}&short=${url}`);
  return response;
};
