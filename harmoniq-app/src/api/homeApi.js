import axiosClient from './axiosClient';

export async function fetchTrendingSongs() {
  const response = await axiosClient.get('/api/trending');
  if (!response.data?.success) {
    throw new Error(response.data?.error || 'Failed to load trending songs');
  }
  return response.data.data || [];
}

export async function searchHomeSongs(query) {
  const response = await axiosClient.get('/api/search', {
    params: { q: query },
  });
  if (!response.data?.success) {
    throw new Error(response.data?.error || 'Failed to load search songs');
  }
  return response.data.data || [];
}
