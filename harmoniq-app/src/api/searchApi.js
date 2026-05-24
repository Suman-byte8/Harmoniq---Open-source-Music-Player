import axiosClient from './axiosClient';

export async function fetchSearchSongs(query) {
  const response = await axiosClient.get('/api/search', {
    params: { q: query },
  });
  return response.data;
}
