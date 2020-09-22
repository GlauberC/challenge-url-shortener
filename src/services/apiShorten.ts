import axios from 'axios';

const apiKey = '6e8ab99e383483f5cf859eca75104cf3';

const api = axios.create({
  baseURL: `https://cutt.ly/api`,
});

export const getCutUrl = async (url: string) => {
  const response = api.get(`api.php?key=${apiKey}&short=${url}`);
  return response;
};
